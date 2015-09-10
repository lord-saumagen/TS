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

      if (_missingArray.length > 0)
      {
        throw new Error("TS.Security.StreamCipher requires additional references to the following module(s) or class(es): " + _missingArray.join(", ") + ".");
      }//END if

    })();



    /**
     * @class
     * @description This is an implementation of a stream cipher base class. 
     *              This stream cipher operates asynchronous. 
     *              You can use one of the write functions to feed
     *              the cipher stream. 
     *              Call the close function when you have feeded all
     *              data to the stream.
     *              The stream calls the callback function 
     *              'onData' for each complete encrypted / decrypted
     *              chunk of data. 
     *              The stream calls the callback function
     *              'onClose' if the operation has completely finished.
     *              Because of the asynchronous nature of the stream, 
     *              the call to the 'onClose' callback function 
     *              on the consumer side, may appear
     *              significant later than the call to the close 
     *              function from the feedings side of the stream.
     * 
     *              The stream uses the 'blockCipher' object which must
     *              be an instance of one of the AES operation modes and
     *              schould be set in the constructor.
     *              You must also set the 'bufferSizeInBit' which must 
     *              match with the requirements of the chosen 'blockCipher'.
     *              
     *              The functions 'cipher' and 'internalClose' are abstract
     *              and must be implemented in subclasses.
     *
     *              Set the streamState to 'StreamStateEnum.CREATED' when
     *              you have finished the construction in a subclass.
     * 
     *              The stream can only be used once. Once the 
     *              'onClose' or the 'onError' callback has been called,
     *              the stream is locked. 
     */
    export class AbstractStreamCipher
    {
      /** 
      * @protected
      * @description One of the AES operation mode instances.
      */
      protected _blockCipher: TS.Security.AES;

      /**
      * @protected
      * @description The cipher operation (encrypt or decrypt)
      *              used for the current stream.
      */
      protected _cipherOperation: TS.Security.CipherOperationEnum;

      /** 
      * @protected
      * @description The buffer size in bit use for the current stream.
      *              That is either the block size of the underlying 
      *              block cipher or the segment size.
      */
      protected _bufferSizeInBit: number;

      /** 
      * @protected 
      * @description The state of the current stream.
      */
      protected _streamState: StreamStateEnum;

      /** 
      * @protected 
      * @description The input buffer which holds the feeded
      *              data as bit string until processing.
      */
      protected _inputBuffer: string;

      /*
      * @protected 
      * @description The callback handler which is called on
      *              each successful processed chunk of data.
      */
      protected _onNextData: (bitString: string) => void;

      /*
      * @protected
      * @description The callback handler which is called
      *              when the stream has finally closed.
      *              After that the stream is locked and
      *              can not longer be used.
      */
      protected _onClosed: () => void;

      /** 
      * @protected 
      * @description The callback hander which is called when
      *              an error occured. 
      *              After that the stream is locked and
      *              can not longer be used.
      */
      protected _onError: (exception: TS.Exception) => void;

      /** 
      * @private 
      */
      private _timer: number;

      /**
      * @constructs
      * @description Creates a new AbstractStreamCipher instance with the given cipherOperatin
      *              and callback functions which are common to all stream ciphers classes.
      * 
      * @param {TS.Security.CipherOperationEnum} cipherOperation, the cipher operation executed in this stream.
      * @param {(bitString: string) => void} onNextData, the callback which is called for each successful ciphered chunk of data.
      * @param {() => void} onClosed, the callback which is called when the stream has finally closed. 
      * @param {(exception: TS.Exception) => void} onError, the callback which is called in case of an error.
      * 
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidOperationException}
      * @throws {TS.ArgumentNullUndefOrEmptyException}
      * @throws {TS.ArgumentException}
      * @throws {TS.InvalidTypeException}
      */
      constructor(
        cipherOperation: TS.Security.CipherOperationEnum,
        onNextData: (bitString: string) => void,
        onClosed: () => void,
        onError: (exception: TS.Exception) => void)
      {
        
        TS.Utils.checkConstructorCall(this, TS.Security.AbstractStreamCipher);
        TS.Utils.checkParameter(cipherOperation, "cipherOperation", "TS.Security.AbstractStreamCipher.constructor");
        TS.Utils.checkParameter(onNextData, "onNextData", "TS.Security.AbstractStreamCipher.constructor");
        TS.Utils.checkFunctionParameter(onNextData, "onNextData", "TS.Security.AbstractStreamCipher.constructor");
        TS.Utils.checkParameter(onClosed, "onClosed", "TS.Security.AbstractStreamCipher.constructor");
        TS.Utils.checkFunctionParameter(onClosed, "onClosed", "TS.Security.AbstractStreamCipher.constructor");
        TS.Utils.checkParameter(onError, "onError", "TS.Security.AbstractStreamCipher.constructor");
        TS.Utils.checkFunctionParameter(onError, "onError", "TS.Security.AbstractStreamCipher.constructor");

        if (!TS.Utils.Assert.isValueOfEnum(cipherOperation, TS.Security.CipherOperationEnum))
        {
          throw new TS.InvalidTypeException("cipherOperation", cipherOperation, "Argument 'cipherOperation' must be a valid element of the 'TS.Security.CipherOperationEnum' enumeration in function 'TS.Security.AbstractStreamCipher.constructor'.");
        }//END if

        this._cipherOperation = cipherOperation;
        this._onNextData = onNextData;
        this._onClosed = onClosed;
        this._onError = onError;

        //The block cipher must be
        //set in subclasses
        this._blockCipher = null;

        //The buffer size must be set
        //in subclasses
        this._bufferSizeInBit = null;

        this._inputBuffer = "";
        this._timer = null;

        //The stream state must be set
        //to 'StreamStateEnum.CREATED'
        //at the end of the construction
        //in subclasses.
        this._streamState = null
      }


      /**
      * @description Writes the byte array given in argument 'byteArray' to the
      *              current stream.
      *
      * @param {Array<number>} byteArray
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.ArgumentNullUndefOrWhiteSpaceException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.ArgumentException}
      * @throws {TS.InvalidOperationException}
      */
      public writeByteArray(byteArray: Array<number>): void
      {
        TS.Utils.checkParameter(byteArray, "byteArray", "TS.Security.AbstractStreamCipher.writeByteArray");
        TS.Utils.checkUnsignedByteArrayParameter(byteArray, "byteArray", "TS.Security.AbstractStreamCipher.writeByteArray");
        this.writeBitString(TS.Utils.byteArrayToBitString(byteArray));
      }


      /**
      * @description Writes the byte value given in argument 'byteValue' to the
      *              current stream.
      * 
      * @param {Array<number>} byteValue
      * 
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.ArgumentNullUndefOrWhiteSpaceException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.ArgumentException}
      * @throws {TS.InvalidOperationException}
      */
      public writeByte(byteValue: number): void
      {
        TS.Utils.checkUnsignedByteParameter(byteValue, "byteValue", "TS.Security.AbstractStreamCipher.writeByte");
        this.writeBitString(TS.Utils.byteToBitString(byteValue));
      }


      /**
      * @description Writes the bit string given in argument 'bitString' to the
      *              current stream.
      * 
      * @param {string} bitString
      * 
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.ArgumentNullUndefOrWhiteSpaceException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.ArgumentException}
      * @throws {TS.InvalidOperationException}
      */
      public writeBitString(bitString: string): void
      {
        TS.Utils.checkStringParameter(bitString, "bitString", "TS.Security.AbstractStreamCipher.writeBitString");
        
        if (!TS.Utils.Assert.isBinaryString(bitString))
        {
          throw new TS.ArgumentException("bitString", bitString, "Argument 'bitString' is not a valid binary string in function 'TS.Security.AbstractStreamCipher.writeBitString'.");
        }//END if

        if ((this._streamState == StreamStateEnum.CLOSED) || (this._streamState == StreamStateEnum.REQUEST_FOR_CLOSE))
        {
          throw new TS.InvalidOperationException("Invalid call to 'write' on a closed stream.");
        }//END if

        if (this._streamState < StreamStateEnum.INITIALIZED)
        {
          this.initialize();
        }//END if

        this._inputBuffer += bitString;
      }


      /**
      * @description Closes the current stream for writing. Since the stream operates
      *              asynchronous, the last output from that stream may appear
      *              significant later. The stream is finally closed when the
      *              'onClosed' callback function is called which was designated
      *              during construction.
      */
      public close(): void
      {
        this._streamState = StreamStateEnum.REQUEST_FOR_CLOSE;
      }


      /**
       * @protected
       */
      protected stopTimer(): void
      {
        try
        {
          clearInterval(this._timer);
        }//END try
        catch (e) { };
      }



      /**
       * @protected
       * @abstract
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
      protected cipher(bitString: string) : string
      {
        throw new TS.NotImplementedException("Abstract function 'cipher' is not implemente in class 'TS.Security.AbstractStreamCipher'.");
        //var _block: Array<number>;

        //_block = TS.Utils.bitStringToByteArray(bitString);

        //if (this._cipherOperation == TS.Security.CipherOperationEnum.DECRYPT)
        //{
        //  return this._blockCipher.decrypt(_block);
        //}//END if

        //if (this._cipherOperation == TS.Security.CipherOperationEnum.ENCRYPT)
        //{
        //  return this._blockCipher.encrypt(_block);
        //}//END if

        return "";
      }


      /**
      * @protected
      * @abstract
      */
      protected internalClose(): void
      {
        throw new TS.NotImplementedException("Abstract function 'cipher' is not implemente in class 'TS.Security.AbstractStreamCipher'.");


        ////Set the 'CLOSED' flag and block the stream
        ////for writing. 
        //this._streamState = StreamStateEnum.CLOSED;

        ////Stop the timer
        //this.stopTimer();

        ////Check the buffer for remaining data
        //if (this._inputBuffer.length > 0)
        //{
        //  //Handle the remaining data in an appropriate 
        //  //way for the current block cipher.

        //  //Since the AES / AES_ECB mode doesn't allow operations
        //  //on incomplete blocks call the onError callback.
        //  this._onError(new TS.InvalidOperationException("The feeded data does not comply with the block length requirement of the AES / AES_ECB cipher operation."));

        //  //Clear the buffer
        //  this._inputBuffer = "";

        //  return;
        //}//END if

        ////Clear the buffer
        //this._inputBuffer = "";

        ////Signal that the stream has closed.
        //this._onClosed();
      }


      /**
      * @private
      * @throws {TS.InvalidOperationException}
      */
      private initialize(): void
      {
        //Don't initialize until the construction of the 
        //current class has finished.
        if (this._streamState != StreamStateEnum.CREATED)
        {
          return;
        }//END if

        if ((this._blockCipher == null) || (this._bufferSizeInBit == null))
        {
          throw new TS.InvalidOperationException("Initialization of the abstract class 'TS.Security.AbstractStreamCipher' is not supported.");
        }//END if

        this._inputBuffer = "";
        this._streamState = StreamStateEnum.INITIALIZED;
        this._timer = setInterval(this.process.bind(this), 10);
      }


      /**
      * @private
      */
      private process(): void
      {
        var _segment: string;
        var _processedData: string;

        //Stream is already closed, return.
        if (this._streamState == StreamStateEnum.CLOSED)
        {
          return;
        }//END if

        //No complete buffer available, return and wait for more data.
        if ((this._streamState != StreamStateEnum.REQUEST_FOR_CLOSE) && (this._inputBuffer.length < this._bufferSizeInBit))
        {
          return;
        }//END if


        //Normal operation on state 'INITIALIZED' or 'REQUEST_FOR_CLOSE' as
        //long as there is data which fills a complete buffer.
        if ((this._streamState == StreamStateEnum.INITIALIZED) || (this._streamState == StreamStateEnum.REQUEST_FOR_CLOSE))
        {
          while (this._inputBuffer.length >= this._bufferSizeInBit)
          {
            _segment = this._inputBuffer.substr(0, this._bufferSizeInBit);
            this._inputBuffer = this._inputBuffer.substr(this._bufferSizeInBit);
            try
            {
              _processedData = this.cipher(_segment);
              this._onNextData(_processedData);
            }//END try
            catch (Exception)
            {
              this._streamState = TS.Security.StreamStateEnum.CLOSED;
              this.stopTimer();
              this._inputBuffer = null;
              this._onError(Exception);
            }//END catch
          }//END while

        }//END if


        //Closing the stream was requested. Call internalClose
        //and let that function handle the remaining data in 
        //the buffer, if any. 
        if (this._streamState == StreamStateEnum.REQUEST_FOR_CLOSE)
        {
          this.internalClose();
        }//END if
      }


    }//END class
  }//END modul
}//END module  