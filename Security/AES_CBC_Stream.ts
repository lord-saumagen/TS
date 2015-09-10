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

      if (TS.Security.AES == undefined)
      {
        _missingArray.push("TS.Security.AES_CBC");
      }

      if (TS.Security.State == undefined)
      {
        _missingArray.push("TS.Security.AbstractStreamCipher");
      }

      if (_missingArray.length > 0)
      {
        throw new Error("TS.Security.AES_CBC_Stream requires additional references to the following module(s) or class(es): " + _missingArray.join(", ") + ".");
      }//END if

    })();



    /**
    * @class
    * @description This is an implementation of the CIPHER BLOCK CHAINING (CBC) operation
    *              mode as described in the NIST publication 800-38a, 
    *              'Recommendation for Block Cipher Modes of Operation'.
    *              This class differs from the 'TS.Security.AES_CBC' in that way, that the
    *              class is more streaming friendly. This class sacrifices the thread safety 
    *              for that purpose. But that's not a problem, since the stream encapsulates
    *              the use of this class and ensures thread safety itself.
    * 
    * @see {@link href=http://csrc.nist.gov/publications/nistpubs/800-38a/addendum-to-nist_sp800-38A.pdf}
    */
    class AES_CBCStreamEnabled extends AES
    {
      /**
      * @private 
      */
      private _IV: State;
      /**
      * @private 
      */
      private _previousState: State;

      constructor(keyByteArray: Array<number>, initialisationVector: Array<number>)
      {
        super(keyByteArray);

        this._IV = new State(initialisationVector);
        this._previousState = null;
      }


      /**
      * @param {Array<number>} plainDataByteArray, array of 16 byte values.
      * @override
      * @returns {Array<number>} the encrypted data as array of bytes;
      * @throws {TS.InvalidTypeException}
      * @throws {TS.ArgumentException}
      */
      public encrypt(plainDataByteArray: Array<number>): Array<number>
      {
        var _state: State;

        TS.Utils.checkUnsignedByteArrayParameter(plainDataByteArray, "plainDataByteArray", "TS.Security.AES_CBCStreamEnabled.encrypt");

        if (plainDataByteArray.length != 16)
        {
          throw new TS.ArgumentException("plainDataByteArray", plainDataByteArray, "The 'plainDataByteArray' must have a lenght which is a multiple of 16 (the AES block size). Use the 'padData' function in oder to give your data an appropriate length.");
        }//END if

        if (this._previousState == null)
        {
          this._previousState = this._IV;
        }//END if

        _state = new State(plainDataByteArray)
        _state.xor(this._previousState);
        _state.encrypt(this.workingKeyByteArray, this.rounds);
        this._previousState = new State(_state.toArray());

        return _state.toArray();
      }


      /**
      * @override
      * @param {Array<number>} cypherDataByteArray, array of 16 byte values.
      * @returns {Array<number>} the encrypted data as array of bytes;
      * @throws {TS.InvalidTypeException}
      * @throws {TS.ArgumentException}
      */
      public decrypt(cypherDataByteArray: Array<number>): Array<number>
      {
        var _state: State;
        var _tempState: State;

        TS.Utils.checkUnsignedByteArrayParameter(cypherDataByteArray, "cypherDataByteArray", "TS.Security.AES_CBCStreamEnabled.decrypt");

        if (cypherDataByteArray.length != 16)
        {
          throw new TS.ArgumentException("cypherDataByteArray", cypherDataByteArray, "The 'cypherDataByteArray' must have a lenght which is a multiple of 16 (the AES block size). Use the 'padData' function in oder to give your data an appropriate length.");
        }//END if

        if (this._previousState == null)
        {
          this._previousState = this._IV;
        }//END if

        _state = new State(cypherDataByteArray);
        _tempState = new State(cypherDataByteArray);
        _state.decrypt(this.workingKeyByteArray, this.rounds);
        _state.xor(this._previousState);
        this._previousState = new State(_tempState.toArray());

        return _state.toArray();
      }

    }//END class



    /**
    * @class
    * @description This is an implementation of the abstract base class 
    *              'TS.Security.AbstractStreamCipher' for the AES_CBC
    *              operation mode.
    * 
    * @see {TS..Security.AbstractStreamCipher}
    */
    export class AES_CBC_Stream extends AbstractStreamCipher
    {
      constructor(keyByteArray: Array<number>,
        initialisationVector: Array<number>,
        cipherOperation: TS.Security.CipherOperationEnum,
        onNextData: (bitString: string) => void,
        onClosed: () => void,
        onError: (exception: TS.Exception) => void)
      {
        TS.Utils.checkConstructorCall(this, TS.Security.AES_CBC_Stream);
        TS.Utils.checkNotEmptyParameter(keyByteArray, "keyByteArray", "TS.Security.AES_CBC_Stream.constructor");
        TS.Utils.checkKeyByteArray(keyByteArray, "keyByteArray", "TS.Security.AES_CBC_Stream.constructor");
        TS.Utils.checkNotEmptyParameter(initialisationVector, "initialisationVector", "TS.Security.AES_CBC_Stream.constructor");
        TS.Utils.checkUnsignedByteArrayParameter(initialisationVector, "initialisationVector", "TS.Security.AES_CBC_Stream.constructor");
        TS.Utils.checkParameter(cipherOperation, "cipherOperation", "TS.Security.AES_CBC_Stream.constructor");
        TS.Utils.checkParameter(onNextData, "onNextData", "TS.Security.AES_CBC_Stream.constructor");
        TS.Utils.checkNotUndefinedParameter(onNextData, "onNextData", "TS.Security.AES_CBC_Stream.constructor");
        TS.Utils.checkParameter(onClosed, "onClosed", "TS.Security.AES_CBC_Stream.constructor");
        TS.Utils.checkFunctionParameter(onClosed, "onClosed", "TS.Security.AES_CBC_Stream.constructor");
        TS.Utils.checkParameter(onError, "onError", "TS.Security.AES_CBC_Stream.constructor");
        TS.Utils.checkFunctionParameter(onError, "onError", "TS.Security.AES_CBC_Stream.constructor");

        if (initialisationVector.length != 16)
        {
          throw new TS.ArgumentOutOfRangeException("initialisationVector", initialisationVector, "Argument 'initialisationVector' must be a byte array of the length 16 in function 'TS.Security.AES_CBC_Stream.constructor'.");
        }//END if

        if (!TS.Utils.Assert.isValueOfEnum(cipherOperation, TS.Security.CipherOperationEnum))
        {
          throw new TS.InvalidTypeException("cipherOperation", cipherOperation, "Argument 'cipherOperation' must be a valid element of the 'TS.Security.CipherOperationEnum' enumeration in function 'TS.Security.AES_CBC_Stream.constructor'.");
        }//END if

        super(cipherOperation, onNextData, onClosed, onError);

        //Set ther blockCipher object.
        this._blockCipher = new AES_CBCStreamEnabled(keyByteArray, initialisationVector);

        //Set the bufferSize which is 128 bit for AES / AES_ECB.
        this._bufferSizeInBit = 128;

        //Set the streamState to signal the end of the class construction.
        this._streamState = StreamStateEnum.CREATED;

      }

      /**
      * @override
      * @description This function uses the current 'blockCipher' 
      *              to encrypt / decrypt the 'bitString'.
      *              Returns the encrypted / decryped data as 
      *              byte array.
      * 
      * @param {string} bitString, a bit string which has the length of the 
      *                 'bufferSizeInBit'.
      * 
      * @returns {string}, the encrypted / decrypted data as bit string.
      */
      protected cipher(bitString: string): string
      {
        var _block: Array<number>;

        _block = TS.Utils.bitStringToByteArray(bitString);

        if (this._cipherOperation == TS.Security.CipherOperationEnum.DECRYPT)
        {
          return TS.Utils.byteArrayToBitString(this._blockCipher.decrypt(_block))
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
        var _byteArray: Array<number>;

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

          //The feeded data didn't align to
          //the block size of 128 bit.
          //Signal an error. Let the consumer handle
          //the situation.
          this._onError(new TS.InvalidOperationException("The feeded data does not comply with the block length requirement of the AES_CBC cipher operation."));

          //Clear the buffer
          this._inputBuffer = "";

          return;
        }//END if

        //Clear the buffer
        this._inputBuffer = "";

        //Signal that the stream has closed.
        this._onClosed();
      }

    }//END class
  }//END module
}//END module