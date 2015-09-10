module TS
{
  "use strict";

  export module Security
  {

    //
    // Reference check
    //
    (function ()
    {
      var _missingArray: Array<string>;
      _missingArray = new Array<string>();

      if (TS.Utils == undefined)
      {
        _missingArray.push("TS.Utils");
      }

      if (TS.Utils.Assert == undefined)
      {
        _missingArray.push("TS.Utils.Assert");
      }

      if ((TS.TypeCode == undefined) || (TS.TypeCode.UInt64 == undefined))
      {
        _missingArray.push("TS.TypeCode.UInt64");
      }

      if (TS.Exception == undefined)
      {
        _missingArray.push("TS.Exception");
      }

      if (TS.Security == undefined)
      {
        _missingArray.push("TS.Security");
      }

      if (TS.Security.Cryptography == undefined)
      {
        _missingArray.push("TS.Security.Cryptography");
      }

      if (_missingArray.length > 0)
      {
        throw new Error("TS.Security.SHA256 requires additional references to the following module(s) or class(es): " + _missingArray.join(", ") + ".");
      }//END if

    })();


    /**
    *  @class
    *        
    *  @classdesc This class implements the SAH256
    *             hash algorithm as described in:
    *             http://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf
    */
    export class SHA256 extends Cryptography
    {
      //
      // Define the hash values
      //
      private _h0: number;
      private _h1: number;
      private _h2: number;
      private _h3: number;
      private _h4: number;
      private _h5: number;
      private _h6: number;
      private _h7: number;

      //
      // Define the for constants as described in 
      // http://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf | SHA-224 and SHA-256 Constants
      //
      private _kArray: Array<number>

      //TODO: Create the test functions. Add descripion
      /**
       * @constructs
       * @description
       * @throws {TS.InvalidOperationException}
       */
      constructor()
      {
        TS.Utils.checkConstructorCall(this, TS.Security.SHA256);
        super();
      }

      private initialize()
      {
        //
        // Initialize the hash values
        //

        this._h0 = 0x6a09e667;
        this._h1 = 0xbb67ae85;
        this._h2 = 0x3c6ef372;
        this._h3 = 0xa54ff53a;
        this._h4 = 0x510e527f;
        this._h5 = 0x9b05688c;
        this._h6 = 0x1f83d9ab;
        this._h7 = 0x5be0cd19;

        //
        // Initialize the round constants
        //
        this._kArray = TS.Security.getSHA224_256RoundConstants();
      }


      /**
      * @description
      *    Encrypts the plain text given in argument 'message' and returns the 
      *    digest / SHA256 hash as a hexadecimal string.
      *
      * @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      * @throws
      *    TS.InvalidTypeException
      */
      public encrypt(message: string): string
      {
        var _messageLength: number;
        var _wordArray: Array<number>;
        var _index: number;
        var _blockIndex: number;
        var _4CharacterWord: number;
        var _UInt64MessageBitLength: TS.TypeCode.UInt64;
        var _temp1: number;
        var _temp2: number;
        var _resultString: string;


        //
        // Define the working variables
        //
        var _a: number;
        var _b: number;
        var _c: number;
        var _d: number;
        var _e: number;
        var _f: number;
        var _g: number;
        var _h: number;

        //
        // Define the array of message schedule variables.
        //
        var _w: Array<number>;

        if (TS.Utils.Assert.isNullOrUndefined(message))
        {
          throw new TS.ArgumentNullOrUndefinedException("message", "Argument message must be null or undefined in function 'TS.Security.SHA1.encrypt'.");
        }//END if

        if (!TS.Utils.Assert.isString(message))
        {
          throw new TS.InvalidTypeException("message", message, "Argument message must be a valid string in function 'TS.Security.SHA1.encrypt'.");
        }//END if


        //
        // Initialize the array of message schedule variables.
        //
        _w = new Array<number>(63);

        //
        // Initialize constants and hash values.
        //
        this.initialize();

        _messageLength = message.length;
        _wordArray = new Array<number>();

        //Slice the message in 4 character substrings and
        //and store the characters as bytes in a 32bit
        //integer. 
        for (_index = 0; _index < _messageLength - 3; _index += 4)
        {
          _4CharacterWord = message.charCodeAt(_index) << 24 | message.charCodeAt(_index + 1) << 16 | message.charCodeAt(_index + 2) << 8 | message.charCodeAt(_index + 3);
          _wordArray.push(_4CharacterWord);
        }//END for


        //Add the characters left (if any), add the stop
        //bit and fill up with zeros up to 4 byte.
        //Add the result to the word array.
        switch (_messageLength % 4)
        {
          case 0:
            {
              _4CharacterWord = 0x80000000;
              break;
            }
          case 1:
            {
              _4CharacterWord = message.charCodeAt(_messageLength - 1) << 24 | 0x800000;
              break;
            }
          case 2:
            {
              _4CharacterWord = message.charCodeAt(_messageLength - 2) << 24 | message.charCodeAt(_messageLength - 1) << 16 | 0x8000;
              break;
            }
          case 3:
            {
              _4CharacterWord = message.charCodeAt(_messageLength - 3) << 24 | message.charCodeAt(_messageLength - 2) << 16 | message.charCodeAt(_messageLength - 1) << 8 | 0x80;
              break;
            }
        }//END switch

        _wordArray.push(_4CharacterWord);

        //Fill the word array with empty entries until
        //the array has bit a length of : n * 512 + 448.
        //Each entry in the array has a length of 32 bit.
        //16 * 32 = 512, 14 * 32 = 448
        while ((_wordArray.length % 16) != 14)
        {
          _wordArray.push(0);
        }//END while

        _UInt64MessageBitLength = TS.TypeCode.UInt64.number2UInt64(_messageLength * 8);
        _wordArray.push(_UInt64MessageBitLength.MSInteger, _UInt64MessageBitLength.LSInteger);

        for (_blockIndex = 0; _blockIndex < _wordArray.length; _blockIndex += 16)
        {

          //
          // Prepare the message schedul
          //
          for (_index = 0; _index < 16; _index++)
          {
            _w[_index] = _wordArray[_blockIndex + _index];
          }//END of

          for (_index = 16; _index <= 64; _index++)
          {
            _temp1 = (TS.Security.Cryptography.gamma1_32(_w[_index - 2]) + _w[_index - 7]) % 0x100000000;
            _temp2 = (TS.Security.Cryptography.gamma0_32(_w[_index - 15]) + _w[_index - 16]) % 0x100000000;
            _w[_index] = (_temp1 + _temp2) % 0x100000000;
          }//END for

          //
          // Initialize the working variables
          //
          _a = this._h0;
          _b = this._h1;
          _c = this._h2;
          _d = this._h3;
          _e = this._h4;
          _f = this._h5;
          _g = this._h6;
          _h = this._h7;

          for (_index = 0; _index < 64; _index++)
          {
            if (_index == 17)
            {
              var X = 10;
            }//END if

            _temp1 = (_h + TS.Security.Cryptography.sigma1_32(_e) + TS.Security.Cryptography.ch32(_e, _f, _g) + this._kArray[_index] + _w[_index]) % 0x100000000;
            _temp2 = (TS.Security.Cryptography.sigma0_32(_a) + TS.Security.Cryptography.maj32(_a, _b, _c)) % 0x100000000;
            restOperation();

          }//END for

          function restOperation()
          {
            _h = _g;
            _g = _f;
            _f = _e;
            _e = (_d + _temp1) % 0x100000000;
            _d = _c;
            _c = _b;
            _b = _a;
            _a = (_temp1 + _temp2) % 0x100000000;
          }

          this._h0 = (this._h0 + _a) % 0x100000000;
          this._h1 = (this._h1 + _b) % 0x100000000;
          this._h2 = (this._h2 + _c) % 0x100000000;
          this._h3 = (this._h3 + _d) % 0x100000000;
          this._h4 = (this._h4 + _e) % 0x100000000;
          this._h5 = (this._h5 + _f) % 0x100000000;
          this._h6 = (this._h6 + _g) % 0x100000000;
          this._h7 = (this._h7 + _h) % 0x100000000;


          //[this._h0, this._h1, this._h2, this._h3, this._h4, this._h5, this._h6, this._h7].forEach((value: number, index: number, array: number[]) =>
          //{
          //  if (value < 0)
          //  {
          //    array[index] = SHA1.CorrectNeg(value);
          //  };
          //});

        }//END for

        _resultString = TS.Utils.Unsigned32BitIntegerToHexString(this._h0) +
        TS.Utils.Unsigned32BitIntegerToHexString(this._h1) +
        TS.Utils.Unsigned32BitIntegerToHexString(this._h2) +
        TS.Utils.Unsigned32BitIntegerToHexString(this._h3) +
        TS.Utils.Unsigned32BitIntegerToHexString(this._h4) +
        TS.Utils.Unsigned32BitIntegerToHexString(this._h5) +
        TS.Utils.Unsigned32BitIntegerToHexString(this._h6) +
        TS.Utils.Unsigned32BitIntegerToHexString(this._h7);

        return _resultString;
      }

    }//END class
  }//END module
}//END module  