module TS
{
  "use strict";

  export module Encoding
  {

    /**
    *  @class
    *        
    *  @classdesc This class implements UTF-16LE / UCS-2LE
    *             string conversion into a UTF-8 byte array
    *             and vice versa.
    */
    export class UTF
    {

      /**
       * @description Takes an arbitrary UCS-2LE or UTF-16LE string and
       *              returns an array of UTF-8 encoded bytes which 
       *              represent the input string in UTF-8 encoding.
       *              Since javascript strings are always 
       *              UCS-2 or UTF-16 and DOM strings always UTF-16,
       *              this function is able to convert all strings 
       *              which may occur in a javascript program into 
       *              an UTF-8 byte array. 
       *
       * @throws TS.ArgumentNullUndefOrEmptyException
       * @throws TS.InvalidTypeException
       * @throws TS.InvalidOperationException
       */
      public static UTF16StringToUTF8Array(input: string): Array<number>
      {
        var _resultByteArray: Array<number>
        var _index: number;
        var _codePoint: number;
        var _splitArray: Array<number>;

        checkParameter(input, "input", "TS.Encoding.UTF.UTF16StringToUTF8Array");
        checkStringParameter(input, "input", "TS.Encoding.UTF.UTF16StringToUTF8Array");

        _resultByteArray = new Array<number>();

        for (_index = 0; _index < input.length; _index++)
        {
          //Throws: TS.ArgumentNullUndefOrEmptyException, TS.InvalidTypeException
          _codePoint = codePointAt(input, _index);
          if (_codePoint === null)
          {
            continue;
          }//END if

          //Code point U+0000 - U+007F, 7 bits, 1 byte
          if (_codePoint <= 127)
          {
            _resultByteArray.push(_codePoint);
          }//END if
          //Code point U+0080 - U+07FF, 11 bits, 2 bytes
          else if ((_codePoint > 128) && (_codePoint <= 2047))
          {
            _splitArray = split6BitArray(_codePoint);
            _resultByteArray.push((_splitArray[0] & 31) + 192); /* 5 significant bits */
            _resultByteArray.push(_splitArray[1] + 128);
          }//END else if
          //Code point U+0800 - U+FFFF, 16 bits, 3 bytes
          else if ((_codePoint >= 2048) && (_codePoint <= 65535))
          {
            _splitArray = split6BitArray(_codePoint);
            _resultByteArray.push((_splitArray[0] & 15) + 224); /* 4 significant bits */
            _resultByteArray.push(_splitArray[1] + 128);
            _resultByteArray.push(_splitArray[2] + 128);
          }//END else if
          //Code point U+10000 - U+1FFFFF, 21 bits, 4 bytes
          else if ((_codePoint >= 65536) && (_codePoint <= 2097151))
          {
            _splitArray = split6BitArray(_codePoint);
            _resultByteArray.push((_splitArray[0] & 7) + 240); /* 3 significant bits */
            _resultByteArray.push(_splitArray[1] + 128);
            _resultByteArray.push(_splitArray[2] + 128);
            _resultByteArray.push(_splitArray[3] + 128);
          }//END else if

          if (_codePoint > 2097151)
          {
            throw new TS.InvalidOperationException("Invalid code point detected in function 'TS.Encoding.UTF.UTF16StringToUTF8Array'. The input string may not be a valid UTF-16 encoded string.");
          }//END if
        }//END for
        return _resultByteArray;
      }


      /**
       * @description Takes a byte array of UTF-8 encoded bytes and 
       *              converts them into a javascript string which ist
       *              at least an UCS-2 string, but more probably an
       *              UTF-16 string.
       *
       * @throws TS.ArgumentNullUndefOrEmptyException
       * @throws TS.InvalidTypeException
       * @throws TS.InvalidOperationException
       */
      public static UTF8ArrayToUTF16String(byteArray: Array<number>): string
      {
        var _index: number;
        var _resultString: string;
        var _charCode: number;
        var _highSurrogate: number;
        var _lowSurrogate: number;

        checkParameter(byteArray, "byteArray", "TS.Encoding.UTF.UTF8ArrayToUTF16String");
        checkByteArrayParameter(byteArray, "byteArray", "TS.Encoding.UTF.UTF8ArrayToUTF16String");

        _resultString = "";

        for (_index = 0; _index < byteArray.length; _index++)
        {
          if (byteArray[_index] < 128)
          {
            _resultString += String.fromCharCode(byteArray[_index]);
            continue;
          }//END if
          else if ((byteArray[_index] & 252) == 252) /* Six high bits */
          {
            /* invalid */
            throw new TS.InvalidOperationException("Invalid code point detected in function 'TS.Encoding.UTF.UTF8ArrayToUTF16String'. The input array may not be a valid UTF-8 encoded byte array.");
          }
          else if ((byteArray[_index] & 248) == 248) /* Five high bits */
          {
            /* invalid */
            throw new TS.InvalidOperationException("Invalid code point detected in function 'TS.Encoding.UTF.UTF8ArrayToUTF16String'. The input array may not be a valid UTF-8 encoded byte array.");
          }
          else if ((byteArray[_index] & 240) == 240) /* Four high bits */
          {
            if ((byteArray.length - 1) < (_index + 3))
            {
               /* invalid */
              throw new TS.InvalidOperationException("Invalid code point detected in function 'TS.Encoding.UTF.UTF8ArrayToUTF16String'. The input array may not be a valid UTF-8 encoded byte array.");
            }//END if

            _charCode = ((byteArray[_index] & 7) * 262144);
            _charCode += ((byteArray[_index + 1] & 63) * 4096);
            _charCode += ((byteArray[_index + 2] & 63) * 64);
            _charCode += (byteArray[_index + 3] & 63);


            _highSurrogate = ((_charCode - 0x10000) >>> 10) + 0xD800;
            _lowSurrogate = ((_charCode - 0x10000) & 0x3FF) + 0xDC00;

            _index += 3;
            _resultString += String.fromCharCode(_highSurrogate, _lowSurrogate);
            continue;
          }
          else if ((byteArray[_index] & 224) == 224) /* Three high bits */
          {
            if ((byteArray.length - 1) < (_index + 2))
            {
               /* invalid */
              throw new TS.InvalidOperationException("Invalid code point detected in function 'TS.Encoding.UTF.UTF8ArrayToUTF16String'. The input array may not be a valid UTF-8 encoded byte array.");
            }//END if

            _charCode = (byteArray[_index] & 15) * 4096;
            _charCode += ((byteArray[_index + 1] & 63) * 64);
            _charCode += (byteArray[_index + 2] & 63);
            _index += 2;
            _resultString += String.fromCharCode(_charCode);
            continue;
          }//END else if
          else ((byteArray[_index] & 192) == 192) /* Two high bits */
          {
            if ((byteArray.length - 1) < (_index + 1))
            {
               /* invalid */
              throw new TS.InvalidOperationException("Invalid code point detected in function 'TS.Encoding.UTF.UTF8ArrayToUTF16String'. The input array may not be a valid UTF-8 encoded byte array.");
            }//END if

            _charCode = (byteArray[_index] & 31) * 64;
            _charCode += (byteArray[_index + 1] & 63);
            _index += 1;
            _resultString += String.fromCharCode(_charCode);
            continue;
          }//END else 
        }//END for

        return _resultString;
      }


    }//END class




    /**
     * @description Splits a number into an array of 6 bit numbers.
     *              That means, every array element has a value in
     *              the range of [0..63]. 
     * 
     * @throws TS.InvalidTypeException
     * @throws TS.ArgumentOutOfRangeException
     */
    function split6BitArray(x: number): Array<number>
    {
      var _resultArray: Array<number>;
      var _x: number;

      checkPositiveIntegerParameter(x, "x", "TS.Encoding.split6BitArray");

      if ((x < 128) || (x > 2097151))
      {
        throw new TS.ArgumentOutOfRangeException("x", x, "Argument 'x' must have a value in the range [128..2097151] in function 'TS.Encoding.split6BitArray'.");
      }//END if

      _x = x;
      _resultArray = new Array<number>();

      while(_x > 0)
      {
        _resultArray.unshift(_x & 63);
        _x = _x >>> 6;
      }//END while

      if (x <= 2047)
      {
        if (_resultArray.length < 2)
        {
          _resultArray.unshift(0);
        }//END if
        return _resultArray;
      }//END if

      if (x <= 65535)
      {
        if(_resultArray.length < 3)
        {
          _resultArray.unshift(0);
        }//END if
        return _resultArray;
      }//END if

      if (x <= 2097151)
      {
        if (_resultArray.length < 4)
        {
          _resultArray.unshift(0);
        }//END if
        return _resultArray;
      }//END if

    }


    /**
     * @description Returns the code point of the grapheme / text element
     *              in the source string at the given position or null 
     *              if there isn't a valid grapheme at the given position.
     * 
     * @throws TS.ArgumentNullUndefOrEmptyException
     * @throws TS.InvalidTypeException
     */
    function codePointAt(sourceString: string, position: number) : any
    {
      var _first: number; 
      var _second: number;

      checkParameter(sourceString, "sourceString", "TS.Encoding.codePointAt");
      checkParameter(position, "position", "TS.Encoding.codePointAt");
      checkStringParameter(sourceString, "sourceString", "TS.Encoding.codePointAt");

      _first = sourceString.charCodeAt(position);

      // check if it’s the start of a surrogate pair
      if (isHighSurrogate(_first)  && sourceString.length > position + 1)
      {
        _second = sourceString.charCodeAt(position + 1) 
        if (isLowSurrogate(_second))
        {
          // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
          return (_first - 0xD800) * 0x400 + _second - 0xDC00 + 0x10000;
        }//END if
      }//END if

      if (isLowSurrogate(_first))
      {
        return null;
      }//END if

      return _first;
    }


    /**
     * @description The function returns true if the value of the 
     *              code unit given in argument 'codeUnit' is in
     *              the range of high surrogate code units
     *              [0xD800..0xDBFF], otherwise false.
     */
    function isHighSurrogate(codeUnit: number) : boolean
    {
      return (codeUnit >= 0xD800 && codeUnit <= 0xDBFF);
    }


    /**
     * @description The function returns true if the value of the 
     *              code unit given in argument 'codeUnit' is in
     *              the range of low surrogate code units
     *              [0xDC00..0xDFFF], otherwise false.
     */
    function isLowSurrogate(codeUnit: number) : boolean
    {
      return (codeUnit >= 0xDC00 && codeUnit <= 0xDFFF);
    }


    /**
    * @description
    *   This function checks whether the argument 'paramToCheck' is a positive
    *   integer number or not and throws a 'TS.InvalidTypeException' if not.
    *
    * @throws TS.InvalidTypeException
    */
    function checkPositiveIntegerParameter(paramToCheck: any, paramName: string, functionName: string)
    {
      if (!TS.Utils.Assert.isUnsignedIntegerNumber(paramToCheck))
      {
        throw new TS.InvalidTypeException(paramName, paramToCheck, "Argument '" + paramName + "' must be a valid positive integer in function '" + functionName + "'.");
      }//END if
    }


    /**
    * @description
    *   This function checks the argument 'paramToCheck' against null, 
    *   undefined and emptyness and throws a 'TS.ArgumentNullOrUndefinedException' if
    *   the argument is either null or undefined. 
    *   The exceptions message uses the 'paramName' and 'functionName' 
    *   in its message to signal which parameter failed the check and 
    *   which function received the invalid parameter.
    *
    * @throws TS.ArgumentNullUndefOrEmptyException
    */
    function checkParameter(paramToCheck: any, paramName: string, functionName: string)
    {
      if (TS.Utils.Assert.isNullUndefOrEmpty(paramToCheck))
      {
        throw new TS.ArgumentNullUndefOrEmptyException(paramName, "Argument '" + paramName + "' must not be null or undefinde or empty in function '" + functionName + "'.");
      }//END if
    }


    /**
    * @description
    *   This function checks whether the argument 'paramToCheck' is a 
    *   valid string or not and throws a 'TS.InvalidTypeException' if
    *   the argument doesn't qualify as string. 
    *   The exceptions message uses the 'paramName' and 'functionName' 
    *   in its message to signal which parameter failed the check and 
    *   which function received the invalid parameter.
    *
    * @throws TS.InvalidTypeException
    */
    function checkStringParameter(paramToCheck: any, paramName: string, functionName: string)
    {
      if (!TS.Utils.Assert.isString(paramToCheck))
      {
        throw new TS.InvalidTypeException("paramName",paramName, "Argument '" + paramName + "' must be a valid string in function '" + functionName + "'.");
      }//END if
    }


    /**
    * @description
    *   This function checks wther the argument 'paramToCheck' is a valid
    *   byte array or not and throws a 'TS.InvalidTypeException' if
    *   the argument is not a valid array of byte values.
    *   The exceptions message uses the 'paramName' and 'functionName' 
    *   in its message to signal which parameter failed the check and 
    *   which function received the invalid parameter.
    *
    * @throws TS.InvalidTypeException
    */
    function checkByteArrayParameter(paramToCheck: any, paramName: string, functionName: string)
    {
      if (!TS.Utils.Assert.isUnsignedByteArray(paramToCheck))
      {
        throw new TS.InvalidTypeException(paramName, paramToCheck, "Argument '" + paramName + "' must be an array of byte values in function '" + functionName + "'.");
      }//END if
    }


  }//END module
}//END module
