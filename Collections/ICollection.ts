module TS
{
  "use strict";

  export module Collections
  {

    export interface ICollection<T>
    {
      add(item: T): ICollection<T>;
      clear(): ICollection<T>;
      contains(item: T): boolean;
      copyTo: (targetArray: Array<T>, index?: number) => ICollection<T>;
      remove(item: T): ICollection<T>;
      count(): number;
    }

  }//END module
}//END module       