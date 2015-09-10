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

      if (TS.Security.Counter == undefined)
      {
        _missingArray.push("TS.Security.Counter");
      }

      if (TS.Security.AES == undefined)
      {
        _missingArray.push("TS.Security.AES");
      }

      if (_missingArray.length > 0)
      {
        throw new Error("TS.Security.AES_CTR requires additional references to the following module(s) or class(es): " + _missingArray.join(", ") + ".");
      }//END if

    })();



    /**
    * @class
    * @description This is an implementation of the COUNTER (CTR) operation
    *              mode as described in the NIST publication 800-38a, 
    *              'Recommendation for Block Cipher Modes of Operation'.
    * @see {@link hred=http://csrc.nist.gov/publications/nistpubs/800-38a/addendum-to-nist_sp800-38A.pdf}
    */
    export class AES_CTR extends AES
    {
      /**
      * @private
      */
      private _CTR: TS.Security.Counter;

      /**
      * @description That property give access to the nonce which is actually used in 
      *              this AES_CTR object. You need to store this nonce along wiht your
      *              encrypted data. Otherwies you won't be able to decrypt the data
      *              anymore.
      *
      * @returns {Array<number>}, the nonce as array of 16 byte values.
      */
      public get nonce(): Array<number>
      {
        return this._CTR.nonce;
      }

      /**
      * @constructs
      * @description Create a new AES_CTR instance with the key given in argument 'keyByteArray' 
      *              and the nonce given in argument 'nonce' 
      *              The 'keyByteArray' must have a total length of 128, 192 or 256 bits. That means the
      *              'keyByteArray' array must have a length of either 16, 24 or 32. Using a 
      *              key which doesn't comply with that rule will raise an exception.
      *              The 'counterValue' must be a value in the range of [0..0xFFFF]. 
      * 
      * @param {Array<number>} keyByteArray, an array of [16 | 24 | 32] byte holding the key.
      * @param {number} counterValue, a value in the range [0..0xFFFF].
      * 
      * @trhows {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.ArgumentNullUndefOrEmptyException}
      * @throws {TS.InvalidOperationException}
      * @throws {TS.ArgumentException}
      * @throws {TS.ArgumentOutOfRangeException}
      */
      constructor(keyByteArray: Array<number>, counterValue : number);
      /**
      * @constructs
      * @description Create a new AES_CTR instance with the key given in argument 'keyByteArray' 
      *              and the nonce given in argument 'nonce' 
      *              The 'keyByteArray' must have a total length of 128, 192 or 256 bits. That means the
      *              'keyByteArray' array must have a length of either 16, 24 or 32. Using a 
      *              key which doesn't comply with that rule will raise an exception.
      *              The nonce must be a byte array with 16 elements. 
      * 
      * @param {Array<number>} keyByteArray, an array of [16 | 24 | 32] byte holding the key.
      * @param {Array<number>} nonce, an array of 16 byte value elements.
      * 
      * @throws {TS.ArgumentNullUndefOrEmptyException}
      * @throws {TS.InvalidOperationException}
      * @throws {TS.ArgumentException}
      * @throws {TS.ArgumentOutOfRangeException}
      */
      constructor(keyByteArray: Array<number>, nonce: Array<number>);
      /**
      * @constructs
      * @description Create a new AES_CTR instance with the key given in argument 'keyByteArray'.
      *              The 'keyByteArray' must have a total length of 128, 192 or 256 bits. That means the
      *              'keyByteArray' array must have a length of either 16, 24 or 32. Using a 
      *              key which doesn't comply with that rule will raise an exception.
      *              You can use this constructor when you plan to encrypt some data with the
      *              created 'AES_CTR' object. The constructor creates a random nonce which will
      *              be used during the encryption process. You can allways access the actually
      *              used nonce by reading out the 'nonce' property of the 'AES_CTR' object.
      *              You must store that nonce together with the enrypted data. You will need
      *              that nonce for the deryption process. 
      * 
      * @param {Array<number>} keyByteArray, an array of [16 | 24 | 32] byte holding the key.
      * 
      * @throws {TS.TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidOperationException}
      * @throws {TS.ArgumentNullUndefOrEmptyException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.ArgumentOutOfRangeException}
      */
      constructor(keyByteArray: Array<number>)

      constructor(keyByteArray: Array<number>)
      {
        TS.Utils.checkConstructorCall(this, TS.Security.AES_CTR);
        TS.Utils.checkNotEmptyParameter(keyByteArray, "keyByteArray", "TS.Security.AES_CTR.constructor");
        TS.Utils.checkKeyByteArray(keyByteArray, "keyByteArray", "TS.Security.AES_CTR.constructor");
        
        if (arguments.length > 1)
        {
          if (TS.Utils.Assert.isUnsignedByteArray(arguments[1]))
          {
            if (arguments[1].length != 16)
            {
              throw new TS.ArgumentOutOfRangeException("nonce", arguments[1], "Argument 'nonce' must be a byte value array with 16 elements in function 'TS.Security.AES_CTR.constructor'.");
            }//END if
            this._CTR = new TS.Security.Counter(arguments[1]);
          }//END if
          else if (TS.Utils.Assert.isUnsignedIntegerNumber(arguments[1]))
          {
            if (arguments[1] > 0xFFFFFFFF)
            {
              throw new TS.ArgumentOutOfRangeException("counterValue", arguments[1], "Argument 'counterValue' must not exceed the maximum allowed value: '" + 0xFFFFFFFF.toString() + "' in function 'TS.Security.AES_CTR.constructor'.");
            }//END if
            this._CTR = new TS.Security.Counter(arguments[1]);
          }//END if
          else
          {
            throw new TS.InvalidTypeException("nonce | counterValue", arguments[1], "The second argument in the constructor of 'TS.Security.AES_CTR' has an invalid type. Error occured in 'TS.Security.AES_CTR.constructor'.");
          }//END else
        }//END if
        else
        {
          this._CTR = new TS.Security.Counter();
        }//END else

        super(keyByteArray);
      }


      /**
      * @override
      * @description Enryts the data given in argument 'plainDataByteArray' and
      *              returns the encrypted data as byte array.
      *              This function uses the Key and initialisation vector which 
      *              was set in the constructor. The function uses the 8 bit 
      *              segment length internally.
      * 
      * @returns {Array<number>} The encrypted data as byte array.
      * 
      * @throws {TS.ArgumentNullUndefOrEmptyException}
      * @throws {TS.InvalidTypeException}
      */
      public encrypt(plainDataByteArray: Array<number>): Array<number>
      {
        TS.Utils.checkNotEmptyParameter(plainDataByteArray, "plainDataByteArray", "TS.Security.AES_CFB.encrypt");
        TS.Utils.checkUnsignedByteArrayParameter(plainDataByteArray, "plainDataByteArray", "TS.Security.AES_CFB.encrypt");

        return this.encryptDecryptInternal(plainDataByteArray);
      }


      /**
      * @override
      * @description Decryts the data given in argument 'plainDataByteArray' and
      *              returns the decrypted data as byte array.
      *              This function uses the Key and initialisation vector which 
      *              was set in the constructor. The function uses the 8 bit 
      *              segment length internally.
      * 
      * @returns {Array<number>} The decrypted data as byte array.
      * 
      * @throws {TS.ArgumentNullUndefOrEmptyException}
      * @throws {TS.InvalidTypeException}
      */
      public decrypt(cipherDataByteArray: Array<number>): Array<number>
      {
        TS.Utils.checkNotEmptyParameter(cipherDataByteArray, "cipherDataByteArray", "TS.Security.AES_CFB.decrypt");
        TS.Utils.checkUnsignedByteArrayParameter(cipherDataByteArray, "cipherDataByteArray", "TS.Security.AES_CFB.decrypt");

        return this.encryptDecryptInternal(cipherDataByteArray);
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
        _numberOfFillBytes = 0;
        this._CTR = new TS.Security.Counter(this.nonce);

        while (_index * 16 < dataByteArray.length)
        {
          _state = this._CTR.nextState;
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
 