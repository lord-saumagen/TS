"use strict";
var TS_Utils_Assert_test;
(function (TS_Utils_Assert_test)
{

  QUnit.module("TS.Utils.Assert (plain js)",
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

  QUnit.test("isNullUndefOrEmpty (plain js)", function (assert)
  {
    assert.ok(TS.Utils.Assert.isNullUndefOrEmpty(new String()), "Should return false on a string object instance value as argument.");
    assert.ok(!TS.Utils.Assert.isNullUndefOrEmpty({}), "Should return false on a object instance value as argument.");
  });

})(TS_Utils_Assert_test || (TS_Utils_Assert_test = {})); //END module
