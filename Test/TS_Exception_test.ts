"use strict";

module TS_Exception_test
{


  QUnit.module("TS.Exceptions",
    {
      setupOnce: function ()
      {
        // runs once before anything else in the module
      },
      setup: function ()
      {
        // prepare something for all following tests
      },
      teardown: function ()
      {
        // clean up after each test
      },
      teardownOnce: function ()
      {
        // runs once after all unit tests finished (including teardown)
      }
    });

  QUnit.test("TS.ArgumentException", function (assert)
  {
    var ExceptionMessage = "Argument exception message";

    assert.throws(function ()
    {
      throw new TS.ArgumentException("ArgName", 5, ExceptionMessage);
    }, new TS.ArgumentException("ArgName", 5, ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.ArgumentException("ArgName", 5, ExceptionMessage, GetInnerException());
    },
      function (err)
      {
        if (err.message == ExceptionMessage)
        {
          if (CheckInnerException(err))
          {
            return true;
          }//END if
        }//END if
        return false;
      }, "Should raise an exception instance of the expected type with an inner exception.");
  });

  QUnit.test("TS.ArgumentNullException", function (assert)
  {
    var ExceptionMessage = "ArgumentNull exception message";

    assert.throws(function ()
    {
      throw new TS.ArgumentNullException("ArgName", ExceptionMessage);
    }, new TS.ArgumentNullException("ArgName", ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.ArgumentNullException("ArgName", ExceptionMessage, GetInnerException());
    },
      function (err)
      {
        if (err.message == ExceptionMessage)
        {
          if (CheckInnerException(err))
          {
            return true;
          }//END if
        }//END if
        return false;
      }, "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.ArgumentNullOrUndefinedException", function (assert)
  {
    var ExceptionMessage = "ArgumentNullOrUndefined exception message";

    assert.throws(function ()
    {
      throw new TS.ArgumentNullOrUndefinedException("ArgName", ExceptionMessage);
    }, new TS.ArgumentNullOrUndefinedException("ArgName", ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.ArgumentNullOrUndefinedException("ArgName", ExceptionMessage, GetInnerException());
    },
      function (err)
      {
        if (err.message == ExceptionMessage)
        {
          if (CheckInnerException(err))
          {
            return true;
          }//END if
        }//END if
        return false;
      }, "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.ArgumentNullUndefOrWhiteSpaceException", function (assert)
  {
    var ExceptionMessage = "ArgumentNullUndefOrWhiteSpaceException exception message";

    assert.throws(function () 
    {
      throw new TS.ArgumentNullUndefOrWhiteSpaceException("ArgName", ExceptionMessage);
    }, new TS.ArgumentNullUndefOrWhiteSpaceException("ArgName", ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.ArgumentNullOrUndefinedException("ArgName", ExceptionMessage, GetInnerException());
    },
      function (err)
      {
        if (err.message == ExceptionMessage)
        {
          if (CheckInnerException(err))
          {
            return true;
          }//END if
        }//END if
        return false;
      }, "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.ArgumentOutOfRangeException", function (assert)
  {
    var ExceptionMessage = "ArgumentOutOfRange exception message";

    assert.throws(function ()
    {
      throw new TS.ArgumentOutOfRangeException("ArgName", 12, ExceptionMessage);
    }, new TS.ArgumentOutOfRangeException("ArgName", 12, ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.ArgumentOutOfRangeException("ArgName", 12, ExceptionMessage, GetInnerException());
    },
      function (err)
      {
        if (err.message == ExceptionMessage)
        {
          if (CheckInnerException(err))
          {
            return true;
          }//END if
        }//END if
        return false;
      }, "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.ArgumentUndefinedException", function (assert)
  {
    var ExceptionMessage = "ArgumentUndefinedException exception message";

    assert.throws(function ()
    {
      throw new TS.ArgumentUndefinedException("ArgName", ExceptionMessage);
    }, new TS.ArgumentUndefinedException("ArgName",  ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.ArgumentUndefinedException("ArgName", ExceptionMessage, GetInnerException());
    },
      function (err)
      {
        if (err.message == ExceptionMessage)
        {
          if (CheckInnerException(err))
          {
            return true;
          }//END if
        }//END if
        return false;
      }, "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.ArithmeticException", (assert) => 
  {
    var ExceptionMessage = "Arithmetic exception message";

    assert.throws(function ()
    {
      throw new TS.ArithmeticException(ExceptionMessage);
    }, new TS.ArithmeticException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.ArithmeticException(ExceptionMessage, GetInnerException());
    },
      function (err)
      {
        if (err.message == ExceptionMessage)
        {
          if (CheckInnerException(err))
          {
            return true;
          }//END if
        }//END if
        return false;
      }, "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.DivideByZeroException", (assert) => 
  {
    var ExceptionMessage = "Divide by zero exception message";

    assert.throws(function ()
    {
      throw new TS.DivideByZeroException(ExceptionMessage);
    }, new TS.DivideByZeroException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.DivideByZeroException(ExceptionMessage, GetInnerException());
    },
      function (err)
      {
        if (err.message == ExceptionMessage)
        {
          if (CheckInnerException(err))
          {
            return true;
          }//END if
        }//END if
        return false;
      }, "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.Exception", function (assert)
  {
    var ExceptionMessage = "Exception message";

    assert.throws(function ()
    {
      throw new TS.Exception(ExceptionMessage);
    }, new TS.Exception(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.Exception(ExceptionMessage, GetInnerException());
    },
      function (err)
      {
        if (err.message == ExceptionMessage)
        {
          if (CheckInnerException(err))
          {
            return true;
          }//END if
        }//END if
        return false;
      }, "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.IndexOutOfRangeException", function (assert)
  {
    var ExceptionMessage = "IndexOutOfRange exception message";

    assert.throws(function ()
    {
      throw new TS.IndexOutOfRangeException(ExceptionMessage);
    }, new TS.IndexOutOfRangeException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.IndexOutOfRangeException(ExceptionMessage, GetInnerException());
    },
      function (err)
      {
        if (err.message == ExceptionMessage)
        {
          if (CheckInnerException(err))
          {
            return true;
          }//END if
        }//END if
        return false;
      }, "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.InvalidCastException", function (assert)
  {
    var ExceptionMessage = "InvalidCast exception message";

    assert.throws(function ()
    {
      throw new TS.InvalidCastException(ExceptionMessage);
    }, new TS.InvalidCastException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.InvalidCastException(ExceptionMessage, GetInnerException());
    },
      function (err)
      {
        if (err.message == ExceptionMessage)
        {
          if (CheckInnerException(err))
          {
            return true;
          }//END if
        }//END if
        return false;
      }, "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.InvalidOperationException", function (assert)
  {
    var ExceptionMessage = "Invalid operation exception message";

    assert.throws(function ()
    {
      throw new TS.InvalidOperationException(ExceptionMessage);
    }, new TS.InvalidOperationException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.InvalidOperationException(ExceptionMessage, GetInnerException());
    },
      function (err)
      {
        if (err.message == ExceptionMessage)
        {
          if (CheckInnerException(err))
          {
            return true;
          }//END if
        }//END if
        return false;
      }, "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.InvalidTypeException", function (assert)
  {
    var ExceptionMessage = "Invalid type exception message";

    assert.throws(function ()
    {
      throw new TS.InvalidTypeException("ArgName", "NOP", ExceptionMessage);
    }, new TS.InvalidTypeException("ArgName", "NOP", ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.InvalidTypeException("ArgName", "NOP", ExceptionMessage, GetInnerException());
    },
      function (err)
      {
        if (err.message == ExceptionMessage)
        {
          if (CheckInnerException(err))
          {
            return true;
          }//END if
        }//END if
        return false;
      }, "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.NotFiniteNumberException", (assert) => 
  {
    var ExceptionMessage = "Not finite number exception message";

    assert.throws(function ()
    {
      throw new TS.NotFiniteNumberException(ExceptionMessage);
    }, new TS.NotFiniteNumberException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.NotFiniteNumberException(ExceptionMessage, GetInnerException());
    },
      function (err)
      {
        if (err.message == ExceptionMessage)
        {
          if (CheckInnerException(err))
          {
            return true;
          }//END if
        }//END if
        return false;
      }, "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.OverflowException", (assert) => 
  {
    var ExceptionMessage = "Overflow exception message";

    assert.throws(function ()
    {
      throw new TS.OverflowException(ExceptionMessage);
    }, new TS.OverflowException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.OverflowException(ExceptionMessage, GetInnerException());
    },
      function (err)
      {
        if (err.message == ExceptionMessage)
        {
          if (CheckInnerException(err))
          {
            return true;
          }//END if
        }//END if
        return false;
      }, "Should raise an exception instance of the expected type with an inner exception.");
  });





  /**
  *  @description
  *    Creates and returns a new exception of type
  *    TS.Exception with the message text:
  *    "Inner exception message".
  */
  function GetInnerException(): TS.Exception
  {
    return new TS.Exception("Inner exception message");
  }


  /**
  *  @description
  *    Checks that the exception given in argument 
  *    'exception' has the message text: 
  *    "Inner exception message".
  */
  function CheckInnerException(exception: TS.Exception): boolean
  {
    if (TS.Utils.TypeInfo.isNullOrUndefined(TS.Exception))
    {
      return false;
    }//END if

    if (TS.Utils.TypeInfo.isNullOrUndefined(exception.innerException))
    {
      return false;
    }//END if

    if (exception.innerException.message == "Inner exception message")
    {
      return true;
    }//END if
  }

}//END module