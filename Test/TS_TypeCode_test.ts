"use strict";

module TS_TypeCode_test
{
  declare var document;
  var _arguments;

  QUnit.module("TS.TypeCode",
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


  QUnit.test("checkPositivIntegerNumberParameter", (assert) => 
  {
    var _List: TS.TypeCode.List<number>;
    var _numArray: Array<number>;

    _List = new TS.TypeCode.List<number>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    _List.add(1).add(2).add(3).add(4).add(5).add
    assert.equal(_List.count, 16, "Should hold 16 items.");

    _numArray = new Array();
    _List.remove(4);
    _List.indexOf(4);
    _List.copyTo(_numArray);
    var _len = _numArray.length;
  });

} 