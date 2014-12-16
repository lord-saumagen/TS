"use strict";

module TS_Collections_Dictionary_test
{
  declare var document;
  var _arguments;

  QUnit.module("TS.Collections.Dictionary",
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
    var _dict: TS.Collections.Dictionary<string, string>;
    var _undefined;
    var _res;

    _dict = new TS.Collections.Dictionary<string, string>();
    _dict.add("one", "1");
    _dict.add("two", "2");
    _dict.add("three", "3");
    _dict.add("four", "4");
    _dict.add(new TS.Collections.KeyValuePair<string, string>("five", "5"));
    _res = _dict.add(new TS.Collections.KeyValuePair<string, string>("six", "6"));

    assert.equal(_dict.count(), 6, "Should reflect the number of added items.");

    assert.throws(() =>
    {
      _dict.add(_undefined);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a TS.InvalidTypeException for an undefined item in the add operation.");

    assert.throws(() =>
    {
      _dict.add(_undefined, "seven");
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a TS.ArgumentNullOrUndefinedException for an undefined key in the add operation.");

    assert.throws(() =>
    {
      _dict.add(null, "seven");
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a TS.ArgumentNullOrUndefinedException for a null key in the add operation.");

    assert.throws(() =>
    {
      _dict.add("seven", _undefined);
    }, (err) => ((err.name == "TS.ArgumentUndefinedException") ? true : false), "Should throw a TS.ArgumentUndefinedException for an undefined value in the add operation.");

    assert.throws(() =>
    {
      _dict.add("six", "7");
    }, (err) => ((err.name == "TS.Collections.DuplicateKeyException") ? true : false), "Should throw a TS.Collections.DuplicateKeyException for an attempt to add an item with a key which is already in use.");

    assert.throws(() =>
    {
      _dict.add(new TS.Collections.KeyValuePair<string, string>("five", "7"));
    }, (err) => ((err.name == "TS.Collections.DuplicateKeyException") ? true : false), "Should throw a TS.Collections.DuplicateKeyException for an attempt to add an item with a key which is already in use.");
  });

  QUnit.test("clear", (assert) => 
  {
    var _dict: TS.Collections.Dictionary<string, string>;

    _dict = new TS.Collections.Dictionary<string, string>();
    _dict.add("one", "1");
    _dict.add("two", "2");
    _dict.add("three", "3");
    _dict.add("four", "4");
    _dict.clear();
    assert.ok(_dict.count() == 0, "Dictionary length should be '0' after a call to clear.");
  });

  QUnit.test("constructor", (assert) =>
  {
    var _dictOne: TS.Collections.Dictionary<SortTest, string>;
    var _dictTwo: TS.Collections.Dictionary<string, string>;
    var _listSortTest: TS.Collections.List<SortTest>;
    var _index: number;
    var _undefined;

    _dictOne = new TS.Collections.Dictionary<SortTest, string>((first, second) =>
    {
      if ((first.color == second.color) && (first.number == second.number))
      {
        return true;
      }//END if
      return false;
    });

    _listSortTest = TS.Collections.List.fromArray(CreateSortTestArray());
    var _query = _listSortTest.orderBy(item => item.color);
    _index = 0;

    _query.forEach(item =>
    {
      try
      {
        _dictOne.add(item, _index.toString());
        _index++;
      }//END try
      catch (e)
      {
        if (e.name == "TS.Collections.DuplicateKeyException")
        {
          //nothing to do.
        }//END if
        else
        {
          //rethrow.
          throw e;
        }//END else
      }
    });

    assert.equal(_dictOne.count(), 8, "Should return the expected amount of items using the specified equality comparer during add operations.");

    _dictTwo = new TS.Collections.Dictionary<string, string>();

    _query.forEach(item =>
    {
      try
      {
        _dictTwo.add(item.color, item.location);
        _index++;
      }//END try
      catch (e)
      {
        if (e.name == "TS.Collections.DuplicateKeyException")
        {
          //nothing to do.
        }//END if
        else
        {
          //rethrow.
          throw e;
        }//END else
      }
    });

    assert.equal(_dictTwo.count(), 3, "Should return the expected amount of items using the default equality comparer during add operation.");

  });

  QUnit.test("containsKey", (assert) => 
  {
    var _dictOne: TS.Collections.Dictionary<string, string>;
    var _dictTwo: TS.Collections.Dictionary<SortTest, string>;
    var _listSortTest: TS.Collections.List<SortTest>;
    var _index: number;
    var _undefined;

    _dictOne = new TS.Collections.Dictionary<string, string>();
    _dictOne.add("one", "1");
    _dictOne.add("two", "2");
    _dictOne.add("three", "3");
    _dictOne.add("four", "4");

    assert.ok(_dictOne.containsKey("three"), "Should return true for a key which is part of the dictionary.");
    assert.ok(!_dictOne.containsKey("nop"), "Should return false for a key which is not part of the dictionary.");
    assert.ok(!_dictOne.containsKey(_undefined), "Should return false for an undefined key.");
    assert.ok(!_dictOne.containsKey(null), "Should return false for a null key.");

    _dictTwo = new TS.Collections.Dictionary<SortTest, string>((first, second) =>
    {
      if ((first.color == second.color) && (first.number == second.number) && (first.location == second.location))
      {
        return true;
      }//END if
      return false;
    });

    _listSortTest = TS.Collections.List.fromArray(CreateSortTestArray());
    var _query = _listSortTest.orderBy(item => item.color);
    _index = 0;

    _query.forEach(item =>
    {
      try
      {
        _dictTwo.add(item, _index.toString());
        _index++;
      }//END try
      catch (e)
      {
        if (e.name == "TS.Collections.DuplicateKeyException")
        {
          //nothing to do.
        }//END if
        else
        {
          //rethrow.
          throw e;
        }//END else
      }
    });

    assert.ok(_dictTwo.containsKey(new SortTest("red", 1, "europe")), "Should return true for a key which is part of the dictionary.");
    assert.ok(!_dictTwo.containsKey(new SortTest("blue", 1, "europe")), "Should return false for a key which is not part of the dictionary.");

  });

  QUnit.test("containsValue", (assert) => 
  {
    var _dict: TS.Collections.Dictionary<string, string>;
    var _undefined;

    _dict = new TS.Collections.Dictionary<string, string>();
    _dict.add("one", "1");
    _dict.add("two", "2");
    _dict.add("three", "3");
    _dict.add("four", "4");

    assert.ok(_dict.containsValue("3"), "Should return true for a value contained in the dictionary.");
    assert.ok(!_dict.containsValue("99"), "Should return false for a value not contained in the dictionary.");
    assert.ok(!_dict.containsValue(_undefined), "Should return false for a undefined value.");
  });

  QUnit.test("copyTo", (assert) => 
  {
    var _dict: TS.Collections.Dictionary<string, string>;
    var _targetArray: Array<TS.Collections.KeyValuePair<string, string>>;
    var _undefined;

    _targetArray = new Array<TS.Collections.KeyValuePair<string, string>>();
    _dict = new TS.Collections.Dictionary<string, string>();
    _dict.add("one", "1");
    _dict.add("two", "2");
    _dict.add("three", "3");
    _dict.add("four", "4");

    _dict.copyTo(_targetArray, 0);

    assert.ok(_targetArray.length == 4, "Should copy all elements to the target array.");

    _dict.copyTo(_targetArray, 4);

    assert.ok(_targetArray.length == 8, "Should copy all elements twice to the target array.");

    assert.throws(() =>
    {
      _dict.copyTo(_targetArray, 11);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a TS.ArgumentOutOfRangeException for an attempt to copy outside the range of the target array.");

    assert.throws(() =>
    {
      _dict.copyTo(null, 11);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a TS.ArgumentNullOrUndefinedException for an attempt to copy to a null value.");

    assert.throws(() =>
    {
      _dict.copyTo(_undefined, 11);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a TS.ArgumentNullOrUndefinedException for an attempt to copy to an undefined value.");

  });

  QUnit.test("getItem", (assert) => 
  {
    var _dict: TS.Collections.Dictionary<string, string>;
    var _undefined;
    var _item: TS.Collections.KeyValuePair<string, string>;

    _dict = new TS.Collections.Dictionary<string, string>();
    _dict.add("one", "1");
    _dict.add("two", "2");
    _dict.add("three", "3");
    _dict.add("four", "4");

    _item = _dict.getItem("three");
    assert.ok(_item.key == "three" && _item.value == "3", "Should return the item with the specified key.");

    _item = _dict.getItem(null);
    assert.ok(_item == null, "Should return 'null' for an attempt to get an item with a 'null' key.");

    _item = _dict.getItem(_undefined);
    assert.ok(_item == null, "Should return 'null' for an attempt to get an item with an 'undefined' key.");

  });

  QUnit.test("getValue", (assert) => 
  {
    var _dict: TS.Collections.Dictionary<string, string>;
    var _undefined;
    var _item: TS.Collections.KeyValuePair<string, string>;
    var _value: string;

    _dict = new TS.Collections.Dictionary<string, string>();
    _dict.add("one", "1");
    _dict.add("two", "2");
    _dict.add("three", "3");
    _dict.add("four", "4");

    _value = _dict.getValue("three");
    assert.equal(_value, "3", "Should return the expected value for the given key.");

    _value = _dict.getValue("nop");
    assert.equal(_value, null, "Should return a null value for a key which is not available in the current dictionary.");

    _value = _dict.getValue(null);
    assert.equal(_value, null, "Should return a null value for a null key value.");

    _value = _dict.getValue(_undefined);
    assert.equal(_value, null, "Should return a null value for an undefined key value.");
  });

  QUnit.test("keys", (assert) => 
  {
    var _dict: TS.Collections.Dictionary<string, string>;

    _dict = new TS.Collections.Dictionary<string, string>();
    _dict.add("one", "1");
    _dict.add("two", "2");
    _dict.add("three", "3");
    _dict.add("four", "4");

    assert.equal(_dict.keys.count(), 4, "Should return the expected amount of keys.");
    assert.deepEqual(_dict.keys.toArray(), ["one", "two", "three", "four"], "Should return the expected keys.");
  });

  QUnit.test("memberwiseClone", (assert) => 
  {
    var _dict: TS.Collections.Dictionary<string, SortTest>;
    var _dictCopy: TS.Collections.Dictionary<string, SortTest>;
    var _listSortTest: TS.Collections.List<SortTest>;
    var _index: number;

    _listSortTest = TS.Collections.List.fromArray(CreateSortTestArray());
    var _query = _listSortTest.orderBy(item => item.color);
    _index = 0;
    _dict = new TS.Collections.Dictionary<string, SortTest>();

    _query.forEach(item =>
    {
      try
      {
        _dict.add(_index.toString(), item);
        _index++;
      }//END try
      catch (e)
      {
        if (e.name == "TS.Collections.DuplicateKeyException")
        {
          //nothing to do.
        }//END if
        else
        {
          //rethrow.
          throw e;
        }//END else
      }
    });

    _dictCopy = _dict.memberwiseClone();
    assert.equal(_dictCopy.count(), _dict.count(), "Both dictionaries should show the same amount of items.");
    assert.deepEqual(_dictCopy.getItem("2"), _dict.getItem("2"), "Elements on both doctionaries should be equal.");
    (<SortTest> _dict.getItem("2").value).number = 42;
    assert.deepEqual(_dictCopy.getItem("2"), _dict.getItem("2"), "Elements on both doctionaries should be equal even after a change of an element in one dictionary.");

  });

  QUnit.test("remove", (assert) => 
  {
    var _dict: TS.Collections.Dictionary<string, string>;
    var _undefined;

    _dict = new TS.Collections.Dictionary<string, string>();
    _dict.add("one", "1");
    _dict.add("two", "2");
    _dict.add("three", "3");
    _dict.add("four", "4");

    _dict.remove("four");
    assert.equal(_dict.count(), 3, "Should have the expected length after a remove by key.");

    _dict.remove(new TS.Collections.KeyValuePair<string, string>("two", "2"));
    assert.equal(_dict.count(), 2, "Should have the expected length after a remove by item.");

    _dict.remove("nop");
    assert.equal(_dict.count(), 2, "Should have an unchanged length after an attempt to remove ba an invalid key.");

    _dict.remove(new TS.Collections.KeyValuePair<string, string>("nop", "nop"));
    assert.equal(_dict.count(), 2, "Should have an unchanged length after an attempt to remove ba an invalid item.");

    _dict.remove("one").remove("two").remove("three").remove("four").remove("five");
    assert.equal(_dict.count(), 0, "Should have a length of '0' after removing all items.")


    assert.throws(() =>
    {
      _dict.remove(null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a TS.ArgumentNullOrUndefinedException for an attempt to remove with a null key.");

    assert.throws(() =>
    {
      _dict.remove(_undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a TS.ArgumentNullOrUndefinedException for an attempt to remove with an undefined key.");

  });

  QUnit.test("setItem", (assert) => 
  {
    var _dict: TS.Collections.Dictionary<string, string>;
    var _undefined;

    _dict = new TS.Collections.Dictionary<string, string>();
    _dict.add("one", "1");
    _dict.add("two", "2");
    _dict.add("three", "3");
    _dict.add("four", "4");

    _dict.setItem("three", "33");
    assert.equal(_dict.getValue("three"), "33", "Should reflect the change on the specified item after a call to 'setItem'.");

    assert.throws(() =>
    {
      _dict.setItem("five", "55")
    }, (err) => ((err.name == "TS.Collections.InvalidKeyException") ? true : false), "Should throw a TS.Collections.InvalidKeyException for an attempt to set the value of an item which is not contained in the dictionary.");

    assert.throws(() =>
    {
      _dict.setItem(null, "55")
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a TS.Collections.InvalidKeyException for an attempt to call with a null key.");

    assert.throws(() =>
    {
      _dict.setItem(_undefined, "55")
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a TS.Collections.InvalidKeyException for an attempt to call with an undefined key.");

  });

  QUnit.test("values", (assert) => 
  {
    var _dict: TS.Collections.Dictionary<string, string>;
    var _undefined;

    _dict = new TS.Collections.Dictionary<string, string>();
    _dict.add("one", "1");
    _dict.add("two", "2");
    _dict.add("three", "3");
    _dict.add("four", "4");

    assert.equal(_dict.values.count(), 4, "Should return the expected amount of values.");
    assert.deepEqual(_dict.values.toArray(), ["1", "2", "3", "4"], "Should return the expected values.");
  });

  class SortTest
  {
    constructor(public color: string, public number: number, public location: string)
    {
    }
  }

  /**
  *  @description
  *    Creates and returns an array containing
  *    12 elements of type 'ISortTestItem'.
  */
  export function CreateSortTestArray(): Array<SortTest>
  {
    return new Array(
      { color: "red", number: 1, location: "europe" },
      { color: "blue", number: 3, location: "asia" },
      { color: "red", number: 1, location: "europe" },
      { color: "red", number: 2, location: "america" },
      { color: "blue", number: 2, location: "australia" },
      { color: "red", number: 1, location: "america" },
      { color: "green", number: 1, location: "asia" },
      { color: "red", number: 1, location: "america" },
      { color: "green", number: 3, location: "greenland" },
      { color: "red", number: 3, location: "europe" },
      { color: "blue", number: 1, location: "africa" },
      { color: "red", number: 3, location: "greenland" });
  }

}//END module
