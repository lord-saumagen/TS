module TS
{
  "use strict";

  export module Collections
  {


    export interface IList<T> extends TS.Collections.ICollection<T>
    {
      indexOf: (item: T) => number;
      insert: (index: number, value: T) => IList<T>;
      removeAt: (index: number) => IList<T>
      toArray: () => Array<T>;
    }

  }//END module
}//END module     