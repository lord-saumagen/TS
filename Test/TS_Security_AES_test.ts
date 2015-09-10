"use strict";

module TS_Security_test
{
  var AES_TestVector128;
  var AES_TestVector192;
  var AES_TestVector256;
  var numberArray16: Array<number>;
  var unsignedByteValueArray16: Array<number>;
  var unsignedByteValueArray33: Array<number>;

  QUnit.module("TS.Security.AES",
    {
      setupOnce: function ()
      {

        AES_TestVector128 = {
          plainText: [0x00, 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88, 0x99, 0xaa, 0xbb, 0xcc, 0xdd, 0xee, 0xff],
          key: [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f],
          cipherText: [0x69, 0xc4, 0xe0, 0xd8, 0x6a, 0x7b, 0x04, 0x30, 0xd8, 0xcd, 0xb7, 0x80, 0x70, 0xb4, 0xc5, 0x5a]
        };

        AES_TestVector192 = {
          plainText: [0x00, 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88, 0x99, 0xaa, 0xbb, 0xcc, 0xdd, 0xee, 0xff],
          key: [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17],
          cipherText: [0xdd, 0xa9, 0x7c, 0xa4, 0x86, 0x4c, 0xdf, 0xe0, 0x6e, 0xaf, 0x70, 0xa0, 0xec, 0x0d, 0x71, 0x91]
        };

        AES_TestVector256 = {
          plainText: [0x00, 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88, 0x99, 0xaa, 0xbb, 0xcc, 0xdd, 0xee, 0xff],
          key: [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f],
          cipherText: [0x8e, 0xa2, 0xb7, 0xca, 0x51, 0x67, 0x45, 0xbf, 0xea, 0xfc, 0x49, 0x90, 0x4b, 0x49, 0x60, 0x89]
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



  QUnit.test("AES constructor", (assert) =>
  {
    var _AES;
    var _undefined;

    assert.throws(() =>
    {
      _AES = new TS.Security.AES(null);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for a null 'keyByteArray' argument.");

    assert.throws(() =>
    {
      _AES = new TS.Security.AES(_undefined);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for an undefined 'keyByteArray' argument.");

    assert.throws(() =>
    {
      _AES = new TS.Security.AES([]);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for an empty 'keyByteArray' argument.");

    assert.throws(() =>
    {
      _AES = new TS.Security.AES(numberArray16);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a call with a 'keyByteArray' which is not an unsigned byte value array.");
    
    assert.throws(() =>
    {
      _AES = new TS.Security.AES([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES = new TS.Security.AES([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES = new TS.Security.AES([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES = new TS.Security.AES([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES = new TS.Security.AES([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    assert.throws(() =>
    {
      _AES = new TS.Security.AES([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33]);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a call with a 'keyByteArray' with an invalid number of arguments.");

    _AES = new TS.Security.AES([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
    assert.ok(TS.Utils.Assert.isObject(_AES), "Should pass for a call with valid arguments.");
  });


  QUnit.test("AES encrypte", (assert) =>
  {
    var _AES: TS.Security.AES;
    var _cipherText;


    _AES = new TS.Security.AES(AES_TestVector128.key);
    _cipherText = _AES.encrypt(AES_TestVector128.plainText);
    assert.deepEqual(_cipherText, AES_TestVector128.cipherText, "The encrypted text schould match with the test vector for a 128 bit key.");

    _AES = new TS.Security.AES(AES_TestVector192.key);
    _cipherText = _AES.encrypt(AES_TestVector192.plainText);
    assert.deepEqual(_cipherText, AES_TestVector192.cipherText, "The encrypted text schould match with the test vector for a 192 bit key.");

    _AES = new TS.Security.AES(AES_TestVector256.key);
    _cipherText = _AES.encrypt(AES_TestVector256.plainText);
    assert.deepEqual(_cipherText, AES_TestVector256.cipherText, "The encrypted text schould match with the test vector for a 256 bit key.");
  });


  QUnit.test("AES decrypt", (assert) =>
  {
    var _AES;
    var _plainText;

    _AES = new TS.Security.AES(AES_TestVector128.key);
    _plainText = _AES.decrypt(AES_TestVector128.cipherText);
    assert.deepEqual(_plainText, AES_TestVector128.plainText, "The decrypted text schould match with the test vector for a 128 bit key.");

    _AES = new TS.Security.AES(AES_TestVector192.key);
    _plainText = _AES.decrypt(AES_TestVector192.cipherText);
    assert.deepEqual(_plainText, AES_TestVector192.plainText, "The encrypted text schould match with the test vector for a 192 bit key.");

    _AES = new TS.Security.AES(AES_TestVector256.key);
    _plainText = _AES.decrypt(AES_TestVector256.cipherText);
    assert.deepEqual(_plainText, AES_TestVector256.plainText, "The decrypted text schould match with the test vector for a 256 bit key.");
  });


  QUnit.test("AES_Stream constructor", (assert) =>
  {
    var _AES_Stream: TS.Security.AES_Stream;
    var _undefined;

    var _onNextData: (bitString: string) => void;
    var _onClosed: () => void;
    var _onError: (exception: TS.Exception) => void;

    _onNextData = (bitString: string) => { };
    _onClosed = () => { };
    _onError = (exception: TS.Exception) => { };

    assert.throws(() =>
    {
      _AES_Stream = new TS.Security.AES_Stream(null, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for a null 'keyByteArray' argument.");

    assert.throws(() =>
    {
      _AES_Stream = new TS.Security.AES_Stream(undefined, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for a undefined 'keyByteArray' argument.");

    assert.throws(() =>
    {
      _AES_Stream = new TS.Security.AES_Stream([], TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for an empty 'keyByteArray' argument.");

    assert.throws(() =>
    {
      _AES_Stream = new TS.Security.AES_Stream(numberArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a call with a 'keyByteArray' which is not an unsigned byte value array.");
    
    assert.throws(() =>
    {
      _AES_Stream = new TS.Security.AES_Stream(unsignedByteValueArray16, 4, _onNextData, _onClosed, _onError);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for an invalid 'cipherOperation' argument.");
    
    assert.throws(() =>
    {
      _AES_Stream = new TS.Security.AES_Stream(unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, null, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'onData' argument.");

    assert.throws(() =>
    {
      _AES_Stream = new TS.Security.AES_Stream(unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _undefined, _onClosed, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a undefined 'onData' argument.");

    assert.throws(() =>
    {
      _AES_Stream = new TS.Security.AES_Stream(unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, null, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'onClose' argument.");

    assert.throws(() =>
    {
      _AES_Stream = new TS.Security.AES_Stream(unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _undefined, _onError);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a undefined 'onClose' argument.");

    assert.throws(() =>
    {
      _AES_Stream = new TS.Security.AES_Stream(unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'onError' argument.");

    assert.throws(() =>
    {
      _AES_Stream = new TS.Security.AES_Stream(unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a undefined 'onError' argument.");

    _AES_Stream = new TS.Security.AES_Stream(unsignedByteValueArray16, TS.Security.CipherOperationEnum.ENCRYPT, _onNextData, _onClosed, _onError);
    assert.ok(TS.Utils.Assert.isObject(_AES_Stream), "Should pass for a call with valid arguments.");

  });


  QUnit.test("AES_Stream write (async stream encrypt)", (assert) =>
  {
    var _AES_Stream128: TS.Security.AES_Stream;
    var _AES_Stream192: TS.Security.AES_Stream;
    var _AES_Stream256: TS.Security.AES_Stream;
    var _AES_StreamFail: TS.Security.AES_Stream;
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

    _AES_Stream128 = new TS.Security.AES_Stream(AES_TestVector128.key, TS.Security.CipherOperationEnum.ENCRYPT,
      //onData
      (data) =>
      {
        _cipherText128 = _cipherText128.concat(TS.Utils.bitStringToByteArray(data));
      },
      //onClose
      () =>
      {
        assert.deepEqual(_cipherText128, AES_TestVector128.cipherText, "The encrypted text schould match with the test vector for a 128 bit key.");
        _asyncDone128();
      },
      //onError
      (exception) =>
      {
        throw exception;
        _asyncDone128();
      });

    _AES_Stream128.writeByteArray(AES_TestVector128.plainText);
    _AES_Stream128.close();

    //****************//
    // 192 Bit Key    //
    //****************//
    _cipherText192 = new Array<number>();
    _asyncDone192 = assert.async();

    _AES_Stream192 = new TS.Security.AES_Stream(AES_TestVector192.key, TS.Security.CipherOperationEnum.ENCRYPT,
      //onData
      (data) =>
      {
        _cipherText192 = _cipherText192.concat(TS.Utils.bitStringToByteArray(data));
      },
      //onClose
      () =>
      {
        assert.deepEqual(_cipherText192, AES_TestVector192.cipherText, "The encrypted text schould match with the test vector for a 192 bit key.");
        _asyncDone192();
      },
      //onError
      (exception) =>
      {
        throw exception;
        _asyncDone192();
      });

    _AES_Stream192.writeByteArray(AES_TestVector192.plainText);
    _AES_Stream192.close();

    //****************//
    // 256 Bit Key    //
    //****************//
    _cipherText256 = new Array<number>();
    _asyncDone256 = assert.async();

    _AES_Stream256 = new TS.Security.AES_Stream(AES_TestVector256.key, TS.Security.CipherOperationEnum.ENCRYPT,
      //onData
      (data) =>
      {
        _cipherText256 = _cipherText256.concat(TS.Utils.bitStringToByteArray(data));
      },
      //onClose
      () =>
      {
        assert.deepEqual(_cipherText256, AES_TestVector256.cipherText, "The encrypted text schould match with the test vector for a 256 bit key.");
        _asyncDone256();
      },
      //onError
      (exception) =>
      {
        throw exception;
        _asyncDone256();
      });

    _AES_Stream256.writeByteArray(AES_TestVector256.plainText);
    _AES_Stream256.close();

    //****************//
    // Fail           //
    //****************//
    _cipherTextFail = new Array<number>();
    _asyncDoneFail = assert.async();

    _AES_StreamFail = new TS.Security.AES_Stream(AES_TestVector256.key, TS.Security.CipherOperationEnum.ENCRYPT,
      //onData
      (data) =>
      {
        _cipherTextFail = _cipherTextFail.concat(TS.Utils.bitStringToByteArray(data));
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

    _AES_StreamFail.writeByteArray(AES_TestVector256.plainText);
    //Make sure that the stream data doesn't fit into a 128 bit block.
    _AES_StreamFail.writeByteArray([0, 0, 0]);
    _AES_StreamFail.close();

  });


  QUnit.test("AES_Stream write (async stream decrypt)", (assert) =>
  {
    var _AES_Stream128: TS.Security.AES_Stream;
    var _AES_Stream192: TS.Security.AES_Stream;
    var _AES_Stream256: TS.Security.AES_Stream;
    var _AES_StreamFail: TS.Security.AES_Stream;
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

    _AES_Stream128 = new TS.Security.AES_Stream(AES_TestVector128.key, TS.Security.CipherOperationEnum.DECRYPT,
      //onData
      (data) =>
      {
        _plainText128 = _plainText128.concat(TS.Utils.bitStringToByteArray(data));
      },
      //onClose
      () =>
      {
        assert.deepEqual(_plainText128, AES_TestVector128.plainText, "The decrypted text schould match with the test vector for a 128 bit key.");
        _asyncDone128();
      },
      //onError
      (exception) =>
      {
        throw exception;
        _asyncDone128();
      });

    _AES_Stream128.writeByteArray(AES_TestVector128.cipherText);
    _AES_Stream128.close();

    //****************//
    // 192 Bit Key    //
    //****************//
    _plainText192 = new Array<number>();
    _asyncDone192 = assert.async();

    _AES_Stream192 = new TS.Security.AES_Stream(AES_TestVector192.key, TS.Security.CipherOperationEnum.DECRYPT,
      //onData
      (data) =>
      {
        _plainText192 = _plainText192.concat(TS.Utils.bitStringToByteArray(data));
      },
      //onClose
      () =>
      {
        assert.deepEqual(_plainText192, AES_TestVector192.plainText, "The decrypted text schould match with the test vector for a 192 bit key.");
        _asyncDone192();
      },
      //onError
      (exception) =>
      {
        throw exception;
        _asyncDone192();
      });

    _AES_Stream192.writeByteArray(AES_TestVector192.cipherText);
    _AES_Stream192.close();

    //****************//
    // 256 Bit Key    //
    //****************//
    _plainText256 = new Array<number>();
    _asyncDone256 = assert.async();

    _AES_Stream256 = new TS.Security.AES_Stream(AES_TestVector256.key, TS.Security.CipherOperationEnum.DECRYPT,
      //onData
      (data) =>
      {
        _plainText256 = _plainText256.concat(TS.Utils.bitStringToByteArray(data));
      },
      //onClose
      () =>
      {
        assert.deepEqual(_plainText256, AES_TestVector256.plainText, "The decrypted text schould match with the test vector for a 256 bit key.");
        _asyncDone256();
      },
      //onError
      (exception) =>
      {
        throw exception;
        _asyncDone256();
      });

    _AES_Stream256.writeByteArray(AES_TestVector256.cipherText);
    _AES_Stream256.close();

    //****************//
    // Fail           //
    //****************//
    _plainTextFail = new Array<number>();
    _asyncDoneFail = assert.async();

    _AES_StreamFail = new TS.Security.AES_Stream(AES_TestVector256.key, TS.Security.CipherOperationEnum.DECRYPT,
      //onData
      (data) =>
      {
        _plainTextFail = _plainTextFail.concat(TS.Utils.bitStringToByteArray(data));
      },
      //onClose
      () =>
      {
        throw new TS.Exception("Unexpected result. Stream cipher should fail because of a data feed which doesn't match the block length required of the underlying cipher object.");
        _asyncDoneFail();
      },
      //onError
      (exception: TS.Exception) =>
      {
        assert.ok(exception.type == "TS.InvalidOperationException", "Should fail because of an unappropriate data length for the underlying cipher object.");
        _asyncDoneFail();
      });

    _AES_StreamFail.writeByteArray(AES_TestVector256.cipherText);
    //Make sure that the stream data doesn't fit into a 128 bit block.
    _AES_StreamFail.writeByteArray([0, 0, 0]);
    _AES_StreamFail.close();

  });

}//END module 