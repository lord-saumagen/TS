module TS
{
  export module Linq
  {
    export interface IOrderedEnumerable<TSource>
    {
      getPartitionEnumerator: () => TS.Linq.IEnumerator<TSource>
    }//END interface
  }//END module
}//END module