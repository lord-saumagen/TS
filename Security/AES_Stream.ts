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
    * @description This is an implementation of the abstract base class 
    *              'TS.Security.AbstractStreamCipher' for the AES / AES_ECB
    *              operation mode.
    * 
    * @see {TS..Security.AbstractStreamCipher}
    */
    export class AES_Stream extends AbstractStreamCipher
    {

      constructor(keyByteArray: Array<number>,
        cipherOperation: TS.Security.CipherOperationEnum,
        onNextData: (bitString: string) => void,
        onClosed: () => void,
        onError: (exception: TS.Exception) => void)
      {
        TS.Utils.checkConstructorCall(this, TS.Security.AES_Stream);
        TS.Utils.checkNotEmptyParameter(keyByteArray, "keyByteArray", "TS.Security.AES_Stream.constructor");
        TS.Utils.checkKeyByteArray(keyByteArray, "keyByteArray", "TS.Security.AES_Stream.constructor");
        TS.Utils.checkParameter(cipherOperation, "cipherOperation", "TS.Security.AES_Stream.constructor");
        TS.Utils.checkParameter(onNextData, "onNextData", "TS.Security.AES_Stream.constructor");
        TS.Utils.checkFunctionParameter(onNextData, "onNextData", "TS.Security.AES_Stream.constructor");
        TS.Utils.checkParameter(onClosed, "onClosed", "TS.Security.AES_Stream.constructor");
        TS.Utils.checkFunctionParameter(onClosed, "onClosed", "TS.Security.AES_Stream.constructor");
        TS.Utils.checkParameter(onError, "onError", "TS.Security.AES_Stream.constructor");
        TS.Utils.checkFunctionParameter(onError, "onError", "TS.Security.AES_Stream.constructor");

        if (!TS.Utils.Assert.isValueOfEnum(cipherOperation, TS.Security.CipherOperationEnum))
        {
          throw new TS.InvalidTypeException("cipherOperation", cipherOperation, "Argument 'cipherOperation' must be a valid element of the 'TS.Security.CipherOperationEnum' enumeration in function 'TS.Security.AES_Stream.constructor'.");
        }//END if

        super(cipherOperation, onNextData, onClosed, onError);

        //Set ther blockCipher object.
        this._blockCipher = new TS.Security.AES(keyByteArray);

        //Set the bufferSize which is 128 bit for AES / AES_ECB.
        this._bufferSizeInBit = 128; 

        //Set the streamState to signal the end of the class construction.
        this._streamState = StreamStateEnum.CREATED;
      }


      /**
      * @override
      * @description This function uses the 'blockCipher' which was set 
      *              in the constructor to encrypt / decrypt the buffer given
      *              in argument 'bitString' and returns the result as 
      *              byte array. 
      * 
      * @param {string} bitString, a bit string which has the length of the 
      *                 'bufferSizeInBit' which was set in the constructor.
      * 
      * @returns {string}, the encrypted / decrypted data as bit string.
      */
      protected cipher(bitString: string) : string
      {
        var _block: Array<number>;

        _block = TS.Utils.bitStringToByteArray(bitString);

        if (this._cipherOperation == TS.Security.CipherOperationEnum.DECRYPT)
        {
          return TS.Utils.byteArrayToBitString(this._blockCipher.decrypt(_block));
        }//END if

        if (this._cipherOperation == TS.Security.CipherOperationEnum.ENCRYPT)
        {
          return TS.Utils.byteArrayToBitString(this._blockCipher.encrypt(_block))
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

          //Since the AES / AES_ECB mode doesn't allow operations
          //on incomplete blocks call the onError callback.
          this._onError(new TS.InvalidOperationException("The feeded data does not comply with the block length requirement of the AES / AES_ECB cipher operation."));

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
  }//END modul
}//END module 