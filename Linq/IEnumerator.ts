module TS
{
  export module Linq
  {
    export interface IEnumerator<TSource>
    {
      current: TSource;
      moveNext: () => boolean;
      dispose: () => void;
    }//END interface
  }//END module
}//END module