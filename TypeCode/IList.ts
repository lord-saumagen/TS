module TS
{
  "use strict";

  export module TypeCode
  {
    export interface IList<T>
    {
      add: (item: T) => void;
      clear: () => void;
      contains: (item: T) => boolean;
      count: number;
      copyTo: (targetArray: Array<T>, index: number) => void;
      getEnumerator: () => TS.Linq.IEnumerator<T>;
      indexOf: (item: T) => number;
      insert: (index: number, value: T) => void;
      remove: (value: T) => void;
      removeAt: (index: number) => void;
    }

  }//END module
}//END module     