"use strict";
var TS_Utils_test;
(function (TS_Utils_test)
{
  QUnit.module("TS.Utils (plain js)", {
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

  QUnit.test("checkConstructorCall (plain js)", function (assert)
  {
    assert.throws(function ()
    {
      TS_Utils_test.TestConstructorCallClass();
    }, function (err)
    {
      return (err.name == "TS.InvalidOperationException") ? true : false;
    }, "Should throw a 'TS.InvalidOperationException' for an invalid call of the constructor without the new operator.");

  });

  QUnit.test("checkFunctionParameter (plain js)", function (assert)
  {
    assert.throws(function ()
    {
      TS.Utils.checkFunctionParameter({}, "object", "checkFunctionParameter");
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for a parameter value which isn't a function at all.");

  });

  QUnit.test("checkIntegerNumberParameter (plain js)", function (assert)
  {
    assert.throws(function ()
    {
      TS.Utils.checkIntegerNumberParameter({}, "object", "checkIntegerNumberParameter");
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for a parameter value which isn't a number at all.");

  });

  QUnit.test("checkUnsignedIntegerNumberParameter (plain js)", function (assert)
  {
    assert.throws(function ()
    {
      TS.Utils.checkUnsignedIntegerNumberParameter({}, "object", "checkUnsignedIntegerNumberParameter");
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for a parameter value which isn't a number at all.");

  });

  QUnit.test("checkStringParameter (plain js)", function (assert)
  {
    assert.throws(function ()
    {
      TS.Utils.checkStringParameter({}, "object", "checkStringParameter");
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for parameter value which isn't a string at all.");

  });

  QUnit.test("checkUInt64NumberParameter (plain js)", function (assert)
  {
    assert.throws(function ()
    {
      TS.Utils.checkUInt64NumberParameter({}, "object", "checkUInt64NumberParameter");
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for parameter value which isn't a UInt64 at all.");

  });

  QUnit.test("getFunctionName (plain js)", function (assert)
  {
    assert.throws(function ()
    {
      TS.Utils.getFunctionName({});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for a parameter value which is not a function at all.");

  });

  QUnit.test("normalizePath (plain js)", function (assert)
  {
    var _resultPath;

    _resultPath = TS.Utils.normalizePath({});
    assert.equal(_resultPath.length, 0, "Should return an empty path when calle with an invalid argument.");

  });

})(TS_Utils_test || (TS_Utils_test = {}));