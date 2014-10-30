/// <reference path="../scripts/qunit.d.ts" />
/// <reference path="../scripts/jquery.d.ts" />

"use strict";

module TS_Utils_Compare_test
{

  QUnit.module("TS.Utils.Compare",
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

  QUnit.test("objects", (assert) =>
  {
    var testSimpleObj1 = new SimpleObject("SimpleObjOne", "SimpleObjOneValue");
    var testSimpleObj2 = new SimpleObject("SimpleObjTwo", "SimpleObjTwoValue");


    assert.ok(!TS.Utils.Compare.objects(testSimpleObj1, testSimpleObj2, 2), "Should return false on different objects of the same type.");
    assert.ok(!TS.Utils.Compare.objects(testSimpleObj1, { name: "SimpleObjOne", value: "SimpleObjOneValue", info() { } }), "Should return false on different objects of differnt types.");

  });


  QUnit.test("functions", (assert) =>
  {
    assert.ok(!TS.Utils.Compare.functions(function () { return 1; }, function () { return 2; }), "Should return false on different functions.");
    assert.ok(TS.Utils.Compare.functions(function () { return 1; }, function () { return 1; }), "Should return true on identical functions.");

  });


  QUnit.test("arrays", (assert) =>
  {
    assert.ok(!TS.Utils.Compare.arrays(new Array<string>("one", "two", "three"), new Array<number>(1, 2, 3)), "Should return false on arrays of different type.");
    assert.ok(!TS.Utils.Compare.arrays(new Array<string>("one", "two", "three"), new Array<string>("four", "five", "six")), "Should return false on arrays of the same type with different values.");
    assert.ok(TS.Utils.Compare.arrays(new Array<string>("one", "two", "three"), new Array<string>("one", "two", "three")), "Should return true on arrays of the same type with same values.");
    assert.ok(TS.Utils.Compare.arrays(new Array<string>("one", "two", "three"), new Array<string>("three", "two", "one")), "Should return true on arrays of the same type with same values but in different order.");
  });


  export class SimpleObject
  {
    constructor(public name: string, public value: any)
    {

    }

    public info()
    {
      return this.name + " :: " + this.value.toString();
    }

  }


  export class ComplexObject extends SimpleObject
  {
    private _array: Array<any>;
    private _innerObject: any;

    public get array(): Array<any>
    {
      return this._array;
    }

    public get innerObject(): any
    {
      return this._innerObject;
    }

    constructor(name: string, value: any, array: Array<any>, innerObject: any)
    {
      super(name, value);
      this._array = array;
      this._innerObject = innerObject;
    }

  }


  export function createEquivObject(obj: any): any
  {
    var _index: number;
    var _returnObj;
    var _currentKey: string;
    var _keyArr: Array<string>;

    _keyArr = TS.Utils.getPrototypeChainKeys(obj);
    _keyArr = _keyArr.concat(Object.keys(obj));
    _returnObj = {};

    if (_keyArr.length == 0)
    {
      return _returnObj;
    }//END if

    while (_keyArr.length > 0)
    {
      _index = Math.floor(Math.random() * _keyArr.length);
      _currentKey = _keyArr[_index];

      if (TS.Utils.TypeInfo.isArray(obj[_currentKey]))
      {

        _returnObj[_currentKey] = new Array();

        obj[_currentKey].forEach(function (element)
        {
          _returnObj[_currentKey].push(element);
        });

      }//END if
      else
      {
        _returnObj[_currentKey] = obj[_currentKey];
      }//END else
      delete _keyArr[_index];
      _keyArr = TS.Utils.compactArray(_keyArr);
    }//END if

    return _returnObj;
  }

}//END module