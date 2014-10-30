module TS
{
  "use strict";

  export module Utils
  {

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
    *  @description
    *    Takes a sparse array and returns a new created 
    *    dense array.
    *
    *    The function returns an empty array if it is 
    *    called with an invalid argument.
    *
    *  @param  arr
    *    The sparse array to compact.
    *
    *  @returns  Array<any>
    *    A new created dense array as result or an
    *    empty array.
    */
    export function compactArray(arr: Array<any>): Array<any>
    {
      if (!TS.Utils.TypeInfo.isArray(arr))
      {
        return [];
      }//END if

      if (arr.length == 0)
      {
        return [];
      }//END if

      return arr.filter(function (element) { return element !== undefined && element != null; });
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
    *    the value of the 'length' parameter.
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
    export function fillLeft(source: string, fillChar: string, length: number) : string
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
    *    The function walks the prototype chain of the
    *    object given in argument 'obj' and collects all
    *    distinct key in that chain and of the object 
    *    itself. The collection is returned as an array
    *    of strings.
    *
    *  @param  obj
    *    The object from which the keys of the prototpye
    *    chain gets collected.
    *
    *  @returns  Array<string>
    *    The result array which holds all distinct keys 
    *    from the prototype chain.
    *
    *  @throws: TS.ArgumentNullException
    *    Is thrown if the value of argument 'obj' is null or undefined.
    *
    *  @throws: TS.InvalidTypeException
    *    Is thrown if the value of argument 'obj' is 
    *    not an object.
    */
    export function getPrototypeChainKeys(obj: any) : Array<string>
    {
      var _resultArray: Array<string>;
      var _duplicateDeleteArray: Array<number>;
      var _index: number;
      var _key: string;


      if (TS.Utils.TypeInfo.isNullOrUndefined(obj))
      {
        throw new TS.ArgumentNullException("obj", "Argument 'obj' must not be null in function 'getPrototypeChainKeys'.");
      }//END if

      if (!TS.Utils.TypeInfo.isObject(obj))
      {
        throw new TS.InvalidTypeException("obj", obj, "Argument 'obj' must be of type 'object' in function 'getPrototypeChainKeys'.");
      }//END if

      _resultArray = new Array<string>();

      if (Object.getPrototypeOf(obj) != null)
      {
        _resultArray = _resultArray.concat(Utils.getPrototypeChainKeys(Object.getPrototypeOf(obj)));
      }//END if

      for (_key in obj)
      {
        _resultArray.push(_key);
      }//END for

      _resultArray = _resultArray.sort();

      if (_resultArray.length < 2)
      {
        return _resultArray;
      }//END if

      _duplicateDeleteArray = new Array<number>();

      for (_index = 0; _index < _resultArray.length - 1; _index++)
      {
        if (_resultArray[_index] == _resultArray[_index + 1])
        {
          _duplicateDeleteArray.push(_index);
        }//END if
      }//END if

      for (_index = 0; _index < _duplicateDeleteArray.length; _index++)
      {
        delete _resultArray[_duplicateDeleteArray[_index]];
      }//END for

      _resultArray = TS.Utils.compactArray(_resultArray);
      return _resultArray;
    }
  }//END module

}//END module 