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
        _missingArray.push("TS.Security.AES_CTR");
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
     * @description This is an implementation of the COUNTER (CTR) operation
     *              mode as described in the NIST publication 800-38a, 
     *              'Recommendation for Block Cipher Modes of Operation'.
     *              This class differs from the 'TS.Security.AES_CTR' in that way, that the
     *              class is more streaming friendly. This class sacrifices the thread safety 
     *              for that purpose. But that's not a problem, since the stream encapsulates
     *              the use of this class and ensures thread safety itself.
     * @see {@link hred=http://csrc.nist.gov/publications/nistpubs/800-38a/addendum-to-nist_sp800-38A.pdf}
     */
    class AES_CTRStreamEnabled extends AES
    {
      /**
      * @private
      */
      private _CTR: TS.Security.Counter;

      /**
      * @private
      */
      private _closed: boolean;

      public get closed(): boolean
      {
        return this._closed;
      }

      /**
      * @description That property give access to the nonce which is actually used in 
      *              this AES_CTR object. You need to store this nonce along wiht your
      *              encrypted data. Otherwies you won't be able to decrypt the data
      *              anymore.
      *
      * @returns {Array<number>}, the nonce as array of 16 byte values.
      */
      public get nonce(): Array<number>
      {
        return this._CTR.nonce;
      }

      constructor(keyByteArray: Array<number>, counterValue: number);
      constructor(keyByteArray: Array<number>, nonce: Array<number>);
      constructor(keyByteArray: Array<number>)

      constructor(keyByteArray: Array<number>)
      {

        if (arguments.length > 1)
        {
          if (TS.Utils.Assert.isUnsignedByteArray(arguments[1]))
          {
            this._CTR = new TS.Security.Counter(arguments[1]);
          }//END if
          else if (TS.Utils.Assert.isUnsignedIntegerNumber(arguments[1]))
          {
            this._CTR = new TS.Security.Counter(arguments[1]);
          }//END if
          else
          {
            throw new TS.InvalidTypeException("nonce | counterValue", arguments[1], "The second argument in the constructor of 'TS.Security.AES_CTRStreamEnabled' has an invalid type. Error occured in 'TS.Security.AES_CTRStreamEnabled.constructor'.");
          }//END else
        }//END if
        else
        {
          this._CTR = new TS.Security.Counter();
        }//END else

        super(keyByteArray);
      }

      /**
       * @override
       * @throws {TS.InvalidOperationException}
       */
      public encrypt(plainDataByteArray: Array<number>): Array<number>
      {
        if (this._closed)
        {
          throw new TS.InvalidOperationException("A call to function 'encrypt' is not allowed after the cipher object has closed. Error occured in 'TS.Security.AES_CTRStreamEnabled.enrypt'.");
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
          throw new TS.InvalidOperationException("A call to function 'encrypt' is not allowed after the cipher object has closed. Error occured in 'TS.Security.AES_CTRStreamEnabled.decrypt'.");
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
      * @param {Array<number>} dataByteArray, array of 16 byte values.
      * 
      * @return {Array<number>}, the resulting encrypted or decrypted data as byte array.
      */
      protected encryptDecryptInternal(dataByteArray: Array<number>): Array<number>
      {
        var _dataSegment: Array<number>;
        var _numberOfFillBytes: number;
        var _state: State;
        var _dataState: State;
        var _resultByteArray: Array<number>;

        _resultByteArray = new Array<number>();
        _numberOfFillBytes = 0;

        _state = this._CTR.nextState;
        _state.encrypt(this.workingKeyByteArray, this.rounds);
        _dataSegment = dataByteArray.slice();

        while (_dataSegment.length < 16)
        {
          _dataSegment.push(0);
          _numberOfFillBytes++;
        }//END while

        _dataState = new State(_dataSegment)
        _dataState.xor(_state);
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
     *              'TS.Security.AbstractStreamCipher' for the AES_CTR
     *              operation mode.
     * 
     * @see {TS.Security.AbstractStreamCipher}
     */
    export class AES_CTR_Stream extends AbstractStreamCipher
    {


      /**
      * @constructs
      * @description Create a new AES_CTR_Stream instance with the key given in argument 'keyByteArray'
      *              and the nonce given in argument 'nonce'. 
      *              The 'keyByteArray' must have a total length of 128, 192 or 256 bits. That means the
      *              'keyByteArray' array must have a length of either 16, 24 or 32. Using a 
      *              key which doesn't comply with that rule will raise an exception.
      * 
      * @param {Array<number>} keyByteArray, an array of [16 | 24 | 32] byte holding the key.
      * @param {Array<number>} nonce, an array of 16 byte holding the nonce for the cipher object.
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
        nonce: Array<number>,
        cipherOperation: TS.Security.CipherOperationEnum,
        onNextData: (bitString: string) => void,
        onClosed: () => void,
        onError: (exception: TS.Exception) => void);

      /**
      * @constructs
      * @description Create a new AES_CTR_Stream instance with the key given in argument 'keyByteArray'
      *              and the counter value given in argument 'counterValue'. 
      *              The 'keyByteArray' must have a total length of 128, 192 or 256 bits. That means the
      *              'keyByteArray' array must have a length of either 16, 24 or 32. Using a 
      *              key which doesn't comply with that rule will raise an exception.
      * 
      * @param {Array<number>} keyByteArray, an array of [16 | 24 | 32] byte holding the key.
      * @param {number} counterValue, the initial conter value of the cipher object in the range [0..0xFFFF].
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
        counterValue: number,
        cipherOperation: TS.Security.CipherOperationEnum,
        onNextData: (bitString: string) => void,
        onClosed: () => void,
        onError: (exception: TS.Exception) => void);

      constructor(keyByteArray: Array<number>,
        nonceOrcounterValue: any,
        cipherOperation: TS.Security.CipherOperationEnum,
        onNextData: (bitString: string) => void,
        onClosed: () => void,
        onError: (exception: TS.Exception) => void)
{
        var _nonce: Array<number>;
        var _counterValue: number;

        TS.Utils.checkConstructorCall(this, TS.Security.AES_CTR_Stream);
        TS.Utils.checkNotEmptyParameter(keyByteArray, "keyByteArray", "TS.Security.AES_CTR_Stream.constructor");
        TS.Utils.checkKeyByteArray(keyByteArray, "keyByteArray", "TS.Security.AES_CTR_Stream.constructor");
        TS.Utils.checkNotEmptyParameter(arguments[1], "nonce | counterValue", "TS.Security.AES_CTR_Stream.constructor");
        TS.Utils.checkParameter(cipherOperation, "cipherOperation", "TS.Security.AES_CTR_Stream.constructor");
        TS.Utils.checkParameter(onNextData, "onNextData", "TS.Security.AES_CTR_Stream.constructor");
        TS.Utils.checkFunctionParameter(onNextData, "onNextData", "TS.Security.AES_CTR_Stream.constructor");
        TS.Utils.checkParameter(onClosed, "onClosed", "TS.Security.AES_CTR_Stream.constructor");
        TS.Utils.checkFunctionParameter(onClosed, "onClosed", "TS.Security.AES_CTR_Stream.constructor");
        TS.Utils.checkParameter(onError, "onError", "TS.Security.AES_CTR_Stream.constructor");
        TS.Utils.checkFunctionParameter(onError, "onError", "TS.Security.AES_CTR_Stream.constructor");


        _nonce = null;
        _counterValue = null;

        if (TS.Utils.Assert.isUnsignedByteArray(arguments[1]))
        {
          if (arguments[1].length != 16)
          {
            throw new TS.ArgumentOutOfRangeException("nonce", arguments[1], "Argument 'nonce' must be a byte value array with 16 elements in function 'TS.Security.AES_CTR.constructor'.");
          }//END if
          _nonce = arguments[1];
        }//END if
        else if (TS.Utils.Assert.isUnsignedIntegerNumber(arguments[1]))
        {
          if (arguments[2] > 0xFFFFFFFF)
          {
            throw new TS.ArgumentOutOfRangeException("counterValue", arguments[1], "Argument 'counterValue' must not exceed the maximum allowed value: '" + 0xFFFFFFFF.toString() + "' in function 'TS.Security.AES_CTR.constructor'.");
          }//END if
          _counterValue = arguments[1];
        }//END if
        else
        {
          throw new TS.InvalidTypeException("nonce | counterValue", arguments[1], "The second argument in the constructor of 'TS.Security.AES_CTR_Stream' has an invalid type. Error occured in 'TS.Security.AES_CTR_Stream.constructor'.");
        }//END else

        if (!TS.Utils.Assert.isValueOfEnum(cipherOperation, TS.Security.CipherOperationEnum))
        {
          throw new TS.InvalidTypeException("cipherOperation", cipherOperation, "Argument 'cipherOperation' must be a valid element of the 'TS.Security.CipherOperationEnum' enumeration in function 'TS.Security.AES_CTR_Stream.constructor'.");
        }//END if

        super(cipherOperation, onNextData, onClosed, onError);

        //Set ther blockCipher object.
        if (_nonce != null)
        {
          this._blockCipher = new AES_CTRStreamEnabled(keyByteArray, _nonce);
        }//END if
        else if (_counterValue != null)
        {
          this._blockCipher = new AES_CTRStreamEnabled(keyByteArray, _counterValue);
        }//END if

        //Set the bufferSize which is 128 bit for AES_CTR.
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
            this._onError(new TS.InvalidOperationException("The feeded data does not align with byte length (8 bit) wich is required by the AES_CTR cipher operation."));
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