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
        _missingArray.push("TS.Security.AES_CFB");
      }

      if (TS.Security.State == undefined)
      {
        _missingArray.push("TS.Security.AbstractStreamCipher");
      }

      if (_missingArray.length > 0)
      {
        throw new Error("TS.Security.AES_CFB_Stream requires additional references to the following module(s) or class(es): " + _missingArray.join(", ") + ".");
      }//END if

    })();



    /**
     * @class
     * @description This is an implementation of the CIPHER FEEDBACK (CFB) operation
     *              mode as described in the NIST publication 800-38a, 
     *              'Recommendation for Block Cipher Modes of Operation'.
     *              This class differs from the 'TS.Security.AES_CFB' in that way, that the
     *              class is more streaming friendly. This class sacrifices the thread safety 
     *              for that purpose. But that's not a problem, since the stream encapsulates
     *              the use of this class and ensures thread safety itself.
     * @see {@link hred=http://csrc.nist.gov/publications/nistpubs/800-38a/addendum-to-nist_sp800-38A.pdf}
     */
    class AES_CFBStreamEnabled extends AES
    {
      /** 
       * @private 
       */
      private _inputState: State;
      /*
       * @private
       */
      private _IV: State;
      /** 
       * @private
       */
      private _segmentSizeInBit: number;
      /*
       * @private 
       */
      private _onSegmentComplete: (binaryString: string) => void;
      /*
       * @private
       */
      private _onClosed: () => void;
      /** 
       * @private 
       */
      private _onError: (exception: TS.Exception) => void;
      /** 
       * @private 
       */
      private _streamState: StreamStateEnum;
      /** 
       * @private 
       */
      private _inputBuffer: string;
      /** 
       * @private 
       */
      private _timer: number;
      /** 
       * @private 
       */
      private _streamCipherOperation: CipherOperationEnum;


      constructor(keyByteArray: Array<number>, initialisationVector: Array<number>, segmentSizeInBit: number)
      {
        super(keyByteArray);

        this._segmentSizeInBit = segmentSizeInBit;
        this._IV = new State(initialisationVector);
        this._inputState = null;
      }


      /**
      * @override
      * @throws {TS.NotImplementedException}
      */
      public encrypt(plainDataByteArray: Array<number>): Array<number>
      {
        throw new TS.NotImplementedException("Function 'encrypt' is not implemente in class 'TS.Security.AES_CFBStreamEnabled'.");
      }


      /**
      * @override
      * @throws {TS.NotImplementedException}
      */
      public decrypt(cipherDataByteArray: Array<number>): Array<number>
      {
        throw new TS.NotImplementedException("Function 'decrypt' is not implemente in class 'TS.Security.AES_CFBStreamEnabled'.");
      }



      /**
      * @description Encryts the data given in argument 'bitString' and
      *              returns the encrypted data as bit string.
      *              This function uses the Key and initialisation vector which 
      *              was set in the constructor. 
      *
      * @param {string} bitString
      * 
      * @returns {string} The encrypted data as bit string.
      */
      public encryptBitString(bitString: string): string
      {
        return this.encryptDecryptBitString(bitString, TS.Security.CipherOperationEnum.ENCRYPT);
      }


      /**
      * @description Decryts the data given in argument 'bitString' and
      *              returns the decrypted data as bit string.
      *              This function uses the Key and initialisation vector which 
      *              was set in the constructor. 
      *
      * @param {string} bitString
      * 
      * @returns {string} The decrypted data as bit string.
      */
      public decryptBitString(bitString: string): string
      {
        return this.encryptDecryptBitString(bitString, TS.Security.CipherOperationEnum.DECRYPT);
      }


      /**
      * @override
      * @throws {TS.NotImplementedException}
      */
      protected encryptDecryptInternal(dataByteArray: Array<number>, cipherOperation: CipherOperationEnum): Array<number>
      {
        throw new TS.NotImplementedException("Function 'decrypt' is not implemente in class 'TS.Security.AES_CFBStreamEnabled'.");
      }


      /*
      * @private
      */
      private encryptDecryptBitString(bitString: string, cipherOperation: CipherOperationEnum): string
      {
        var _outputSegment: string;


        if (this._inputState == null)
        {
          this._inputState = new State(this._IV.toArray());
        }//END if


        _outputSegment = this.encryptDecryptSegment(bitString, cipherOperation, this._inputState);

        if (cipherOperation == CipherOperationEnum.ENCRYPT)
        {
          this._inputState = this.createNextInputState(this._inputState, _outputSegment);
        }//END if
        else
        {
          this._inputState = this.createNextInputState(this._inputState, bitString);
        }//END else

        return _outputSegment;
      }


      /**
      * @private
      */
      private encryptDecryptSegment(binaryString: string, cipherOperation: CipherOperationEnum, inputState: State): string
      {
        var _outputState: State;
        var _resultString: string;
        var _xorString: string;
        var _index: number;

        _outputState = new State(inputState.toArray());
        _outputState.encrypt(this.workingKeyByteArray, this.rounds);
        _xorString = TS.Utils.byteArrayToBitString(_outputState.toArray());
        _xorString = _xorString.substr(0, this._segmentSizeInBit);
        _resultString = "";

        for (_index = 0; _index < this._segmentSizeInBit; _index++)
        {
          _resultString += (parseInt(_xorString.charAt(_index), 2) ^ parseInt(binaryString.charAt(_index), 2)).toString(2);
        }//END for

        return _resultString;
      }


      /**
      * @private
      */
      private createNextInputState(state: State, cipherSegment: string): State
      {
        var _binaryString: string;
        var _byteString: string;
        var _resultArray: Array<number>;

        _binaryString = "";
        state.toArray().forEach((value, index, array) => { _binaryString += TS.Utils.byteToBitString(value); });
        _binaryString = _binaryString.substr(this._segmentSizeInBit) + cipherSegment;
        _resultArray = new Array<number>();
        while (_binaryString.length >= 8)
        {
          _byteString = _binaryString.slice(0, 8);
          _binaryString = _binaryString.slice(8);
          _resultArray.push(parseInt(_byteString, 2));
        }//END while
        return new State(_resultArray);
      }

    }//END class



    /**
     * @class
     * @description This is an implementation of the abstract base class 
     *              'TS.Security.AbstractStreamCipher' for the AES_CFB
     *              operation mode.
     * 
     * @see {TS.Security.AbstractStreamCipher}
     */
    export class AES_CFB_Stream extends AbstractStreamCipher
    {
      constructor(keyByteArray: Array<number>,
        initialisationVector: Array<number>,
        segmentSizeInBit: number,
        cipherOperation: TS.Security.CipherOperationEnum,
        onNextData: (bitString : string) => void,
        onClosed: () => void,
        onError: (exception: TS.Exception) => void)
      {
        TS.Utils.checkConstructorCall(this, TS.Security.AES_CFB_Stream);
        TS.Utils.checkNotEmptyParameter(keyByteArray, "keyByteArray", "TS.Security.AES_CFB_Stream.constructor");
        TS.Utils.checkKeyByteArray(keyByteArray, "keyByteArray", "TS.Security.AES_CFB_Stream.constructor");
        TS.Utils.checkNotEmptyParameter(initialisationVector, "initialisationVector", "TS.Security.AES_CFB_Stream.constructor");
        TS.Utils.checkUnsignedByteArrayParameter(initialisationVector, "initialisationVector", "TS.Security.AES_CFB_Stream.constructor");
        TS.Utils.checkUnsignedIntegerNumberParameter(segmentSizeInBit, "segmentSizeInBit", "TS.Security.AES_CFB.constructor");
        TS.Utils.checkParameter(cipherOperation, "cipherOperation", "TS.Security.AES_CFB_Stream.constructor");
        TS.Utils.checkParameter(onNextData, "onNextData", "TS.Security.AES_CFB_Stream.constructor");
        TS.Utils.checkFunctionParameter(onNextData, "onNextData", "TS.Security.AES_CFB_Stream.constructor");
        TS.Utils.checkParameter(onClosed, "onClosed", "TS.Security.AES_CFB_Stream.constructor");
        TS.Utils.checkFunctionParameter(onClosed, "onClosed", "TS.Security.AES_CFB_Stream.constructor");
        TS.Utils.checkParameter(onError, "onError", "TS.Security.AES_CFB_Stream.constructor");
        TS.Utils.checkFunctionParameter(onError, "onError", "TS.Security.AES_CFB_Stream.constructor");

        if (initialisationVector.length != 16)
        {
          throw new TS.ArgumentOutOfRangeException("initialisationVector", initialisationVector, "Argument 'initialisationVector' must be a byte array of the length 16 in function 'TS.Security.AES_CFB_Stream.constructor'.");
        }//END if

        if ((segmentSizeInBit < 1) || (segmentSizeInBit > 128))
        {
          throw new TS.ArgumentOutOfRangeException("segmentSizeInBit", segmentSizeInBit, "Argument 'segmentSizeInBit' must be a value in the range [0..128] in function 'TS.Security.AES_CFB_Stream.constructor'.");
        }//END if

        if (!TS.Utils.Assert.isValueOfEnum(cipherOperation, TS.Security.CipherOperationEnum))
        {
          throw new TS.InvalidTypeException("cipherOperation", cipherOperation, "Argument 'cipherOperation' must be a valid element of the 'TS.Security.CipherOperationEnum' enumeration in function 'TS.Security.AES_CFB_Stream.constructor'.");
        }//END if

        super(cipherOperation, onNextData, onClosed, onError);

        //Set ther blockCipher object.
        this._blockCipher = new AES_CFBStreamEnabled(keyByteArray, initialisationVector, segmentSizeInBit);

        //Set the bufferSize which is equal to the 
        //segment size in AES_CFB operation mode.
        this._bufferSizeInBit = segmentSizeInBit

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
        if (this._cipherOperation == TS.Security.CipherOperationEnum.DECRYPT)
        {
          return (<AES_CFBStreamEnabled> this._blockCipher).decryptBitString(bitString);
        }//END if

        if (this._cipherOperation == TS.Security.CipherOperationEnum.ENCRYPT)
        {
          return (<AES_CFBStreamEnabled> this._blockCipher).encryptBitString(bitString);
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
          //the segment size set in the constructor.
          //Signal an error. Let the consumer handle
          //the situation.
          this._onError(new TS.InvalidOperationException("The feeded data does not comply with the segment size requirement of the AES_CFB cipher operation."));

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