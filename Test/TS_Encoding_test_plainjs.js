/// <reference path="../scripts/qunit.d.ts" />
/// <reference path="../scripts/jquery.d.ts" />
/// <reference path="../encoding/base64.ts" />
/// <reference path="../encoding/html.ts" />

"use strict";
var TS_Encoding_test;
(function (TS_Encoding_test)
{

  QUnit.test("Base64.decode", function (assert)
  {
    var _result;

    assert.equal(TS.Encoding.Base64.decode(), "", "Should return an empty string if called without an argument.");

    assert.throws(function ()
    {
      _result = TS.Encoding.Base64.decode({ test: "one" });
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'data' argument type.");


  });

  QUnit.test("Base64.encode", function (assert)
  {
    var _result;

    assert.equal(TS.Encoding.Base64.encode(), "", "Should return an empty string if called without an argument.");

    assert.throws(function ()
    {
      _result = TS.Encoding.Base64.encode({ test: "one" });
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'data' argument type.");


  });

})(TS_Encoding_test || (TS_Encoding_test = {})); //END module
