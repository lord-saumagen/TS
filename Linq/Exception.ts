module TS
{
  "use strict";

  export module Linq
  {

    export class SelectorException extends TS.Exception
    {
      private _selector: (item) => any;
      private _value: any;

      /**
      * @overwrite
      */
      get type(): string
      {
        return "TS.Linq.SelectorException";
      }

      get selector(): (item) => Enumerable<any>
      {
        return this._selector;
      }

      get value(): any
      {
        return this._value;
      }

      /**
      *  @constructs
      */
      constructor(selector: (item) => Enumerable<any>, value: any, message?: string, innerException?: TS.Exception)
      constructor(selector: (item) => Array<any>, value: any, message?: string, innerException?: TS.Exception)
      constructor(selector: (item) => any, value: any, message?: string, innerException?: TS.Exception)
      constructor(selector: any, value: any, message?: string, innerException?: TS.Exception)
      {
        super(message, innerException);
        this._selector = selector;
        this._value = value;
      }
    }//END class

    export class EmptyEnumerableException extends TS.Exception
    {
      private _enumerable: Enumerable<any>;

      /**
      * @overwrite
      */
      get type(): string
      {
        return "TS.Linq.EmptyEnumerableException";
      }

      get enumerable(): Enumerable<any>
      {
        return this._enumerable;
      }

      /**
      *  @constructs
      */
      constructor(enumerable: Enumerable<any>, message?: string, innerException?: TS.Exception)
      {
        super(message, innerException);
        this._enumerable = enumerable;
      }

    }//END class

  }//END module

}//END module