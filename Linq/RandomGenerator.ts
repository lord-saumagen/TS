module TS
{
  "use strict";

  export module Linq
  {

    /**
    * @class
    * @classdesc 
    *    This class is the implementation of 'IEnumerator<TSource>'
    *    as a random generator.
    *    The generator selects a random element from
    *    the underlying dataArray as often as the 'moveNext'
    *    function is called. The selected element is accessable
    *    through the 'current' property.
    *    So the generator behaves much like a enumerator but
    *    will never run out or data.
    *
    * @see
    *    LinqExtensions.random
    */
    export class RandomGenerator<TSource> implements IEnumerator<TSource>
    {

      private _dataArray: Array<TSource>;
      private _current: TSource;
      private _index: number;

      /**
      * @constructs
      * @param
      *    dataArray, a none null array of type T.
      * @throws
      *    TArgumentNullOrUndefinedException
      */
      constructor(dataArray: Array<TSource>)
      {
        if (Utils.Assert.isNullOrUndefined(dataArray))
        {
          throw new ArgumentNullOrUndefinedException("dataArray", "Argument 'dataArray' must not be null or undefined in the constructor or 'RandomGenerator'.");
        }//END if
        this._dataArray = dataArray.slice(0, dataArray.length);
      }

      /**
      * @description
      *    Implements interface IEmumerator<TSource>
      */
      public get current(): TSource
      {
        return this._current;
      }

      /**
      * @description
      *    Implements interface IEmumerator<TSource>
      */
      public moveNext(): boolean
      {

        if (this._dataArray.length == 0)
        {
          return false;
        }//END if

        do
        {
          this._index = Math.floor(Math.random() * this._dataArray.length);
        } while (this._index >= this._dataArray.length);

        this._current = this._dataArray[this._index];
        return true;
      }

      /**
      * @description
      *    Implements interface IEmumerator<TSource>
      */
      public dispose()
      {
        this._dataArray = undefined;
      }
    }//END class
  }//END module
}//END module 
