/// <reference path="../scripts/qunit.d.ts" />
/// <reference path="../scripts/jquery.d.ts" />
/// <reference path="../utils/utils.ts" />
/// <reference path="../utils/Assert.ts" />

"use strict";

module TS_Utils_Assert_test
{
  declare var document;
  var _arguments;

  function getArguments(p1: string, p2: number, p3: Object)
  {
    return arguments;
  }

  QUnit.module("TS.Utils.Assert",
    {
      setupOnce: function ()
      {
        // runs once before anything else in the module
        _arguments = getArguments("One", 2, {});
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


  QUnit.test("getType", (assert) =>
  {
    var _undefined;

    assert.equal(TS.Utils.TypeEnum.ARGUMENTS, TS.Utils.Assert.getType(_arguments), "Should return a type that matches with 'TS.Utils.TypeEnum.ARGUMENTS'.");
    assert.equal(TS.Utils.TypeEnum.ARRAY, TS.Utils.Assert.getType([1, 2, 3]), "Should return a type that matches with 'TS.Utils.TypeEnum.ARRAY'.");
    assert.equal(TS.Utils.TypeEnum.BOOLEAN_OBJECT, TS.Utils.Assert.getType(new Boolean()), "Should return a type that matches with 'TS.Utils.TypeEnum.BOOLEAN_OBJECT'.");
    assert.equal(TS.Utils.TypeEnum.BOOLEAN_VALUE, TS.Utils.Assert.getType(false), "Should return a type that matches with 'TS.Utils.TypeEnum.BOOLEAN_VALUE'.");
    assert.equal(TS.Utils.TypeEnum.DATE, TS.Utils.Assert.getType(new Date(2014, 1, 1, 0, 0, 1)), "Should return a type that matches with 'TS.Utils.TypeEnum.DATE'.");
    assert.equal(TS.Utils.TypeEnum.FUNCTION, TS.Utils.Assert.getType(() => { }), "Should return a type that matches with 'TS.Utils.TypeEnum.FUNCTION'.");
    assert.equal(TS.Utils.TypeEnum.FUNCTION, TS.Utils.Assert.getType(function () { }), "Should return a type that matches with 'TS.Utils.TypeEnum.FUNCTION'.");
    assert.equal(TS.Utils.TypeEnum.FUNCTION, TS.Utils.Assert.getType(new Function()), "Should return a type that matches with 'TS.Utils.TypeEnum.FUNCTION'.");
    assert.equal(TS.Utils.TypeEnum.NAN, TS.Utils.Assert.getType(NaN), "Should return a type that matches with 'TS.Utils.TypeEnum.NAN'.");
    assert.equal(TS.Utils.TypeEnum.NULL, TS.Utils.Assert.getType(null), "Should return a type that matches with 'TS.Utils.TypeEnum.NULL'.");
    assert.equal(TS.Utils.TypeEnum.NUMBER_OBJECT, TS.Utils.Assert.getType(new Number()), "Should return a type that matches with 'TS.Utils.TypeEnum.NUMBER_OBJECT'.");
    assert.equal(TS.Utils.TypeEnum.NUMBER_VALUE, TS.Utils.Assert.getType(5), "Should return a type that matches with 'TS.Utils.TypeEnum.NUMBER_VALUE'.");
    assert.equal(TS.Utils.TypeEnum.OBJECT, TS.Utils.Assert.getType(new Object()), "Should return a type that matches with 'TS.Utils.TypeEnum.OBJECT'.");
    assert.equal(TS.Utils.TypeEnum.OBJECT, TS.Utils.Assert.getType({}), "Should return a type that matches with 'TS.Utils.TypeEnum.OBJECT'.");
    assert.equal(TS.Utils.TypeEnum.REGEX, TS.Utils.Assert.getType(new RegExp("ab+c", "i")), "Should return a type that matches with 'TS.Utils.TypeEnum.REGEX'.");
    assert.equal(TS.Utils.TypeEnum.STRING_OBJECT, TS.Utils.Assert.getType(new String("StringObject")), "Should return a type that matches with 'TS.Utils.TypeEnum.STRING_OBJECT'.");
    assert.equal(TS.Utils.TypeEnum.STRING_VALUE, TS.Utils.Assert.getType("StringValue"), "Should return a type that matches with 'TS.Utils.TypeEnum.STRING_VALUE'.");
    assert.equal(TS.Utils.TypeEnum.UNDEFINED, TS.Utils.Assert.getType(_undefined), "Should return a type that matches with 'TS.Utils.TypeEnum.UNDEFINED'.");
    assert.equal(TS.Utils.TypeEnum.UNKNOWN, TS.Utils.Assert.getType(document.all), "Should return a type that matches with 'TS.Utils.TypeEnum.UNKNOWN'.");
    assert.equal(TS.Utils.TypeEnum.POSITIVE_INFINITY, TS.Utils.Assert.getType(Number.MAX_VALUE * 2), "Should return a type that matches with 'TS.Utils.TypeEnum.POSITIVE_INFINITY'.");
    assert.equal(TS.Utils.TypeEnum.POSITIVE_INFINITY, TS.Utils.Assert.getType(Infinity), "Should return a type that matches with 'TS.Utils.TypeEnum.POSITIVE_INFINITY'.");
    assert.equal(TS.Utils.TypeEnum.NEGATIVE_INFINITY, TS.Utils.Assert.getType(Number.MAX_VALUE * -2), "Should return a type that matches with 'TS.Utils.TypeEnum.NEGATIVE_INFINITY'.");
    assert.equal(TS.Utils.TypeEnum.NEGATIVE_INFINITY, TS.Utils.Assert.getType(-Infinity), "Should return a type that matches with 'TS.Utils.TypeEnum.NEGATIVE_INFINITY'.");
  });


  QUnit.test("isArguments", (assert) => 
  {
    var _undefined;
    var _null;
    var _array;

    _null = null;
    _array = [1, 2, 3, 4, 5, 6];

    assert.ok(!TS.Utils.Assert.isArguments(_undefined), "Should return false on an undefined value as argument.");
    assert.ok(!TS.Utils.Assert.isArguments(_null), "Should return false on a null value as argument.");
    assert.ok(!TS.Utils.Assert.isArguments(_array), "Should return false on an array value as argument.");
    assert.ok(TS.Utils.Assert.isArguments(arguments), "Should return true on an arguments value as argument.");
  });


  QUnit.test("isArray", (assert) =>
  {
    var _undefined;
    var _null;
    var _array;

    _null = null;
    _array = [1, 2, 3, 4, 5, 6];

    assert.ok(!TS.Utils.Assert.isArray(_undefined), "Should return false on an undefined value as argument.");
    assert.ok(!TS.Utils.Assert.isArray(_null), "Should return false on a null value as argument.");
    assert.ok(TS.Utils.Assert.isArray(_array), "Should return true on an array value as argument.");
    assert.ok(!TS.Utils.Assert.isArray("Hallo"), "Should return false on a string value as argument.");
    assert.ok(!TS.Utils.Assert.isArray(arguments), "Should return false on arguments value as argument.");
  });


  QUnit.test("isBinaryString", (assert) =>
  {
    var _undefined;

    assert.ok(TS.Utils.Assert.isBinaryString("01001010110"), "Should return true on a valid binary string.");
    assert.ok(!TS.Utils.Assert.isBinaryString("   0110101110101"), "Should return false on an invalid binary string.");
    assert.ok(!TS.Utils.Assert.isBinaryString("hallo"), "Should return false on a text string.");
    assert.ok(!TS.Utils.Assert.isBinaryString({}), "Should return false on a value which isn't a string at all.");
    assert.ok(!TS.Utils.Assert.isBinaryString(null), "Should return false on a null value.");
    assert.ok(!TS.Utils.Assert.isBinaryString(_undefined), "Should return false on an undefined value.");
  });


  QUnit.test("isBoolean", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(!TS.Utils.Assert.isBoolean(_undefined), "Should return false on an undefined value as argument.");
    assert.ok(!TS.Utils.Assert.isBoolean(_null), "Should return false on a null value as argument.");
    assert.ok(!TS.Utils.Assert.isBoolean(0), "Should return false an a '0' value as argument.");
    assert.ok(!TS.Utils.Assert.isBoolean(NaN), "Should return false an a NaN value as argument.");
    assert.ok(!TS.Utils.Assert.isBoolean(""), "Should return false an an empty string value as argument.");
    assert.ok(TS.Utils.Assert.isBoolean(false), "Should return true on the boolean value false as argument.");
    assert.ok(TS.Utils.Assert.isBoolean(true), "Should return true on the boolean value true as argument.");
    assert.ok(TS.Utils.Assert.isBoolean(new Boolean(true)), "Should return true on a boolean object containing true as argument.");
    assert.ok(TS.Utils.Assert.isBoolean(new Boolean(false)), "Should return true on a boolean object containing false as argument.");
    assert.ok(TS.Utils.Assert.isBoolean(new Boolean()), "Should return true on an empty boolean object. (Defaults to a boolean object containing 'false').");
  });


  QUnit.test("isBooleanObject", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(!TS.Utils.Assert.isBooleanObject(_undefined), "Should return false on an undefined value as argument.");
    assert.ok(!TS.Utils.Assert.isBooleanObject(_null), "Should return false on a null value as argument.");
    assert.ok(!TS.Utils.Assert.isBooleanObject(false), "Should false true on the boolean value false as argument.");
    assert.ok(!TS.Utils.Assert.isBooleanObject(true), "Should false true on the boolean value true as argument.");
    assert.ok(TS.Utils.Assert.isBooleanObject(new Boolean(true)), "Should return true on a boolean object containing true as argument.");
    assert.ok(TS.Utils.Assert.isBooleanObject(new Boolean(false)), "Should return true on a boolean object containing false as argument.");
    assert.ok(TS.Utils.Assert.isBooleanObject(new Boolean()), "Should return true on an empty boolean. (Defaults to a boolean object containing 'false'.)");
  });


  QUnit.test("isBooleanValue", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(!TS.Utils.Assert.isBooleanValue(_undefined), "Should return false on an undefined value as argument.");
    assert.ok(!TS.Utils.Assert.isBooleanValue(_null), "Should return false on a null value as argument.");
    assert.ok(!TS.Utils.Assert.isBooleanValue(0), "Should return false an a '0' value as argument.");
    assert.ok(!TS.Utils.Assert.isBooleanValue(NaN), "Should return false an a NaN value as argument.");
    assert.ok(!TS.Utils.Assert.isBooleanValue(""), "Should return false an an empty string value as argument.");
    assert.ok(TS.Utils.Assert.isBooleanValue(false), "Should return true on the boolean value false as argument.");
    assert.ok(TS.Utils.Assert.isBooleanValue(true), "Should return true on the boolean value true as argument.");
    assert.ok(!TS.Utils.Assert.isBooleanValue(new Boolean(true)), "Should return false on a boolean object containing true as argument.");
    assert.ok(!TS.Utils.Assert.isBooleanValue(new Boolean(false)), "Should return false on a boolean object containing false as argument.");
  });


  QUnit.test("isDate", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(!TS.Utils.Assert.isDate(_undefined), "Should return false on an undefined value as argument.");
    assert.ok(!TS.Utils.Assert.isDate(_null), "Should return false on a null value as argument.");
    assert.ok(TS.Utils.Assert.isDate(new Date()), "Should return true on a date object instance value as argument.");
    assert.ok(!TS.Utils.Assert.isDate(Date.now()), "Should return false on the value which the function 'Date.now()' provides as argument.");
    assert.ok(!TS.Utils.Assert.isDate("2014-01-01T00:00:01"), "Should return fals on a date string value as argument.");
  });


  QUnit.test("isDecimalString", (assert) =>
  {
    var _undefined;

    assert.ok(TS.Utils.Assert.isDecimalString("0123456789"), "Should return true on a valid decimal string.");
    assert.ok(!TS.Utils.Assert.isDecimalString("   0123456789"), "Should return false on an invalid decimal string.");
    assert.ok(!TS.Utils.Assert.isDecimalString("hallo"), "Should return false on a text string.");
    assert.ok(!TS.Utils.Assert.isDecimalString({}), "Should return false on a value which isn't a string at all.");
    assert.ok(!TS.Utils.Assert.isDecimalString(null), "Should return false on a null value.");
    assert.ok(!TS.Utils.Assert.isDecimalString(_undefined), "Should return false on an undefined value.");
  });


  QUnit.test("isFunction", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(!TS.Utils.Assert.isFunction(_undefined), "Should return false on an undefined value as argument.");
    assert.ok(!TS.Utils.Assert.isFunction(_null), "Should return false on a null value as argument.");
    assert.ok(TS.Utils.Assert.isFunction(() => { }), "Should return true on a lambda notation function value as argument.");
    assert.ok(TS.Utils.Assert.isFunction(function () { }), "Should return true on a function literal value as argument.");
    assert.ok(TS.Utils.Assert.isFunction(new Function()), "Should return true on a function object instance value as argument.");
    assert.ok(TS.Utils.Assert.isFunction(Array), "Should return true on the javascript 'Array' constructor function value as argument.");
    assert.ok(TS.Utils.Assert.isFunction(Boolean), "Should return true on the javascript 'Boolean' constructor function value as argument.");
    assert.ok(TS.Utils.Assert.isFunction(Date), "Should return true on the javascript 'Date' constructor function value as argument.");
    assert.ok(TS.Utils.Assert.isFunction(Error), "Should return true on the javascript 'Error' constructor function value as argument.");
    assert.ok(TS.Utils.Assert.isFunction(Function), "Should return true on the javascript 'Function' constructor function value as argument.");
    assert.ok(TS.Utils.Assert.isFunction(Number), "Should return true on the javascript 'Number' constructor function value as argument.");
    assert.ok(TS.Utils.Assert.isFunction(Object), "Should return true on the javascript 'Object' constructor function value as argument.");
    assert.ok(TS.Utils.Assert.isFunction(RegExp), "Should return true on the javascript 'RegExp' constructor function value as argument.");
    assert.ok(TS.Utils.Assert.isFunction(String), "Should return true on the javascript 'String' constructor function value as argument.");
  });


  QUnit.test("isHexString", (assert) =>
  {
    var _undefined;

    assert.ok(TS.Utils.Assert.isHexString("0123456789abCDeF"), "Should return true on a valid hexadecimal string.");
    assert.ok(!TS.Utils.Assert.isHexString("   0123456789abCDeF"), "Should return false on an invalid hexadecimal string.");
    assert.ok(!TS.Utils.Assert.isHexString("hallo"), "Should return false on a text string.");
    assert.ok(!TS.Utils.Assert.isHexString({}), "Should return false on a value which isn't a string at all.");
    assert.ok(!TS.Utils.Assert.isHexString(null), "Should return false on a null value.");
    assert.ok(!TS.Utils.Assert.isHexString(_undefined), "Should return false on an undefined value.");
  });


  QUnit.test("isInfiniteNumber", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(!TS.Utils.Assert.isInfiniteNumber(_undefined), "Should return false on an undefined value as argument.");
    assert.ok(!TS.Utils.Assert.isInfiniteNumber(_null), "Should return false on a null value as argument.");
    assert.ok(!TS.Utils.Assert.isInfiniteNumber(42), "Should return false on a finite number value as argument.");
    assert.ok(TS.Utils.Assert.isInfiniteNumber(Number.MAX_VALUE * 2), "Should return true on a positive infinite value as argument.");
    assert.ok(TS.Utils.Assert.isInfiniteNumber(Number.MAX_VALUE * -2), "Should return true on a negative infinite value as argument.");
    assert.ok(TS.Utils.Assert.isInfiniteNumber(Infinity), "Should return true on a value which holds the constant 'Infinity' as argument.");
  });


  QUnit.test("isIntegerNumber", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(!TS.Utils.Assert.isIntegerNumber(_undefined), "Should return false on an undefined value as argument.");
    assert.ok(!TS.Utils.Assert.isIntegerNumber(_null), "Should return false on a null value as argument.");
    assert.ok(TS.Utils.Assert.isIntegerNumber(5), "Should return true on an integer number value as argument.");
    assert.ok(!TS.Utils.Assert.isIntegerNumber(5.2), "Should return false on a float number value as argument.");
  });


  QUnit.test("isNaN", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(!TS.Utils.Assert.isNaN(_undefined), "Should return false on an undefined value as argument.");
    assert.ok(!TS.Utils.Assert.isNaN(_null), "Should return false on a null value as argument.");
    assert.ok(!TS.Utils.Assert.isNaN("NOP"), "Should return false an a string value as argument.");
    assert.ok(!TS.Utils.Assert.isNaN(""), "Should return false an an empty string value as argument.");
    assert.ok(!TS.Utils.Assert.isNaN(5.3), "Should return false on a number value as argument.");
    assert.ok(TS.Utils.Assert.isNaN(NaN), "Should return true on a NaN value as argument.");
  });


  QUnit.test("isNegativInfiniteNumber", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(!TS.Utils.Assert.isNegativInfiniteNumber(_undefined), "Should return false on an undefined value as argument.");
    assert.ok(!TS.Utils.Assert.isNegativInfiniteNumber(_null), "Should return false on a null value as argument.");
    assert.ok(!TS.Utils.Assert.isInfiniteNumber(42), "Should return false on a finite number value as argument.");
    assert.ok(!TS.Utils.Assert.isNegativInfiniteNumber(Number.MAX_VALUE * 2), "Should return false on a positive infinite value as argument.");
    assert.ok(TS.Utils.Assert.isNegativInfiniteNumber(Number.MAX_VALUE * -2), "Should return true on a negative infinite value as argument.");
    assert.ok(TS.Utils.Assert.isNegativInfiniteNumber(-Infinity), "Should return true on a value which holds the negative constant 'Infinity' as argument.");
  });

  QUnit.test("isNull", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(!TS.Utils.Assert.isNull(_undefined), "Should return false on an undefined value as argument.");
    assert.ok(TS.Utils.Assert.isNull(_null), "Should return true on a null value as argument.");
    assert.ok(!TS.Utils.Assert.isNull(""), "Should return false on an empty string value as argument.");
  });


  QUnit.test("isNullOrUndefined", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(TS.Utils.Assert.isNullOrUndefined(_undefined), "Should return true on an undefined value as argument.");
    assert.ok(TS.Utils.Assert.isNullOrUndefined(_null), "Should return true on a null value as argument.");
    assert.ok(!TS.Utils.Assert.isNullOrUndefined(""), "Should return false on an empty string value as argument.");
    assert.ok(!TS.Utils.Assert.isNullOrUndefined([]), "Should return false on an empty array value as argument.");
  });


  QUnit.test("isNullUndefOrEmpty", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(TS.Utils.Assert.isNullUndefOrEmpty(_undefined), "Should return true on an undefined value as argument.");
    assert.ok(TS.Utils.Assert.isNullUndefOrEmpty(_null), "Should return true on a null value as argument.");
    assert.ok(TS.Utils.Assert.isNullUndefOrEmpty(""), "Should return true on an empty string value as argument.");
    assert.ok(TS.Utils.Assert.isNullUndefOrEmpty(new Array()), "Should return true on an empty array value as argument.");
    assert.ok(!TS.Utils.Assert.isNullUndefOrEmpty("NOP"), "Should return false on an none empty string value as argument.");
    assert.ok(!TS.Utils.Assert.isNullUndefOrEmpty([1, 2, 3, 4]), "Should false on an none empty array value as argument.");

  });


  QUnit.test("isNullUndefOrWhiteSpace", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(TS.Utils.Assert.isNullUndefOrWhiteSpace(_undefined), "Should true on an undefined value as argument.");
    assert.ok(TS.Utils.Assert.isNullUndefOrWhiteSpace(_null), "Should return true on a null value as argument.");
    assert.ok(TS.Utils.Assert.isNullUndefOrWhiteSpace(""), "Should return tue on an empty string value as argument.");
    assert.ok(TS.Utils.Assert.isNullUndefOrWhiteSpace("  \r\n  \t"), "Should return true on a string which contians only white space characters as argument.");
    assert.ok(!TS.Utils.Assert.isNullUndefOrWhiteSpace("NOP"), "Should return false on none empty string value as argument.");
  });


  QUnit.test("isNumber", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(!TS.Utils.Assert.isNumber(_undefined), "Should return false on an undefined value as argument.");
    assert.ok(!TS.Utils.Assert.isNumber(_null), "Should return false on a null value as argument.");
    assert.ok(TS.Utils.Assert.isNumber(5), "Should return true on a number value as argument.");
    assert.ok(TS.Utils.Assert.isNumber(new Number(5)), "Should return true on a number object as argument.");
    assert.ok(!TS.Utils.Assert.isNumber(NaN), "Should return false on a NaN value as argument.");
    assert.ok(!TS.Utils.Assert.isNumber("5"), "Should return false on a number string value as argument.");
  });


  QUnit.test("isNumberObject", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(!TS.Utils.Assert.isNumberObject(_undefined), "Should return false on undefined value as argument.");
    assert.ok(!TS.Utils.Assert.isNumberObject(_null), "Should return false on a null value as argument.");
    assert.ok(TS.Utils.Assert.isNumberObject(new Number()), "Should return true on a number object as argument.");
    assert.ok(!TS.Utils.Assert.isNumberObject(5), "Should return false on a number value as argument.");
    assert.ok(!TS.Utils.Assert.isNumberObject("5"), "Should return false on a number string value as argument.");
    assert.ok(!TS.Utils.Assert.isNumberObject(NaN), "Should return false on a NaN object as argument.");
  });


  QUnit.test("isNumberValue", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(!TS.Utils.Assert.isNumberValue(_undefined), "Should return false on undefined value as argument.");
    assert.ok(!TS.Utils.Assert.isNumberValue(_null), "Should return false on a null value as argument.");
    assert.ok(TS.Utils.Assert.isNumberValue(5), "Should return true on a number value as argument.");
    assert.ok(!TS.Utils.Assert.isNumberValue(new Number()), "Should return false on a number object as argument.");
    assert.ok(!TS.Utils.Assert.isNumberValue("5"), "Should return false on a number string value as argument.");
    assert.ok(!TS.Utils.Assert.isNumberValue(NaN), "Should return false on a NaN object as argument.");
  });


  QUnit.test("isObject", (assert) =>
  {
    var _undefined;
    var _null;
    var _regexp;

    _null = null;

    assert.ok(!TS.Utils.Assert.isObject(_undefined), "Should return false on an undefined argument.");
    assert.ok(!TS.Utils.Assert.isObject(_null), "Should return false on a null value as argument.");
    assert.ok(TS.Utils.Assert.isObject({}), "Should return true on an object literal value as argument.");
    assert.ok(TS.Utils.Assert.isObject(new Object()), "Should return true on an object instance value as argument.");

    assert.ok(TS.Utils.Assert.isObject(new Array()), "Should return true on the javascript 'Array' object instance value as argument.");
    assert.ok(TS.Utils.Assert.isObject([]), "Should return true on an array literal value as argument.");
    assert.ok(!TS.Utils.Assert.isObject(new Function()), "Should return false on the javascript 'Function' object instance value as argument.");
    assert.ok(!TS.Utils.Assert.isObject(() => { }), "Should return false on the javascript function literal value as argument.");
    assert.ok(TS.Utils.Assert.isObject(new Boolean()), "Should return true on the javascript 'Boolean' object instance value as argument.");
    assert.ok(TS.Utils.Assert.isObject(new Date()), "Should return true on the javascript 'Date' object instance value as argument.");
    assert.ok(TS.Utils.Assert.isObject(new Error()), "Should return true on the javascript 'Error' object instance value as argument.");
    assert.ok(TS.Utils.Assert.isObject(new Number()), "Should return true on the javascript 'Number' object instance value as argument.");
    assert.ok(TS.Utils.Assert.isObject(new RegExp("ab+c", "i")), "Should return true on the javascript 'RegExp' instance object value as argument.");
    _regexp = /ab+c/i;
    assert.ok(TS.Utils.Assert.isObject(_regexp), "Should return true on the javascript 'RegExp' literal value as argument.");
    assert.ok(TS.Utils.Assert.isObject(new String()), "Should return true on the javascript 'String' object instance value as argument.");
    assert.ok(!TS.Utils.Assert.isObject("abcd"), "Should return false on the javascript 'String' literal value as argument.");
    assert.ok(!TS.Utils.Assert.isObject(NaN), "Should return false  on a  NaN value as argument.");
  });


  QUnit.test("isUnsignedInfiniteNumber", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(!TS.Utils.Assert.isUnsignedInfiniteNumber(_undefined), "Should return false on an undefined value as argument.");
    assert.ok(!TS.Utils.Assert.isUnsignedInfiniteNumber(_null), "Should return false on a null value as argument.");
    assert.ok(!TS.Utils.Assert.isInfiniteNumber(42), "Should return false on a finite number value as argument.");
    assert.ok(TS.Utils.Assert.isUnsignedInfiniteNumber(Number.MAX_VALUE * 2), "Should return true on a positive infinite value as argument.");
    assert.ok(!TS.Utils.Assert.isUnsignedInfiniteNumber(Number.MAX_VALUE * -2), "Should return false on a negative infinite value as argument.");
    assert.ok(TS.Utils.Assert.isUnsignedInfiniteNumber(Infinity), "Should return true on a value which holds the constant 'Infinity' as argument.");
  });


  QUnit.test("isUnsignedIntegerNumber", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(!TS.Utils.Assert.isUnsignedIntegerNumber(_undefined), "Should return false on undefined value as argument.");
    assert.ok(!TS.Utils.Assert.isUnsignedIntegerNumber(_null), "Should return false on a null value as argument.");
    assert.ok(TS.Utils.Assert.isUnsignedIntegerNumber(0), "Should return true on a '0' value as argument.");
    assert.ok(TS.Utils.Assert.isUnsignedIntegerNumber(-0), "Should return true on a '-0' value as argument.");
    assert.ok(TS.Utils.Assert.isUnsignedIntegerNumber(1), "Should return true on a '1' value as argument.");
    assert.ok(!TS.Utils.Assert.isUnsignedIntegerNumber(-1), "Should return false on a '-1' value as argument.");
    assert.ok(!TS.Utils.Assert.isUnsignedIntegerNumber(2.5), "Should return false on a '2.5' float value as argument.");
    assert.ok(!TS.Utils.Assert.isUnsignedIntegerNumber(NaN), "Should return false on a NaN value as argument.");
    assert.ok(!TS.Utils.Assert.isUnsignedIntegerNumber("3"), "Should return false on a string value as argument.");

  });


  QUnit.test("isPrimitiveType", (assert) =>
  {
    assert.ok(TS.Utils.Assert.isPrimitiveType(true), "Should return true for the boolean value 'true'.");
    assert.ok(TS.Utils.Assert.isPrimitiveType(false), "Should return true for the boolean value 'false'.");
    assert.ok(TS.Utils.Assert.isPrimitiveType(""), "Should return true for the string value ''.");
    assert.ok(TS.Utils.Assert.isPrimitiveType(0), "Should return true for the number value '0'.");

    assert.ok(!TS.Utils.Assert.isPrimitiveType(new Boolean(true)), "Should return false for a boolean object value.");
    assert.ok(!TS.Utils.Assert.isPrimitiveType(new String("")), "Should return false for a string object value ''.");
    assert.ok(!TS.Utils.Assert.isPrimitiveType(new Number()), "Should return false for a number object value '0'.");

    assert.ok(!TS.Utils.Assert.isPrimitiveType({}), "Should return false for an arbitrary object.");
  });


  QUnit.test("isRegEx", (assert) =>
  {
    var _undefined;
    var _null;
    var _regexp;

    _null = null;
    _regexp = /ab+c/i;

    assert.ok(!TS.Utils.Assert.isRegEx(_undefined), "Should return false on undefined value as argument.");
    assert.ok(!TS.Utils.Assert.isRegEx(_null), "Should return false on a null value as argument.");
    assert.ok(TS.Utils.Assert.isRegEx(new RegExp("ab+c", "i")), "Should return true on the javascript 'RegExp' instance object value as argument.");
    assert.ok(TS.Utils.Assert.isRegEx(_regexp), "Should return true on the javascript 'RegExp' literal value as argument.");
    assert.ok(!TS.Utils.Assert.isRegEx("/ab+c/i"), "Should return false on a string value as argument.");
  });


  QUnit.test("isString", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(!TS.Utils.Assert.isString(_undefined), "Should return false on undefined value as argument.");
    assert.ok(!TS.Utils.Assert.isString(_null), "Should return false on a null value as argument.");
    assert.ok(TS.Utils.Assert.isString(new String()), "Should return true on a javascript 'String' instance object value as argument.");
    assert.ok(TS.Utils.Assert.isString(""), "Should return true on a string literal value as argument.");
    assert.ok(!TS.Utils.Assert.isString({}), "Should return false on an arbitrary object value as argument.");
  });


  QUnit.test("isStringObject", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(!TS.Utils.Assert.isStringObject(_undefined), "Should return false on undefined value as argument.");
    assert.ok(!TS.Utils.Assert.isStringObject(_null), "Should return false on a null value as argument.");
    assert.ok(TS.Utils.Assert.isStringObject(new String()), "Should return true on a javascript 'String' instance object value as argument.");
    assert.ok(!TS.Utils.Assert.isStringObject(""), "Should return false on a string literal value as argument.");
    assert.ok(!TS.Utils.Assert.isStringObject({}), "Should return false on an arbitrary object value as argument.");
  });


  QUnit.test("isStringValue", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(!TS.Utils.Assert.isStringValue(_undefined), "Should return false on undefined value as argument.");
    assert.ok(!TS.Utils.Assert.isStringValue(_null), "Should return false on a null value as argument.");
    assert.ok(!TS.Utils.Assert.isStringValue(new String()), "Should return false on a javascript 'String' instance object value as argument.");
    assert.ok(TS.Utils.Assert.isStringValue(""), "Should return true on a string literal value as argument.");
    assert.ok(!TS.Utils.Assert.isStringValue({}), "Should return false on an arbitrary object value as argument.");
  });


  QUnit.test("isUndefined", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(TS.Utils.Assert.isUndefined(_undefined), "Should return true on an undefined argument.");
    assert.ok(!TS.Utils.Assert.isUndefined(_null), "Should return false on a null value as argument.");
    assert.ok(!TS.Utils.Assert.isUndefined(0), "Should return false on an arbitrary value as argument.");
    assert.ok(!TS.Utils.Assert.isUndefined(NaN), "Should return false on a NaN value as argument.");
  });


  QUnit.test("isUnsignedByteArray", (assert) =>
  {
    var _undefined;
    var _null;
    var _testArray: Array<number>;

    _testArray = new Array<number>();

    do
    {
      _testArray.push(Math.ceil(Math.random() * 255));
    } while (_testArray.length < 100);

    assert.ok(!TS.Utils.Assert.isUnsignedByteArray(_undefined), "Should return false on undefined value as argument.");
    assert.ok(!TS.Utils.Assert.isUnsignedByteArray(_null), "Should return false on a null value as argument.");
    assert.ok(!TS.Utils.Assert.isUnsignedByteArray({}), "Should return false on a value which is not an array as argument.");
    assert.ok(!TS.Utils.Assert.isUnsignedByteArray(["one","two","three"]), "Should return false on a value which is not a number array as argument.");
    assert.ok(TS.Utils.Assert.isUnsignedByteArray(_testArray), "Should return true on a valid array of byte value elements.");

    _testArray[86] = 256;

    assert.ok(!TS.Utils.Assert.isUnsignedByteArray(_testArray), "Should return false on an array with at least on invalid byte value element.");

    _testArray[86] = -12;

    assert.ok(!TS.Utils.Assert.isUnsignedByteArray(_testArray), "Should return false on an array with at least on invalid byte value element.");
  });


  QUnit.test("isUnsignedByteValue", (assert) =>
  {
    var _undefined;
    var _null;

    assert.ok(!TS.Utils.Assert.isUnsignedByteValue(_undefined), "Should return false on undefined value as argument.");
    assert.ok(!TS.Utils.Assert.isUnsignedByteValue(_null), "Should return false on a null value as argument.");
    assert.ok(!TS.Utils.Assert.isUnsignedByteValue({}), "Should return false on a value which is not a number argument.");
    assert.ok(!TS.Utils.Assert.isUnsignedByteValue([]), "Should return false on a value which is not a number argument.");
    assert.ok(!TS.Utils.Assert.isUnsignedByteValue("one"), "Should return false on a value which is not a number argument.");
    assert.ok(!TS.Utils.Assert.isUnsignedByteValue(-1), "Should return false on a value which is out of range.");
    assert.ok(!TS.Utils.Assert.isUnsignedByteValue(256), "Should return false on a value which is out of range.");
    assert.ok(TS.Utils.Assert.isUnsignedByteValue(0), "Should return true on a valid byte value elements.");
    assert.ok(TS.Utils.Assert.isUnsignedByteValue(255), "Should return true on a valid byte value elements.");
  });


}//END module