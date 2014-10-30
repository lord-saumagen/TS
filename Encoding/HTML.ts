module TS
{
  "use strict";

  export module Encoding
  {
    export class HTML
    {

      public static encode(stringValue: string): string
      {
        var _bufferArray = [];
        var _index;
        var _length;

        _length = stringValue.length;
        for (_index = 0; _index < length; _index ++)
        {
          _bufferArray.push('&#' + stringValue.charCodeAt(_index) + ';');
        }
        return _bufferArray.join('');
      }


      public static decode(stringValue) : string
      {
        return stringValue.replace(/&#(\d+);/g, function (match, dec)
        {
          return String.fromCharCode(dec);
        });
      }

    }//END class
  }//END module
}//END module