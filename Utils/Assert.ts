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

    //TODO: Create description
    /**
    * @class
    * @classdesc
    */
    export class Assert
    {

      /**
      * @description Determines and returns the type of 
      *              the value given in argument 'obj'. 
      *
      * @param {any} obj
      * @returns {TS.Utils.TypeEnum}
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

        if (this.isUnsignedInfiniteNumber(obj))
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
      * @description Returns true if the type of
      *              the argument 'source' is a arguments
      *              type, otherwise false.
      *
      * @param {any} source
      * @returns {boolean}
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
      * @description  Returns true if the type of
      *               the argument 'source' is an array
      *               type, otherwise false.
      *
      * @param {any} source
      * @returns {boolean}
      */
      public static isArray(source: any): boolean
      {
        if (this.isNullOrUndefined(source))
        {
          return false;
        }//END if

        return Array.isArray(source);
      }


      //TODO: Create test function.
      /**
      * @description  Returns true if the type of
      *               the argument 'source' is a
      *               dense array type. That means
      *               the array has no element which
      *               is undefined. 
      *               Returns false otherwise.
      *
      * @param {any} source
      * @returns {boolean}
      */
      public static isDenseArray(source: any): boolean
      {
        if (!TS.Utils.Assert.isArray(source))
        {
          return false;
        }//END if

        return !(<Array<any>> source).some((value, index, array) => value === undefined );
      }


      /**
      * @description Returns true if the type of
      *              the argument 'source' is a none
      *              empty binary string. If the string
      *              contains other characters than '0' 
      *              and '1', even white space, the 
      *              return value will be false.
      *
      * @param {any} source
      * @returns {boolean}
      */
      public static isBinaryString(source: any): boolean
      {
        if (!this.isString(source))
        {
          return false;
        }//END if

        return (/^[01]+$/gmi).test(source);
      }


      /**
      * @description Returns true if the type of
      *              the argument 'source' is a boolean
      *              type, otherwise false.
      *
      * @see TS.Utils.Assert.isBooleanValue
      * @see TS.Utils.Assert.isBooleanObject
      *
      * @param {any} source
      * @returns {boolean}
      */
      public static isBoolean(source: any): boolean
      {
        return this.isBooleanObject(source) || this.isBooleanValue(source);
      }


      /**
      * @description  Returns true if the type of
      *               the argument 'source' is a boolean 
      *               object type created with 'new Boolean()',
      *               otherwise false.
      *
      * @see TS.Utils.Assert.isBooleanValue
      * @see TS.Utils.Assert.isBoolean
      *
      * @param {any} source
      * @returns {boolean}
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
      * @description Returns true if the type of
      *              the argument 'source' is a boolean 
      *              value type (true or false),
      *              otherwise false.
      *
      * @see TS.Utils.Assert.isBoolean
      * @see TS.Utils.Assert.isBooleanObject
      *
      * @param {any} source
      * @returns {boolean}
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
      * @description Returns true if the type of
      *              the argument 'source' is a date
      *              object type created with 'new Date()',
      *              otherwise false.
      *
      * @param {any} source
      * @returns {boolean}
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
      * @description Returns true if the type of
      *              the argument 'source' is a none
      *              empty decimal string.
      *              If the string contains other characters than
      *              [0-9], even white space, the 
      *              return value will be false.
      *
      * @param {any} source
      * @returns {boolean}
      */
      public static isDecimalString(source: any): boolean
      {
        if (!this.isString(source))
        {
          return false;
        }//END if

        return (/^[0-9]+$/gmi).test(source);
      }


      /**
      * @description Returns true if the type of
      *              the argument 'source' is a function
      *              type, otherwise false.
      *
      * @param {any} source
      * @returns {boolean}
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
      * @description Returns true if the type of
      *              the argument 'source' is a none
      *              empty hexadecimal string.
      *              If the string contains other characters than
      *              [0-9, A-F, a-f], even white space, the 
      *              return value will be false.
      *
      * @param {any} source
      * @returns {boolean}
      */
      public static isHexString(source: any): boolean
      {
        if (!this.isString(source))
        {
          return false;
        }//END if

        return (/^[0-9A-Fa-f]+$/gmi).test(source);
      }


      /**
      * @description Returns true if the type of
      *              the argument 'source' is a
      *              infinite number value type, otherwise false.
      *
      * @see TS.Utils.Assert.isNumber
      * @see TS.Utils.Assert.isNumberValue
      * @see TS.Utils.Assert.isNumberObject
      *
      * @param {any} source
      * @returns {boolean}
      */
      public static isInfiniteNumber(source: any): boolean
      {
        return this.isNumberValue(source) && (source === Number.POSITIVE_INFINITY || source === Number.NEGATIVE_INFINITY);
      }


      /**
      * @description Returns true if the value of
      *              the argument 'source' is an integer number
      *              in the range of [-Number.MAX_VALUE .. Number.MAX_VALUE],
      *              otherwise false.
      *
      * @see TS.Utils.Assert.isNumber
      * @see TS.Utils.Assert.isPositiveIntegerNumber
      *
      * @param {any} source
      * @returns {boolean}
      */
      public static isIntegerNumber(source: any): boolean
      {
        
        if (this.isNumber(source) && (-Number.MAX_VALUE <= source) && (source <= Number.MAX_VALUE) && (Math.floor(source) == source))
        {
          return true;
        }//END if

        return false;
      }


      /**
      * @description Returns true if the value of
      *              the argument 'source' is NaN,
      *              otherwise false.
      *
      *              The function differs from the javascript
      *              implementation in that way, that  
      *              it only returns true if the value of
      *              the argument source is 'NaN'. No other
      *              value will create a result of true.
      *              
      *              That means, you can't use this function
      *              to determine whether a value is a number
      *              or not. You can only use it to determin
      *              wether a value is 'NaN' or not. 
      *              Use the 'TS.Utils.Assert.isNumber' or
      *              a similar function to determine whether
      *              a value is a number type or not.
      *
      * @param {any} source
      * @returns {boolean}
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
      * @description Returns true if the type of
      *              the argument 'source' is a negative
      *              infinite number value type, otherwise false.
      *
      * @see TS.Utils.Assert.isNumber
      * @see TS.Utils.Assert.isNumberValue
      * @see TS.Utils.Assert.isNumberObject
      *
      * @param {any} source
      * @returns {boolean}
      */
      public static isNegativInfiniteNumber(source: any): boolean
      {
        return this.isNumberValue(source) && (source === Number.NEGATIVE_INFINITY);
      }


      /**
      *  @description Returns true if the value of
      *               the argument 'source' is null, 
      *               otherwise false.
      */
      public static isNull(source: any): boolean
      {
        return source === null;
      }


      /**
      *  @description Returns true if the value of
      *               the argument 'source' is null or undefined, 
      *               otherwise false.
      */
      public static isNullOrUndefined(source: any): boolean
      {
        return this.isUndefined(source) || this.isNull(source);
      }


      /**
      *  @description Returns true if the value of the argument
      *               'source' is either null or undefined or
      *               an empty string or array.
      *
      *               All argument values which are
      *               neither null or undefined nor an empty 
      *               array or empty string lets the function 
      *               return false.
      * 
      * @param {Array<any> | string} source
      * @returns {boolean}
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


        if (TS.Utils.Assert.isString(source))
        {
          return String(source).length == 0;
        }//END if

        return false;
      }


      /**
      * @description Returns true if the argument value is
      *              either null or undefined or is a string wich is either
      *              empty or contains only white space characters.
      *
      * @throws {TS.InvalidTypeException} 
      *         Thrown if the argument value is neither a null or 
      *         undefined value nor a string.
      *
      * @param {string} source
      * @returns {boolean}
      */
      public static isNullUndefOrWhiteSpace(source: string): boolean
      {
        if (this.isNullOrUndefined(source))
        {
          return true;
        }//END if

        if (!this.isString(source))
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
      * @description  Returns true if the type of
      *               the argument 'source' is a number
      *               type, otherwise false.
      *
      * @see TS.Utils.Assert.isIntegerNumber
      * @see TS.Utils.Assert.isNumberObject
      * @see TS.Utils.Assert.isNumberValue
      * @see TS.Utils.Assert.isPositiveIntegerNumber
      *
      * @param {any} source
      * @returns {boolean}
      */
      public static isNumber(source: any): boolean
      {
        return this.isNumberObject(source) || this.isNumberValue(source);
      }


      /**
      * @description Returns true if the type of
      *              the argument 'source' is a number
      *              object type created with 'new Number()',
      *              otherwise false.
      *
      * @see TS.Utils.Assert.isNumber
      * @see TS.Utils.Assert.isNumberValue
      *
      * @param {any} source
      * @returns {boolean}
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
      * @description Returns true if the type of
      *              the argument 'source' is a number
      *              value type, otherwise false.
      *
      * @see TS.Utils.Assert.isNumber
      * @see TS.Utils.Assert.isNumberObject
      *
      * @param {any} source
      * @returns {boolean}
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
      * @description Returns true if the type of
      *              the argument 'source' is a positive
      *              infinite number value type, otherwise false.
      *
      * @see TS.Utils.Assert.isNumber
      * @see TS.Utils.Assert.isNumberValue
      * @see TS.Utils.Assert.isNumberObject
      *
      * @param {any} source
      * @returns {boolean}
      */
      public static isUnsignedInfiniteNumber(source: any): boolean
      {
        return this.isNumberValue(source) && (source === Number.POSITIVE_INFINITY);
      }


      /**
      * @description Returns true if the type of argument 'source'
      *              is either a boolean value, a number value or
      *              a string value. Otherwise the result value 
      *              will be false.
      *
      * @param {any} source
      * @returns {boolean}
      */
      public static isPrimitiveType(source: any): boolean
      {
        if (this.isNullOrUndefined(source))
        {
          return false;
        }//END if

        if (this.isBooleanValue(source))
        {
          return true;
        }//END if

        if (this.isNumberValue(source))
        {
          return true;
        }//END if

        if (this.isStringValue(source))
        {
          return true;
        }//END if

        return false;
      }

      /**
      * @description Returns true if the type of
      *              the argument 'source' is an object
      *              type, otherwise false.
      *
      * @param {any} source
      * @returns {boolean}
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
      * @description Returns true if the value of 
      *              the argument 'source' is a valid integer 
      *              number greater or equal 0, otherwise false. 
      *
      * @see TS.Utils.Assert.isNumber
      * @see TS.Utils.Assert.isIntegerNumber
      *
      * @param {any} source
      * @returns {boolean}
      */
      public static isUnsignedIntegerNumber(source: any): boolean
      {
        if (this.isIntegerNumber(source))
        {
          return source > -1;
        }//END if

        return false;
      }


      //TODO: Crate the test functions.
      /**
      * @description Returns true if the value of 
      *              the argument 'source' is a 2 dimensional
      *              array, otherwise false. 
      *
      * @see TS.Utils.Assert.isArray
      * @see TS.Utils.Assert.isCubicArray
      *
      * @param {any} source
      * @returns {boolean}
      */
      public static isSquareArray(source: any): boolean
      {
        if (this.isNullUndefOrEmpty(source))
        {
          return false;
        }//END if

        if (!this.isArray(source))
        {
          return false;
        }//END if

        return source.every((value, index, array) => TS.Utils.Assert.isArray(value));
      }


      //TODO: Crate the test functions.
      /**
      * @description Returns true if the value of 
      *              the argument 'source' is a 3 dimensional
      *              array, otherwise false. 
      *
      * @see TS.Utils.Assert.isArray
      * @see TS.Utils.Assert.isSquareArray
      *
      * @param {any} source
      * @returns {boolean}
      */
      public static isCubicArray(source: any): boolean
      {
        if (TS.Utils.Assert.isNullUndefOrEmpty(source))
        {
          return false;
        }//END if

        if (!TS.Utils.Assert.isArray(source))
        {
          return false;
        }//END if

        return source.every((value, index, array) => TS.Utils.Assert.isArray(value) && value.every((value, index, array) => TS.Utils.Assert.isArray(value)));
      }



      //TODO: Crate the test functions.
      /**
      * @description Returns true if the type of
      *              the argument 'source' is an array
      *              of byte values, otherwise false.
      *
      * @see TS.Utils.Assert.isByteValue
      *
      * @param {any} source
      * @returns {boolean}
      */
      public static isByteArray(source: any): boolean
      {
        if (TS.Utils.Assert.isNullUndefOrEmpty(source))
        {
          return false;
        }//END if

        return source.every((value, index, array) => 
        {
          if (TS.Utils.Assert.isArray(value))
          {
            return TS.Utils.Assert.isByteArray(value);
          }//END if
          else
          {
            return TS.Utils.Assert.isByteValue(value);
          }//END else
        });
      }


      /**
      * @description Returns true if the type of
      *              the argument 'source' is an array
      *              of unsinged byte values,
      *              otherwise false.
      *
      * @see TS.Utils.Assert.isUnsignedByteValue
      *
      * @param {any} source
      * @returns {boolean}
      */
      public static isUnsignedByteArray(source: any): boolean
      {
        if (TS.Utils.Assert.isNullUndefOrEmpty(source))
        {
          return false;
        }//END if

        if (!TS.Utils.Assert.isArray(source))
        {
          return false;
        }//END if

        return source.every((value, index, array) => 
        {
          if (TS.Utils.Assert.isArray(value))
          {
            return TS.Utils.Assert.isUnsignedByteArray(value);
          }//END if
          else
          {
            return TS.Utils.Assert.isUnsignedByteValue(value);
          }//END else
        });
      }

      /**
      * @description  Returns true if the type of
      *               the argument 'source' is a regular 
      *               expression type, otherwise false.
      *
      * @param {any} source
      * @returns {boolean}
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
      * @description Returns true if the type of
      *              the argument 'source' is a string,
      *              type, otherwise false.
      *
      * @see TS.Utils.Assert.isStringLiteral
      * @see TS.Utils.Assert.isStringObject
      *
      * @param {any} source
      * @returns {boolean}
      */
      public static isString(source: any): boolean
      {
        return this.isStringObject(source) || this.isStringValue(source);
      }


      /**
      * @description Returns true if the type of
      *              the argument 'source' is a string 
      *              object type created with 'new String()',
      *              otherwise false.
      *
      * @see TS.Utils.Assert.isString
      * @see TS.Utils.Assert.isStringLiteral
      *
      * @param {any} source
      * @returns {boolean}
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
      * @description Returns true if the type of
      *              the argument 'source' is a string 
      *              value type, otherwise false.
      *
      * @see TS.Utils.Assert.isString
      * @see TS.Utils.Assert.isStringObject
      *
      * @param {any} source
      * @returns {boolean}
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
      * @description Returns true if the value of
      *              the argument 'source' is undefined, 
      *              otherwise false.
      *
      * @param {any} source
      * @returns {boolean}
      */
      public static isUndefined(source: any): boolean
      {
        return source === undefined;
      }


      //TODO: Create test functions
      /**
      * @description Returns true if the type of
      *              the argument 'source' is in the 
      *              ranche of signed byte values 
      *              [-127 .. 127], otherwise false.
      *
      * @param {any} source
      * @returns {boolean}
      */
      public static isByteValue(source: any): boolean
      {
        if (this.isNullOrUndefined(source))
        {
          return false;
        }//END if

        if (!this.isIntegerNumber(source))
        {
          return false;
        }//END if

        return ((source >= -127) && (source <= 127));
      }

      //TODO: Create test functions
      /**
      * @description Returns true if the type of
      *              the argument 'source' is in the 
      *              ranche of unsigned byte values 
      *              [0 .. 255], otherwise false.
      *
      * @param {any} source
      * @returns {boolean}
      */
      public static isUnsignedByteValue(source: any): boolean
      {
        if (this.isNullOrUndefined(source))
        {
          return false;
        }//END if

        if (!this.isIntegerNumber(source))
        {
          return false;
        }//END if

        return ((0 <= source) && (source < 256));
      }


      //TODO: Create test functions
      /**
      * @description Returns true if the value of
      *              the argument 'source' is an 
      *              element of the enumeration
      *              in argument 'enumObj'.
      *
      * @param {any} source
      * @param {any} enumObj
      *
      * @returns {boolean}
      */
      public static isValueOfEnum(source: any, enumObj: any): boolean
      {
        var _indexRef;

        if (TS.Utils.Assert.isNullOrUndefined(source))
        {
          return false;
        }//END if

        if (!TS.Utils.Assert.isNumberValue(source))
        {
          return false;
        }//END if

        if (TS.Utils.Assert.isNullOrUndefined(enumObj))
        {
          return false;
        }//END if

        if (!TS.Utils.Assert.isObject(enumObj))
        {
          return false;
        }//END if

        //Check the index reference
        _indexRef = enumObj[source];
        if (!TS.Utils.Assert.isNullOrUndefined(_indexRef))
        {
          //Check the back reference
          if (enumObj[_indexRef] == source)
          {
            return true;
          }//END if
        }//END if

        return false;
      }
    }//END class

  }//END module
}//END module 