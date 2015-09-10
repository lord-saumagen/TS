module TS
{
  "use strict";

  export class Exception implements Error
  {
    private _message: string;
    private _innerException: Exception;
    static _name: string;

    public get innerException(): Exception
    {
      return this._innerException;
    }

    /**
    *  @implemnts
    *    Error.message
    */
    public get message(): string
    {
      return this._message;
    }

    /**
    *  @implemnts
    *    Error.name
    */
    public get name(): string
    {
      return this.type;
    }

    public get type(): string
    {
      return "TS.Exception";
    }

    /**
    *  @constructs
    *    TS.Exception
    */
    constructor(message?: string, innerException?: Exception)
    {
      this._message = (message) ? message : "";
      this._innerException = (innerException) ? innerException : null;
    }

    /**
    *  @overwrite
    *    Object.toString
    */
    public toString(): string
    {
      return this.type + ((this.message.length > 0) ? " :: " + this.message : "");
    }

  }//END class


  //********************************************************************************
  // Argument exception
  //********************************************************************************

  export class ArgumentException extends Exception
  {
    private _argumentName: string;
    private _argumentValue: any;

    /**
    *  @overwrite
    */
    public get type(): string
    {
      return "TS.ArgumentException";
    }

    get argumentName(): string
    {
      return this._argumentName;
    }

    get argumentValue(): any
    {
      return this._argumentValue;
    }

    /**
    *  @constructs
    */
    constructor(argumentName: string, argumentValue: any, message?: string, innerException?: Exception)
    {
      super(message, innerException);
      this._argumentName = (argumentName) ? argumentName : "";
      this._argumentValue = argumentValue;
    }

  }//END class


  export class ArgumentNullException extends Exception
  {
    private _argumentName: string;

    /**
    *  @overwrite
    */
    public get type(): string
    {
      return "TS.ArgumentNullException";
    }

    get argumentName(): string
    {
      return this._argumentName;
    }

    /**
    *  @constructs
    */
    constructor(argumentName: string, message?: string, innerException?: Exception)
    {
      super(message, innerException);
      this._argumentName = (argumentName) ? argumentName : "";
    }

  }//END class


  export class ArgumentNullOrUndefinedException extends Exception
  {
    private _argumentName: string;

    /**
    *  @overwrite
    */
    public get type(): string
    {
      return "TS.ArgumentNullOrUndefinedException";
    }

    get argumentName(): string
    {
      return this._argumentName;
    }

    /**
    *  @constructs
    */
    constructor(argumentName: string, message?: string, innerException?: Exception)
    {
      super(message, innerException);
      this._argumentName = (argumentName) ? argumentName : "";
    }
  }//END class



  export class ArgumentNullUndefOrEmptyException extends Exception
  {
    private _argumentName: string;

    /**
    *  @overwrite
    */
    public get type(): string
    {
      return "TS.ArgumentNullUndefOrEmptyException";
    }

    get argumentName(): string
    {
      return this._argumentName;
    }

    /**
    *  @constructs
    */
    constructor(argumentName: string, message?: string, innerException?: Exception)
    {
      super(message, innerException);
      this._argumentName = (argumentName) ? argumentName : "";
    }
  }//END class


  export class ArgumentNullUndefOrWhiteSpaceException extends Exception
  {
    private _argumentName: string;

    /**
    *  @overwrite
    */
    public get type(): string
    {
      return "TS.ArgumentNullUndefOrWhiteSpaceException";
    }

    get argumentName(): string
    {
      return this._argumentName;
    }

    /**
    *  @constructs
    */
    constructor(argumentName: string, message?: string, innerException?: Exception)
    {
      super(message, innerException);
      this._argumentName = (argumentName) ? argumentName : "";
    }
  }//END class


  export class ArgumentOutOfRangeException extends ArgumentException
  {
    /**
    *  @overwrite
    */
    public get type(): string
    {
      return "TS.ArgumentOutOfRangeException";
    }

    /**
    *  @constructs
    */
    constructor(argumentName: string, argumentValue: any, message?: string, innerException?: Exception)
    {
      super(argumentName, argumentValue, message, innerException);
    }

  }//END class


  export class ArgumentUndefinedException extends ArgumentException
  {
    /**
    *  @overwrite
    */
    public get type(): string
    {
      return "TS.ArgumentUndefinedException";
    }

    /**
    *  @constructs
    */
    constructor(argumentName: string,  message?: string, innerException?: Exception)
    {
      super(argumentName, undefined, message, innerException);
    }

  }//END class

  //********************************************************************************
  // Index exceptions
  //********************************************************************************

  export class IndexOutOfRangeException extends Exception
  {
    /**
    *  @overwrite
    */
    public get type(): string
    {
      return "TS.IndexOutOfRangeException";
    }

    /**
    *  @constructs
    */
    constructor(message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }
  }//END class


  //********************************************************************************
  // Invalid operation exceptions
  //********************************************************************************

  export class InvalidOperationException extends Exception
  {
    /**
    *  @overwrite
    */
    public get type(): string
    {
      return "TS.InvalidOperationException";
    }

    /**
    *  @constructs
    */
    constructor(message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }
  }//END class

  //********************************************************************************
  // Invalid cast exception
  //********************************************************************************

  export class InvalidCastException extends Exception
  {
    /**
    *  @overwrite
    */
    public get type(): string
    {
      return "TS.InvalidCastException";
    }

    /**
    *  @constructs
    */
    constructor(message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }
  }//END class

  //********************************************************************************
  // Invalid format exception
  //********************************************************************************

  export class InvalidFormatException extends Exception
  {
    private _argumentName: string;
    private _argumentValue: any;

    /**
    *  @overwrite
    */
    public get type(): string
    {
      return "TS.InvalidFormatException";
    }

    get argumentName(): string
    {
      return this._argumentName;
    }

    get argumentValue(): any
    {
      return this._argumentValue;
    }

    /**
    *  @constructs
    */
    constructor(argumentName: string, argumentValue: any, message?: string, innerException?: Exception)
    {
      super(message, innerException);
      (TS.Utils.Assert.isNullOrUndefined(argumentName)) ? this._argumentName = "" : this._argumentName = argumentName;
      (TS.Utils.Assert.isNullOrUndefined(argumentValue)) ? this._argumentValue = "" : this._argumentValue = argumentValue;
    }
  }//END class

  //********************************************************************************
  // Invalid type exception
  //********************************************************************************

  export class InvalidTypeException extends Exception
  {
    private _argumentName: string;
    private _argumentValue: any;

    /**
    *  @overwrite
    */
    public get type(): string
    {
      return "TS.InvalidTypeException";
    }

    get argumentName(): string
    {
      return this._argumentName;
    }

    get argumentValue(): any
    {
      return this._argumentValue;
    }

    /**
    *  @constructs
    */
    constructor(argumentName: string, argumentValue: any, message?: string, innerException?: Exception)
    {
      super(message, innerException);
      (TS.Utils.Assert.isNullOrUndefined(argumentName)) ? this._argumentName = "" : this._argumentName = argumentName;
      (TS.Utils.Assert.isNullOrUndefined(argumentValue)) ? this._argumentValue = "" : this._argumentValue = argumentValue;
    }
  }//END class

  //********************************************************************************
  // ArithmeticException
  //********************************************************************************

  /**
  *  @description
  *    The exception that is thrown for errors in an arithmetic, casting, or conversion operation.
  *    ArithmeticException is the base class for DivideByZeroException, NotFiniteNumberException, 
  *    and OverflowException. In general, use one of the derived classes of ArithmeticException 
  *    to more precisely indicate the exact nature of the error. Throw an ArithmeticException if 
  *    you are only interested in capturing a general arithmetic error.
  */
  export class ArithmeticException extends Exception
  {

    /**
    *  @overwrite
    */
    public get type(): string
    {
      return "TS.ArithmeticException";
    }


    /**
    *  @constructs
    */
    constructor(message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }

  }//END class


  /**
  *  @description
  *    The exception that should be thrown when an arithmetic, casting, or 
  *    conversion operation results in an overflow.
  */
  export class OverflowException extends ArithmeticException
  {

    /**
    *  @overwrite
    */
    public get type(): string
    {
      return "TS.OverflowException";
    }

    /**
    *  @constructs
    */
    constructor(message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }

  }//END class

  /**
  *  @description
  *    The exception that should be thrown when there is an attempt to divide a 
  *    number value by zero.
  */
  export class DivideByZeroException extends ArithmeticException
  {

    /**
    *  @overwrite
    */
    public get type(): string
    {
      return "TS.DivideByZeroException";
    }

    /**
    *  @constructs
    */
    constructor(message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }

  }//END class


  /**
  *  @description The exception that should be thrown when a number value is positive infinity, 
  *               negative infinity, or Not-a-Number (NaN).
  */
  export class NotFiniteNumberException extends ArithmeticException
  {

    /**
    *  @overwrite
    */
    public get type(): string
    {
      return "TS.NotFiniteNumberException";
    }

    /**
    *  @constructs
    */
    constructor(message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }

  }//END class

  //********************************************************************************
  // Infrastructure Exceptions
  //********************************************************************************

  /**
  *  @description Throw this exception to signal that a function of class 
  *               is not fully implemented.
  */
  export class NotImplementedException extends Exception
  {
    /**
    *  @overwrite
    */
    public get type(): string
    {
      return "TS.NotImplementedException";
    }

    /**
    *  @constructs
    */
    constructor(message?:string, innerException? : Exception)
    {
      super(message, innerException);
    }
  }

  /**
  *  @description Throw this exception to signal that a function of class 
  *               should not longer be used.
  */
  export class DeprecatedException extends Exception
  {
    /**
    *  @overwrite
    */
    public get type(): string
    {
      return "TS.DeprecatedException";
    }

    /**
    *  @constructs
    */
    constructor(message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }
  }

}//END module 