module TS
{
  "use strict";

  export module Utils
  {

    export enum TypeEnum
    {
      UNKNOWN,
      ARGUMENTS,
      ARRAY,
      BOOLEAN_OBJECT,
      BOOLEAN_VALUE,
      DATE,
      FUNCTION,
      NAN,
      NEGATIVE_INFINITY,
      NULL,
      NUMBER_OBJECT,
      NUMBER_VALUE,
      OBJECT,
      POSITIVE_INFINITY,
      REGEX,
      STRING_OBJECT,
      STRING_VALUE,
      UNDEFINED
    }

    export class TypeInfo
    {

      /**
      *  @description  
      *    Determines and returns the type of 
      *    the value of argument 'obj'. 
      *
      *  @param  obj
      *    The obj whose type should be determined.
      *
      *  @returns  TS.Utils.TypeEnum
      *    The value of the enumeration which represents
      *    the detected type or 
      *    'TS.Utils.TypeEnum.UNKNOWN' if the 
      *    type couldn't be detected.
      */
      public static getType(obj: any): TS.Utils.TypeEnum
      {
        if (this.isArguments(obj))
        {
          return TypeEnum.ARGUMENTS;
        }//END if

        if (this.isArray(obj))
        {
          return TypeEnum.ARRAY;
        }//END if


        //
        // Check boolean
        //
        if (this.isBooleanObject(obj))
        {
          return TypeEnum.BOOLEAN_OBJECT;
        }//END if

        if (this.isBooleanValue(obj))
        {
          return TypeEnum.BOOLEAN_VALUE;
        }//END if
        //
        // Check boolean end
        //


        if (this.isDate(obj))
        {
          return TypeEnum.DATE;
        }//END if

        if (this.isFunction(obj))
        {
          return TypeEnum.FUNCTION;
        }//END if

        if (this.isNull(obj))
        {
          return TypeEnum.NULL;
        }//END if

        if (this.isNaN(obj))
        {
          return TypeEnum.NAN
        }//END if

        //
        //Check infinity
        //
        if (this.isNegativInfiniteNumber(obj))
        {
          return TypeEnum.NEGATIVE_INFINITY;
        }//END if

        if (this.isPositiveInfiniteNumber(obj))
        {
          return TypeEnum.POSITIVE_INFINITY;
        }//END if

        //
        // Check number
        //
        if (this.isNumberObject(obj))
        {
          return TypeEnum.NUMBER_OBJECT;
        }//END if

        if (this.isNumberValue(obj))
        {
          return TypeEnum.NUMBER_VALUE;
        }//END if
        //
        // Check number end
        //


        if (this.isRegEx(obj))
        {
          return TypeEnum.REGEX;
        }//END if


        //
        // Check string
        //
        if (this.isStringObject(obj))
        {
          return TypeEnum.STRING_OBJECT;
        }//END if

        if (this.isStringValue(obj))
        {
          return TypeEnum.STRING_VALUE;
        }//END if
        //
        // Check string end
        //


        if (this.isUndefined(obj))
        {
          return TypeEnum.UNDEFINED;
        }//END if

        if (this.isObject(obj))
        {
          return TypeEnum.OBJECT;
        }//END if

        return TypeEnum.UNKNOWN;
      }


      /**
      *  @description  
      *    Returns true if the type of
      *    the argument 'source' is a arguments
      *    type, otherwise false.
      *
      *  @param  source
      *    The argument to check.
      *
      *  @returns  boolean
      *    The result value true or false.
      */
      public static isArguments(source: any): boolean
      {
        if (this.isObject(source))
        {
          return source.toString().toLowerCase().indexOf("arguments") > -1;
        }//END if

        return false;
      }

      /**
      *  @description  
      *    Returns true if the type of
      *    the argument 'source' is an array
      *    type, otherwise false.
      *
      *  @param  source
      *    The argument to check.
      *
      *  @returns  boolean
      *    The result value true or false.
      */
      public static isArray(source: any): boolean
      {
        if (this.isNullOrUndefined(source))
        {
          return false;
        }//END if

        return Array.isArray(source);
      }


      /**
      *  @description  
      *    Returns true if the type of
      *    the argument 'source' is a boolean 
      *    type, otherwise false.
      *
      *  @see
      *    TS.Utils.TypeInfo.isBooleanValue
      *
      *  @see
      *    TS.Utils.TypeInfo.isBooleanObject
      *
      *  @param  source
      *    The argument to check.
      *
      *  @returns  boolean
      *    The result value true or false.
      */
      public static isBoolean(source: any): boolean
      {
        return this.isBooleanObject(source) || this.isBooleanValue(source);
      }


      /**
      *  @description  
      *    Returns true if the type of
      *    the argument 'source' is a boolean 
      *    object type created with 'new Boolean()',
      *    otherwise false.
      *
      *  @see
      *    TS.Utils.TypeInfo.isBooleanValue
      *
      *  @see
      *    TS.Utils.TypeInfo.isBoolean
      *
      *  @param  source
      *    The argument to check.
      *
      *  @returns  boolean
      *    The result value true or false.
      */
      public static isBooleanObject(source: any): boolean
      {
        if (!this.isObject(source))
        {
          return false;
        }//END if

        return typeof (source.valueOf()) == "boolean"
      }


      /**
      *  @description  
      *    Returns true if the type of
      *    the argument 'source' is a boolean 
      *    value type (true or false),
      *    otherwise false.
      *
      *  @see
      *    TS.Utils.TypeInfo.isBoolean
      *
      *  @see
      *    TS.Utils.TypeInfo.isBooleanObject
      *
      *  @param  source
      *    The argument to check.
      *
      *  @returns  boolean
      *    The result value true or false.
      */
      public static isBooleanValue(source: any): boolean
      {
        if (this.isNullOrUndefined(source) || this.isObject(source))
        {
          return false;
        }//END if

        return typeof (source) == "boolean";
      }


      /**
      *  @description  
      *    Returns true if the type of
      *    the argument 'source' is a date
      *    object type created with 'new Date()',
      *    otherwise false.
      *
      *  @param  source
      *    The argument to check.
      *
      *  @returns  boolean
      *    The result value true or false.
      */
      public static isDate(source: any): boolean
      {
        if (this.isNullOrUndefined(source))
        {
          return false;
        }//END if

        return Object.prototype.toString.call(source).indexOf("Date") > 0;
      }


      /**
      *  @description  
      *    Returns true if the type of
      *    the argument 'source' is a function
      *    type, otherwise false.
      *
      *  @param  source
      *    The argument to check.
      *
      *  @returns  boolean
      *    The result value true or false.
      */
      public static isFunction(source: any): boolean
      {
        if (this.isNullOrUndefined(source))
        {
          return false;
        }//END if

        return typeof (source) == "function";
      }


      /**
      *  @description  
      *    Returns true if the value of
      *    the argument 'source' is a integer number,
      *    otherwise false. 
      *
      *  @see
      *    TS.Utils.TypeInfo.isNumber
      *
      *  @see
      *    TS.Utils.TypeInfo.isPositiveIntegerNumber
      *
      *  @param  source
      *    The argument to check.
      *
      *  @returns  boolean
      *    Returns true if the argument is a valid
      *    integer number.
      */
      public static isIntegerNumber(source: any): boolean
      {
        if (this.isNumber(source) && (Math.floor(source) == source))
        {
          return true;
        }//END if

        return false;
      }


      /**
      *  @description  
      *    Returns true if the value of
      *    the argument 'source' is NaN,
      *    otherwise false.
      *
      *    The function differs from the javascript
      *    implementation in that way, that  
      *    it only returns true if the value of
      *    the argument source is 'NaN'. No other
      *    value will create a result of true.
      *
      *    That means, you can't use this function
      *    to determine whether a value is a number
      *    or not. You can only use it to determin
      *    wether a value is 'NaN' or not. 
      *    Use the 'TS.Utils.TypeInfo.isNumber' or
      *    a similar function to determine whether
      *    a value is a number type or not.
      *
      *  @param  source
      *    The argument to check.
      *
      *  @returns  boolean
      *    The result value true or false.
      */
      public static isNaN(source: any): boolean
      {
        if (!this.isNullOrUndefined(source) && (typeof (source) == "number") && isNaN(source))
        {
          return true;
        }//END if

        return false;
      }


      /**
      *  @description  
      *    Returns true if the value of
      *    the argument 'source' is null, 
      *    otherwise false.
      *
      *  @param  source
      *    The argument to check.
      *
      *  @returns  boolean
      *    The result value true or false.
      */
      public static isNull(source: any): boolean
      {
        return source === null;
      }


      /**
      *  @description  
      *    Returns true if the value of
      *    the argument 'source' is null or undefined, 
      *    otherwise false.
      *
      *  @param  source
      *    The argument to check.
      *
      *  @returns  boolean
      *    The result value true or false.
      */
      public static isNullOrUndefined(source: any): boolean
      {
        return this.isUndefined(source) || this.isNull(source);
      }


      /**
      *  @description  
      *    Returns true if the value of the argument
      *    'source' is either null or undefined or
      *    an empty string or array.
      *
      *    All argument values which are
      *    neither null or undefined nor an empty 
      *    array or empty string lets the function 
      *    return false. 
      *
      *  @param  source
      *    The argument to check.
      *
      *  @returns  boolean
      *    The result value true or false.
      */
      public static isNullUndefOrEmpty(source: Array<any>): boolean;
      public static isNullUndefOrEmpty(source: string): boolean;
      public static isNullUndefOrEmpty(source: any): boolean
      {
        if (this.isUndefined(source))
        {
          return true;
        }//END if

        if (this.isNull(source))
        {
          return true;
        }//END if

        if (Array.isArray(source))
        {
          return (<Array<any>> source).length == 0;
        }//END if


        if (TS.Utils.TypeInfo.isString(source))
        {
          return String(source).length == 0;
        }//END if

        return false;
      }


      /**
      *  @description  
      *    Returns true if the argument value is
      *    either null or undefined or is a string wich is either
      *    empty or contains only white space characters.
      *
      *  @param  source
      *    The argument to check.
      *
      *  @returns  boolean
      *    The result value true or false.
      *
      *  @throws
      *    TS.InvalidTypeException. Thrown if the argument
      *    value is neither a null or undefined value nor
      *    a string.
      */
      public static isNullUndefOrWhiteSpace(source: string): boolean
      {
        if (this.isNullOrUndefined(source))
        {
          return true;
        }//END if

        if (!this.isNull(source) && !this.isString(source))
        {
          throw new TS.InvalidTypeException("source", source, "Argument 'source' in function 'isNullUndefOrWhiteSpace' must either be a null value, undefined or a valid string.");
        }//END if

        if (source.trim().length == 0)
        {
          return true;
        }//END if

        return false;
      }


      /**
      *  @description  
      *    Returns true if the type of
      *    the argument 'source' is a number
      *    type, otherwise false.
      *
      *  @see
      *    TS.Utils.TypeInfo.isIntegerNumber
      *
      *  @see
      *    TS.Utils.TypeInfo.isNumberObject
      *
      *  @see
      *    TS.Utils.TypeInfo.isNumberValue
      *
      *  @see
      *    TS.Utils.TypeInfo.isPositiveIntegerNumber
      *
      *  @param  source
      *    The argument to check.
      *
      *  @returns  boolean
      *    The result value true or false.
      */
      public static isNumber(source: any): boolean
      {
        return this.isNumberObject(source) || this.isNumberValue(source);
      }


      /**
      *  @description  
      *    Returns true if the type of
      *    the argument 'source' is a number
      *    object type created with 'new Number()',
      *    otherwise false.
      *
      *  @see
      *    TS.Utils.TypeInfo.isNumber
      *
      *  @see
      *    TS.Utils.TypeInfo.isNumberValue
      *
      *  @param  source
      *    The argument to check.
      *
      *  @returns  boolean
      *    The result value true or false.
      */
      public static isNumberObject(source: any): boolean
      {

        if (!this.isObject(source))
        {
          return false;
        }//END if

        return typeof (source.valueOf()) == "number";
      }


      /**
      *  @description  
      *    Returns true if the type of
      *    the argument 'source' is a number
      *    value type, otherwise false.
      *
      *  @see
      *    TS.Utils.TypeInfo.isNumber
      *
      *  @see
      *    TS.Utils.TypeInfo.isNumberObject
      *
      *  @param  source
      *    The argument to check.
      *
      *  @returns  boolean
      *    The result value true or false.
      */
      public static isNumberValue(source: any): boolean
      {
        if (this.isNullOrUndefined(source) || this.isObject(source))
        {
          return false;
        }//END if

        if (typeof (source) == "number")
        {

          if (this.isNaN(source))
          {
            return false;
          }//END if

          return true;
        }//END if

        return false;
      }


      /**
      *  @description  
      *    Returns true if the type of
      *    the argument 'source' is a
      *    infinite number value type, otherwise false.
      *
      *  @see
      *    TS.Utils.TypeInfo.isNumber
      *
      *  @see
      *    TS.Utils.TypeInfo.isNumberValue
      *
      *  @see
      *    TS.Utils.TypeInfo.isNumberObject
      *
      *  @param  source
      *    The argument to check.
      *
      *  @returns  boolean
      *    The result value true or false.
      */
      public static isInfiniteNumber(source: any): boolean
      {
        return this.isNumberValue(source) && (source === Number.POSITIVE_INFINITY || source === Number.NEGATIVE_INFINITY);
      }


      /**
      *  @description  
      *    Returns true if the type of
      *    the argument 'source' is a positive
      *    infinite number value type, otherwise false.
      *
      *  @see
      *    TS.Utils.TypeInfo.isNumber
      *
      *  @see
      *    TS.Utils.TypeInfo.isNumberValue
      *
      *  @see
      *    TS.Utils.TypeInfo.isNumberObject
      *
      *  @param  source
      *    The argument to check.
      *
      *  @returns  boolean
      *    The result value true or false.
      */
      public static isPositiveInfiniteNumber(source: any): boolean
      {
        return this.isNumberValue(source) && (source === Number.POSITIVE_INFINITY);
      }


      /**
      *  @description  
      *    Returns true if the type of
      *    the argument 'source' is a negative
      *    infinite number value type, otherwise false.
      *
      *  @see
      *    TS.Utils.TypeInfo.isNumber
      *
      *  @see
      *    TS.Utils.TypeInfo.isNumberValue
      *
      *  @see
      *    TS.Utils.TypeInfo.isNumberObject
      *
      *  @param  source
      *    The argument to check.
      *
      *  @returns  boolean
      *    The result value true or false.
      */
      public static isNegativInfiniteNumber(source: any): boolean
      {
        return this.isNumberValue(source) && (source === Number.NEGATIVE_INFINITY);
      }


      /**
      *  @description  
      *    Returns true if the type of
      *    the argument 'source' is an object
      *    type, otherwise false.
      *
      *  @param  source
      *    The argument to check.
      *
      *  @returns  boolean
      *    The result value true or false.
      */
      public static isObject(source: any): boolean
      {
        if (this.isNullOrUndefined(source))
        {
          return false;
        }//END if

        return typeof (source) == "object";
      }


      /**
      *  @description  
      *    Returns true if the value of 
      *    the argument 'source' is a valid integer 
      *    number greater or equal 0, otherwise false. 
      *
      *  @see
      *    TS.Utils.TypeInfo.isNumber
      *
      *  @see
      *    TS.Utils.TypeInfo.isIntegerNumber
      *
      *  @param  source
      *    The argument to check.
      *
      *  @returns  boolean
      *    Returns true if the argument is a valid
      *    integer number greater or equal 0.
      */
      public static isPositiveIntegerNumber(source: any): boolean
      {
        if (this.isIntegerNumber(source))
        {
          return source > -1;
        }//END if

        return false;
      }


      /**
      *  @description  
      *    Returns true if the type of
      *    the argument 'source' is a regular 
      *    expression type, otherwise false.
      *
      *  @param  source
      *    The argument to check.
      *
      *  @returns  boolean
      *    The result value true or false.
      */
      public static isRegEx(source: any): boolean
      {
        if (this.isNullOrUndefined(source))
        {
          return false;
        }//END if

        return Object.prototype.toString.call(source).indexOf("RegExp") > 0;
      }


      /**
      *  @description  
      *    Returns true if the type of
      *    the argument 'source' is a string,
      *    type, otherwise false.
      *
      *  @see
      *    TS.Utils.TypeInfo.isStringLiteral
      *
      *  @see
      *    TS.Utils.TypeInfo.isStringObject
      *
      *  @param  source
      *    The argument to check.
      *
      *  @returns  boolean
      *    The result value true or false.
      */
      public static isString(source: any): boolean
      {
        return this.isStringObject(source) || this.isStringValue(source);
      }


      /**
      *  @description  
      *    Returns true if the type of
      *    the argument 'source' is a string 
      *    object type created with 'new String()',
      *    otherwise false.
      *
      *  @see
      *    TS.Utils.TypeInfo.isString
      *
      *  @see
      *    TS.Utils.TypeInfo.isStringLiteral
      *
      *  @param  source
      *    The argument to check.
      *
      *  @returns  boolean
      *    The result value true or false.
      */
      public static isStringObject(source: any): boolean
      {
        if (!this.isObject(source))
        {
          return false;
        }//END if

        return typeof (source.valueOf()) == "string";
      }


      /**
      *  @description  
      *    Returns true if the type of
      *    the argument 'source' is a string 
      *    value type, otherwise false.
      *
      *  @see
      *    TS.Utils.TypeInfo.isString
      *
      *  @see
      *    TS.Utils.TypeInfo.isStringObject
      *
      *  @param  source
      *    The argument to check.
      *
      *  @returns  boolean
      *    The result value true or false.
      */
      public static isStringValue(source: any): boolean
      {
        if (this.isNullOrUndefined(source) || this.isObject(source))
        {
          return false;
        }//END if

        return typeof (source) == "string";
      }


      /**
      *  @description  
      *    Returns true if the value of
      *    the argument 'source' is undefined, 
      *    otherwise false.
      *
      *  @param  source
      *    The argument to check.
      *
      *  @returns  boolean 
      *    The result value true or false.
      */
      public static isUndefined(source: any): boolean
      {
        return source === undefined;
      }

    }//END class

  }//END module
}//END module 