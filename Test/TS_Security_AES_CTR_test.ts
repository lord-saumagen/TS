"use strict";

module TS_Security_test
{
  var AES_CTR_TestVector128;
  var AES_CTR_TestVector192;
  var AES_CTR_TestVector256;
  var numberArray16: Array<number>;
  var unsignedByteValueArray16: Array<number>;
  var unsignedByteValueArray33: Array<number>;

  QUnit.module("TS.Security.AES_CTR",
    {
      setupOnce: function ()
      {

        AES_CTR_TestVector128 = {
          plainText: [0x6b, 0xc1, 0xbe, 0xe2, 0x2e, 0x40, 0x9f, 0x96, 0xe9, 0x3d, 0x7e, 0x11, 0x73, 0x93, 0x17, 0x2a, 0xae, 0x2d, 0x8a, 0x57, 0x1e, 0x03, 0xac, 0x9c, 0x9e, 0xb7, 0x6f, 0xac, 0x45, 0xaf, 0x8e, 0x51, 0x30, 0xc8, 0x1c, 0x46, 0xa3, 0x5c, 0xe4, 0x11, 0xe5, 0xfb, 0xc1, 0x19, 0x1a, 0x0a, 0x52, 0xef, 0xf6, 0x9f, 0x24, 0x45, 0xdf, 0x4f, 0x9b, 0x17, 0xad, 0x2b, 0x41, 0x7b, 0xe6, 0x6c, 0x37, 0x10],
          key: [0x2b, 0x7e, 0x15, 0x16, 0x28, 0xae, 0xd2, 0xa6, 0xab, 0xf7, 0x15, 0x88, 0x09, 0xcf, 0x4f, 0x3c],
          nonce: [0xf0, 0xf1, 0xf2, 0xf3, 0xf4, 0xf5, 0xf6, 0xf7, 0xf8, 0xf9, 0xfa, 0xfb, 0xfc, 0xfd, 0xfe, 0xff],
          cipherText: [0x87, 0x4d, 0x61, 0x91, 0xb6, 0x20, 0xe3, 0x26, 0x1b, 0xef, 0x68, 0x64, 0x99, 0x0d, 0xb6, 0xce, 0x98, 0x06, 0xf6, 0x6b, 0x79, 0x70, 0xfd, 0xff, 0x86, 0x17, 0x18, 0x7b, 0xb9, 0xff, 0xfd, 0xff, 0x5a, 0xe4, 0xdf, 0x3e, 0xdb, 0xd5, 0xd3, 0x5e, 0x5b, 0x4f, 0x09, 0x02, 0x0d, 0xb0, 0x3e, 0xab, 0x1e, 0x03, 0x1d, 0xda, 0x2f, 0xbe, 0x03, 0xd1, 0x79, 0x21, 0x70, 0xa0, 0xf3, 0x00, 0x9c, 0xee]
        };

        AES_CTR_TestVector192 = {
          plainText: [0x6b, 0xc1, 0xbe, 0xe2, 0x2e, 0x40, 0x9f, 0x96, 0xe9, 0x3d, 0x7e, 0x11, 0x73, 0x93, 0x17, 0x2a, 0xae, 0x2d, 0x8a, 0x57, 0x1e, 0x03, 0xac, 0x9c, 0x9e, 0xb7, 0x6f, 0xac, 0x45, 0xaf, 0x8e, 0x51, 0x30, 0xc8, 0x1c, 0x46, 0xa3, 0x5c, 0xe4, 0x11, 0xe5, 0xfb, 0xc1, 0x19, 0x1a, 0x0a, 0x52, 0xef, 0xf6, 0x9f, 0x24, 0x45, 0xdf, 0x4f, 0x9b, 0x17, 0xad, 0x2b, 0x41, 0x7b, 0xe6, 0x6c, 0x37, 0x10],
          key: [0x8e, 0x73, 0xb0, 0xf7, 0xda, 0x0e, 0x64, 0x52, 0xc8, 0x10, 0xf3, 0x2b, 0x80, 0x90, 0x79, 0xe5, 0x62, 0xf8, 0xea, 0xd2, 0x52, 0x2c, 0x6b, 0x7b],
          nonce: [0xf0, 0xf1, 0xf2, 0xf3, 0xf4, 0xf5, 0xf6, 0xf7, 0xf8, 0xf9, 0xfa, 0xfb, 0xfc, 0xfd, 0xfe, 0xff],
          cipherText: [0x1a, 0xbc, 0x93, 0x24, 0x17, 0x52, 0x1c, 0xa2, 0x4f, 0x2b, 0x04, 0x59, 0xfe, 0x7e, 0x6e, 0x0b, 0x09, 0x03, 0x39, 0xec, 0x0a, 0xa6, 0xfa, 0xef, 0xd5, 0xcc, 0xc2, 0xc6, 0xf4, 0xce, 0x8e, 0x94, 0x1e, 0x36, 0xb2, 0x6b, 0xd1, 0xeb, 0xc6, 0x70, 0xd1, 0xbd, 0x1d, 0x66, 0x56, 0x20, 0xab, 0xf7, 0x4f, 0x78, 0xa7, 0xf6, 0xd2, 0x98, 0x09, 0x58, 0x5a, 0x97, 0xda, 0xec, 0x58, 0xc6, 0xb0, 0x50]
        };

        AES_CTR_TestVector256 = {
          plainText: [0x6b, 0xc1, 0xbe, 0xe2, 0x2e, 0x40, 0x9f, 0x96, 0xe9, 0x3d, 0x7e, 0x11, 0x73, 0x93, 0x17, 0x2a, 0xae, 0x2d, 0x8a, 0x57, 0x1e, 0x03, 0xac, 0x9c, 0x9e, 0xb7, 0x6f, 0xac, 0x45, 0xaf, 0x8e, 0x51, 0x30, 0xc8, 0x1c, 0x46, 0xa3, 0x5c, 0xe4, 0x11, 0xe5, 0xfb, 0xc1, 0x19, 0x1a, 0x0a, 0x52, 0xef, 0xf6, 0x9f, 0x24, 0x45, 0xdf, 0x4f, 0x9b, 0x17, 0xad, 0x2b, 0x41, 0x7b, 0xe6, 0x6c, 0x37, 0x10],
          key: [0x60, 0x3d, 0xeb, 0x10, 0x15, 0xca, 0x71, 0xbe, 0x2b, 0x73, 0xae, 0xf0, 0x85, 0x7d, 0x77, 0x81, 0x1f, 0x35, 0x2c, 0x07, 0x3b, 0x61, 0x08, 0xd7, 0x2d, 0x98, 0x10, 0xa3, 0x09, 0x14, 0xdf, 0xf4],
          nonce: [0xf0, 0xf1, 0xf2, 0xf3, 0xf4, 0xf5, 0xf6, 0xf7, 0xf8, 0xf9, 0xfa, 0xfb, 0xfc, 0xfd, 0xfe, 0xff],
          cipherText: [0x60, 0x1e, 0xc3, 0x13, 0x77, 0x57, 0x89, 0xa5, 0xb7, 0xa7, 0xf5, 0x04, 0xbb, 0xf3, 0xd2, 0x28, 0xf4, 0x43, 0xe3, 0xca, 0x4d, 0x62, 0xb5, 0x9a, 0xca, 0x84, 0xe9, 0x90, 0xca, 0xca, 0xf5, 0xc5, 0x2b, 0x09, 0x30, 0xda, 0xa2, 0x3d, 0xe9, 0x4c, 0xe8, 0x70, 0x17, 0xba, 0x2d, 0x84, 0x98, 0x8d, 0xdf, 0xc9, 0xc5, 0x8d, 0xb6, 0x7a, 0xad, 0xa6, 0x13, 0xc2, 0xdd, 0x08, 0x45, 0x79, 0x41, 0xa6]
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


  QUnit.test("AES_CTR constructor", (assert) =>
  {
    var _AES_CTR: TS.Security.AES_CTR;
    var _undefined;

    assert.throws(() =>
    {
      _AES_CTR = new TS.Security.AES_CTR(null);
      TS.ArgumentNullUndefOrEmptyException
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for a call with a null 'keyByteArray' arguments.");

    assert.throws(() =>
    {
      _AES_CTR = new TS.Security.AES_CTR(_undefined);
      TS.ArgumentNullUndefOrEmptyException
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for a call with a undefined 'keyByteArray' arguments.");

    assert.throws(() =>
    {
      _AES_CTR = new TS.Security.AES_CTR([]);
      TS.ArgumentNullUndefOrEmptyException
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for a call with an empty 'keyByteArray' arguments.");

    assert.throws(() =>
    {
      _AES_CTR = new TS.Security.AES_CTR([1, 2, 3]);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of elements.");

    assert.throws(() =>
    {
      _AES_CTR = new TS.Security.AES_CTR(numberArray16);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a call with a 'keyByteArray' which is not an array of unsigned byte values.");

    assert.throws(() =>
    {
      _AES_CTR = new TS.Security.AES_CTR(unsignedByteValueArray16, -1);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a 'counterValue' argument which is not a positive integer.");

    assert.throws(() =>
    {
      _AES_CTR = new TS.Security.AES_CTR(unsignedByteValueArray16, 2.5);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a 'counterValue' argument which is not a positive integer.");

    assert.throws(() =>
    {
      _AES_CTR = new TS.Security.AES_CTR(unsignedByteValueArray16, 0xFFFFFFFF + 1);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a 'counterValue' argument which is out of range.");

    assert.throws(() =>
    {
      _AES_CTR = new TS.Security.AES_CTR(unsignedByteValueArray16, numberArray16);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a call with a 'nonce' which is not an array of unsigned byte values.");

    assert.throws(() =>
    {
      _AES_CTR = new TS.Security.AES_CTR(unsignedByteValueArray16, unsignedByteValueArray16.slice(0, 15));
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'nonce' with an invalid number of elements.");

    _AES_CTR = new TS.Security.AES_CTR(unsignedByteValueArray16, 0);
    assert.ok(TS.Utils.Assert.isObject(_AES_CTR), "Should pass for a call with a valid 'keyByteArray' and 'counterValue' argument.");

    _AES_CTR = new TS.Security.AES_CTR(unsignedByteValueArray16, unsignedByteValueArray16);
    assert.ok(TS.Utils.Assert.isObject(_AES_CTR), "Should pass for a call with a valid 'keyByteArray' and 'nonce' argument.");
  });


  QUnit.test("AES_CTR encrypt", (assert) =>
  {
    var _AES_CTR: TS.Security.AES_CTR;
    var _cipherText: Array<number>;

    _AES_CTR = new TS.Security.AES_CTR(AES_CTR_TestVector128.key, AES_CTR_TestVector128.nonce);
    _cipherText = _AES_CTR.encrypt(AES_CTR_TestVector128.plainText);
    assert.deepEqual(_cipherText, AES_CTR_TestVector128.cipherText, "The encrypted text schould match with the test vector for a 128 bit key.");

    _AES_CTR = new TS.Security.AES_CTR(AES_CTR_TestVector192.key, AES_CTR_TestVector192.nonce);
    _cipherText = _AES_CTR.encrypt(AES_CTR_TestVector192.plainText);
    assert.deepEqual(_cipherText, AES_CTR_TestVector192.cipherText, "The encrypted text schould match with the test vector for a 192 bit key.");

    _AES_CTR = new TS.Security.AES_CTR(AES_CTR_TestVector256.key, AES_CTR_TestVector256.nonce);
    _cipherText = _AES_CTR.encrypt(AES_CTR_TestVector256.plainText);
    assert.deepEqual(_cipherText, AES_CTR_TestVector256.cipherText, "The encrypted text schould match with the test vector for a 256 bit key.");
  });


  QUnit.test("AES_CTR decrypt", (assert) =>
  {
    var _AES_CTR: TS.Security.AES_CTR;
    var _plainText: Array<number>;

    _AES_CTR = new TS.Security.AES_CTR(AES_CTR_TestVector128.key, AES_CTR_TestVector128.nonce);
    _plainText = _AES_CTR.decrypt(AES_CTR_TestVector128.cipherText);
    assert.deepEqual(_plainText, AES_CTR_TestVector128.plainText, "The dencrypted text schould match with the test vector for a 128 bit key.");

    _AES_CTR = new TS.Security.AES_CTR(AES_CTR_TestVector192.key, AES_CTR_TestVector192.nonce);
    _plainText = _AES_CTR.decrypt(AES_CTR_TestVector192.cipherText);
    assert.deepEqual(_plainText, AES_CTR_TestVector192.plainText, "The dencrypted text schould match with the test vector for a 192 bit key.");

    _AES_CTR = new TS.Security.AES_CTR(AES_CTR_TestVector256.key, AES_CTR_TestVector256.nonce);
    _plainText = _AES_CTR.decrypt(AES_CTR_TestVector256.cipherText);
    assert.deepEqual(_plainText, AES_CTR_TestVector256.plainText, "The dencrypted text schould match with the test vector for a 256 bit key.");
  });


  QUnit.test("AES_CTR encrypt / decrypt with different plain text lengths", (assert) =>
  {
    var _index: number;
    var _plainData = "abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXY0123456789";
    var _plainSegment: string;
    var _plainReturn: string;
    var _cipherText: Array<number>;
    var _AES_CTR = new TS.Security.AES_CTR(AES_CTR_TestVector256.key, AES_CTR_TestVector256.nonce);


    for (_index = 1; _index < _plainData.length + 1; _index++)
    {
      _plainSegment = _plainData.substr(0, _index);
      _cipherText = _AES_CTR.encrypt(TS.Encoding.UTF.UTF16StringToUTF8Array(_plainSegment));
      _plainReturn = TS.Encoding.UTF.UTF8ArrayToUTF16String(_AES_CTR.decrypt(_cipherText));
      assert.equal(_plainReturn, _plainSegment, "The decrypted text should macht with the original plain text.");
    }//END for
  });


  QUnit.test("AES_CTR_Stream constructor", (assert) =>
  {
    var _onNextData: (bitString: string) => void;
    var _onClosed: () => void;
    var _onError: (exception: TS.Exception) => void;
    var _AES_CTR_Stream: TS.Security.AES_CTR_Stream;
    var _undefined;

    _onNextData = (bitString: string) => { };
    _onClosed = () => { };
    _onError = (exception: TS.Exception) => { };

    assert.throws(() =>
    {
      _AES_CTR_Stream = new TS.Security.AES_CTR_Stream(null, 0, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
      TS.ArgumentNullUndefOrEmptyException
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for a call with a null 'keyByteArray' arguments.");

    assert.throws(() =>
    {
      _AES_CTR_Stream = new TS.Security.AES_CTR_Stream(_undefined, 0, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
      TS.ArgumentNullUndefOrEmptyException
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for a call with a undefined 'keyByteArray' arguments.");

    assert.throws(() =>
    {
      _AES_CTR_Stream = new TS.Security.AES_CTR_Stream([], 0, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
      TS.ArgumentNullUndefOrEmptyException
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for a call with an empty 'keyByteArray' arguments.");

    assert.throws(() =>
    {
      _AES_CTR_Stream = new TS.Security.AES_CTR_Stream([1, 2, 3], 0, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of elements.");

    assert.throws(() =>
    {
      _AES_CTR_Stream = new TS.Security.AES_CTR_Stream(numberArray16, 0, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a call with a 'keyByteArray' which is not an array of unsigned byte values.");

    assert.throws(() =>
    {
      _AES_CTR_Stream = new TS.Security.AES_CTR_Stream(unsignedByteValueArray16, -1, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a 'counterValue' argument which is not a positive integer.");

    assert.throws(() =>
    {
      _AES_CTR_Stream = new TS.Security.AES_CTR_Stream(unsignedByteValueArray16, 2.5, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a 'counterValue' argument which is not a positive integer.");

    assert.throws(() =>
    {
      _AES_CTR_Stream = new TS.Security.AES_CTR_Stream(unsignedByteValueArray16, 0xFFFFFFFF + 1, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a 'counterValue' argument which is out of range.");

    assert.throws(() =>
    {
      _AES_CTR_Stream = new TS.Security.AES_CTR_Stream(unsignedByteValueArray16, numberArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a call with a 'nonce' which is not an array of unsigned byte values.");

    assert.throws(() =>
    {
      _AES_CTR_Stream = new TS.Security.AES_CTR_Stream(unsignedByteValueArray16, unsignedByteValueArray16.slice(0, 15), TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'nonce' with an invalid number of elements.");





    assert.throws(() =>
    {
      _AES_CTR_Stream = new TS.Security.AES_CTR_Stream(unsignedByteValueArray16, unsignedByteValueArray16, null, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'cipherOperation' argument.");

    assert.throws(() =>
    {
      _AES_CTR_Stream = new TS.Security.AES_CTR_Stream(unsignedByteValueArray16, unsignedByteValueArray16, _undefined, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'cipherOperation' argument.");

    assert.throws(() =>
    {
      _AES_CTR_Stream = new TS.Security.AES_CTR_Stream(unsignedByteValueArray16, unsignedByteValueArray16, -1, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a call with an invalid value for the 'cipherOperation' argument.");

    assert.throws(() =>
    {
      _AES_CTR_Stream = new TS.Security.AES_CTR_Stream(unsignedByteValueArray16, unsignedByteValueArray16, 2, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a call with an invalid value for the 'cipherOperation' argument.");

    assert.throws(() =>
    {
      _AES_CTR_Stream = new TS.Security.AES_CTR_Stream(unsignedByteValueArray16, unsignedByteValueArray16, 0.75, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a call with an invalid value for the 'cipherOperation' argument.");

    assert.throws(() =>
    {
      _AES_CTR_Stream = new TS.Security.AES_CTR_Stream(unsignedByteValueArray16, unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, null, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'onNextData' argument.");

    assert.throws(() =>
    {
      _AES_CTR_Stream = new TS.Security.AES_CTR_Stream(unsignedByteValueArray16, unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _undefined, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'onNextData' argument.");

    assert.throws(() =>
    {
      _AES_CTR_Stream = new TS.Security.AES_CTR_Stream(unsignedByteValueArray16, unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, null, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'onClosed' argument.");

    assert.throws(() =>
    {
      _AES_CTR_Stream = new TS.Security.AES_CTR_Stream(unsignedByteValueArray16, unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _undefined, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'onClosed' argument.");

    assert.throws(() =>
    {
      _AES_CTR_Stream = new TS.Security.AES_CTR_Stream(unsignedByteValueArray16, unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'onError' argument.");

    assert.throws(() =>
    {
      _AES_CTR_Stream = new TS.Security.AES_CTR_Stream(unsignedByteValueArray16, unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'onError' argument.");






    _AES_CTR_Stream = new TS.Security.AES_CTR_Stream(unsignedByteValueArray16, 0, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    assert.ok(TS.Utils.Assert.isObject(_AES_CTR_Stream), "Should pass for a call with a valid 'keyByteArray' and 'counterValue' argument.");

    _AES_CTR_Stream = new TS.Security.AES_CTR_Stream(unsignedByteValueArray16, unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    assert.ok(TS.Utils.Assert.isObject(_AES_CTR_Stream), "Should pass for a call with a valid 'keyByteArray' and 'nonce' argument.");
  });

  QUnit.test("AES_CTR_Stream write (async stream encrypt)", (assert) =>
  {
    var _AES_CTR_Stream128: TS.Security.AES_CTR_Stream;
    var _AES_CTR_Stream192: TS.Security.AES_CTR_Stream;
    var _AES_CTR_Stream256: TS.Security.AES_CTR_Stream;
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

    _AES_CTR_Stream128 = new TS.Security.AES_CTR_Stream(AES_CTR_TestVector128.key, AES_CTR_TestVector128.nonce, TS.Security.CipherOperationEnum.ENCRYPT,
      /*onSegmentComplete*/
      (binaryString: string) =>
      {
        _cipherText128 += binaryString;
      },
      /*onClosed*/
      () =>
      {
        assert.equal(_cipherText128, TS.Utils.byteArrayToBitString(AES_CTR_TestVector128.cipherText), "The encrypted text schould match with the test vector for a 128 bit key.");
        _asyncDone128();
      },
      /*onError*/
      (exception: TS.Exception) =>
      {
        throw exception;
        _asyncDone128();
      }
      );
    _AES_CTR_Stream128.writeByteArray(AES_CTR_TestVector128.plainText);
    _AES_CTR_Stream128.close();

    //****************//
    // 192 Bit Key    //
    //****************//

    _asyncDone192 = assert.async();
    _cipherText192 = "";

    _AES_CTR_Stream192 = new TS.Security.AES_CTR_Stream(AES_CTR_TestVector192.key, AES_CTR_TestVector192.nonce, TS.Security.CipherOperationEnum.ENCRYPT,
      /*onSegmentComplete*/
      (binaryString: string) =>
      {
        _cipherText192 += binaryString;
      },
      /*onClosed*/
      () =>
      {
        assert.equal(_cipherText192, TS.Utils.byteArrayToBitString(AES_CTR_TestVector192.cipherText), "The encrypted text schould match with the test vector for a 192 bit key.");
        _asyncDone192();
      },
      /*onError*/
      (exception: TS.Exception) =>
      {
        throw exception;
        _asyncDone192();
      }
      );
    _AES_CTR_Stream192.writeByteArray(AES_CTR_TestVector192.plainText);
    _AES_CTR_Stream192.close();

    //****************//
    // 256 Bit Key    //
    //****************//

    _asyncDone256 = assert.async();
    _cipherText256 = "";

    _AES_CTR_Stream256 = new TS.Security.AES_CTR_Stream(AES_CTR_TestVector256.key, AES_CTR_TestVector256.nonce, TS.Security.CipherOperationEnum.ENCRYPT,
      /*onSegmentComplete*/
      (binaryString: string) =>
      {
        _cipherText256 += binaryString;
      },
      /*onClosed*/
      () =>
      {
        assert.equal(_cipherText256, TS.Utils.byteArrayToBitString(AES_CTR_TestVector256.cipherText), "The encrypted text schould match with the test vector for a 256 bit key.");
        _asyncDone256();
      },
      /*onError*/
      (exception: TS.Exception) =>
      {
        throw exception;
        _asyncDone256();
      }
      );
    _AES_CTR_Stream256.writeByteArray(AES_CTR_TestVector256.plainText);
    _AES_CTR_Stream256.close();
  });


  QUnit.test("AES_CTR_Stream write (async stream decrypt)", (assert) =>
  {
    var _AES_CTR_Stream128: TS.Security.AES_CTR_Stream;
    var _AES_CTR_Stream192: TS.Security.AES_CTR_Stream;
    var _AES_CTR_Stream256: TS.Security.AES_CTR_Stream;
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

    _AES_CTR_Stream128 = new TS.Security.AES_CTR_Stream(AES_CTR_TestVector128.key, AES_CTR_TestVector128.nonce, TS.Security.CipherOperationEnum.DECRYPT,
      /*onSegmentComplete*/
      (binaryString: string) =>
      {
        _plainText128 += binaryString;
      },
      /*onClosed*/
      () =>
      {
        assert.equal(_plainText128, TS.Utils.byteArrayToBitString(AES_CTR_TestVector128.plainText), "The decrypted text schould match with the test vector for a 128 bit key.");
        _asyncDone128();
      },
      /*onError*/
      (exception: TS.Exception) =>
      {
        throw exception;
        _asyncDone128();
      }
      );
    _AES_CTR_Stream128.writeByteArray(AES_CTR_TestVector128.cipherText);
    _AES_CTR_Stream128.close();

    //****************//
    // 192 Bit Key    //
    //****************//

    _asyncDone192 = assert.async();
    _plainText192 = "";

    _AES_CTR_Stream192 = new TS.Security.AES_CTR_Stream(AES_CTR_TestVector192.key, AES_CTR_TestVector192.nonce, TS.Security.CipherOperationEnum.DECRYPT,
      /*onSegmentComplete*/
      (binaryString: string) =>
      {
        _plainText192 += binaryString;
      },
      /*onClosed*/
      () =>
      {
        assert.equal(_plainText192, TS.Utils.byteArrayToBitString(AES_CTR_TestVector192.plainText), "The decrypted text schould match with the test vector for a 192 bit key.");
        _asyncDone192();
      },
      /*onError*/
      (exception: TS.Exception) =>
      {
        throw exception;
        _asyncDone192();
      }
      );
    _AES_CTR_Stream192.writeByteArray(AES_CTR_TestVector192.cipherText);
    _AES_CTR_Stream192.close();

    //****************//
    // 256 Bit Key    //
    //****************//

    _asyncDone256 = assert.async();
    _plainText256 = "";

    _AES_CTR_Stream256 = new TS.Security.AES_CTR_Stream(AES_CTR_TestVector256.key, AES_CTR_TestVector256.nonce, TS.Security.CipherOperationEnum.ENCRYPT,
      /*onSegmentComplete*/
      (binaryString: string) =>
      {
        _plainText256 += binaryString;
      },
      /*onClosed*/
      () =>
      {
        assert.equal(_plainText256, TS.Utils.byteArrayToBitString(AES_CTR_TestVector256.plainText), "The decrypted text schould match with the test vector for a 256 bit key.");
        _asyncDone256();
      },
      /*onError*/
      (exception: TS.Exception) =>
      {
        throw exception;
        _asyncDone256();
      }
      );
    _AES_CTR_Stream256.writeByteArray(AES_CTR_TestVector256.cipherText);
    _AES_CTR_Stream256.close();

  });


  QUnit.test("AES_CTR_Stream write (encrypt / decrypt with different plain text lengths)", (assert) =>
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
      var _AES_CTR_Stream256_encrypt: TS.Security.AES_OFB_Stream;

      _cipherBitString = "";
      _AES_CTR_Stream256_encrypt = new TS.Security.AES_OFB_Stream(AES_CTR_TestVector256.key, AES_CTR_TestVector256.nonce, TS.Security.CipherOperationEnum.ENCRYPT,
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
      _AES_CTR_Stream256_encrypt.writeBitString(bitString);
      _AES_CTR_Stream256_encrypt.close();
    }


    function decrypt(bitString: string, sourceString: string, done: (bitString: string, sourceString: string) => void): void
    {
      var _plainBitString: string;
      var _AES_CTR_Stream256_decrypt: TS.Security.AES_OFB_Stream;

      _plainBitString = "";
      _AES_CTR_Stream256_decrypt = new TS.Security.AES_OFB_Stream(AES_CTR_TestVector256.key, AES_CTR_TestVector256.nonce, TS.Security.CipherOperationEnum.DECRYPT,
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
      _AES_CTR_Stream256_decrypt.writeBitString(bitString);
      _AES_CTR_Stream256_decrypt.close();
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