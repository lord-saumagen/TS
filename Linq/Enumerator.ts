module TS
{
  "use strict";

  export module Linq
  {

    export class Enumerator<TSource> implements IEnumerator<TSource>
    {
      private _callback: () => IEnumerator<TSource>;
      private _enumerator: IEnumerator<TSource>;

      constructor(callback: () => IEnumerator<TSource>)
      {
        if (Utils.TypeInfo.isNullOrUndefined(callback))
        {
          throw new TS.ArgumentNullOrUndefinedException("callback", "Argument 'callback' must not be null or undefined in the constructor of 'TEnumerable'.");
        }//END if

        this._callback = callback;
        this._enumerator = undefined;
      }

      /**
      * @description
      *    Implements interface IEmumerator<TSource>
      */
      public get current(): TSource
      {
        if (this._enumerator != null)
        {
          return this._enumerator.current;
        }//END if

        return undefined;

      }

      /**
      * @description
      *    Implements interface IEmumerator<TSource>
      */
      public moveNext(): boolean
      {

        if (this._enumerator == null)
        {

          if (this._callback == null)
          {
            return false;
          }//END if
          else
          {
            this._enumerator = this._callback();
          }//END else

        }//END if


        if (this._enumerator.moveNext())
        {
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
        if (this._enumerator != null)
        {
          this._enumerator.dispose();
        }//END if
        this._enumerator = undefined;
        this._callback = undefined;
      }

    }//END class
  }//END module
}//END module