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

      if (_missingArray.length > 0)
      {
        throw new Error("TS.Security.AES requires additional references to the following module(s) or class(es): " + _missingArray.join(", ") + ".");
      }//END if

    })();


    function getRoundConstant(index: number): number
    {
      return TS.Security.getAES_roundConstants()[index];
    }


    function getSubstitution(index: number): number
    {
      return TS.Security.getAES_substitutionTable()[index];
    }


    /**
    * @class
    * @classdesc This class is an implements of the ADVANCED ENCRYPTION STANDARD (AES)
    *            as described in the FIPS publication fips-197, 
    *            'Announcing the ADVANCED ENCRYPTION STANDARD (AES)'.
    *            The cipher mode decribed in that publication is also identical to
    *            the ELECTRONIC CODE BOOK (ECB) operation mode described in the 
    *            NIST publication 800-38a, 'Recommendation for Block Cipher Modes of Operation'.
    * 
    * @see {@link href=http://csrc.nist.gov/publications/fips/fips197/fips-197.pdf}
    * @see {@link hred=http://csrc.nist.gov/publications/nistpubs/800-38a/addendum-to-nist_sp800-38A.pdf}
    */
    export class AES extends TS.Security.Cryptography
    {

      //The 'workingKeyByteArray' is the 'keyByteArray'
      //after key expansion.
      /** 
      * @protected
      * @description The working key byte array holds the 
      *              working key which was created from the 
      *              initial key by the key expansion function.
      * 
      * @see {TS.Security.AES.expandKey}
      */
      protected workingKeyByteArray: Array<number>;

      /**
      * @protected
      * @description Number of rounds executed per cipher operation.
      *              The value of this variable depends on the key 
      *              lenght used in the constructor.
      * 
      */
      protected rounds: number;

      /**
      * @constructs
      * @description Create a new AES instance with the key given in argument 'keyByteArray'. 
      *              The 'keyByteArray' must have a total length of 128, 192 or 256 bits. That means the
      *              'keyByteArray' array must have a length of either 16, 24 or 32. Using a 
      *              key which doesn't comply with that rule will raise an exception.
      * 
      * @param {Array<number>} keyByteArray, an array of [16 | 24 | 32] byte holding the key.
      * 
      * @throws {TS.ArgumentNullUndefOrEmptyException}
      * @throws {TS.InvalidOperationException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.ArgumentOutOfRangeException}
      */
      constructor(keyByteArray: Array<number>)
      {
        TS.Utils.checkConstructorCall(this, TS.Security.AES);
        TS.Utils.checkNotEmptyParameter(keyByteArray, "keyByteArray", "TS.Security.AES.constructor");
        TS.Utils.checkKeyByteArray(keyByteArray, "keyByteArray", "TS.Security.AES.constructor");

        super();

        switch (keyByteArray.length)
        {
          case 16:
            {
              this.rounds = 10;
              this.workingKeyByteArray = TS.Security.AES.expandKey(keyByteArray);
              break;
            }
          case 24:
            {
              this.rounds = 12;
              this.workingKeyByteArray = TS.Security.AES.expandKey(keyByteArray);
              break;
            }
          case 32:
            {
              this.rounds = 14;
              this.workingKeyByteArray = TS.Security.AES.expandKey(keyByteArray);
              break;
            }
          default:
            {
              this.rounds = 0;
              this.workingKeyByteArray = new Array<number>();
              throw new TS.ArgumentOutOfRangeException("keyByteArray", keyByteArray, "The argument 'keyByteArray' must be a byte array with one of the following lengths: [16,24,32]. All other array lengths are considered invalid.");
            }
        }//END switch
      }




      /**
      * @description Encrypts a block of 16 byte plain text and returns 
      *              the enrypted block as byte array.
      * 
      * @param {Array<number>} dataByteArray, the array must be aligned 
      *                        to 16 byte. That means the length must be 
      *                        n * 16, where n is any positive integer number
      *                        greater zero.
      * 
      * @returns {Array<number>} the enrypted data as byte array.
      * 
      * @throws {TS.ArgumentNullUndefOrEmptyException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.ArgumentException}
      */
      public encrypt(dataByteArray: Array<number>): Array<number>
      {
        var _resultByteArray: Array<number>;
        var _dataByteArray: Array<number>;

        TS.Utils.checkNotEmptyParameter(dataByteArray, "dataByteArray", "TS.Security.AES.encrypt");
        TS.Utils.checkUnsignedByteArrayParameter(dataByteArray, "dataByteArray", "TS.Security.AES.encrypt");

        if ((dataByteArray.length % 16) != 0)
        {
          throw new TS.ArgumentException("dataByteArray", dataByteArray, "The 'dataByteArray' must be an array of n * 16 elements (the AES block size). Use the 'padData' function in oder to give your data an appropriate length.");
        }//END if

        _dataByteArray = dataByteArray.slice();
        _resultByteArray = new Array<number>();

        while (_dataByteArray.length > 0)
        {
          _resultByteArray = _resultByteArray.concat(this.encryptDecryptInternal(_dataByteArray.slice(0, 16), TS.Security.CipherOperationEnum.ENCRYPT))
          _dataByteArray = _dataByteArray.slice(16);
        }//END while

        return _resultByteArray;
      }


      /**
      * @description Decrypts a block of 16 byte cipher text and returns 
      *              the decrypted block as byte array.
      * 
      * @param {Array<number>} dataByteArray, the array must be aligned 
      *                        to 16 byte. That means the length must be 
      *                        n * 16, where n is any positive integer number
      *                        greater zero.
      * 
      * @returns {Array<number>} the decrypted data as byte array.
      * 
      * @throws {TS.ArgumentNullUndefOrEmptyException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.ArgumentException}
      */
      public decrypt(dataByteArray: Array<number>): Array<number>
      {
        var _resultByteArray: Array<number>;
        var _dataByteArray: Array<number>;

        
        TS.Utils.checkNotEmptyParameter(dataByteArray, "dataByteArray", "TS.Security.AES.decrypt");
        TS.Utils.checkUnsignedByteArrayParameter(dataByteArray, "dataByteArray", "TS.Security.AES.decrypt");

        if ((dataByteArray.length % 16) != 0)
        {
          throw new TS.ArgumentException("dataByteArray", dataByteArray, "The 'dataByteArray' must be an array of n * 16 elements (the AES block size).");
        }//END if

        _dataByteArray = dataByteArray.slice();
        _resultByteArray = new Array<number>();

        while (_dataByteArray.length > 0)
        {
          _resultByteArray = _resultByteArray.concat(this.encryptDecryptInternal(_dataByteArray.slice(0, 16), TS.Security.CipherOperationEnum.DECRYPT))
          _dataByteArray = _dataByteArray.slice(16);
        }//END while

        return _resultByteArray;
      }


      /**
      * @protected
      * @description Encrypts or decrypts the data given in argument 'dataByteArray'
      *              and returns the processed data as byte array.
      * 
      * @param {Array<number>} dataByteArray, array of 16 byte values.
      * @param {CipherOperationEnum} cipherOperation
      * 
      * @return {Array<number>}, the resulting encrypted or decrypted data as byte array.
      *
      * @throws {TS.ArgumentNullUndefOrEmptyException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.ArgumentException}
      */
      protected encryptDecryptInternal(dataByteArray: Array<number>, cipherOperation: CipherOperationEnum): Array<number>
      {
        var _state: State;
        var _index: number;
        var _resultByteArray: Array<number>;

        TS.Utils.checkNotEmptyParameter(dataByteArray, "dataByteArray", "TS.Security.AES.encryptDecryptInternal");
        TS.Utils.checkUnsignedByteArrayParameter(dataByteArray, "dataByteArray", "TS.Security.AES.encryptDecryptInternal");
        TS.Utils.checkParameter(cipherOperation, "cipherOperation", "TS.Security.AES.encryptDecryptInternal");

        if (!TS.Utils.Assert.isValueOfEnum(cipherOperation, TS.Security.CipherOperationEnum))
        {
          throw new TS.InvalidTypeException("cipherOperation", cipherOperation, "Argument 'cipherOperation' must be a valid element of the 'TS.Security.AES.encryptDecryptInternal' enumeration in function 'TS.Security.AES_CFB_Stream.constructor'.");
        }//END if

        _resultByteArray = new Array<number>();
        _index = 0;
        _state = new State(dataByteArray);

        if (cipherOperation == CipherOperationEnum.ENCRYPT)
        {
          _state.encrypt(this.workingKeyByteArray, this.rounds);
        }//END if
        else
        {
          _state.decrypt(this.workingKeyByteArray, this.rounds);
        }//END else

        return _state.toArray();
      }


      /**
      * @private
      * @static
      * @description The function substitues each byte in the
      *              byteArray by its substitute and returns
      *              the new created byte array.
      * 
      * @returns {Array<number>}
      *
      * @throws {TS.ArgumentNullUndefOrEmptyException}
      * @throws {TS.InvalidTypeException}
      */
      private static substituteBytes(byteArray: Array<number>): Array<number>
      {
        var _index: number;
        var _resultByteArray: Array<number>;

        TS.Utils.checkNotEmptyParameter(byteArray, "byteArray", "TS.Security.AES.substituteBytes");
        TS.Utils.checkUnsignedByteArrayParameter(byteArray, "byteArray", "TS.Security.AES.substituteBytes");

        _resultByteArray = new Array<number>();

        for (_index = 0; _index < byteArray.length; _index++)
        {
          _resultByteArray[_index] = getSubstitution(byteArray[_index]);
        }//END for

        return _resultByteArray;
      }


      /**
      * @private
      * @static
      * @description Expands the initial key and returns the resulting
      *              working key as byte array.
      * 
      * @see {TS.Security.AES.workingKeyByteArray}
      * @see {@link http://csrc.nist.gov/publications/fips/fips197/fips-197.pdf} Chapter 5.2 Key Expansion
      * 
      * @params {Array<number>} keyByteArray, array of bytes which holds the initial key.
      * @param {number} rounds
      * 
      * @returns {Array<number>} The resulting working key as byte array.
      *
      * @throws {TS.ArgumentNullUndefOrEmptyException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.ArgumentOutOfRangeException}
      */
      private static expandKey(keyByteArray: Array<number>): Array<number>
      {
        var _tempArray: Array<Array<number>>;
        var _tempWord: Array<number>;
        var _resultArray: Array<number>
        var _index: number;
        var _columnIndex: number;
        var _roundConstantArray: Array<number>;
        var _blockSizeInWords = 4;
        var _keyLengthInWords: number;
        var _rounds: number;
        
        TS.Utils.checkNotEmptyParameter(keyByteArray, "keyByteArray", "TS.Security.AES.expandKey");
        TS.Utils.checkUnsignedByteArrayParameter(keyByteArray, "byteArray", "TS.Security.AES.expandKey");

        _tempArray = new Array<Array<number>>();
        _resultArray = new Array<number>();
        _index = 0;

        switch (keyByteArray.length)
        {
          case 16:
            {
              _rounds = 10;
              break;
            }
          case 24:
            {
              _rounds = 12;
              break;
            }
          case 32:
            {
              _rounds = 14;
              break;
            }
          default:
            {
              _rounds = 0;
              throw new TS.ArgumentOutOfRangeException("keyByteArray", keyByteArray, "The argument 'keyByteArray' must be a byte array with one of the following lengths: [16,24,32]. All other array lengths are considered invalid.");
            }
        }//END switch

        _keyLengthInWords = keyByteArray.length / 4;


        while (_index * 4 < keyByteArray.length)
        {
          _tempArray[_index] = keyByteArray.slice(_index * 4, (_index + 1) * 4);
          _index++;
        }

        for (_index = _keyLengthInWords; _index < _blockSizeInWords * (_rounds + 1); _index++)
        {
          _tempWord = _tempArray[_index - 1];

          if (_index % _keyLengthInWords === 0)
          {
            _roundConstantArray = [getRoundConstant(_index / _keyLengthInWords), 0, 0, 0];
            _tempWord = this.rotateLeft(_tempWord, 1);
            _tempWord = this.substituteBytes(_tempWord);
            _tempWord = this.xorWord(_tempWord, _roundConstantArray);
          }//END if
          else if (_keyLengthInWords > 6 && _index % _keyLengthInWords === 4)
          {
            _tempWord = TS.Security.AES.substituteBytes(_tempWord);
          }//END else
          _tempArray[_index] = this.xorWord(_tempArray[_index - _keyLengthInWords], _tempWord);
        }//END for

        for (_index = 0; _index < _tempArray.length; _index++)
        {
          for (_columnIndex = 0; _columnIndex < 4; _columnIndex++)
          {
            _resultArray.push(_tempArray[_index][_columnIndex]);
          }//END for
        }//END for

        return _resultArray;
      }

    }//END class

  }//END module
}//END module 