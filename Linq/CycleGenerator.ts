﻿/// <reference path="ienumerator.ts" />
module TS
{
  "use strict";

  export module Linq
  {

    //
    // Reference check
    //
    (function ()
    {
      var _missingArray: Array<string>;
      _missingArray = new Array<string>();

      if (TS.Utils == undefined)
      {
        _missingArray.push("TS.Utils");
      }

      if (TS.Utils.Assert == undefined)
      {
        _missingArray.push("TS.Utils.Assert");
      }

      if (TS.Exception == undefined)
      {
        _missingArray.push("TS.Exception");
      }

      if (_missingArray.length > 0)
      {
        throw new Error("TS.Linq.CycleGenerator requires additional references to the following module(s) or class(es): " + _missingArray.join(", ") + ".");
      }//END if

    })();

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
        if (Utils.Assert.isNullOrUndefined(dataArray))
        {
          throw new TS.ArgumentNullOrUndefinedException("dataArray", "Argument 'dataArray' must not be null or undefined in the constructor of 'CycleGenerator'.");
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