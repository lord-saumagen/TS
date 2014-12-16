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

      if (TS.Utils.TypeInfo == undefined)
      {
        _missingArray.push("TS.Utils.TypeInfo");
      }

      if (TS.Exception == undefined)
      {
        _missingArray.push("TS.Exception");
      }

      if (TS.Linq.ArrayEnumerator == undefined)
      {
        _missingArray.push("TS.Linq.ArrayEnumerator");
      }

      if (TS.Linq.Enumerable == undefined)
      {
        _missingArray.push("TS.Linq.Enumerable");
      }

      if (_missingArray.length > 0)
      {
        throw new Error("TS.Linq.ArrayEnumerable requires additional references to the following module(s) or class(es): " + _missingArray.join(", ") + ".");
      }//END if

    })();

    /**
    * @class
    * @classdesc 
    *    This class is an implementation of an enumerable type
    *    for arrays of type <TSource>. The class inherits from 
    *    the base class TEnumerable<TSource> all linq functions.
    */
    export class ArrayEnumerable<TSource> extends Enumerable<TSource>
    {

      constructor(dataArray: Array<TSource>)
      {
        if (Utils.TypeInfo.isNullOrUndefined(dataArray))
        {
          throw new ArgumentNullOrUndefinedException("dataArray", "Argument 'dataArray' must not be null or undefined in the constructor of 'TArrayEnumerable'.");
        }//END if

        super(() => { return new TS.Linq.ArrayEnumerator<TSource>(dataArray); });
      }

    }//END class
  }//END module
}//END module