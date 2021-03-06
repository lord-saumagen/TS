﻿module TS
{
  "use strict";

  export module TypeCode
  {

    //function correctNegative(value: number): number
    //{
    //  if (value < 0)
    //  {
    //    value = 0x100000000 + value;
    //  };
    //  return value;
    //}

    export class UInt64
    {
      //private _corNeg: (value: number) => number = correctNegative;

      private _MSInteger: number;
      private _LSInteger: number;


      public static get MAX_VALUE(): UInt64
      {
        return new UInt64(0xFFFFFFFF, 0xFFFFFFFF);
      }


      public get MSInteger(): number
      {
        return this._MSInteger;
      }


      /**
      *  @throws TS.ArgumentOutOfRangeException
      */
      public set MSInteger(value) 
      {
        if ((value < 0) || (value > 0xFFFFFFFF))
        {
          throw new TS.ArgumentOutOfRangeException("MSInteger", value, "The argument excceeded the valid number range. Valid numbers must fall into the range of [0 ..." + 0xFFFFFFFF.toString() + "]");
        }//END if

        this._MSInteger = value;
      }


      public get LSInteger(): number
      {
        return this._LSInteger;
      }


      /**
      *  @throws TS.ArgumentOutOfRangeException
      */
      public set LSInteger(value)
      {
        if ((value < 0) || (value > 0xFFFFFFFF))
        {
          throw new TS.ArgumentOutOfRangeException("LSInteger", value, "The argument excceeded the valid number range. Valid numbers must fall into the range of [0 ..." + 0xFFFFFFFF.toString() + "]");
        }//END if

        this._LSInteger = value;
      }


      /**
      *  @throws TS.ArgumentNullOrUndefinedException
      *  @throws TS.InvalidTypeException
      *  @throws TS.ArgumentOutOfRangeException
      *  @throws TS.InvalidOperationException
      */
      constructor(MSInteger: number, LSInteger: number)
      /**
      *  @throws TS.ArgumentNullOrUndefinedException
      *  @throws TS.InvalidOperationException
      */
      constructor()
      constructor()
      {
        if (arguments.length == 2)
        {
          TS.Utils.checkIntegerNumberParameter(arguments[0], "MSInteger", "constructor of TS.TypeCode.UInt64");
          TS.Utils.checkIntegerNumberParameter(arguments[1], "LSInteger", "constructor of TS.TypeCode.UInt64");
        }//END if

        TS.Utils.checkConstructorCall(this, TS.TypeCode.UInt64);

        if (arguments.length == 2)
        {
          this.MSInteger = arguments[0];
          this.LSInteger = arguments[1];
        }//END if
        else
        {
          this.MSInteger = 0;
          this.LSInteger = 0;
        }//END else
      }


      /**
      *  @throws TS.ArgumentNullOrUndefinedException
      *  @throws TS.InvalidTypeException
      *  @throws TS.OverflowException
      */
      public add(second: UInt64) 
      {
        TS.Utils.checkUInt64NumberParameter(second, "second", "TS.TypeCode.UInt64.add");

        var _result = UInt64.add(this, second);
        this.MSInteger = _result.MSInteger;
        this.LSInteger = _result.LSInteger;
      }


      /**
      *  @throws TS.ArgumentNullOrUndefinedException
      *  @throws TS.InvalidTypeException
      *  @throws TS.OverflowException
      */
      public static add(first: UInt64, second: UInt64): UInt64
      {
        TS.Utils.checkUInt64NumberParameter(first, "first", "TS.TypeCode.UInt64.equal");
        TS.Utils.checkUInt64NumberParameter(second, "second", "TS.TypeCode.UInt64.equal");

        var _tempOverflow: number;
        var _tempLSInteger: number;
        var _tempMSInteger: number;

        _tempLSInteger = first.LSInteger + second.LSInteger;

        if (_tempLSInteger > 0xFFFFFFFF)
        {
          _tempOverflow = 1;
          _tempLSInteger = _tempLSInteger % 0x100000000;
        }//END if
        else
        {
          _tempOverflow = 0;
        }//END else

        _tempMSInteger = first.MSInteger + second.MSInteger + _tempOverflow;

        if (_tempMSInteger > 0xFFFFFFFF)
        {
          throw new TS.OverflowException("An arithmetic operation resulted in an overflow. The error occured in 'TS.TypeCode.UInt64.add'.")
        }//END if

        return new UInt64(_tempMSInteger, _tempLSInteger);
      }


      /**
      *  @throws TS.ArgumentNullOrUndefinedException
      *  @throws TS.InvalidTypeException
      */
      public addModulo(second: UInt64) 
      {
        TS.Utils.checkUInt64NumberParameter(second, "second", "TS.TypeCode.UInt64.add");

        var _result = UInt64.addModulo(this, second);
        this.MSInteger = _result.MSInteger;
        this.LSInteger = _result.LSInteger;
      }


      /**
      *  @throws TS.ArgumentNullOrUndefinedException
      *  @throws TS.InvalidTypeException
      */
      public static addModulo(first: UInt64, second: UInt64): UInt64
      {
        TS.Utils.checkUInt64NumberParameter(first, "first", "TS.TypeCode.UInt64.equal");
        TS.Utils.checkUInt64NumberParameter(second, "second", "TS.TypeCode.UInt64.equal");

        var _tempOverflow: number;
        var _tempLSInteger: number;
        var _tempMSInteger: number;

        _tempLSInteger = first.LSInteger + second.LSInteger;

        if (_tempLSInteger > 0xFFFFFFFF)
        {
          _tempOverflow = 1;
          _tempLSInteger = _tempLSInteger % 0x100000000;
        }//END if
        else
        {
          _tempOverflow = 0;
        }//END else

        _tempMSInteger = first.MSInteger + second.MSInteger + _tempOverflow;

        if (_tempMSInteger > 0xFFFFFFFF)
        {
          _tempMSInteger = _tempMSInteger % 0x100000000;
        }//END if

        return new UInt64(_tempMSInteger, _tempLSInteger);
      }


      /**
      *  @throws TS.ArgumentNullOrUndefinedException
      *  @throws TS.InvalidTypeException
      */
      public equal(second: UInt64): boolean
      {
        TS.Utils.checkUInt64NumberParameter(second, "second", "TS.TypeCode.UInt64.equal");
        return UInt64.equal(this, second);
      }


      /**
      *  @throws TS.ArgumentNullOrUndefinedException
      *  @throws TS.InvalidTypeException
      */
      public static equal(first: UInt64, second: UInt64): boolean
      {
        TS.Utils.checkUInt64NumberParameter(first, "first", "TS.TypeCode.UInt64.equal");
        TS.Utils.checkUInt64NumberParameter(second, "second", "TS.TypeCode.UInt64.equal");

        return ((first.MSInteger === second.MSInteger) && (first.LSInteger === second.LSInteger));
      }


      /**
      *  @throws TS.ArgumentNullOrUndefinedException
      *  @throws TS.InvalidTypeException
      */
      public greater(second: UInt64): boolean
      {
        TS.Utils.checkUInt64NumberParameter(second, "second", "TS.TypeCode.UInt64.greater");

        return UInt64.greater(this, second);
      }


      /**
      *  @throws TS.ArgumentNullOrUndefinedException
      *  @throws TS.InvalidTypeException
      */
      public static greater(first: UInt64, second: UInt64): boolean
      {
        TS.Utils.checkUInt64NumberParameter(first, "second", "TS.TypeCode.UInt64.greater");
        TS.Utils.checkUInt64NumberParameter(second, "second", "TS.TypeCode.UInt64.greater");

        if (first.MSInteger > second.MSInteger)
        {
          return true;
        }//END if

        if (first.MSInteger < second.MSInteger)
        {
          return false;
        }//END if

        if (first.LSInteger > second.LSInteger)
        {
          return true;
        }//END if

        if (first.LSInteger < second.LSInteger)
        {
          return false;
        }//END if
      }


      public less(first: UInt64, second: UInt64): boolean
      {
        TS.Utils.checkUInt64NumberParameter(second, "second", "TS.TypeCode.UInt64.less");

        return UInt64.less(this, second);
      }


      /**
      *  @throws TS.ArgumentNullOrUndefinedException
      *  @throws TS.InvalidTypeException
      */
      public static less(first: UInt64, second: UInt64): boolean
      {
        TS.Utils.checkUInt64NumberParameter(first, "second", "TS.TypeCode.UInt64.less");
        TS.Utils.checkUInt64NumberParameter(second, "second", "TS.TypeCode.UInt64.less");

        return UInt64.greater(second, first);
      }


      /**
      *  @description  Casts a number into a UInt64
      *
      *  @throws TS.ArgumentNullOrUndefinedException
      *  @throws TS.InvalidTypeException
      */
      public static number2UInt64(numberParam: number)
      {
        TS.Utils.checkUnsignedIntegerNumberParameter(numberParam, "numberParam", "TS.TypeCode.UInt64.number2UInt64");

        if (numberParam > 0xFFFFFFFF)
        {
          return new UInt64(Math.ceil(numberParam / 0x100000000), (numberParam % 0x100000000));
        }//END if

        return new UInt64(0, numberParam);
      }

    }//END class

  }//END module
}//END module