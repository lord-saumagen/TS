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
        throw new Error("TS.Security.SHA1 requires additional references to the following module(s) or class(es): " + _missingArray.join(", ") + ".");
      }//END if

    })();


    export class SHA1 extends Cryptography
    {
      //(message: string): string

      //
      // Define the hash values
      //
      /** @private */
      private _h0: number;
      /** @private */
      private _h1: number;
      /** @private */
      private _h2: number;
      /** @private */
      private _h3: number;
      /** @private */
      private _h4: number;

      //
      // Define the for constants as
      // defined in
      // http://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf | 4.2.1 SHA-1 Constants
      //
      /** @private */
      private _k0: number;
      /** @private */
      private _k1: number;
      /** @private */
      private _k2: number;
      /** @private */
      private _k3: number;

      //TODO: Create the test functions. Add descripion
      /**
       * @constructs
       * @description
       * @throws {TS.InvalidOperationException}
       */
      constructor()
      {
        TS.Utils.checkConstructorCall(this, TS.Security.SHA1);
        super();
      }

      /**
       * @private
       */
      private initialize()
      {
        //
        // Initialize the hash values
        //
        this._h0 = 0x67452301;
        this._h1 = 0xEFCDAB89;
        this._h2 = 0x98BADCFE;
        this._h3 = 0x10325476;
        this._h4 = 0xC3D2E1F0;

        //
        // Initialize the round constants
        //
        this._k0 = 0x5a827999;
        this._k1 = 0x6ed9eba1;
        this._k2 = 0x8f1bbcdc;
        this._k3 = 0xca62c1d6;
      }

      /**
      * @description Encrypts the plain text given in argument 'message' and returns the 
      *              digest / SHA1 hash as a hexadecimal string.
      *
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidTypeException}
      * @returns {string} The resulting digest as HEX string.
      */
      public encrypt(message: string): string
      {
        var _messageLength: number;
        var _wordArray: Array<number>;
        var _index: number;
        var _blockIndex: number;
        var _4CharacterWord: number;
        var _UInt64MessageBitLength: TS.TypeCode.UInt64;
        var _temp: number;
        var _resultString: string;


        //
        // Define the working variables
        //
        var _a: number;
        var _b: number;
        var _c: number;
        var _d: number;
        var _e: number;

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
        _w = new Array<number>(80);

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
        //bit and fill up with zeros up to 4 byte and 
        //add the result to the word array.
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

        //Fill the word array with empty entries until the 
        //array has reached a length of: n * 512 + 448 in bit.
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

          for (_index = 16; _index <= 79; _index++)
          {
            _w[_index] = SHA1.rotateLeft32(SHA1.CorrectNeg(_w[_index - 3] ^ _w[_index - 8] ^ _w[_index - 14] ^ _w[_index - 16]), 1);
          }//END for

          //
          // Initialize the working variables
          //
          _a = this._h0;
          _b = this._h1;
          _c = this._h2;
          _d = this._h3;
          _e = this._h4;

          //ch
          for (_index = 0; _index <= 19; _index++)
          {
            _temp = (SHA1.rotateLeft32(_a, 5) + SHA1.ch32(_b, _c, _d) + _e + this._k0 + _w[_index]) % 0x100000000;
            restOperation();
          }//END for

          //parity
          for (_index = 20; _index <= 39; _index++)
          {
            _temp = (SHA1.rotateLeft32(_a, 5) + SHA1.parity(_b, _c, _d) + _e + this._k1 + _w[_index]) % 0x100000000;
            restOperation();
          }

          //maj
          for (_index = 40; _index <= 59; _index++)
          {
            _temp = (SHA1.rotateLeft32(_a, 5) + SHA1.maj32(_b, _c, _d) + _e + this._k2 + _w[_index]) % 0x100000000;
            restOperation();
          }

          //parity
          for (_index = 60; _index <= 79; _index++)
          {
            _temp = (SHA1.rotateLeft32(_a, 5) + SHA1.parity(_b, _c, _d) + _e + this._k3 + _w[_index]) % 0x100000000;
            restOperation();
          }

          function restOperation()
          {
            _e = _d;
            _d = _c;
            _c = SHA1.rotateLeft32(_b, 30);
            _b = _a;
            _a = _temp;
          }

          this._h0 = (this._h0 + _a) % 0x100000000;
          this._h1 = (this._h1 + _b) % 0x100000000;
          this._h2 = (this._h2 + _c) % 0x100000000;
          this._h3 = (this._h3 + _d) % 0x100000000;
          this._h4 = (this._h4 + _e) % 0x100000000;

        }//END for

        _resultString = TS.Utils.Unsigned32BitIntegerToHexString(this._h0) +
        TS.Utils.Unsigned32BitIntegerToHexString(this._h1) +
        TS.Utils.Unsigned32BitIntegerToHexString(this._h2) +
        TS.Utils.Unsigned32BitIntegerToHexString(this._h3) +
        TS.Utils.Unsigned32BitIntegerToHexString(this._h4);
        return _resultString;
      }

    }//END class

  }//END module
}//END module 