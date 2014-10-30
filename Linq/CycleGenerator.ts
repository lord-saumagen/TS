module TS
{
  "use strict";

  export module Linq
  {

    /**
    * @class
    * @classdesc 
    *    This class is the implementation of 'IEnumerator<TSource>'
    *    as a cycle generator.
    *    The generator selects all elements from the 
    *    underlying dataArray and starts over from the 
    *    beginning if the end of the array was reached.
    *    So the generator behaves much like a enumerator but
    *    will never run out or data.
    *
    * @see
    *    LinqExtensions.random
    */
    export class CycleGenerator<TSource> implements IEnumerator<TSource>
    {

      private _dataArray: Array<TSource>;
      private _index: number;

      /**
      * @constructs
      * @param
      *    dataArray, a none null array of type TSource.
      *
      * @throws
      *    ArgumentNullOrUndefinedException
      */
      constructor(dataArray: Array<TSource>)
      {
        if (Utils.TypeInfo.isNullOrUndefined(dataArray))
        {
          throw new ArgumentNullOrUndefinedException("dataArray", "Argument 'dataArray' must not be null or undefined in the constructor of 'CycleGenerator'.");
        }//END if
        this._dataArray = dataArray.slice(0, dataArray.length);
        this._index = -1;
      }

      /**
      * @description
      *    Implements interface IEmumerator<TSource>
      */
      public get current(): TSource
      {
        if (this._dataArray != null && this._index > -1)
        {
          return this._dataArray[this._index];
        }//END if
        return undefined;
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

        if (this._index < this._dataArray.length)
        {
          this._index++;

          //
          // New cycle
          //
          if (this._index == this._dataArray.length)
          {
            this._index = 0;
          }//END if

        }//END if

        return true;
      }

      /**
      * @description
      *    Implements interface IEmumerator<TSource>
      */
      public dispose()
      {
        this._dataArray = undefined;
        this._index = -1;
      }
    }//END class
  }//END module
}//END module