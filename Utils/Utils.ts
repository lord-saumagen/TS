module TS
{
  "use strict";

  export module Utils
  {

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
    * @description 
    *    Returns a string which is filled with leading
    *    characters as define in argument 'fillChar'
    *    until the length define in argument 'length'
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
    *    The filled string as result.
    */
    export function fillLeft(source: string, fillChar: string, length: number): string
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


  }//END module
}//END module 