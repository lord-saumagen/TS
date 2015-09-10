/// <reference path="ilist.ts" />
module TS
{
  "use strict";


  export module Collections
  {

    //
    // Reference check
    //
    function referenceCheck()
    {
      var _missingArray: Array<string>;
      _missingArray = new Array<string>();


      if (typeof(TS.Exception) == "undefined")
      {
        _missingArray.push("TS.Exception");
      }

      if (typeof (TS.Linq) == "undefined")
      {
        _missingArray.push("TS.Linq");
      }//END if
      else
      {
        if (typeof (TS.Linq.CycleGenerator) == "undefined")
        {
          _missingArray.push("TS.Linq.CycleGenerator");
        }

        if (typeof (TS.Linq.EmptyEnumerableException) == "undefined")
        {
          _missingArray.push("TS.Linq.Exception");
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


      if (typeof (TS.Utils) == "undefined")
      {
        _missingArray.push("TS.Utils");
      }//END if
      else
      {
        if (typeof (TS.Utils.Assert) == "undefined")
        {
          _missingArray.push("TS.Utils.Assert");
        }
      }//END else

      if (_missingArray.length > 0)
      {
        throw new Error("TS.Collections.List requires additional references to the following module(s) or class(es): " + _missingArray.join(", ") + ".");
      }//END if
    };


    /**
    *  @class
    *        
    *  @classdesc This class subclasses the Enumerable<T> class and implements the 
    *             IList<T> interface which mimics the .NET counterpart as far 
    *             as possible in TypeScript.
    * 
    *  @see {@link http://msdn.microsoft.com/en-us/library/system.collections.ilist(v=vs.110).aspx | MSDN}
    */
    export class List<T> extends TS.Linq.Enumerable<T> implements IList<T>
    {
      private _listArray: Array<T>;
      private _allowNull: boolean;

     /**
      * @implements TS.Collections.IList.allowNull
      */
      public get allowNull(): boolean
      {
        return this._allowNull;
      }


      /**
      * @constructs Initializes a new instance of the List<T> class. If the 'array' argument is specified
      *             that list will contain the elements copied from the specified array.
      *             If the 'allowNull' argument is set to true, the list will allow null values as elements,
      *             otherwise each attempt to insert a null value will result in an exception.
      *             The default value for this argument is true. That means null values are
      *             accepted as elements.
      *
      * @throws TS.InvalidTypeException
      * @throws TS.InvalidOperationException
      */
      constructor(array?: Array<T>, allowNull : boolean = true)
      {
        var _referenceCheck: () => void;
        _referenceCheck = referenceCheck;
        _referenceCheck();

        TS.Utils.checkBooleanParameter(allowNull, "allowNull", "constructor of TS.Collections.List");
        TS.Utils.checkConstructorCall(this, TS.Collections.List);
        
        if (!TS.Utils.Assert.isNullOrUndefined(array))
        {
          if (TS.Utils.Assert.isArray(array))
          {
            if (!allowNull && (array.indexOf(null) > -1))
            {
              throw new TS.InvalidTypeException("array", array, "Argument 'array' contains a null value but this list is initialized with the 'allowNull' argument set to false. Change the 'allowNull' argument or improve the array used in the constructor of 'TS.Collections.List'.");
            }//
            this._listArray = array.slice(0, array.length);
          }//END if
          else
          {
            throw new TS.InvalidTypeException("array", array, "Argument 'array' must be a valid array of type T in the constructor of 'TS.Collections.List'.");
          }//END else
        }//END if
        else
        {
          this._listArray = new Array<T>();
        }//END else
        this._allowNull = allowNull;
        super(() => new TS.Linq.ArrayEnumerator<T>(this._listArray));
      }


      /**
      * @description Adds an object to the end of the List<T>.
      *
      * @implements TS.Collections.ICollection.add
      *
      * @throws TS.ArgumentUndefinedException
      * @throws TS.ArgumentNullOrUndefinedException
      */
      add(item: T): List<T>
      {
        if (this._allowNull)
        {
          TS.Utils.checkNotUndefinedParameter(item, "item", "TS.Collections.List.add");
        }//END if
        else
        {
          TS.Utils.checkParameter(item, "item", "TS.Collections.List.add");
        }//END else
        
        this._listArray.push(item);
        return this;
      }


      /**
      * @description Removes all elements from the List<T>.
      *
      * @implements TS.Collections.ICollection.clear
      */
      clear(): List<T>
      {
        
        this._listArray = new Array<T>();
        return this;
      }


      /**
      * @description Determines whether an element is in the List<T>.
      *
      * @implements TS.Collections.ICollection.contains
      */
      contains(item: T): boolean
      {
        if (this._allowNull)
        {
          if (TS.Utils.Assert.isUndefined(item))
          {
            return false;
          }//END if
        }//END if
        else
        {
          if (TS.Utils.Assert.isNullOrUndefined(item))
          {
            return false;
          }//END if
        }//END else

        return this._listArray.some((value: T, index: number, array: T[]) =>
        {
          if (value === item)
          {
            return true;
          }//END if
          return false;
        });
      }


      /**
      * @description Copies the entire List<T> to a compatible one-dimensional array.
      *              if argument 'destIndex' is specified, copying will start at the specified 
      *              index in the target array.
      *
      * @implements TS.Collections.ICollection.copyTo
      *
      * @throws TS.ArgumentNullOrUndefinedException
      * @throws TS.ArgumentOutOfRangeException
      * @throws TS.InvalidTypeException
      */
      copyTo(targetArray: Array<T>, destIndex = 0): List<T>
      {
        var _index: number;

        TS.Utils.checkParameter(targetArray, "targetArray", "TS.Collections.List.copyTo");
        if (!TS.Utils.Assert.isArray(targetArray))
        {
          throw new TS.InvalidTypeException("targetArray", targetArray, "Argument 'targetArray' must be a valid array in function 'TS.Collections.List.copyTo'."); 
        }//END if

        TS.Utils.checkUnsignedIntegerNumberParameter(destIndex, "destIndex", "TS.Collections.List.copyTo");
        if (targetArray.length < destIndex)
        {
         
          throw new TS.ArgumentOutOfRangeException("targetArray.length", targetArray.length, "Target array was not long enough for the given 'destIndex' in function 'TS.Collections.List.copyTo'."); 
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
      * @overwrite TS.Linq.Enumerable.fromArray
      */
      static fromArray(array:Array<any>): List<any>
      {
        return new TS.Collections.List(array);
      }


      /**
      * @description Searches for the specified object and returns the zero - based 
      *              index of the first occurrence within the entire List<T>.
      *              Returns -1 if there is no match for the given item.
      *
      * @implements TS.Collections.IList.indexOf
      *
      * @throws TS.ArgumentNullOrUndefinedException
      */
      indexOf(item: T): number
      /**
      * @description Searches for the specified object and returns the zero - based index of the first occurrence 
      *              within the range of elements in the List<T> that extends from the specified index to the last element.
      *              Returns -1 if there is no match for the given item.
      *
      * @implements TS.Collections.IList.indexOf
      *
      * @throws TS.ArgumentUndefinedException
      * @throws TS.InvalidTypeException
      */
      indexOf(item: T, index: number): number
      
      indexOf(item: T, index: number = 0) : number
      {
        if (this._allowNull)
        {
          TS.Utils.checkNotUndefinedParameter(item, "item", "TS.Collections.List.indexOf");
        }//END if
        else
        {
          TS.Utils.checkParameter(item, "item", "TS.Collections.List.indexOf");
        }//END else

        TS.Utils.checkUnsignedIntegerNumberParameter(index, "index", "TS.Collections.List.indexOf");
        return this._listArray.indexOf(item, index);      
      }


      /**
      * @descriptiong Inserts an element into the List<T> at the specified index.
      *
      * @implements TS.Collections.IList.insert
      *
      * @throws TS.ArgumentUndefinedException
      * @throws TS.InvalidTypeException
      * @throws TS.ArgumentOutOfRangeException
      */
      insert(index: number, item: T) : List<T>
      {
        var _firstPartArray: Array<T>;
        var _secondPartArray: Array<T>;

        TS.Utils.checkParameter(index, "index", "TS.Collections.List.insert");
        if (this._allowNull)
        {
          TS.Utils.checkNotUndefinedParameter(item, "item", "TS.Collections.List.insert");
        }//END if
        else
        {
          TS.Utils.checkParameter(item, "item", "TS.Collections.List.insert");
        }//END else

        TS.Utils.checkUnsignedIntegerNumberParameter(index, "index", "TS.Collections.List.insert");

        if (index > this.count())
        {
          throw new TS.ArgumentOutOfRangeException("index",index,"Index must be within the bounds of the List in function 'TS.Collections.List.insert'.")
        }//END if

        _firstPartArray = this._listArray.slice(0, index);
        _secondPartArray = this._listArray.slice(index, this._listArray.length);
        _firstPartArray.push(item);
        this._listArray = _firstPartArray.concat(_secondPartArray);

        return this;
      }


      /**
      * @description Removes the first occurrence of a specific object from the List<T>.
      *
      * @implements TS.Collections.ICollection.remove
      */
      remove(item: T) : List<T>
      {
        var _index: number;

        if (TS.Utils.Assert.isUndefined(item))
        {
          return this;
        }//END if

        _index = this.indexOf(item);

        if (_index < 0)
        {
          return this;
        }//END if

        this._listArray.splice(_index, 1);
        return this;
      }


      /**
      * @description Removes the element at the specified index of the List<T>.
      *
      * @implements TS.Collections.IList.removeAt
      */
      removeAt(index: number) : List<T>
      {
        if ((index < 0) || (index > this._listArray.length - 1))
        {
          return;
        }//END if

        this._listArray.splice(index, 1);
        return this;
      }


    }//END class
  }//END module
}//END module