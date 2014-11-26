module TS
{
  "use strict";

  export module Encoding
  {
    export class UTF8
    {
      public static Encode(input : string) : string
      {
        var _resultString: string;
        var _index: number;
        var _charCode: number;

        _resultString = "";

        for (_index = 0; _index < input.length; _index++)
        {
          _charCode = input.charCodeAt(_index);
          if (_charCode < 128)
          {
            _resultString += String.fromCharCode(_charCode);
          }//END if
          else if ((_charCode > 127) && (_charCode < 2048))
          {
            _resultString += String.fromCharCode((_charCode >> 6) | 192);
            _resultString += String.fromCharCode((_charCode & 63) | 128);
          }//END else if
          else
          {
            _resultString += String.fromCharCode((_charCode >> 12) | 224);
            _resultString += String.fromCharCode(((_charCode >> 6) & 63) | 128);
            _resultString += String.fromCharCode((_charCode & 63) | 128);
          }//END else
        }//END for
        return _resultString;
      }
    }//END class
  }//END module
}//END module
