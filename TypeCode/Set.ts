module TS
{
  "use strict";

  export module TypeCode
  {
    class Set<TSource>
    {
      private _setArray: Array<TSource>;
      private _equalityComparer: (first: TSource, second: TSource) => boolean;

      constructor(equalityComparer: (first: TSource, second: TSource) => boolean)
      {

        if (!TS.Utils.TypeInfo.isFunction(equalityComparer))
        {
          throw new TS.InvalidTypeException("equalityComparer", equalityComparer, "Argument '" + equalityComparer + "' must be a function parameter in the constructor of 'TS.Linq.Extensions.Set'.");
        }//END if

        this._setArray = new Array<TSource>();
        this._equalityComparer = equalityComparer;
      }

      public add(element: TSource): Boolean
      {
        if (!this.contains(element))
        {
          this._setArray.push(element);
          return true;
        }//END if

        return false;
      }

      public remove(element)
      {
        if (TS.Utils.TypeInfo.isNullOrUndefined(element))
        {
          throw new TS.ArgumentNullOrUndefinedException("element", "Argument 'element' must not be null or undefined in function 'TS.Linq.Extensions.Set.remove'.");
        }//END if

        this._setArray = this._setArray.filter((value, index, array): boolean =>
        {
          return !this._equalityComparer(value, element);
        });
      }

      public contains(element)
      {

        if (TS.Utils.TypeInfo.isNullOrUndefined(element))
        {
          throw new TS.ArgumentNullOrUndefinedException("element", "Argument 'element' must not be null or undefined in function 'TS.Linq.Extensions.Set.contains'.");
        }//END if

        return this._setArray.some((value, index, array): boolean =>
        {
          return this._equalityComparer(value, element);
        });

        return false;
      }

      public dispose()
      {
        this._setArray = undefined;
        this._equalityComparer = undefined;
      }
    }//END class

  }//END module
}//END module