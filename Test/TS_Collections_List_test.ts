"use strict";

module TS_Collections_List_test
{
  declare var document;
  var _arguments;

  QUnit.module("TS.Collections.List",
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


  QUnit.test("add", (assert) => 
  {
    var _list: TS.Collections.List<number>;
    var _undefined;

    _list = new TS.Collections.List([1, 2, 3, 4, 5, 6, 7]);
    _list.add(8);
    _list.add(9);
    assert.equal(_list.count(), 9, "Should show the expected numbers of elements.");

    _list.add(null);
    _list.add(null);
    assert.equal(_list.count(), 11, "Should allow to add an arbitrary number of null values.");

    assert.throws(() =>
    {
      _list.add(_undefined);
    }, (err) => ((err.name == "TS.ArgumentUndefinedException") ? true : false), "Should throw a TS.ArgumentUndefinedException for an undefined item in the add operation.");

  });

  QUnit.test("clear", (assert) => 
  {
    var _list: TS.Collections.List<number>;
    var _undefined;

    _list = new TS.Collections.List([1, 2, 3, 4, 5, 6, 7]);
    _list.add(8);
    _list.add(9);
    _list.clear();
    assert.equal(_list.count(), 0, "Should count 0 elements after a call to clear.");

  });

  QUnit.test("constructor", (assert) =>
  {
    var _list: TS.Collections.List<number>;
    var _listNotNull: TS.Collections.List<number>;

    _list = new TS.Collections.List<number>();
    assert.equal(_list.count(), 0, "Should create a new list with zero elements.");
    _list = new TS.Collections.List<number>([1, 2, 3, 4, 5, null, 6]);
    assert.equal(_list.count(), 7, "Should create a new list with the expected number of elements.");
    _listNotNull = new TS.Collections.List<number>(null, false);
    assert.equal(_listNotNull.count(), 0, "Should create a new list with zero elements.");
    _listNotNull = new TS.Collections.List<number>([1, 2, 3, 4, 5, 6]);
    assert.equal(_listNotNull.count(), 6, "Should create a new list with the expected number of elements.");

    assert.throws(() => 
    {
      _listNotNull = new TS.Collections.List<number>([1, 2, 3, 4, 5, null, 6], false);
      
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for an attempt to create a new list with an array which contains null values when 'allowNull' is set to false.");

  });

  QUnit.test("copyTo", (assert) =>
  {
    var _list: TS.Collections.List<number>;
    var _testArray: Array<number>;
    var _undefined;

    _testArray = new Array<number>();
    _list = new TS.Collections.List([1, 2, 3, 4, 5, 6, 7]);
    _list.copyTo(_testArray);
    assert.equal(_testArray.length, _list.count(), "Number of elements in the target array should be equal to the number of element in the list after a call to copyTo.");

    _list.copyTo(_testArray, 5);
    assert.equal(_testArray.length, 12, "Number of elements in the target array should be equal to the number of element in the list after a call to copyTo.");

    assert.throws(() =>
    {
      _list.copyTo(null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw TS.ArgumentNullOrUndefinedException a when called with a null 'targetArray' argument.");

    assert.throws(() =>
    {
      _list.copyTo(_undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw TS.ArgumentNullOrUndefinedException a when called with an undefined 'targetArray' argument.");

    assert.throws(() =>
    {
      _list.copyTo(_testArray, 99);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw TS.ArgumentOutOfRangeException a when called with a null 'destIndex' argument out of the range or the target array.");

    assert.throws(() =>
    {
      _list.copyTo(_testArray, null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw TS.ArgumentNullOrUndefinedException a when called with a null 'destIndex' argument.");
  });


  QUnit.test("fromArray", (assert) => 
  {
    var _list: TS.Collections.List<number>;

    _list = TS.Collections.List.fromArray([1, 2, 3, 4]);
    assert.equal(_list.count(), 4, "Should create a list with 4 elements.");
  });

  QUnit.test("indexOf", (assert) =>
  {
    var _list: TS.Collections.List<number>;
    var _index: number;

    _list = new TS.Collections.List([1, 2, 3, 4, 5, 6, 7]);
    _index = _list.indexOf(5);
    assert.equal(_index, 4, "Should return the correct index of the element in question.");

  });

  QUnit.test("insert", (assert) =>
  {
    var _list: TS.Collections.List<number>;
    var _undefined;

    _list = new TS.Collections.List([1, 2, 3, 4, 5, 6, 7]);
    _list.insert(4, 99);
    assert.equal(_list.indexOf(99), 4, "Should reflect the insertions of a new item at the given indes.");
    _list.insert(0, 88);
    assert.equal(_list.indexOf(88), 0, "Should reflect the insertions of a new item at the given indes.");
    _list.insert(_list.count(), 77);
    assert.equal(_list.indexOf(77), _list.count() - 1, "Should reflect the insertions of a new item at the given indes.");

    assert.throws(() =>
    {
      _list.insert(100, 66);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a TS.ArgumentOutOfRangeException for an attempt to insert a new item at an index out of range.");

    assert.throws(() =>
    {
      _list.insert(null, 66);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw TS.ArgumentNullOrUndefinedException a when called with a null 'index' argument.");

    assert.throws(() =>
    {
      _list.insert(_undefined, 66);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw TS.ArgumentNullOrUndefinedException a when called with an undefined 'index' argument.");

    assert.throws(() =>
    {
      _list.insert(-5, 66);   
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw TS.ArgumentNullOrUndefinedException a when called with a negative 'index' argument.");
  });

  QUnit.test("remove", (assert) => 
  {
    var _list: TS.Collections.List<number>;
    var _startLength: number;
    var _undefined;

    _list = new TS.Collections.List([1, 2, 3, 4, 5, 6, 7, null, 8, 9, null, 10]);
    _startLength = _list.count();
    _list.remove(3);
    assert.equal(_list.count(), _startLength - 1, "Should show the correct count after removing an element.");
    _list.remove(null);
    assert.equal(_list.count(), _startLength - 2, "Should show the correct count after removing an element.");
    _list.remove(null);
    assert.equal(_list.count(), _startLength - 3, "Should show the correct count after removing an element.");
    

  });

  QUnit.test("removeAt", (assert) =>
  {
    var _list: TS.Collections.List<number>;
    var _startLength: number;
    var _element;
    var _undefined;

    _list = new TS.Collections.List([1, 2, 3, 4, 5, 6, 7, null, 8, 9, null, 10]);
    _startLength = _list.count();
    _element = _list.elementAt(7);
    _list.removeAt(7);
    assert.notEqual(_list.elementAt(7), _element, "Should have removed the element at the specified position.");
    _element = _list.elementAt(9);
    _list.removeAt(9);
    assert.notEqual(_list.elementAt(9), _element, "Should have removed the element at the specified position.");
    assert.equal(_list.count(), _startLength - 2, "Should now contain 2 less elements than at the beginning.");
    _list.removeAt(-1);
    assert.equal(_list.count(), _startLength - 2, "Should fail silent for an invalid index argument.");
  });

  //add: (item: T) => void ;
  //clear: () => void ;
  //copyTo: (targetArray: Array<T>, index: number) => void ;
  //indexOf: (item: T) => number;
  //insert: (index: number, value: T) => void ;
  //remove: (value: T) => void ;
  //removeAt: (index: number) => void ;
  //toList: () => IList < T>;

} 