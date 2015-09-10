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

      if (TS.Exception == undefined)
      {
        _missingArray.push("TS.Exception");
      }

      if (TS.Security.Cryptography == undefined)
      {
        _missingArray.push("TS.Security.Cryptography");
      }

      if (TS.Security.State == undefined)
      {
        _missingArray.push("TS.Security.State");
      }

      if (TS.Security.AES == undefined)
      {
        _missingArray.push("TS.Security.AES");
      }

      if (_missingArray.length > 0)
      {
        throw new Error("TS.Security.AES_CBC requires additional references to the following module(s) or class(es): " + _missingArray.join(", ") + ".");
      }//END if

    })();


    /**
     * @class
     * @description This is an implementation of the CIPHER BLOCK CHAINING (CBC) operation
     *              mode as described in the NIST publication 800-38a, 
     *              'Recommendation for Block Cipher Modes of Operation'.
     * @see {@link href=http://csrc.nist.gov/publications/nistpubs/800-38a/addendum-to-nist_sp800-38A.pdf}
     */
    export class AES_CBC extends AES
    {
      /** 
      * @private 
      */
      private _IV: State;

      /**
      * @constructs
      * @description Create a new AES_CBC instance with the key given in argument 'keyByteArray' and
      *              the initialisation vector given in argument 'initialisationVector'.
      *              The 'keyByteArray' must have a total length of 128, 192 or 256 bits. That means the
      *              'keyByteArray' array must have a length of either 16, 24 or 32. Using a 
      *              key which doesn't comply with that rule will raise an exception.
      *              The initialisation vector must be an array of unsigned byte values with a total
      *              of 16 elements.
      * 
      * @param {Array<number>} keyByteArray, an array of [16 | 24 | 32] byte holding the key.
      * @param {Array<number>} initialisationVector, array of 16 unsigned byte values.
      * 
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidOperationException}
      * @throws {TS.ArgumentNullUndefOrEmptyException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.ArgumentOutOfRangeException}
      */
      constructor(keyByteArray: Array<number>, initialisationVector: Array<number>)
      {
        TS.Utils.checkConstructorCall(this, TS.Security.AES_CBC);
        TS.Utils.checkNotEmptyParameter(keyByteArray, "keyByteArray", "TS.Security.AES_CBC.constructor");
        TS.Utils.checkKeyByteArray(keyByteArray, "keyByteArray", "TS.Security.AES_CBC.constructor");
        TS.Utils.checkNotEmptyParameter(initialisationVector, "initialisationVector", "TS.Security.AES_CBC.constructor");
        TS.Utils.checkUnsignedByteArrayParameter(initialisationVector, "initialisationVector", "TS.Security.AES_CBC.constructor");
        
        if (initialisationVector.length != 16)
        {
          throw new TS.ArgumentOutOfRangeException("initialisationVector", initialisationVector, "Argument 'initialisationVector' must be a byte array of the length 16 in function 'TS.Security.AES_CBC.constructor'.");
        }//END if

        super(keyByteArray);

        this._IV = new State(initialisationVector);
      }


      /**
      * @override
      * @throws {TS.ArgumentNullUndefOrEmptyException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.ArgumentException}
      */
      public encrypt(plainDataByteArray: Array<number>): Array<number>
      {
        var _index: number;
        var _state: State;
        var _previousState: State;
        var _resultByteArray: Array<number>;

        TS.Utils.checkNotEmptyParameter(plainDataByteArray, "plainDataByteArray", "TS.Security.AES_CBC.encrypt");
        TS.Utils.checkUnsignedByteArrayParameter(plainDataByteArray, "plainDataByteArray", "TS.Security.AES_CBC.encrypt");

        if ((plainDataByteArray.length % 16) != 0)
        {
          throw new TS.ArgumentException("plainDataByteArray", plainDataByteArray, "The 'plainDataByteArray' must have a lenght which is a multiple of 16 (the AES block size). Use the 'padData' function in oder to give your data an appropriate length.");
        }//END if

        _index = 0;
        _previousState = this._IV;
        _resultByteArray = new Array<number>();

        while (_index * 16 < plainDataByteArray.length)
        {
          _state = new State(plainDataByteArray.slice(_index * 16, (_index + 1) * 16))
          _state.xor( _previousState);
          _state.encrypt(this.workingKeyByteArray, this.rounds);
          _resultByteArray = _resultByteArray.concat(_state.toArray());
          _previousState = new State(_state.toArray());
          _index++;
        }//END while

        return _resultByteArray;
      }


      /**
      * @override
      * @throws {TS.ArgumentNullUndefOrEmptyException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.ArgumentException}
      */
      public decrypt(cypherDataByteArray: Array<number>): Array<number>
      {
        var _index: number;
        var _state: State;
        var _previousState: State;
        var _resultByteArray: Array<number>;

        TS.Utils.checkNotEmptyParameter(cypherDataByteArray, "plainDataByteArray", "TS.Security.AES_CBC.encrypt");
        TS.Utils.checkUnsignedByteArrayParameter(cypherDataByteArray, "cypherDataByteArray", "TS.Security.AES_CBC.decrypt");

        if ((cypherDataByteArray.length % 16) != 0)
        {
          throw new TS.ArgumentException("cypherDataByteArray", cypherDataByteArray, "The 'cypherDataByteArray' must have a lenght which is a multiple of 16 (the AES block size). Use the 'padData' function in oder to give your data an appropriate length.");
        }//END if

        _index = 0;
        _previousState = this._IV;
        _resultByteArray = new Array<number>();

        while (_index * 16 < cypherDataByteArray.length)
        {
          _state = new State(cypherDataByteArray.slice(_index * 16, (_index + 1) * 16))
          _state.decrypt(this.workingKeyByteArray, this.rounds);
          _state.xor(_previousState);
          _resultByteArray = _resultByteArray.concat(_state.toArray());
          _previousState = new State(cypherDataByteArray.slice(_index * 16, (_index + 1) * 16));
          _index++;
        }//END while

        return _resultByteArray;
      }

    }//END class
  }//END module
}//END module