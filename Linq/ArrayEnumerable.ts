module TS
{
  "use strict";

  export module Linq
  {

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

        super(() => { return new ArrayEnumerator(dataArray); });
      }

      /**
      * @description
      *    Implements interface IEnumerable<TSource>
      */
      public getEnumerator(): IEnumerator<TSource>
      {
        return super.getEnumerator();
      }

    }//END class
  }//END module
}//END module