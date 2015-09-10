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
        throw new Error("TS.Security.AES_CFB requires additional references to the following module(s) or class(es): " + _missingArray.join(", ") + ".");
      }//END if

    })();


    /**
     * @class
     * @description This is an implementation of the CIPHER FEEDBACK (CFB) operation
     *              mode as described in the NIST publication 800-38a, 
     *              'Recommendation for Block Cipher Modes of Operation'.
     * @see {@link hred=http://csrc.nist.gov/publications/nistpubs/800-38a/addendum-to-nist_sp800-38A.pdf}
     */
    export class AES_CFB extends AES
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


      /**
      * @constructs
      * @description Creates a new AES_CFB instance with the key given in argument 'keyByteArray', 
      *              the initialisation vector given in argument 'initialisationVector' and the 
      *              segment size in bit given in argument 'segmentSizeInBit'.
      *              The 'keyByteArray' must have a total length of 128, 192 or 256 bits. That means the
      *              'keyByteArray' array must have a length of either 16, 24 or 32. Using a 
      *              key which doesn't comply with that rule will raise an exception.
      *              The initialisation vector must be an array of unsigned byte values with a total
      *              of 16 elements.
      *              The 'segmentSizeInBit' must be a value in the range of [1..128].
      *              The segment size denotes the data size the cipher object will operate on. The 
      *              AES_CFB mode is the only AES operation mode which give you totally freedom in
      *              choosing the data size you intend to use. At leas in the allowed range between
      *              1 and 128. So if you have to encrypt / decrypt single bits, this operation mode
      *              will be your best choice
      *              But you have to pay for that freedom with a bad runtime behavior. 
      *              It goes from worst behavior by a segment size of 1 bit, to best behavior by a segment 
      *              size of 128 bit, which is the normal block length of the AES algorithm.
      * 
      * 
      * @param {Array<number>} keyByteArray, an array of [16 | 24 | 32] byte holding the key.
      * @param {Array<number>} initialisationVector, an array of 16 byte holding the initalisation vector.
      * @param {number} segmentSizeInBit, must be a numbe between [1..128].
      * 
      * @throws {TS.InvalidOperationException}
      * @throws {TS.ArgumentNullUndefOrEmptyException}
      * @throws {TS.ArgumentOutOfRangeException}
      * @throws {TS.InvalidTypeException}
      */
      constructor(keyByteArray: Array<number>, initialisationVector: Array<number>, segmentSizeInBit: number)
      {
        TS.Utils.checkConstructorCall(this, TS.Security.AES_CFB);
        TS.Utils.checkNotEmptyParameter(keyByteArray, "keyByteArray", "TS.Security.AES_CFB.constructor");
        TS.Utils.checkKeyByteArray(keyByteArray, "keyByteArray", "TS.Security.AES_CFB.constructor");
        TS.Utils.checkNotEmptyParameter(initialisationVector, "initialisationVector", "TS.Security.AES_CFB.constructor");
        TS.Utils.checkUnsignedByteArrayParameter(initialisationVector, "initialisationVector", "TS.Security.AES_CFB.constructor");
        TS.Utils.checkUnsignedIntegerNumberParameter(segmentSizeInBit, "segmentSizeInBit", "TS.Security.AES_CFB.constructor");

        if (initialisationVector.length != 16)
        {
          throw new TS.ArgumentOutOfRangeException("initialisationVector", initialisationVector, "Argument 'initialisationVector' must be a byte array of the length 16 in function 'TS.Security.AES_CFB.constructor'.");
        }//END if

        if ((segmentSizeInBit < 1) || (segmentSizeInBit > 128))
        {
          throw new TS.ArgumentOutOfRangeException("segmentSizeInBit", segmentSizeInBit, "The argument value must be a value in the range of [1..128]. Error occured in 'TS.Security.AES_CFB.constructor'.");
        }//END if

        super(keyByteArray);

        this._segmentSizeInBit = segmentSizeInBit;
        this._IV = new State(initialisationVector);
      }


      /**
      * @override
      * @description Encrypts the data given in argument 'plainDataByteArray' and
      *              returns the encrypted data as byte array.
      *              This function uses the Key and initialisation vector which 
      *              was set in the constructor. This function will not work if
      *              the segment size doesn't align with byte length (8 bit). 
      * 
      * @param {Array<number>} plainDataByteArray
      *
      * @returns {Array<number>} The encrypted data as byte array.
      *
      * @throws {TS.ArgumentNullUndefOrEmptyException}
       * @throws {TS.InvalidTypeException}
      * @throws {TS.InvalidOperationException}
      */
      public encrypt(plainDataByteArray : Array<number>): Array<number>
      {
        TS.Utils.checkNotEmptyParameter(plainDataByteArray, "plainDataByteArray", "TS.Security.AES_CFB.encrypt");
        TS.Utils.checkUnsignedByteArrayParameter(plainDataByteArray, "plainDataByteArray", "TS.Security.AES_CFB.encrypt");

        if ((this._segmentSizeInBit % 8) != 0)
        {
          throw new TS.InvalidOperationException("The 'encrypt' function which uses a byte array as input parameter can only be use if the segment size aligns with 8 bit. That means, segment size must be a value which is n * 8, where n is a positive integer > 0. Use the 'encryptBitString' function if the segment size doesn't fit. Error occured in 'TS.Security.AES_CFB.encrypt'.");
        }//END if
        return this.encryptDecryptInternal(plainDataByteArray, CipherOperationEnum.ENCRYPT);
      }


      /**
      * @override
      * @description Decryts the data given in argument 'plainDataByteArray' and
      *              returns the decrypted data as byte array.
      *              This function uses the Key and initialisation vector which 
      *              was set in the constructor. This function will not work if
      *              the segment size doesn't align with byte length (8 bit). 
      *
      * @param {Array<number>} cipherDataByteArray
      * 
      * @returns {Array<number>} The decrypted data as byte array.
      *
      * @throws {TS.ArgumentNullUndefOrEmptyException}
       * @throws {TS.InvalidTypeException}
      * @throws {TS.InvalidOperationException}
      */
      public decrypt(cipherDataByteArray: Array<number>): Array<number>
      {
        TS.Utils.checkNotEmptyParameter(cipherDataByteArray, "cipherDataByteArray", "TS.Security.AES_CFB.encrypt");
        TS.Utils.checkUnsignedByteArrayParameter(cipherDataByteArray, "cipherDataByteArray", "TS.Security.AES_CFB.encrypt");

        if ((this._segmentSizeInBit % 8) != 0)
        {
          throw new TS.InvalidOperationException("The 'decrypt' function which uses a byte array as input parameter can only be use if the segment size aligns with 8 bit. That means, segment size must be a value which is n * 8, where n is a positive integer > 0. Use the 'decryptBitString' function if the segment size doesn't fit. Error occured in 'TS.Security.AES_CFB.decrypt'.");
        }//END if
        return this.encryptDecryptInternal(cipherDataByteArray, CipherOperationEnum.DECRYPT);
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
      *
      * @throws {TS.ArgumentNullUndefOrEmptyException}
      * @throws {TS.ArgumentNullUndefOrWhiteSpaceException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.ArgumentException}
      * @throws {TS.InvalidOperationException}
      */
      public encryptBitString(bitString: string): string
      {
        TS.Utils.checkNotEmptyParameter(bitString, "bitString", "TS.Security.AES_CFB.encryptBitString");
        TS.Utils.checkBitStringParameter(bitString, "bitString", "TS.Security.AES_CFB.encryptBitString");

        if ((bitString.length % this._segmentSizeInBit) != 0)
        {
          throw new TS.InvalidOperationException("The input bit string must align with the current segment size. So the bit string must have a length of n * segment size. Where n is a positive integer > 0. Error occured in 'TS.Security.AES_CFB.encryptBitString'.");
        }//END if

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
      *
      * @throws {TS.ArgumentNullUndefOrEmptyException}
      * @throws {TS.ArgumentNullUndefOrWhiteSpaceException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.ArgumentException}
      * @throws {TS.InvalidOperationException}
      */
      public decryptBitString(bitString: string): string
      {
        TS.Utils.checkNotEmptyParameter(bitString, "bitString", "TS.Security.AES_CFB.decryptBitString");
        TS.Utils.checkBitStringParameter(bitString, "bitString", "TS.Security.AES_CFB.encryptBitString");

        if ((bitString.length % this._segmentSizeInBit) != 0)
        {
          throw new TS.InvalidOperationException("The input bit string must align with the current segment size. So the bit string must have a length of n * segment size. Where n is a positive integer > 0. Error occured in 'TS.Security.AES_CFB.decryptBitString'.");
        }//END if

        return this.encryptDecryptBitString(bitString, TS.Security.CipherOperationEnum.DECRYPT);
      }


      /**
      * @override
      * @description Encrypts or decrypts the data given in argument 'dataByteArray'
      *              and returns the processed data as byte array.
      * 
      * @param {Array<number>} dataByteArray
      * @param {CipherOperationEnum} cipherOperation
      * 
      * @return {Array<number>}, the resulting encrypted or decrypted data as byte array.
      */
      protected encryptDecryptInternal(dataByteArray: Array<number>, cipherOperation : CipherOperationEnum): Array<number>
      {
        var _resultArray: Array<number>;
        var _workingByteArray: Array<number>;
        var _segmentByteArray: Array<number>;
        var _inputState: State;
        var _outputSegment: string;
        var _inputSegment: string;
        var _segmentSizeInByte: number;

        if ((this._segmentSizeInBit % 8) != 0)
        {
          throw new TS.InvalidOperationException("The 'encryptDecryptInternal' function which uses a byte array as input parameter can only be use if the segment size aligns with 8 bit. That means, segment size must be a value which is n * 8, where n is a positive integer > 0. Use the 'encryptDecryptBitString' function if the segment size doesn't fit. Error occured in 'TS.Security.AES_CFB.encryptDecryptInternal'.");
        }//END if

        _segmentSizeInByte = this._segmentSizeInBit / 8;
        _workingByteArray = dataByteArray.slice();
        _inputState = new State(this._IV.toArray());
        _resultArray = new Array<number>();

        while (_workingByteArray.length > 0)
        {
          _segmentByteArray = _workingByteArray.slice(0, _segmentSizeInByte);

          if (_segmentByteArray.length != _segmentSizeInByte)
          {
            throw new TS.InvalidOperationException("The given data doesn't align with the current segment size. Cipher operation cancelled. Error occured in 'TS.Security.AES_CFB.encryptDecryptInternal'.");
          }//END if

          _inputSegment = TS.Utils.byteArrayToBitString(_segmentByteArray);
          _workingByteArray = _workingByteArray.slice(_segmentSizeInByte);
          _outputSegment = this.encryptDecryptSegment(_inputSegment, cipherOperation, _inputState, this._segmentSizeInBit);

          if (cipherOperation == CipherOperationEnum.ENCRYPT)
          {
            _inputState = this.createNextInputState(_inputState,  _outputSegment);
          }//END if
          else
          {
            _inputState = this.createNextInputState(_inputState, _inputSegment);
          }//END else

          _resultArray = _resultArray.concat(TS.Utils.bitStringToByteArray(_outputSegment));
        }//END while

        return _resultArray;
      }


      /*
      * @private
      */
      private encryptDecryptBitString(bitString: string, cipherOperation: CipherOperationEnum): string
      {
        var _inputState: State;
        var _inputString: string;
        var _outputSegment: string;
        var _resulString: string;
        var _inputSegment: string;
        var _workingBitString: string;


        _inputState = new State(this._IV.toArray());
        _resulString = "";
        _workingBitString = bitString.substr(0);

        while (_workingBitString.length >= this._segmentSizeInBit)
        {
          _inputSegment = _workingBitString.substr(0, this._segmentSizeInBit);
          _workingBitString = _workingBitString.substr(this._segmentSizeInBit);
          _outputSegment = this.encryptDecryptSegment(_inputSegment, cipherOperation, _inputState, this._segmentSizeInBit);
          _resulString += _outputSegment;

          if (cipherOperation == CipherOperationEnum.ENCRYPT)
          {
            _inputState = this.createNextInputState(_inputState, _outputSegment);
          }//END if
          else
          {
            _inputState = this.createNextInputState(_inputState, _inputSegment);
          }//END else
        }//END while

        return _resulString;
      }


      /**
      * @private
      */
      private encryptDecryptSegment(binaryString: string, cipherOperation: CipherOperationEnum, inputState: State, segmentSizeInBit: number): string
      {
        var _outputState: State;
        var _resultString: string;
        var _xorString: string;
        var _index: number;

        _outputState = new State(inputState.toArray());
        _outputState.encrypt(this.workingKeyByteArray, this.rounds);
        _xorString = TS.Utils.byteArrayToBitString(_outputState.toArray());
        _xorString = _xorString.substr(0, segmentSizeInBit);
        _resultString = "";

        for (_index = 0; _index < segmentSizeInBit; _index++)
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
  }//END module
}//END module