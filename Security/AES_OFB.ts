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
        throw new Error("TS.Security.AES_OFB requires additional references to the following module(s) or class(es): " + _missingArray.join(", ") + ".");
      }//END if

    })();


    /**
     * @class
     * @description This is an implementation of the OUTPUT FEEDBACK (OFB) operation
     *              mode as described in the NIST publication 800-38a, 
     *              'Recommendation for Block Cipher Modes of Operation'.
     * @see {@link hred=http://csrc.nist.gov/publications/nistpubs/800-38a/addendum-to-nist_sp800-38A.pdf}
     */
    export class AES_OFB extends AES
    {
      /** @private */
      private _IV: State;

      /**
      * @constructs
      * @param {Array<number>}, keyByteArray
      * @param { Array<number>} initialisationVector
      */
      constructor(keyByteArray: Array<number>,  initialisationVector: Array<number>)
      {
        TS.Utils.checkConstructorCall(this, TS.Security.AES_OFB);
        TS.Utils.checkNotEmptyParameter(keyByteArray, "keyByteArray", "TS.Security.AES_OFB.constructor");
        TS.Utils.checkKeyByteArray(keyByteArray, "keyByteArray", "TS.Security.AES_OFB.constructor");
        TS.Utils.checkNotEmptyParameter(initialisationVector, "initialisationVector", "TS.Security.AES_OFB.constructor");
        TS.Utils.checkUnsignedByteArrayParameter(initialisationVector, "initialisationVector", "TS.Security.AES_OFB.constructor");

        if (initialisationVector.length != 16)
        {
          throw new TS.ArgumentOutOfRangeException("initialisationVector", initialisationVector, "Argument 'initialisationVector' must be a byte array of the length 16 in function 'TS.Security.AES_OFB.constructor'.");
        }//END if

        super(keyByteArray);
        this._IV = new State(initialisationVector);
      }

      /**
       * @override
       * @throws {TS.ArgumentNullUndefOrEmptyException}
      * @throws {TS.InvalidTypeException}
       */
      public encrypt(plainDataByteArray: Array<number>): Array<number>
      {
        TS.Utils.checkNotEmptyParameter(plainDataByteArray, "plainDataByteArray", "TS.Security.AES_OFB.encrypt");
        TS.Utils.checkUnsignedByteArrayParameter(plainDataByteArray, "plainDataByteArray", "TS.Security.AES_OFB.encrypt");
        return this.encryptDecryptInternal(plainDataByteArray);
      }


      /**
       * @override
       * @throws {TS.ArgumentNullUndefOrEmptyException}
      * @throws {TS.InvalidTypeException}
       */
      public decrypt(cypherDataByteArray: Array<number>): Array<number>
      {

        TS.Utils.checkNotEmptyParameter(cypherDataByteArray, "plainDataByteArray", "TS.Security.AES_OFB.decrypt");
        TS.Utils.checkUnsignedByteArrayParameter(cypherDataByteArray, "cypherDataByteArray", "TS.Security.AES_OFB.decrypt");
        return this.encryptDecryptInternal(cypherDataByteArray);
      }


      /**
      * @override
      * @description Encrypts or decrypts the data given in argument 'dataByteArray'
      *              and returns the processed data as byte array.
      * 
      * @param {Array<number>} dataByteArray
      * 
      * @return {Array<number>}, the resulting encrypted or decrypted data as byte array.
      */
      protected encryptDecryptInternal(dataByteArray: Array<number>): Array<number>
      {
        var _index: number;
        var _dataSegment: Array<number>;
        var _numberOfFillBytes: number;
        var _state: State;
        var _dataState: State;
        var _resultByteArray: Array<number>;

        _index = 0;
        _resultByteArray = new Array<number>();
        _state = new State(this._IV.toArray());
        _numberOfFillBytes = 0;

        while (_index * 16 < dataByteArray.length)
        {
          _state.encrypt(this.workingKeyByteArray, this.rounds);
          _dataSegment = dataByteArray.slice(_index * 16, (_index + 1) * 16);
          while (_dataSegment.length < 16)
          {
            _dataSegment.push(0);
            _numberOfFillBytes++;
          }//END while
          _dataState = new State(_dataSegment)
          _dataState.xor(_state);
          _resultByteArray = _resultByteArray.concat(_dataState.toArray());
          _index++;
        }//END while

        while (_numberOfFillBytes > 0)
        {
          _resultByteArray.pop();
          _numberOfFillBytes--;
        }//END while

        return _resultByteArray;
      }
    }//END class

  }//END module
}//END module
