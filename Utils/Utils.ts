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
      if (!TS.Utils.TypeInfo.isBoolean(parameter))
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
    export function checkConstructorCall(thisContext: any, requiredType : any)
    {
      var _functionName: string;

      if (TS.Utils.TypeInfo.isNullOrUndefined(thisContext))
      {
        if (TS.Utils.TypeInfo.isNullOrUndefined(requiredType))
        {
          throw new TS.ArgumentNullOrUndefinedException("requiredType", "The argument 'requiredType' must not be null or undefined in function 'TS.Utils.checkConstructorCall.");
        } //END if
        else
        {
          _functionName = TS.Utils.getFunctionName(requiredType);
          throw new TS.InvalidOperationException("The constructor of " + _functionName + " must be called with the 'new' operator.");
        }//END else
      } //END if


      if (TS.Utils.TypeInfo.isNullOrUndefined(requiredType))
      {
        throw new TS.ArgumentNullOrUndefinedException("requiredType", "The argument 'requiredType' must not be null or undefined in function 'TS.Utils.checkConstructorCall.");
      } //END if

      if (!(thisContext instanceof requiredType))
      {
        _functionName = TS.Utils.getFunctionName(requiredType);
        throw new TS.InvalidOperationException("The constructor of '" + _functionName + "' must be called with the 'new' operator.");
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
    *               function won't fail an will return an object of any type when
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

      if (TS.Utils.TypeInfo.isNullOrUndefined(parameter))
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

      if (TS.Utils.TypeInfo.isNullOrUndefined(_object))
      {
        throw new TS.InvalidTypeException(paramName, "Argument '" + paramName + "' must be a valid constructor function in function '" + functionName + "'.");
      }//END if

      if (!TS.Utils.TypeInfo.isObject(_object))
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

      if(!(parameter.prototype.isPrototypeOf(_object)))
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
      if (!TS.Utils.TypeInfo.isFunction(parameter))
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
      if (TS.Utils.TypeInfo.isNullOrUndefined(parameter))
      {
        throw new TS.ArgumentNullOrUndefinedException(parameterName, "Argument '" + parameterName + "' must not be null or undefined in function '" + functionName + "'.");
      }//END if


      if (!TS.Utils.TypeInfo.isIntegerNumber(parameter))
      {
        throw new TS.InvalidTypeException("parameterName", parameter, "Argument '" + parameterName + "' must be a valid integer number in function'" + functionName + "'.");
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
    *  @throws TS.ArgumentUndefinedException
    */
    export function checkNotUndefinedParameter(parameter: any, parameterName: string, functionName: string)
    {
      if (TS.Utils.TypeInfo.isUndefined(parameter))
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
    *  @throws TS.ArgumentNullOrUndefinedException
    */
    export function checkParameter(parameter: any, paramName: string, functionName: string)
    {
      if (TS.Utils.TypeInfo.isNullOrUndefined(parameter))
      {
        throw new TS.ArgumentNullOrUndefinedException(paramName, "Argument '" + paramName + "' must not be null or undefinde in function '" + functionName + "'.");
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
    *  @throws TS.ArgumentNullOrUndefinedException
    *  @throws TS.InvalidTypeException
    */
    export function checkPositivIntegerNumberParameter(parameter: number, parameterName: string, functionName: string)
    {
      if (TS.Utils.TypeInfo.isNullOrUndefined(parameter))
      {
        throw new TS.ArgumentNullOrUndefinedException(parameterName, "Argument '" + parameterName + "' must not be null or undefined in function '" + functionName + "'.");
      }//END if


      if (!TS.Utils.TypeInfo.isPositiveIntegerNumber(parameter))
      {
        throw new TS.InvalidTypeException("parameterName", parameter, "Argument '" + parameterName + "' must be a valid positive integer number in function'" + functionName + "'.");
      }//END if
    }


    /**
    *  @description Checks the value of argument 'parameter' against null and undefined
    *               and throws a 'TS.ArgumentNullOrUndefinedException' if
    *               the argument is either null or undefined. 
    *
    *               Checks the value of argument 'parameter' also against an empty 
    *               string and whitespace and throws a 'TS.ArgumentNullUndefOrWhiteSpaceException'
    *               if the argument is either an empty string or a whitespace string.
    *               Throws a 'TS.InvalidTypeException' if the argument value of 'parameter' is 
    *               not a string at all.
    *               The exceptions message uses the 'paramName' and 'functionName' 
    *               in its message to signal which parameter failed the check and 
    *               which function received the invalid parameter.
    *
    *  @throws TS.ArgumentNullOrUndefinedException
    *  @throws TS.ArgumentNullUndefOrWhiteSpaceException
    *  @throws TS.InvalidTypeException
    */
    export function checkStringParameter(parameter: string, parameterName: string, functionName: string)
    {
      if (TS.Utils.TypeInfo.isNullOrUndefined(parameter))
      {
        throw new TS.ArgumentNullOrUndefinedException(parameterName, "Argument '" + parameterName + "' must not be null or undefined in function '" + functionName + "'.");
      }//END if

      if (TS.Utils.TypeInfo.isNullUndefOrWhiteSpace(parameter))
      {
        throw new TS.ArgumentNullUndefOrWhiteSpaceException(parameterName, "Argument '" + parameterName + "' must not be empty or whitespace in function '" + functionName + "'.");
      }
    }


    /**
    *  @throws TS.ArgumentNullOrUndefinedException
    *
    *  @throws TS.InvalidTypeException
    */
    export function checkUInt64NumberParameter(parameter: TS.TypeCode.UInt64, parameterName: string, functionName: string)
    {
      if (TS.Utils.TypeInfo.isNullOrUndefined(parameter))
      {
        throw new TS.ArgumentNullOrUndefinedException(parameterName, "Argument '" + parameterName + "' must not be null or undefined in function '" + functionName + "'.");
      }//END if


      if (TS.Utils.TypeInfo.isNullOrUndefined(parameter.MSInteger) || TS.Utils.TypeInfo.isNullOrUndefined(parameter.LSInteger))
      {
        throw new TS.InvalidTypeException("parameterName", parameter, "Argument '" + parameterName + "' must be a valid UInt64 number in function'" + functionName + "'.");
      }//END if
    }


    /**
    *  @description Takes a sparse array and returns a new created 
    *               dense array.
    *      
    *               Returns an empty array if it is 
    *               called with an invalid argument.
    */
    export function compactArray(sparseArray: Array<any>): Array<any>
    {
      if (!TS.Utils.TypeInfo.isArray(sparseArray))
      {
        return [];
      }//END if

      if (sparseArray.length == 0)
      {
        return [];
      }//END if

      return sparseArray.filter(function (element) { return element !== undefined && element != null; });
    }


    /**
    * @description Creates a version 4 random GUID which is returned
    *              as string in a canonical representation.
    *
    * @see {@link http://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_.28random.29 | Wikipedia }
    * @see {@ling http://www.ietf.org/rfc/rfc4122.txt | IETF }
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
    *  @throws TS.InvalidTypeException
    */
    export function getFunctionName(func: Function) : string 
    {
      var _returnString: string;
      var _regex: RegExp;
      var _resultArray: Array<string>;

      _returnString = null;
      _regex = new RegExp("function +(\\w*\\()", "i");

      if (!TS.Utils.TypeInfo.isFunction(func))
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
    *  @description Converts a HTMLCollection into an array
    *               of HTML elements and returns that array.
    *
    *  @throws TS.ArgumentNullException
    *  @throws TS.InvalidTypeException
    */
    export function HTMLCollectionToArray(collection): Array<HTMLElement>
    {
      var _index;
      var _resultArray;

      if (TS.Utils.TypeInfo.isNullOrUndefined(collection))
      {
        throw new TS.ArgumentNullException("collection", "Argument 'collection' must not be null in function 'HTMLCollectionToArray'.");
      }//END if

      if (TS.Utils.TypeInfo.isNullOrUndefined(collection.length))
      {
        throw new TS.InvalidTypeException("collection", collection, "Argument 'collection' has the wrong type in function 'HTMLCollectionToArray'.");
      }//END if

      _resultArray = new Array();

      for (_index = 0; _index < collection.length; _index++)
      {
        _resultArray.push(collection[_index]);
      }//END for

      return _resultArray;
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

      if (TS.Utils.TypeInfo.isNullOrUndefined(path))
      {
        return "";
      }//END if

      if (!TS.Utils.TypeInfo.isString(path))
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

      if (TS.Utils.TypeInfo.isNullUndefOrEmpty(fillChar))
      {
        return new String(source).toString();
      }//END if

      if (!TS.Utils.TypeInfo.isPositiveIntegerNumber(length))
      {
        return new String(source).toString();
      }//END if

      _fillString = fillChar;
      while (_fillString.length < length)
      {
        _fillString += _fillString;
      }//END while
      _fillString = _fillString.substr(0, length);

      if (TS.Utils.TypeInfo.isNullUndefOrEmpty(source))
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



  }//END module
}//END module 