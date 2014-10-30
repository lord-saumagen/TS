module TS
{
  "use strict";

  export module Utils
  {

    /**
    *  @class
    *  @classdesc 
    */
    export class NameValue
    {
      private _name: string;
      private _value: any;

      get name(): string
      {
        return this._name;
      }

      get value(): any
      {
        return this._value;
      }

      /**
      *  @constructs
      *  @Throws: TS.ArgumentNullUndefOrWhiteSpaceException
      */
      constructor(name: string, value: any)
      {
        if (TS.Utils.TypeInfo.isNullUndefOrWhiteSpace(name))
        {
          throw new TS.ArgumentNullUndefOrWhiteSpaceException("name", "Argument 'name' must not be null, undefined or whitespace in the constructor of 'TS.Utils.NameValue'.");
        }//END if
        this._name = name;
        this._value = value;
      }
    }

    /**
    *  @class
    *  @classdesc 
    *    A collection of functions which help to compare those javascript
    *    objects which give meaningless results if compared by the 
    *    default javascript comparators '==' and '==='.
    */
    export class Compare
    {

      /**
      *  @description
      *    Compares the two objects given in the arguments
      *    'first' and 'second' up to the hierarchy level given in 
      *    argument 'depth'.
      *    That means, all elements which are objects by themself and all
      *    array elements which reference other objects or arrays are
      *    compared recursively until either the end of the hierarchy 
      *    or the depth threshold is reached.
      *    Objects or arrays in the hierarchy which are cut off by the
      *    depth threshold are considered equal. 
      *
      *  @see
      *    'TS.Utils.Compare.arrays'.
      *
      *  @param  first
      *    The first object to compare against the second.
      *
      *  @parem: second
      *    The second object to compare.
      *
      *  @returns
      *    Boolean, true if the arrays are considered equal, otherwise false.
      *    The function returns also false if one of the arguments isn't
      *    an object at all. 
      */
      public static objects(first: any, second: any, depth: number = 0): boolean
      {
        var _index: number;
        var _firstKeyValueArray: Array<NameValue>;
        var _secondKeyValueArray: Array<NameValue>;

        if (!TS.Utils.TypeInfo.isObject(first) || !TS.Utils.TypeInfo.isObject(second))
        {
          return false;
        }//END if

        _firstKeyValueArray = createKeyValueArray(first);
        _secondKeyValueArray = createKeyValueArray(second);

        if (_firstKeyValueArray.length != _secondKeyValueArray.length)
        {
          return false;
        }//END if

        _firstKeyValueArray = sortNameValueArray(_firstKeyValueArray);
        _secondKeyValueArray = sortNameValueArray(_secondKeyValueArray);

        for (_index = 0; _index < _firstKeyValueArray.length; _index++)
        {
          if (_firstKeyValueArray[_index].name != _secondKeyValueArray[_index].name)
          {
            return false;
          }//END if

          if (!compareAny(_firstKeyValueArray[_index].value, _secondKeyValueArray[_index].value, depth))
          {
            return false;
          }//END if
        }//END for

        return true;
      }


      /**
      *  @description
      *    Compares the two regular expressions given in the arguments
      *    'first' and 'second'.
      *
      *  @param  first
      *    The first regular expression to compare against the second.
      *
      *  @parem: second
      *    The second regular expression to compare.
      *
      *  @returns
      *    Boolean, true if the regular expression are considered equal, otherwise false.
      *    The function returns also false if one of the arguments isn't
      *    a regular expression at all. 
      */
      public static regularExpressions(first: any, second: any): boolean
      {

        if (!TS.Utils.TypeInfo.isRegEx(first) || !TS.Utils.TypeInfo.isRegEx(second))
        {
          return false;
        }//END if

        // the regex itself
        return first.source === second.source &&

          // and its modifiers
          first.global === second.global &&

          // (gmi) ...
          first.ignoreCase === second.ignoreCase &&
          first.multiline === second.multiline &&
          first.sticky === second.sticky;
      }


      /**
      *  @description
      *    Compares the two functions given in the arguments
      *    'first' and 'second'.
      *
      *  @param  first
      *    The first function to compare against the second.
      *
      *  @parem: second
      *    The second function to compare.
      *
      *  @returns
      *    Boolean, true if the functions are considered equal, otherwise false.
      *    The function returns also false if one of the arguments isn't
      *    a function at all. 
      */
      public static functions(first: any, second: any): boolean
      {
        if (!TS.Utils.TypeInfo.isFunction(first) || !TS.Utils.TypeInfo.isFunction(second))
        {
          return false;
        }//END if

        if ((<Function> first).length != (<Function> second).length)
        {
          return false;
        }//END if

        if (first.toString() != second.toString())
        {
          return false;
        }//END if

        return true;
      }


      /**
      *  @description
      *    Compares the two arrays given in the arguments
      *    'first' and 'second' up to the hierarchy level given in 
      *    argument 'depth'.
      *    That means, all elements which are arrays by themself and all
      *    object elements which reference other objects or arrays are
      *    compared recursively until either the end of the hierarchy 
      *    or the depth threshold is reached.
      *    Objects or arrays in the hierarchy which are cut off by the
      *    depth threshold are considered equal. 
      *
      *  @see
      *    'TS.Utils.Compare.objects'.
      *
      *  @param  first
      *    The first array to compare against the second.
      *
      *  @parem: second
      *    The second array to compare.
      *
      *  @returns
      *    Boolean, true if the arrays are considered equal, otherwise false.
      *    The function returns also false if one of the arguments isn't
      *    an array at all. 
      */
      public static arrays(first: any, second: any, depth: number = 0): boolean
      {
        var _index: number;
        var _firstArray: Array<any>;
        var _secondArray: Array<any>;

        if (!TS.Utils.TypeInfo.isArray(first) || !TS.Utils.TypeInfo.isArray(second))
        {
          return false;
        }//END if

        _firstArray = TS.Utils.compactArray(first);
        _secondArray = TS.Utils.compactArray(second);

        if (_firstArray.length != _secondArray.length)
        {
          return false;
        }//END if

        _firstArray = sortArray(_firstArray);
        _secondArray = sortArray(_secondArray);

        for (_index = 0; _index < _firstArray.length; _index++)
        {
          if (!compareAny(_firstArray[_index], _secondArray[_index], depth))
          {
            return false;
          }//END if
        }//END for

        return true;
      }


    }//END class


    /**
    *  @Throws
    *    TS.InvalidOperationException
    */
    function compareAny(first: any, second: any, depth: number = 0): boolean
    {
      var _firstType: TypeEnum;
      var _secondType: TypeEnum;

      _firstType = TS.Utils.TypeInfo.getType(first);
      _secondType = TS.Utils.TypeInfo.getType(second);

      //
      //Not the same type, so the elements can't be equal.
      //
      if (_firstType != _secondType)
      {
        return false;
      }//END if

      switch (_firstType)
      {
        case TypeEnum.ARRAY:
          {
            if ((depth - 1) >= 0)
            {
              return Compare.arrays(first, second, depth - 1);
            }//END if

            //
            //Pretend the subsequent objects are equal if 
            //the function reached the depth threshold.
            //
            return true;
          }
        case TypeEnum.BOOLEAN_OBJECT:
        case TypeEnum.NUMBER_OBJECT:
        case TypeEnum.STRING_OBJECT:
          {
            return first.valueOf() === second.valueOf();
          }
        case TypeEnum.OBJECT:
          {
            if ((depth - 1) >= 0)
            {
              return Compare.objects(first, second, depth - 1);
            }//END if

            //
            //Pretend the subsequent objects are equal if 
            //the function reached the depth threshold.
            //
            return true;
          }
        case TypeEnum.REGEX:
          {
            return Compare.regularExpressions(first, second);
          }
        case TypeEnum.DATE:
          {
            return first.valueOf() === second.valueOf();
          }
        case TypeEnum.NULL:
        case TypeEnum.UNDEFINED:
        case TypeEnum.NAN:
          {
            return true;
          }
        case TypeEnum.BOOLEAN_VALUE:
        case TypeEnum.NUMBER_VALUE:
        case TypeEnum.STRING_VALUE:
          {
            return first === second;
          }
        case TypeEnum.FUNCTION:
          {
            return Compare.functions(first, second);
          }
        defaul:
          {
            throw new TS.InvalidOperationException("The function 'TS.Utils.Compare.any' failed for the arguments of type: '" + typeof (first) + "'. There is no comparator defined for that type.");
          }
      }//END switch
    }

    /**
    *  @description
    *    This function sorts the array given in argument 
    *    'arr' in a very particular way and returns a new
    *    created sorted array. 
    *    The sort algorithm works like this:
    *    
    *      1. All objects are moved to the first positions
    *         of the result array if there are any.
    *         They are sorted by their interface key.
    *  
    *      2. All arrays are moved to the postitions behind
    *         the objects if there are any. 
    *         They are sorted by their length.
    *  
    *      3. All other elements are behind that two blocks
    *         and are sorted by the default array sort 
    *         algorithm.
    *  
    *    That sort algorithm is used in the 'Compare.arrays' 
    *    function and has no meaning out of that context.
    *
    *  @Throws
    *    TS.ArgumentNullOrUndefinedException
    *
    *  @Throws
    *    TS.InvalidTypeException
    */
    function sortArray(arr: Array<any>): Array<any>
    {
      var _objArray: Array<any>;
      var _arrArray: Array<any>;
      var _resultArray: Array<any>;
      var _index: number;

      if (TS.Utils.TypeInfo.isNullOrUndefined(arr))
      {
        throw new TS.ArgumentNullOrUndefinedException("arr", "Argument 'arr' must not be null or undefined in function 'TS.Utils.Compare.sortArray'.");
      }//END if

      if (!TS.Utils.TypeInfo.isArray(arr))
      {
        throw new TS.InvalidTypeException("arr", arr, "Argument 'arr' must be an array in function 'TS.Utils.Compare.sortArray'.");
      }//END if

      _objArray = new Array<any>();
      _arrArray = new Array<any>();
      _resultArray = new Array<any>();

      for (_index = 0; _index < arr.length; _index++)
      {
        if (TS.Utils.TypeInfo.isObject(arr[_index]))
        {
          _objArray.push(arr[_index]);
          continue;
        }//END if

        if (TS.Utils.TypeInfo.isArray(arr[_index]))
        {
          _arrArray.push(arr[_index]);
          continue;
        }//END if

        _resultArray.push(arr[_index]);
      }//END for

      if (_objArray.length > 1)
      {
        //
        //Sort the elements by their interface hash.
        //
        _objArray = _objArray.sort((firstElement: Object, secondElement: Object) => 
        {
          var _firstElementHash: string;
          var _secondElementHast: string;

          _firstElementHash = createObjInterfaceHash(firstElement);
          _secondElementHast = createObjInterfaceHash(secondElement);

          if (_firstElementHash == _secondElementHast)
          {
            return 0;
          }//END if

          if (_firstElementHash > _secondElementHast)
          {
            return 1;
          }//END if

          return -1;
        });
      }//END if

      if (_arrArray.length > 1)
      {
        //
        //Sort the elements by their length.
        //
        _arrArray = _arrArray.sort((firstElement: Array<any>, secondElement: Array<any>) =>
        {
          if (firstElement.length == secondElement.length)
          {
            return 0;
          }//END if

          if (firstElement.length > secondElement.length)
          {
            return 1;
          }//END if

          return -1;
        });
      }//END if

      _resultArray = _resultArray.sort();
      _resultArray = Array.prototype.concat(_objArray, _arrArray, _resultArray);
      return _resultArray;
    }


    /**
    *  @description
    *    Crates a hash from the object interface. The hash
    *    is the sorted list of object keys (the interface) 
    *    joint to one string.
    *
    *  @Throws
    *    TS.ArgumentNullOrUndefinedException
    *
    *  @Throws
    *    TS.InvalidTypeException
    */
    function createObjInterfaceHash(obj: Object): string
    {
      var _keyArray: Array<string>;

      if (TS.Utils.TypeInfo.isNullOrUndefined(obj))
      {
        throw new TS.ArgumentNullOrUndefinedException("obj", "Argument 'arr' must not be null or undefined in function 'TS.Utils.Compare.crateObjHash'.");
      }//END if

      if (!TS.Utils.TypeInfo.isObject(obj))
      {
        throw new TS.InvalidTypeException("obj", obj, "Argument 'obj' must be of type 'Object' in function 'TS.Utils.Compare.crateObjHash'.");
      }//END if


      _keyArray = Object.keys(obj);
      _keyArray = _keyArray.sort();

      return _keyArray.join();
    }



    /**
    *  @description
    *    Sorts a 'NameValue' array by it's name and returns 
    *    a new created and sorted 'NameValue' array.
    *   
    *  @Throws
    *    TS.ArgumentNullOrUndefinedException
    */
    function sortNameValueArray(arr: Array<NameValue>): Array<NameValue>
    {
      var _resultArray: Array<NameValue>;

      if (TS.Utils.TypeInfo.isNullOrUndefined(arr))
      {
        throw new TS.ArgumentNullOrUndefinedException("arr", "Argument 'arr' must not be null or undefined in function 'TS.Utils.Compare.SortKeyValueArray'.");
      }//END if

      _resultArray = arr.sort((firstItem: NameValue, secondItem: NameValue) =>
      {
        if (firstItem.name == secondItem.name)
        {
          return 0;
        }//END if

        if (firstItem.name > secondItem.name)
        {
          return 1;
        }//END if

        return -1;
      });

      return _resultArray;
    }

    /**
    *  @Throws
    *    TS.ArgumentNullOrUndefinedException
    */
    function createKeyValueArray(obj: any): Array<NameValue>
    {
      var _key: string;
      var _returnArray: Array<NameValue>;

      if (TS.Utils.TypeInfo.isNullOrUndefined(obj))
      {
        throw new TS.ArgumentNullOrUndefinedException("obj", "Argument 'obj' must not be null or undefined in function 'TS.Utils.Compare.CreateKeyValueArray'.");
      }//END if

      _returnArray = new Array<NameValue>();

      for (_key in obj)
      {
        _returnArray.push(new NameValue(_key, obj[_key]));
      }//END for

      return _returnArray;
    }

  }//END module
}//END module 