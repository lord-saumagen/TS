module TS
{
  "use strict";

  export module Linq
  {
    enum EnumerationTypeEnum
    {
      undefined,
      normal,
      partitioned
    }

    /**
    * @class
    * @classdesc 
    *    This is an extension of the base class 'Enumerable<TSource>'
    *    which is the return type of the 'orderBy..' and
    *    'thenBy..' functions which support partitioned 
    *    enumerables.
    */
    export class OrderedEnumerable<TSource> extends Enumerable<TSource> implements IOrderedEnumerable<TSource>
    {
      private _comparer: (firt: TSource, second: TSource) => any;
      private _selector: (item: TSource) => any;
      private _enumerationType: EnumerationTypeEnum;
      private _lastItem: TSource;
      private _bufferArray: Array<TSource>;
      private _internalEnumerator: IEnumerator<TSource>;



      /**
      * @description
      *    Overrides the inherrited 'getEnumerator' from base type
      *    Enumerable.
      */
      public getEnumerator(): IEnumerator<TSource>
      {
        if (this._enumerationType == EnumerationTypeEnum.undefined)
        {
          this._enumerationType = EnumerationTypeEnum.normal;
        }//END if

        if (this._enumerationType == EnumerationTypeEnum.normal)
        {
          return super.getEnumerator();
        }//END if

        return null;
      }

      /**
      * @description
      *    Implements interface IOrderedEnumerable<TSource>
      */
      public getPartitionEnumerator(): IEnumerator<TSource>
      {

        if (this._enumerationType == EnumerationTypeEnum.undefined)
        {
          this._enumerationType = EnumerationTypeEnum.partitioned;
          this._internalEnumerator = super.getEnumerator();
        }//END if

        if (this._enumerationType == EnumerationTypeEnum.partitioned)
        {
          this._bufferArray = new Array<TSource>();

          if (this._lastItem != null)
          {
            this._bufferArray.push(this._lastItem);
            this._lastItem = null;
          }//END if

          while (this._internalEnumerator.moveNext())
          {
            if (this._bufferArray.length == 0)
            {
              this._bufferArray.push(this._internalEnumerator.current);
            }//END if
            else
            {
              if (this._comparer(this._selector(this._bufferArray[this._bufferArray.length - 1]), this._selector(this._internalEnumerator.current)) == 0)
              {
                this._bufferArray.push(this._internalEnumerator.current);
              }//END if
              else
              {
                this._lastItem = this._internalEnumerator.current;
                break;
              }//END if
            }//END else
          }//END while


          if (this._bufferArray.length > 0)
          {
            return new Enumerator(() => new ArrayEnumerator(this._bufferArray));
          }//END if
        }//END if

        return null;
      }


      constructor(callback: () => IEnumerator<TSource>, selector: <TKey>(item: TSource) => TKey, comparer: <TKey>(first: TKey, second: TKey) => number)
      {
        if (Utils.TypeInfo.isNullOrUndefined(callback))
        {
          throw new ArgumentNullOrUndefinedException("callback", "Argument 'callback' must not be null or undefined in the constructor of 'OrderedEnumerable'.");
        }//END if

        if (Utils.TypeInfo.isNullOrUndefined(selector))
        {
          throw new ArgumentNullOrUndefinedException("selector", "Argument 'selector' must not be null or undefined in the constructor of 'OrderedEnumerable'.");
        }//END if

        if (Utils.TypeInfo.isNullOrUndefined(comparer))
        {
          throw new ArgumentNullOrUndefinedException("comparer", "Argument 'comparer' must not be null or undefined in the constructor of 'OrderedEnumerable'.");
        }//END if


        super(callback);
        this._selector = selector;
        this._comparer = comparer;
        this._enumerationType = EnumerationTypeEnum.undefined;
        this._lastItem = null;
        this._bufferArray = new Array<TSource>();
      }


      /**
      *  @description
      *    Performs a subsequent ordering of the elements in a sequence in ascending order.
      *
      *    Deferred execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.thenby.aspx | MSDN}
      *
      *  @returns
      *    OrderedEnumerable<TSource>, the resulting ordered enumerable.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException
      */
      public thenBy<TKey>(selector: (item: TSource) => TKey, comparer?: (first: TKey, second: TKey) => number): OrderedEnumerable<TSource>
      {
        return Extensions.thenBy(this, selector, comparer);
      }


      /**
      *  @description
      *    Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
      *
      *    Deferred execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.thenbydescending.aspx | MSDN}
      *
      *  @returns
      *    OrderedEnumerable<TSource>, the resulting ordered enumerable.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException
      */
      public thenByDescending<TKey>(selector: (item: TSource) => TKey, comparer?: (first: TKey, second: TKey) => number): OrderedEnumerable<TSource>
      {
        return Extensions.thenByDescending(this, selector, comparer);
      }


    }//END class
  }//END module
}//END module