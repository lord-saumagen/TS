"use strict";
var TS_Security_test;
(function (TS_Security_test) {
  var AES_CFB_TestVector128_1BIT;
  var AES_CFB_TestVector192_1BIT;
  var AES_CFB_TestVector256_1BIT;
  var AES_CFB_TestVector128_8BIT;
  var AES_CFB_TestVector192_8BIT;
  var AES_CFB_TestVector256_8BIT;
  var numberArray16;
  var unsignedByteValueArray16;
  var unsignedByteValueArray33;
  QUnit.module("TS.Security.AES_CFB (plain js)", {
    setupOnce: function () {
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
    setup: function () {
      // prepare something for all following tests
    },
    teardown: function () {
      // clean up after each test
    },
    teardownOnce: function () {
      // runs once after all unit tests finished (including teardown)
    }
  });

  QUnit.test("AES_CFB constructor (plain js)", function (assert)
  {
    var _AES_CFB;

    assert.throws(function ()
    {
      TS.Security.AES_CFB();
    }, function (err)
    {
      return (err.name == "TS.InvalidOperationException") ? true : false;
    }, "Shoud throw a 'TS.InvalidOperationException' for a call without the new operator.");

    assert.throws(function ()
    {
      _AES_CFB = new TS.Security.AES_CFB({}, unsignedByteValueArray16, 8);
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for a call with an invalid value for the 'keyByteArray' argument.");

    assert.throws(function ()
    {
      _AES_CFB = new TS.Security.AES_CFB(unsignedByteValueArray16, {}, 8);
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for a call with an invalid value for the 'initialisationVector' argument.");

    assert.throws(function ()
    {
      _AES_CFB = new TS.Security.AES_CFB(unsignedByteValueArray16, unsignedByteValueArray16, "test");
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for a call with an invalid value for the 'segmentSizeInBit' argument.");
  });


  QUnit.test("AES_CFB_Stream constructor (plain js)", function (assert)
  {
    var _AES_CFB_Stream;
    var _onNextData = function (bitString) { };
    var _onClosed = function () { };
    var _onError = function (exception) { };

    assert.throws(function ()
    {
      TS.Security.AES_CFB_Stream();
    }, function (err)
    {
      return (err.name == "TS.InvalidOperationException") ? true : false;
    }, "Shoud throw a 'TS.InvalidOperationException' for a call without the new operator.");

    assert.throws(function ()
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream({}, unsignedByteValueArray16, 8, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for a call with an invalid value for the 'keyByteArray' argument.");

    assert.throws(function ()
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(unsignedByteValueArray16, {}, 8, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for a call with an invalid value for the 'initialisationVector' argument.");

    assert.throws(function ()
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(unsignedByteValueArray16, unsignedByteValueArray16, "test" , TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for a call with an invalid value for the 'segmentSizeInBit' argument.");

    assert.throws(function ()
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(unsignedByteValueArray16, unsignedByteValueArray16, 8, {}, _onNextData, _onClosed, _onError);
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for a call with an invalid value for the 'cipherOperation' argument.");

    assert.throws(function ()
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(unsignedByteValueArray16, unsignedByteValueArray16, 8, TS.Security.CipherOperationEnum.ENCRYPT, "test", _onClosed, _onError);
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for a call with an invalid value for the 'onNextData' argument.");

    assert.throws(function ()
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(unsignedByteValueArray16, unsignedByteValueArray16, 8, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, "test", _onError);
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for a call with an invalid value for the 'onClosed' argument.");

    assert.throws(function ()
    {
      _AES_CFB_Stream = new TS.Security.AES_CFB_Stream(unsignedByteValueArray16, unsignedByteValueArray16, 8, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, "test");
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for a call with an invalid value for the 'onError' argument.");
  });

})(TS_Security_test || (TS_Security_test = {})); //END module 