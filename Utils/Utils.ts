module TS
{
  "use strict";

  export module Utils
  {

    /**
    *  @throws
    *    TS.ArgumentNullOrUndefinedException
    *
    *  @throws
    *    TS.InvalidTypeException
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
    *  @throws
    *    TS.ArgumentNullOrUndefinedException
    *
    *  @throws
    *    TS.InvalidTypeException
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
    *  @throws
    *    TS.ArgumentNullOrUndefinedException
    *
    *  @throws
    *    TS.InvalidTypeException
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
    *  @throws
    *    TS.ArgumentNullOrUndefinedException
    *
    *  @throws
    *    TS.ArgumentNullUndefOrWhiteSpaceException
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
    *  @description
    *    This function checks whether argument 'parameter' is a
    *    function or not.
    *    If not, a 'InvalidTypeException' is thrown.
    *    The exceptions message uses the 'paramName' and 'functionName'
    *    in its message to signal which parameter failed the check and 
    *    which function received the invalid parameter.
    *
    *  @throws
    *    TS.InvalidTypeException
    */
    export function checkFunctionParameter(parameter: any, paramName: string, functionName: string)
    {
      if (!TS.Utils.TypeInfo.isFunction(parameter))
      {
        throw new TS.InvalidTypeException(paramName, parameter, "Argument '" + paramName + "' must be a function parameter in function '" + functionName + "'.");
      }//END if
    }


    /**
    *  @description
    *    This function checks the argument 'parameter' against null and 
    *    undefined and throws a 'TS.ArgumentNullOrUndefinedException' if
    *    the argument is either null or undefined. 
    *    The exceptions message uses the 'paramName' and 'functionName' 
    *    in its message to signal which parameter failed the check and 
    *    which function received the invalid parameter.
    *
    *  @throws
    *    TS.ArgumentNullOrUndefinedException
    */
    export function checkParameter(parameter: any, paramName: string, functionName: string)
    {
      if (TS.Utils.TypeInfo.isNullOrUndefined(parameter))
      {
        throw new TS.ArgumentNullOrUndefinedException(paramName, "Argument '" + paramName + "' must not be null or undefinde in function '" + functionName + "'.");
      }//END if
    }


    /**
    *  @description
    *    This function checks the argument 'parameter' against null and 
    *    undefined and throws a 'TS.ArgumentNullOrUndefinedException' if
    *    the argument is either null or undefined. 
    *
    *    The function checks also the type of the argument which must evaluate
    *    to 'function' and checks whether the function is a constructor function.
    *    The function throws a 'TS.InvalidTypeException' if one of the two
    *    checks failed.
    *
    *  @throws
    *    TS.ArgumentNullOrUndefinedException
    *
    *  @throws
    *    TS.InvalidTypeException
    */
    export function checkConstructorParameter(parameter: any, paramName: string, functionName: string)
    {
      var _object: any;

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
      catch (Ex) { };

      if (TS.Utils.TypeInfo.isNullOrUndefined(_object))
      {
        throw new TS.InvalidTypeException(paramName, "Argument '" + paramName + "' must be a valid constructor function in function '" + functionName + "'.");
      }//END if
    }


    /**
    *  @description
    *    Takes a sparse array and returns a new created 
    *    dense array.
    *
    *    The function returns an empty array if it is 
    *    called with an invalid argument.
    *
    *  @param  sparseArray
    *    The sparse array to compact.
    *
    *  @returns  Array<any>
    *    A new created dense array as result or an
    *    empty array.
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
    * @description
    *    Creates a version 4 random GUID which is returned
    *    as string in a canonical representation.
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
    *  @description
    *    Converts a HTMLCollection into an array
    *    of HTML elements and returns that array.
    *
    *  @param  collection
    *    The HTML collection to convert.
    *
    *  @returns  Array<HTMLElement>
    *    The result array
    *
    *  @throws: TS.ArgumentNullException
    *    Is thrown if the value of argument 'collection' is null or undefined.
    *
    *  @throws: TS.InvalidTypeException
    *    Is thrown if the value of argument 'collection' has 
    *    the wrong type.
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
    * @description
    *    Takes the string from argument 'path' and
    *    returns a new string where every double backslash
    *    is substituted by a slash.
    *
    *    The function returns an empty string if
    *    it is called with an invalid argument.
    *
    * @param  path
    *    The path string to normalize.
    *
    * @returns  string
    *    The result string after normalization or
    *    an empty string.
    */
    export function normalizePath(path: string): string
    {
      var _returnPath: String;

      if (TS.Utils.TypeInfo.isNullUndefOrWhiteSpace(path))
      {
        return "";
      }//END if

      _returnPath = new String(path);

      while (_returnPath.indexOf("\\") > -1)
      {
        _returnPath = _returnPath.replace("\\", "/");
      }//END while

      return _returnPath.toString();
    }


    /**
    * @description 
    *    Returns a string which is padded with leading
    *    characters as define in argument 'fillChar'
    *    until the length defined in argument 'length'
    *    is reached.
    *
    *    The function returns a copy of the source string
    *    if the values of the arguments 'fillChar' or 
    *    'length' are invalid.
    *
    *    A copy of the 'source' string is also returned if
    *    the length of the source is greater or equal 
    *    the value of the 'length' parameter. The function
    *    doesn't return a truncated string.
    *
    *    The function returns a string consisting of
    *    a concatenation of 'fillChar' up to the length
    *    given in argument 'length' if the argument value
    *    of argument 'source' is invalid, null or empty.
    *
    * @param  source
    *    The string to fill.
    *
    * @returns  string
    *    The padded string as result.
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