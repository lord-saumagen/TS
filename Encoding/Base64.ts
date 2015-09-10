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
        if (typeof (TS.Utils.Assert) == "undefined")
        {
          _missingArray.push("TS.Utils.Assert");
        }
      }//END else

      if (_missingArray.length > 0)
      {
        throw new Error("TS.Encoding.Base64 requires additional references to the following module(s) or class(es): " + _missingArray.join(", ") + ".");
      }//END if
    })();


    /**
    *  @description  Normalizes the string given in argument 'data'.
    *                Normalization comprehends the removal of line 
    *                breaks and white space.
    *                The transformation from URL compliant encoding to
    *                normal base64 endcoding and the addition of missing 
    *                pad characters if necessary.
    *                In a last step that function checks whether the given
    *                data string is a valid base64 encoded string or not.
    *                The function throws a 'TS.InvalidFormatException' if
    *                the input string is invalid.
    *                Returns the normalized input string as result.
    *
    *  @param  data: The base64 encoded data as string.
    *
    *  @returns string: The normalized data string.
    *
    *  @throws TS.InvalidFormatException
    */
    function normalizeBase64EncodedData(data : string) : string
    {
      var _resultString = "";
      var _formatTest;

      _resultString = data.replace("/(\r)/gm", "").replace("/(\n)/gm", "").replace(/(\s)/gm, "");
      _resultString = _resultString.replace(/-/gm, "+").replace(/_/gm, "/");
      _formatTest = _resultString.search(/[^ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=]/gm);

      if (_formatTest > -1)
      {
        throw new TS.InvalidFormatException("data", data, "The given data string is not a valid base64 encoded string. Found invalid character: '" + _resultString.charAt(_formatTest) + "'.");
      }//END if

      while (_resultString.length % 4 !== 0)
      {
        _resultString += "=";
      }//END while

      return _resultString;
    }


    function makeURLCompliant(data: string): string
    {
      return data.replace(/\+/gm, "-").replace(/\//gm, "_").replace(/\=/gm, "");
    }


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
      *  @description  Decodes a base64 encoded UTF-8 string and returns the decoded
      *                UTF-16 string.
      *
      *                The decode function is functional equivalent to the following
      *                C# code:
      *
      *                var _byteArray = System.Convert.FromBase64String(data));
      *                var _resultString = System.Text.Encoding.UTF8.GetString(_byteArray);
      *
      *  @param  data: The base64 encoded data as string.
      *
      *  @returns string: The decoded plain text as string.
      *
      *  @throws {TS.ArgumentNullUndefOrEmptyException}
      *  @throws {TS.InvalidTypeException}
      *  @throws {TS.InvalidFormatException}
      */
      public static decode(data: string): string
      {
        var _data: Array<number>;
        var _result: string;

        if (TS.Utils.Assert.isNullUndefOrEmpty(data))
        {
          return "";
        }//END if

        if (!TS.Utils.Assert.isString(data))
        {
          throw new TS.InvalidTypeException("data", data, "The argument 'data' in function TS.Utils.Base64.decode' must be a valid string.");
        }//END if

        
        //Throws: TS.InvalidTypeException, TS.InvalidFormatException
        _data = Base64.decodeToByteArray(data);

        //Throws: TS.ArgumentNullUndefOrEmptyException, TS.InvalidTypeException, TS.InvalidOperationException
        _result = UTF.UTF8ArrayToUTF16String(_data);
        return _result;
      }


      /**
      *  @description  Decodes a base64 encoded string and returns the decoded
      *                string as byte array.
      *
      *                The decodeToByteArray function is functional equivalent to the 
      *                following C# code:
      *
      *                var _byteArray = System.Convert.FromBase64String(data));
      *
      *  @param  data: The base64 encoded data as string.
      *
      *  @returns Array<number>: The decoded data as byte array.
      *
      *  @throws {TS.InvalidTypeException}
      *  @throws {TS.InvalidFormatException}
      */
      public static decodeToByteArray(data: string): Array<number>
      {
        var _bits: number;
        var _charIndex0: number;
        var _charIndex1: number;
        var _charIndex2: number;
        var _charIndex3: number;
        var _data: string;
        var _index: number;
        var _octetData0: number;
        var _octetData1: number;
        var _octetData2: number;
        var _result: Array<number>;

        if (TS.Utils.Assert.isNullUndefOrEmpty(data))
        {
          return new Array<number>();
        }//END if

        if (!TS.Utils.Assert.isString(data))
        {
          throw new TS.InvalidTypeException("data", data, "The argument 'data' in function TS.Utils.Base64.decodeToByteArray' must be a valid string.");
        }//END if

        //May throw TS.InvalidFormatException
        _data = normalizeBase64EncodedData(data);

        if (_data.length == 0)
        {
          return new Array<number>();
        }//END if

        _index = 0;
        _result = new Array<number>();

        do 
        {
          _charIndex0 = this.BASE64_CHARACTER_SET.indexOf(_data.charAt(_index++));
          _charIndex1 = this.BASE64_CHARACTER_SET.indexOf(_data.charAt(_index++));
          _charIndex2 = this.BASE64_CHARACTER_SET.indexOf(_data.charAt(_index++));
          _charIndex3 = this.BASE64_CHARACTER_SET.indexOf(_data.charAt(_index++));

          _bits = 0;

          if (_charIndex2 == 64)
          {
            _bits = _charIndex0 << 18 | _charIndex1 << 12;
          }
          else if (_charIndex3 == 64)
          {
            _bits = _charIndex0 << 18 | _charIndex1 << 12 | _charIndex2 << 6;
          }
          else
          {
            _bits = _charIndex0 << 18 | _charIndex1 << 12 | _charIndex2 << 6 | _charIndex3;
          }

          _octetData0 = _bits >>> 16;
          _octetData1 = _bits >> 8 & 0xff;
          _octetData2 = _bits & 0xff;

          //BASE64_CHARACTER_SET[64] = '=";
          if (_charIndex2 == 64) 
          {
            _result.push(_octetData0);
          }//END if
          else if (_charIndex3 == 64)
          {
            _result.push(_octetData0);
            _result.push(_octetData1);
          }//END if
          else
          {
            _result.push(_octetData0);
            _result.push(_octetData1);
            _result.push(_octetData2);
          }//END else
        } while (_index < _data.length - 1);

        return _result;
      }


      /**
      * @description Encodes the given UTF-16 string to UTF-8 in a first step and then
      *              to base64 in a second step and retuns that encoded string.
      *
      *               The encode function is functional equivalent to the 
      *               following C# code:
      *
      *              var _byteArray = System.Text.Encoding.UTF8.GetBytes(data);
      *              var _resultString = System.Convert.ToBase64String(_byteArray);
      *
      * @param  data: The plain text to encode as string.
      *
      * @returns {string} The base64 encoded data as string.
      *
      * @Throws {TS.InvalidTypeException}
      */
      public static encode(data: string): string
      {
        var _bits: number;
        var _charIndex0: number;
        var _charIndex1: number;
        var _charIndex2: number;
        var _charIndex3: number;
        var _data: Array<number>;
        var _bytesToEncode : number;
        var _index: number;
        var _octetData0: number;
        var _octetData1: number;
        var _octetData2: number;
        var _padding: number;
        var _result: string;

        if (TS.Utils.Assert.isNullUndefOrEmpty(data))
        {
          return "";
        }//END if

        if (!TS.Utils.Assert.isString(data))
        {
          throw new TS.InvalidTypeException("data", data, "The argument 'data' in function TS.Utils.Base64.encode' must be a valid string.");
        }//END if

        _index = 0;
        _result = "";
        _data = UTF.UTF16StringToUTF8Array(data);

        do
        {
          _charIndex0 = 0;
          _charIndex1 = 0;
          _charIndex2 = 0;
          _charIndex3 = 0;

          _bytesToEncode = ((_data.length - _index) >= 3) ? 3 : (_data.length - _index);

          _octetData0 = _data[_index++];

          (_bytesToEncode > 1) ? _octetData1 = _data[_index++] : _octetData1 = 0;

          (_bytesToEncode > 2) ? _octetData2 = _data[_index++] : _octetData2 = 0;

          _bits = _octetData0 << 16 | _octetData1 << 8 | _octetData2;

          _charIndex0 = _bits >>> 18;
          _charIndex1 = _bits >> 12 & 0x3f;

          switch (_bytesToEncode)
          {
            case 3:
              {
                _charIndex2 = _bits >> 6 & 0x3f;
                _charIndex3 = _bits & 0x3f;
                break;
              }
            case 2:
              {
                _charIndex2 = _bits >> 6 & 0x3f;
                _charIndex3 = 64;
                break;
              }
            case 1:
              {
                _charIndex2 = 64;
                _charIndex3 = 64;
                break;
              }
          }

          _result += this.BASE64_CHARACTER_SET.charAt(_charIndex0) + this.BASE64_CHARACTER_SET.charAt(_charIndex1) + this.BASE64_CHARACTER_SET.charAt(_charIndex2) + this.BASE64_CHARACTER_SET.charAt(_charIndex3);

        } while (_index < _data.length);

        return _result;
      }


      /**
      *  @description Encodes the given UTF-16 string to UTF-8 in a first step then
      *               to base64 in a second step and makes the resulting string URL
      *               compliant in a last step and returns the resulting string.
      *               The result string can be used as query string data.
      *
      *  @param  data: The plain text to encode as string.
      *
      *  @returns string: The URL compliant base64 encoded data as string.
      *
      *  @throws TS.InvalidTypeException
      */
      public static encodeURLCompliant(data: string): string
      {
        if (TS.Utils.Assert.isNullUndefOrEmpty(data))
        {
          return "";
        }//END if

        if (!TS.Utils.Assert.isString(data))
        {
          throw new TS.InvalidTypeException("data", data, "The argument 'data' in function TS.Utils.Base64.encodeURLCompliant' must be a valid string.");
        }//END if

        return makeURLCompliant(TS.Encoding.Base64.encode(data));
      }

    }//END class
  }//END module
}//END module