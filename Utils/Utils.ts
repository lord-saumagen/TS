module TS
{
  "use strict";

  export module Utils
  {

    /**
    *  @description Checks whether the value of argument 
    *               'parameter' is a boolean or not.
    *               Throws a 'TS.InvalidTypeException' if the value of argument 
    *               'parameter' is not a boolean.
    *               The exceptions message uses the 'paramName' and 'functionName'
    *               in its message to signal which parameter failed the check and 
    *               which function received the invalid parameter.
    *
    *  @throws TS.InvalidTypeException
    */
    export function checkBooleanParameter(parameter: any, paramName: string, functionName: string)
    {
      if (!TS.Utils.Assert.isBoolean(parameter))
      {
        throw new TS.InvalidTypeException(paramName, parameter, "Argument '" + paramName + "' must be a boolean parameter in function '" + functionName + "'.");
      }//END if
    }


    /**
    *  @description Checks whether the 'thisContext' is a valid
    *               type for a constructor call or not. 
    *               Throws a 'TS.InvalidOperationException' if the value 
    *               of argument 'thisContext' is either null or undefined 
    *               or not of the required type.
    *               Throws a 'TS.ArgumentNullOrUndefinedException'
    *               if argument 'requiredType' is not specified.
    *
    *  @throws TS.ArgumentNullOrUndefinedException
    *  @throws TS.InvalidOperationException
    */
    export function checkConstructorCall(thisContext: any, requiredType: any)
    {
      var _functionName: string;

      if (TS.Utils.Assert.isNullOrUndefined(thisContext))
      {
        if (TS.Utils.Assert.isNullOrUndefined(requiredType))
        {
          throw new TS.ArgumentNullOrUndefinedException("requiredType", "The argument 'requiredType' must not be null or undefined in function 'TS.Utils.checkConstructorCall.");
        } //END if
        else
        {
          _functionName = TS.Utils.getFunctionName(requiredType);
          throw new TS.InvalidOperationException("The constructor of " + _functionName + " must be called with the 'new' operator.");
        }//END else
      } //END if


      if (TS.Utils.Assert.isNullOrUndefined(requiredType))
      {
        throw new TS.ArgumentNullOrUndefinedException("requiredType", "The argument 'requiredType' must not be null or undefined in function 'TS.Utils.checkConstructorCall.");
      } //END if

      if (!(thisContext instanceof requiredType))
      {
        _functionName = TS.Utils.getFunctionName(requiredType);
        throw new TS.InvalidOperationException("The constructor of '" + _functionName + "' must be called with the 'new' operator.");
      }//END if
    }


    //TODO: Create test function.
    /**
    *  @description Checks whether the value of argument 
    *               'parameter' is an array of unsigned byte values.
    *               Throws a 'TS.InvalidTypeException' if not.
    *               Checks wheter the value of argument 
    *               'parameter' is an array with 16, 24 or 32 elements.
    *               Throws a 'TS.ArgumentOutOfRangeException' if not.
    *               The exceptions message uses the 'paramName' and 'functionName'
    *               in its message to signal which parameter failed the check and 
    *               which function received the invalid parameter.
    *
    * @throws {TS.InvalidTypeException}
    * @throws {TS.ArgumentOutOfRangeException}
    */
    export function checkKeyByteArray(parameter: any, paramName: string, functionName: string)
    {
      if (!TS.Utils.Assert.isUnsignedByteArray(parameter))
      {
        throw new TS.InvalidTypeException(paramName, parameter, "Argument '" + paramName + "' must be an unsigned byte value array in function '" + functionName + "'.");
      }//eND if

      if ([16, 24, 32].filter((value) => value == parameter.length).length == 0)
      {
        throw new TS.ArgumentOutOfRangeException(paramName, parameter, "Argument '" + paramName + "' must be an array of unsigned byte values with [16 | 24 | 32] elements in function '" + functionName + "'.");
      }//END if
    }


    /**
    *  @description Checks the value of argument 'parameter' 
    *               against null and undefined and throws a 
    *               'TS.ArgumentNullOrUndefinedException' if the argument is 
    *               either null or undefined. 
    *
    *               Checks also the type of the argument which must evaluate
    *               to 'function' and checks whether the function returns an object
    *               if it is called with the 'new' operator and an empty argument list.
    *               
    *               The function throws a 'TS.InvalidTypeException' if the call
    *               with the 'new' operator fails for any reason or the returned
    *               value is not an object, null or undefined.
    *               
    *               Attention, even if the check succeeded, the function specified
    *               in the argument 'parameter' may not be supposed to be called 
    *               as a constructor function. (To be called with the new operator.)
    *               Since JavaScript allows to call every function with the new 
    *               operator there is no way to tell whether a function was supposed
    *               to be used as a constructor function or not. But at least that
    *               check can tell that a call to that function as constructor 
    *               function won't fail and will return an object of any type when
    *               the function passed the check.
    *
    *  @throws TS.ArgumentNullOrUndefinedException
    *  @throws TS.InvalidTypeException
    */
    export function checkConstructorParameter(parameter: any, paramName: string, functionName: string)
    {
      var _object: any;
      var _ownPropertyArray: Array<any>;
      var _prototype: any;

      if (TS.Utils.Assert.isNullOrUndefined(parameter))
      {
        throw new TS.ArgumentNullOrUndefinedException(paramName, "Argument '" + paramName + "' must not be null or undefinde in function '" + functionName + "'.");
      }//END if

      if (typeof (parameter) != "function")
      {
        throw new TS.InvalidTypeException(paramName, "Argument '" + paramName + "' must not of type 'function' in function '" + functionName + "'.");
      }//END if

      try
      {
        _object = new parameter();
      }//END try
      catch (Ex)
      {
        throw new TS.InvalidTypeException(paramName, "Argument '" + paramName + "' must be a valid constructor function in function '" + functionName + "'.");
      };

      if (TS.Utils.Assert.isNullOrUndefined(_object))
      {
        throw new TS.InvalidTypeException(paramName, "Argument '" + paramName + "' must be a valid constructor function in function '" + functionName + "'.");
      }//END if

      if (!TS.Utils.Assert.isObject(_object))
      {
        throw new TS.InvalidTypeException(paramName, "Argument '" + paramName + "' must be a valid constructor function in function '" + functionName + "'.");
      }//END if

      //
      //Assure that the object is at least one created
      //by the constructor function in argument 'parameter'
      //an not an arbitrary object as might be returned
      //form a factory function.
      //
      if (!(_object instanceof parameter))
      {
        throw new TS.InvalidTypeException(paramName, "Argument '" + paramName + "' must be a valid constructor function in function '" + functionName + "'.");
      }//END if

      if (!(parameter.prototype.isPrototypeOf(_object)))
      {
        throw new TS.InvalidTypeException(paramName, "Argument '" + paramName + "' must be a valid constructor function in function '" + functionName + "'.");
      }//END if

      //
      // Check whether the new created object is an empty object or not.
      // If the object is an empty object (An object without any properties
      // or methods which are not default values.) treat it as erroneous.
      // A constructor function shouldn't return an empty object because
      // that's meaningless.
      //

      _ownPropertyArray = new Array<any>();
      for (var _key in _object)
      {
        if (Object.prototype.hasOwnProperty.call(_object, _key))
        {
          _ownPropertyArray.push(_key);
        }//END if
      }//END for

      //
      // Chech whether the base class is 'Object' or not. If the 
      // base class isn't object, check the own properties on the
      // the prototype. It may be that only the prototype got
      // subclassed.
      //
      if (Object.getPrototypeOf(Object.getPrototypeOf(_object)) != null)
      {
        _prototype = Object.getPrototypeOf(_object);
        for (var _key in _prototype)
        {
          if (Object.prototype.hasOwnProperty.call(_prototype, _key))
          {
            _ownPropertyArray.push(_key);
          }//END if
        }//END for
      }//END if

      //
      // It's an empty object. 
      //
      if (_ownPropertyArray.length == 0)
      {
        throw new TS.InvalidTypeException(paramName, "Argument '" + paramName + "' must be a valid constructor function in function '" + functionName + "'.");
      }//END if

    }


    /**
    *  @description This function checks whether the value of argument 
    *               'parameter' is a function or not.
    *               If not, a 'InvalidTypeException' is thrown.
    *               The exceptions message uses the 'paramName' and 'functionName'
    *               in its message to signal which parameter failed the check and 
    *               which function received the invalid parameter.
    *
    *  @throws TS.InvalidTypeException
    */
    export function checkFunctionParameter(parameter: any, paramName: string, functionName: string)
    {
      if (!TS.Utils.Assert.isFunction(parameter))
      {
        throw new TS.InvalidTypeException(paramName, parameter, "Argument '" + paramName + "' must be a function parameter in function '" + functionName + "'.");
      }//END if
    }


    /**
    *  @description Checks the value of argument 'parameter' against null 
    *               and undefined and throws a 'TS.ArgumentNullOrUndefinedException' if
    *               the argument is either null or undefined. 
    *
    *               Checks also whether the value of argument 'parameter' is a integer 
    *               number in the range [-Number.MAX_VALUE...Number.MAX_VALUE] and throws a 
    *               'TS.InvalidTypeException' if the value is either not an integer,
    *               out of range or not a number at all.
    *               The exceptions message uses the 'paramName' and 'functionName' 
    *               in its message to signal which parameter failed the check and 
    *               which function received the invalid parameter.
    *
    *  @throws TS.ArgumentNullOrUndefinedException
    *  @throws TS.InvalidTypeException
    */
    export function checkIntegerNumberParameter(parameter: number, parameterName: string, functionName: string)
    {
      if (TS.Utils.Assert.isNullOrUndefined(parameter))
      {
        throw new TS.ArgumentNullOrUndefinedException(parameterName, "Argument '" + parameterName + "' must not be null or undefined in function '" + functionName + "'.");
      }//END if


      if (!TS.Utils.Assert.isIntegerNumber(parameter))
      {
        throw new TS.InvalidTypeException("parameterName", parameter, "Argument '" + parameterName + "' must be a valid integer number in function'" + functionName + "'.");
      }//END if
    }


    //TODO: Crate the test functions.
    export function checkSquareArray(inputArray: any, parameterName: string, functionName: string)
    {
      if (TS.Utils.Assert.isNullUndefOrEmpty(inputArray))
      {
        throw new TS.ArgumentNullUndefOrEmptyException(inputArray, "Argument '" + parameterName + "' must not be undefined, null or empty in function '" + functionName + "'.");
      }//END if

      if (!TS.Utils.Assert.isSquareArray(inputArray))
      {
        throw new TS.ArgumentNullUndefOrEmptyException(inputArray, "Argument '" + parameterName + "' must be a square array in function '" + functionName + "'.");
      }//END if
    }


    //TODO: Crate the test functions.
    /**
     * @throws {TS.ArgumentNullUndefOrEmptyException}
     */
    export function checkCubicArray(inputArray: any, parameterName: string, functionName: string)
    {

      if (TS.Utils.Assert.isNullUndefOrEmpty(inputArray))
      {
        throw new TS.ArgumentNullUndefOrEmptyException(inputArray, "Argument '" + parameterName + "' must not be undefined, null or empty in function '" + functionName + "'.");
      }//END if

      if (!TS.Utils.Assert.isCubicArray(inputArray))
      {
        throw new TS.ArgumentNullUndefOrEmptyException(inputArray, "Argument '" + parameterName + "' must be a cubic array in function '" + functionName + "'.");
      }//END if
    }



    //TODO: Crate the test functions.
    /**
     * @throws {TS.ArgumentException}
     */
    export function checkArrayParameter(parameter: any, parameterName: string, functionName: string)
    {
      var _arrayLength;

      _arrayLength = null;

      if (!TS.Utils.Assert.isArray(parameter))
      {
        throw new TS.ArgumentException(parameter, "Argument '" + parameterName + "' if not a valid array in function '" + functionName + "'.");
      }//END if

    }



    //TODO: Crate the test functions.
    /**
    * @description Checks whether the value of argument 'parameter' is a valid
    *              array of unsigned bytes and throws a 'TS.InvalidTypeException' if not.
    *              The exceptions message uses the 'paramName' and 'functionName' 
    *              in its message to signal which parameter failed the check and 
    *              which function received the invalid parameter.
    *
    * @throws {TS.InvalidTypeException}
    */
    export function checkUnsignedByteArrayParameter(parameter: any, parameterName: string, functionName: string)
    {
      if (!TS.Utils.Assert.isUnsignedByteArray(parameter))
      {
        throw new TS.InvalidTypeException(parameterName, parameter, "Argument '" + parameterName + "' is not a valid unsigned byte array in function '" + functionName + "'.");
      }//END if
    }

    //TODO: Crate the test functions.
    /**
    * @description Checks whether the value of argument 'parameter' is a valid
    *              unsigned byte value and throws a 'TS.InvalidTypeException' if not.
    *              The exceptions message uses the 'paramName' and 'functionName' 
    *              in its message to signal which parameter failed the check and 
    *              which function received the invalid parameter.
    *
    * @throws {TS.InvalidTypeException}
    */
    export function checkUnsignedByteParameter(parameter: any, parameterName: string, functionName: string)
    {
      if (!TS.Utils.Assert.isUnsignedByteValue(parameter))
      {
        throw new TS.InvalidTypeException(parameterName, parameter, "Argument '" + parameterName + "' is not a valid unsigned byte value in function '" + functionName + "'.");
      }//END if
    }

    /**
    *  @description Checks the value of argument 'parameter' against 
    *               undefined and throws a 'TS.ArgumentUndefinedException' if
    *               the argument is undefined. 
    *               The exceptions message uses the 'paramName' and 'functionName' 
    *               in its message to signal which parameter failed the check and 
    *               which function received the invalid parameter.
    *
    *  @throws {TS.ArgumentUndefinedException}
    */
    export function checkNotUndefinedParameter(parameter: any, parameterName: string, functionName: string)
    {
      if (TS.Utils.Assert.isUndefined(parameter))
      {
        throw new TS.ArgumentUndefinedException(parameterName, "Argument '" + parameterName + "' must not be undefined in function '" + functionName + "'.");
      }//END if
    }


    /**
    *  @description Checks the value of argument 'parameter' against null 
    *               and undefined and throws a 'TS.ArgumentNullOrUndefinedException' if
    *               the argument is either null or undefined. 
    *               The exceptions message uses the 'paramName' and 'functionName' 
    *               in its message to signal which parameter failed the check and 
    *               which function received the invalid parameter.
    *
    *  @throws {TS.ArgumentNullOrUndefinedException}
    */
    export function checkParameter(parameter: any, paramName: string, functionName: string)
    {
      if (TS.Utils.Assert.isNullOrUndefined(parameter))
      {
        throw new TS.ArgumentNullOrUndefinedException(paramName, "Argument '" + paramName + "' must not be null or undefinde in function '" + functionName + "'.");
      }//END if
    }


    //TODO: Crate the test functions.
    /**
    * @description This function checks the argument 'parameter' against null, 
    *              undefined, an empty string and an empty array and throws a 
    *              'TS.ArgumentNullUndefOrEmptyException' if
    *              the argument is either of this.
    *              The exceptions message uses the 'paramName' and 'functionName' 
    *              in its message to signal which parameter failed the check and 
    *              which function received the invalid parameter.
    *
    * @throws {TS.ArgumentNullUndefOrEmptyException}
    */
    export function checkNotEmptyParameter(parameter: any, paramName: string, functionName: string)
    {
      if (TS.Utils.Assert.isNullUndefOrEmpty(parameter))
      {
        throw new TS.ArgumentNullUndefOrEmptyException(parameter, "Argument '" + paramName + "' must not be null, undefined, an empty array or an empty string in function '" + functionName + "'.");
      }//END if
    }


    /**
    *  @description Checks the value of argument 'parameter' against null 
    *               and undefined and throws a 'TS.ArgumentNullOrUndefinedException' if
    *               the argument is either null or undefined. 
    *
    *               Checks also whether the value of argument 'parameter' is a integer 
    *               number in the range [0..Number.MAX_VALUE] or not and throws a 
    *               'TS.InvalidTypeException' if the value is either not an integer,
    *               out of range or not a number at all.
    *               The exceptions message uses the 'paramName' and 'functionName' 
    *               in its message to signal which parameter failed the check and 
    *               which function received the invalid parameter.
    *
    *  @throws {TS.ArgumentNullOrUndefinedException}
    *  @throws {TS.InvalidTypeException}
    */
    export function checkUnsignedIntegerNumberParameter(parameter: number, parameterName: string, functionName: string)
    {
      if (TS.Utils.Assert.isNullOrUndefined(parameter))
      {
        throw new TS.ArgumentNullOrUndefinedException(parameterName, "Argument '" + parameterName + "' must not be null or undefined in function '" + functionName + "'.");
      }//END if


      if (!TS.Utils.Assert.isUnsignedIntegerNumber(parameter))
      {
        throw new TS.InvalidTypeException("parameterName", parameter, "Argument '" + parameterName + "' must be a valid positive integer number in function'" + functionName + "'.");
      }//END if
    }


    /**
    * @description Checks the value of argument 'parameter' against null and undefined
    *              and throws a 'TS.ArgumentNullOrUndefinedException' if
    *              the argument is either null or undefined. 
    *
    *              Checks whether the argument 'parameter' is a valid string.
    *              Throws a 'TS.InvalidTypeException' if not.
    *
    *              Checks wether the argument 'parameter' is an empty string or whitespace only.
    *              Throws a 'TS.ArgumentNullUndefOrWhiteSpaceException' if so.
    *             
    *              The exceptions message uses the 'paramName' and 'functionName' 
    *              in its message to signal which parameter failed the check and 
    *              which function received the invalid parameter.
    *
    * @throws {TS.ArgumentNullOrUndefinedException}
    * @throws {TS.ArgumentNullUndefOrWhiteSpaceException}
    * @throws {TS.InvalidTypeException}
    */
    export function checkStringParameter(parameter: string, parameterName: string, functionName: string)
    {
      if (TS.Utils.Assert.isNullOrUndefined(parameter))
      {
        throw new TS.ArgumentNullOrUndefinedException(parameterName, "Argument '" + parameterName + "' must not be null or undefined in function '" + functionName + "'.");
      }//END if

      if (!TS.Utils.Assert.isString(parameter))
      {
        throw new TS.InvalidTypeException(parameterName, "Argument '" + parameterName + "' must be string variable in function '" + functionName + "'.");
      }//END if

      if (TS.Utils.Assert.isNullUndefOrWhiteSpace(parameter))
      {
        throw new TS.ArgumentNullUndefOrWhiteSpaceException(parameterName, "Argument '" + parameterName + "' must not be empty or whitespace in function '" + functionName + "'.");
      }//END if
    }


    //TODO: Create test function
    /**
    * @description Checks the value of argument 'parameter' against null and undefined
    *              and throws a 'TS.ArgumentNullOrUndefinedException' if
    *              the argument is either null or undefined. 
    *
    *              Checks whether the argument 'parameter' is a valid string.
    *              Throws a 'TS.InvalidTypeException' if not.
    *
    *              Checks wether the argument 'parameter' is an empty string or whitespace only.
    *              Throws a 'TS.ArgumentNullUndefOrWhiteSpaceException' if so.
    *             
    *              Check whether the argument 'parameter' is a valid binary string. (A string
    *              which comprises the characters "[0,1]" only with no white space.)
    *              Throws a 'TS.ArgumentException' if not.
    *
    *              The exceptions message uses the 'paramName' and 'functionName' 
    *              in its message to signal which parameter failed the check and 
    *              which function received the invalid parameter.
    *
    * @throws {TS.ArgumentNullOrUndefinedException}
    * @throws {TS.ArgumentNullUndefOrWhiteSpaceException}
    * @throws {TS.InvalidTypeException}
    * @throws {TS.ArgumentException}
    */
    export function checkBitStringParameter(parameter: string, parameterName: string, functionName: string)
    {

      checkStringParameter(parameter, parameterName, functionName);

      if (!TS.Utils.Assert.isBinaryString(parameter))
      {
        throw new TS.ArgumentException(parameterName, "Argument '" + parameterName + "' is not a valid binary string in function '" + functionName + "'.");
      }//END if
    }

    /**
    * @throws {TS.ArgumentNullOrUndefinedException}
    * @throws {TS.InvalidTypeException}
    */
    export function checkUInt64NumberParameter(parameter: TS.TypeCode.UInt64, parameterName: string, functionName: string)
    {
      if (TS.Utils.Assert.isNullOrUndefined(parameter))
      {
        throw new TS.ArgumentNullOrUndefinedException(parameterName, "Argument '" + parameterName + "' must not be null or undefined in function '" + functionName + "'.");
      }//END if


      if (TS.Utils.Assert.isNullOrUndefined(parameter.MSInteger) || TS.Utils.Assert.isNullOrUndefined(parameter.LSInteger))
      {
        throw new TS.InvalidTypeException("parameterName", parameter, "Argument '" + parameterName + "' must be a valid UInt64 number in function'" + functionName + "'.");
      }//END if
    }





    /**
    *  @description Takes a sparse array and returns a new created 
    *               dense array. That is an array where all elements
    *               with an 'undefined' value are removed. If 'allowNull'
    *               is set to false, the elements with a 'null' value
    *               gets also removed. That is also the default behavior.
    *
    *               Returns an empty array if it is called with an 
    *               invalid argument.
    * 
    * @param {Array<any>} sparseArray
    * @param {boolean} allowNull (Default = false)
    * 
    * @returns {Array<any>}
    */
    export function compactArray(sparseArray: Array<any>, allowNull : boolean = false): Array<any>
    {
      if (!TS.Utils.Assert.isArray(sparseArray))
      {
        return [];
      }//END if

      if (sparseArray.length == 0)
      {
        return [];
      }//END if

      return sparseArray.filter((value, index, array) =>
      {
        if (allowNull)
        {
          return value !== undefined;
        }//END if
        else
        {
          return value !== undefined && value !== null;
        }//END else
      });
    }


    /**
    * @description Creates a version 4 random GUID which is returned
    *              as string in a canonical representation.
    *
    * @see {@link http://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_.28random.29 | Wikipedia }
    * @see {@link http://www.ietf.org/rfc/rfc4122.txt | IETF }
    */
    export function createGUID(): string
    {
      var _charSetArray: Array<string> = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
      var _charSetVariantArray: Array<string> = ["8", "9", "A", "B"];
      var _charSetEnum: TS.Linq.Enumerable<String>;
      var _returnString: string;

      _charSetEnum = TS.Linq.Extensions.fromArray(_charSetArray);

      _returnString = "";
      _returnString += TS.Linq.Extensions.random(_charSetEnum).take(8).toArray().join('') + "-";
      _returnString += TS.Linq.Extensions.random(_charSetEnum).take(4).toArray().join('') + "-";
      _returnString += "4" + TS.Linq.Extensions.random(_charSetEnum).take(3).toArray().join('') + "-";
      _returnString += _charSetVariantArray[Math.floor(Math.random() * 4)] + TS.Linq.Extensions.random(_charSetEnum).take(4).toArray().join('') + "-";
      _returnString += TS.Linq.Extensions.random(_charSetEnum).take(12).toArray().join('');

      return _returnString;
    }


    /**
    * @description Returns the name of the function given in argument 'func' as string.
    *              Throws a 'TS.InvalidTypeException' if the value of argument 
    *              'func' is null, undefined or not of type 'function'.
    *              Returns an empty or whitespace string if the function given 
    *              in argument 'func' is an anonymous function.
    *              The function returns a 'null' value if the internal regular expression
    *              failed to detect the function name. That may be an indicator to improve the
    *              regular expression.
    *
    * @throws {TS.InvalidTypeException}
    */
    export function getFunctionName(func: Function): string 
    {
      var _returnString: string;
      var _regex: RegExp;
      var _resultArray: Array<string>;

      _returnString = null;
      _regex = new RegExp("function +(\\w*\\()", "i");

      if (!TS.Utils.Assert.isFunction(func))
      {
        throw new TS.InvalidTypeException("func", func, "Argument 'func' must be of type 'Function' in function 'TS.Utils.getFunctionName'.");
      }//END if

      _resultArray = func.toString().match(_regex);

      if (_resultArray.length == 0)
      {
        return null;
      }//END if

      _returnString = _resultArray[0].replace("function", "").replace("Function", "").replace(" ", "").replace("(", "");
      return _returnString;
    }


    /**
    * @description Takes the string from argument 'path' and
    *              returns a new string where every double backslash
    *              is substituted by a slash.
    *
    *              After that every double slash gets replaced
    *              by a single slash. A path like:
    *
    *              C:\\\\Windows\\System32\\Drivers
    *              
    *              would result in:
    *              
    *              C:/Windows/System32/Drivers
    *
    *              The function returns an empty string if
    *              it is called with an invalid argument.
    */
    export function normalizePath(path: string): string
    {
      var _returnPath: String;

      if (TS.Utils.Assert.isNullOrUndefined(path))
      {
        return "";
      }//END if

      if (!TS.Utils.Assert.isString(path))
      {
        return "";
      }//END if

      if (path.trim().length == 0)
      {
        return "";
      }//END if

      _returnPath = new String(path);

      while (_returnPath.indexOf("\\") > -1)
      {
        _returnPath = _returnPath.replace("\\", "/");
      }//END while

      while (_returnPath.indexOf("//") > -1)
      {
        _returnPath = _returnPath.replace("//", "/");
      }//END while

      return _returnPath.toString();
    }


    /**
    * @description Returns a string which is padded with leading 
    *              characters as specified in argument 'fillChar'
    *              until the length specified in argument 'length'
    *              is reached.
    *              
    *              The function returns a copy of the source string
    *              if the values of the arguments 'fillChar' or 
    *              'length' are invalid.
    *              
    *              A copy of the 'source' string is also returned if
    *              the length of the source is greater or equal 
    *              the value of the 'length' parameter. The function
    *              doesn't truncate the string.
    *              
    *              The function returns a string consisting of
    *              a concatenation of 'fillChar' up to the length
    *              given in argument 'length' if the argument value
    *              of argument 'source' is invalid, null or empty.
    *
    */
    export function padLeft(source: string, fillChar: string, length: number): string
    {
      var _fillString: string;
      var _resultString: string;

      if (TS.Utils.Assert.isNullUndefOrEmpty(fillChar))
      {
        return new String(source).toString();
      }//END if

      if (!TS.Utils.Assert.isUnsignedIntegerNumber(length))
      {
        return new String(source).toString();
      }//END if

      _fillString = fillChar;
      while (_fillString.length < length)
      {
        _fillString += _fillString;
      }//END while
      _fillString = _fillString.substr(0, length);

      if (TS.Utils.Assert.isNullUndefOrEmpty(source))
      {
        return _fillString;
      }//END if
      else
      {
        _fillString = _fillString.substr(0, length - source.length);
        _fillString += source;
        return _fillString;
      }//END else
    }



    //TODO: Crate the test functions.
    /**
     * @throws {TS.ArgumentException}
     */
    export function UnsignedByteToHexString(inputByte: number): string
    {
      if (!TS.Utils.Assert.isUnsignedByteValue(inputByte))
      {
        throw new TS.ArgumentException("inputByte", inputByte, "Argument 'inputByte' is not a valid unsigned byte value in function 'TS.Utils.UnsignedByteToHexString'.");
      }//END if

      return ((inputByte < 16) ? "0" + inputByte.toString(16) : inputByte.toString(16));
    }


    /**
    * @throws {TS.ArgumentException}
    * @throws {TS.ArgumentOutOfRangeException}
    */
    export function Unsigned32BitIntegerToHexString(input32BitInteger: number): string
    {
      var _resultString: string;

      if (!TS.Utils.Assert.isUnsignedIntegerNumber(input32BitInteger))
      {
        throw new TS.ArgumentException("input32BitInteger", input32BitInteger, "Argument 'input32BitInteger' is not a valid unsigned 32 bit integer value in function 'TS.Utils.Unsigned32BitIntegerToHexString'.");
      }//END if

      if (input32BitInteger > 0xFFFFFFFF)
      {
        throw new TS.ArgumentOutOfRangeException("input32BitInteger", input32BitInteger, "Argument 'input32BitInteger' exceeded the range of an unsigned 32 bit integer in function 'TS.Utils.Unsigned32BitIntegerToHexString'.");
      }//END if

      _resultString = input32BitInteger.toString(16);
      return TS.Utils.padLeft(_resultString, "0", 8);
    }

    /**
    * @description Converts a DOMCollection into an array
    *              of HTMLElement and returns that array.
    *
    * @param {any} collection
    * @returns {Array<HTMLElement>}
    * 
    * @throws {TS.ArgumentNullException}
    * @throws {TS.InvalidTypeException}
    */
    export function DOMCollectionToArray(collection: any): Array<HTMLElement>
    {
      var _index;
      var _resultArray;

      if (TS.Utils.Assert.isNullOrUndefined(collection))
      {
        throw new TS.ArgumentNullException("collection", "Argument 'collection' must not be null in function 'DOMCollectionToArray'.");
      }//END if

      if (TS.Utils.Assert.isNullOrUndefined(collection.length))
      {
        throw new TS.InvalidTypeException("collection", collection, "Argument 'collection' has the wrong type in function 'DOMCollectionToArray'.");
      }//END if

      _resultArray = new Array();

      for (_index = 0; _index < collection.length; _index++)
      {
        _resultArray.push(collection[_index]);
      }//END for

      return _resultArray;
    }


    //TODO: Create test
    /*
    * @description Converts the unsigned 16 bit integer number in argument 
    *              'unsigned16BitInteger' into an array of 4 byte values 
    *              and returns that array.
    *
    * @param {number} unsigned16BitInteger
    *
    * @returns {Array<number>} an array of for byte values.
    *
    * @throws {TS.ArgumentNullOrUndefinedException}
    * @throws {TS.InvalidTypeException}
    * @throws {TS.ArgumentOutOfRangeException}
    */
    export function unsigned16BitIntegerTo4ByteArray(unsigned16BitInteger: number): Array<number>
    {
      var _resultArray: Array<number>;

      TS.Utils.checkUnsignedIntegerNumberParameter(unsigned16BitInteger, "unsigned16BitInteger", "TS.Utils.unsigned16BitIntegerTo4ByteArray");

      if (unsigned16BitInteger > 0xFFFFFFFF)
      {
        throw new TS.ArgumentOutOfRangeException("unsigned16BitInteger", unsigned16BitInteger, "Argument 'unsigned16BitInteger' exceeded the range of an unsinged 16 bit integer in function 'TS.Utils.unsigned16BitIntegerTo4ByteArray'.");
      }//END if

      _resultArray = unsignedIntegerToByteArray(unsigned16BitInteger);
      while (_resultArray.length < 4)
      {
        _resultArray.unshift(0);
      }//END while
      return _resultArray;
    }


    //TODO: Create test
    /*
    * @description Converts the unsigned integer number in argument 
    *              'unsignedInteger' into an array of byte
    *              values and returns that array. The array 
    *              has as much elements as necessary to represent
    *              the value given in argument 'unsignedInteger'.
    *
    * @param {number} unsignedInteger
    *
    * @returns {Array<number>} an array of for byte values.
    *
    * @throws {TS.ArgumentNullOrUndefinedException}
    * @throws {TS.InvalidTypeException}
    */
    export function unsignedIntegerToByteArray(unsignedInteger: number): Array<number>
    {
      var _resultArray: Array<number>;
      var _byte: number;

      TS.Utils.checkUnsignedIntegerNumberParameter(unsignedInteger, "unsignedInteger", "TS.Utils.unsignedIntegerToByteArray");

      _resultArray = new Array<number>();

      while (unsignedInteger > 0)
      {
        _byte = unsignedInteger & 0xff;
        _resultArray.unshift(_byte);
        unsignedInteger = (unsignedInteger - _byte) / 256;
      }//END while

      return _resultArray;
    }



    //TODO: Crate the test functions. Add descripion
    export function byteToBitString(value: number): string
    {
      var _resultString: string;

      if (!TS.Utils.Assert.isUnsignedByteValue(value))
      {
        return "";
      }//END if

      _resultString = "";
      _resultString += value.toString(2);
      _resultString = padLeft(_resultString, "0", 8);
      return _resultString;
    }

    //TODO: Crate the test functions. Add descripion
    export function bitStringToByteArray(bitString: string): Array<number>
    {
      var _resultArray: Array<number>;
      var _byteStringArray: Array<string>;
      var _index: number;

      _resultArray = new Array<number>();

      if (TS.Utils.Assert.isNullUndefOrWhiteSpace(bitString))
      {
        return _resultArray;
      }//END if

      _byteStringArray = new Array<string>();

      while (bitString.length > 0)
      {
        _byteStringArray.push(bitString.substr(0, 8));
        bitString = bitString.substr(8);
      }//END while

      for (_index = 0; _index < _byteStringArray.length; _index++)
      {
        //Handle the remaining in an appropriate way for the 
        //current block 
        _resultArray.push(parseInt(_byteStringArray[_index], 2));
      }//END for

      return _resultArray;
    }


    //TODO: Crate the test functions. Add descripion
    export function byteArrayToBitString(byteArray: Array<number>): string
    {
      var _resultString: string;

      if (!TS.Utils.Assert.isUnsignedByteArray(byteArray))
      {
        return "";
      }//END if

      _resultString = "";

      byteArray.forEach((value, index, array) => _resultString += byteToBitString(value));

      return _resultString;
    }

    //TODO: Crate the test functions. Add descripion
    /*
     * @throws {TS.ArgumentOutOfRangeException}
     */
    export function byteArrayToUnsignedNumber(byteArray: Array<number>): number
    {
      var _resultNumber: number;
      var _index: number;

      if (!TS.Utils.Assert.isUnsignedByteArray(byteArray))
      {
        return null;
      }//END if

      _resultNumber = 0;

      for (_index = 0; _index < byteArray.length; _index++)
      {
        _resultNumber += byteArray[_index] * Math.pow(256, byteArray.length -1 -_index);
        if (_resultNumber > Number.MAX_VALUE)
        {
          throw new TS.ArgumentOutOfRangeException("byteArray", byteArray, "Argument 'byteArray' exceedes the maximum number range during conversion to an unsigned number in function TS.Utils.byteArrayToUnsignedNumber");
        }//END if

      }//END for

      return _resultNumber;
    }

  }//END module
}//END module 