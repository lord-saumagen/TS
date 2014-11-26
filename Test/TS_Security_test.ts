"use strict";

module TS_Linq_Enumerable_test
{

  QUnit.module("TS.Security",
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

  QUnit.test("SHA1", (assert) =>
  {
    var _testArray: Array<{ message: string; digest: string; }>;
    var _SHA1: TS.Security.SHA1 = new TS.Security.SHA1();
    var _undefined;

    _testArray = new Array<{ message: string; digest: string; }>();

    _testArray.push({ message: "", digest: "da39a3ee5e6b4b0d3255bfef95601890afd80709" });
    _testArray.push({ message: "abc", digest: "a9993e364706816aba3e25717850c26c9cd0d89d" });
    _testArray.push({ message: "abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq", digest: "84983e441c3bd26ebaae4aa1f95129e5e54670f1" });
    _testArray.push({ message: "The quick brown fox jumps over the lazy dog", digest: "2fd4e1c67a2d28fced849ee1bb76e7391b93eb12" });
    _testArray.push({ message: "The quick brown fox jumps over the lazy cog", digest: "de9f2c7fd25e1b3afad3e85a0bd17d9b100db4b3" });

    _testArray.forEach((value: { message: string; digest: string }, index: number, array: { message: string; digest: string }[]) => 
    {
      var _digest = _SHA1.encrypt(value.message);
      assert.equal(_digest, value.digest, "Should return a digest which matches with the test values.");
    });

    assert.throws(() =>
    {
      var _digest = _SHA1.encrypt(null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'message' argument.");

    assert.throws(() =>
    {
      var _digest = _SHA1.encrypt(_undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'message' argument.");

  });

}//END module