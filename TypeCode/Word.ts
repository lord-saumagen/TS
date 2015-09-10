module TS
{
  "use strict";

  export module TypeCode
  {

    export class Word
    {
      private _byteArray: Array<number>;

      /**
      *  @throws TS.ArgumentNullOrUndefinedException
      *  @throws TS.InvalidTypeException
      *  @throws TS.InvalidOperationException
      */
      public constructor(positiveInteger: number)
      /**
      *  @throws TS.ArgumentNullOrUndefinedException
      *  @throws TS.InvalidOperationException
      */
      public constructor()
      public constructor()
      {
        TS.Utils.checkConstructorCall(this, TS.TypeCode.Word);
        this._byteArray = new Array<number>();

        if (arguments.length == 1)
        {
          TS.Utils.checkUnsignedIntegerNumberParameter(arguments[0], "positiveInteger", "constructor of TS.TypeCode.Word");
          this._byteArray[0] = arguments[0] / 0xFFFFFF;
          this._byteArray[1] = (arguments[0] / 0xFFFF) % 0xFF;
          this._byteArray[2] = (arguments[0] / 0xFF) % 0xFFFF;
          this._byteArray[3] = arguments[0] % 0xFFFFFF;

        }//END if
        else
        {

          this._byteArray.push(0);
          this._byteArray.push(0);
          this._byteArray.push(0);
          this._byteArray.push(0);
        }
      }

      public fromInteger(positiveInteger: number)
      {
        TS.Utils.checkParameter(positiveInteger, "positiveInteger", "TS.TypeCode.Word.constructor");
        TS.Utils.checkUnsignedIntegerNumberParameter(positiveInteger, "positiveInteger", "TS.TypeCode.Word.constructor");
      }

      public toInteger(): number
      {
        return (((((this._byteArray[0] * 256) + this._byteArray[1]) * 256) + this._byteArray[2]) * 256) + this._byteArray[3];
      }

    }//END class
  }//END module
}//END module
 