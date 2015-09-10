"use strict";

module TS_Security_test
{
  var numberArray16: Array<number>;
  var unsignedByteValueArray16: Array<number>;
  var unsignedByteValueArray33: Array<number>;


  QUnit.module("TS.Security.RandomNumberGenerator",
    {
      setupOnce: function ()
      {
        numberArray16 = [0, -1, 1, -125, 125, -250, 250, -500, 500, -1000, 1000, -0xFFFF, 0xFFFF, -0xFFFFFFFF, 0xFFFFFFFF, 16];
        unsignedByteValueArray33 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33];
        unsignedByteValueArray16 = unsignedByteValueArray33.slice(0, 16);
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


  QUnit.test("RandomNumberGenerator constructor", (assert) =>
  {
    var _RNG: TS.Security.RandomNumberGenerator;
    var _undefined;

    assert.throws(() =>
    {
      _RNG = new TS.Security.RandomNumberGenerator(null, unsignedByteValueArray16);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for a null 'keyByteArray' argument.");

    assert.throws(() =>
    {
      _RNG = new TS.Security.RandomNumberGenerator(_undefined, unsignedByteValueArray16);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for a undefined 'keyByteArray' argument.");

    assert.throws(() =>
    {
      _RNG = new TS.Security.RandomNumberGenerator([], unsignedByteValueArray16);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for an empty 'keyByteArray' argument.");

    assert.throws(() =>
    {
      _RNG = new TS.Security.RandomNumberGenerator(numberArray16, unsignedByteValueArray16);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a call with a 'keyByteArray' which is not an unsigned byte value array.");
    

    assert.throws(() =>
    {
      _RNG = new TS.Security.RandomNumberGenerator(unsignedByteValueArray16.slice(2), unsignedByteValueArray16);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a 'keyByteArray' with a invalid number of elements as argument.");

    assert.throws(() =>
    {
      _RNG = new TS.Security.RandomNumberGenerator(unsignedByteValueArray16, null);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for a null 'initialisationVector' argument.");

    assert.throws(() =>
    {
      _RNG = new TS.Security.RandomNumberGenerator(unsignedByteValueArray16, _undefined);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for a undefined 'initialisationVector' argument.");

    assert.throws(() =>
    {
      _RNG = new TS.Security.RandomNumberGenerator(unsignedByteValueArray16, []);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for an empty 'initialisationVector' argument.");

    assert.throws(() =>
    {
      _RNG = new TS.Security.RandomNumberGenerator(unsignedByteValueArray16, numberArray16);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a call with a 'initialisationVector' which is not an unsigned byte value array.");

    assert.throws(() =>
    {
      _RNG = new TS.Security.RandomNumberGenerator(unsignedByteValueArray16, unsignedByteValueArray16.slice(2));
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a 'initialisationVector' with a invalid number of elements as argument.");

    _RNG = new TS.Security.RandomNumberGenerator(unsignedByteValueArray16, unsignedByteValueArray16);
    assert.ok(_RNG != null, "Should pass for a call with valid arguments.");
  });


  QUnit.test("RandomNumberGenerator next", (assert) =>
  {
    var _RNG: TS.Security.RandomNumberGenerator;
    var _key: Array<number>;
    var _next: Array<number>;
    var _resultArray: Array<Array<number>>;
    var _index: number;

    _key = TS.Encoding.UTF.UTF16StringToUTF8Array("abcdefghijklmnop");

    _RNG = new TS.Security.RandomNumberGenerator(_key, unsignedByteValueArray16);
    _resultArray = new Array<Array<number>>();

    for (_index = 0; _index < 200; _index++)
    {
      _next = _RNG.next;

      if (_resultArray.filter((value) =>
      {
        return value.every((_value, index) =>
        {
          return _value == _next[index];
        });
      }).length == 0)
      {
        assert.ok(true, "Unique random number: '" + _next.join("|") + "'");
      }//END if
      else
      {
        assert.ok(false, "Random number collision: '" + _next.join("|") + "'");
      }//END else

      _resultArray.push(_next);

    }//END for

  });
}//END module 