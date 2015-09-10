"use strict";

module TS_Security_test
{
  var SHA1_testArray: Array<{ message: string; digest: string; }>;
  var SHA224_testArray: Array<{ message: string; digest: string; }>;
  var SHA256_testArray: Array<{ message: string; digest: string; }>;

  QUnit.module("TS.Security Hash",
    {
      setupOnce: function ()
      {


        SHA1_testArray = new Array<{ message: string; digest: string; }>();
        SHA1_testArray.push({ message: "", digest: "da39a3ee5e6b4b0d3255bfef95601890afd80709" });
        SHA1_testArray.push({ message: "abc", digest: "a9993e364706816aba3e25717850c26c9cd0d89d" });
        SHA1_testArray.push({ message: "abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq", digest: "84983e441c3bd26ebaae4aa1f95129e5e54670f1" });
        SHA1_testArray.push({ message: "The quick brown fox jumps over the lazy dog", digest: "2fd4e1c67a2d28fced849ee1bb76e7391b93eb12" });
        SHA1_testArray.push({ message: "The quick brown fox jumps over the lazy cog", digest: "de9f2c7fd25e1b3afad3e85a0bd17d9b100db4b3" });


        SHA224_testArray = new Array<{ message: string; digest: string; }>();
        SHA224_testArray.push({ message: "abc", digest: "23097d223405d8228642a477bda255b32aadbce4bda0b3f7e36c9da7" });
        SHA224_testArray.push({ message: "abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq", digest: "75388b16512776cc5dba5da1fd890150b0c6455cb4f58b1952522525" });
        SHA224_testArray.push({ message: "", digest: "d14a028c2a3a2bc9476102bb288234c415a2b01f828ea62ac5b3e42f" });
        SHA224_testArray.push({ message: "The quick brown fox jumps over the lazy dog", digest: "730e109bd7a8a32b1cb9d9a09aa2325d2430587ddbc0c38bad911525" });
        SHA224_testArray.push({ message: "The quick brown fox jumps over the lazy dog.", digest: "619cba8e8e05826e9b8c519c0a5c68f4fb653e8a3d8aa04bb2c8cd4c" });


        SHA256_testArray = new Array<{ message: string; digest: string; }>();
        SHA256_testArray.push({ message: "abc", digest: "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad" });
        SHA256_testArray.push({ message: "abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq", digest: "248d6a61d20638b8e5c026930c3e6039a33ce45964ff2167f6ecedd419db06c1" });
        SHA256_testArray.push({ message: "", digest: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" });
        SHA256_testArray.push({ message: "The quick brown fox jumps over the lazy dog", digest: "d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592" });
        SHA256_testArray.push({ message: "The quick brown fox jumps over the lazy dog.", digest: "ef537f25c895bfa782526529a9b63d97aa631564d5d789c2b765448c8635fb6c" });

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


  QUnit.test("SHA1 constructor", (assert) =>
  {
    var _SHA1: TS.Security.SHA1 = new TS.Security.SHA1();
    var _undefined;

    assert.throws(() =>
    {
      var _digest = _SHA1.encrypt(null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'message' argument.");

    assert.throws(() =>
    {
      var _digest = _SHA1.encrypt(_undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'message' argument.");

    _SHA1 = new TS.Security.SHA1();
    assert.equal(TS.Utils.Assert.getType(_SHA1), TS.Utils.TypeEnum.OBJECT, "Should pass for a call with valid arguments.");
  });


  QUnit.test("SHA1 encrypt", (assert) =>
  {
    var _SHA1: TS.Security.SHA1 = new TS.Security.SHA1();

    SHA1_testArray.forEach((value: { message: string; digest: string }, index: number, array: { message: string; digest: string }[]) => 
    {
      var _digest = _SHA1.encrypt(value.message);
      assert.equal(_digest, value.digest, "Should return a digest which matches with the test values.");
    });
  });


  QUnit.test("SHA224 constructor", (assert) =>
  {
    var _SHA224: TS.Security.SHA224 = new TS.Security.SHA224();
    var _undefined;

    assert.throws(() =>
    {
      var _digest = _SHA224.encrypt(null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'message' argument.");

    assert.throws(() =>
    {
      var _digest = _SHA224.encrypt(_undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'message' argument.");

    _SHA224 = new TS.Security.SHA224();
    assert.equal(TS.Utils.Assert.getType(_SHA224), TS.Utils.TypeEnum.OBJECT, "Should pass for a call with valid arguments.");
  });


  QUnit.test("SHA224 encrypt", (assert) =>
  {
    var _SHA224: TS.Security.SHA224 = new TS.Security.SHA224();

    SHA224_testArray.forEach((value: { message: string; digest: string }, index: number, array: { message: string; digest: string }[]) => 
    {
      var _digest = _SHA224.encrypt(value.message);
      assert.equal(_digest, value.digest, "Should return a digest which matches with the test values.");
    });
  });


  QUnit.test("SHA256 constructor", (assert) =>
  {
    var _SHA256: TS.Security.SHA256 = new TS.Security.SHA256();
    var _undefined;

    assert.throws(() =>
    {
      var _digest = _SHA256.encrypt(null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'message' argument.");

    assert.throws(() =>
    {
      var _digest = _SHA256.encrypt(_undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'message' argument.");

    _SHA256 = new TS.Security.SHA256();
    assert.equal(TS.Utils.Assert.getType(_SHA256), TS.Utils.TypeEnum.OBJECT, "Should pass for a call with valid arguments.");
  });


  QUnit.test("SHA256 encrypt", (assert) =>
  {
    var _SHA256: TS.Security.SHA256 = new TS.Security.SHA256();

    SHA256_testArray.forEach((value: { message: string; digest: string }, index: number, array: { message: string; digest: string }[]) => 
    {
      var _digest = _SHA256.encrypt(value.message);
      assert.equal(_digest, value.digest, "Should return a digest which matches with the test values.");
    });

  });

}//END module 