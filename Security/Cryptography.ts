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

      if ((TS.TypeCode == undefined) || (TS.TypeCode.UInt64 == undefined))
      {
        _missingArray.push("TS.TypeCode.UInt64");
      }

      if (TS.Exception == undefined)
      {
        _missingArray.push("TS.Exception");
      }

      if (TS.Security == undefined)
      {
        _missingArray.push("TS.Security");
      }

      if (_missingArray.length > 0)
      {
        throw new Error("TS.Security.Cryptography requires additional references to the following module(s) or class(es): " + _missingArray.join(", ") + ".");
      }//END if

    })();


    function correctNegative(value: number): number
    {
      if (value < 0)
      {
        value = 0x100000000 + value;
      };
      return value;
    }


    /**
    * @class
    * @classdesc The 'Cryptography' is the base class of the hash and crypto classes of
    *            this framework and implements some common used functions.
    */
    export class Cryptography
    {
      protected static CorrectNeg: (value: number) => number = correctNegative;

      /**
      * @constructs 
      * @description Create a new instance of the 'Cryptography' class.
      *
      * @throws {TS.InvalidOperationException}
      */
      public constructor()
      {
        TS.Utils.checkConstructorCall(this, TS.Security.Cryptography);
      }

      //TODO: Create the test functions.
      /**
      * @description This function excutes the XOR operation on the arguments
      *              'firstWord' and 'secondWord' and returns the result as
      *              byte array.
      *
      * @throws {TS.InvalidTypeException}
      * @throws {TS.ArgumentException}
      */
      protected static xorWord(firstWord: Array<number>, secondWord: Array<number>): Array<number>
      {
        TS.Utils.checkUnsignedByteArrayParameter(firstWord, "data", "TS.Security.Cryptography.xorWord");
        TS.Utils.checkUnsignedByteArrayParameter(secondWord, "data", "TS.Security.Cryptography.xorWord");

        if (firstWord.length != 4)
        {
          throw new TS.ArgumentException("firstWord", firstWord, "Argument 'firstWord' has not the required length of 4 elements in function 'TS.Security.Cryptography.xorWord'.");
        }//END if

        if (secondWord.length != 4)
        {
          throw new TS.ArgumentException("secondWord", secondWord, "Argument 'secondWord' has not the required length of 4 elements in function 'TS.Security.Cryptography.xorWord'.");
        }//END if

        return [firstWord[0] ^ secondWord[0], firstWord[1] ^ secondWord[1], firstWord[2] ^ secondWord[2], firstWord[3] ^ secondWord[3]];
      }


      //TODO: Create the test functions.
      /**
      * @description Rotates the elements of the array given in argument 'data'
      *              leftwise. As many positions as given in argument 'positions'.
      *
      * @params {Array<any>} data, the array which will be rotated.
      * @params {number} positions, the number of positions to rotate.
      *
      * @returns {Array<any>}, the input array after rotation.
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      protected static rotateLeft(data: Array<any>, positions: number): Array<any>
      {
        var _resultData: Array<any>;
        var _index: number;
        var _sourceIndex: number;
        var __sourceIndex: number;

        TS.Utils.checkUnsignedIntegerNumberParameter(positions, "positions", "TS.Security.Cryptography.rotateLeft");
        TS.Utils.checkArrayParameter(data, "data", "TS.Security.Cryptography.rotateLeft");

        _resultData = new Array<any>();

        for (_index = 0; _index < data.length; _index++)
        {
          _sourceIndex = (_index + positions) % data.length;
          _resultData.push(data[_sourceIndex]);
        }//END for

        return _resultData;
      }



      /**
      * @description Performs: (x & y) ^ (~x & z)
      *
      * @see {@link http://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf | 4.1.1 SHA-1 Functions }
      */
      protected static ch32(x: number, y: number, z: number): number
      {
        TS.Utils.checkIntegerNumberParameter(x, "x", "TS.Security.Cryptography.ch32");
        TS.Utils.checkIntegerNumberParameter(y, "y", "TS.Security.Cryptography.ch32");
        TS.Utils.checkIntegerNumberParameter(z, "z", "TS.Security.Cryptography.ch32");

        return this.CorrectNeg((x & y) ^ (~x & z));
      }


      //TODO: Create the test functions. Add descripion
      /**
      *@see {@link http://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf | 4.1.1 SHA-1 Functions }
      */
      protected static ch64(x: TS.TypeCode.UInt64, y: TS.TypeCode.UInt64, z: TS.TypeCode.UInt64): TS.TypeCode.UInt64
      {
        var _tempMSInteger: number;
        var _tempLSInteger: number;

        _tempMSInteger = this.ch32(x.MSInteger, y.MSInteger, z.MSInteger);
        _tempLSInteger = this.ch32(x.LSInteger, y.LSInteger, z.LSInteger);

        return new TS.TypeCode.UInt64(_tempMSInteger, _tempLSInteger);
      }

      //TODO: Create the test functions.
      /**
      * @description Performs: (ror 7) ^ (ror 18) ^ (shr 3)
      *
      * @see {@link http://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf | 4.1.2 SHA-224 and SHA - 256 Functions }
      */
      protected static gamma0_32(x: number): number
      {
        TS.Utils.checkIntegerNumberParameter(x, "x", "TS.Security.Cryptography.gamma0_32");

        return this.CorrectNeg(this.rotateRight32(x, 7) ^ this.rotateRight32(x, 18) ^ this.shiftRight32(x, 3));
      }

      //TODO: Create the test functions.
      /**
      * @description Performs: (ror 17) ^ (ror 19) ^ (shr 10)
      *
      * @see {@link http://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf | 4.1.2 SHA-224 and SHA - 256 Functions }
      */
      protected static gamma1_32(x: number): number
      {
        TS.Utils.checkIntegerNumberParameter(x, "x", "TS.Security.Cryptography.gamma1_32");

        return this.CorrectNeg(this.rotateRight32(x, 17) ^ this.rotateRight32(x, 19) ^ this.shiftRight32(x, 10));
      }

      //TODO: Create the test functions.
      /**
      * @description Performs: (x & y) ^ (x & z) ^ (y & z)
      *
      * @see {@link http://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf | 4.1.1 SHA-1 Functions }
      */
      protected static maj32(x: number, y: number, z: number): number
      {
        TS.Utils.checkIntegerNumberParameter(x, "x", "TS.Security.Cryptography.maj32");
        TS.Utils.checkIntegerNumberParameter(y, "y", "TS.Security.Cryptography.maj32");
        TS.Utils.checkIntegerNumberParameter(z, "z", "TS.Security.Cryptography.maj32");

        return this.CorrectNeg((x & y) ^ (x & z) ^ (y & z));
      }

      //TODO: Create the test functions.  Add descripion
      /**
      * @see {@link http://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf | 4.1.1 SHA-1 Functions }
      */
      protected static maj64(x: TS.TypeCode.UInt64, y: TS.TypeCode.UInt64, z: TS.TypeCode.UInt64): TS.TypeCode.UInt64
      {
        var _tempMSInteger: number;
        var _tempLSInteger: number;

        _tempMSInteger = this.maj32(x.MSInteger, y.MSInteger, z.MSInteger);
        _tempLSInteger = this.maj32(x.LSInteger, y.LSInteger, z.LSInteger);

        return new TS.TypeCode.UInt64(_tempMSInteger, _tempLSInteger);
      }


      //TODO: Create the test functions.
      /**
      * @description Performs: (x ^ y ^ z)
      *
      * @see {@link http://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf | 4.1.1 SHA-1 Functions }
      */
      protected static parity(x: number, y: number, z: number): number
      {
        TS.Utils.checkIntegerNumberParameter(x, "x", "TS.Security.Cryptography.parity");
        TS.Utils.checkIntegerNumberParameter(y, "y", "TS.Security.Cryptography.parity");
        TS.Utils.checkIntegerNumberParameter(z, "z", "TS.Security.Cryptography.parity");

        return this.CorrectNeg((x ^ y ^ z));
      }


      /**
      * @description Rotates the bits in the unsigned 32 bit integer given in argument 
      *              'value' as many positions leftwise as given in argument
      *              'positions'.
      *              Returns the value after rotation.
      *
      * @params {number} value, an unsigned 32 bit integer number.
      * @params {number} positions, number of positions to rotate.
      *
      * @returns {number}, the resulting number after rotation.
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      protected static rotateLeft32(value: number, positions: number): number
      {
        TS.Utils.checkUnsignedIntegerNumberParameter(value, "value", "TS.Security.Cryptography.rotateLeft32");
        TS.Utils.checkUnsignedIntegerNumberParameter(positions, "positions", "TS.Security.Cryptography.rotateLeft32");

        positions = positions % 32;
        return this.CorrectNeg((value << positions) | (value >>> (32 - positions)));
      }


      /**
      * @description Rotates the bits in the unsigned 32 bit integer given in argument 
      *              'value' as many positions rightwise as given in argument
      *              'positions'.
      *              Returns the value after rotation.
      *
      * @params {number} value, an unsigned 32 bit integer number.
      * @params {number} positions, number of positions to rotate.
      *
      * @returns {number}, the resulting number after rotation.
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      protected static rotateRight32(value: number, positions: number): number
      {
        TS.Utils.checkUnsignedIntegerNumberParameter(value, "value", "TS.Security.Cryptography.rotateRight32");
        TS.Utils.checkUnsignedIntegerNumberParameter(positions, "positions", "TS.Security.Cryptography.rotateRight32");

        positions = positions % 32;
        return this.CorrectNeg((value >>> positions) | (value << (32 - positions)));
      }


      /**
      * @description Rotates the bits in the 64 bit integer given in argument 
      *              'value' as many positions rightwise as given in argument
      *              'positions'.
      *              Returns the value after rotation.
      *
      * @params {number} value, an unsigned 32 bit integer number.
      * @params {number} positions, number of positions to rotate.
      *
      * @returns {number}, the resulting number after rotation.
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      protected static rotateRight64(value: TS.TypeCode.UInt64, positions: number): TS.TypeCode.UInt64
      {
        TS.Utils.checkUInt64NumberParameter(value, "value", "TS.Security.Cryptography.rotateRight64");
        TS.Utils.checkUnsignedIntegerNumberParameter(positions, "positions", "TS.Security.Cryptography.rotateRight32");

        positions = positions % 64;
        var _tempMSInteger: number;
        var _tempLSInteger: number;
        var _returnUInt64: TS.TypeCode.UInt64;
        var _swap: number;

        _tempMSInteger = 0;
        _tempLSInteger = 0;

        if (0 == positions)
        {
          _tempMSInteger = value.MSInteger;
          _tempLSInteger = value.LSInteger;
        }//END if

        if (0 < positions && positions < 32)
        {
          _tempMSInteger = (value.MSInteger >>> positions) | (value.LSInteger << (32 - positions));
          _tempLSInteger = (value.LSInteger >>> positions) | (value.MSInteger << (32 - positions));
        }//END if

        if (positions == 32)
        {
          _tempMSInteger = value.LSInteger;
          _tempLSInteger = value.MSInteger;
        }//END if

        if (32 < positions)
        {
          _tempMSInteger = (value.LSInteger >>> (positions - 32)) | (value.MSInteger << (64 - positions));
          _tempLSInteger = (value.MSInteger >>> (positions - 32)) | (value.LSInteger << (64 - positions));
        }//END else

        _tempMSInteger = this.CorrectNeg(_tempMSInteger);
        _tempLSInteger = this.CorrectNeg(_tempLSInteger);

        return new TS.TypeCode.UInt64(_tempMSInteger, _tempLSInteger);
      }


      /**
      * @description Shifts the bits in the unsigned 32 bit integer given in argument 
      *              'value' as many positions leftwise as given in argument
      *              'positions'.
      *              Returns the value after shifting.
      *
      * @params {number} value, an unsigned 32 bit integer number.
      * @params {number} positions, number of positions to shift.
      *
      * @returns {number}, the resulting number after shifting.
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      protected static shiftLeft32(value: number, positions: number): number
      {
        TS.Utils.checkUnsignedIntegerNumberParameter(value, "value", "TS.Security.Cryptography.shiftRight32");
        TS.Utils.checkUnsignedIntegerNumberParameter(positions, "positions", "TS.Security.Cryptography.rotateRight32");

        positions = positions % 32;
        value = value << positions;
        return this.CorrectNeg(value);
      }


      /**
      * @description Shifts the bits in the unsigned 32 bit integer given in argument 
      *              'value' as many positions rightwise as given in argument
      *              'positions'.
      *              Returns the value after shifting.
      *
      * @params {number} value, an unsigned 32 bit integer number.
      * @params {number} positions, number of positions to shift.
      *
      * @returns {number}, the resulting number after shifting.
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      protected static shiftRight32(value: number, positions: number): number
      {
        TS.Utils.checkUnsignedIntegerNumberParameter(value, "value", "TS.Security.Cryptography.shiftRight32");
        TS.Utils.checkUnsignedIntegerNumberParameter(positions, "positions", "TS.Security.Cryptography.rotateRight32");

        positions = positions % 32;
        value = value >>> positions;
        return this.CorrectNeg(value);
      }


      /**
      * @description Shifts the bits in the unsigned 64 bit integer given in argument 
      *              'value' as many positions rightwise as given in argument
      *              'positions'.
      *              Returns the value after shifting.
      *
      * @params {number} value, an unsigned 64 bit integer number.
      * @params {number} positions, number of positions to shift.
      *
      * @returns {number}, the resulting number after shifting.
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      */
      protected static shiftRight64(value: TS.TypeCode.UInt64, positions: number): TS.TypeCode.UInt64
      {
        TS.Utils.checkUInt64NumberParameter(value, "value", "TS.Security.Cryptography.shiftRight64");
        TS.Utils.checkUnsignedIntegerNumberParameter(positions, "positions", "TS.Security.Cryptography.shiftRight64");

        positions = positions % 64;
        var _tempMSInteger: number;
        var _tempLSInteger: number;
        var _returnUInt64: TS.TypeCode.UInt64;
        var _swap: number;

        _tempMSInteger = 0;
        _tempLSInteger = 0;

        if (0 == positions)
        {
          _tempMSInteger = value.MSInteger;
          _tempLSInteger = value.LSInteger;
        }//END if

        if (0 < positions && positions < 32)
        {
          _tempMSInteger = value.MSInteger >>> positions;
          _tempLSInteger = (value.LSInteger >>> positions) | (value.MSInteger << (32 - positions));
        }//END if

        if (positions == 32)
        {
          _tempMSInteger = 0;
          _tempLSInteger = value.MSInteger;
        }//END if

        if (32 < positions)
        {
          _tempMSInteger = 0;
          _tempLSInteger = value.MSInteger >>> (positions - 32);
        }//END if

        _tempLSInteger = this.CorrectNeg(_tempLSInteger);
        _tempMSInteger = this.CorrectNeg(_tempMSInteger);

        return new TS.TypeCode.UInt64(_tempMSInteger, _tempLSInteger);
      }


      //TODO: Create the test functions.
      /**
      * @description Performs: (ror 2) ^ (ror 13) ^ (ror 22)
      *
      * @see {@link http://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf | 4.1.2 SHA-224 and SHA-256 Functions }
      */
      protected static sigma0_32(x: number): number
      {
        TS.Utils.checkIntegerNumberParameter(x, "x", "TS.Security.Cryptography.sigma0_32");

        return this.CorrectNeg(this.rotateRight32(x, 2) ^ this.rotateRight32(x, 13) ^ this.rotateRight32(x, 22));
      }


      //TODO: Create the test functions.  Add descripion
      /**
      * @see {@link http://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf | 4.1.3 SHA-384, SHA-512, SHA-512 / 224 and SHA - 512 / 256 Functions }
      */
      protected static sigma0_64(x: TS.TypeCode.UInt64): TS.TypeCode.UInt64
      {
        var _tempMSInteger: number;
        var _tempLSInteger: number;
        var _rot28: TS.TypeCode.UInt64;
        var _rot34: TS.TypeCode.UInt64;
        var _rot39: TS.TypeCode.UInt64;

        _rot28 = this.rotateRight64(x, 28);
        _rot34 = this.rotateRight64(x, 34);
        _rot39 = this.rotateRight64(x, 39);

        _tempMSInteger = _rot28.MSInteger ^ _rot34.MSInteger ^ _rot39.MSInteger;
        _tempLSInteger = _rot28.LSInteger ^ _rot34.LSInteger ^ _rot39.LSInteger;

        _tempLSInteger = this.CorrectNeg(_tempLSInteger);
        _tempMSInteger = this.CorrectNeg(_tempMSInteger);

        return new TS.TypeCode.UInt64(_tempMSInteger, _tempLSInteger);
      }

      //TODO: Create the test functions.
      /**
      * @description Performs: (ror 6) ^ (ror 11) ^ (ror 25)
      *
      * @see {@link http://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf | 4.1.2 SHA-224 and SHA-256 Functions }
      */
      protected static sigma1_32(x: number): number
      {
        TS.Utils.checkIntegerNumberParameter(x, "x", "TS.Security.Cryptography.sigma1_32");

        return this.CorrectNeg(this.rotateRight32(x, 6) ^ this.rotateRight32(x, 11) ^ this.rotateRight32(x, 25));
      }


    }//END class
  }//END module
}//END module
