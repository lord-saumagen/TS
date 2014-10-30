/// <reference path="../scripts/qunit.d.ts" />
/// <reference path="../scripts/jquery.d.ts" />
/// <reference path="../exception/exception.ts" />

"use strict";

module TS_Linq_Exception_test
{

  QUnit.module("TS.Linq.Exceptions",
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

  QUnit.test("SelectorException", function (assert)
  {
    var ExceptionMessage = "TS.Linq.SelectorException message";

    assert.throws(function ()
    {
      throw new TS.Linq.SelectorException((item) => item, "AnItem", ExceptionMessage); 
    }, new TS.Linq.SelectorException((item) => item, "AnItem", ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.Linq.SelectorException((item) => item, "AnItem", ExceptionMessage, GetInnerException());
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

  QUnit.test("EmptyEnumerableException", function (assert)
  {
    var ExceptionMessage = "TS.Linq.EmptyEnumerableException message";

    assert.throws(function ()
    {
      throw new TS.Linq.EmptyEnumerableException(TS.Linq.Extensions.empty<string>(), ExceptionMessage);
    }, new TS.Linq.EmptyEnumerableException(TS.Linq.Extensions.empty<string>(), ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.Linq.EmptyEnumerableException(TS.Linq.Extensions.empty<string>(), ExceptionMessage, GetInnerException());
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
    }
  }

}//END module