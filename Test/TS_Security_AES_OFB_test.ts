"use strict";

module TS_Security_test
{
  var AES_OFB_TestVector128;
  var AES_OFB_TestVector192;
  var AES_OFB_TestVector256;
  var numberArray16: Array<number>;
  var unsignedByteValueArray16: Array<number>;
  var unsignedByteValueArray33: Array<number>;

  QUnit.module("TS.Security.AES_OFB",
    {

      setupOnce: function ()
      {


        AES_OFB_TestVector128 = {
          plainText: [0x6b, 0xc1, 0xbe, 0xe2, 0x2e, 0x40, 0x9f, 0x96, 0xe9, 0x3d, 0x7e, 0x11, 0x73, 0x93, 0x17, 0x2a, 0xae, 0x2d, 0x8a, 0x57, 0x1e, 0x03, 0xac, 0x9c, 0x9e, 0xb7, 0x6f, 0xac, 0x45, 0xaf, 0x8e, 0x51, 0x30, 0xc8, 0x1c, 0x46, 0xa3, 0x5c, 0xe4, 0x11, 0xe5, 0xfb, 0xc1, 0x19, 0x1a, 0x0a, 0x52, 0xef, 0xf6, 0x9f, 0x24, 0x45, 0xdf, 0x4f, 0x9b, 0x17, 0xad, 0x2b, 0x41, 0x7b, 0xe6, 0x6c, 0x37, 0x10],
          key: [0x2b, 0x7e, 0x15, 0x16, 0x28, 0xae, 0xd2, 0xa6, 0xab, 0xf7, 0x15, 0x88, 0x09, 0xcf, 0x4f, 0x3c],
          IV: [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f],
          cipherText: [0x3b, 0x3f, 0xd9, 0x2e, 0xb7, 0x2d, 0xad, 0x20, 0x33, 0x34, 0x49, 0xf8, 0xe8, 0x3c, 0xfb, 0x4a, 0x77, 0x89, 0x50, 0x8d, 0x16, 0x91, 0x8f, 0x03, 0xf5, 0x3c, 0x52, 0xda, 0xc5, 0x4e, 0xd8, 0x25, 0x97, 0x40, 0x05, 0x1e, 0x9c, 0x5f, 0xec, 0xf6, 0x43, 0x44, 0xf7, 0xa8, 0x22, 0x60, 0xed, 0xcc, 0x30, 0x4c, 0x65, 0x28, 0xf6, 0x59, 0xc7, 0x78, 0x66, 0xa5, 0x10, 0xd9, 0xc1, 0xd6, 0xae, 0x5e]
        };

        AES_OFB_TestVector192 = {
          plainText: [0x6b, 0xc1, 0xbe, 0xe2, 0x2e, 0x40, 0x9f, 0x96, 0xe9, 0x3d, 0x7e, 0x11, 0x73, 0x93, 0x17, 0x2a, 0xae, 0x2d, 0x8a, 0x57, 0x1e, 0x03, 0xac, 0x9c, 0x9e, 0xb7, 0x6f, 0xac, 0x45, 0xaf, 0x8e, 0x51, 0x30, 0xc8, 0x1c, 0x46, 0xa3, 0x5c, 0xe4, 0x11, 0xe5, 0xfb, 0xc1, 0x19, 0x1a, 0x0a, 0x52, 0xef, 0xf6, 0x9f, 0x24, 0x45, 0xdf, 0x4f, 0x9b, 0x17, 0xad, 0x2b, 0x41, 0x7b, 0xe6, 0x6c, 0x37, 0x10],
          key: [0x8e, 0x73, 0xb0, 0xf7, 0xda, 0x0e, 0x64, 0x52, 0xc8, 0x10, 0xf3, 0x2b, 0x80, 0x90, 0x79, 0xe5, 0x62, 0xf8, 0xea, 0xd2, 0x52, 0x2c, 0x6b, 0x7b],
          IV: [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f],
          cipherText: [0xcd, 0xc8, 0x0d, 0x6f, 0xdd, 0xf1, 0x8c, 0xab, 0x34, 0xc2, 0x59, 0x09, 0xc9, 0x9a, 0x41, 0x74, 0xfc, 0xc2, 0x8b, 0x8d, 0x4c, 0x63, 0x83, 0x7c, 0x09, 0xe8, 0x17, 0x00, 0xc1, 0x10, 0x04, 0x01, 0x8d, 0x9a, 0x9a, 0xea, 0xc0, 0xf6, 0x59, 0x6f, 0x55, 0x9c, 0x6d, 0x4d, 0xaf, 0x59, 0xa5, 0xf2, 0x6d, 0x9f, 0x20, 0x08, 0x57, 0xca, 0x6c, 0x3e, 0x9c, 0xac, 0x52, 0x4b, 0xd9, 0xac, 0xc9, 0x2a]
        };

        AES_OFB_TestVector256 = {
          plainText: [0x6b, 0xc1, 0xbe, 0xe2, 0x2e, 0x40, 0x9f, 0x96, 0xe9, 0x3d, 0x7e, 0x11, 0x73, 0x93, 0x17, 0x2a, 0xae, 0x2d, 0x8a, 0x57, 0x1e, 0x03, 0xac, 0x9c, 0x9e, 0xb7, 0x6f, 0xac, 0x45, 0xaf, 0x8e, 0x51, 0x30, 0xc8, 0x1c, 0x46, 0xa3, 0x5c, 0xe4, 0x11, 0xe5, 0xfb, 0xc1, 0x19, 0x1a, 0x0a, 0x52, 0xef, 0xf6, 0x9f, 0x24, 0x45, 0xdf, 0x4f, 0x9b, 0x17, 0xad, 0x2b, 0x41, 0x7b, 0xe6, 0x6c, 0x37, 0x10],
          key: [0x60, 0x3d, 0xeb, 0x10, 0x15, 0xca, 0x71, 0xbe, 0x2b, 0x73, 0xae, 0xf0, 0x85, 0x7d, 0x77, 0x81, 0x1f, 0x35, 0x2c, 0x07, 0x3b, 0x61, 0x08, 0xd7, 0x2d, 0x98, 0x10, 0xa3, 0x09, 0x14, 0xdf, 0xf4],
          IV: [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f],
          cipherText: [0xdc, 0x7e, 0x84, 0xbf, 0xda, 0x79, 0x16, 0x4b, 0x7e, 0xcd, 0x84, 0x86, 0x98, 0x5d, 0x38, 0x60, 0x4f, 0xeb, 0xdc, 0x67, 0x40, 0xd2, 0x0b, 0x3a, 0xc8, 0x8f, 0x6a, 0xd8, 0x2a, 0x4f, 0xb0, 0x8d, 0x71, 0xab, 0x47, 0xa0, 0x86, 0xe8, 0x6e, 0xed, 0xf3, 0x9d, 0x1c, 0x5b, 0xba, 0x97, 0xc4, 0x08, 0x01, 0x26, 0x14, 0x1d, 0x67, 0xf3, 0x7b, 0xe8, 0x53, 0x8f, 0x5a, 0x8b, 0xe7, 0x40, 0xe4, 0x84]
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

  QUnit.test("AES_OFB constructor", (assert) =>
  {
    var _AES_OFB: TS.Security.AES_OFB;
    var _undefined;

    assert.throws(() =>
    {
      _AES_OFB = new TS.Security.AES_OFB(null, unsignedByteValueArray16);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for a null 'keyByteArray' argument.");

    assert.throws(() =>
    {
      _AES_OFB = new TS.Security.AES_OFB(_undefined, unsignedByteValueArray16);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for an undefined 'keyByteArray' argument.");

    assert.throws(() =>
    {
      _AES_OFB = new TS.Security.AES_OFB([], unsignedByteValueArray16);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for an empty 'keyByteArray' argument.");

    assert.throws(() =>
    {
      _AES_OFB = new TS.Security.AES_OFB(unsignedByteValueArray16, numberArray16);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a call with a 'keyByteArray' which is not an unsigned byte value array.");

    assert.throws(() =>
    {
      _AES_OFB = new TS.Security.AES_OFB(unsignedByteValueArray33.slice(0, 15), unsignedByteValueArray16);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_OFB = new TS.Security.AES_OFB(unsignedByteValueArray33.slice(0, 17), unsignedByteValueArray16);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_OFB = new TS.Security.AES_OFB(unsignedByteValueArray33.slice(0, 23), unsignedByteValueArray16);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_OFB = new TS.Security.AES_OFB(unsignedByteValueArray33.slice(0, 25), unsignedByteValueArray16);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_OFB = new TS.Security.AES_OFB(unsignedByteValueArray33.slice(0, 31), unsignedByteValueArray16);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_OFB = new TS.Security.AES_OFB(unsignedByteValueArray33, unsignedByteValueArray16);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_OFB = new TS.Security.AES_OFB(unsignedByteValueArray16, null);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for a null 'initialisationVector' argument.");

    assert.throws(() =>
    {
      _AES_OFB = new TS.Security.AES_OFB(unsignedByteValueArray16, _undefined);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for an undefined 'initialisationVector' argument.");

    assert.throws(() =>
    {
      _AES_OFB = new TS.Security.AES_OFB(unsignedByteValueArray16, []);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for an empty 'initialisationVector' argument.");

    assert.throws(() =>
    {
      _AES_OFB = new TS.Security.AES_OFB(unsignedByteValueArray16, unsignedByteValueArray33.slice(0, 15));
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'initialisationVector' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_OFB = new TS.Security.AES_OFB(unsignedByteValueArray16, numberArray16);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a call with a 'initialisationVector' which is not an unsigned byte value array.");

    _AES_OFB = new TS.Security.AES_OFB(unsignedByteValueArray16, unsignedByteValueArray16);
    assert.ok(TS.Utils.Assert.isObject(_AES_OFB), "Should pass for a call with valid arguments.");
  });


  QUnit.test("AES_OFB encrypt", (assert) =>
  {
    var _AES_OFB;
    var _cipherText;

    _AES_OFB = new TS.Security.AES_OFB(AES_OFB_TestVector128.key, AES_OFB_TestVector128.IV);
    _cipherText = _AES_OFB.encrypt(AES_OFB_TestVector128.plainText);
    assert.deepEqual(_cipherText, AES_OFB_TestVector128.cipherText, "The encrypted text schould match with the test vector for a 128 bit key.");

    _AES_OFB = new TS.Security.AES_OFB(AES_OFB_TestVector192.key, AES_OFB_TestVector192.IV);
    _cipherText = _AES_OFB.encrypt(AES_OFB_TestVector192.plainText);
    assert.deepEqual(_cipherText, AES_OFB_TestVector192.cipherText, "The encrypted text schould match with the test vector for a 128 bit key.");


    _AES_OFB = new TS.Security.AES_OFB(AES_OFB_TestVector256.key, AES_OFB_TestVector256.IV);
    _cipherText = _AES_OFB.encrypt(AES_OFB_TestVector256.plainText);
    assert.deepEqual(_cipherText, AES_OFB_TestVector256.cipherText, "The encrypted text schould match with the test vector for a 128 bit key.");
  });


  QUnit.test("AES_OFB decrypt", (assert) =>
  {
    var _AES_OFB;
    var _plainText;

    _AES_OFB = new TS.Security.AES_OFB(AES_OFB_TestVector128.key, AES_OFB_TestVector128.IV);
    _plainText = _AES_OFB.decrypt(AES_OFB_TestVector128.cipherText);
    assert.deepEqual(_plainText, AES_OFB_TestVector128.plainText, "The decrypted text schould match with the test vector for a 128 bit key.");

    _AES_OFB = new TS.Security.AES_OFB(AES_OFB_TestVector192.key, AES_OFB_TestVector192.IV);
    _plainText = _AES_OFB.encrypt(AES_OFB_TestVector192.cipherText);
    assert.deepEqual(_plainText, AES_OFB_TestVector192.plainText, "The decrypted text schould match with the test vector for a 128 bit key.");


    _AES_OFB = new TS.Security.AES_OFB(AES_OFB_TestVector256.key, AES_OFB_TestVector256.IV);
    _plainText = _AES_OFB.encrypt(AES_OFB_TestVector256.cipherText);
    assert.deepEqual(_plainText, AES_OFB_TestVector256.plainText, "The decrypted text schould match with the test vector for a 128 bit key.");
  });


  QUnit.test("AES_OFB encrypt / decrypt with different plain text lengths", (assert) =>
  {
    var _index: number;
    var _plainData = "abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXY0123456789";
    var _plainSegment: string;
    var _plainReturn: string;
    var _cipherText: Array<number>;
    var _AES_OFB = new TS.Security.AES_OFB(AES_OFB_TestVector256.key, AES_OFB_TestVector256.IV);

    for (_index = 1; _index < _plainData.length + 1; _index++)
    {
      _plainSegment = _plainData.substr(0, _index);
      _cipherText = _AES_OFB.encrypt(TS.Encoding.UTF.UTF16StringToUTF8Array(_plainSegment));
      _plainReturn = TS.Encoding.UTF.UTF8ArrayToUTF16String(_AES_OFB.decrypt(_cipherText));
      assert.equal(_plainReturn, _plainSegment, "The decrypted text should macht with the original plain text.");
    }//END for

  });

  QUnit.test("AES_OFB_Stream constructor", (assert) =>
  {
    var _onNextData: (bitString: string) => void;
    var _onClosed: () => void;
    var _onError: (exception: TS.Exception) => void;
    var _AES_OFB_Stream: TS.Security.AES_OFB_Stream;
    var _undefined;

    _onNextData = (bitString: string) => { };
    _onClosed = () => { };
    _onError = (exception: TS.Exception) => { };

    assert.throws(() =>
    {
      _AES_OFB_Stream = new TS.Security.AES_OFB_Stream(null, unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for a null 'keyByteArray' argument.");

    assert.throws(() =>
    {
      _AES_OFB_Stream = new TS.Security.AES_OFB_Stream(_undefined, unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for an undefined 'keyByteArray' argument.");

    assert.throws(() =>
    {
      _AES_OFB_Stream = new TS.Security.AES_OFB_Stream([], unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for an empty 'keyByteArray' argument.");

    assert.throws(() =>
    {
      _AES_OFB_Stream = new TS.Security.AES_OFB_Stream(unsignedByteValueArray16, numberArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a call with a 'keyByteArray' which is not an unsigned byte value array.");

    assert.throws(() =>
    {
      _AES_OFB_Stream = new TS.Security.AES_OFB_Stream(unsignedByteValueArray33.slice(0, 15), unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_OFB_Stream = new TS.Security.AES_OFB_Stream(unsignedByteValueArray33.slice(0, 17), unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_OFB_Stream = new TS.Security.AES_OFB_Stream(unsignedByteValueArray33.slice(0, 23), unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_OFB_Stream = new TS.Security.AES_OFB_Stream(unsignedByteValueArray33.slice(0, 25), unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_OFB_Stream = new TS.Security.AES_OFB_Stream(unsignedByteValueArray33.slice(0, 31), unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_OFB_Stream = new TS.Security.AES_OFB_Stream(unsignedByteValueArray33, unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_OFB_Stream = new TS.Security.AES_OFB_Stream(unsignedByteValueArray16, null, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for a null 'initialisationVector' argument.");

    assert.throws(() =>
    {
      _AES_OFB_Stream = new TS.Security.AES_OFB_Stream(unsignedByteValueArray16, _undefined, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for an undefined 'initialisationVector' argument.");

    assert.throws(() =>
    {
      _AES_OFB_Stream = new TS.Security.AES_OFB_Stream(unsignedByteValueArray16, [], TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for an empty 'initialisationVector' argument.");

    assert.throws(() =>
    {
      _AES_OFB_Stream = new TS.Security.AES_OFB_Stream(unsignedByteValueArray16, unsignedByteValueArray33.slice(0, 15), TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'initialisationVector' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_OFB_Stream = new TS.Security.AES_OFB_Stream(unsignedByteValueArray16, numberArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a call with a 'initialisationVector' which is not an unsigned byte value array.");


    assert.throws(() =>
    {
      _AES_OFB_Stream = new TS.Security.AES_OFB_Stream(unsignedByteValueArray16, unsignedByteValueArray16, null, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'cipherOperation' argument.");

    assert.throws(() =>
    {
      _AES_OFB_Stream = new TS.Security.AES_OFB_Stream(unsignedByteValueArray16, unsignedByteValueArray16, _undefined, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'cipherOperation' argument.");

    assert.throws(() =>
    {
      _AES_OFB_Stream = new TS.Security.AES_OFB_Stream(unsignedByteValueArray16, unsignedByteValueArray16, -1, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a call with an invalid value for the 'cipherOperation' argument.");

    assert.throws(() =>
    {
      _AES_OFB_Stream = new TS.Security.AES_OFB_Stream(unsignedByteValueArray16, unsignedByteValueArray16, 2, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a call with an invalid value for the 'cipherOperation' argument.");

    assert.throws(() =>
    {
      _AES_OFB_Stream = new TS.Security.AES_OFB_Stream(unsignedByteValueArray16, unsignedByteValueArray16, 0.75, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a call with an invalid value for the 'cipherOperation' argument.");

    assert.throws(() =>
    {
      _AES_OFB_Stream = new TS.Security.AES_OFB_Stream(unsignedByteValueArray16, unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, null, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'onNextData' argument.");

    assert.throws(() =>
    {
      _AES_OFB_Stream = new TS.Security.AES_OFB_Stream(unsignedByteValueArray16, unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _undefined, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'onNextData' argument.");

    assert.throws(() =>
    {
      _AES_OFB_Stream = new TS.Security.AES_OFB_Stream(unsignedByteValueArray16, unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, null, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'onClosed' argument.");

    assert.throws(() =>
    {
      _AES_OFB_Stream = new TS.Security.AES_OFB_Stream(unsignedByteValueArray16, unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _undefined, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'onClosed' argument.");

    assert.throws(() =>
    {
      _AES_OFB_Stream = new TS.Security.AES_OFB_Stream(unsignedByteValueArray16, unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'onError' argument.");

    assert.throws(() =>
    {
      _AES_OFB_Stream = new TS.Security.AES_OFB_Stream(unsignedByteValueArray16, unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'onError' argument.");





    _AES_OFB_Stream = new TS.Security.AES_OFB_Stream(unsignedByteValueArray16, unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    assert.ok(TS.Utils.Assert.isObject(_AES_OFB_Stream), "Should pass for a call with valid arguments.");
  });


  QUnit.test("AES_OFB_Stream write (async stream encrypt)", (assert) =>
  {
    var _AES_OFB_Stream128: TS.Security.AES_OFB_Stream;
    var _AES_OFB_Stream192: TS.Security.AES_OFB_Stream;
    var _AES_OFB_Stream256: TS.Security.AES_OFB_Stream;
    var _cipherText128: string;
    var _cipherText192: string;
    var _cipherText256: string;
    var _asyncDone128: () => void;
    var _asyncDone192: () => void;
    var _asyncDone256: () => void;

    //****************//
    // 128 Bit Key    //
    //****************//

    _asyncDone128 = assert.async();
    _cipherText128 = "";

    _AES_OFB_Stream128 = new TS.Security.AES_OFB_Stream(AES_OFB_TestVector128.key, AES_OFB_TestVector128.IV, TS.Security.CipherOperationEnum.ENCRYPT,
      /*onSegmentComplete*/
      (binaryString: string) =>
      {
        _cipherText128 += binaryString;
      },
      /*onClosed*/
      () =>
      {
        assert.equal(_cipherText128, TS.Utils.byteArrayToBitString(AES_OFB_TestVector128.cipherText), "The encrypted text schould match with the test vector for a 128 bit key.");
        _asyncDone128();
      },
      /*onError*/
      (exception: TS.Exception) =>
      {
        throw exception;
        _asyncDone128();
      }
      );
    _AES_OFB_Stream128.writeByteArray(AES_OFB_TestVector128.plainText);
    _AES_OFB_Stream128.close();

    //****************//
    // 192 Bit Key    //
    //****************//

    _asyncDone192 = assert.async();
    _cipherText192 = "";

    _AES_OFB_Stream192 = new TS.Security.AES_OFB_Stream(AES_OFB_TestVector192.key, AES_OFB_TestVector192.IV, TS.Security.CipherOperationEnum.ENCRYPT,
      /*onSegmentComplete*/
      (binaryString: string) =>
      {
        _cipherText192 += binaryString;
      },
      /*onClosed*/
      () =>
      {
        assert.equal(_cipherText192, TS.Utils.byteArrayToBitString(AES_OFB_TestVector192.cipherText), "The encrypted text schould match with the test vector for a 192 bit key.");
        _asyncDone192();
      },
      /*onError*/
      (exception: TS.Exception) =>
      {
        throw exception;
        _asyncDone192();
      }
      );
    _AES_OFB_Stream192.writeByteArray(AES_OFB_TestVector192.plainText);
    _AES_OFB_Stream192.close();

    //****************//
    // 256 Bit Key    //
    //****************//

    _asyncDone256 = assert.async();
    _cipherText256 = "";

    _AES_OFB_Stream256 = new TS.Security.AES_OFB_Stream(AES_OFB_TestVector256.key, AES_OFB_TestVector256.IV, TS.Security.CipherOperationEnum.ENCRYPT,
      /*onSegmentComplete*/
      (binaryString: string) =>
      {
        _cipherText256 += binaryString;
      },
      /*onClosed*/
      () =>
      {
        assert.equal(_cipherText256, TS.Utils.byteArrayToBitString(AES_OFB_TestVector256.cipherText), "The encrypted text schould match with the test vector for a 256 bit key.");
        _asyncDone256();
      },
      /*onError*/
      (exception: TS.Exception) =>
      {
        throw exception;
        _asyncDone256();
      }
      );
    _AES_OFB_Stream256.writeByteArray(AES_OFB_TestVector192.plainText);
    _AES_OFB_Stream256.close();


  });

  QUnit.test("AES_OFB_Stream write (async stream decrypt)", (assert) =>
  {
    var _AES_OFB_Stream128: TS.Security.AES_OFB_Stream;
    var _AES_OFB_Stream192: TS.Security.AES_OFB_Stream;
    var _AES_OFB_Stream256: TS.Security.AES_OFB_Stream;
    var _plainText128: string;
    var _plainText192: string;
    var _plainText256: string;
    var _asyncDone128: () => void;
    var _asyncDone192: () => void;
    var _asyncDone256: () => void;

    //****************//
    // 128 Bit Key    //
    //****************//

    _asyncDone128 = assert.async();
    _plainText128 = "";

    _AES_OFB_Stream128 = new TS.Security.AES_OFB_Stream(AES_OFB_TestVector128.key, AES_OFB_TestVector128.IV, TS.Security.CipherOperationEnum.DECRYPT,
      /*onSegmentComplete*/
      (binaryString: string) =>
      {
        _plainText128 += binaryString;
      },
      /*onClosed*/
      () =>
      {
        assert.equal(_plainText128, TS.Utils.byteArrayToBitString(AES_OFB_TestVector128.plainText), "The decrypted text schould match with the test vector for a 128 bit key.");
        _asyncDone128();
      },
      /*onError*/
      (exception: TS.Exception) =>
      {
        throw exception;
        _asyncDone128();
      }
      );
    _AES_OFB_Stream128.writeByteArray(AES_OFB_TestVector128.cipherText);
    _AES_OFB_Stream128.close();

    //****************//
    // 192 Bit Key    //
    //****************//

    _asyncDone192 = assert.async();
    _plainText192 = "";

    _AES_OFB_Stream192 = new TS.Security.AES_OFB_Stream(AES_OFB_TestVector192.key, AES_OFB_TestVector192.IV, TS.Security.CipherOperationEnum.DECRYPT,
      /*onSegmentComplete*/
      (binaryString: string) =>
      {
        _plainText192 += binaryString;
      },
      /*onClosed*/
      () =>
      {
        assert.equal(_plainText192, TS.Utils.byteArrayToBitString(AES_OFB_TestVector192.plainText), "The decrypted text schould match with the test vector for a 192 bit key.");
        _asyncDone192();
      },
      /*onError*/
      (exception: TS.Exception) =>
      {
        throw exception;
        _asyncDone192();
      }
      );
    _AES_OFB_Stream192.writeByteArray(AES_OFB_TestVector192.cipherText);
    _AES_OFB_Stream192.close();

    //****************//
    // 256 Bit Key    //
    //****************//

    _asyncDone256 = assert.async();
    _plainText256 = "";

    _AES_OFB_Stream256 = new TS.Security.AES_OFB_Stream(AES_OFB_TestVector256.key, AES_OFB_TestVector256.IV, TS.Security.CipherOperationEnum.DECRYPT,
      /*onSegmentComplete*/
      (binaryString: string) =>
      {
        _plainText256 += binaryString;
      },
      /*onClosed*/
      () =>
      {
        assert.equal(_plainText256, TS.Utils.byteArrayToBitString(AES_OFB_TestVector256.plainText), "The decrypted text schould match with the test vector for a 256 bit key.");
        _asyncDone256();
      },
      /*onError*/
      (exception: TS.Exception) =>
      {
        throw exception;
        _asyncDone256();
      }
      );
    _AES_OFB_Stream256.writeByteArray(AES_OFB_TestVector256.cipherText);
    _AES_OFB_Stream256.close();

  });

  QUnit.test("AES_OFB_Stream write (encrypt / decrypt with different plain text lengths)", (assert) =>
  {
    var _index: number;
    var _plainDataArray: Array<number>;
    var _plainSegmentArray: Array<number>;
    var _plainBitString: string;
    var _cipherBitString: string;
    var _asyncDone256: () => void;

    _asyncDone256 = assert.async();

    function encrypt(bitString: string, done: (bitString: string, sourceString: string) => void): void
    {
      var _cipherBitString: string;
      var _AES_OFB_Stream256_encrypt: TS.Security.AES_OFB_Stream;

      _cipherBitString = "";
      _AES_OFB_Stream256_encrypt = new TS.Security.AES_OFB_Stream(AES_OFB_TestVector256.key, AES_OFB_TestVector256.IV, TS.Security.CipherOperationEnum.ENCRYPT,
        /*onSegmentComplete*/
        (binaryString: string) =>
        {
          _cipherBitString += binaryString;
        },
        /*onClosed*/
        () =>
        {
          done(_cipherBitString, bitString);
        },
        /*onError*/
        (exception: TS.Exception) =>
        {
          throw exception;
        }
        );
      _AES_OFB_Stream256_encrypt.writeBitString(bitString);
      _AES_OFB_Stream256_encrypt.close();
    }


    function decrypt(bitString: string, sourceString: string, done: (bitString: string, sourceString: string) => void): void
    {
      var _plainBitString: string;
      var _AES_OFB_Stream256_decrypt: TS.Security.AES_OFB_Stream;

      _plainBitString = "";
      _AES_OFB_Stream256_decrypt = new TS.Security.AES_OFB_Stream(AES_OFB_TestVector256.key, AES_OFB_TestVector256.IV, TS.Security.CipherOperationEnum.DECRYPT,
        /*onSegmentComplete*/
        (binaryString: string) =>
        {
          _plainBitString += binaryString;
        },
        /*onClosed*/
        () =>
        {
          done(_plainBitString, sourceString);
        },
        /*onError*/
        (exception: TS.Exception) =>
        {
          throw exception;
        }
        );
      _AES_OFB_Stream256_decrypt.writeBitString(bitString);
      _AES_OFB_Stream256_decrypt.close();
    }

    _plainDataArray = TS.Encoding.UTF.UTF16StringToUTF8Array("abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXY0123456789");

    while (_plainDataArray.length >= 1)
    {
      encrypt(TS.Utils.byteArrayToBitString(_plainDataArray), (bitString: string, sourceString: string) => 
      {
        decrypt(bitString, sourceString, (bitString: string, sourceString: string) => 
        {
          var _resultString = TS.Encoding.UTF.UTF8ArrayToUTF16String(TS.Utils.bitStringToByteArray(bitString));
          var _sourceString = TS.Encoding.UTF.UTF8ArrayToUTF16String(TS.Utils.bitStringToByteArray(sourceString));
          assert.equal(bitString, sourceString, "The encrypted / decrypted string should match with the original string.");
          if (_sourceString.length == 1)
          {
            _asyncDone256();
          }//END if
        });
      });

      if (_plainDataArray.length > 0)
      {
        _plainDataArray.pop();
      }//END if

    }//END while

  });

}//END module
