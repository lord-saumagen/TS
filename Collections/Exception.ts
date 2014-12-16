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
        if (typeof (TS.Utils.TypeInfo) == "undefined")
        {
          _missingArray.push("TS.Utils.TypeInfo");
        }
      }//END else

      if (_missingArray.length > 0)
      {
        throw new Error("TS.Collections.Exception requires additional references to the following module(s) or class(es): " + _missingArray.join(", ") + ".");
      }//END if
    })();

    //********************************************************************************
    // Duplicate key exception
    //********************************************************************************

    export class DuplicateKeyException extends TS.Exception
    {

      /**
      *  @overwrite
      */
      public get type(): string
      {
        return "TS.Collections.DuplicateKeyException";
      }

      /**
      *  @constructs
      */
      constructor(message: string = "An item with the same key has already been added.", innerException?: Exception)
      {
        super(message, innerException);
      }

    }//END class


    //********************************************************************************
    // Invalid key exception
    //********************************************************************************

    export class InvalidKeyException extends Exception
    {
      private _keyValue: any;

      /**
      *  @overwrite
      */
      public get type(): string
      {
        return "TS.Collections.InvalidKeyException";
      }

      get keyValue(): any
      {
        return this._keyValue;
      }

      /**
      *  @constructs
      */
      constructor(keyValue: any, message?: string, innerException?: Exception)
      {
        super(message, innerException);
        this._keyValue = keyValue;
      }

    }//END class

  }//END module
}//END modle
