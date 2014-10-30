module TS
{
  "use strict";

  export class Exception implements Error
  {
    private _message: string;
    private _innerException: Exception;

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

    public get message(): string
    {
      return this._message;
    }

    public get innerException(): Exception
    {
      return this._innerException;
    }

    /**
    *  @constructs
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
    constructor(message?: string, innerException?: Exception)
    constructor(argumentName: string, argumentValue: any, message?: string, innerException?: Exception)
    constructor(argumentName?: string, argumentValue?: any, message?: string, innerException?: Exception)
    {
      super(message, innerException);
      (TS.Utils.TypeInfo.isNullOrUndefined(argumentName)) ? this._argumentName = "" : this._argumentName = argumentName;
      (TS.Utils.TypeInfo.isNullOrUndefined(argumentValue)) ? this._argumentValue = "" : this._argumentValue = argumentValue;
    }
  }//END class

}//END module 