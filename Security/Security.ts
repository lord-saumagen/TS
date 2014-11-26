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

      /**
      *@see {@link http://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf | 4.1.1 SHA-1 Functions }
      */
      protected static ch32(x: number, y: number, z: number): number
      {
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
      *@see {@link http://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf | 4.1.1 SHA-1 Functions }
      */
      protected static maj32(x: number, y: number, z: number): number
      {
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
      *@see {@link http://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf | 4.1.1 SHA-1 Functions }
      */
      protected static parity(x: number, y: number, z: number): number
      {
        x = this.CorrectNeg(x);
        y = this.CorrectNeg(y);
        z = this.CorrectNeg(z);

        return this.CorrectNeg(x ^ y ^ z);
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
        TS.Utils.checkPositivIntegerNumberParameter(steps, "steps", "TS.Utils.Crypto.rotateLeft32");

        value = this.CorrectNeg(value);

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
        TS.Utils.checkPositivIntegerNumberParameter(steps, "steps", "TS.Utils.Crypto.rotateRight32");

        value = this.CorrectNeg(value);

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
        TS.Utils.checkPositivIntegerNumberParameter(steps, "steps", "TS.Utils.Crypto.rotateRight64");

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
        TS.Utils.checkPositivIntegerNumberParameter(steps, "steps", "TS.Utils.Crypto.shiftLeft32");

        value = this.CorrectNeg(value);

        steps = steps % 32;
        value << steps;
        return this.CorrectNeg(value);
      }


      /**
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException
      */
      protected static shiftRight(value: number, steps: number): number
      {
        TS.Utils.checkIntegerNumberParameter(value, "value", "TS.Utils.Crypto.shiftRight");
        TS.Utils.checkPositivIntegerNumberParameter(steps, "steps", "TS.Utils.Crypto.shiftRight");

        value = this.CorrectNeg(value);
        steps = steps % 32;
        value >>> steps;
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
        TS.Utils.checkPositivIntegerNumberParameter(steps, "steps", "TS.Utils.Crypto.shiftRight32");

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

        return new TS.TypeCode.UInt64(_tempMSInteger, _tempLSInteger);
      }


      /**
      *@see {@link http://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf | 4.1.2 SHA-224 and SHA - 256 Functions }
      */
      protected static sigma032(x: number): number
      {
        return this.rotateRight32(x, 2) ^ this.rotateRight32(x, 13) ^ this.rotateRight32(x, 22);
      }


      /**
      *@see {@link http://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf | 4.1.3 SHA-384, SHA-512, SHA-512 / 224 and SHA - 512 / 256 Functions }
      */
      protected static sigma064(x: TS.TypeCode.UInt64): TS.TypeCode.UInt64
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

        return new TS.TypeCode.UInt64(_tempMSInteger, _tempLSInteger);
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


  }//END module
}//END module
 