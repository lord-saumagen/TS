module TS
{
  "use strict";

  export module Security
  {

    function correctNegative(value: number): number
    {
      if (value < 0)
      {
        value = 0x100000000 + value;
      };
      return value;
    }


    export class Cryptography
    {
      protected static CorrectNeg: (value: number) => number = correctNegative;

      public constructor()
      {
      }


      protected static addModulo(first: number, second: number): number
      {
        var _result;
        var _tempResult: number;

        if (!TS.Utils.TypeInfo.isPositiveIntegerNumber(first))
        {
          throw new TS.ArgumentOutOfRangeException("first", first, "Argument 'first' must be a positive integer number in function 'TS.Security.addModulo'.");
        }//END if

        if (!TS.Utils.TypeInfo.isPositiveIntegerNumber(second))
        {
          throw new TS.ArgumentOutOfRangeException("first", first, "Argument 'first' must be a positive integer number in function 'TS.Security.addModulo'.");
        }//END if

        _result = first + second;

        if (_result > 0xFFFFFFFF)
        {
          _result = (_result % 0x100000000) + 1
        }//END if

        return _result;
      }

      /**
      * @description
      *  Performs: (x & y) ^ (~x & z)
      *
      *@see {@link http://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf | 4.1.1 SHA-1 Functions }
      */
      protected static ch32(x: number, y: number, z: number): number
      {
        TS.Utils.checkIntegerNumberParameter(x, "x", "TS.Utils.Crypto.ch32");
        TS.Utils.checkIntegerNumberParameter(y, "y", "TS.Utils.Crypto.ch32");
        TS.Utils.checkIntegerNumberParameter(z, "z", "TS.Utils.Crypto.ch32");

        return this.CorrectNeg((x & y) ^ (~x & z));
      }


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

      /**
      * @description
      *  Performs: (ror 7) ^ (ror 18) ^ (shr 3)
      *
      * @see {@link http://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf | 4.1.2 SHA-224 and SHA - 256 Functions }
      */
      protected static gamma0_32(x: number): number
	    {
        TS.Utils.checkIntegerNumberParameter(x, "x", "TS.Utils.Crypto.gamma0_32");

        return this.CorrectNeg(this.rotateRight32(x, 7) ^ this.rotateRight32(x, 18) ^ this.shiftRight32(x, 3));
	    }
      
      /**
      * @description
      *  Performs: (ror 17) ^ (ror 19) ^ (shr 10)
      *
      * @see {@link http://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf | 4.1.2 SHA-224 and SHA - 256 Functions }
      */
      protected static gamma1_32(x: number) : number
      {
        TS.Utils.checkIntegerNumberParameter(x, "x", "TS.Utils.Crypto.gamma1_32");

        return this.CorrectNeg(this.rotateRight32(x, 17) ^ this.rotateRight32(x, 19) ^ this.shiftRight32(x, 10));
      }

      /**
      * @description
      *  Performs: (x & y) ^ (x & z) ^ (y & z)
      *
      *@see {@link http://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf | 4.1.1 SHA-1 Functions }
      */
      protected static maj32(x: number, y: number, z: number): number
      {
        TS.Utils.checkIntegerNumberParameter(x, "x", "TS.Utils.Crypto.maj32");
        TS.Utils.checkIntegerNumberParameter(y, "y", "TS.Utils.Crypto.maj32");
        TS.Utils.checkIntegerNumberParameter(z, "z", "TS.Utils.Crypto.maj32");

        return this.CorrectNeg((x & y) ^ (x & z) ^ (y & z));
      }

      /**
      *@see {@link http://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf | 4.1.1 SHA-1 Functions }
      */
      protected static maj64(x: TS.TypeCode.UInt64, y: TS.TypeCode.UInt64, z: TS.TypeCode.UInt64): TS.TypeCode.UInt64
      {
        var _tempMSInteger: number;
        var _tempLSInteger: number;

        _tempMSInteger = this.maj32(x.MSInteger, y.MSInteger, z.MSInteger);
        _tempLSInteger = this.maj32(x.LSInteger, y.LSInteger, z.LSInteger);

        return new TS.TypeCode.UInt64(_tempMSInteger, _tempLSInteger);
      }


      /**
      * @description
      *  Performs: (x ^ y ^ z)
      *
      *@see {@link http://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf | 4.1.1 SHA-1 Functions }
      */
      protected static parity(x: number, y: number, z: number): number
      {
        TS.Utils.checkIntegerNumberParameter(x, "x", "TS.Utils.Crypto.parity");
        TS.Utils.checkIntegerNumberParameter(y, "y", "TS.Utils.Crypto.parity");
        TS.Utils.checkIntegerNumberParameter(z, "z", "TS.Utils.Crypto.parity");

        return this.CorrectNeg((x ^ y ^ z));
      }


      /**
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException
      */
      protected static rotateLeft32(value: number, steps: number): number
      {
        TS.Utils.checkIntegerNumberParameter(value, "value", "TS.Utils.Crypto.rotateLeft32");

        steps = steps % 32;
        return this.CorrectNeg((value << steps) | (value >>> (32 - steps)));
      }


      /**
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException
      */
      protected static rotateRight32(value: number, steps: number): number
      {
        TS.Utils.checkIntegerNumberParameter(value, "value", "TS.Utils.Crypto.rotateRight32");

        steps = steps % 32;
        return this.CorrectNeg((value >>> steps) | (value << (32 - steps)));
      }


      /**
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException
      */
      protected static rotateRight64(value: TS.TypeCode.UInt64, steps: number): TS.TypeCode.UInt64
      {
        TS.Utils.checkUInt64NumberParameter(value, "value", "TS.Utils.Crypto.rotateRight64");

        steps = steps % 64;
        var _tempMSInteger: number;
        var _tempLSInteger: number;
        var _returnUInt64: TS.TypeCode.UInt64;
        var _swap: number;

        _tempMSInteger = 0;
        _tempLSInteger = 0;

        if (0 == steps)
        {
          _tempMSInteger = value.MSInteger;
          _tempLSInteger = value.LSInteger;
        }//END if

        if (0 < steps && steps < 32)
        {
          _tempMSInteger = (value.MSInteger >>> steps) | (value.LSInteger << (32 - steps));
          _tempLSInteger = (value.LSInteger >>> steps) | (value.MSInteger << (32 - steps));
        }//END if

        if (steps == 32)
        {
          _tempMSInteger = value.LSInteger;
          _tempLSInteger = value.MSInteger;
        }//END if

        if (32 < steps)
        {
          _tempMSInteger = (value.LSInteger >>> (steps - 32)) | (value.MSInteger << (64 - steps));
          _tempLSInteger = (value.MSInteger >>> (steps - 32)) | (value.LSInteger << (64 - steps));
        }//END else

        _tempMSInteger = this.CorrectNeg(_tempMSInteger);
        _tempLSInteger = this.CorrectNeg(_tempLSInteger);

        return new TS.TypeCode.UInt64(_tempMSInteger, _tempLSInteger);
      }


      /**
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException
      */
      protected static shiftLeft32(value: number, steps: number): number
      {
        TS.Utils.checkIntegerNumberParameter(value, "value", "TS.Utils.Crypto.shiftLeft32");

        steps = steps % 32;
        value = value << steps;
        return this.CorrectNeg(value);
      }


      /**
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException
      */
      protected static shiftRight32(value: number, steps: number): number
      {
        TS.Utils.checkIntegerNumberParameter(value, "value", "TS.Utils.Crypto.shiftRight");

        steps = steps % 32;
        value = value >>> steps;
        return this.CorrectNeg(value);
      }


      /**
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException
      */
      protected static shiftRight64(value: TS.TypeCode.UInt64, steps: number): TS.TypeCode.UInt64
      {
        TS.Utils.checkUInt64NumberParameter(value, "value", "TS.Utils.Crypto.shiftRight32");

        steps = steps % 64;
        var _tempMSInteger: number;
        var _tempLSInteger: number;
        var _returnUInt64: TS.TypeCode.UInt64;
        var _swap: number;

        _tempMSInteger = 0;
        _tempLSInteger = 0;

        if (0 == steps)
        {
          _tempMSInteger = value.MSInteger;
          _tempLSInteger = value.LSInteger;
        }//END if

        if (0 < steps && steps < 32)
        {
          _tempMSInteger = value.MSInteger >>> steps;
          _tempLSInteger = (value.LSInteger >>> steps) | (value.MSInteger << (32 - steps));
        }//END if

        if (steps == 32)
        {
          _tempMSInteger = 0;
          _tempLSInteger = value.MSInteger;
        }//END if

        if (32 < steps)
        {
          _tempMSInteger = 0;
          _tempLSInteger = value.MSInteger >>> (steps - 32);
        }//END if

        _tempLSInteger = this.CorrectNeg(_tempLSInteger);
        _tempMSInteger = this.CorrectNeg(_tempMSInteger);

        return new TS.TypeCode.UInt64(_tempMSInteger, _tempLSInteger);
      }


      /**
      * @description
      *    Performs: (ror 2) ^ (ror 13) ^ (ror 13)
      *
      * @see {@link http://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf | 4.1.2 SHA-224 and SHA-256 Functions }
      */
      protected static sigma0_32(x: number): number
      {
        TS.Utils.checkIntegerNumberParameter(x, "x", "TS.Utils.Crypto.sigma0_32");

        return this.CorrectNeg(this.rotateRight32(x, 2) ^ this.rotateRight32(x, 13) ^ this.rotateRight32(x, 22));
      }


      /**
      *@see {@link http://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf | 4.1.3 SHA-384, SHA-512, SHA-512 / 224 and SHA - 512 / 256 Functions }
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

      /**
      * @description
      *    Performs: (ror 6) ^ (ror 11) ^ (ror 25)

      * @see {@link http://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf | 4.1.2 SHA-224 and SHA-256 Functions }
      */
      protected static sigma1_32(x: number) : number
	    {
        TS.Utils.checkIntegerNumberParameter(x, "x", "TS.Utils.Crypto.sigma1_32");

        return this.CorrectNeg(this.rotateRight32(x, 6) ^ this.rotateRight32(x, 11) ^ this.rotateRight32(x, 25));
	    }

      /**
      * @description
      *    Converts a number into its string representation as hexadecimal string by
      *    converting each nibble (4 bit) into a hexadecimal represenation.
      */
      protected static convertHex(value: number): string
      {
        var _resultStr: string;
        var _index: number;
        var _val: number;

        _resultStr = "";

        for (_index = 7; _index >= 0; _index--)
        {
          _val = (value >>> (_index * 4)) & 0x0f;
          _resultStr += _val.toString(16);
        }//END for

        return _resultStr;
      }

    }//END class

    export function getSHA224_225RoundConstants() : Array<number>
    {
      var _constantArray: Array<number>;

      _constantArray = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
        0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
        0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
        0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
        0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
        0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
        0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
        0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];

      return _constantArray;

    }

  }//END module
}//END module
 