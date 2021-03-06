﻿module TS
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
        throw new Error("TS.Linq.ArrayEnumerator requires additional references to the following module(s) or class(es): " + _missingArray.join(", ") + ".");
      }//END if

    })();


    /**
    * @class
    * @classdesc 
    *    This class is the implementation of 'IEnumerator<TSource>'
    *    for arrays of type T. 
    * @see
    *    TArrayEnumerable
    */
    export class ArrayEnumerator<TSource> implements IEnumerator<TSource>
    {

      private _dataArray: Array<TSource>;
      private _index: number;

      /**
      * @constructs
      * @param
      *    dataArray, a none null array of type TSource.
      * @throws
      *    TArgumentNullOrUndefinedException
      */
      constructor(dataArray: Array<TSource>)
      {
        if (TS.Utils.Assert.isNullOrUndefined(dataArray))
        {
          throw new TS.ArgumentNullOrUndefinedException("dataArray", "Argument 'dataArray' must not be null or undefined in the constructor or 'TArrayEnumerator'.");
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
        if (this._dataArray == null)
        {
          return false;
        }//END if

        if (this._index < this._dataArray.length - 1)
        {
          this._index++;
          return true;
        }//END if

        this.dispose();
        return false;
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