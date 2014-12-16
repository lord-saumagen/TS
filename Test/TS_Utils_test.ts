"use strict";

module TS_Utils_test
{
  declare var document;

  export class TestConstructorCallClass
  {
    public constructor()
    {
      TS.Utils.checkConstructorCall(this, TS_Utils_test.TestConstructorCallClass);
    }
  }

  QUnit.module("TS.Utils",
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


  QUnit.test("checkBooleanParameter", (assert) =>
  {
    var _undefined;

    TS.Utils.checkBooleanParameter(true, "true", "checkBooleanParameter")
    assert.ok(true, "Should pass for a parameter value which is the boolean true.");

    TS.Utils.checkBooleanParameter(false, "false", "checkBooleanParameter")
    assert.ok(true, "Should pass for a parameter value which is the boolean false.");

    assert.throws(() => 
    {
      TS.Utils.checkBooleanParameter(null, "null", "checkBooleanParameter");
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a parameter value which is a null value.");

    assert.throws(() => 
    {
      TS.Utils.checkBooleanParameter(_undefined, "undefined", "checkBooleanParameter");
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a parameter value which is an undefined value.");

    assert.throws(() => 
    {
      TS.Utils.checkBooleanParameter({}, "object", "checkBooleanParameter");
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a parameter value which isn't a boolean at all.");

    assert.throws(() => 
    {
      TS.Utils.checkBooleanParameter("", "string", "checkBooleanParameter");
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a parameter value which isn't a boolean at all.");
  });


  QUnit.test("checkConstructorCall", (assert) =>
  {
    var _constructResult: any;

    _constructResult = new TestConstructorCallClass();
    assert.ok(true, "Should pass for a valid constructor call with the new operator.");
  });


  QUnit.test("checkConstructorParameter", (assert) =>
  {
    var _undefined;
    var _testFunc;
    var _testFactoryFunc;

    TS.Utils.checkConstructorParameter(TS.TypeCode.UInt64, "constructor", "checkConstructorParameter");
    assert.ok(true, "Should pass without an exception for a parameter value which is a constructor function.");

    _testFunc = function (first: number, second: number): number
    {
      return first + second;
    }

    _testFactoryFunc = function ()
    {
      return new TS.TypeCode.UInt64();
    }

    assert.throws(() => 
    {
      TS.Utils.checkConstructorParameter(_testFunc, "object", "checkConstructorParameter");
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a parameter value which isn't meant to be a constructor function.");

    assert.throws(() => 
    {
      TS.Utils.checkConstructorParameter(_testFactoryFunc, "object", "checkConstructorParameter");
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a parameter value which is a factory function instead of a constructor function.");

    assert.throws(() => 
    {
      TS.Utils.checkConstructorParameter({}, "object", "checkConstructorParameter");
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a parameter value which is a object.");

    assert.throws(() => 
    {
      TS.Utils.checkConstructorParameter("", "string", "checkConstructorParameter");
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a parameter value which is a string.");

    assert.throws(() => 
    {
      TS.Utils.checkConstructorParameter(null, "null", "checkConstructorParameter");
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for parameter value which is a null value.");

    assert.throws(() => 
    {
      TS.Utils.checkConstructorParameter(_undefined, "undefined", "checkConstructorParameter");
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a parameter value which is undefined.");
  });


  QUnit.test("checkFunctionParameter", (assert) => 
  {
    var _undefined;

    TS.Utils.checkFunctionParameter(() => { }, "func", "checkFunctionParameter");
    assert.ok(true, "Should pass without an exception for a parameter value which is a function.");

    assert.throws(() => 
    {
      TS.Utils.checkIntegerNumberParameter(null, "null", "checkFunctionParameter");
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a parameter value which is a null value.");

    assert.throws(() => 
    {
      TS.Utils.checkIntegerNumberParameter(_undefined, "undefined", "checkFunctionParameter");
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a parameter value which is undefined.");
  });


  QUnit.test("checkIntegerNumberParameter", (assert) => 
  {
    var _undefined;

    TS.Utils.checkIntegerNumberParameter(1, "one", "checkIntegerNumberParameter");
    assert.ok(true, "Should pass without an exception for a parameter value which is a postitive integer number.");

    TS.Utils.checkIntegerNumberParameter(-1, "minusOne", "checkIntegerNumberParameter");
    assert.ok(true, "Should pass without an exception for a parameter value which is a negative integer number.");

    TS.Utils.checkIntegerNumberParameter(0, "zero", "checkIntegerNumberParameter");
    assert.ok(true, "Should pass without an exception for a parameter value which is a number with the value '0'.");

    TS.Utils.checkIntegerNumberParameter(Number.MAX_VALUE, "MAX_VALUE", "checkIntegerNumberParameter");
    assert.ok(true, "Should pass without an exception for MAX_VALUE of number.");

    assert.throws(() => 
    {
      TS.Utils.checkIntegerNumberParameter(Number.POSITIVE_INFINITY, "POSITIVE_INFINITY", "checkIntegerNumberParameter");
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a parameter value which is a  POSITIVE_INFINITY number.");

    assert.throws(() => 
    {
      TS.Utils.checkIntegerNumberParameter(Number.NEGATIVE_INFINITY, "NEGATIVE_INFINITY", "checkIntegerNumberParameter");
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a parameter value which is a  POSITIVE_INFINITY number.");

    assert.throws(() => 
    {
      TS.Utils.checkIntegerNumberParameter(0.5, "zeroPointFive", "checkIntegerNumberParameter");
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a parameter value which is a  floating point number.");

    assert.throws(() => 
    {
      TS.Utils.checkIntegerNumberParameter(Number.NaN, "NaN", "checkIntegerNumberParameter");
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a parameter value which is NaN.");

    assert.throws(() => 
    {
      TS.Utils.checkIntegerNumberParameter(null, "null", "checkIntegerNumberParameter");
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for parameter value which is a null value.");

    assert.throws(() => 
    {
      TS.Utils.checkIntegerNumberParameter(_undefined, "undefined", "checkIntegerNumberParameter");
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a parameter value which is undefined.");
  });


  QUnit.test("checkNotUndefinedParameter", (assert) =>
  {
    var _undefined;

    TS.Utils.checkNotUndefinedParameter({}, "object", "checkNotUndefinedParameter");
    assert.ok(true, "Should pass without an exception for a parameter value which is an object.");

    TS.Utils.checkNotUndefinedParameter("", "string", "checkNotUndefinedParameter");
    assert.ok(true, "Should pass without an exception for a parameter value which is a string.");

    TS.Utils.checkNotUndefinedParameter(null, "null", "checkNotUndefinedParameter");
    assert.ok(true, "Should pass without an exception for a parameter value which is null.");

    assert.throws(() =>
    {
      TS.Utils.checkNotUndefinedParameter(_undefined, "undefined", "checkNotUndefinedParameter");
    }, (err) => ((err.name == "TS.ArgumentUndefinedException") ? true : false), "Should throw a 'TS.ArgumentUndefinedException' for a parameter value which is undefined.");
  });


  QUnit.test("checkParameter", (assert) =>
  {
    var _undefined;

    TS.Utils.checkParameter({}, "object", "checkParameter");
    assert.ok(true, "Should pass without an exception for a parameter value which is an object.");

    TS.Utils.checkParameter("", "string", "checkParameter");
    assert.ok(true, "Should pass without an exception for a parameter value which is a string.");

    assert.throws(() => 
    {
      TS.Utils.checkParameter(null, "null", "checkParameter");
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a parameter value which is a null value.");

    assert.throws(() => 
    {
      TS.Utils.checkParameter(_undefined, "undefined", "checkParameter");
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a parameter value which is undefined.");
  });


  QUnit.test("checkPositivIntegerNumberParameter", (assert) => 
  {
    var _undefined;

    TS.Utils.checkPositivIntegerNumberParameter(1, "one", "checkPositivIntegerNumberParameter");
    assert.ok(true, "Should pass without an exception for a parameter value which is a postitive integer number.");

    TS.Utils.checkPositivIntegerNumberParameter(Number.MAX_VALUE, "MAX_VALUE", "checkPositivIntegerNumberParameter");
    assert.ok(true, "Should pass without an exception for MAX_VALUE of number.");

    TS.Utils.checkPositivIntegerNumberParameter(0, "zero", "checkPositivIntegerNumberParameter");
    assert.ok(true, "Should pass without an exception for a parameter value which is a number with the value '0'.");

    assert.throws(() => 
    {
      TS.Utils.checkPositivIntegerNumberParameter(Number.POSITIVE_INFINITY, "POSITIVE_INFINITY", "checkPositivIntegerNumberParameter");
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a parameter value which is a  POSITIVE_INFINITY number.");

    assert.throws(() => 
    {
      TS.Utils.checkPositivIntegerNumberParameter(0.5, "zeroPointFive", "checkPositivIntegerNumberParameter");
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a parameter value which is a  floating point number.");

    assert.throws(() => 
    {
      TS.Utils.checkPositivIntegerNumberParameter(-1, "minusOne", "checkPositivIntegerNumberParameter");
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a parameter value which is a negative integer number.");

    assert.throws(() => 
    {
      TS.Utils.checkPositivIntegerNumberParameter(Number.NaN, "NaN", "checkPositivIntegerNumberParameter");
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a parameter value which is NaN.");

    assert.throws(() => 
    {
      TS.Utils.checkPositivIntegerNumberParameter(null, "null", "checkPositivIntegerNumberParameter");
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for parameter value which is a null value.");

    assert.throws(() => 
    {
      TS.Utils.checkPositivIntegerNumberParameter(_undefined, "undefined", "checkPositivIntegerNumberParameter");
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a parameter value which is undefined.");

  });


  QUnit.test("checkStringParameter", (assert) => 
  {
    var _undefined;

    TS.Utils.checkStringParameter("String", "string", "checkStringParameter");
    assert.ok(true, "Should pass without an exception for a parameter value which is a string.");

    assert.throws(() => 
    {
      TS.Utils.checkStringParameter("", "emptyString", "checkStringParameter");
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrWhiteSpaceException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrWhiteSpaceException' for a parameter value which is an empty string.");

    assert.throws(() => 
    {
      TS.Utils.checkStringParameter("     \r\n", "whitespaceString", "checkStringParameter");
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrWhiteSpaceException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrWhiteSpaceException' for a  parameter value which is a whitespace string.");

    assert.throws(() => 
    {
      TS.Utils.checkStringParameter(null, "null", "checkStringParameter");
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a parameter value which is a null value.");

    assert.throws(() => 
    {
      TS.Utils.checkStringParameter(_undefined, "undefined", "checkStringParameter");
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a parameter value which is undefined.");
  });


  QUnit.test("checkUInt64NumberParameter", (assert) => 
  {
    var _undefined;
    var _UInt64: TS.TypeCode.UInt64;

    _UInt64 = TS.TypeCode.UInt64.number2UInt64(0xFFFFFFFF * 1024);

    TS.Utils.checkUInt64NumberParameter(_UInt64, "UInt64", "checkUInt64NumberParameter");
    assert.ok(true, "Should pass without an exception for a parameter value which is a UInt64.");

    assert.throws(() => 
    {
      TS.Utils.checkUInt64NumberParameter(null, "null", "checkUInt64NumberParameter");
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a parameter value which is a null value.");

    assert.throws(() => 
    {
      TS.Utils.checkUInt64NumberParameter(_undefined, "undefined", "checkUInt64NumberParameter");
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a parameter value which is undefined.");
  });


  QUnit.test("compactArray", (assert) =>
  {
    var _testArray: Array<any>;
    var _resultArray: Array<any>;

    _testArray = [1, 2, 3, , 5, 6, , 7, 8, , 9, , 11];
    _resultArray = TS.Utils.compactArray(_testArray);
    assert.equal(_resultArray.length, 9, "Should return an array which has as much elements as the source array had assigned elements.");

  });


  QUnit.test("createGUID", (assert) =>
  {
    var _GUIDArray: Array<string>;
    var _index: number;

    _GUIDArray = new Array<string>();

    for (_index = 0; _index < 1000; _index++)
    {
      _GUIDArray.push(TS.Utils.createGUID());
    }//END for

    assert.equal(_GUIDArray.length, 1000, "Should create an array with 1000 GUIDs.");

    _GUIDArray = TS.Linq.Extensions.distinct(TS.Linq.Enumerable.fromArray(_GUIDArray)).toArray();
    assert.equal(_GUIDArray.length, 1000, "All elements in the array should be unique.");
  });


  QUnit.test("getFunctionName", (assert) =>
  {
    var _name: string;
    var _undefined;

    _name = TS.Utils.getFunctionName(TestConstructorCallClass);
    assert.equal(_name, "TestConstructorCallClass", "Should return the expected function name.");

    _name = TS.Utils.getFunctionName(function TestFunc() { });
    assert.equal(_name, "TestFunc", "Should return the expected function name.");

    _name = TS.Utils.getFunctionName(function () { });
    assert.ok(_name.trim().length == 0, "Should return an empty string for an anonymous function argument.");

    assert.throws(() => 
    {     
      TS.Utils.getFunctionName(null);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a parameter value which is a null value.");

    assert.throws(() => 
    {
      TS.Utils.getFunctionName(_undefined);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a parameter value which is undefined.");
  });


  QUnit.test("HTMLCollectionToArray", (assert) =>
  {
    var _HTMLArray: Array<HTMLElement>;
    var _HTMLEnumearable: TS.Linq.Enumerable<HTMLElement>;
    var _htmlElement: HTMLElement;
    var _headElement: HTMLElement;
    var _bodyElement: HTMLElement;

    _HTMLArray = TS.Utils.HTMLCollectionToArray((<HTMLDocument> document).all);

    assert.ok(_HTMLArray.length > 1, "Should return an array with more than one element.");

    _HTMLEnumearable = TS.Linq.Extensions.fromArray(_HTMLArray);

    _htmlElement = _HTMLEnumearable.where(_ELE => _ELE.tagName.toLowerCase() == "html").single();
    _headElement = _HTMLEnumearable.where(_ELE => _ELE.tagName.toLowerCase() == "head").single();
    _bodyElement = _HTMLEnumearable.where(_ELE => _ELE.tagName.toLowerCase() == "body").single();

    assert.ok(_htmlElement != null && _headElement != null && _bodyElement != null, "Schould at least consist of a 'html', 'head' and 'body' element.");
  });


  QUnit.test("normalizePath", (assert) =>
  {
    var _undefined;
    var _testPath;
    var _resultPath;

    _testPath = "C:\\\\Windows\\Programs\\Test Programs\\Data";
    _resultPath = TS.Utils.normalizePath(_testPath);
    assert.equal(_resultPath.indexOf("\\"), -1, "Should return a path with no more backslashes.");

    _resultPath = TS.Utils.normalizePath(null);
    assert.equal(_resultPath.length, 0, "Should return an empty path when called with a null value.");

    _resultPath = TS.Utils.normalizePath(_undefined);
    assert.equal(_resultPath.length, 0, "Should return an empty path when called with a undefined value.");

  });


  QUnit.test("padLeft", (assert) =>
  {
    var _undefined;
    var _sourceString: string;
    var _destinyString: string;

    _sourceString = "OneTwo";
    _destinyString = TS.Utils.padLeft(_sourceString, "12", 40);
    assert.equal(_destinyString.length, 40, "Should return a string with the expected length");

    _destinyString = TS.Utils.padLeft(_sourceString, null, 40);
    assert.equal(_destinyString, _sourceString, "Should return a copy of the source string if argument fillChar is invalid.");

    _sourceString = TS.Utils.padLeft(_sourceString, "&", -10);
    assert.equal(_destinyString, _sourceString, "Should return a copy of the source string if argument length is invalid.");

    _destinyString = TS.Utils.padLeft(null, "12345", 10);
    assert.equal(_destinyString, "1234512345", "Should return a string consisting only of concatenated fillChar values if calle with a null value for the source parameter.");

    _destinyString = TS.Utils.padLeft(_undefined, "12345", 10);
    assert.equal(_destinyString, "1234512345", "Should return a string consisting only of concatenated fillChar values if calle with an undefined value for the source parameter.");
  });

} 