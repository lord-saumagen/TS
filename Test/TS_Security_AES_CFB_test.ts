"use strict";

module TS_Security_test
{
  var AES_CFB_TestVector128_1BIT;
  var AES_CFB_TestVector192_1BIT;
  var AES_CFB_TestVector256_1BIT;
  var AES_CFB_TestVector128_8BIT
  var AES_CFB_TestVector192_8BIT
  var AES_CFB_TestVector256_8BIT
  var numberArray16: Array<number>;
  var unsignedByteValueArray16: Array<number>;
  var unsignedByteValueArray33: Array<number>;

  QUnit.module("TS.Security.AES_CFB",
    {
      setupOnce: function ()
      {

        AES_CFB_TestVector128_8BIT = {
          plainText: [0x6b, 0xc1, 0xbe, 0xe2, 0x2e, 0x40, 0x9f, 0x96, 0xe9, 0x3d, 0x7e, 0x11, 0x73, 0x93, 0x17, 0x2a, 0xae, 0x2d],
          key: [0x2b, 0x7e, 0x15, 0x16, 0x28, 0xae, 0xd2, 0xa6, 0xab, 0xf7, 0x15, 0x88, 0x09, 0xcf, 0x4f, 0x3c],
          IV: [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f],
          cipherText: [0x3b, 0x79, 0x42, 0x4c, 0x9c, 0x0d, 0xd4, 0x36, 0xba, 0xce, 0x9e, 0x0e, 0xd4, 0x58, 0x6a, 0x4f, 0x32, 0xb9]
        };

        AES_CFB_TestVector192_8BIT = {
          plainText: [0x6b, 0xc1, 0xbe, 0xe2, 0x2e, 0x40, 0x9f, 0x96, 0xe9, 0x3d, 0x7e, 0x11, 0x73, 0x93, 0x17, 0x2a, 0xae, 0x2d],
          key: [0x8e, 0x73, 0xb0, 0xf7, 0xda, 0x0e, 0x64, 0x52, 0xc8, 0x10, 0xf3, 0x2b, 0x80, 0x90, 0x79, 0xe5, 0x62, 0xf8, 0xea, 0xd2, 0x52, 0x2c, 0x6b, 0x7b],
          IV: [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f],
          cipherText: [0xcd, 0xa2, 0x52, 0x1e, 0xf0, 0xa9, 0x05, 0xca, 0x44, 0xcd, 0x05, 0x7c, 0xbf, 0x0d, 0x47, 0xa0, 0x67, 0x8a]
        };

        AES_CFB_TestVector256_8BIT = {
          plainText: [0x6b, 0xc1, 0xbe, 0xe2, 0x2e, 0x40, 0x9f, 0x96, 0xe9, 0x3d, 0x7e, 0x11, 0x73, 0x93, 0x17, 0x2a, 0xae, 0x2d],
          key: [0x60, 0x3d, 0xeb, 0x10, 0x15, 0xca, 0x71, 0xbe, 0x2b, 0x73, 0xae, 0xf0, 0x85, 0x7d, 0x77, 0x81, 0x1f, 0x35, 0x2c, 0x07, 0x3b, 0x61, 0x08, 0xd7, 0x2d, 0x98, 0x10, 0xa3, 0x09, 0x14, 0xdf, 0xf4],
          IV: [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f],
          cipherText: [0xdc, 0x1f, 0x1a, 0x85, 0x20, 0xa6, 0x4d, 0xb5, 0x5f, 0xcc, 0x8a, 0xc5, 0x54, 0x84, 0x4e, 0x88, 0x97, 0x00]
        };

        AES_CFB_TestVector128_1BIT = {
          plainText: "0110101111000001",
          key: [0x2b, 0x7e, 0x15, 0x16, 0x28, 0xae, 0xd2, 0xa6, 0xab, 0xf7, 0x15, 0x88, 0x09, 0xcf, 0x4f, 0x3c],
          IV: [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f],
          cipherText: "0110100010110011"
        };

        AES_CFB_TestVector192_1BIT = {
          plainText: "0110101111000001",
          key: [0x8e, 0x73, 0xb0, 0xf7, 0xda, 0x0e, 0x64, 0x52, 0xc8, 0x10, 0xf3, 0x2b, 0x80, 0x90, 0x79, 0xe5, 0x62, 0xf8, 0xea, 0xd2, 0x52, 0x2c, 0x6b, 0x7b],
          IV: [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f],
          cipherText: "1001001101011001"
        };

        AES_CFB_TestVector256_1BIT = {
          plainText: "0110101111000001",
          key: [0x60, 0x3d, 0xeb, 0x10, 0x15, 0xca, 0x71, 0xbe, 0x2b, 0x73, 0xae, 0xf0, 0x85, 0x7d, 0x77, 0x81, 0x1f, 0x35, 0x2c, 0x07, 0x3b, 0x61, 0x08, 0xd7, 0x2d, 0x98, 0x10, 0xa3, 0x09, 0x14, 0xdf, 0xf4],
          IV: [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f],
          cipherText: "1001000000101001"
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


  QUnit.test("AES_CFB constructor", (assert) =>
  {
    var _AES_CFB: TS.Security.AES_CFB;
    var _undefined;

    assert.throws(() =>
    {
      _AES_CFB = new TS.Security.AES_CFB(null, [], 8);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for a null 'keyByteArray' argument.");

    assert.throws(() =>
    {
      _AES_CFB = new TS.Security.AES_CFB(_undefined, [], 8);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for an undefined 'keyByteArray' argument.");

    assert.throws(() =>
    {
      _AES_CFB = new TS.Security.AES_CFB([], [], 8);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for an empty 'keyByteArray' argument.");

    assert.throws(() =>
    {
      _AES_CFB = new TS.Security.AES_CFB(unsignedByteValueArray33.slice(0, 15), [], 8);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_CFB = new TS.Security.AES_CFB(unsignedByteValueArray33.slice(0, 17), [], 8);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_CFB = new TS.Security.AES_CFB(unsignedByteValueArray33.slice(0, 23), [], 8);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_CFB = new TS.Security.AES_CFB(unsignedByteValueArray33.slice(0, 25), [], 8);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_CFB = new TS.Security.AES_CFB(unsignedByteValueArray33.slice(0, 31), [], 8);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_CFB = new TS.Security.AES_CFB(unsignedByteValueArray33, [], 8);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_CFB = new TS.Security.AES_CFB(unsignedByteValueArray16, null, 8);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for a null 'initialisationVector' argument.");

    assert.throws(() =>
    {
      _AES_CFB = new TS.Security.AES_CFB(unsignedByteValueArray16, _undefined, 8);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for an undefined 'initialisationVector' argument.");

    assert.throws(() =>
    {
      _AES_CFB = new TS.Security.AES_CFB(unsignedByteValueArray16, [], 8);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for an empty 'initialisationVector' argument.");

    assert.throws(() =>
    {
      _AES_CFB = new TS.Security.AES_CFB(unsignedByteValueArray16, unsignedByteValueArray33.slice(0, 15), 8);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'initialisationVector' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_CFB = new TS.Security.AES_CFB(unsignedByteValueArray16, numberArray16, 8);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a call with a 'initialisationVector' which is not an unsigned byte value array.");

    assert.throws(() =>
    {
      _AES_CFB = new TS.Security.AES_CFB(unsignedByteValueArray16, unsignedByteValueArray16, null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'segmentSizeInBit' argument.");

    assert.throws(() =>
    {
      _AES_CFB = new TS.Security.AES_CFB(unsignedByteValueArray16, unsignedByteValueArray16, _undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a undefined 'segmentSizeInBit' argument.");

    assert.throws(() =>
    {
      _AES_CFB = new TS.Security.AES_CFB(unsignedByteValueArray16, unsignedByteValueArray16, -1);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a invalid 'segmentSizeInBit' argument.");

    assert.throws(() =>
    {
      _AES_CFB = new TS.Security.AES_CFB(unsignedByteValueArray16, unsignedByteValueArray16, 0);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a 'segmentSizeInBit' value which is outside the allowed range as argument.");

    assert.throws(() =>
    {
      _AES_CFB = new TS.Security.AES_CFB(unsignedByteValueArray16, unsignedByteValueArray16, 129);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a 'segmentSizeInBit' value which is outside the allowed range as argument.");

    _AES_CFB = new TS.Security.AES_CFB(unsignedByteValueArray16, unsignedByteValueArray16, 8);
    assert.ok(TS.Utils.Assert.isObject(_AES_CFB), "Should pass for a call with valid arguments.");
  });



  QUnit.test("AES_CFB encrypt", (assert) =>
  {
    var _AES_CFB;
    var _index: number;
    var _cipherText: string;

    _AES_CFB = new TS.Security.AES_CFB(AES_CFB_TestVector128_8BIT.key, AES_CFB_TestVector128_8BIT.IV, 8);
    _cipherText = _AES_CFB.encrypt(AES_CFB_TestVector128_8BIT.plainText);
    assert.deepEqual(_cipherText, AES_CFB_TestVector128_8BIT.cipherText, "The encrypted text schould match with the test vector for a 128 bit key.");

    _AES_CFB = new TS.Security.AES_CFB(AES_CFB_TestVector192_8BIT.key, AES_CFB_TestVector192_8BIT.IV, 8);
    _cipherText = _AES_CFB.encrypt(AES_CFB_TestVector192_8BIT.plainText);
    assert.deepEqual(_cipherText, AES_CFB_TestVector192_8BIT.cipherText, "The encrypted text schould match with the test vector for a 192 bit key.");

    _AES_CFB = new TS.Security.AES_CFB(AES_CFB_TestVector256_8BIT.key, AES_CFB_TestVector256_8BIT.IV, 8);
    _cipherText = _AES_CFB.encrypt(AES_CFB_TestVector256_8BIT.plainText);
    assert.deepEqual(_cipherText, AES_CFB_TestVector256_8BIT.cipherText, "The encrypted text schould match with the test vector for a 256 bit key.");

    _AES_CFB = new TS.Security.AES_CFB(AES_CFB_TestVector128_1BIT.key, AES_CFB_TestVector128_1BIT.IV, 1);
    _cipherText = _AES_CFB.encryptBitString(AES_CFB_TestVector128_1BIT.plainText);
    assert.equal(_cipherText, AES_CFB_TestVector128_1BIT.cipherText, "The encrypted text schould match with the test vector for a 128 bit key.");

    _AES_CFB = new TS.Security.AES_CFB(AES_CFB_TestVector192_1BIT.key, AES_CFB_TestVector192_1BIT.IV, 1);
    _cipherText = _AES_CFB.encryptBitString(AES_CFB_TestVector192_1BIT.plainText);
    assert.equal(_cipherText, AES_CFB_TestVector192_1BIT.cipherText, "The encrypted text schould match with the test vector for a 192 bit key.");

    _AES_CFB = new TS.Security.AES_CFB(AES_CFB_TestVector256_1BIT.key, AES_CFB_TestVector256_1BIT.IV, 1);
    _cipherText = _AES_CFB.encryptBitString(AES_CFB_TestVector256_1BIT.plainText);
    assert.equal(_cipherText, AES_CFB_TestVector256_1BIT.cipherText, "The encrypted text schould match with the test vector for a 256 bit key.");
  });


  QUnit.test("AES_CFB decrypt", (assert) =>
  {
    var _AES_CFB;
    var _plainText: string;

    _AES_CFB = new TS.Security.AES_CFB(AES_CFB_TestVector128_8BIT.key, AES_CFB_TestVector128_8BIT.IV, 8);
    _plainText = _AES_CFB.decrypt(AES_CFB_TestVector128_8BIT.cipherText);
    assert.deepEqual(_plainText, AES_CFB_TestVector128_8BIT.plainText, "The decrypted text schould match with the test vector for a 128 bit key.");

    _AES_CFB = new TS.Security.AES_CFB(AES_CFB_TestVector192_8BIT.key, AES_CFB_TestVector192_8BIT.IV, 8);
    _plainText = _AES_CFB.decrypt(AES_CFB_TestVector192_8BIT.cipherText);
    assert.deepEqual(_plainText, AES_CFB_TestVector192_8BIT.plainText, "The decrypted text schould match with the test vector for a 192 bit key.");

    _AES_CFB = new TS.Security.AES_CFB(AES_CFB_TestVector256_8BIT.key, AES_CFB_TestVector256_8BIT.IV, 8);
    _plainText = _AES_CFB.decrypt(AES_CFB_TestVector256_8BIT.cipherText);
    assert.deepEqual(_plainText, AES_CFB_TestVector256_8BIT.plainText, "The decrypted text schould match with the test vector for a 256 bit key.");

    _AES_CFB = new TS.Security.AES_CFB(AES_CFB_TestVector128_1BIT.key, AES_CFB_TestVector128_1BIT.IV, 1);
    _plainText = _AES_CFB.decryptBitString(AES_CFB_TestVector128_1BIT.cipherText);
    assert.equal(_plainText, AES_CFB_TestVector128_1BIT.plainText, "The decrypted text schould match with the test vector for a 128 bit key.");

    _AES_CFB = new TS.Security.AES_CFB(AES_CFB_TestVector192_1BIT.key, AES_CFB_TestVector192_1BIT.IV, 1);
    _plainText = _AES_CFB.decryptBitString(AES_CFB_TestVector192_1BIT.cipherText);
    assert.equal(_plainText, AES_CFB_TestVector192_1BIT.plainText, "The decrypted text schould match with the test vector for a 192 bit key.");

    _AES_CFB = new TS.Security.AES_CFB(AES_CFB_TestVector256_1BIT.key, AES_CFB_TestVector256_1BIT.IV, 1);
    _plainText = _AES_CFB.decryptBitString(AES_CFB_TestVector256_1BIT.cipherText);
    assert.equal(_plainText, AES_CFB_TestVector256_1BIT.plainText, "The decrypted text schould match with the test vector for a 256 bit key.");
  });


  QUnit.test("AES_CFB_Stream constructor", (assert) =>
  {
    var _onNextData: (bitString: string) => void;
    var _onClosed: () => void;
    var _onError: (exception: TS.Exception) => void;
    var _AES_CFB_Stream: TS.Security.AES_CFB_Stream;
    var _undefined;

    _onNextData = (bitString: string) => { };
    _onClosed = () => { };
    _onError = (exception: TS.Exception) => { };

    assert.throws(() =>
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(null, [], 8, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for a null 'keyByteArray' argument.");

    assert.throws(() =>
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(_undefined, [], 8, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for an undefined 'keyByteArray' argument.");

    assert.throws(() =>
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream([], [], 8, TS.Security.CipherOperationEnum.ENCRYPT,  _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for an empty 'keyByteArray' argument.");

    assert.throws(() =>
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(unsignedByteValueArray33.slice(0, 15), [], 8, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(unsignedByteValueArray33.slice(0, 17), [], 8, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(unsignedByteValueArray33.slice(0, 23), [], 8, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(unsignedByteValueArray33.slice(0, 25), [], 8, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(unsignedByteValueArray33.slice(0, 31), [], 8, TS.Security.CipherOperationEnum.ENCRYPT,  _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(unsignedByteValueArray33, [], 8, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(unsignedByteValueArray16, null, 8, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for a null 'initialisationVector' argument.");

    assert.throws(() =>
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(unsignedByteValueArray16, _undefined, 8, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for an undefined 'initialisationVector' argument.");

    assert.throws(() =>
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(unsignedByteValueArray16, [], 8, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for an empty 'initialisationVector' argument.");

    assert.throws(() =>
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(unsignedByteValueArray16, unsignedByteValueArray33.slice(0, 15), 8, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'initialisationVector' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(unsignedByteValueArray16, numberArray16, 8, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a call with a 'initialisationVector' which is not an unsigned byte value array.");

    assert.throws(() =>
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(unsignedByteValueArray16, unsignedByteValueArray16, null, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'segmentSizeInBit' argument.");

    assert.throws(() =>
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(unsignedByteValueArray16, unsignedByteValueArray16, _undefined, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a undefined 'segmentSizeInBit' argument.");

    assert.throws(() =>
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(unsignedByteValueArray16, unsignedByteValueArray16, -1, TS.Security.CipherOperationEnum.ENCRYPT,  _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a invalid 'segmentSizeInBit' argument.");

    assert.throws(() =>
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(unsignedByteValueArray16, unsignedByteValueArray16, 0, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a 'segmentSizeInBit' value which is outside the allowed range as argument.");

    assert.throws(() =>
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(unsignedByteValueArray16, unsignedByteValueArray16, 129, TS.Security.CipherOperationEnum.ENCRYPT,  _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a 'segmentSizeInBit' value which is outside the allowed range as argument.");





    assert.throws(() =>
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(unsignedByteValueArray16, unsignedByteValueArray16, 128, null, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'cipherOperation' argument.");

    assert.throws(() =>
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(unsignedByteValueArray16, unsignedByteValueArray16, 128, _undefined, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'cipherOperation' argument.");

    assert.throws(() =>
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(unsignedByteValueArray16, unsignedByteValueArray16, 128, -1, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a call with an invalid value for the 'cipherOperation' argument.");

    assert.throws(() =>
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(unsignedByteValueArray16, unsignedByteValueArray16, 128, 2, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a call with an invalid value for the 'cipherOperation' argument.");

    assert.throws(() =>
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(unsignedByteValueArray16, unsignedByteValueArray16, 128, 0.75, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a call with an invalid value for the 'cipherOperation' argument.");

    assert.throws(() =>
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(unsignedByteValueArray16, unsignedByteValueArray16, 128, TS.Security.CipherOperationEnum.ENCRYPT, null, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'onNextData' argument.");

    assert.throws(() =>
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(unsignedByteValueArray16, unsignedByteValueArray16, 128, TS.Security.CipherOperationEnum.ENCRYPT, _undefined, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'onNextData' argument.");

    assert.throws(() =>
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(unsignedByteValueArray16, unsignedByteValueArray16, 128, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, null, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'onClosed' argument.");

    assert.throws(() =>
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(unsignedByteValueArray16, unsignedByteValueArray16, 128, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _undefined, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'onClosed' argument.");

    assert.throws(() =>
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(unsignedByteValueArray16, unsignedByteValueArray16, 128, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'onError' argument.");

    assert.throws(() =>
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(unsignedByteValueArray16, unsignedByteValueArray16, 128, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'onError' argument.");






    _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(unsignedByteValueArray16, unsignedByteValueArray16, 8, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    assert.ok(TS.Utils.Assert.isObject(_AES_CFB_Stream), "Should pass for a call with valid arguments.");
  });

  QUnit.test("AES_CFB_Stream write (async stream encrypt)", (assert) =>
  {
    var _oneBit = 1;
    var _eightBit = 8;

    var _AES_CFB_Stream128_1BIT: TS.Security.AES_CFB_Stream;
    var _AES_CFB_Stream192_1BIT: TS.Security.AES_CFB_Stream;
    var _AES_CFB_Stream256_1BIT: TS.Security.AES_CFB_Stream;
    var _AES_CFB_Stream128_8BIT: TS.Security.AES_CFB_Stream;
    var _AES_CFB_Stream192_8BIT: TS.Security.AES_CFB_Stream;
    var _AES_CFB_Stream256_8BIT: TS.Security.AES_CFB_Stream;
    var _cipherText128_1BIT: string;
    var _cipherText192_1BIT: string;
    var _cipherText256_1BIT: string;
    var _cipherText128_8BIT: string;
    var _cipherText192_8BIT: string;
    var _cipherText256_8BIT: string;
    var _asyncDone128_1BIT: () => void;
    var _asyncDone192_1BIT: () => void;
    var _asyncDone256_1BIT: () => void;
    var _asyncDone128_8BIT: () => void;
    var _asyncDone192_8BIT: () => void;
    var _asyncDone256_8BIT: () => void;



    //****************//
    // 128 Bit Key    //
    //****************//

    //**********************//
    // 1 Bit segment length //
    //**********************//
    _asyncDone128_1BIT = assert.async();
    _cipherText128_1BIT = "";

    _AES_CFB_Stream128_1BIT = new TS.Security.AES_CFB_Stream(AES_CFB_TestVector128_1BIT.key, AES_CFB_TestVector128_1BIT.IV, _oneBit, TS.Security.CipherOperationEnum.ENCRYPT,
      /*onSegmentComplete*/
      (binaryString: string) =>
      {
        _cipherText128_1BIT += binaryString;
      },
      /*onClosed*/
      () =>
      {
        assert.equal(_cipherText128_1BIT, AES_CFB_TestVector128_1BIT.cipherText, "The encrypted text schould match with the test vector for a 128 bit key.");
        _asyncDone128_1BIT();
      },
      /*onError*/
      (exception: TS.Exception) =>
      {
        throw exception;
        _asyncDone128_1BIT();
      }
      );
    _AES_CFB_Stream128_1BIT.writeBitString(AES_CFB_TestVector128_1BIT.plainText);
    _AES_CFB_Stream128_1BIT.close();


    //**********************//
    // 8 Bit segment length //
    //**********************//
    _asyncDone128_8BIT = assert.async();
    _cipherText128_8BIT = "";

    _AES_CFB_Stream128_8BIT = new TS.Security.AES_CFB_Stream(AES_CFB_TestVector128_8BIT.key, AES_CFB_TestVector128_8BIT.IV, _eightBit, TS.Security.CipherOperationEnum.ENCRYPT,
      /*onSegmentComplete*/
      (binaryString: string) =>
      {
        _cipherText128_8BIT += binaryString;
      },
      /*onClosed*/
      () =>
      {
        assert.equal(_cipherText128_8BIT, TS.Utils.byteArrayToBitString(AES_CFB_TestVector128_8BIT.cipherText), "The encrypted text schould match with the test vector for a 128 bit key.");
        _asyncDone128_8BIT();
      },
      /*onError*/
      (exception: TS.Exception) =>
      {
        throw exception;
        _asyncDone128_8BIT();
      }
      );
    _AES_CFB_Stream128_8BIT.writeByteArray(AES_CFB_TestVector128_8BIT.plainText);
    _AES_CFB_Stream128_8BIT.close();

    //****************//
    // 192 Bit Key    //
    //****************//

    //**********************//
    // 1 Bit segment length //
    //**********************//
    _asyncDone192_1BIT = assert.async();
    _cipherText192_1BIT = "";

    _AES_CFB_Stream192_1BIT = new TS.Security.AES_CFB_Stream(AES_CFB_TestVector192_1BIT.key, AES_CFB_TestVector192_1BIT.IV, _oneBit, TS.Security.CipherOperationEnum.ENCRYPT,
      /*onSegmentComplete*/
      (binaryString: string) =>
      {
        _cipherText192_1BIT += binaryString;
      },
      /*onClosed*/
      () =>
      {
        assert.equal(_cipherText192_1BIT, AES_CFB_TestVector192_1BIT.cipherText, "The encrypted text schould match with the test vector for a 192 bit key.");
        _asyncDone192_1BIT();
      },
      /*onError*/
      (exception: TS.Exception) =>
      {
        throw exception;
        _asyncDone192_1BIT();
      }
      );
    _AES_CFB_Stream192_1BIT.writeBitString(AES_CFB_TestVector192_1BIT.plainText);
    _AES_CFB_Stream192_1BIT.close();

    //**********************//
    // 8 Bit segment length //
    //**********************//
    _asyncDone192_8BIT = assert.async();
    _cipherText192_8BIT = "";

    _AES_CFB_Stream192_8BIT = new TS.Security.AES_CFB_Stream(AES_CFB_TestVector192_8BIT.key, AES_CFB_TestVector192_8BIT.IV, _eightBit, TS.Security.CipherOperationEnum.ENCRYPT, 
      /*onSegmentComplete*/
      (binaryString: string) =>
      {
        _cipherText192_8BIT += binaryString;
      },
      /*onClosed*/
      () =>
      {
        assert.equal(_cipherText192_8BIT, TS.Utils.byteArrayToBitString(AES_CFB_TestVector192_8BIT.cipherText), "The encrypted text schould match with the test vector for a 192 bit key.");
        _asyncDone192_8BIT();
      },
      /*onError*/
      (exception: TS.Exception) =>
      {
        throw exception;
        _asyncDone192_8BIT();
      }
      );
    _AES_CFB_Stream192_8BIT.writeByteArray(AES_CFB_TestVector192_8BIT.plainText);
    _AES_CFB_Stream192_8BIT.close();

    //****************//
    // 256 Bit Key    //
    //****************//

    //**********************//
    // 1 Bit segment length //
    //**********************//
    _asyncDone256_1BIT = assert.async();
    _cipherText256_1BIT = "";

    _AES_CFB_Stream256_1BIT = new TS.Security.AES_CFB_Stream(AES_CFB_TestVector256_1BIT.key, AES_CFB_TestVector256_1BIT.IV, _oneBit, TS.Security.CipherOperationEnum.ENCRYPT, 
      /*onSegmentComplete*/
      (binaryString: string) =>
      {
        _cipherText256_1BIT += binaryString;
      },
      /*onClosed*/
      () =>
      {
        assert.equal(_cipherText256_1BIT, AES_CFB_TestVector256_1BIT.cipherText, "The encrypted text schould match with the test vector for a 256 bit key.");
        _asyncDone256_1BIT();
      },
      /*onError*/
      (exception: TS.Exception) =>
      {
        throw exception;
        _asyncDone256_1BIT();
      }
      );
    _AES_CFB_Stream256_1BIT.writeBitString(AES_CFB_TestVector256_1BIT.plainText);
    _AES_CFB_Stream256_1BIT.close();

    //**********************//
    // 8 Bit segment length //
    //**********************//
    _asyncDone256_8BIT = assert.async();
    _cipherText256_8BIT = "";

    _AES_CFB_Stream256_8BIT = new TS.Security.AES_CFB_Stream(AES_CFB_TestVector256_8BIT.key, AES_CFB_TestVector256_8BIT.IV, _eightBit, TS.Security.CipherOperationEnum.ENCRYPT, 
      /*onSegmentComplete*/
      (binaryString: string) =>
      {
        _cipherText256_8BIT += binaryString;
      },
      /*onClosed*/
      () =>
      {
        assert.equal(_cipherText256_8BIT, TS.Utils.byteArrayToBitString(AES_CFB_TestVector256_8BIT.cipherText), "The encrypted text schould match with the test vector for a 256 bit key.");
        _asyncDone256_8BIT();
      },
      /*onError*/
      (exception: TS.Exception) =>
      {
        throw exception;
        _asyncDone256_8BIT();
      }
      );
    _AES_CFB_Stream256_8BIT.writeByteArray(AES_CFB_TestVector256_8BIT.plainText);
    _AES_CFB_Stream256_8BIT.close();
  });


  QUnit.test("AES_CFB_Stream write (async stream decrypt)", (assert) =>
  {
    var _oneBit = 1;
    var _eightBit = 8;

    var _AES_CFB_Stream128_1BIT: TS.Security.AES_CFB_Stream;
    var _AES_CFB_Stream192_1BIT: TS.Security.AES_CFB_Stream;
    var _AES_CFB_Stream256_1BIT: TS.Security.AES_CFB_Stream;
    var _AES_CFB_Stream128_8BIT: TS.Security.AES_CFB_Stream;
    var _AES_CFB_Stream192_8BIT: TS.Security.AES_CFB_Stream;
    var _AES_CFB_Stream256_8BIT: TS.Security.AES_CFB_Stream;
    var _plainText128_1BIT: string;
    var _plainText192_1BIT: string;
    var _plainText256_1BIT: string;
    var _plainText128_8BIT: string;
    var _plainText192_8BIT: string;
    var _plainText256_8BIT: string;
    var _asyncDone128_1BIT: () => void;
    var _asyncDone192_1BIT: () => void;
    var _asyncDone256_1BIT: () => void;
    var _asyncDone128_8BIT: () => void;
    var _asyncDone192_8BIT: () => void;
    var _asyncDone256_8BIT: () => void;

    //****************//
    // 128 Bit Key    //
    //****************//

    //**********************//
    // 1 Bit segment length //
    //**********************//
    _asyncDone128_1BIT = assert.async();
    _plainText128_1BIT = "";

    _AES_CFB_Stream128_1BIT = new TS.Security.AES_CFB_Stream(AES_CFB_TestVector128_1BIT.key, AES_CFB_TestVector128_1BIT.IV, _oneBit, TS.Security.CipherOperationEnum.DECRYPT, 
      /*onSegmentComplete*/
      (binaryString: string) =>
      {
        _plainText128_1BIT += binaryString;
      },
      /*onClosed*/
      () =>
      {
        assert.equal(_plainText128_1BIT, AES_CFB_TestVector128_1BIT.plainText, "The decrypted text schould match with the test vector for a 128 bit key.");
        _asyncDone128_1BIT();
      },
      /*onError*/
      (exception: TS.Exception) =>
      {
        throw exception;
        _asyncDone128_1BIT();
      }
      );
    _AES_CFB_Stream128_1BIT.writeBitString(AES_CFB_TestVector128_1BIT.cipherText);
    _AES_CFB_Stream128_1BIT.close();


    //**********************//
    // 8 Bit segment length //
    //**********************//
    _asyncDone128_8BIT = assert.async();
    _plainText128_8BIT = "";

    _AES_CFB_Stream128_8BIT = new TS.Security.AES_CFB_Stream(AES_CFB_TestVector128_8BIT.key, AES_CFB_TestVector128_8BIT.IV, _eightBit, TS.Security.CipherOperationEnum.DECRYPT, 
      /*onSegmentComplete*/
      (binaryString: string) =>
      {
        _plainText128_8BIT += binaryString;
      },
      /*onClosed*/
      () =>
      {
        assert.equal(_plainText128_8BIT, TS.Utils.byteArrayToBitString(AES_CFB_TestVector128_8BIT.plainText), "The decrypted text schould match with the test vector for a 128 bit key.");
        _asyncDone128_8BIT();
      },
      /*onError*/
      (exception: TS.Exception) =>
      {
        throw exception;
        _asyncDone128_8BIT();
      }
      );
    _AES_CFB_Stream128_8BIT.writeByteArray(AES_CFB_TestVector128_8BIT.cipherText);
    _AES_CFB_Stream128_8BIT.close();

    //****************//
    // 192 Bit Key    //
    //****************//

    //**********************//
    // 1 Bit segment length //
    //**********************//
    _asyncDone192_1BIT = assert.async();
    _plainText192_1BIT = "";

    _AES_CFB_Stream192_1BIT = new TS.Security.AES_CFB_Stream(AES_CFB_TestVector192_1BIT.key, AES_CFB_TestVector192_1BIT.IV, _oneBit, TS.Security.CipherOperationEnum.DECRYPT, 
      /*onSegmentComplete*/
      (binaryString: string) =>
      {
        _plainText192_1BIT += binaryString;
      },
      /*onClosed*/
      () =>
      {
        assert.equal(_plainText192_1BIT, AES_CFB_TestVector192_1BIT.plainText, "The decrypted text schould match with the test vector for a 192 bit key.");
        _asyncDone192_1BIT();
      },
      /*onError*/
      (exception: TS.Exception) =>
      {
        throw exception;
        _asyncDone192_1BIT();
      }
      );
    _AES_CFB_Stream192_1BIT.writeBitString(AES_CFB_TestVector192_1BIT.cipherText);
    _AES_CFB_Stream192_1BIT.close();

    //**********************//
    // 8 Bit segment length //
    //**********************//
    _asyncDone192_8BIT = assert.async();
    _plainText192_8BIT = "";

    _AES_CFB_Stream192_8BIT = new TS.Security.AES_CFB_Stream(AES_CFB_TestVector192_8BIT.key, AES_CFB_TestVector192_8BIT.IV, _eightBit, TS.Security.CipherOperationEnum.DECRYPT, 
      /*onSegmentComplete*/
      (binaryString: string) =>
      {
        _plainText192_8BIT += binaryString;
      },
      /*onClosed*/
      () =>
      {
        assert.equal(_plainText192_8BIT, TS.Utils.byteArrayToBitString(AES_CFB_TestVector192_8BIT.plainText), "The decrypted text schould match with the test vector for a 192 bit key.");
        _asyncDone192_8BIT();
      },
      /*onError*/
      (exception: TS.Exception) =>
      {
        throw exception;
        _asyncDone192_8BIT();
      }
      );
    _AES_CFB_Stream192_8BIT.writeByteArray(AES_CFB_TestVector192_8BIT.cipherText);
    _AES_CFB_Stream192_8BIT.close();

    //****************//
    // 256 Bit Key    //
    //****************//

    //**********************//
    // 1 Bit segment length //
    //**********************//
    _asyncDone256_1BIT = assert.async();
    _plainText256_1BIT = "";

    _AES_CFB_Stream256_1BIT = new TS.Security.AES_CFB_Stream(AES_CFB_TestVector256_1BIT.key, AES_CFB_TestVector256_1BIT.IV, _oneBit, TS.Security.CipherOperationEnum.DECRYPT, 
      /*onSegmentComplete*/
      (binaryString: string) =>
      {
        _plainText256_1BIT += binaryString;
      },
      /*onClosed*/
      () =>
      {
        assert.equal(_plainText256_1BIT, AES_CFB_TestVector256_1BIT.plainText, "The decrypted text schould match with the test vector for a 256 bit key.");
        _asyncDone256_1BIT();
      },
      /*onError*/
      (exception: TS.Exception) =>
      {
        throw exception;
        _asyncDone256_1BIT();
      }
      );
    _AES_CFB_Stream256_1BIT.writeBitString(AES_CFB_TestVector256_1BIT.cipherText);
    _AES_CFB_Stream256_1BIT.close();

    //**********************//
    // 8 Bit segment length //
    //**********************//
    _asyncDone256_8BIT = assert.async();
    _plainText256_8BIT = "";

    _AES_CFB_Stream256_8BIT = new TS.Security.AES_CFB_Stream(AES_CFB_TestVector256_8BIT.key, AES_CFB_TestVector256_8BIT.IV, _eightBit, TS.Security.CipherOperationEnum.DECRYPT, 
      /*onSegmentComplete*/
      (binaryString: string) =>
      {
        _plainText256_8BIT += binaryString;
      },
      /*onClosed*/
      () =>
      {
        assert.equal(_plainText256_8BIT, TS.Utils.byteArrayToBitString(AES_CFB_TestVector256_8BIT.plainText), "The decrypted text schould match with the test vector for a 256 bit key.");
        _asyncDone256_8BIT();
      },
      /*onError*/
      (exception: TS.Exception) =>
      {
        throw exception;
        _asyncDone256_8BIT();
      }
      );
    _AES_CFB_Stream256_8BIT.writeByteArray(AES_CFB_TestVector256_8BIT.cipherText);
    _AES_CFB_Stream256_8BIT.close();
  });


}//END module 