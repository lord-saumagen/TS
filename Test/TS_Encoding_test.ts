/// <reference path="../scripts/qunit.d.ts" />
/// <reference path="../scripts/jquery.d.ts" />
/// <reference path="../encoding/base64.ts" />
/// <reference path="../encoding/html.ts" />

"use strict";

module TS_Encoding_test
{

  QUnit.module("TS.Encoding",
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


  QUnit.test("Base64.decode", (assert) =>
  {
    var _result;
    var _undefined;

    assert.equal(TS.Encoding.Base64.decode(getShortTestStringEncoded()), getShortTestString(), "Should return a decoded string that matches with the plain text.");
    assert.equal(TS.Encoding.Base64.decode(getTestStringEncoded()), getTestString(), "Should return a decoded string that matches with the plain text.");
    assert.equal(TS.Encoding.Base64.decode(getLoremIpsumEncoded()), getLoremIpsum(), "Should return a decoded string that matches with the plain text.");
    assert.equal(TS.Encoding.Base64.decode(getSVGEncoded()), getSVG(), "Should return a decoded string that matches with the plain text.");
    assert.equal(TS.Encoding.Base64.decode(getLoremIpsumEncodeWithFixedLineLength(76)), getLoremIpsum(), "Should return a decoded string that matches with the plain text.");
    assert.equal(TS.Encoding.Base64.decode(getLoremIpsumEncodeWithFixedLineLength(76) + "\t\t\r\n "), getLoremIpsum(), "Should return a decoded string that matches with the plain text.");
    assert.equal(TS.Encoding.Base64.decode(getLoremIpsumEncodeWithFixedLineLength(76).replace("=", "")), getLoremIpsum(), "Should return a decoded string that matches with the plain text.");

    assert.equal(TS.Encoding.Base64.decode(null), "", "Should return an empty string if called with a null argument.");
    assert.equal(TS.Encoding.Base64.decode(null), "", "Should return an empty string if called with an undefined argument.");

    assert.throws(() =>
    {
      _result = TS.Encoding.Base64.decode(getLoremIpsumEncoded().replace(/0/gm, "@"));
    }, (err) => ((err.name == "TS.InvalidFormatException") ? true : false), "Should throw a 'TS.InvalidFormatException' for an invalid data string.");

    assert.throws(() =>
    {
      _result = TS.Encoding.Base64.decode(" ");
    }, (err) => ((err.name == "TS.ArgumentNullUndefOrEmptyException") ? true : false), "Should throw a 'TS.ArgumentNullUndefOrEmptyException' for a whitespace data string.");

    var _resultCut = TS.Encoding.Base64.decode(getLoremIpsumEncoded().slice(0, 498));

  });


  QUnit.test("Base64.encode", (assert) =>
  {
    var _undefined;
    var _DifficultCharsEncoded1 = TS.Encoding.Base64.encode(getDifficultChars());
    var _DifficultCharsEncoded2 = getDifficultCharsEncoded();
    var _LoremIpsumEncoded1 = TS.Encoding.Base64.encode(getLoremIpsum());
    var _LoremIpusmEncoded2 = getLoremIpsumEncoded();
    var _ShortTestEncoded1 = TS.Encoding.Base64.encode(getShortTestString());
    var _ShortTestEncoded2 = getShortTestStringEncoded();
    var _TestEncoded1 = TS.Encoding.Base64.encode(getTestString());
    var _TestEncoded2 = getTestStringEncoded();
    var _SVGEncoded1 = TS.Encoding.Base64.encode(getSVG());
    var _SVGEncoded2 = getSVGEncoded();

    assert.equal(_DifficultCharsEncoded1, _DifficultCharsEncoded2, "Should return an encoded string that matches with the C# encoded data.");
    assert.equal(_LoremIpsumEncoded1, _LoremIpusmEncoded2, "Should return an encoded string that matches with the C# encoded data.");
    assert.equal(_ShortTestEncoded1, _ShortTestEncoded2, "Should return an encoded string that matches with the C# encoded data.");
    assert.equal(_TestEncoded1, _TestEncoded2, "Should return an encoded string that matches with the C# encoded data.");
    assert.equal(_SVGEncoded1, _SVGEncoded2, "Should return an encoded string that matches with the C# encoded data.");
    assert.equal(TS.Encoding.Base64.encode(""), "", "Should return an empty string if calle with an emtype string as 'data' argument.");
    assert.equal(TS.Encoding.Base64.encode(null), "", "Should return an empty string if calle with a null argument.");
    assert.equal(TS.Encoding.Base64.encode(_undefined), "", "Should return an empty string if calle with an undefined argument.");
  });


  QUnit.test("Base64.encodeURLCompliant", (assert) =>
  {
    var _difficultChars;
    var _b64EncodedDifficultChars;
    var _b64DecodedDifficultChars
    var _b64URLEncodedDifficultChars;
    var _b64URLDecodedDifficultChars;

    _b64URLEncodedDifficultChars = TS.Encoding.Base64.encodeURLCompliant(getDifficultChars());
    _b64EncodedDifficultChars = TS.Encoding.Base64.encode(getDifficultChars());
    _b64DecodedDifficultChars = TS.Encoding.Base64.decode(_b64EncodedDifficultChars);
    _b64URLDecodedDifficultChars = TS.Encoding.Base64.decode(_b64URLEncodedDifficultChars);

    assert.notEqual(_b64URLEncodedDifficultChars, _b64EncodedDifficultChars, "Should show that URL compliant encoding differs from normal encoding.");
    assert.equal(_b64URLDecodedDifficultChars, getDifficultChars(), "The decoded URL encoded string should match with the plain text.");
    assert.equal(_b64DecodedDifficultChars, getDifficultChars(), "The decoded normal encoded string should match with the plain text.");
  });


  QUnit.test("HTML encode / decode", (assert) =>
  {
    var _encodedString: string;
    var _decodedString: string;

    _encodedString = TS.Encoding.HTML.encode(getLoremIpsum());
    assert.notEqual(_encodedString, getLoremIpsum(), "Should return an encoded string which doesn't macht with the plain text.");

    _decodedString = TS.Encoding.HTML.decode(_encodedString);
    assert.equal(_decodedString, getLoremIpsum(), "Should return a decoded string that matches with the plain text.");

    _encodedString = TS.Encoding.HTML.encode(getDifficultChars());
    assert.notEqual(_encodedString, getDifficultChars(), "Should return an encoded string which doesn't macht with the plain text.");

    _decodedString = TS.Encoding.HTML.decode(_encodedString);
    assert.equal(_decodedString, getDifficultChars(), "Should return a decoded string that matches with the plain text.");

  });


  QUnit.test("UTF.UTF16StringToUTF8Array", (assert) =>
  {
    var _resultArray: Array<number>;
    var _expectedResultArray: Array<number>;

    _resultArray = TS.Encoding.UTF.UTF16StringToUTF8Array(getUTFTestString1());
    _expectedResultArray = getUTFTestString1ByteArray();
    assert.deepEqual(_resultArray, _expectedResultArray, "Should return a result array which matches with the control array.");

    _resultArray = TS.Encoding.UTF.UTF16StringToUTF8Array(getUTFTestString2());
    _expectedResultArray = getUTFTestString2ByteArray();
    assert.deepEqual(_resultArray, _expectedResultArray, "Should return a result array which matches with the control array.");

    _resultArray = TS.Encoding.UTF.UTF16StringToUTF8Array(getUTFTestString3());
    _expectedResultArray = getUTFTestString3ByteArray();
    assert.deepEqual(_resultArray, _expectedResultArray, "Should return a result array which matches with the control array.");

    _resultArray = TS.Encoding.UTF.UTF16StringToUTF8Array(getLoremIpsum());
    _expectedResultArray = getUTFLoremIpsumByteArray();
    assert.deepEqual(_resultArray, _expectedResultArray, "Should return a result array which matches with the control array.");

    _resultArray = TS.Encoding.UTF.UTF16StringToUTF8Array(getDifficultChars());
    _expectedResultArray = getUTFDifficultCharsByteArray();
    assert.deepEqual(_resultArray, _expectedResultArray, "Should return a result array which matches with the control array.");

  });


  QUnit.test("UTF.UTF8ArrayToUTF16String", (assert) => 
  {
    var _resultString: string;

    _resultString = TS.Encoding.UTF.UTF8ArrayToUTF16String(getUTFTestString1ByteArray());
    assert.equal(_resultString, getUTFTestString1(), "Should return a result string which matches with the control string.");

    _resultString = TS.Encoding.UTF.UTF8ArrayToUTF16String(getUTFTestString2ByteArray());
    assert.equal(_resultString, getUTFTestString2(), "Should return a result string which matches with the control string.");

    _resultString = TS.Encoding.UTF.UTF8ArrayToUTF16String(getUTFTestString3ByteArray());
    assert.equal(_resultString, getUTFTestString3(), "Should return a result string which matches with the control string.");

    _resultString = TS.Encoding.UTF.UTF8ArrayToUTF16String(getUTFLoremIpsumByteArray());
    assert.equal(_resultString, getLoremIpsum(), "Should return a result string which matches with the control string.");

    _resultString = TS.Encoding.UTF.UTF8ArrayToUTF16String(getUTFDifficultCharsByteArray());
    assert.equal(_resultString, getDifficultChars(), "Should return a result string which matches with the control string.");
  });


  function getShortTestString() : string
  {
    return "ABCabc123";
  }


  //
  //C# encoded date for the 'ShortTestString' string.
  //
  function getShortTestStringEncoded() : string
  {
    return "QUJDYWJjMTIz";
  }


  function getTestString() : string
  {
    return "This is a test string with more than 100 characters. That should result in a line break in the resulting encoded text by some encoders.";
  }


  //
  //C# encoded date for the 'TestString' string.
  //
  function getTestStringEncoded() : string
  {
    return "VGhpcyBpcyBhIHRlc3Qgc3RyaW5nIHdpdGggbW9yZSB0aGFuIDEwMCBjaGFyYWN0ZXJzLiBUaGF0IHNob3VsZCByZXN1bHQgaW4gYSBsaW5lIGJyZWFrIGluIHRoZSByZXN1bHRpbmcgZW5jb2RlZCB0ZXh0IGJ5IHNvbWUgZW5jb2RlcnMu";
  }


  function getSVG() : string
  {
    var _returnStr = "";
    _returnStr += "<?xml version = \"1.0\" encoding =\"utf-8\"?>\r\n";
    _returnStr += "<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\" >\r\n";
    _returnStr += "<svg xmlns = \"http://www.w3.org/2000/svg\" xmlns: xlink = \"http://www.w3.org/1999/xlink\" version = \"1.1\" height = \"24\" width = \"400\" >\r\n";
    _returnStr += "  <defs>\r\n";
    _returnStr += "    <pattern id = \"stripedback\" height = \"20\" width = \"20\" y = \"2\" patternUnits = \"userSpaceOnUse\" overflow = \"scroll\" >\r\n";
    _returnStr += "      <g transform = \"skewX(-20)\" >\r\n";
    _returnStr += "        <rect x = \"-10\" y = \"0\" width = \"10\" height = \"20\" stroke = \"none\" fill =\"#F2F2F2\"/>\r\n";
    _returnStr += "        <rect x = \"0\" y = \"0\" width = \"10\" height = \"20\" stroke = \"none\" fill =\"#E2E2E2\"/>\r\n";
    _returnStr += "        <rect x = \"10\" y = \"0\" width = \"10\" height = \"20\" stroke = \"none\" fill =\"#F2F2F2\"/>\r\n";
    _returnStr += "        <rect x = \"20\" y = \"0\" width = \"10\" height = \"20\" stroke = \"none\" fill =\"#E2E2E2\"/>\r\n";
    _returnStr += "      </g >\r\n";
    _returnStr += "    </pattern >\r\n";
    _returnStr += "\r\n";
    _returnStr += "    <rect id = \"innercut\" x = \"2\" y = \"1\" width = \"396\" height =\"22\"/>\r\n";
    _returnStr += "\r\n";
    _returnStr += "    <clipPath id = \"loadclip\">\r\n";
    _returnStr += "     <use xlink:href =\"#innercut\"/>\r\n";
    _returnStr += "    </clipPath >\r\n";
    _returnStr += "  </defs>\r\n";
    _returnStr += "\r\n";
    _returnStr += "  <rect width = \"400\" height = \"24\" x = \"0\" y = \"0\" style =\"stroke-width:2px;stroke:grey;\"/>  <!--Backing rect / frame-- >\r\n";
    _returnStr += "\r\n";
    _returnStr += "  <g clip - path = \"url(#loadclip)\">\r\n";
    _returnStr += "    <rect x = \"-18\" y = \"2\" width = \"516\" height = \"20\" style = \"stroke-width:0px;stroke:grey;\" fill = \"url(#stripedback)\">\r\n";
    _returnStr += "      <animateTransform\r\n";
    _returnStr += "        attributeType = \"XML\"\r\n";
    _returnStr += "        attributeName = \"transform\"\r\n";
    _returnStr += "        type = \"translate\"\r\n";
    _returnStr += "        from = \"20\" to = \"0\"\r\n";
    _returnStr += "        begin = \"0s\" dur = \"0.6s\"\r\n";
    _returnStr += "        repeatCount = \"indefinite\"\r\n";
    _returnStr += "        additive =\"sum\"/>\r\n";
    _returnStr += "    </rect>\r\n";
    _returnStr += "  </g>\r\n";
    _returnStr += "</svg>\r\n";
    return _returnStr;
  }


  function getUTFTestString1(): string
  {
    return "€ 中文 español English हिन्दी العربية português বাংলা русский 日本語 ਪੰਜਾਬੀ 한국어 தமிழ்";
  }


  function getUTFTestString1ByteArray(): Array<number>
  {
    return [
      226, 130, 172,    /* '€' */
      32,               /* ' ' */
      228, 184, 173,    /* '中' */       /* Chinese */
      230, 150, 135,    /* '文' */
      32,               /* ' ' */
      101,              /* 'e' */
      115,              /* 's' */
      112,              /* 'p' */
      97,               /* 'a' */
      195, 177,         /* 'ñ' */
      111,              /* 'o' */
      108,              /* 'l' */
      32,               /* ' ' */
      69,               /* 'E' */
      110,              /* 'n' */
      103,              /* 'g' */
      108,              /* 'l' */
      105,              /* 'i' */
      115,              /* 's' */
      104,              /* 'h' */
      32,               /* ' ' */
      224, 164, 185,    /* 'हिन्दी' */     /* Hindi */
      224, 164, 191,    /*  .  */
      224, 164, 168,    /*  .  */
      224, 165, 141,    /*  .  */
      224, 164, 166,    /*  .  */
      224, 165, 128,    /*  .  */
      32,               /* ' ' */
      216, 167,         /* 'العربية'*/  /* Arabic */
      217, 132,         /*  .  */
      216, 185,         /*  .  */
      216, 177,         /*  .  */
      216, 168,         /*  .  */
      217, 138,         /*  .  */
      216, 169,         /*  .  */
      32,               /* ' ' */
      112,              /* 'p' */
      111,              /* 'o' */
      114,              /* 'r' */
      116,              /* 't' */
      117,              /* 'u' */
      103,              /* 'g' */
      117,              /* 'u' */
      195, 170,         /* 'ê' */
      115,              /* 's' */
      32,               /* ' ' */
      224, 166, 172,    /* 'বাংলা' */     /* Bengali */
      224, 166, 190,    /*  .  */
      224, 166, 130,    /*  .  */
      224, 166, 178,    /*  .  */
      224, 166, 190,    /*  .  */
      32,               /* ' ' */
      209, 128,         /* 'р' */        /* Russian */
      209, 131,         /* 'у' */
      209, 129,         /* 'с' */
      209, 129,         /* 'с' */
      208, 186,         /* 'к' */
      208, 184,         /* 'и' */
      208, 185,         /* 'й' */
      32,               /* ' ' */
      230, 151, 165,    /* '日' */       /* Japanese */
      230, 156, 172,    /* '本' */
      232, 170, 158,    /* '語' */
      32,               /* ' ' */
      224, 168, 170,    /* 'ਪੰਜਾਬੀ' */    /* Punjabi */
      224, 169, 176,    /*  .  */
      224, 168, 156,    /*  .  */
      224, 168, 190,    /*  .  */
      224, 168, 172,    /*  .  */
      224, 169, 128,    /*  .  */
      32,               /* ' ' */
      237, 149, 156,    /* '한' */       /* Korean */
      234, 181, 173,    /* '국' */
      236, 150, 180,    /* '어' */
      32,               /* ' ' */
      224, 174, 164,    /* 'தமிழ்' */   /* Tamil */
      224, 174, 174,    /*  .  */
      224, 174, 191,    /*  .  */
      224, 174, 180,    /*  .  */
      224, 175, 141     /*  .  */
    ];
  }


  function getUTFTestString2(): string
  {
    return "𠜎 𠜱 𠝹 𠱓 𠱸 𠲖 𠳏 𠳕 𠴕 𠵼 𠵿 𠸎 𠸏 𠹷 𠺝 𠺢 𠻗 𠻹 𠻺 𠼭 𠼮 𠽌 𠾴 𠾼 𠿪 𡁜 𡁯 𡁵 𡁶 𡁻 𡃁 𡃉 𡇙 𢃇 𢞵 𢫕 𢭃 𢯊 𢱑 𢱕 𢳂 𢴈 𢵌 𢵧 𢺳 𣲷 𤓓 𤶸 𤷪 𥄫 𦉘 𦟌 𦧲 𦧺 𧨾 𨅝 𨈇 𨋢 𨳊 𨳍 𨳒 𩶘";
  }


  function getUTFTestString2ByteArray(): Array<number>
  {
    return [
      240, 160, 156, 142,
      32,
      240, 160, 156, 177,
      32,
      240, 160, 157, 185,
      32,
      240, 160, 177, 147,
      32,
      240, 160, 177, 184,
      32,
      240, 160, 178, 150,
      32,
      240, 160, 179, 143,
      32,
      240, 160, 179, 149,
      32,
      240, 160, 180, 149,
      32,
      240, 160, 181, 188,
      32,
      240, 160, 181, 191,
      32,
      240, 160, 184, 142,
      32,
      240, 160, 184, 143,
      32,
      240, 160, 185, 183,
      32,
      240, 160, 186, 157,
      32,
      240, 160, 186, 162,
      32,
      240, 160, 187, 151,
      32,
      240, 160, 187, 185,
      32,
      240, 160, 187, 186,
      32,
      240, 160, 188, 173,
      32,
      240, 160, 188, 174,
      32,
      240, 160, 189, 140,
      32,
      240, 160, 190, 180,
      32,
      240, 160, 190, 188,
      32,
      240, 160, 191, 170,
      32,
      240, 161, 129, 156,
      32,
      240, 161, 129, 175,
      32,
      240, 161, 129, 181,
      32,
      240, 161, 129, 182,
      32,
      240, 161, 129, 187,
      32,
      240, 161, 131, 129,
      32,
      240, 161, 131, 137,
      32,
      240, 161, 135, 153,
      32,
      240, 162, 131, 135,
      32,
      240, 162, 158, 181,
      32,
      240, 162, 171, 149,
      32,
      240, 162, 173, 131,
      32,
      240, 162, 175, 138,
      32,
      240, 162, 177, 145,
      32,
      240, 162, 177, 149,
      32,
      240, 162, 179, 130,
      32,
      240, 162, 180, 136,
      32,
      240, 162, 181, 140,
      32,
      240, 162, 181, 167,
      32,
      240, 162, 186, 179,
      32,
      240, 163, 178, 183,
      32,
      240, 164, 147, 147,
      32,
      240, 164, 182, 184,
      32,
      240, 164, 183, 170,
      32,
      240, 165, 132, 171,
      32,
      240, 166, 137, 152,
      32,
      240, 166, 159, 140,
      32,
      240, 166, 167, 178,
      32,
      240, 166, 167, 186,
      32,
      240, 167, 168, 190,
      32,
      240, 168, 133, 157,
      32,
      240, 168, 136, 135,
      32,
      240, 168, 139, 162,
      32,
      240, 168, 179, 138,
      32,
      240, 168, 179, 141,
      32,
      240, 168, 179, 146,
      32,
      240, 169, 182, 152
    ];
  }


  function getUTFTestString3(): string
  {
    return "THREE_OF_CIRCLES \uD83C\uDC1B FOUR_OF_CIRCLES \uD83C\uDC1C FIVE_OF_CIRCLES \uD83C\uDC1D SIX_OF_CIRCLES \uD83C\uDC1E SEVEN_OF_CIRCLES \uD83C\uDC1F";
  }


  function getUTFTestString3ByteArray(): Array<number>
  {
    return [
      84,
      72,
      82,
      69,
      69,
      95,
      79,
      70,
      95,
      67,
      73,
      82,
      67,
      76,
      69,
      83,
      32,
      240, 159, 128, 155,  /* THREE_OF_CIRCLES */
      32,
      70,
      79,
      85,
      82,
      95,
      79,
      70,
      95,
      67,
      73,
      82,
      67,
      76,
      69,
      83,
      32,
      240, 159, 128, 156,  /* FOUR_OF_CIRCLES */
      32,
      70,
      73,
      86,
      69,
      95,
      79,
      70,
      95,
      67,
      73,
      82,
      67,
      76,
      69,
      83,
      32,
      240, 159, 128, 157,  /* FIVE_OF_CIRCLES */
      32,
      83,
      73,
      88,
      95,
      79,
      70,
      95,
      67,
      73,
      82,
      67,
      76,
      69,
      83,
      32,
      240, 159, 128, 158,  /* SIX_OF_CIRCLES */
      32,
      83,
      69,
      86,
      69,
      78,
      95,
      79,
      70,
      95,
      67,
      73,
      82,
      67,
      76,
      69,
      83,
      32,
      240, 159, 128, 159  /* SEVEN_OF_CIRCLES */
    ];
  }


  //
  //C# encoded date for the 'SVG' string.
  //
  function getSVGEncoded() : string
  {
    return "PD94bWwgdmVyc2lvbiA9ICIxLjAiIGVuY29kaW5nID0idXRmLTgiPz4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCIgPg0KPHN2ZyB4bWxucyA9ICJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6IHhsaW5rID0gImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb24gPSAiMS4xIiBoZWlnaHQgPSAiMjQiIHdpZHRoID0gIjQwMCIgPg0KICA8ZGVmcz4NCiAgICA8cGF0dGVybiBpZCA9ICJzdHJpcGVkYmFjayIgaGVpZ2h0ID0gIjIwIiB3aWR0aCA9ICIyMCIgeSA9ICIyIiBwYXR0ZXJuVW5pdHMgPSAidXNlclNwYWNlT25Vc2UiIG92ZXJmbG93ID0gInNjcm9sbCIgPg0KICAgICAgPGcgdHJhbnNmb3JtID0gInNrZXdYKC0yMCkiID4NCiAgICAgICAgPHJlY3QgeCA9ICItMTAiIHkgPSAiMCIgd2lkdGggPSAiMTAiIGhlaWdodCA9ICIyMCIgc3Ryb2tlID0gIm5vbmUiIGZpbGwgPSIjRjJGMkYyIi8+DQogICAgICAgIDxyZWN0IHggPSAiMCIgeSA9ICIwIiB3aWR0aCA9ICIxMCIgaGVpZ2h0ID0gIjIwIiBzdHJva2UgPSAibm9uZSIgZmlsbCA9IiNFMkUyRTIiLz4NCiAgICAgICAgPHJlY3QgeCA9ICIxMCIgeSA9ICIwIiB3aWR0aCA9ICIxMCIgaGVpZ2h0ID0gIjIwIiBzdHJva2UgPSAibm9uZSIgZmlsbCA9IiNGMkYyRjIiLz4NCiAgICAgICAgPHJlY3QgeCA9ICIyMCIgeSA9ICIwIiB3aWR0aCA9ICIxMCIgaGVpZ2h0ID0gIjIwIiBzdHJva2UgPSAibm9uZSIgZmlsbCA9IiNFMkUyRTIiLz4NCiAgICAgIDwvZyA+DQogICAgPC9wYXR0ZXJuID4NCg0KICAgIDxyZWN0IGlkID0gImlubmVyY3V0IiB4ID0gIjIiIHkgPSAiMSIgd2lkdGggPSAiMzk2IiBoZWlnaHQgPSIyMiIvPg0KDQogICAgPGNsaXBQYXRoIGlkID0gImxvYWRjbGlwIj4NCiAgICAgPHVzZSB4bGluazpocmVmID0iI2lubmVyY3V0Ii8+DQogICAgPC9jbGlwUGF0aCA+DQogIDwvZGVmcz4NCg0KICA8cmVjdCB3aWR0aCA9ICI0MDAiIGhlaWdodCA9ICIyNCIgeCA9ICIwIiB5ID0gIjAiIHN0eWxlID0ic3Ryb2tlLXdpZHRoOjJweDtzdHJva2U6Z3JleTsiLz4gIDwhLS1CYWNraW5nIHJlY3QgLyBmcmFtZS0tID4NCg0KICA8ZyBjbGlwIC0gcGF0aCA9ICJ1cmwoI2xvYWRjbGlwKSI+DQogICAgPHJlY3QgeCA9ICItMTgiIHkgPSAiMiIgd2lkdGggPSAiNTE2IiBoZWlnaHQgPSAiMjAiIHN0eWxlID0gInN0cm9rZS13aWR0aDowcHg7c3Ryb2tlOmdyZXk7IiBmaWxsID0gInVybCgjc3RyaXBlZGJhY2spIj4NCiAgICAgIDxhbmltYXRlVHJhbnNmb3JtDQogICAgICAgIGF0dHJpYnV0ZVR5cGUgPSAiWE1MIg0KICAgICAgICBhdHRyaWJ1dGVOYW1lID0gInRyYW5zZm9ybSINCiAgICAgICAgdHlwZSA9ICJ0cmFuc2xhdGUiDQogICAgICAgIGZyb20gPSAiMjAiIHRvID0gIjAiDQogICAgICAgIGJlZ2luID0gIjBzIiBkdXIgPSAiMC42cyINCiAgICAgICAgcmVwZWF0Q291bnQgPSAiaW5kZWZpbml0ZSINCiAgICAgICAgYWRkaXRpdmUgPSJzdW0iLz4NCiAgICA8L3JlY3Q+DQogIDwvZz4NCjwvc3ZnPg0K";
  }


  //
  //C# encoded date for the 'LoremIpsum' string.
  //
  function getLoremIpsumEncoded() : string
  {
    return "TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4gUHJvaW4gaWQgdm9sdXRwYXQgc2FwaWVuLiBGdXNjZSBldCB2ZWxpdCBhIHRvcnRvciBmYXVjaWJ1cyBwb3J0dGl0b3IgaW4gZXUgZXJhdC4gTnVuYyBtb2xlc3RpZSBkdWkgY29uc2VjdGV0dXIgYXJjdSBzYWdpdHRpcywgc2l0IGFtZXQgc2VtcGVyIG1ldHVzIHRlbXB1cy4gVml2YW11cyBmcmluZ2lsbGEgZGlhbSBlZ2VzdGFzIG51bmMgZmV1Z2lhdCB2ZWhpY3VsYS4gRG9uZWMgYWMgZWxpdCBldCBlbGl0IHZ1bHB1dGF0ZSBmZXJtZW50dW0gZXQgYXQgZGlhbS4gTW9yYmkgdHJpc3RpcXVlIHF1YW0gYSB2ZW5lbmF0aXMgdGluY2lkdW50LiBDcmFzIGZyaW5naWxsYSBsYW9yZWV0IHVybmEgaWQgdWx0cmljaWVzLiBOYW0gdml0YWUgbWFzc2Egb3JuYXJlLCBsYWNpbmlhIG5pYmggaWQsIHBoYXJldHJhIGxpZ3VsYS4gTnVuYyBwcmV0aXVtIHZvbHV0cGF0IG51bGxhLCBldCB1bHRyaWNpZXMgZXJvcyBvcm5hcmUgc2l0IGFtZXQuIE51bGxhbSB1bGxhbWNvcnBlciBkdWkgZXJvcywgbmVjIHNvZGFsZXMgZXggcGVsbGVudGVzcXVlIHZlbC4gQWVuZWFuIGZlcm1lbnR1bSwgdG9ydG9yIHZpdGFlIHByZXRpdW0gdmVzdGlidWx1bSwgbmlzaSBzYXBpZW4gc29sbGljaXR1ZGluIHJpc3VzLCBpbiBhbGlxdWV0IHR1cnBpcyBsZWN0dXMgYmxhbmRpdCBsYWN1cy4gRHVpcyBwbGFjZXJhdCBsaWJlcm8gYXQgaXBzdW0gZnJpbmdpbGxhLCBzaXQgYW1ldCBwb3N1ZXJlIGxpZ3VsYSB0ZW1wb3IuDQogTnVuYyBhY2N1bXNhbiBhbnRlIGEgbWkgZGljdHVtIGN1cnN1cyBuZWMgZXUgb3JjaS5OdWxsYW0gY29uZGltZW50dW0gYXVndWUgbmVjIHRlbXBvciBhbGlxdWFtLk1hZWNlbmFzIGRhcGlidXMsIHZlbGl0IHNpdCBhbWV0IHJob25jdXMgdWx0cmljaWVzLCBuZXF1ZSBuaWJoIGZpbmlidXMgdHVycGlzLCBuZWMgc3VzY2lwaXQgbnVuYyBkdWkgYXQgbmVxdWUuQ3VtIHNvY2lpcyBuYXRvcXVlIHBlbmF0aWJ1cyBldCBtYWduaXMgZGlzIHBhcnR1cmllbnQgbW9udGVzLCBuYXNjZXR1ciByaWRpY3VsdXMgbXVzLk1hZWNlbmFzIHBvcnRhIGZyaW5naWxsYSBzb2RhbGVzLk51bGxhIHVsdHJpY2VzLCBtZXR1cyBzZWQgbGFjaW5pYSBwbGFjZXJhdCwgbWF1cmlzIG1hc3NhIGltcGVyZGlldCBpcHN1bSwgZXUgbGFvcmVldCBpcHN1bSBkaWFtIG5lYyBkaWFtLlZpdmFtdXMgY3Vyc3VzIG1vbGVzdGllIHB1cnVzIHNlZCBhbGlxdWV0LkFsaXF1YW0gc2l0IGFtZXQgYmxhbmRpdCBkb2xvci5OdWxsYW0gaWFjdWxpcyBzb2RhbGVzIHZlbGl0IGV0IHByZXRpdW0uUXVpc3F1ZSB0ZW1wb3IgYXVndWUgdmVsIGxpZ3VsYSBtb2xlc3RpZSBzYWdpdHRpcy5QaGFzZWxsdXMgZXQgc2VtIGFjIGRpYW0gcmhvbmN1cyBjb21tb2RvLk5hbSBiaWJlbmR1bSB2ZWxpdCBuZWMgbWFnbmEgY3Vyc3VzLCBub24gbW9sZXN0aWUgcmlzdXMgdWxsYW1jb3JwZXIuRXRpYW0gc29kYWxlcyBmZXJtZW50dW0gcHVydXMgYWMgb3JuYXJlLlZlc3RpYnVsdW0gYW50ZSBpcHN1bSBwcmltaXMgaW4gZmF1Y2lidXMgb3JjaSBsdWN0dXMgZXQgdWx0cmljZXMgcG9zdWVyZSBjdWJpbGlhIEN1cmFlOyBOdWxsYSBvcmNpIHNlbSwgbGFjaW5pYSBhIG51bmMgYSwgZmFjaWxpc2lzIHByZXRpdW0gYXVndWUuDQogQWVuZWFuIGFjY3Vtc2FuIGdyYXZpZGEgZXggYWMgdWxsYW1jb3JwZXIuRnVzY2UgYWxpcXVhbSBmZWxpcyBzZWQgaWFjdWxpcyBjb252YWxsaXMuU2VkIGV0IG9kaW8gc2VkIG1hZ25hIGNvbW1vZG8gdmVuZW5hdGlzIGEgZXQgbWF1cmlzLkNyYXMgbmVjIHRpbmNpZHVudCBsYWN1cy5Eb25lYyBhdWN0b3Igc2VtcGVyIHZvbHV0cGF0LlZpdmFtdXMgdmVoaWN1bGEgcGVsbGVudGVzcXVlIGRpYW0sIHByZXRpdW0gbWF4aW11cyBsYWN1cy5FdGlhbSB2ZWwgcXVhbSBldCBudW5jIHByZXRpdW0gcmhvbmN1cy5FdGlhbSBhdWd1ZSBvZGlvLCBwcmV0aXVtIGluIHRpbmNpZHVudCBzaXQgYW1ldCwgY29uZGltZW50dW0gbm9uIGVyb3MuRG9uZWMgaW1wZXJkaWV0IG9yY2kgdml2ZXJyYSBlcmF0IHZvbHV0cGF0IHZlc3RpYnVsdW0uQ3VyYWJpdHVyIGVnZXN0YXMgYXVndWUgb2Rpbywgbm9uIGltcGVyZGlldCBkaWFtIHNhZ2l0dGlzIGlkLkZ1c2NlIG1vbGxpcywgZmVsaXMgcXVpcyBsYW9yZWV0IHNhZ2l0dGlzLCBlbGl0IGV4IGludGVyZHVtIGp1c3RvLCBpZCBlZ2VzdGFzIHB1cnVzIG1pIHZlbCBqdXN0by5TdXNwZW5kaXNzZSBjb25kaW1lbnR1bSBtaSB2ZWwgY29uc2VjdGV0dXIgcnV0cnVtLg0KIEZ1c2NlIGluIGx1Y3R1cyBuaXNsLkN1cmFiaXR1ciBhdCBtb2xlc3RpZSBhbnRlLlZpdmFtdXMgcG9zdWVyZSBlbGVpZmVuZCBjb25zZWN0ZXR1ci5NYWVjZW5hcyBvcm5hcmUgZWdlc3RhcyBuaXNsLCBuZWMgdmVuZW5hdGlzIGxlbyB2aXZlcnJhIHF1aXMuTWFlY2VuYXMgdmVsIG9kaW8gYmliZW5kdW0sIHRyaXN0aXF1ZSBuaWJoIGV0LCB2ZW5lbmF0aXMgbnVsbGEuVmVzdGlidWx1bSB2aXRhZSBkYXBpYnVzIG51bGxhLCBxdWlzIHZ1bHB1dGF0ZSBlcm9zLlBoYXNlbGx1cyB2ZWwgdGVsbHVzIGV1IGVuaW0gb3JuYXJlIGx1Y3R1cyBldSBpbiBuZXF1ZS5OYW0gdm9sdXRwYXQgZXN0IHNpdCBhbWV0IGNvbmd1ZSB2b2x1dHBhdC5FdGlhbSBjb25zZXF1YXQgdml0YWUgbWkgaW4gc29sbGljaXR1ZGluLkRvbmVjIHNlbXBlciBsb3JlbSBlZ2V0IGVzdCB0aW5jaWR1bnQgZWdlc3Rhcy5EdWlzIHNpdCBhbWV0IGVzdCB0b3J0b3IuUHJvaW4gYXQgYmliZW5kdW0ganVzdG8sIHNpdCBhbWV0IGNvbmd1ZSB0ZWxsdXMuUGhhc2VsbHVzIGltcGVyZGlldCBudWxsYSBpZCBhdWd1ZSBjb25kaW1lbnR1bSB0cmlzdGlxdWUuTWFlY2VuYXMgZmluaWJ1cyBtZXR1cyBpbiBlbGl0IGJsYW5kaXQsIG5vbiB2ZWhpY3VsYSBzYXBpZW4gbG9ib3J0aXMuVml2YW11cyBydXRydW0gbGlndWxhIHZlbCBudW5jIHBlbGxlbnRlc3F1ZSBwcmV0aXVtLg==";
  }

  function getLoremIpsumEncodeWithFixedLineLength(charactersPerLine: number) : string
  {
    var _returnStr = "";
    var _data = "";

    _data = getLoremIpsumEncoded();
    while (_data.length > 0)
    {
      _returnStr += _data.slice(0, charactersPerLine) + "\r\n";
      _data = _data.slice(charactersPerLine);
    }

    return _returnStr;
  }

  function getUTFLoremIpsumByteArray(): Array<number>
  {
    return [76, 111, 114, 101, 109, 32, 105, 112, 115, 117, 109, 32, 100, 111, 108, 111, 114, 32, 115, 105, 116, 32, 97, 109, 101, 116, 44, 32, 99, 111, 110, 115, 101, 99, 116, 101, 116, 117, 114, 32, 97, 100, 105, 112, 105, 115, 99, 105, 110, 103, 32, 101, 108, 105, 116, 46, 32, 80, 114, 111, 105, 110, 32, 105, 100, 32, 118, 111, 108, 117, 116, 112, 97, 116, 32, 115, 97, 112, 105, 101, 110, 46, 32, 70, 117, 115, 99, 101, 32, 101, 116, 32, 118, 101, 108, 105, 116, 32, 97, 32, 116, 111, 114, 116, 111, 114, 32, 102, 97, 117, 99, 105, 98, 117, 115, 32, 112, 111, 114, 116, 116, 105, 116, 111, 114, 32, 105, 110, 32, 101, 117, 32, 101, 114, 97, 116, 46, 32, 78, 117, 110, 99, 32, 109, 111, 108, 101, 115, 116, 105, 101, 32, 100, 117, 105, 32, 99, 111, 110, 115, 101, 99, 116, 101, 116, 117, 114, 32, 97, 114, 99, 117, 32, 115, 97, 103, 105, 116, 116, 105, 115, 44, 32, 115, 105, 116, 32, 97, 109, 101, 116, 32, 115, 101, 109, 112, 101, 114, 32, 109, 101, 116, 117, 115, 32, 116, 101, 109, 112, 117, 115, 46, 32, 86, 105, 118, 97, 109, 117, 115, 32, 102, 114, 105, 110, 103, 105, 108, 108, 97, 32, 100, 105, 97, 109, 32, 101, 103, 101, 115, 116, 97, 115, 32, 110, 117, 110, 99, 32, 102, 101, 117, 103, 105, 97, 116, 32, 118, 101, 104, 105, 99, 117, 108, 97, 46, 32, 68, 111, 110, 101, 99, 32, 97, 99, 32, 101, 108, 105, 116, 32, 101, 116, 32, 101, 108, 105, 116, 32, 118, 117, 108, 112, 117, 116, 97, 116, 101, 32, 102, 101, 114, 109, 101, 110, 116, 117, 109, 32, 101, 116, 32, 97, 116, 32, 100, 105, 97, 109, 46, 32, 77, 111, 114, 98, 105, 32, 116, 114, 105, 115, 116, 105, 113, 117, 101, 32, 113, 117, 97, 109, 32, 97, 32, 118, 101, 110, 101, 110, 97, 116, 105, 115, 32, 116, 105, 110, 99, 105, 100, 117, 110, 116, 46, 32, 67, 114, 97, 115, 32, 102, 114, 105, 110, 103, 105, 108, 108, 97, 32, 108, 97, 111, 114, 101, 101, 116, 32, 117, 114, 110, 97, 32, 105, 100, 32, 117, 108, 116, 114, 105, 99, 105, 101, 115, 46, 32, 78, 97, 109, 32, 118, 105, 116, 97, 101, 32, 109, 97, 115, 115, 97, 32, 111, 114, 110, 97, 114, 101, 44, 32, 108, 97, 99, 105, 110, 105, 97, 32, 110, 105, 98, 104, 32, 105, 100, 44, 32, 112, 104, 97, 114, 101, 116, 114, 97, 32, 108, 105, 103, 117, 108, 97, 46, 32, 78, 117, 110, 99, 32, 112, 114, 101, 116, 105, 117, 109, 32, 118, 111, 108, 117, 116, 112, 97, 116, 32, 110, 117, 108, 108, 97, 44, 32, 101, 116, 32, 117, 108, 116, 114, 105, 99, 105, 101, 115, 32, 101, 114, 111, 115, 32, 111, 114, 110, 97, 114, 101, 32, 115, 105, 116, 32, 97, 109, 101, 116, 46, 32, 78, 117, 108, 108, 97, 109, 32, 117, 108, 108, 97, 109, 99, 111, 114, 112, 101, 114, 32, 100, 117, 105, 32, 101, 114, 111, 115, 44, 32, 110, 101, 99, 32, 115, 111, 100, 97, 108, 101, 115, 32, 101, 120, 32, 112, 101, 108, 108, 101, 110, 116, 101, 115, 113, 117, 101, 32, 118, 101, 108, 46, 32, 65, 101, 110, 101, 97, 110, 32, 102, 101, 114, 109, 101, 110, 116, 117, 109, 44, 32, 116, 111, 114, 116, 111, 114, 32, 118, 105, 116, 97, 101, 32, 112, 114, 101, 116, 105, 117, 109, 32, 118, 101, 115, 116, 105, 98, 117, 108, 117, 109, 44, 32, 110, 105, 115, 105, 32, 115, 97, 112, 105, 101, 110, 32, 115, 111, 108, 108, 105, 99, 105, 116, 117, 100, 105, 110, 32, 114, 105, 115, 117, 115, 44, 32, 105, 110, 32, 97, 108, 105, 113, 117, 101, 116, 32, 116, 117, 114, 112, 105, 115, 32, 108, 101, 99, 116, 117, 115, 32, 98, 108, 97, 110, 100, 105, 116, 32, 108, 97, 99, 117, 115, 46, 32, 68, 117, 105, 115, 32, 112, 108, 97, 99, 101, 114, 97, 116, 32, 108, 105, 98, 101, 114, 111, 32, 97, 116, 32, 105, 112, 115, 117, 109, 32, 102, 114, 105, 110, 103, 105, 108, 108, 97, 44, 32, 115, 105, 116, 32, 97, 109, 101, 116, 32, 112, 111, 115, 117, 101, 114, 101, 32, 108, 105, 103, 117, 108, 97, 32, 116, 101, 109, 112, 111, 114, 46, 13, 10, 32, 78, 117, 110, 99, 32, 97, 99, 99, 117, 109, 115, 97, 110, 32, 97, 110, 116, 101, 32, 97, 32, 109, 105, 32, 100, 105, 99, 116, 117, 109, 32, 99, 117, 114, 115, 117, 115, 32, 110, 101, 99, 32, 101, 117, 32, 111, 114, 99, 105, 46, 78, 117, 108, 108, 97, 109, 32, 99, 111, 110, 100, 105, 109, 101, 110, 116, 117, 109, 32, 97, 117, 103, 117, 101, 32, 110, 101, 99, 32, 116, 101, 109, 112, 111, 114, 32, 97, 108, 105, 113, 117, 97, 109, 46, 77, 97, 101, 99, 101, 110, 97, 115, 32, 100, 97, 112, 105, 98, 117, 115, 44, 32, 118, 101, 108, 105, 116, 32, 115, 105, 116, 32, 97, 109, 101, 116, 32, 114, 104, 111, 110, 99, 117, 115, 32, 117, 108, 116, 114, 105, 99, 105, 101, 115, 44, 32, 110, 101, 113, 117, 101, 32, 110, 105, 98, 104, 32, 102, 105, 110, 105, 98, 117, 115, 32, 116, 117, 114, 112, 105, 115, 44, 32, 110, 101, 99, 32, 115, 117, 115, 99, 105, 112, 105, 116, 32, 110, 117, 110, 99, 32, 100, 117, 105, 32, 97, 116, 32, 110, 101, 113, 117, 101, 46, 67, 117, 109, 32, 115, 111, 99, 105, 105, 115, 32, 110, 97, 116, 111, 113, 117, 101, 32, 112, 101, 110, 97, 116, 105, 98, 117, 115, 32, 101, 116, 32, 109, 97, 103, 110, 105, 115, 32, 100, 105, 115, 32, 112, 97, 114, 116, 117, 114, 105, 101, 110, 116, 32, 109, 111, 110, 116, 101, 115, 44, 32, 110, 97, 115, 99, 101, 116, 117, 114, 32, 114, 105, 100, 105, 99, 117, 108, 117, 115, 32, 109, 117, 115, 46, 77, 97, 101, 99, 101, 110, 97, 115, 32, 112, 111, 114, 116, 97, 32, 102, 114, 105, 110, 103, 105, 108, 108, 97, 32, 115, 111, 100, 97, 108, 101, 115, 46, 78, 117, 108, 108, 97, 32, 117, 108, 116, 114, 105, 99, 101, 115, 44, 32, 109, 101, 116, 117, 115, 32, 115, 101, 100, 32, 108, 97, 99, 105, 110, 105, 97, 32, 112, 108, 97, 99, 101, 114, 97, 116, 44, 32, 109, 97, 117, 114, 105, 115, 32, 109, 97, 115, 115, 97, 32, 105, 109, 112, 101, 114, 100, 105, 101, 116, 32, 105, 112, 115, 117, 109, 44, 32, 101, 117, 32, 108, 97, 111, 114, 101, 101, 116, 32, 105, 112, 115, 117, 109, 32, 100, 105, 97, 109, 32, 110, 101, 99, 32, 100, 105, 97, 109, 46, 86, 105, 118, 97, 109, 117, 115, 32, 99, 117, 114, 115, 117, 115, 32, 109, 111, 108, 101, 115, 116, 105, 101, 32, 112, 117, 114, 117, 115, 32, 115, 101, 100, 32, 97, 108, 105, 113, 117, 101, 116, 46, 65, 108, 105, 113, 117, 97, 109, 32, 115, 105, 116, 32, 97, 109, 101, 116, 32, 98, 108, 97, 110, 100, 105, 116, 32, 100, 111, 108, 111, 114, 46, 78, 117, 108, 108, 97, 109, 32, 105, 97, 99, 117, 108, 105, 115, 32, 115, 111, 100, 97, 108, 101, 115, 32, 118, 101, 108, 105, 116, 32, 101, 116, 32, 112, 114, 101, 116, 105, 117, 109, 46, 81, 117, 105, 115, 113, 117, 101, 32, 116, 101, 109, 112, 111, 114, 32, 97, 117, 103, 117, 101, 32, 118, 101, 108, 32, 108, 105, 103, 117, 108, 97, 32, 109, 111, 108, 101, 115, 116, 105, 101, 32, 115, 97, 103, 105, 116, 116, 105, 115, 46, 80, 104, 97, 115, 101, 108, 108, 117, 115, 32, 101, 116, 32, 115, 101, 109, 32, 97, 99, 32, 100, 105, 97, 109, 32, 114, 104, 111, 110, 99, 117, 115, 32, 99, 111, 109, 109, 111, 100, 111, 46, 78, 97, 109, 32, 98, 105, 98, 101, 110, 100, 117, 109, 32, 118, 101, 108, 105, 116, 32, 110, 101, 99, 32, 109, 97, 103, 110, 97, 32, 99, 117, 114, 115, 117, 115, 44, 32, 110, 111, 110, 32, 109, 111, 108, 101, 115, 116, 105, 101, 32, 114, 105, 115, 117, 115, 32, 117, 108, 108, 97, 109, 99, 111, 114, 112, 101, 114, 46, 69, 116, 105, 97, 109, 32, 115, 111, 100, 97, 108, 101, 115, 32, 102, 101, 114, 109, 101, 110, 116, 117, 109, 32, 112, 117, 114, 117, 115, 32, 97, 99, 32, 111, 114, 110, 97, 114, 101, 46, 86, 101, 115, 116, 105, 98, 117, 108, 117, 109, 32, 97, 110, 116, 101, 32, 105, 112, 115, 117, 109, 32, 112, 114, 105, 109, 105, 115, 32, 105, 110, 32, 102, 97, 117, 99, 105, 98, 117, 115, 32, 111, 114, 99, 105, 32, 108, 117, 99, 116, 117, 115, 32, 101, 116, 32, 117, 108, 116, 114, 105, 99, 101, 115, 32, 112, 111, 115, 117, 101, 114, 101, 32, 99, 117, 98, 105, 108, 105, 97, 32, 67, 117, 114, 97, 101, 59, 32, 78, 117, 108, 108, 97, 32, 111, 114, 99, 105, 32, 115, 101, 109, 44, 32, 108, 97, 99, 105, 110, 105, 97, 32, 97, 32, 110, 117, 110, 99, 32, 97, 44, 32, 102, 97, 99, 105, 108, 105, 115, 105, 115, 32, 112, 114, 101, 116, 105, 117, 109, 32, 97, 117, 103, 117, 101, 46, 13, 10, 32, 65, 101, 110, 101, 97, 110, 32, 97, 99, 99, 117, 109, 115, 97, 110, 32, 103, 114, 97, 118, 105, 100, 97, 32, 101, 120, 32, 97, 99, 32, 117, 108, 108, 97, 109, 99, 111, 114, 112, 101, 114, 46, 70, 117, 115, 99, 101, 32, 97, 108, 105, 113, 117, 97, 109, 32, 102, 101, 108, 105, 115, 32, 115, 101, 100, 32, 105, 97, 99, 117, 108, 105, 115, 32, 99, 111, 110, 118, 97, 108, 108, 105, 115, 46, 83, 101, 100, 32, 101, 116, 32, 111, 100, 105, 111, 32, 115, 101, 100, 32, 109, 97, 103, 110, 97, 32, 99, 111, 109, 109, 111, 100, 111, 32, 118, 101, 110, 101, 110, 97, 116, 105, 115, 32, 97, 32, 101, 116, 32, 109, 97, 117, 114, 105, 115, 46, 67, 114, 97, 115, 32, 110, 101, 99, 32, 116, 105, 110, 99, 105, 100, 117, 110, 116, 32, 108, 97, 99, 117, 115, 46, 68, 111, 110, 101, 99, 32, 97, 117, 99, 116, 111, 114, 32, 115, 101, 109, 112, 101, 114, 32, 118, 111, 108, 117, 116, 112, 97, 116, 46, 86, 105, 118, 97, 109, 117, 115, 32, 118, 101, 104, 105, 99, 117, 108, 97, 32, 112, 101, 108, 108, 101, 110, 116, 101, 115, 113, 117, 101, 32, 100, 105, 97, 109, 44, 32, 112, 114, 101, 116, 105, 117, 109, 32, 109, 97, 120, 105, 109, 117, 115, 32, 108, 97, 99, 117, 115, 46, 69, 116, 105, 97, 109, 32, 118, 101, 108, 32, 113, 117, 97, 109, 32, 101, 116, 32, 110, 117, 110, 99, 32, 112, 114, 101, 116, 105, 117, 109, 32, 114, 104, 111, 110, 99, 117, 115, 46, 69, 116, 105, 97, 109, 32, 97, 117, 103, 117, 101, 32, 111, 100, 105, 111, 44, 32, 112, 114, 101, 116, 105, 117, 109, 32, 105, 110, 32, 116, 105, 110, 99, 105, 100, 117, 110, 116, 32, 115, 105, 116, 32, 97, 109, 101, 116, 44, 32, 99, 111, 110, 100, 105, 109, 101, 110, 116, 117, 109, 32, 110, 111, 110, 32, 101, 114, 111, 115, 46, 68, 111, 110, 101, 99, 32, 105, 109, 112, 101, 114, 100, 105, 101, 116, 32, 111, 114, 99, 105, 32, 118, 105, 118, 101, 114, 114, 97, 32, 101, 114, 97, 116, 32, 118, 111, 108, 117, 116, 112, 97, 116, 32, 118, 101, 115, 116, 105, 98, 117, 108, 117, 109, 46, 67, 117, 114, 97, 98, 105, 116, 117, 114, 32, 101, 103, 101, 115, 116, 97, 115, 32, 97, 117, 103, 117, 101, 32, 111, 100, 105, 111, 44, 32, 110, 111, 110, 32, 105, 109, 112, 101, 114, 100, 105, 101, 116, 32, 100, 105, 97, 109, 32, 115, 97, 103, 105, 116, 116, 105, 115, 32, 105, 100, 46, 70, 117, 115, 99, 101, 32, 109, 111, 108, 108, 105, 115, 44, 32, 102, 101, 108, 105, 115, 32, 113, 117, 105, 115, 32, 108, 97, 111, 114, 101, 101, 116, 32, 115, 97, 103, 105, 116, 116, 105, 115, 44, 32, 101, 108, 105, 116, 32, 101, 120, 32, 105, 110, 116, 101, 114, 100, 117, 109, 32, 106, 117, 115, 116, 111, 44, 32, 105, 100, 32, 101, 103, 101, 115, 116, 97, 115, 32, 112, 117, 114, 117, 115, 32, 109, 105, 32, 118, 101, 108, 32, 106, 117, 115, 116, 111, 46, 83, 117, 115, 112, 101, 110, 100, 105, 115, 115, 101, 32, 99, 111, 110, 100, 105, 109, 101, 110, 116, 117, 109, 32, 109, 105, 32, 118, 101, 108, 32, 99, 111, 110, 115, 101, 99, 116, 101, 116, 117, 114, 32, 114, 117, 116, 114, 117, 109, 46, 13, 10, 32, 70, 117, 115, 99, 101, 32, 105, 110, 32, 108, 117, 99, 116, 117, 115, 32, 110, 105, 115, 108, 46, 67, 117, 114, 97, 98, 105, 116, 117, 114, 32, 97, 116, 32, 109, 111, 108, 101, 115, 116, 105, 101, 32, 97, 110, 116, 101, 46, 86, 105, 118, 97, 109, 117, 115, 32, 112, 111, 115, 117, 101, 114, 101, 32, 101, 108, 101, 105, 102, 101, 110, 100, 32, 99, 111, 110, 115, 101, 99, 116, 101, 116, 117, 114, 46, 77, 97, 101, 99, 101, 110, 97, 115, 32, 111, 114, 110, 97, 114, 101, 32, 101, 103, 101, 115, 116, 97, 115, 32, 110, 105, 115, 108, 44, 32, 110, 101, 99, 32, 118, 101, 110, 101, 110, 97, 116, 105, 115, 32, 108, 101, 111, 32, 118, 105, 118, 101, 114, 114, 97, 32, 113, 117, 105, 115, 46, 77, 97, 101, 99, 101, 110, 97, 115, 32, 118, 101, 108, 32, 111, 100, 105, 111, 32, 98, 105, 98, 101, 110, 100, 117, 109, 44, 32, 116, 114, 105, 115, 116, 105, 113, 117, 101, 32, 110, 105, 98, 104, 32, 101, 116, 44, 32, 118, 101, 110, 101, 110, 97, 116, 105, 115, 32, 110, 117, 108, 108, 97, 46, 86, 101, 115, 116, 105, 98, 117, 108, 117, 109, 32, 118, 105, 116, 97, 101, 32, 100, 97, 112, 105, 98, 117, 115, 32, 110, 117, 108, 108, 97, 44, 32, 113, 117, 105, 115, 32, 118, 117, 108, 112, 117, 116, 97, 116, 101, 32, 101, 114, 111, 115, 46, 80, 104, 97, 115, 101, 108, 108, 117, 115, 32, 118, 101, 108, 32, 116, 101, 108, 108, 117, 115, 32, 101, 117, 32, 101, 110, 105, 109, 32, 111, 114, 110, 97, 114, 101, 32, 108, 117, 99, 116, 117, 115, 32, 101, 117, 32, 105, 110, 32, 110, 101, 113, 117, 101, 46, 78, 97, 109, 32, 118, 111, 108, 117, 116, 112, 97, 116, 32, 101, 115, 116, 32, 115, 105, 116, 32, 97, 109, 101, 116, 32, 99, 111, 110, 103, 117, 101, 32, 118, 111, 108, 117, 116, 112, 97, 116, 46, 69, 116, 105, 97, 109, 32, 99, 111, 110, 115, 101, 113, 117, 97, 116, 32, 118, 105, 116, 97, 101, 32, 109, 105, 32, 105, 110, 32, 115, 111, 108, 108, 105, 99, 105, 116, 117, 100, 105, 110, 46, 68, 111, 110, 101, 99, 32, 115, 101, 109, 112, 101, 114, 32, 108, 111, 114, 101, 109, 32, 101, 103, 101, 116, 32, 101, 115, 116, 32, 116, 105, 110, 99, 105, 100, 117, 110, 116, 32, 101, 103, 101, 115, 116, 97, 115, 46, 68, 117, 105, 115, 32, 115, 105, 116, 32, 97, 109, 101, 116, 32, 101, 115, 116, 32, 116, 111, 114, 116, 111, 114, 46, 80, 114, 111, 105, 110, 32, 97, 116, 32, 98, 105, 98, 101, 110, 100, 117, 109, 32, 106, 117, 115, 116, 111, 44, 32, 115, 105, 116, 32, 97, 109, 101, 116, 32, 99, 111, 110, 103, 117, 101, 32, 116, 101, 108, 108, 117, 115, 46, 80, 104, 97, 115, 101, 108, 108, 117, 115, 32, 105, 109, 112, 101, 114, 100, 105, 101, 116, 32, 110, 117, 108, 108, 97, 32, 105, 100, 32, 97, 117, 103, 117, 101, 32, 99, 111, 110, 100, 105, 109, 101, 110, 116, 117, 109, 32, 116, 114, 105, 115, 116, 105, 113, 117, 101, 46, 77, 97, 101, 99, 101, 110, 97, 115, 32, 102, 105, 110, 105, 98, 117, 115, 32, 109, 101, 116, 117, 115, 32, 105, 110, 32, 101, 108, 105, 116, 32, 98, 108, 97, 110, 100, 105, 116, 44, 32, 110, 111, 110, 32, 118, 101, 104, 105, 99, 117, 108, 97, 32, 115, 97, 112, 105, 101, 110, 32, 108, 111, 98, 111, 114, 116, 105, 115, 46, 86, 105, 118, 97, 109, 117, 115, 32, 114, 117, 116, 114, 117, 109, 32, 108, 105, 103, 117, 108, 97, 32, 118, 101, 108, 32, 110, 117, 110, 99, 32, 112, 101, 108, 108, 101, 110, 116, 101, 115, 113, 117, 101, 32, 112, 114, 101, 116, 105, 117, 109, 46];
  }

  function getLoremIpsum() : string
  {
    return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id volutpat sapien. Fusce et velit a tortor faucibus porttitor in eu erat. Nunc molestie dui consectetur arcu sagittis, sit amet semper metus tempus. Vivamus fringilla diam egestas nunc feugiat vehicula. Donec ac elit et elit vulputate fermentum et at diam. Morbi tristique quam a venenatis tincidunt. Cras fringilla laoreet urna id ultricies. Nam vitae massa ornare, lacinia nibh id, pharetra ligula. Nunc pretium volutpat nulla, et ultricies eros ornare sit amet. Nullam ullamcorper dui eros, nec sodales ex pellentesque vel. Aenean fermentum, tortor vitae pretium vestibulum, nisi sapien sollicitudin risus, in aliquet turpis lectus blandit lacus. Duis placerat libero at ipsum fringilla, sit amet posuere ligula tempor.\r\n Nunc accumsan ante a mi dictum cursus nec eu orci.Nullam condimentum augue nec tempor aliquam.Maecenas dapibus, velit sit amet rhoncus ultricies, neque nibh finibus turpis, nec suscipit nunc dui at neque.Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Maecenas porta fringilla sodales.Nulla ultrices, metus sed lacinia placerat, mauris massa imperdiet ipsum, eu laoreet ipsum diam nec diam.Vivamus cursus molestie purus sed aliquet.Aliquam sit amet blandit dolor.Nullam iaculis sodales velit et pretium.Quisque tempor augue vel ligula molestie sagittis.Phasellus et sem ac diam rhoncus commodo.Nam bibendum velit nec magna cursus, non molestie risus ullamcorper.Etiam sodales fermentum purus ac ornare.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla orci sem, lacinia a nunc a, facilisis pretium augue.\r\n Aenean accumsan gravida ex ac ullamcorper.Fusce aliquam felis sed iaculis convallis.Sed et odio sed magna commodo venenatis a et mauris.Cras nec tincidunt lacus.Donec auctor semper volutpat.Vivamus vehicula pellentesque diam, pretium maximus lacus.Etiam vel quam et nunc pretium rhoncus.Etiam augue odio, pretium in tincidunt sit amet, condimentum non eros.Donec imperdiet orci viverra erat volutpat vestibulum.Curabitur egestas augue odio, non imperdiet diam sagittis id.Fusce mollis, felis quis laoreet sagittis, elit ex interdum justo, id egestas purus mi vel justo.Suspendisse condimentum mi vel consectetur rutrum.\r\n Fusce in luctus nisl.Curabitur at molestie ante.Vivamus posuere eleifend consectetur.Maecenas ornare egestas nisl, nec venenatis leo viverra quis.Maecenas vel odio bibendum, tristique nibh et, venenatis nulla.Vestibulum vitae dapibus nulla, quis vulputate eros.Phasellus vel tellus eu enim ornare luctus eu in neque.Nam volutpat est sit amet congue volutpat.Etiam consequat vitae mi in sollicitudin.Donec semper lorem eget est tincidunt egestas.Duis sit amet est tortor.Proin at bibendum justo, sit amet congue tellus.Phasellus imperdiet nulla id augue condimentum tristique.Maecenas finibus metus in elit blandit, non vehicula sapien lobortis.Vivamus rutrum ligula vel nunc pellentesque pretium.";
  }

  function getDifficultChars() : string
  {
    return "< _ - > & ! @ %&/() 0 ? ' \" ä ü ö Ä Ü Ö ß Å å Æ æ Ø ø « » Ğ İ Ş ğ ı ş Ð Ý Þ ð ý þ Ƞ ȡ Ȣ ȣ Ȥ ȥ Ȧ ȧ Ȩ ȩ Ȫ ȫ Ȭ ȭ Ȯ ȯ Ȱ ȱ Ȳ ȳ ȴ ȵ ȶ ȷ ȸ ȹ Ⱥ Ȼ ȼ Ƚ Ⱦ ȿ ɀ Ɂ ɂ Ƀ Ʉ Ʌ Ɇ ɇ Ɉ ɉ Ɋ ɋ Ɍ ɍ Ɏ ɏ ɐ ɑ ɒ ɓ ɔ ɕ ɖ ɗ ɘ ə ɚ ɛ ɜ ɝ ɞ ɟ Ơ ơ Ƣ ƣ Ƥ ƥ Ʀ Ƨ ƨ Ʃ ƪ ƫ Ƭ ƭ Ʈ Ư ư Ʊ Ʋ Ƴ ƴ Ƶ ƶ Ʒ Ƹ ƹ ƺ ƻ Ƽ ƽ ƾ ƿ Š š Ţ ţ Ť ť Ŧ ŧ Ũ ũ Ū ū Ŭ ŭ Ů ů Ű ű Ų ų Ŵ ŵ Ŷ ŷ Ÿ Ź ź Ż ż Ž ž ſ  ¡ ¢ £ ¤ ¥ ¦ § ¨ © ª « ¬ ­ ® ¯ ° ± ² ³ ´ µ ¶ · ¸ ¹ º » ¼ ½ ¾ ¿";
  }

  function getDifficultCharsEncoded() : string
  {
    return "PCBfIC0gPiAmICEgQCAlJi8oKSAwID8gJyAiIMOkIMO8IMO2IMOEIMOcIMOWIMOfIMOFIMOlIMOGIMOmIMOYIMO4IMKrIMK7IMSeIMSwIMWeIMSfIMSxIMWfIMOQIMOdIMOeIMOwIMO9IMO+IMigIMihIMiiIMijIMikIMilIMimIMinIMioIMipIMiqIMirIMisIMitIMiuIMivIMiwIMixIMiyIMizIMi0IMi1IMi2IMi3IMi4IMi5IMi6IMi7IMi8IMi9IMi+IMi/IMmAIMmBIMmCIMmDIMmEIMmFIMmGIMmHIMmIIMmJIMmKIMmLIMmMIMmNIMmOIMmPIMmQIMmRIMmSIMmTIMmUIMmVIMmWIMmXIMmYIMmZIMmaIMmbIMmcIMmdIMmeIMmfIMagIMahIMaiIMajIMakIMalIMamIManIMaoIMapIMaqIMarIMasIMatIMauIMavIMawIMaxIMayIMazIMa0IMa1IMa2IMa3IMa4IMa5IMa6IMa7IMa8IMa9IMa+IMa/IMWgIMWhIMWiIMWjIMWkIMWlIMWmIMWnIMWoIMWpIMWqIMWrIMWsIMWtIMWuIMWvIMWwIMWxIMWyIMWzIMW0IMW1IMW2IMW3IMW4IMW5IMW6IMW7IMW8IMW9IMW+IMW/ICDCoSDCoiDCoyDCpCDCpSDCpiDCpyDCqCDCqSDCqiDCqyDCrCDCrSDCriDCryDCsCDCsSDCsiDCsyDCtCDCtSDCtiDCtyDCuCDCuSDCuiDCuyDCvCDCvSDCviDCvw==";
  }

  function getUTFDifficultCharsByteArray() : Array<number>
  {
    return [60, 32, 95, 32, 45, 32, 62, 32, 38, 32, 33, 32, 64, 32, 37, 38, 47, 40, 41, 32, 48, 32, 63, 32, 39, 32, 34, 32, 195, 164, 32, 195, 188, 32, 195, 182, 32, 195, 132, 32, 195, 156, 32, 195, 150, 32, 195, 159, 32, 195, 133, 32, 195, 165, 32, 195, 134, 32, 195, 166, 32, 195, 152, 32, 195, 184, 32, 194, 171, 32, 194, 187, 32, 196, 158, 32, 196, 176, 32, 197, 158, 32, 196, 159, 32, 196, 177, 32, 197, 159, 32, 195, 144, 32, 195, 157, 32, 195, 158, 32, 195, 176, 32, 195, 189, 32, 195, 190, 32, 200, 160, 32, 200, 161, 32, 200, 162, 32, 200, 163, 32, 200, 164, 32, 200, 165, 32, 200, 166, 32, 200, 167, 32, 200, 168, 32, 200, 169, 32, 200, 170, 32, 200, 171, 32, 200, 172, 32, 200, 173, 32, 200, 174, 32, 200, 175, 32, 200, 176, 32, 200, 177, 32, 200, 178, 32, 200, 179, 32, 200, 180, 32, 200, 181, 32, 200, 182, 32, 200, 183, 32, 200, 184, 32, 200, 185, 32, 200, 186, 32, 200, 187, 32, 200, 188, 32, 200, 189, 32, 200, 190, 32, 200, 191, 32, 201, 128, 32, 201, 129, 32, 201, 130, 32, 201, 131, 32, 201, 132, 32, 201, 133, 32, 201, 134, 32, 201, 135, 32, 201, 136, 32, 201, 137, 32, 201, 138, 32, 201, 139, 32, 201, 140, 32, 201, 141, 32, 201, 142, 32, 201, 143, 32, 201, 144, 32, 201, 145, 32, 201, 146, 32, 201, 147, 32, 201, 148, 32, 201, 149, 32, 201, 150, 32, 201, 151, 32, 201, 152, 32, 201, 153, 32, 201, 154, 32, 201, 155, 32, 201, 156, 32, 201, 157, 32, 201, 158, 32, 201, 159, 32, 198, 160, 32, 198, 161, 32, 198, 162, 32, 198, 163, 32, 198, 164, 32, 198, 165, 32, 198, 166, 32, 198, 167, 32, 198, 168, 32, 198, 169, 32, 198, 170, 32, 198, 171, 32, 198, 172, 32, 198, 173, 32, 198, 174, 32, 198, 175, 32, 198, 176, 32, 198, 177, 32, 198, 178, 32, 198, 179, 32, 198, 180, 32, 198, 181, 32, 198, 182, 32, 198, 183, 32, 198, 184, 32, 198, 185, 32, 198, 186, 32, 198, 187, 32, 198, 188, 32, 198, 189, 32, 198, 190, 32, 198, 191, 32, 197, 160, 32, 197, 161, 32, 197, 162, 32, 197, 163, 32, 197, 164, 32, 197, 165, 32, 197, 166, 32, 197, 167, 32, 197, 168, 32, 197, 169, 32, 197, 170, 32, 197, 171, 32, 197, 172, 32, 197, 173, 32, 197, 174, 32, 197, 175, 32, 197, 176, 32, 197, 177, 32, 197, 178, 32, 197, 179, 32, 197, 180, 32, 197, 181, 32, 197, 182, 32, 197, 183, 32, 197, 184, 32, 197, 185, 32, 197, 186, 32, 197, 187, 32, 197, 188, 32, 197, 189, 32, 197, 190, 32, 197, 191, 32, 32, 194, 161, 32, 194, 162, 32, 194, 163, 32, 194, 164, 32, 194, 165, 32, 194, 166, 32, 194, 167, 32, 194, 168, 32, 194, 169, 32, 194, 170, 32, 194, 171, 32, 194, 172, 32, 194, 173, 32, 194, 174, 32, 194, 175, 32, 194, 176, 32, 194, 177, 32, 194, 178, 32, 194, 179, 32, 194, 180, 32, 194, 181, 32, 194, 182, 32, 194, 183, 32, 194, 184, 32, 194, 185, 32, 194, 186, 32, 194, 187, 32, 194, 188, 32, 194, 189, 32, 194, 190, 32, 194, 191];
  }

}//END module

