module TS
{
  "use strict";

  export module Linq
  {

    export interface IGrouping<TKey, TSource> 
    {
      key: TKey;
    }

    export class Grouping<TKey, TSource> extends TS.Linq.Enumerable<TSource> implements IGrouping<TKey, TSource>
    {
      private _key: TKey;
      private _enumerable: Enumerable<TSource>;
      private _keySelector: (item: TSource) => TKey;
      private _equalityComparer: (first: TKey, second: TKey) => boolean;
      private _elementSelector: any;

      public get key(): TKey
      {
        return this._key;
      }

      constructor(key: TKey, enumerable: Enumerable<TSource>, keySelector: (item: TSource) => TKey, equalityComparer: (first: TKey, second: TKey) => boolean, elementSelector?: (item: TSource) => any)
      {
        checkParameter(key, "key", "TS.Linq.Extensions.Grouping.constructor");
        checkParameter(enumerable, "enumerable", "TS.Linq.Extensions.Grouping.constructor");
        checkFunctionParameter(keySelector, "keySelector", "TS.Linq.Extensions.Grouping.constructor");

        this._key = key;
        this._enumerable = enumerable;
        this._keySelector = keySelector;
        this._equalityComparer = equalityComparer;
        this._elementSelector = elementSelector;
        super(this.callbackOverride);
      }

      private callbackOverride(): IEnumerator<any>
      {
        if (!TS.Utils.TypeInfo.isNullOrUndefined(this._elementSelector) && (this._elementSelector.length == 1))
        {
          return TS.Linq.Extensions.select(TS.Linq.Extensions.where(this._enumerable, item => this._equalityComparer(this._keySelector(item), this._key)), item => this._elementSelector(item)).getEnumerator();
        }//END if

        return TS.Linq.Extensions.where(this._enumerable, item => this._equalityComparer(this._keySelector(item), this._key)).getEnumerator();
      }
    }

    /**
    *  @description
    *    This function checks whether argument 'paramToCheck' is a
    *    function or not.
    *    If not, a 'InvalidTypeException' is thrown.
    *    The exceptions message uses the 'pramName' and 'functionName'
    *    in its message to signal which parameter failed the check and 
    *    which function received the invalid parameter.
    *
    *  @throws
    *    TS.InvalidTypeException
    */
    function checkFunctionParameter(paramToCheck: any, paramName: string, functionName: string)
    {
      if (!TS.Utils.TypeInfo.isFunction(paramToCheck))
      {
        throw new TS.InvalidTypeException(paramName, paramToCheck, "Argument '" + paramName + "' must be a function parameter in function '" + functionName + "'.");
      }//END if
    }


    /**
    *  @description
    *    This function checks the argument 'paramToCheck' against null and 
    *    undefined and throws a 'TS.ArgumentNullOrUndefinedException' if
    *    the argument is either null or undefined. 
    *    The exceptions message uses the 'paramName' and 'functionName' 
    *    in its message to signal which parameter failed the check and 
    *    which function received the invalid parameter.
    *
    *  @throws
    *    TS.ArgumentNullOrUndefinedException
    */
    function checkParameter(paramToCheck: any, paramName: string, functionName: string)
    {
      if (TS.Utils.TypeInfo.isNullOrUndefined(paramToCheck))
      {
        throw new TS.ArgumentNullOrUndefinedException(paramName, "Argument '" + paramName + "' must not be null or undefinde in function '" + functionName + "'.");
      }//END if
    }

  }
}
