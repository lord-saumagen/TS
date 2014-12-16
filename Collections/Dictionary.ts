module TS
{
  "use strict";


  export module Collections
  {

    //
    // Reference check
    //
    function referenceCheck(): void
    {
      var _missingArray: Array<string>;
      _missingArray = new Array<string>();


      if (typeof (TS.Exception) == "undefined")
      {
        _missingArray.push("TS.Exception");
      }

      if (typeof (TS.Linq) == "undefined")
      {
        _missingArray.push("TS.Linq");
      }//END if
      else
      {
        if (typeof (TS.Linq.ArrayEnumerator) == "undefined")
        {
          _missingArray.push("TS.Linq.ArrayEnumerator");
        }

        if (typeof (TS.Linq.CycleGenerator) == "undefined")
        {
          _missingArray.push("TS.Linq.CycleGenerator");
        }

        if (typeof (TS.Linq.EmptyEnumerableException) == "undefined")
        {
          _missingArray.push("TS.Linq.Exception");
        }

        if (typeof (TS.Linq.Enumerable) == "undefined")
        {
          _missingArray.push("TS.Linq.Enumerable");
        }

        if (typeof (TS.Linq.Enumerator) == "undefined")
        {
          _missingArray.push("TS.Linq.Enumerator");
        }

        if (typeof (TS.Linq.Extensions) == "undefined")
        {
          _missingArray.push("TS.Linq.Extensions");
        }

        if (typeof (TS.Linq.Grouping) == "undefined")
        {
          _missingArray.push("TS.Linq.Grouping");
        }

        if (typeof (TS.Linq.OrderedEnumerable) == "undefined")
        {
          _missingArray.push("TS.Linq.OrderedEnumerable");
        }

        if (typeof (TS.Linq.RandomGenerator) == "undefined")
        {
          _missingArray.push("TS.Linq.RandomGenerator");
        }
      }//END else

      if (typeof (TS.Collections.KeyValuePair) == "undefined")
      {
        _missingArray.push("TS.Collections.KeyValuePair");
      }

      if (typeof (TS.Collections.DuplicateKeyException) == "undefined")
      {
        _missingArray.push("TS.Collections.Exception");
      }

      if (typeof (TS.Utils) == "undefined")
      {
        _missingArray.push("TS.Utils");
      }//END if
      else
      {
        if (typeof (TS.Utils.TypeInfo) == "undefined")
        {
          _missingArray.push("TS.Utils.TypeInfo");
        }
      }//END else

      if (_missingArray.length > 0)
      {
        throw new Error("TS.Collections.Dictionary requires additional references to the following module(s) or class(es): " + _missingArray.join(", ") + ".");
      }//END if
    };


   /**
    *  @class
    *        
    *  @classdesc This class implements the IDictionary<TKey, TValue>
    *             interface and implements the .NET counterpart Dictionary<TKey, TValue>
    *             as far as possible in TypeScript.
    * 
    *  @see {@link http://msdn.microsoft.com/en-us/library/system.collections.ilist(v=vs.110).aspx | MSDN}
    */
    export class Dictionary<TKey, TValue> extends TS.Linq.Enumerable<KeyValuePair<TKey, TValue>> implements IDictionary<TKey, TValue>
    {
      private _dictionaryArray: Array<KeyValuePair<TKey, TValue>>;
      private _equalityComparer: (first: TKey, second: TKey) => boolean;

      /**
      * @description Returns all keys from the dictionary as an enumerable of type TS.Linq.Enumerable<TKey>
      */
      public get keys(): TS.Linq.Enumerable<TKey>
      {
        var _dictionaryArray: Array<TKey>;
        var _enumerator: TS.Linq.IEnumerator<KeyValuePair<TKey, TValue>>;
        var _callback: () => TS.Linq.IEnumerator<TKey>;

        _callback = () => 
        {
          _dictionaryArray = new Array<TKey>();
          _enumerator = this.getEnumerator();

          while (_enumerator.moveNext())
          {
            _dictionaryArray.push(_enumerator.current.key);
          }//END while
          return new TS.Linq.ArrayEnumerator(_dictionaryArray);
        }

        return new TS.Linq.Enumerable<TKey>(_callback);
      }


      /**
      * @description Returns all values from the dictionary as an enumerable of type TS.Linq.Enumerable<TValue>
      */
      public get values(): TS.Linq.Enumerable<TValue>
      {
        var _dictionaryArray: Array<TValue>;
        var _enumerator: TS.Linq.IEnumerator<KeyValuePair<TKey, TValue>>;
        var _callback: () => TS.Linq.IEnumerator<TValue>;

        _callback = () => 
        {
          _dictionaryArray = new Array<TValue>();
          _enumerator = this.getEnumerator();

          while (_enumerator.moveNext())
          {
            _dictionaryArray.push(_enumerator.current.value);
          }//END while
          return new TS.Linq.ArrayEnumerator(_dictionaryArray);
        }

        return new TS.Linq.Enumerable<TValue>(_callback);
      }


      /**
      * @constructs Initializes a new instance of the Dictionary<TKey, TValue> class that is empty 
      *             and uses the default equality comparer for the key type or the one specified 
      *             in argument 'equalityComparer'.
      *
      * @throws TS.InvalidTypeException
      * @throws TS.InvalidOperationException
      */
      constructor(equalityComparer?: (first: TKey, second: TKey) => boolean)
      {
        var _referenceCheck: () => void;
        _referenceCheck = referenceCheck;
        _referenceCheck();

        TS.Utils.checkConstructorCall(this, TS.Collections.Dictionary);
        

        if (!TS.Utils.TypeInfo.isNullOrUndefined(equalityComparer))
        {
          TS.Utils.checkFunctionParameter(equalityComparer, "equalityComparer", "constructor of TS.Collections.Dictionary");
          this._equalityComparer = equalityComparer;
        }//END if
        else
        {
          this._equalityComparer = (first, second) => first === second;
        }//END else
        super(() => new TS.Linq.ArrayEnumerator(this._dictionaryArray));
        this._dictionaryArray = new Array<KeyValuePair<TKey, TValue>>();
      }


      /**
      * @description Adds the specified KeyValuePair to the dictionary.
      *
      * @throws TS.ArgumentNullOrUndefinedException
      * @throws TS.InvalidTypeException
      * @throws TS.ArgumentUndefinedException
      * @throws TS.ArgumentNullException;
      * @throws TS.Collections.DuplicateKeyException
      */
      public add(item: KeyValuePair<TKey, TValue>): TS.Collections.ICollection<TS.Collections.KeyValuePair<TKey, TValue>>
      /**
      * @description Adds the specified key and value to the dictionary.
      *
      * @throws TS.ArgumentNullOrUndefinedException
      * @throws TS.ArgumentUndefinedException
      * @throws TS.ArgumentNullException;
      * @throws TS.Collections.DuplicateKeyException
      */
      public add(key: TKey, value: TValue): Dictionary<TKey, TValue>
      public add(): any
      {
        var _pair: KeyValuePair<TKey, TValue>;

        if (arguments.length == 2)
        {
          if (TS.Utils.TypeInfo.isNullOrUndefined(arguments[0]))
          {
            throw new TS.ArgumentNullOrUndefinedException("key", "The argument key must not be null or undefined in function 'TS.Collections.Dictionary.add'.");
          }//END if

          if (TS.Utils.TypeInfo.isUndefined(arguments[1]))
          {
            throw new TS.ArgumentUndefinedException("value", "The argument value must not be undefined in function 'TS.Collections.Dictionary.add'.");
          }//END if

          _pair = new KeyValuePair(arguments[0], arguments[1]);
        }//END if

        if (arguments.length == 1)
        {
          if (TS.Utils.TypeInfo.isUndefined(arguments[0]) || TS.Utils.TypeInfo.isUndefined(arguments[0].key) || TS.Utils.TypeInfo.isUndefined(arguments[0].value))
          {
            throw new TS.InvalidTypeException("item", arguments[0], "The value of parameter 'item' must be of type 'TS.Collections.KeyValuePair' in function 'TS.Collections.Dictionary.add'.");
          }//END if

          if (TS.Utils.TypeInfo.isNull(arguments[0].key))
          {
            throw new TS.ArgumentNullException("item.key", "The argument item.key must not be null in function 'TS.Collections.Dictionary.add'.");
          }//END if

          _pair = arguments[0];
        }//END if

        if (arguments.length == 0)
        {
          throw new TS.ArgumentNullOrUndefinedException("(key, value) or item", "The arguments must not be null or undefined in function 'TS.Collections.Dictionary.add'.");
        }//END if

        if (this.containsKey(_pair.key))
        {
          throw new TS.Collections.DuplicateKeyException();
        }//END if

        this._dictionaryArray.push(_pair);

        return this;
      }


      /**
      * @description Removes all keys and values from the Dictionary<TKey, TValue>.
      */
      public clear() : Dictionary<TKey, TValue>
      {
        this._dictionaryArray.length = 0;
        return this;
      }


      /**
      * @description Determines whether the Dictionary<TKey, TValue> contains the 
      *              specified key.
      */
      public containsKey(key: TKey): boolean
      {
        if (TS.Utils.TypeInfo.isNullOrUndefined(key))
        {
          return false;
        }//END if

        return this.keys.count(item => this._equalityComparer(key, item)) > 0;
      }


      /**
      * @description Determines whether the Dictionary<TKey, TValue> contains 
      *              a specific value.
      */
      public containsValue(value: TValue): boolean
      {
        if (TS.Utils.TypeInfo.isUndefined(value))
        {
          return false;
        }//END if

        return this.values.count(item => item === value) > 0;
      }


      /**
      * @description Copies the entire Dictionary<TKey, TValue> to a compatible one-dimensional array.
      *              of KeyValuePair<TKey, TValue> elements. If argument 'destIndex' is specified,
      *              copying will start at the specified index in the target array.
      *
      * @throws TS.ArgumentNullOrUndefinedException
      * @throws TS.ArgumentOutOfRangeException
      * @throws TS.InvalidTypeException
      */
      public copyTo(targetArray: Array<KeyValuePair<TKey, TValue>>, destIndex: number = 0): Dictionary<TKey, TValue>
      {
        var _index: number;

        TS.Utils.checkParameter(targetArray, "targetArray", "TS.Collections.Dictionary.copyTo");
        if (!TS.Utils.TypeInfo.isArray(targetArray))
        {
          throw new TS.InvalidTypeException("targetArray", targetArray, "Argument 'targetArray' must be a valid array in function 'TS.Collections.Dictionary.copyTo'.");
        }//END if

        TS.Utils.checkPositivIntegerNumberParameter(destIndex, "destIndex", "TS.Collections.Dictionary.copyTo");
        if (targetArray.length < destIndex)
        {
          throw new TS.ArgumentOutOfRangeException("targetArray.length", targetArray.length, "Target array was not long enough for the given 'destIndex' in function 'TS.Collections.Dictionary.copyTo'.");
        }//END if

        if (destIndex == 0)
        {
          targetArray.length = 0;
          this.forEach((item) => { targetArray.push(item); });
        }//END if
        else
        {
          this.forEach((item) => { targetArray[destIndex] = item; destIndex++; });
        }//END else

        return this;
      }


      /**
      * @description Returns the item  associated with the specified key or
      *              null if there is no match for the specified key.
      */
      public getItem(key: TKey): KeyValuePair<TKey, TValue>
      {
        if (this.containsKey(key))
        {
          return this.where(item => this._equalityComparer(key, item.key)).single();
        }//END if

        return null;
      }


      /**
      * @description Gets the value associated with the specified key or
      *              null if there is no match for the specified key.
      */
      public getValue(key: TKey): TValue
      {
        if (this.containsKey(key))
        {
          return this.getItem(key).value;
        }//END if

        return null;
      }


      /**
      * @description Returns the index of the item with the current key in the 
      *              internal array. Returns -1 if there is no match for the
      *              given key.
      */
      private indexOf(key: TKey): number
      {
        var _index: number;

        _index = -1;

        this._dictionaryArray.filter((value: KeyValuePair<TKey, TValue>, index: number, array: KeyValuePair<TKey, TValue>[]) => 
        {
          if (this._equalityComparer(key, value.key))
          {
            _index = index;
            return true;
          }//END if
          return false;
        });

        return _index;
      }


      /**
      * @description Creates a shallow copy of the current dictionary.
      *
      * @see {http://msdn.microsoft.com/en-us/library/system.object.memberwiseclone(v=vs.110).aspx | MSDN}
      */
      public memberwiseClone(): TS.Collections.Dictionary<TKey, TValue>
      {
        var _resultDict: Dictionary<TKey, TValue>;

        _resultDict = new Dictionary<TKey, TValue>();

        this.forEach((item) => 
        {
          _resultDict.add(new TS.Collections.KeyValuePair(item.key, item.value));
        });

        return _resultDict;
      }


      /**
      * @description Removes the specified KeyValuePair<TKey, TValue> from the Dictionary<TKey, TValue>.
      *              The functions fails silent for an attempt to remove an item which isn't contained
      *              in the dictionary.
      *              The function throws a 'TS.ArgumentNullOrUndefinedException' if the specified 
      *              item to remove is null or undefined.
      * @see {http://msdn.microsoft.com/en-us/library/kabs04ac(v=vs.110).aspx | MSDN}
      * @throws TS.ArgumentNullOrUndefinedException
      */
      public remove(item: TS.Collections.KeyValuePair<TKey, TValue>): TS.Collections.ICollection<TS.Collections.KeyValuePair<TKey, TValue>>
      /**
      * @description Removes the value with the specified key from the Dictionary<TKey, TValue>.
      *              The function fails silent if the dictionary doesn't contain an item with the
      *              specified key.
      *              The function throws a 'TS.ArgumentNullOrUndefinedException' if the specified 
      *              key is null or undefined.
      * @see {http://msdn.microsoft.com/en-us/library/kabs04ac(v=vs.110).aspx | MSDN}
      * @throws TS.ArgumentNullOrUndefinedException
      */
      public remove(key: TKey): Dictionary<TKey, TValue>
      public remove(): any
      {
        var _keyIndex: number;
        var _arg: any;
        var _key: TKey;

        _arg = arguments[0];

        if (TS.Utils.TypeInfo.isNullOrUndefined(_arg))
        {
          throw new TS.ArgumentNullOrUndefinedException("key or item", "Argument 'key or item' must not be null or undefined in function 'TS.Collections.Dictionary.remove'.");
        }//END if

        if (TS.Utils.TypeInfo.isUndefined(_arg.key))
        {
          TS.Utils.checkParameter(_arg, "key", "TS.Collections.Dictionary.remove");
          _key = _arg;
        }//END if
        else
        {
          TS.Utils.checkParameter(_arg, "item", "TS.Collections.Dictionary.remove");
          _key = _arg.key;
        }//END else

        _keyIndex = this.indexOf(_key);

        if (_keyIndex > -1)
        {
          this._dictionaryArray.splice(_keyIndex, 1);
        }//END if

        return this;
      }


      /**
      * @description Sets the value of argument 'newValue' to the item with the
      *              given key in the dictionary. Throws a 
      *              'TS.Collections.InvalidKeyException' if there is no item with
      *              the specified key contained in the dictionary.
      *
      * @throws TS.ArgumentNullOrUndefinedException
      * @throws TS.Collections.InvalidKeyException
      */
      public setItem(key: TKey, newValue: TValue): IDictionary<TKey, TValue>
      {
        var _index: number;
        var _item: KeyValuePair<TKey, TValue>;

        TS.Utils.checkParameter(key, "key", "TS.TypeCode.setItem");

        _index = this.indexOf(key);

        if (_index > -1)
        {
          this._dictionaryArray[_index] = new TS.Collections.KeyValuePair(key, newValue);
          return this;
        }//END if

        throw new TS.Collections.InvalidKeyException(key, "Execution failed because an item with the given key is not available in the current dictionary in function 'TS.Collections.Dictionary.setItem'.");
      }


    }//END class

  }//END module
}//END module
