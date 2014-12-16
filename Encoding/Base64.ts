module TS
{
  "use strict";

  export module Encoding
  {


    //
    // Reference check
    //
    (function ()
    {
      var _missingArray: Array<string>;
      _missingArray = new Array<string>();


      if (typeof (TS.Exception) == "undefined")
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
        throw new Error("TS.Encoding.Base64 requires additional references to the following module(s) or class(es): " + _missingArray.join(", ") + ".");
      }//END if
    })();


    /**
    *  @class
    *        
    *  @classdesc This class implements a base64 encoding and
    *             decoding function.
    * 
    *  @see {@link https://www.ietf.org/rfc/rfc3548.txt }
    */
    export class Base64
    {
      private static BASE64_CHARACTER_SET: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

      /**
      *  @description  Decodes a base64 encoded string and returns the decoded
      *                string.
      *                Should give the same result as the following C# code.
      *                
      *                var _byteArray = System.Convert.FromBase64String(data));
      *                var _resultString = System.Text.Encoding.UTF8.GetString(_byteArray);
      *
      *  @param  data: The base64 encoded data as string.
      *
      *  @returns string: The decoded plain text as string.
      *
      *  @Throws TS.InvalidTypeException
      */
      public static decode(data : string) : string
      {       
        var _octetData0: number;
        var _octetData1: number;
        var _octetData2: number;
        var _charIndex0: number;
        var _charIndex1: number;
        var _charIndex2: number;
        var _charIndex3: number;
        var _index: number;
        var _bits: number;
        var _result: string;

        if (TS.Utils.TypeInfo.isNullUndefOrEmpty(data))
        {
          return "";
        }//END if

        if (!TS.Utils.TypeInfo.isString(data))
        {
          throw new TS.InvalidTypeException("data", data, "The argument 'data' in function TS.Utils.Base64.decode' must be a valid string.");
        }//END if

        _index = 0;
        _result = "";

        do 
        {
          _charIndex0 = this.BASE64_CHARACTER_SET.indexOf(data.charAt(_index++));
          _charIndex1 = this.BASE64_CHARACTER_SET.indexOf(data.charAt(_index++));
          _charIndex2 = this.BASE64_CHARACTER_SET.indexOf(data.charAt(_index++));
          _charIndex3 = this.BASE64_CHARACTER_SET.indexOf(data.charAt(_index++));

          _bits = _charIndex0 << 18 | _charIndex1 << 12 | _charIndex2 << 6 | _charIndex3;

          _octetData0 = _bits >>> 16;
          _octetData1 = _bits >> 8 & 0xff;
          _octetData2 = _bits & 0xff;

          if (_charIndex2 == 64) 
          {
            _result += String.fromCharCode(_octetData0);
          }//END if
          else if (_charIndex3 == 64)
          {
            _result += String.fromCharCode(_octetData0, _octetData1);
          }//END if
          else
          {
            _result += String.fromCharCode(_octetData0, _octetData1, _octetData2);
          }//END else
        } while (_index < data.length);

        return _result;
      }


      /**
      *  @description Encodes a string and returns the base64 encoded result string.
      *
      *               Should give the same result as the following C# code.
      *               
      *               _byteArray = System.Text.Encoding.UTF8.GetBytes(data);
      *               _resultString = System.Convert.ToBase64String(_byteArray);
      *
      *  @param  data: The plain text to encode as string.
      *
      *  @returns string: The base64 encoded data as string.
      *
      *  @Throws TS.InvalidTypeException
      */
      public static encode(data: string): string
       {
        var _octetData0: number;
        var _octetData1: number;
        var _octetData2: number;
        var _charIndex0: number;
        var _charIndex1: number;
        var _charIndex2: number;
        var _charIndex3: number;
        var _index: number;
        var _bits: number;
        var _padding: number;
        var _result: string;
        var _data: string;

        if (TS.Utils.TypeInfo.isNullUndefOrEmpty(data))
        {
          return "";
        }//END if

        if (!TS.Utils.TypeInfo.isString(data))
        {
          throw new TS.InvalidTypeException("data", data, "The argument 'data' in function TS.Utils.Base64.encode' must be a valid string.");
        }//END if

        _index = 0;
        _result = "";

        do
        {
          _octetData0 = data.charCodeAt(_index++);
          _octetData1 = data.charCodeAt(_index++);
          _octetData2 = data.charCodeAt(_index++);

          _bits = _octetData0 << 16 | _octetData1 << 8 | _octetData2;

          _charIndex0 = _bits >>> 18;
          _charIndex1 = _bits >> 12 & 0x3f;
          _charIndex2 = _bits >> 6 & 0x3f;
          _charIndex3 = _bits & 0x3f;

          _result += this.BASE64_CHARACTER_SET.charAt(_charIndex0) + this.BASE64_CHARACTER_SET.charAt(_charIndex1) + this.BASE64_CHARACTER_SET.charAt(_charIndex2) + this.BASE64_CHARACTER_SET.charAt(_charIndex3);
        } while (_index < data.length);

        _padding = data.length % 3;

        return (_padding ? _result.slice(0, _padding - 3) : _result) + '==='.slice(_padding || 3);
      }

    }//END class
  }//END module
}//END module