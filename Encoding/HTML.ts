module TS
{
  "use strict";

  export module Encoding
  {
    /**
    *  @class
    *        
    *  @classdesc This class implements a simple HTML encoding and
    *             decoding function for short text fragments.
    */
    export class HTML
    {

      /**
      *  @description Replaces every character in the input string by its 
      *               numeric character reference.
      *
      *  @return {string}: The encoded string.
      */
      public static encode(stringValue: string): string
      {
        var _bufferArray = [];
        var _index;
        var _length;

        _length = stringValue.length;
        for (_index = 0; _index < _length; _index ++)
        {
          _bufferArray.push('&#' + stringValue.charCodeAt(_index) + ';');
        }//END for
        return _bufferArray.join('');
      }

      
      /**
      *  @description Replaces every numeric character reference in 
      *               the input string by its character representation.
      *
      *  @return {string}: The decoded string.
      */
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