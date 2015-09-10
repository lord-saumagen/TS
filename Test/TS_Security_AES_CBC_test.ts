"use strict";

module TS_Security_test
{
  var AES_CBC_TestVector128;
  var AES_CBC_TestVector192;
  var AES_CBC_TestVector256;
  var numberArray16: Array<number>;
  var unsignedByteValueArray16: Array<number>;
  var unsignedByteValueArray33: Array<number>;

  QUnit.module("TS.Security.AES_CBC",
    {
      setupOnce: function ()
      {

        AES_CBC_TestVector128 = {
          plainText: [0x6b, 0xc1, 0xbe, 0xe2, 0x2e, 0x40, 0x9f, 0x96, 0xe9, 0x3d, 0x7e, 0x11, 0x73, 0x93, 0x17, 0x2a, 0xae, 0x2d, 0x8a, 0x57, 0x1e, 0x03, 0xac, 0x9c, 0x9e, 0xb7, 0x6f, 0xac, 0x45, 0xaf, 0x8e, 0x51, 0x30, 0xc8, 0x1c, 0x46, 0xa3, 0x5c, 0xe4, 0x11, 0xe5, 0xfb, 0xc1, 0x19, 0x1a, 0x0a, 0x52, 0xef, 0xf6, 0x9f, 0x24, 0x45, 0xdf, 0x4f, 0x9b, 0x17, 0xad, 0x2b, 0x41, 0x7b, 0xe6, 0x6c, 0x37, 0x10],
          key: [0x2b, 0x7e, 0x15, 0x16, 0x28, 0xae, 0xd2, 0xa6, 0xab, 0xf7, 0x15, 0x88, 0x09, 0xcf, 0x4f, 0x3c],
          IV: [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f],
          cipherText: [0x76, 0x49, 0xab, 0xac, 0x81, 0x19, 0xb2, 0x46, 0xce, 0xe9, 0x8e, 0x9b, 0x12, 0xe9, 0x19, 0x7d, 0x50, 0x86, 0xcb, 0x9b, 0x50, 0x72, 0x19, 0xee, 0x95, 0xdb, 0x11, 0x3a, 0x91, 0x76, 0x78, 0xb2, 0x73, 0xbe, 0xd6, 0xb8, 0xe3, 0xc1, 0x74, 0x3b, 0x71, 0x16, 0xe6, 0x9e, 0x22, 0x22, 0x95, 0x16, 0x3f, 0xf1, 0xca, 0xa1, 0x68, 0x1f, 0xac, 0x09, 0x12, 0x0e, 0xca, 0x30, 0x75, 0x86, 0xe1, 0xa7]
        };

        AES_CBC_TestVector192 = {
          plainText: [0x6b, 0xc1, 0xbe, 0xe2, 0x2e, 0x40, 0x9f, 0x96, 0xe9, 0x3d, 0x7e, 0x11, 0x73, 0x93, 0x17, 0x2a, 0xae, 0x2d, 0x8a, 0x57, 0x1e, 0x03, 0xac, 0x9c, 0x9e, 0xb7, 0x6f, 0xac, 0x45, 0xaf, 0x8e, 0x51, 0x30, 0xc8, 0x1c, 0x46, 0xa3, 0x5c, 0xe4, 0x11, 0xe5, 0xfb, 0xc1, 0x19, 0x1a, 0x0a, 0x52, 0xef, 0xf6, 0x9f, 0x24, 0x45, 0xdf, 0x4f, 0x9b, 0x17, 0xad, 0x2b, 0x41, 0x7b, 0xe6, 0x6c, 0x37, 0x10],
          key: [0x8e, 0x73, 0xb0, 0xf7, 0xda, 0x0e, 0x64, 0x52, 0xc8, 0x10, 0xf3, 0x2b, 0x80, 0x90, 0x79, 0xe5, 0x62, 0xf8, 0xea, 0xd2, 0x52, 0x2c, 0x6b, 0x7b],
          IV: [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f],
          cipherText: [0x4f, 0x02, 0x1d, 0xb2, 0x43, 0xbc, 0x63, 0x3d, 0x71, 0x78, 0x18, 0x3a, 0x9f, 0xa0, 0x71, 0xe8, 0xb4, 0xd9, 0xad, 0xa9, 0xad, 0x7d, 0xed, 0xf4, 0xe5, 0xe7, 0x38, 0x76, 0x3f, 0x69, 0x14, 0x5a, 0x57, 0x1b, 0x24, 0x20, 0x12, 0xfb, 0x7a, 0xe0, 0x7f, 0xa9, 0xba, 0xac, 0x3d, 0xf1, 0x02, 0xe0, 0x08, 0xb0, 0xe2, 0x79, 0x88, 0x59, 0x88, 0x81, 0xd9, 0x20, 0xa9, 0xe6, 0x4f, 0x56, 0x15, 0xcd]
        };

        AES_CBC_TestVector256 = {
          plainText: [0x6b, 0xc1, 0xbe, 0xe2, 0x2e, 0x40, 0x9f, 0x96, 0xe9, 0x3d, 0x7e, 0x11, 0x73, 0x93, 0x17, 0x2a, 0xae, 0x2d, 0x8a, 0x57, 0x1e, 0x03, 0xac, 0x9c, 0x9e, 0xb7, 0x6f, 0xac, 0x45, 0xaf, 0x8e, 0x51, 0x30, 0xc8, 0x1c, 0x46, 0xa3, 0x5c, 0xe4, 0x11, 0xe5, 0xfb, 0xc1, 0x19, 0x1a, 0x0a, 0x52, 0xef, 0xf6, 0x9f, 0x24, 0x45, 0xdf, 0x4f, 0x9b, 0x17, 0xad, 0x2b, 0x41, 0x7b, 0xe6, 0x6c, 0x37, 0x10],
          key: [0x60, 0x3d, 0xeb, 0x10, 0x15, 0xca, 0x71, 0xbe, 0x2b, 0x73, 0xae, 0xf0, 0x85, 0x7d, 0x77, 0x81, 0x1f, 0x35, 0x2c, 0x07, 0x3b, 0x61, 0x08, 0xd7, 0x2d, 0x98, 0x10, 0xa3, 0x09, 0x14, 0xdf, 0xf4],
          IV: [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f],
          cipherText: [0xf5, 0x8c, 0x4c, 0x04, 0xd6, 0xe5, 0xf1, 0xba, 0x77, 0x9e, 0xab, 0xfb, 0x5f, 0x7b, 0xfb, 0xd6, 0x9c, 0xfc, 0x4e, 0x96, 0x7e, 0xdb, 0x80, 0x8d, 0x67, 0x9f, 0x77, 0x7b, 0xc6, 0x70, 0x2c, 0x7d, 0x39, 0xf2, 0x33, 0x69, 0xa9, 0xd9, 0xba, 0xcf, 0xa5, 0x30, 0xe2, 0x63, 0x04, 0x23, 0x14, 0x61, 0xb2, 0xeb, 0x05, 0xe2, 0xc3, 0x9b, 0xe9, 0xfc, 0xda, 0x6c, 0x19, 0x07, 0x8c, 0x6a, 0x9d, 0x1b]
        };

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


  QUnit.test("AES_CBC constructor", (assert) =>
  {
    var _AES_CBC: TS.Security.AES_CBC;
    var _undefined;

    assert.throws(() =>
    {
      _AES_CBC = new TS.Security.AES_CBC(null, []);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for a null 'keyByteArray' argument.");

    assert.throws(() =>
    {
      _AES_CBC = new TS.Security.AES_CBC(_undefined, []);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for an undefined 'keyByteArray' argument.");

    assert.throws(() =>
    {
      _AES_CBC = new TS.Security.AES_CBC([], []);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for an empty 'keyByteArray' argument.");

    assert.throws(() =>
    {
      _AES_CBC = new TS.Security.AES_CBC(unsignedByteValueArray33.slice(0,15), []);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_CBC = new TS.Security.AES_CBC(unsignedByteValueArray33.slice(0, 17), []);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_CBC = new TS.Security.AES_CBC(unsignedByteValueArray33.slice(0, 23), []);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_CBC = new TS.Security.AES_CBC(unsignedByteValueArray33.slice(0, 25), []);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_CBC = new TS.Security.AES_CBC(unsignedByteValueArray33.slice(0, 31), []);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_CBC = new TS.Security.AES_CBC(unsignedByteValueArray33, []);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_CBC = new TS.Security.AES_CBC(unsignedByteValueArray16, null);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for a null 'initialisationVector' argument.");

    assert.throws(() =>
    {
      _AES_CBC = new TS.Security.AES_CBC(unsignedByteValueArray16, _undefined);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for an undefined 'initialisationVector' argument.");

    assert.throws(() =>
    {
      _AES_CBC = new TS.Security.AES_CBC(unsignedByteValueArray16, []);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for an empty 'initialisationVector' argument.");

    assert.throws(() =>
    {
      _AES_CBC = new TS.Security.AES_CBC(unsignedByteValueArray16, unsignedByteValueArray33.slice(0, 15));
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'initialisationVector' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_CBC = new TS.Security.AES_CBC(unsignedByteValueArray16, numberArray16);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a call with a 'initialisationVector' which is not an unsigned byte value array.");

    _AES_CBC = new TS.Security.AES_CBC(unsignedByteValueArray16, unsignedByteValueArray16);
    assert.ok(TS.Utils.Assert.isObject(_AES_CBC), "Should pass for a call with valid arguments.");
  });



  QUnit.test("AES_CBC encrypt", (assert) =>
  {
    var _AES_CBC: TS.Security.AES_CBC;
    var _cipherText;

    _AES_CBC = new TS.Security.AES_CBC(AES_CBC_TestVector128.key, AES_CBC_TestVector128.IV);
    _cipherText = _AES_CBC.encrypt(AES_CBC_TestVector128.plainText);
    assert.deepEqual(_cipherText, AES_CBC_TestVector128.cipherText, "The encrypted text schould match with the test vector for a 128 bit key.");

    _AES_CBC = new TS.Security.AES_CBC(AES_CBC_TestVector192.key, AES_CBC_TestVector192.IV);
    _cipherText = _AES_CBC.encrypt(AES_CBC_TestVector192.plainText);
    assert.deepEqual(_cipherText, AES_CBC_TestVector192.cipherText, "The encrypted text schould match with the test vector for a 192 bit key.");


    _AES_CBC = new TS.Security.AES_CBC(AES_CBC_TestVector256.key, AES_CBC_TestVector256.IV);
    _cipherText = _AES_CBC.encrypt(AES_CBC_TestVector256.plainText);
    assert.deepEqual(_cipherText, AES_CBC_TestVector256.cipherText, "The encrypted text schould match with the test vector for a 256 bit key.");

    assert.throws(() =>
    {
      _AES_CBC.encrypt(AES_CBC_TestVector256.plainText.concat([1, 2, 3]));
    }, (err) => ((err.name == "TS.ArgumentException") ? true : false), "Should throw a 'TS.ArgumentException' for a call to enrypt with an inappropriate length.");


  });


  QUnit.test("AES_CBC decrypt", (assert) =>
  {
    var _AES_CBC;
    var _plainText;


    _AES_CBC = new TS.Security.AES_CBC(AES_CBC_TestVector128.key, AES_CBC_TestVector128.IV);
    _plainText = _AES_CBC.decrypt(AES_CBC_TestVector128.cipherText);
    assert.deepEqual(_plainText, AES_CBC_TestVector128.plainText, "The decrypted text schould match with the test vector for a 128 bit key.");

    _AES_CBC = new TS.Security.AES_CBC(AES_CBC_TestVector192.key, AES_CBC_TestVector192.IV);
    _plainText = _AES_CBC.decrypt(AES_CBC_TestVector192.cipherText);
    assert.deepEqual(_plainText, AES_CBC_TestVector192.plainText, "The decrypted text schould match with the test vector for a 192 bit key.");


    _AES_CBC = new TS.Security.AES_CBC(AES_CBC_TestVector256.key, AES_CBC_TestVector256.IV);
    _plainText = _AES_CBC.decrypt(AES_CBC_TestVector256.cipherText);
    assert.deepEqual(_plainText, AES_CBC_TestVector256.plainText, "The decrypted text schould match with the test vector for a 256 bit key.");

    assert.throws(() =>
    {
      _AES_CBC.decrypt(AES_CBC_TestVector256.cipherText.concat([1, 2, 3]));
    }, (err) => ((err.name == "TS.ArgumentException") ? true : false), "Should throw a 'TS.ArgumentException' for a call to enrypt with an inappropriate length.");
  });


  QUnit.test("AES_CBC_Stream constructor", (assert) =>
  {
    var _onNextData: (bitString: string) => void;
    var _onClosed: () => void;
    var _onError: (exception: TS.Exception) => void;
    var _AES_CBC_Stream: TS.Security.AES_CBC_Stream;
    var _undefined;

    _onNextData = (bitString : string) => { };
    _onClosed = () => { };
    _onError = (exception: TS.Exception) => { };

    assert.throws(() =>
    {
      _AES_CBC_Stream = new TS.Security.AES_CBC_Stream(null, unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for a null 'keyByteArray' argument.");

    assert.throws(() =>
    {
      _AES_CBC_Stream = new TS.Security.AES_CBC_Stream(_undefined, unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for an undefined 'keyByteArray' argument.");

    assert.throws(() =>
    {
      _AES_CBC_Stream = new TS.Security.AES_CBC_Stream([], unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for an empty 'keyByteArray' argument.");

    assert.throws(() =>
    {
      _AES_CBC_Stream = new TS.Security.AES_CBC_Stream(unsignedByteValueArray33.slice(0, 15), unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_CBC_Stream = new TS.Security.AES_CBC_Stream(unsignedByteValueArray33.slice(0, 17), unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_CBC_Stream = new TS.Security.AES_CBC_Stream(unsignedByteValueArray33.slice(0, 23), unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_CBC_Stream = new TS.Security.AES_CBC_Stream(unsignedByteValueArray33.slice(0, 25), unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_CBC_Stream = new TS.Security.AES_CBC_Stream(unsignedByteValueArray33.slice(0, 31), unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_CBC_Stream = new TS.Security.AES_CBC_Stream(unsignedByteValueArray33, unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_CBC_Stream = new TS.Security.AES_CBC_Stream(unsignedByteValueArray16, null, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for a null 'initialisationVector' argument.");

    assert.throws(() =>
    {
      _AES_CBC_Stream = new TS.Security.AES_CBC_Stream(unsignedByteValueArray16, _undefined, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for an undefined 'initialisationVector' argument.");

    assert.throws(() =>
    {
      _AES_CBC_Stream = new TS.Security.AES_CBC_Stream(unsignedByteValueArray16, [], TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for an empty 'initialisationVector' argument.");

    assert.throws(() =>
    {
      _AES_CBC_Stream = new TS.Security.AES_CBC_Stream(unsignedByteValueArray16, unsignedByteValueArray16.slice(0, 15), TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with an 'initialisationVector' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_CBC_Stream = new TS.Security.AES_CBC_Stream(unsignedByteValueArray16, numberArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a call with an 'initialisationVector' which is not an unsigned byte value array.");
    
    assert.throws(() =>
    {
      _AES_CBC_Stream = new TS.Security.AES_CBC_Stream(unsignedByteValueArray16, unsignedByteValueArray16, null, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'cipherOperation' argument.");

    assert.throws(() =>
    {
      _AES_CBC_Stream = new TS.Security.AES_CBC_Stream(unsignedByteValueArray16, unsignedByteValueArray16, _undefined, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'cipherOperation' argument.");

    assert.throws(() =>
    {
      _AES_CBC_Stream = new TS.Security.AES_CBC_Stream(unsignedByteValueArray16, unsignedByteValueArray16, -1, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a call with an invalid value for the 'cipherOperation' argument.");

    assert.throws(() =>
    {
      _AES_CBC_Stream = new TS.Security.AES_CBC_Stream(unsignedByteValueArray16, unsignedByteValueArray16, 2, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a call with an invalid value for the 'cipherOperation' argument.");

    assert.throws(() =>
    {
      _AES_CBC_Stream = new TS.Security.AES_CBC_Stream(unsignedByteValueArray16, unsignedByteValueArray16, 0.75, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a call with an invalid value for the 'cipherOperation' argument.");

    assert.throws(() =>
    {
      _AES_CBC_Stream = new TS.Security.AES_CBC_Stream(unsignedByteValueArray16, unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, null, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'onNextData' argument.");

    assert.throws(() =>
    {
      _AES_CBC_Stream = new TS.Security.AES_CBC_Stream(unsignedByteValueArray16, unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _undefined, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'onNextData' argument.");

    assert.throws(() =>
    {
      _AES_CBC_Stream = new TS.Security.AES_CBC_Stream(unsignedByteValueArray16, unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, null, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'onClosed' argument.");

    assert.throws(() =>
    {
      _AES_CBC_Stream = new TS.Security.AES_CBC_Stream(unsignedByteValueArray16, unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _undefined, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'onClosed' argument.");

    assert.throws(() =>
    {
      _AES_CBC_Stream = new TS.Security.AES_CBC_Stream(unsignedByteValueArray16, unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'onError' argument.");

    assert.throws(() =>
    {
      _AES_CBC_Stream = new TS.Security.AES_CBC_Stream(unsignedByteValueArray16, unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'onError' argument.");

    _AES_CBC_Stream = new TS.Security.AES_CBC_Stream(unsignedByteValueArray16, unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    assert.ok(TS.Utils.Assert.isObject(_AES_CBC_Stream), "Should pass for a call with valid arguments.");

  });

  QUnit.test("AES_CBC_Stream write (async stream encrypt)", (assert) =>
  {
    var _AES_CBC_Stream128: TS.Security.AES_CBC_Stream;
    var _AES_CBC_Stream192: TS.Security.AES_CBC_Stream;
    var _AES_CBC_Stream256: TS.Security.AES_CBC_Stream;
    var _AES_CBC_StreamFail: TS.Security.AES_CBC_Stream;
    var _cipherText128: Array<number>;
    var _cipherText192: Array<number>;
    var _cipherText256: Array<number>;
    var _cipherTextFail: Array<number>;
    var _asyncDone128: () => void;
    var _asyncDone192: () => void;
    var _asyncDone256: () => void;
    var _asyncDoneFail: () => void;

    //****************//
    // 128 Bit Key    //
    //****************//
    _cipherText128 = new Array<number>();
    _asyncDone128 = assert.async();

    _AES_CBC_Stream128 = new TS.Security.AES_CBC_Stream(AES_CBC_TestVector128.key, AES_CBC_TestVector128.IV, TS.Security.CipherOperationEnum.ENCRYPT,
      //onData
      (data) =>
      {
        _cipherText128 = _cipherText128.concat(TS.Utils.bitStringToByteArray(data));
      },
      //onClose
      () =>
      {
        assert.deepEqual(_cipherText128, AES_CBC_TestVector128.cipherText, "The encrypted text schould match with the test vector for a 128 bit key.");
        _asyncDone128();
      },
      //onError
      (exception) =>
      {
        throw exception;
        _asyncDone128();
      });

    _AES_CBC_Stream128.writeByteArray(AES_CBC_TestVector128.plainText);
    _AES_CBC_Stream128.close();

    //****************//
    // 192 Bit Key    //
    //****************//
    _cipherText192 = new Array<number>();
    _asyncDone192 = assert.async();

    _AES_CBC_Stream192 = new TS.Security.AES_CBC_Stream(AES_CBC_TestVector192.key, AES_CBC_TestVector192.IV, TS.Security.CipherOperationEnum.ENCRYPT,
      //onData
      (data) =>
      {
        _cipherText192 = _cipherText192.concat(TS.Utils.bitStringToByteArray(data));
      },
      //onClose
      () =>
      {
        assert.deepEqual(_cipherText192, AES_CBC_TestVector192.cipherText, "The encrypted text schould match with the test vector for a 192 bit key.");
        _asyncDone192();
      },
      //onError
      (exception) =>
      {
        throw exception;
        _asyncDone192();
      });

    _AES_CBC_Stream192.writeByteArray(AES_CBC_TestVector192.plainText);
    _AES_CBC_Stream192.close();

    //****************//
    // 256 Bit Key    //
    //****************//
    _cipherText256 = new Array<number>();
    _asyncDone256 = assert.async();

    _AES_CBC_Stream256 = new TS.Security.AES_CBC_Stream(AES_CBC_TestVector256.key, AES_CBC_TestVector256.IV, TS.Security.CipherOperationEnum.ENCRYPT,
      //onData
      (data) =>
      {
        _cipherText256 = _cipherText256.concat(TS.Utils.bitStringToByteArray(data));
      },
      //onClose
      () =>
      {
        assert.deepEqual(_cipherText256, AES_CBC_TestVector256.cipherText, "The encrypted text schould match with the test vector for a 256 bit key.");
        _asyncDone256();
      },
      //onError
      (exception) =>
      {
        throw exception;
        _asyncDone256();
      });

    _AES_CBC_Stream256.writeByteArray(AES_CBC_TestVector256.plainText);
    _AES_CBC_Stream256.close();

    //****************//
    // Fail           //
    //****************//
    _cipherTextFail = new Array<number>();
    _asyncDoneFail = assert.async();

    _AES_CBC_StreamFail = new TS.Security.AES_CBC_Stream(AES_CBC_TestVector256.key, AES_CBC_TestVector256.IV, TS.Security.CipherOperationEnum.ENCRYPT,
      //onData
      (data) =>
      {
        _cipherTextFail = _cipherTextFail.concat(TS.Utils.bitStringToByteArray(data));
      },
      //onClose
      () =>
      {
        throw new TS.Exception("Unexpected result. Stream cipher should fail because of a data feed which doesn't match the block length requirement of the underlying block cipher operation.");
        _asyncDoneFail();
      },
      //onError
      (exception: TS.Exception) =>
      {
        assert.ok(exception.type == "TS.InvalidOperationException", "Should fail because of an unappropriate data length for the underlying cipher object.");
        _asyncDoneFail();
      });

    _AES_CBC_StreamFail.writeByteArray(AES_CBC_TestVector256.plainText);
    //Make sure that the stream data doesn't fit into a 128 bit block.
    _AES_CBC_StreamFail.writeByteArray([0, 0, 0]);
    _AES_CBC_StreamFail.close();

  });


  QUnit.test("AES_CBC_Stream write (async stream decrypt)", (assert) =>
  {
    var _AES_CBC_Stream128: TS.Security.AES_CBC_Stream;
    var _AES_CBC_Stream192: TS.Security.AES_CBC_Stream;
    var _AES_CBC_Stream256: TS.Security.AES_CBC_Stream;
    var _AES_CBC_StreamFail: TS.Security.AES_CBC_Stream;
    var _plainText128: Array<number>;
    var _plainText192: Array<number>;
    var _plainText256: Array<number>;
    var _plainTextFail: Array<number>;
    var _asyncDone128: () => void;
    var _asyncDone192: () => void;
    var _asyncDone256: () => void;
    var _asyncDoneFail: () => void;

    //****************//
    // 128 Bit Key    //
    //****************//
    _plainText128 = new Array<number>();
    _asyncDone128 = assert.async();

    _AES_CBC_Stream128 = new TS.Security.AES_CBC_Stream(AES_CBC_TestVector128.key, AES_CBC_TestVector128.IV, TS.Security.CipherOperationEnum.DECRYPT,
      //onData
      (data) =>
      {
        _plainText128 = _plainText128.concat(TS.Utils.bitStringToByteArray(data));
      },
      //onClose
      () =>
      {
        assert.deepEqual(_plainText128, AES_CBC_TestVector128.plainText, "The decrypted text schould match with the test vector for a 128 bit key.");
        _asyncDone128();
      },
      //onError
      (exception) =>
      {
        throw exception;
        _asyncDone128();
      });

    _AES_CBC_Stream128.writeByteArray(AES_CBC_TestVector128.cipherText);
    _AES_CBC_Stream128.close();

    //****************//
    // 192 Bit Key    //
    //****************//
    _plainText192 = new Array<number>();
    _asyncDone192 = assert.async();

    _AES_CBC_Stream192 = new TS.Security.AES_CBC_Stream(AES_CBC_TestVector192.key, AES_CBC_TestVector192.IV, TS.Security.CipherOperationEnum.DECRYPT,
      //onData
      (data) =>
      {
        _plainText192 = _plainText192.concat(TS.Utils.bitStringToByteArray(data));
      },
      //onClose
      () =>
      {
        assert.deepEqual(_plainText192, AES_CBC_TestVector192.plainText, "The decrypted text schould match with the test vector for a 192 bit key.");
        _asyncDone192();
      },
      //onError
      (exception) =>
      {
        throw exception;
        _asyncDone192();
      });

    _AES_CBC_Stream192.writeByteArray(AES_CBC_TestVector192.cipherText);
    _AES_CBC_Stream192.close();

    //****************//
    // 256 Bit Key    //
    //****************//
    _plainText256 = new Array<number>();
    _asyncDone256 = assert.async();

    _AES_CBC_Stream256 = new TS.Security.AES_CBC_Stream(AES_CBC_TestVector256.key, AES_CBC_TestVector256.IV, TS.Security.CipherOperationEnum.DECRYPT,
      //onData
      (data) =>
      {
        _plainText256 = _plainText256.concat(TS.Utils.bitStringToByteArray(data));
      },
      //onClose
      () =>
      {
        assert.deepEqual(_plainText256, AES_CBC_TestVector256.plainText, "The decrypted text schould match with the test vector for a 256 bit key.");
        _asyncDone256();
      },
      //onError
      (exception) =>
      {
        throw exception;
        _asyncDone256();
      });

    _AES_CBC_Stream256.writeByteArray(AES_CBC_TestVector256.cipherText);
    _AES_CBC_Stream256.close();

    //****************//
    // Fail           //
    //****************//
    _plainTextFail = new Array<number>();
    _asyncDoneFail = assert.async();

    _AES_CBC_StreamFail = new TS.Security.AES_CBC_Stream(AES_CBC_TestVector256.key, AES_CBC_TestVector256.IV, TS.Security.CipherOperationEnum.DECRYPT,
      //onData
      (data) =>
      {
        _plainTextFail = _plainTextFail.concat(TS.Utils.bitStringToByteArray(data));
      },
      //onClose
      () =>
      {
        throw new TS.Exception("Unexpected result. Stream cipher should fail because of a data feed which doesn't match the block length requirement of the underlying cipher object.");
        _asyncDoneFail();
      },
      //onError
      (exception: TS.Exception) =>
      {
        assert.ok(exception.type == "TS.InvalidOperationException", "Should fail because of an unappropriate data length for the underlying cipher object.");
        _asyncDoneFail();
      });

    _AES_CBC_StreamFail.writeByteArray(AES_CBC_TestVector256.cipherText);
    //Make sure that the stream data doesn't fit into a 128 bit block.
    _AES_CBC_StreamFail.writeByteArray([0, 0, 0]);
    _AES_CBC_StreamFail.close();

  });

}//END module 