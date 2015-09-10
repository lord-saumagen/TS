module TS
{
  "use strict";

  export module Security
  {

    //
    // Reference check
    //
    (function ()
    {
      var _missingArray: Array<string>;
      _missingArray = new Array<string>();

      if (TS.Utils == undefined)
      {
        _missingArray.push("TS.Utils");
      }

      if (TS.Utils.Assert == undefined)
      {
        _missingArray.push("TS.Utils.Assert");
      }

      if (TS.Exception == undefined)
      {
        _missingArray.push("TS.Exception");
      }

      if (TS.Security.Cryptography == undefined)
      {
        _missingArray.push("TS.Security.Cryptography");
      }

      if (TS.Security.State == undefined)
      {
        _missingArray.push("TS.Security.State");
      }

      if (TS.Security.AES == undefined)
      {
        _missingArray.push("TS.Security.AES");
      }

      if (TS.Security.AES_OFB == undefined)
      {
        _missingArray.push("TS.Security.AES_OFB");
      }

      if (TS.Security.State == undefined)
      {
        _missingArray.push("TS.Security.AbstractStreamCipher");
      }

      if (_missingArray.length > 0)
      {
        throw new Error("TS.Security.StreamCipher requires additional references to the following module(s) or class(es): " + _missingArray.join(", ") + ".");
      }//END if

    })();


    /**
     * @class
     * @description This is an implementation of the OUTPUT FEEDBACK (OFB) operation
     *              mode as described in the NIST publication 800-38a, 
     *              'Recommendation for Block Cipher Modes of Operation'.
     *              This class differs from the 'TS.Security.AES_OFB' in that way, that the
     *              class is more streaming friendly. This class sacrifices the thread safety 
     *              for that purpose. But that's not a problem, since the stream encapsulates
     *              the use of this class and ensures thread safety itself.
     * @see {@link hred=http://csrc.nist.gov/publications/nistpubs/800-38a/addendum-to-nist_sp800-38A.pdf}
     */
    class AES_OFBStreamEnabled extends AES
    {
      /**
      * @private 
      */
      private _IV: State;

      /**
      * @private
      */
      private _workingState: State;

      /**
      * @private
      */
      private _closed: boolean;

      public get closed(): boolean
      {
        return this._closed;
      }

      constructor(keyByteArray: Array<number>, initialisationVector: Array<number>)
      {
        super(keyByteArray);
        this._IV = new State(initialisationVector);
        this._workingState = null;
        this._closed = false;
      }

      /**
       * @override
       * @throws {TS.InvalidOperationException}
       */
      public encrypt(plainDataByteArray: Array<number>): Array<number>
      {
        if (this._closed)
        {
          throw new TS.InvalidOperationException("A call to function 'encrypt' is not allowed after the cipher object has closed. Error occured in 'TS.Security.AES_OFBStreamEnabled.enrypt'.");
        }//END if

        if (plainDataByteArray.length < 16)
        {
          this._closed;
        }//END if

        return this.encryptDecryptInternal(plainDataByteArray);
      }


      /**
       * @override
       * @throws {TS.InvalidOperationException}
       */
      public decrypt(cypherDataByteArray: Array<number>): Array<number>
      {
        if (this._closed)
        {
          throw new TS.InvalidOperationException("A call to function 'encrypt' is not allowed after the cipher object has closed. Error occured in 'TS.Security.AES_OFBStreamEnabled.decrypt'.");
        }//END if

        if (cypherDataByteArray.length < 16)
        {
          this._closed;
        }//END if

        return this.encryptDecryptInternal(cypherDataByteArray);
      }


      /**
      * @override
      * @description Encrypts or decrypts the data given in argument 'dataByteArray'
      *              and returns the processed data as byte array.
      * 
      * @param {Array<number>} dataByteArray
      * 
      * @return {Array<number>}, the resulting encrypted or decrypted data as byte array.
      */
      protected encryptDecryptInternal(dataByteArray: Array<number>): Array<number>
      {
        var _index: number;
        var _dataSegment: Array<number>;
        var _numberOfFillBytes: number;
        var _dataState: State;
        var _resultByteArray: Array<number>;

        _index = 0;
        _resultByteArray = new Array<number>();
        _numberOfFillBytes = 0;

        if (this._workingState == null)
        {
          this._workingState = new State(this._IV.toArray());
        }//END if

        _dataSegment = dataByteArray.slice();

        this._workingState.encrypt(this.workingKeyByteArray, this.rounds);
        while (_dataSegment.length < 16)
        {
          _dataSegment.push(0);
          _numberOfFillBytes++;
        }//END while
        _dataState = new State(_dataSegment)
        _dataState.xor(this._workingState);
        _resultByteArray = _dataState.toArray();

        while (_numberOfFillBytes > 0)
        {
          _resultByteArray.pop();
          _numberOfFillBytes--;
        }//END while

        return _resultByteArray;
      }
    }//END class


    /**
     * @class
     * @description This is an implementation of the abstract base class 
     *              'TS.Security.AbstractStreamCipher' for the AES_OFB
     *              operation mode.
     * 
     * @see {TS.Security.AbstractStreamCipher}
     */
    export class AES_OFB_Stream extends AbstractStreamCipher
    {

      /**
      * @constructs
      * @description Create a new AES_OFB_Stream instance with the key given in argument 'keyByteArray'. 
      *              The 'keyByteArray' must have a total length of 128, 192 or 256 bits. That means the
      *              'keyByteArray' array must have a length of either 16, 24 or 32. Using a 
      *              key which doesn't comply with that rule will raise an exception.
      * 
      * @param {Array<number>} keyByteArray, an array of [16 | 24 | 32] byte holding the key.
      * @param {Array<number>} initialisationVector, an array of 16 byte holding the initalisation vector.
      * @param {TS.Security.CipherOperationEnum} cipherOperation, the cipher operation executed in this stream.
      * @param {(bitString: string) => void} onNextData, the callback which is called for each successful ciphered chunk of data.
      * @param {() => void} onClosed, the callback which is called when the stream has finally closed. 
      * @param {(exception: TS.Exception) => void} onError, the callback which is called in case of an error.
      * 
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidOperationException}
      * @throws {TS.ArgumentNullUndefOrEmptyException}
      * @throws {TS.ArgumentException}
      * @throws {TS.ArgumentOutOfRangeException}
      * @throws {TS.InvalidTypeException}
      */
      constructor(keyByteArray: Array<number>,
        initialisationVector: Array<number>,
        cipherOperation: TS.Security.CipherOperationEnum,
        onNextData: (bitString: string) => void,
        onClosed: () => void,
        onError: (exception: TS.Exception) => void)
      {
        TS.Utils.checkConstructorCall(this, TS.Security.AES_OFB_Stream);
        TS.Utils.checkNotEmptyParameter(keyByteArray, "keyByteArray", "TS.Security.AES_OFB_Stream.constructor");
        TS.Utils.checkKeyByteArray(keyByteArray, "keyByteArray", "TS.Security.AES_OFB_Stream.constructor");
        TS.Utils.checkNotEmptyParameter(initialisationVector, "initialisationVector", "TS.Security.AES_OFB_Stream.constructor");
        TS.Utils.checkUnsignedByteArrayParameter(initialisationVector, "initialisationVector", "TS.Security.AES_OFB_Stream.constructor");
        TS.Utils.checkParameter(cipherOperation, "cipherOperation", "TS.Security.AES_OFB_Stream.constructor");
        TS.Utils.checkParameter(onNextData, "onNextData", "TS.Security.AES_OFB_Stream.constructor");
        TS.Utils.checkFunctionParameter(onNextData, "onNextData", "TS.Security.AES_OFB_Stream.constructor");
        TS.Utils.checkParameter(onClosed, "onClosed", "TS.Security.AES_OFB_Stream.constructor");
        TS.Utils.checkFunctionParameter(onClosed, "onClosed", "TS.Security.AES_OFB_Stream.constructor");
        TS.Utils.checkParameter(onError, "onError", "TS.Security.AES_OFB_Stream.constructor");
        TS.Utils.checkFunctionParameter(onError, "onError", "TS.Security.AES_OFB_Stream.constructor");

        if (initialisationVector.length != 16)
        {
          throw new TS.ArgumentOutOfRangeException("initialisationVector", initialisationVector, "Argument 'initialisationVector' must be a byte array of the length 16 in function 'TS.Security.AES_OFB_Stream.constructor'.");
        }//END if

        if (!TS.Utils.Assert.isValueOfEnum(cipherOperation, TS.Security.CipherOperationEnum))
        {
          throw new TS.InvalidTypeException("cipherOperation", cipherOperation, "Argument 'cipherOperation' must be a valid element of the 'TS.Security.CipherOperationEnum' enumeration in function 'TS.Security.AES_OFB_Stream.constructor'.");
        }//END if


        super(cipherOperation, onNextData, onClosed, onError);

        //Set ther blockCipher object.
        this._blockCipher = new AES_OFBStreamEnabled(keyByteArray, initialisationVector);

        //Set the bufferSize which is 128 bit for AES_OFB.
        this._bufferSizeInBit = 128;

        //Set the streamState to signal the end of the class construction.
        this._streamState = StreamStateEnum.CREATED;
      }


      /**
      * @override
      * @description This function uses the 'blockCipher' which should
      *              be set in the constructor to encrypt / decrypt 
      *              the buffer given in argument 'bitString' and 
      *              returns the result as byte array. 
      *              Overwirte this function to match the operation
      *              requirements of different block cipher operation 
      *              modes in subclasses.
      * 
      * @param {string} bitString, a bit string which has the length of the 
      *                 'bufferSizeInBit' which should be set in the constructor.
      * 
      * @returns {string}, the encrypted / decrypted data as bit string.
      */
      protected cipher(bitString: string): string
      {
        var _block: Array<number>;

        _block = TS.Utils.bitStringToByteArray(bitString);

        if (this._cipherOperation == TS.Security.CipherOperationEnum.DECRYPT)
        {
          return TS.Utils.byteArrayToBitString(this._blockCipher.decrypt(_block));
        }//END if

        if (this._cipherOperation == TS.Security.CipherOperationEnum.ENCRYPT)
        {
          return TS.Utils.byteArrayToBitString(this._blockCipher.encrypt(_block));
        }//END if

      }

      /**
      * @override
      */
      protected internalClose(): void
      {

        //Set the 'CLOSED' flag and block the stream
        //for writing. 
        this._streamState = StreamStateEnum.CLOSED;

        //Stop the timer
        this.stopTimer();

        //Check the buffer for remaining data
        if (this._inputBuffer.length > 0)
        {
          //Handle the remaining data in an appropriate 
          //way for the current block cipher.

          //Since the AES_OFB mode doesn't allow operations
          //on incomplete bytes call the onError callback.
          //Let the consumer handle the situation.
          if ((this._inputBuffer.length % 8) != 0)
          {
            this._onError(new TS.InvalidOperationException("The feeded data does not align with byte length (8 bit) wich is required by the AES_OFB cipher operation."));
            return;
          }//END if
          else
          {
            //Run the cipher operation on the remaining bytes and
            //signal this chunk of data to the consumer.
            this._onNextData(this.cipher(this._inputBuffer));
          }//END if

        }//END if

        //Clear the buffer
        this._inputBuffer = "";

        //Signal that the stream has closed.
        this._onClosed();
      }


    }//END class

  }//END module
}//END module
