module TS
{
  export module Linq
  {
    export interface IEnumerable<TSource>
    {
      getEnumerator: () => IEnumerator<TSource>;
    }//END interface
  }//END module
}//END module