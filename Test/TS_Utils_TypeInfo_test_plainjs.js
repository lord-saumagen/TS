"use strict";
var TS_Utils_TypeInfo_test;
(function (TS_Utils_TypeInfo_test)
{

  QUnit.module("TS.Utils.TypeInfo",
    {
      setup: function ()
      {
        // prepare something for all following tests
      },
      teardown: function ()
      {
        // clean up after each test
      }
    });

  QUnit.test("isNullUndefOrEmpty", function (assert)
  {
    assert.ok(TS.Utils.TypeInfo.isNullUndefOrEmpty(new String()), "Should return false on a string object instance value as argument.");
    assert.ok(!TS.Utils.TypeInfo.isNullUndefOrEmpty({}), "Should return false on a object instance value as argument.");
  });

})(TS_Utils_TypeInfo_test || (TS_Utils_TypeInfo_test = {})); //END module
