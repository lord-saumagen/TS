/// <reference path="TS_Collections_List_test.js" />
/// <reference path="../Collections/List.js" />

"use strict";
var TS_Collections_List_test;
(function (TS_Collections_List_test)
{

  QUnit.test("constructor", function (assert)
  {
    var _List;

    assert.throws(function ()
    {
      _List = new TS.Collections.List({}, false);
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'array' argument type.");

    assert.throws(function ()
    {
      _List = new TS.Collections.List(null, {});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'allowNull' argument type.");

  });

  QUnit.test("copyTo", function (assert)
  {
    var _List = new TS.Collections.List([1, 2, 3, 4, 5, 6, 7]);
    var _tartetArray = new Array();

    assert.throws(function ()
    {
      _List.copyTo({});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'targetArray' argument type.");

    assert.throws(function ()
    {
      _List.copyTo(_tartetArray, {});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'index' argument type.");

  });

  QUnit.test("insert", function (assert)
  {
    var _List = new TS.Collections.List([1, 2, 3, 4, 5, 6, 7]);

    assert.throws(function ()
    {
      _List.insert({}, 99);
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'index' argument type.");

  });

})(TS_Collections_List_test || (TS_Collections_List_test = {})); //END module 