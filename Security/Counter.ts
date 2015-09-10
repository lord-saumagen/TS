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

      if (TS.Security.RandomNumberGenerator == undefined)
      {
        _missingArray.push("TS.Security.RandomNumberGenerator");
      }

      if (_missingArray.length > 0)
      {
        throw new Error("TS.Security.Counter requires additional references to the following module(s) or class(es): " + _missingArray.join(", ") + ".");
      }//END if

    })();


    export class Counter extends TS.Security.Cryptography
    {
      /**
       * @retruns {Array<number>}, the nonce wich was used or
       *                           created during construction.
       */
      public get nonce(): Array<number>
      {
        return this._nonceArray;
      }

      /**
      * @returns { TS.Security.State}, the next counter state.
      * 
      * @throws {TS.IndexOutOfRangeException}
      */
      public get nextState(): TS.Security.State
      {
        return this.getNextState();
      }

      /**
      * @returns { TS.Security.State}, the next counter.
      * 
      * @throws {TS.IndexOutOfRangeException}
      */
      public get nextCounter(): number
      {
        return this.getNextCounter();
      }

      /**
       * @private
       */
      private _currentCounterValue: number;

      /**
       * @private
       */
      private _initialCounterValue: number;

      /**
       * @private
       */
      private _counterStarted: boolean;

      /**
       * @private
       */
      private _nonceArray: Array<number>;


      /*
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidOperationException}
      * @throws {TS.ArgumentNullUndefOrEmptyException}
      * @throws {TS.ArgumentOutOfRangeException}
      * @throws {TS.InvalidTypeException}
       */
      constructor(nonce: Array<number>);
      /*
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidOperationException}
      * @throws {TS.ArgumentNullUndefOrEmptyException}
      * @throws {TS.ArgumentOutOfRangeException}
      * @throws {TS.InvalidTypeException}
       */
      constructor(initialCounter: number)
      /**
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {TS.InvalidOperationException}
      */
      constructor()
      constructor()
      {
        var _index: number;
        var _counterByteArray: Array<number>;
              
        TS.Utils.checkConstructorCall(this, TS.Security.Counter);

        //Default constructor was called.
        if (arguments.length == 0)
        {
          this._nonceArray = this.createNonceArray();
          this._currentCounterValue = this._initialCounterValue = TS.Utils.byteArrayToUnsignedNumber(this._nonceArray.slice(12));
        }//END if

        if (arguments.length > 0)
        {
          TS.Utils.checkNotEmptyParameter(arguments[0], "nonce | initialCounter", "TS.Security.Counter.constructor");
          //Constructor with a nonce array was called.
          if (TS.Utils.Assert.isUnsignedByteArray(arguments[0]))
          {
            if (arguments[0].length != 16)
            {
              throw new TS.ArgumentOutOfRangeException("nonce", arguments[0], "Argument 'nonce' must be a byte array with 16 elements in function 'TS.Security.Counter.constructor'.");
            }//END if
            this._nonceArray = arguments[0].slice();
            this._currentCounterValue = this._initialCounterValue = TS.Utils.byteArrayToUnsignedNumber(arguments[0].slice(12));
          }//END else if

          //Constructor with an initial start value was called.
          else if (TS.Utils.Assert.isUnsignedIntegerNumber(arguments[0]))
          {
            if (arguments[0] > 0xFFFFFFFF)
            {
              throw new TS.ArgumentOutOfRangeException("initialCounter", arguments[0], "Argument 'initialCounter' must not exceed the maximum value of 0xFFFFFFFF in function TS.Security.Counter.constructor.");
            }//END if
            this._nonceArray = new Array<number>();
            for (_index = 0; _index < 12; _index++)
            {
              this._nonceArray.push(0);
            }//END for
            this._nonceArray.concat(TS.Utils.unsigned16BitIntegerTo4ByteArray(arguments[0]));
            this._currentCounterValue = this._initialCounterValue = arguments[0];
          }//END else if

          //Invalid call to this constructor.
          else
          {
            throw new TS.InvalidTypeException("nonce | initialCounter", arguments[0], "The argument in the constructor of 'TS.Security.Counter' has an invalid type. Error occured in function TS.Security.Counter.constructor.");
          }//END else
        }//END if

        super();

        this._counterStarted = false;
      }


      /**
      * @private
      * 
      * @returns {number} , the next counter value.
      * 
      * @throws {TS.IndexOutOfRangeException}
      */
      private getNextCounter(): number
      {
        if (!this._counterStarted)
        {
          this._counterStarted = true;
          return this._initialCounterValue;
        }//END if

        this._currentCounterValue++;

        if (this._counterStarted && (this._currentCounterValue == this._initialCounterValue))
        {
          throw new TS.IndexOutOfRangeException("The current counter exceeded the counter range which is 0xFFFFFFFF different values in function 'TS.Security.Counter.getNext'");
        }//END if

        if (this._currentCounterValue > 0xFFFFFFFF)
        {
          this._currentCounterValue = 0;
        }//END if

        return this._currentCounterValue;
      }

      /**
      * @private
      * 
      * @returns {TS.Security.State} , The next counter state.
      * 
      * @throws {TS.IndexOutOfRangeException}
      */
      private getNextState(): TS.Security.State
      {
        var _counterByteArray: Array<number>;

        _counterByteArray = TS.Utils.unsigned16BitIntegerTo4ByteArray(this.getNextCounter());

        return new TS.Security.State(this._nonceArray.slice(0, 12).concat(_counterByteArray));
      }

      /**
       * @private
       */
      private createNonceArray(): Array<number>
      {
        var _RNG: TS.Security.RandomNumberGenerator;
        var _IV: Array<number>;
        var _resultArray: Array<number>;
        var _key: Array<number>;

        _IV = [185, 78, 34, 160, 69, 3, 238, 110, 4, 92, 124, 48, 114, 45, 62, 129];
        _key = [65, 106, 63, 55, 45, 52, 52, 109, 194, 167, 101, 37, 120, 85, 98, 44]; //"Aj?7-44m§e%xUb,"
        _RNG = new TS.Security.RandomNumberGenerator(_key, _IV);
        return _RNG.next;
      }

    }//END class
  }//END module
}//END module