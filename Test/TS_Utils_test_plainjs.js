/// <reference path="TS_Utils_test.js" />
/// <reference path="../Utils/utils.js" />

"use strict"
var TS_Utils_test;
(function (TS_Utils_test)
{

  QUnit.test("checkConstructorCall", function (assert)
  {
    assert.throws(function ()
    {
      TS_Utils_test.TestConstructorCallClass();
    }, function (err)
    {
      return (err.name == "TS.InvalidOperationException") ? true : false;
    }, "Should throw a 'TS.InvalidOperationException' for an invalid call of the constructor without the new operator.");

  });

  QUnit.test("checkFunctionParameter", function (assert)
  {
    assert.throws(function ()
    {
      TS.Utils.checkFunctionParameter({}, "object", "checkFunctionParameter");
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for a parameter value which isn't a function at all.");

  });

  QUnit.test("checkIntegerNumberParameter", function (assert)
  {
    assert.throws(function ()
    {
      TS.Utils.checkIntegerNumberParameter({}, "object", "checkIntegerNumberParameter");
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for a parameter value which isn't a number at all.");

  });

  QUnit.test("checkPositivIntegerNumberParameter", function (assert)
  {
    assert.throws(function ()
    {
      TS.Utils.checkPositivIntegerNumberParameter({}, "object", "checkPositivIntegerNumberParameter");
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for a parameter value which isn't a number at all.");

  });

  QUnit.test("checkStringParameter", function (assert)
  {
    assert.throws(function ()
    {
      TS.Utils.checkStringParameter({}, "object", "checkStringParameter");
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for parameter value which isn't a string at all.");

  });

  QUnit.test("checkUInt64NumberParameter", function (assert)
  {
    assert.throws(function ()
    {
      TS.Utils.checkUInt64NumberParameter({}, "object", "checkUInt64NumberParameter");
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for parameter value which isn't a UInt64 at all.");

  });

  QUnit.test("getFunctionName", function (assert)
  {
    assert.throws(function ()
    {
      TS.Utils.getFunctionName({});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for a parameter value which is not a function at all.");

  });

  QUnit.test("normalizePath", function (assert)
  {
    var _resultPath;

    _resultPath = TS.Utils.normalizePath({});
    assert.equal(_resultPath.length , 0, "Should return an empty path when calle with an invalid argument.");

  });

})(TS_Utils_test || (TS_Utils_test = {}));