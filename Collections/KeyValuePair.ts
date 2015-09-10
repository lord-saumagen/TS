module TS
{
  "use strict";


  export module Collections
  {

    //
    // Reference check
    //
    (function ()
    {
      var _missingArray: Array<string>;
      _missingArray = new Array<string>();


      if (typeof(TS.Exception) == "undefined")
      {
        _missingArray.push("TS.Exception");
      }

      if (typeof (TS.Utils) == "undefined")
      {
        _missingArray.push("TS.Utils");
      }//END if
      else
      {
        if (typeof (TS.Utils.Assert) == "undefined")
        {
          _missingArray.push("TS.Utils.Assert");
        }
      }//END else

      if (_missingArray.length > 0)
      {
        throw new Error("TS.Collections.KeyValuePair requires additional references to the following module(s) or class(es): " + _missingArray.join(", ") + ".");
      }//END if
    })();


    /**
    * @class
    * @classdesc This is the implementation of the key value pair used
    *            by the dictionary class.
    *
    * @see {http://msdn.microsoft.com/en-us/library/5tbh8a42(v=vs.110).aspx | MSDN}
    */
    export class KeyValuePair<TKey, TValue>
    {
      private _key: TKey;
      private _value: TValue

      public get key(): TKey
      {
        return this._key;
      }

      public get value(): TValue
      {
        return this._value;
      }

      /**
      * @constructs Initializes a new KeyValuePair with the specified key and value.
      *
      * @throws TS.ArgumentNullOrUndefinedException
      * @throws TS.InvalidOperationException
      */
      constructor(key: TKey, value: TValue)
      {
        
        TS.Utils.checkParameter(key, "key", "constructor of TS.Collections.KeyValuePair");
        TS.Utils.checkConstructorCall(this, TS.Collections.KeyValuePair);
        

        this._key = key;
        this._value = value;
      }
    }//END class

  }//END module
}//END module
 