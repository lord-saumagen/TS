module TS
{
  "use strict";

  export module TypeCode
  {
    export class List<T> implements IList<T>, TS.Linq.IEnumerable<T>
    {
      private _listArray: Array<T>;


      public get count(): number
      {
        return this._listArray.length;
      }


      constructor(array?: Array<T>)
      {
        if (!TS.Utils.TypeInfo.isNullOrUndefined(array))
        {
          if (TS.Utils.TypeInfo.isArray(array))
          {
            this._listArray = array.slice(0, array.length);
          }//END if
          else
          {
            throw new TS.InvalidTypeException("array", array, "Argument 'array' must be a valid array of type T in the constructor of 'TS.TypeCode.List'.");
          }//END else
        }//END if
        else
        {
          this._listArray = new Array<T>();
        }//END else
      }


      add(item: T): List<T>
      {
        this._listArray.push(item);
        return this;
      }

      clear(): List<T>
      {
        this._listArray = new Array<T>();
        return this;
      }


      contains(item: T): boolean
      {
        return this._listArray.some((value: T, index: number, array: T[]) =>
        {
          if (value === item)
          {
            return true;
          }//END if
          return false;
        });
      }


      copyTo(targetArray: Array<T>, index = 0): List<T>
      {
        targetArray = this._listArray.slice(index, this._listArray.length);
        return this;
      }


      getEnumerator(): TS.Linq.IEnumerator<T>
      {
        return new TS.Linq.ArrayEnumerator(this._listArray);
      }


      /**
      * @description
      *    Searches for the specified object and returns the zero - based 
      *    index of the first occurrence within the entire List<T>.
      *
      * @throws
      *    TS.ArgumentNullOrUndefinedException
      */
      indexOf(item: T): number
      /**
      * @description
      *    Searches for the specified object and returns the zero - based index of the first occurrence 
      *    within the range of elements in the List < T> that extends from the specified index to the last element.
      *
      * @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      * @throws
      *    TS.InvalidTypeException
      */
      indexOf(item: T, index: number): number
      
      indexOf(item: T, index: number = 0) : number
      {
        TS.Utils.checkParameter(item, "item", "TS.TypeCode.List.indexOf");
        TS.Utils.checkPositivIntegerNumberParameter(index, "index", "TS.TypeCode.List.indexOf");
        return this._listArray.indexOf(item, index);
        
      }


      insert(index: number, value: T) : List<T>
      {
        var _firstPartArray: Array<T>;
        var _secondPartArray: Array<T>;

        _firstPartArray = this._listArray.slice(0, index);
        _secondPartArray = this._listArray.slice(index, this._listArray.length);
        _firstPartArray.push(value);
        this._listArray = _firstPartArray.concat(_secondPartArray);
        return this;
      }


      /**
      * @description
      *    Removes the first occurrence of a specific object from the List<T>.
      */
      remove(value: T) : List<T>
      {
        var _index: number;

        if (TS.Utils.TypeInfo.isNullOrUndefined(value))
        {
          return this;
        }//END if

        _index = this.indexOf(value);

        if (_index < 0)
        {
          return this;
        }//END if

        this._listArray.splice(_index, 1);
        return this;
      }

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