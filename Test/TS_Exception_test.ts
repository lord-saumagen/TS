/// <reference path="../scripts/qunit.d.ts" />
/// <reference path="../scripts/jquery.d.ts" />
/// <reference path="../exception/exception.ts" />

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


  QUnit.test("Exception", function (assert)
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


  QUnit.test("ArgumentException", function (assert)
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


  QUnit.test("ArgumentNullException", function (assert)
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


  QUnit.test("ArgumentNullOrUndefinedException", function (assert)
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


  QUnit.test("ArgumentNullUndefOrWhiteSpaceException", function (assert)
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


  QUnit.test("ArgumentOutOfRangeException", function (assert)
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


  QUnit.test("IndexOutOfRangeException", function (assert)
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


  QUnit.test("InvalidCastException", function (assert)
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


  QUnit.test("InvalidCastException", function (assert)
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


  QUnit.test("InvalidOperationException", function (assert)
  {
    var ExceptionMessage = "InvalidOperation exception message";

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