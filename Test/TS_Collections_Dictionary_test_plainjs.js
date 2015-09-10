/// <reference path="../Collections/Dictionary.js" />
/// <reference path="../Scripts/jquery-2.1.1.js" />
/// <reference path="../Scripts/qunit-1.15.0.js" />
/// <reference path="../Scripts/qunit-once.js" />
/// <reference path="../Utils/utils.js" />
/// <reference path="../Utils/typeinfo.js" />

"use strict"
var TS_Collections_Dictionary_test;
(function (TS_Collections_Dictionary_test)
{
  QUnit.test("constructor", function (assert)
  {
    var _dict;

    _dict = new TS.Collections.Dictionary();
    assert.ok(!TS.Utils.Assert.isNullOrUndefined(_dict), "Should return a new 'Dictionary' object after a call to the default constructor.");

    _dict = new TS.Collections.Dictionary(function (first, second) { return first.toLower() == second.toLower(); });
    assert.ok(!TS.Utils.Assert.isNullOrUndefined(_dict), "Should return a new 'Dictionary' object after a call to the overloaded constructor with an equality comparer.");

    assert.throws(function ()
    {
      _dict = TS.Collections.Dictionary();
    }, function (err)
    {
      return (err.name == "TS.InvalidOperationException") ? true : false;
    }, "Should throw a 'TS.InvalidOperationException' for an attempt to call the constructor without the 'new' operator.");
  });

  QUnit.test("copyTo", function (assert)
  {
    var _dict;

    _dict = new TS.Collections.Dictionary();
    _dict.add(1, "one");
    _dict.add(2, "two");
    _dict.add(3, "three");
    assert.throws(function ()
    {
      _dict.copyTo({}, 0);
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an attempt to copy to an object which is not an array.");
  })

  QUnit.test("remove", function (assert)
  {
    var _dict;

    _dict = new TS.Collections.Dictionary();
    _dict.add(1, "one");
    _dict.add(2, "two");
    _dict.add(3, "three");

    assert.throws(function ()
    {
      _dict.remove();
    }, function (err)
    {
      return (err.name == "TS.ArgumentNullOrUndefinedException") ? true : false;
    }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an attempt to remove from the dictionary without specifying a key or item.");
  })
})(TS_Collections_Dictionary_test || (TS_Collections_Dictionary_test = {}));