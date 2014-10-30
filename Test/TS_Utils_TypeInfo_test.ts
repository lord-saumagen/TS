/// <reference path="../scripts/qunit.d.ts" />
/// <reference path="../scripts/jquery.d.ts" />
/// <reference path="../utils/utils.ts" />
/// <reference path="../utils/typeinfo.ts" />

"use strict";

module TS_Utils_TypeInfo_test
{
  declare var document;
  var _arguments;

  function getArguments(p1 : string, p2 : number, p3 : Object)
  {
    return arguments;
  }

  QUnit.module("TS.Utils.TypeInfo",
    {
      setupOnce: function ()
      {

        _arguments = getArguments("One", 2, {});
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


  QUnit.test("getType", (assert) =>
  {
    var _undefined;

    assert.equal(TS.Utils.TypeEnum.ARGUMENTS, TS.Utils.TypeInfo.getType(_arguments), "Should return a type that matches with 'TS.Utils.TypeEnum.ARGUMENTS'.");
    assert.equal(TS.Utils.TypeEnum.ARRAY, TS.Utils.TypeInfo.getType([1, 2, 3]), "Should return a type that matches with 'TS.Utils.TypeEnum.ARRAY'.");
    assert.equal(TS.Utils.TypeEnum.BOOLEAN_OBJECT, TS.Utils.TypeInfo.getType(new Boolean()), "Should return a type that matches with 'TS.Utils.TypeEnum.BOOLEAN_OBJECT'.");
    assert.equal(TS.Utils.TypeEnum.BOOLEAN_VALUE, TS.Utils.TypeInfo.getType(false), "Should return a type that matches with 'TS.Utils.TypeEnum.BOOLEAN_VALUE'.");
    assert.equal(TS.Utils.TypeEnum.DATE, TS.Utils.TypeInfo.getType(new Date(2014, 1, 1, 0, 0, 1)), "Should return a type that matches with 'TS.Utils.TypeEnum.DATE'.");
    assert.equal(TS.Utils.TypeEnum.FUNCTION, TS.Utils.TypeInfo.getType(() => { }), "Should return a type that matches with 'TS.Utils.TypeEnum.FUNCTION'.");
    assert.equal(TS.Utils.TypeEnum.FUNCTION, TS.Utils.TypeInfo.getType(function () { }), "Should return a type that matches with 'TS.Utils.TypeEnum.FUNCTION'.");
    assert.equal(TS.Utils.TypeEnum.FUNCTION, TS.Utils.TypeInfo.getType(new Function()), "Should return a type that matches with 'TS.Utils.TypeEnum.FUNCTION'.");
    assert.equal(TS.Utils.TypeEnum.NAN, TS.Utils.TypeInfo.getType(NaN), "Should return a type that matches with 'TS.Utils.TypeEnum.NAN'.");
    assert.equal(TS.Utils.TypeEnum.NULL, TS.Utils.TypeInfo.getType(null), "Should return a type that matches with 'TS.Utils.TypeEnum.NULL'.");
    assert.equal(TS.Utils.TypeEnum.NUMBER_OBJECT, TS.Utils.TypeInfo.getType(new Number()), "Should return a type that matches with 'TS.Utils.TypeEnum.NUMBER_OBJECT'.");
    assert.equal(TS.Utils.TypeEnum.NUMBER_VALUE, TS.Utils.TypeInfo.getType(5), "Should return a type that matches with 'TS.Utils.TypeEnum.NUMBER_VALUE'.");
    assert.equal(TS.Utils.TypeEnum.OBJECT, TS.Utils.TypeInfo.getType(new Object()), "Should return a type that matches with 'TS.Utils.TypeEnum.OBJECT'.");
    assert.equal(TS.Utils.TypeEnum.OBJECT, TS.Utils.TypeInfo.getType({}), "Should return a type that matches with 'TS.Utils.TypeEnum.OBJECT'.");
    assert.equal(TS.Utils.TypeEnum.REGEX, TS.Utils.TypeInfo.getType(new RegExp("ab+c", "i")), "Should return a type that matches with 'TS.Utils.TypeEnum.REGEX'.");
    assert.equal(TS.Utils.TypeEnum.STRING_OBJECT, TS.Utils.TypeInfo.getType(new String("StringObject")), "Should return a type that matches with 'TS.Utils.TypeEnum.STRING_OBJECT'.");
    assert.equal(TS.Utils.TypeEnum.STRING_VALUE, TS.Utils.TypeInfo.getType("StringValue"), "Should return a type that matches with 'TS.Utils.TypeEnum.STRING_VALUE'.");
    assert.equal(TS.Utils.TypeEnum.UNDEFINED, TS.Utils.TypeInfo.getType(_undefined), "Should return a type that matches with 'TS.Utils.TypeEnum.UNDEFINED'.");
    assert.equal(TS.Utils.TypeEnum.UNKNOWN, TS.Utils.TypeInfo.getType(document.all), "Should return a type that matches with 'TS.Utils.TypeEnum.UNKNOWN'.");
  });

  QUnit.test("isArguments", (assert) => 
  {
    var _undefined;
    var _null;
    var _array;

    _null = null;
    _array = [1, 2, 3, 4, 5, 6];

    assert.ok(!TS.Utils.TypeInfo.isArguments(_undefined), "Should return false on an undefined value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isArguments(_null), "Should return false on a null value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isArguments(_array), "Should return false on an array value as argument.");
    assert.ok(TS.Utils.TypeInfo.isArguments(arguments), "Should return true on an arguments value as argument.");
  });


  QUnit.test("isArray", (assert) =>
  {
    var _undefined;
    var _null;
    var _array;

    _null = null;
    _array = [1, 2, 3, 4, 5, 6];

    assert.ok(!TS.Utils.TypeInfo.isArray(_undefined), "Should return false on an undefined value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isArray(_null), "Should return false on a null value as argument.");
    assert.ok(TS.Utils.TypeInfo.isArray(_array), "Should return true on an array value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isArray("Hallo"), "Should return false on a string value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isArray(arguments), "Should return false on arguments value as argument.");
  });


  QUnit.test("isBoolean", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(!TS.Utils.TypeInfo.isBoolean(_undefined), "Should return false on an undefined value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isBoolean(_null), "Should return false on a null value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isBoolean(0), "Should return false an a '0' value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isBoolean(NaN), "Should return false an a NaN value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isBoolean(""), "Should return false an an empty string value as argument.");
    assert.ok(TS.Utils.TypeInfo.isBoolean(false), "Should return true on the boolean value false as argument.");
    assert.ok(TS.Utils.TypeInfo.isBoolean(true), "Should return true on the boolean value true as argument.");
    assert.ok(TS.Utils.TypeInfo.isBoolean(new Boolean(true)), "Should return true on a boolean object containing true as argument.");
    assert.ok(TS.Utils.TypeInfo.isBoolean(new Boolean(false)), "Should return true on a boolean object containing false as argument.");
    assert.ok(TS.Utils.TypeInfo.isBoolean(new Boolean()), "Should return true on an empty boolean object. (Defaults to a boolean object containing 'false'.)");
  });


  QUnit.test("isBooleanObject", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(!TS.Utils.TypeInfo.isBooleanObject(_undefined), "Should return false on an undefined value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isBooleanObject(_null), "Should return false on a null value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isBooleanObject(false), "Should false true on the boolean value false as argument.");
    assert.ok(!TS.Utils.TypeInfo.isBooleanObject(true), "Should false true on the boolean value true as argument.");
    assert.ok(TS.Utils.TypeInfo.isBooleanObject(new Boolean(true)), "Should return true on a boolean object containing true as argument.");
    assert.ok(TS.Utils.TypeInfo.isBooleanObject(new Boolean(false)), "Should return true on a boolean object containing false as argument.");
    assert.ok(TS.Utils.TypeInfo.isBooleanObject(new Boolean()), "Should return true on an empty boolean. (Defaults to a boolean object containing 'false'.)");
  });

  QUnit.test("isBooleanValue", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(!TS.Utils.TypeInfo.isBooleanValue(_undefined), "Should return false on an undefined value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isBooleanValue(_null), "Should return false on a null value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isBooleanValue(0), "Should return false an a '0' value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isBooleanValue(NaN), "Should return false an a NaN value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isBooleanValue(""), "Should return false an an empty string value as argument.");
    assert.ok(TS.Utils.TypeInfo.isBooleanValue(false), "Should return true on the boolean value false as argument.");
    assert.ok(TS.Utils.TypeInfo.isBooleanValue(true), "Should return true on the boolean value true as argument.");
    assert.ok(!TS.Utils.TypeInfo.isBooleanValue(new Boolean(true)), "Should return false on a boolean object containing true as argument.");
    assert.ok(!TS.Utils.TypeInfo.isBooleanValue(new Boolean(false)), "Should return false on a boolean object containing false as argument.");
  });


  QUnit.test("isDate", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(!TS.Utils.TypeInfo.isDate(_undefined), "Should return false on an undefined value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isDate(_null), "Should return false on a null value as argument.");
    assert.ok(TS.Utils.TypeInfo.isDate(new Date()), "Should return true on a date object instance value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isDate(Date.now()), "Should return false on the value which the function 'Date.now()' provides as argument.");
    assert.ok(!TS.Utils.TypeInfo.isDate("2014-01-01T00:00:01"), "Should return fals on a date string value as argument.");
  });


  QUnit.test("isFunction", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(!TS.Utils.TypeInfo.isFunction(_undefined), "Should return false on an undefined value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isFunction(_null), "Should return false on a null value as argument.");
    assert.ok(TS.Utils.TypeInfo.isFunction(() => { }), "Should return true on a lambda notation function value as argument.");
    assert.ok(TS.Utils.TypeInfo.isFunction(function () { }), "Should return true on a function literal value as argument.");
    assert.ok(TS.Utils.TypeInfo.isFunction(new Function()), "Should return true on a function object instance value as argument.");
    assert.ok(TS.Utils.TypeInfo.isFunction(Array), "Should return true on the javascript 'Array' constructor function value as argument.");
    assert.ok(TS.Utils.TypeInfo.isFunction(Boolean), "Should return true on the javascript 'Boolean' constructor function value as argument.");
    assert.ok(TS.Utils.TypeInfo.isFunction(Date), "Should return true on the javascript 'Date' constructor function value as argument.");
    assert.ok(TS.Utils.TypeInfo.isFunction(Error), "Should return true on the javascript 'Error' constructor function value as argument.");
    assert.ok(TS.Utils.TypeInfo.isFunction(Function), "Should return true on the javascript 'Function' constructor function value as argument.");
    assert.ok(TS.Utils.TypeInfo.isFunction(Number), "Should return true on the javascript 'Number' constructor function value as argument.");
    assert.ok(TS.Utils.TypeInfo.isFunction(Object), "Should return true on the javascript 'Object' constructor function value as argument.");
    assert.ok(TS.Utils.TypeInfo.isFunction(RegExp), "Should return true on the javascript 'RegExp' constructor function value as argument.");
    assert.ok(TS.Utils.TypeInfo.isFunction(String), "Should return true on the javascript 'String' constructor function value as argument.");
  });


  QUnit.test("isIntegerNumber", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(!TS.Utils.TypeInfo.isIntegerNumber(_undefined), "Should return false on an undefined value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isIntegerNumber(_null), "Should return false on a null value as argument.");
    assert.ok(TS.Utils.TypeInfo.isIntegerNumber(5), "Should return true on an integer number value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isIntegerNumber(5.2), "Should return false on a float number value as argument.");
  });

  QUnit.test("isNaN", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(!TS.Utils.TypeInfo.isNaN(_undefined), "Should return false on an undefined value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isNaN(_null), "Should return false on a null value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isNaN("NOP"), "Should return false an a string value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isNaN(""), "Should return false an an empty string value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isNaN(5.3), "Should return false on a number value as argument.");
    assert.ok(TS.Utils.TypeInfo.isNaN(NaN), "Should return true on a NaN value as argument.");
  });


  QUnit.test("isNull", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(!TS.Utils.TypeInfo.isNull(_undefined), "Should return false on an undefined value as argument.");
    assert.ok(TS.Utils.TypeInfo.isNull(_null), "Should return true on a null value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isNull(""), "Should return false on an empty string value as argument.");
  });


  QUnit.test("isNullOrUndefined", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(TS.Utils.TypeInfo.isNullOrUndefined(_undefined), "Should return true on an undefined value as argument.");
    assert.ok(TS.Utils.TypeInfo.isNullOrUndefined(_null), "Should return true on a null value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isNullOrUndefined(""), "Should return false on an empty string value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isNullOrUndefined([]), "Should return false on an empty array value as argument.");
  });


  QUnit.test("isNullUndefOrEmpty", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(TS.Utils.TypeInfo.isNullUndefOrEmpty(_undefined), "Should return true on an undefined value as argument.");
    assert.ok(TS.Utils.TypeInfo.isNullUndefOrEmpty(_null), "Should return true on a null value as argument.");
    assert.ok(TS.Utils.TypeInfo.isNullUndefOrEmpty(""), "Should return true on an empty string value as argument.");
    assert.ok(TS.Utils.TypeInfo.isNullUndefOrEmpty(new Array()), "Should return true on an empty array value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isNullUndefOrEmpty("NOP"), "Should return false on an none empty string value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isNullUndefOrEmpty([1, 2, 3, 4]), "Should false on an none empty array value as argument.");

  });


  QUnit.test("isNullUndefOrWhiteSpace", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(TS.Utils.TypeInfo.isNullUndefOrWhiteSpace(_undefined), "Should true on an undefined value as argument.");
    assert.ok(TS.Utils.TypeInfo.isNullUndefOrWhiteSpace(_null), "Should return true on a null value as argument.");
    assert.ok(TS.Utils.TypeInfo.isNullUndefOrWhiteSpace(""), "Should return tue on an empty string value as argument.");
    assert.ok(TS.Utils.TypeInfo.isNullUndefOrWhiteSpace("  \r\n  \t"), "Should return true on a string which contians only white space characters as argument.");
    assert.ok(!TS.Utils.TypeInfo.isNullUndefOrWhiteSpace("NOP"), "Should return false on none empty string value as argument.");
  });


  QUnit.test("isNumber", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(!TS.Utils.TypeInfo.isNumber(_undefined), "Should return false on an undefined value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isNumber(_null), "Should return false on a null value as argument.");
    assert.ok(TS.Utils.TypeInfo.isNumber(5), "Should return true on a number value as argument.");
    assert.ok(TS.Utils.TypeInfo.isNumber(new Number(5)), "Should return true on a number object as argument.");
    assert.ok(!TS.Utils.TypeInfo.isNumber(NaN), "Should return false on a NaN value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isNumber("5"), "Should return false on a number string value as argument.");
  });


  QUnit.test("isNumberObject", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(!TS.Utils.TypeInfo.isNumberObject(_undefined), "Should return false on undefined value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isNumberObject(_null), "Should return false on a null value as argument.");
    assert.ok(TS.Utils.TypeInfo.isNumberObject(new Number()), "Should return true on a number object as argument.");
    assert.ok(!TS.Utils.TypeInfo.isNumberObject(5), "Should return false on a number value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isNumberObject("5"), "Should return false on a number string value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isNumberObject(NaN), "Should return false on a NaN object as argument.");
  });


  QUnit.test("isNumberValue", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(!TS.Utils.TypeInfo.isNumberValue(_undefined), "Should return false on undefined value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isNumberValue(_null), "Should return false on a null value as argument.");
    assert.ok(TS.Utils.TypeInfo.isNumberValue(5), "Should return true on a number value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isNumberValue(new Number()), "Should return false on a number object as argument.");
    assert.ok(!TS.Utils.TypeInfo.isNumberValue("5"), "Should return false on a number string value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isNumberValue(NaN), "Should return false on a NaN object as argument.");
  });


  QUnit.test("isObject", (assert) =>
  {
    var _undefined;
    var _null;
    var _regexp;

    _null = null;

    assert.ok(!TS.Utils.TypeInfo.isObject(_undefined), "Should return false on an undefined argument.");
    assert.ok(!TS.Utils.TypeInfo.isObject(_null), "Should return false on a null value as argument.");
    assert.ok(TS.Utils.TypeInfo.isObject({}), "Should return true on an object literal value as argument.");
    assert.ok(TS.Utils.TypeInfo.isObject(new Object()), "Should return true on an object instance value as argument.");

    assert.ok(TS.Utils.TypeInfo.isObject(new Array()), "Should return true on the javascript 'Array' object instance value as argument.");
    assert.ok(TS.Utils.TypeInfo.isObject([]), "Should return true on an array literal value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isObject(new Function()), "Should return false on the javascript 'Function' object instance value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isObject(() => { }), "Should return false on the javascript function literal value as argument.");
    assert.ok(TS.Utils.TypeInfo.isObject(new Boolean()), "Should return true on the javascript 'Boolean' object instance value as argument.");
    assert.ok(TS.Utils.TypeInfo.isObject(new Date()), "Should return true on the javascript 'Date' object instance value as argument.");
    assert.ok(TS.Utils.TypeInfo.isObject(new Error()), "Should return true on the javascript 'Error' object instance value as argument.");
    assert.ok(TS.Utils.TypeInfo.isObject(new Number()), "Should return true on the javascript 'Number' object instance value as argument.");
    assert.ok(TS.Utils.TypeInfo.isObject(new RegExp("ab+c", "i")), "Should return true on the javascript 'RegExp' instance object value as argument.");
    _regexp = /ab+c/i;
    assert.ok(TS.Utils.TypeInfo.isObject(_regexp), "Should return true on the javascript 'RegExp' literal value as argument.");
    assert.ok(TS.Utils.TypeInfo.isObject(new String()), "Should return true on the javascript 'String' object instance value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isObject("abcd"), "Should return false on the javascript 'String' literal value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isObject(NaN), "Should return false  on a  NaN value as argument.");
  });


  QUnit.test("isPositiveIntegerNumber", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(!TS.Utils.TypeInfo.isPositiveIntegerNumber(_undefined), "Should return false on undefined value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isPositiveIntegerNumber(_null), "Should return false on a null value as argument.");
    assert.ok(TS.Utils.TypeInfo.isPositiveIntegerNumber(0), "Should return true on a '0' value as argument.");
    assert.ok(TS.Utils.TypeInfo.isPositiveIntegerNumber(-0), "Should return true on a '-0' value as argument.");
    assert.ok(TS.Utils.TypeInfo.isPositiveIntegerNumber(1), "Should return true on a '1' value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isPositiveIntegerNumber(-1), "Should return false on a '-1' value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isPositiveIntegerNumber(2.5), "Should return false on a '2.5' float value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isPositiveIntegerNumber(NaN), "Should return false on a NaN value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isPositiveIntegerNumber("3"), "Should return false on a string value as argument.");

  });


  QUnit.test("isRegEx", (assert) =>
  {
    var _undefined;
    var _null;
    var _regexp;

    _null = null;
    _regexp = /ab+c/i;

    assert.ok(!TS.Utils.TypeInfo.isRegEx(_undefined), "Should return false on undefined value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isRegEx(_null), "Should return false on a null value as argument.");
    assert.ok(TS.Utils.TypeInfo.isRegEx(new RegExp("ab+c", "i")), "Should return true on the javascript 'RegExp' instance object value as argument.");
    assert.ok(TS.Utils.TypeInfo.isRegEx(_regexp), "Should return true on the javascript 'RegExp' literal value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isRegEx("/ab+c/i"), "Should return false on a string value as argument.");
  });


  QUnit.test("isString", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(!TS.Utils.TypeInfo.isString(_undefined), "Should return false on undefined value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isString(_null), "Should return false on a null value as argument.");
    assert.ok(TS.Utils.TypeInfo.isString(new String()), "Should return true on a javascript 'String' instance object value as argument.");
    assert.ok(TS.Utils.TypeInfo.isString(""), "Should return true on a string literal value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isString({}), "Should return false on an arbitrary object value as argument.");
  });


  QUnit.test("isStringObject", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(!TS.Utils.TypeInfo.isStringObject(_undefined), "Should return false on undefined value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isStringObject(_null), "Should return false on a null value as argument.");
    assert.ok(TS.Utils.TypeInfo.isStringObject(new String()), "Should return true on a javascript 'String' instance object value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isStringObject(""), "Should return false on a string literal value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isStringObject({}), "Should return false on an arbitrary object value as argument.");
  });


  QUnit.test("isStringValue", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(!TS.Utils.TypeInfo.isStringValue(_undefined), "Should return false on undefined value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isStringValue(_null), "Should return false on a null value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isStringValue(new String()), "Should return false on a javascript 'String' instance object value as argument.");
    assert.ok(TS.Utils.TypeInfo.isStringValue(""), "Should return true on a string literal value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isStringValue({}), "Should return false on an arbitrary object value as argument.");
  });


  QUnit.test("isUndefined", (assert) =>
  {
    var _undefined;
    var _null;

    _null = null;

    assert.ok(TS.Utils.TypeInfo.isUndefined(_undefined), "Should return true on an undefined argument.");
    assert.ok(!TS.Utils.TypeInfo.isUndefined(_null), "Should return false on a null value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isUndefined(0), "Should return false on an arbitrary value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isUndefined(NaN), "Should return false on a NaN value as argument.");
  });


}//END module