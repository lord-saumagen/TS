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

      if ((TS.Encoding == undefined) || (TS.Encoding.Base64 == undefined))
      {
        _missingArray.push("TS.Encoding.Base64");
      }

      if (TS.Security.Cryptography == undefined)
      {
        _missingArray.push("TS.Security.Cryptography");
      }

      if (TS.Security.State == undefined)
      {
        _missingArray.push("TS.Security.State");
      }

      if (TS.Security.State == undefined)
      {
        _missingArray.push("TS.Security.AES");
      }

      if (_missingArray.length > 0)
      {
        throw new Error("TS.Security.RandomNumberGenerator requires additional references to the following module(s) or class(es): " + _missingArray.join(", ") + ".");
      }//END if

    })();


    /**
    * @class
    * @classdesc This class is an implements of the Random Number Generator
    *            as described in the NIST publication:
    *            'NIST Recommended Random Number Generator Based On ANSI X9.31 Appendix A.2.4'.
    * 
    * @see {@link href=http://csrc.nist.gov/groups/STM/cavp/documents/rng/931rngext.pdf}
    */
    export class RandomNumberGenerator extends TS.Security.Cryptography
    {
      /*
       * @private
       */
      private _AES : TS.Security.AES
      private _state: TS.Security.State;

      /**
       * @description Returns the next array of 16 random bytes.
       */
      public get next() : Array<number>
      {
        return this.createNext();
      }


      /**
      * @constructs
      * @description Create a new RandomNumberGenerator instance with the key given in argument 
      *              'keyByteArray'. 
      *              The 'keyByteArray' must have a total length of 128, 192 or 256 bits. That means the
      *              'keyByteArray' array must have a length of either 16, 24 or 32. Using a 
      *              key which doesn't comply with that rule will raise an exception.
      *              The initialisationVector must be an array of 16 byte values which should 
      *              show a high level of entropy.
      * 
      * @param {Array<number>} keyByteArray
      * @param {Array<number>} initialisationVector, an array of 16 byte holding the initalisation vector.
      * 
      * @throws {TS.ArgumentNullUndefOrEmptyException}
      * @throws {TS.InvalidOperationException}
      * @throws {TS.ArgumentException}
      * @throws {TS.ArgumentOutOfRangeException}
      */
      constructor(keyByteArray: Array<number>,  initialisationVector: Array<number>)
      {
        TS.Utils.checkConstructorCall(this, TS.Security.RandomNumberGenerator);
        TS.Utils.checkNotEmptyParameter(keyByteArray, "keyByteArray", "TS.Security.RandomNumberGenerator.constructor");
        TS.Utils.checkKeyByteArray(keyByteArray, "keyByteArray", "TS.Security.RandomNumberGenerator.constructor");
        TS.Utils.checkNotEmptyParameter(initialisationVector, "initialisationVector", "TS.Security.RandomNumberGenerator.constructor");
        TS.Utils.checkUnsignedByteArrayParameter(initialisationVector, "initialisationVector", "TS.Security.RandomNumberGenerator.constructor");

        if (initialisationVector.length != 16)
        {
          throw new TS.ArgumentOutOfRangeException("initialisationVector", initialisationVector, "Argument 'initialisationVector' must be a byte array of the length 16 in function 'TS.Security.RandomNumberGenerator.constructor'.");
        }//END if

        super();
        this._AES = new TS.Security.AES(keyByteArray);
        this._state = new TS.Security.State(initialisationVector);
      }


      /**
      * @description Creates and returns the next array of 16 random
      *              bytes.
      * 
      * @returns {Array<number>} , an array of 16 random bytes.
      */
      private createNext(): Array<number>
      {
        var _intermediateState: State;
        var _resultState: State;
        var _dateTimeByteArry: Array<number>

        _dateTimeByteArry = TS.Security.padData(TS.Utils.unsignedIntegerToByteArray(new Date().valueOf()));
        _intermediateState = new State(this._AES.encrypt(_dateTimeByteArry));
        _intermediateState.xor(this._state);
        _resultState = new State(this._AES.encrypt(_intermediateState.toArray()));
        _intermediateState.xor(_resultState);
        this._state = new State(this._AES.encrypt(_intermediateState.toArray()));
        return _resultState.toArray();
      }

    }//END class
  }//END module
}//END module