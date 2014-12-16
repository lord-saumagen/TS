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

  QUnit.test("Base64.encode", (assert) =>
  {
    var _ShortTestEncoded1 = TS.Encoding.Base64.encode(getShortTestString());
    var _ShortTestEncoded2 = getShortTestStringEncoded();
    var _TestEncoded1 = TS.Encoding.Base64.encode(getTestString());
    var _TestEncoded2 = getTestStringEncoded();
    var _LoremIpsumEncoded = TS.Encoding.Base64.encode(getLoremIpsum());

    assert.equal(TS.Encoding.Base64.encode(getShortTestString()), getShortTestStringEncoded(), "Should return an encoded string that matches with the C# encoded data.");
    assert.equal(TS.Encoding.Base64.encode(getTestString()), getTestStringEncoded(), "Should return an encoded string that matches with the C# encoded data.");
    assert.equal(TS.Encoding.Base64.encode(getLoremIpsum()), getLoremIpsumEncoded(), "Should return an encoded string that matches with the C# encoded data.");
    assert.equal(TS.Encoding.Base64.encode(getSVG()), getSVGEncoded(), "Should return an encoded string that matches with the C# encoded data.");
  });

  QUnit.test("Base64.decode", (assert) =>
  {
    assert.equal(TS.Encoding.Base64.decode(getShortTestStringEncoded()), getShortTestString(), "Should return a decoded string that matches with the plain text.");
    assert.equal(TS.Encoding.Base64.decode(getTestStringEncoded()), getTestString(), "Should return a decoded string that matches with the plain text.");
    assert.equal(TS.Encoding.Base64.decode(getLoremIpsumEncoded()), getLoremIpsum(), "Should return a decoded string that matches with the plain text.");
    assert.equal(TS.Encoding.Base64.decode(getSVGEncoded()), getSVG(), "Should return a decoded string that matches with the plain text.");
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
    assert.notEqual(_encodedString, getDifficultChars() , "Should return an encoded string which doesn't macht with the plain text.");

    _decodedString = TS.Encoding.HTML.decode(_encodedString);
    assert.equal(_decodedString, getDifficultChars(), "Should return a decoded string that matches with the plain text.");

  });

  /*
  QUnit.test("UTF8.Encode", (assert) => 
  {
  });
  */

  function getShortTestString()
  {
    return "ABCabc123";
  }

  //
  //C# encoded date for the 'ShortTestString' string.
  //
  function getShortTestStringEncoded()
  {
    return "QUJDYWJjMTIz";
  }

  function getTestString()
  {
    return "This is a test string with more than 100 characters. That should result in a line break in the resulting encoded text by some encoders.";
  }

  //
  //C# encoded date for the 'TestString' string.
  //
  function getTestStringEncoded()
  {
    return "VGhpcyBpcyBhIHRlc3Qgc3RyaW5nIHdpdGggbW9yZSB0aGFuIDEwMCBjaGFyYWN0ZXJzLiBUaGF0IHNob3VsZCByZXN1bHQgaW4gYSBsaW5lIGJyZWFrIGluIHRoZSByZXN1bHRpbmcgZW5jb2RlZCB0ZXh0IGJ5IHNvbWUgZW5jb2RlcnMu";
  }

  function getSVG()
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

  //
  //C# encoded date for the 'SVG' string.
  //
  function getSVGEncoded()
  {
    return "PD94bWwgdmVyc2lvbiA9ICIxLjAiIGVuY29kaW5nID0idXRmLTgiPz4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCIgPg0KPHN2ZyB4bWxucyA9ICJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6IHhsaW5rID0gImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb24gPSAiMS4xIiBoZWlnaHQgPSAiMjQiIHdpZHRoID0gIjQwMCIgPg0KICA8ZGVmcz4NCiAgICA8cGF0dGVybiBpZCA9ICJzdHJpcGVkYmFjayIgaGVpZ2h0ID0gIjIwIiB3aWR0aCA9ICIyMCIgeSA9ICIyIiBwYXR0ZXJuVW5pdHMgPSAidXNlclNwYWNlT25Vc2UiIG92ZXJmbG93ID0gInNjcm9sbCIgPg0KICAgICAgPGcgdHJhbnNmb3JtID0gInNrZXdYKC0yMCkiID4NCiAgICAgICAgPHJlY3QgeCA9ICItMTAiIHkgPSAiMCIgd2lkdGggPSAiMTAiIGhlaWdodCA9ICIyMCIgc3Ryb2tlID0gIm5vbmUiIGZpbGwgPSIjRjJGMkYyIi8+DQogICAgICAgIDxyZWN0IHggPSAiMCIgeSA9ICIwIiB3aWR0aCA9ICIxMCIgaGVpZ2h0ID0gIjIwIiBzdHJva2UgPSAibm9uZSIgZmlsbCA9IiNFMkUyRTIiLz4NCiAgICAgICAgPHJlY3QgeCA9ICIxMCIgeSA9ICIwIiB3aWR0aCA9ICIxMCIgaGVpZ2h0ID0gIjIwIiBzdHJva2UgPSAibm9uZSIgZmlsbCA9IiNGMkYyRjIiLz4NCiAgICAgICAgPHJlY3QgeCA9ICIyMCIgeSA9ICIwIiB3aWR0aCA9ICIxMCIgaGVpZ2h0ID0gIjIwIiBzdHJva2UgPSAibm9uZSIgZmlsbCA9IiNFMkUyRTIiLz4NCiAgICAgIDwvZyA+DQogICAgPC9wYXR0ZXJuID4NCg0KICAgIDxyZWN0IGlkID0gImlubmVyY3V0IiB4ID0gIjIiIHkgPSAiMSIgd2lkdGggPSAiMzk2IiBoZWlnaHQgPSIyMiIvPg0KDQogICAgPGNsaXBQYXRoIGlkID0gImxvYWRjbGlwIj4NCiAgICAgPHVzZSB4bGluazpocmVmID0iI2lubmVyY3V0Ii8+DQogICAgPC9jbGlwUGF0aCA+DQogIDwvZGVmcz4NCg0KICA8cmVjdCB3aWR0aCA9ICI0MDAiIGhlaWdodCA9ICIyNCIgeCA9ICIwIiB5ID0gIjAiIHN0eWxlID0ic3Ryb2tlLXdpZHRoOjJweDtzdHJva2U6Z3JleTsiLz4gIDwhLS1CYWNraW5nIHJlY3QgLyBmcmFtZS0tID4NCg0KICA8ZyBjbGlwIC0gcGF0aCA9ICJ1cmwoI2xvYWRjbGlwKSI+DQogICAgPHJlY3QgeCA9ICItMTgiIHkgPSAiMiIgd2lkdGggPSAiNTE2IiBoZWlnaHQgPSAiMjAiIHN0eWxlID0gInN0cm9rZS13aWR0aDowcHg7c3Ryb2tlOmdyZXk7IiBmaWxsID0gInVybCgjc3RyaXBlZGJhY2spIj4NCiAgICAgIDxhbmltYXRlVHJhbnNmb3JtDQogICAgICAgIGF0dHJpYnV0ZVR5cGUgPSAiWE1MIg0KICAgICAgICBhdHRyaWJ1dGVOYW1lID0gInRyYW5zZm9ybSINCiAgICAgICAgdHlwZSA9ICJ0cmFuc2xhdGUiDQogICAgICAgIGZyb20gPSAiMjAiIHRvID0gIjAiDQogICAgICAgIGJlZ2luID0gIjBzIiBkdXIgPSAiMC42cyINCiAgICAgICAgcmVwZWF0Q291bnQgPSAiaW5kZWZpbml0ZSINCiAgICAgICAgYWRkaXRpdmUgPSJzdW0iLz4NCiAgICA8L3JlY3Q+DQogIDwvZz4NCjwvc3ZnPg0K";
  }

  //
  //C# encoded date for the 'LoremIpsum' string.
  //
  function getLoremIpsumEncoded()
  {
    return "TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4gUHJvaW4gaWQgdm9sdXRwYXQgc2FwaWVuLiBGdXNjZSBldCB2ZWxpdCBhIHRvcnRvciBmYXVjaWJ1cyBwb3J0dGl0b3IgaW4gZXUgZXJhdC4gTnVuYyBtb2xlc3RpZSBkdWkgY29uc2VjdGV0dXIgYXJjdSBzYWdpdHRpcywgc2l0IGFtZXQgc2VtcGVyIG1ldHVzIHRlbXB1cy4gVml2YW11cyBmcmluZ2lsbGEgZGlhbSBlZ2VzdGFzIG51bmMgZmV1Z2lhdCB2ZWhpY3VsYS4gRG9uZWMgYWMgZWxpdCBldCBlbGl0IHZ1bHB1dGF0ZSBmZXJtZW50dW0gZXQgYXQgZGlhbS4gTW9yYmkgdHJpc3RpcXVlIHF1YW0gYSB2ZW5lbmF0aXMgdGluY2lkdW50LiBDcmFzIGZyaW5naWxsYSBsYW9yZWV0IHVybmEgaWQgdWx0cmljaWVzLiBOYW0gdml0YWUgbWFzc2Egb3JuYXJlLCBsYWNpbmlhIG5pYmggaWQsIHBoYXJldHJhIGxpZ3VsYS4gTnVuYyBwcmV0aXVtIHZvbHV0cGF0IG51bGxhLCBldCB1bHRyaWNpZXMgZXJvcyBvcm5hcmUgc2l0IGFtZXQuIE51bGxhbSB1bGxhbWNvcnBlciBkdWkgZXJvcywgbmVjIHNvZGFsZXMgZXggcGVsbGVudGVzcXVlIHZlbC4gQWVuZWFuIGZlcm1lbnR1bSwgdG9ydG9yIHZpdGFlIHByZXRpdW0gdmVzdGlidWx1bSwgbmlzaSBzYXBpZW4gc29sbGljaXR1ZGluIHJpc3VzLCBpbiBhbGlxdWV0IHR1cnBpcyBsZWN0dXMgYmxhbmRpdCBsYWN1cy4gRHVpcyBwbGFjZXJhdCBsaWJlcm8gYXQgaXBzdW0gZnJpbmdpbGxhLCBzaXQgYW1ldCBwb3N1ZXJlIGxpZ3VsYSB0ZW1wb3IuDQogTnVuYyBhY2N1bXNhbiBhbnRlIGEgbWkgZGljdHVtIGN1cnN1cyBuZWMgZXUgb3JjaS5OdWxsYW0gY29uZGltZW50dW0gYXVndWUgbmVjIHRlbXBvciBhbGlxdWFtLk1hZWNlbmFzIGRhcGlidXMsIHZlbGl0IHNpdCBhbWV0IHJob25jdXMgdWx0cmljaWVzLCBuZXF1ZSBuaWJoIGZpbmlidXMgdHVycGlzLCBuZWMgc3VzY2lwaXQgbnVuYyBkdWkgYXQgbmVxdWUuQ3VtIHNvY2lpcyBuYXRvcXVlIHBlbmF0aWJ1cyBldCBtYWduaXMgZGlzIHBhcnR1cmllbnQgbW9udGVzLCBuYXNjZXR1ciByaWRpY3VsdXMgbXVzLk1hZWNlbmFzIHBvcnRhIGZyaW5naWxsYSBzb2RhbGVzLk51bGxhIHVsdHJpY2VzLCBtZXR1cyBzZWQgbGFjaW5pYSBwbGFjZXJhdCwgbWF1cmlzIG1hc3NhIGltcGVyZGlldCBpcHN1bSwgZXUgbGFvcmVldCBpcHN1bSBkaWFtIG5lYyBkaWFtLlZpdmFtdXMgY3Vyc3VzIG1vbGVzdGllIHB1cnVzIHNlZCBhbGlxdWV0LkFsaXF1YW0gc2l0IGFtZXQgYmxhbmRpdCBkb2xvci5OdWxsYW0gaWFjdWxpcyBzb2RhbGVzIHZlbGl0IGV0IHByZXRpdW0uUXVpc3F1ZSB0ZW1wb3IgYXVndWUgdmVsIGxpZ3VsYSBtb2xlc3RpZSBzYWdpdHRpcy5QaGFzZWxsdXMgZXQgc2VtIGFjIGRpYW0gcmhvbmN1cyBjb21tb2RvLk5hbSBiaWJlbmR1bSB2ZWxpdCBuZWMgbWFnbmEgY3Vyc3VzLCBub24gbW9sZXN0aWUgcmlzdXMgdWxsYW1jb3JwZXIuRXRpYW0gc29kYWxlcyBmZXJtZW50dW0gcHVydXMgYWMgb3JuYXJlLlZlc3RpYnVsdW0gYW50ZSBpcHN1bSBwcmltaXMgaW4gZmF1Y2lidXMgb3JjaSBsdWN0dXMgZXQgdWx0cmljZXMgcG9zdWVyZSBjdWJpbGlhIEN1cmFlOyBOdWxsYSBvcmNpIHNlbSwgbGFjaW5pYSBhIG51bmMgYSwgZmFjaWxpc2lzIHByZXRpdW0gYXVndWUuDQogQWVuZWFuIGFjY3Vtc2FuIGdyYXZpZGEgZXggYWMgdWxsYW1jb3JwZXIuRnVzY2UgYWxpcXVhbSBmZWxpcyBzZWQgaWFjdWxpcyBjb252YWxsaXMuU2VkIGV0IG9kaW8gc2VkIG1hZ25hIGNvbW1vZG8gdmVuZW5hdGlzIGEgZXQgbWF1cmlzLkNyYXMgbmVjIHRpbmNpZHVudCBsYWN1cy5Eb25lYyBhdWN0b3Igc2VtcGVyIHZvbHV0cGF0LlZpdmFtdXMgdmVoaWN1bGEgcGVsbGVudGVzcXVlIGRpYW0sIHByZXRpdW0gbWF4aW11cyBsYWN1cy5FdGlhbSB2ZWwgcXVhbSBldCBudW5jIHByZXRpdW0gcmhvbmN1cy5FdGlhbSBhdWd1ZSBvZGlvLCBwcmV0aXVtIGluIHRpbmNpZHVudCBzaXQgYW1ldCwgY29uZGltZW50dW0gbm9uIGVyb3MuRG9uZWMgaW1wZXJkaWV0IG9yY2kgdml2ZXJyYSBlcmF0IHZvbHV0cGF0IHZlc3RpYnVsdW0uQ3VyYWJpdHVyIGVnZXN0YXMgYXVndWUgb2Rpbywgbm9uIGltcGVyZGlldCBkaWFtIHNhZ2l0dGlzIGlkLkZ1c2NlIG1vbGxpcywgZmVsaXMgcXVpcyBsYW9yZWV0IHNhZ2l0dGlzLCBlbGl0IGV4IGludGVyZHVtIGp1c3RvLCBpZCBlZ2VzdGFzIHB1cnVzIG1pIHZlbCBqdXN0by5TdXNwZW5kaXNzZSBjb25kaW1lbnR1bSBtaSB2ZWwgY29uc2VjdGV0dXIgcnV0cnVtLg0KIEZ1c2NlIGluIGx1Y3R1cyBuaXNsLkN1cmFiaXR1ciBhdCBtb2xlc3RpZSBhbnRlLlZpdmFtdXMgcG9zdWVyZSBlbGVpZmVuZCBjb25zZWN0ZXR1ci5NYWVjZW5hcyBvcm5hcmUgZWdlc3RhcyBuaXNsLCBuZWMgdmVuZW5hdGlzIGxlbyB2aXZlcnJhIHF1aXMuTWFlY2VuYXMgdmVsIG9kaW8gYmliZW5kdW0sIHRyaXN0aXF1ZSBuaWJoIGV0LCB2ZW5lbmF0aXMgbnVsbGEuVmVzdGlidWx1bSB2aXRhZSBkYXBpYnVzIG51bGxhLCBxdWlzIHZ1bHB1dGF0ZSBlcm9zLlBoYXNlbGx1cyB2ZWwgdGVsbHVzIGV1IGVuaW0gb3JuYXJlIGx1Y3R1cyBldSBpbiBuZXF1ZS5OYW0gdm9sdXRwYXQgZXN0IHNpdCBhbWV0IGNvbmd1ZSB2b2x1dHBhdC5FdGlhbSBjb25zZXF1YXQgdml0YWUgbWkgaW4gc29sbGljaXR1ZGluLkRvbmVjIHNlbXBlciBsb3JlbSBlZ2V0IGVzdCB0aW5jaWR1bnQgZWdlc3Rhcy5EdWlzIHNpdCBhbWV0IGVzdCB0b3J0b3IuUHJvaW4gYXQgYmliZW5kdW0ganVzdG8sIHNpdCBhbWV0IGNvbmd1ZSB0ZWxsdXMuUGhhc2VsbHVzIGltcGVyZGlldCBudWxsYSBpZCBhdWd1ZSBjb25kaW1lbnR1bSB0cmlzdGlxdWUuTWFlY2VuYXMgZmluaWJ1cyBtZXR1cyBpbiBlbGl0IGJsYW5kaXQsIG5vbiB2ZWhpY3VsYSBzYXBpZW4gbG9ib3J0aXMuVml2YW11cyBydXRydW0gbGlndWxhIHZlbCBudW5jIHBlbGxlbnRlc3F1ZSBwcmV0aXVtLg==";
  }

  function getLoremIpsum()
  {
    return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id volutpat sapien. Fusce et velit a tortor faucibus porttitor in eu erat. Nunc molestie dui consectetur arcu sagittis, sit amet semper metus tempus. Vivamus fringilla diam egestas nunc feugiat vehicula. Donec ac elit et elit vulputate fermentum et at diam. Morbi tristique quam a venenatis tincidunt. Cras fringilla laoreet urna id ultricies. Nam vitae massa ornare, lacinia nibh id, pharetra ligula. Nunc pretium volutpat nulla, et ultricies eros ornare sit amet. Nullam ullamcorper dui eros, nec sodales ex pellentesque vel. Aenean fermentum, tortor vitae pretium vestibulum, nisi sapien sollicitudin risus, in aliquet turpis lectus blandit lacus. Duis placerat libero at ipsum fringilla, sit amet posuere ligula tempor.\r\n Nunc accumsan ante a mi dictum cursus nec eu orci.Nullam condimentum augue nec tempor aliquam.Maecenas dapibus, velit sit amet rhoncus ultricies, neque nibh finibus turpis, nec suscipit nunc dui at neque.Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Maecenas porta fringilla sodales.Nulla ultrices, metus sed lacinia placerat, mauris massa imperdiet ipsum, eu laoreet ipsum diam nec diam.Vivamus cursus molestie purus sed aliquet.Aliquam sit amet blandit dolor.Nullam iaculis sodales velit et pretium.Quisque tempor augue vel ligula molestie sagittis.Phasellus et sem ac diam rhoncus commodo.Nam bibendum velit nec magna cursus, non molestie risus ullamcorper.Etiam sodales fermentum purus ac ornare.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla orci sem, lacinia a nunc a, facilisis pretium augue.\r\n Aenean accumsan gravida ex ac ullamcorper.Fusce aliquam felis sed iaculis convallis.Sed et odio sed magna commodo venenatis a et mauris.Cras nec tincidunt lacus.Donec auctor semper volutpat.Vivamus vehicula pellentesque diam, pretium maximus lacus.Etiam vel quam et nunc pretium rhoncus.Etiam augue odio, pretium in tincidunt sit amet, condimentum non eros.Donec imperdiet orci viverra erat volutpat vestibulum.Curabitur egestas augue odio, non imperdiet diam sagittis id.Fusce mollis, felis quis laoreet sagittis, elit ex interdum justo, id egestas purus mi vel justo.Suspendisse condimentum mi vel consectetur rutrum.\r\n Fusce in luctus nisl.Curabitur at molestie ante.Vivamus posuere eleifend consectetur.Maecenas ornare egestas nisl, nec venenatis leo viverra quis.Maecenas vel odio bibendum, tristique nibh et, venenatis nulla.Vestibulum vitae dapibus nulla, quis vulputate eros.Phasellus vel tellus eu enim ornare luctus eu in neque.Nam volutpat est sit amet congue volutpat.Etiam consequat vitae mi in sollicitudin.Donec semper lorem eget est tincidunt egestas.Duis sit amet est tortor.Proin at bibendum justo, sit amet congue tellus.Phasellus imperdiet nulla id augue condimentum tristique.Maecenas finibus metus in elit blandit, non vehicula sapien lobortis.Vivamus rutrum ligula vel nunc pellentesque pretium.";
  }

  function getDifficultChars()
  {
    return "< _ - > & ! @ %&/() 0 ? ' \" \r\n \t äüöÄÜÖß Å å Æ æ Ø ø « » Ğ İ Ş ğ ı ş Ð Ý Þ ð ý þ Ƞ ȡ Ȣ ȣ Ȥ ȥ Ȧ ȧ Ȩ ȩ Ȫ ȫ Ȭ ȭ Ȯ ȯ Ȱ ȱ Ȳ ȳ ȴ ȵ ȶ ȷ ȸ ȹ Ⱥ Ȼ ȼ Ƚ Ⱦ ȿ ɀ Ɂ ɂ Ƀ Ʉ Ʌ Ɇ ɇ Ɉ ɉ Ɋ ɋ Ɍ ɍ Ɏ ɏ ɐ ɑ ɒ ɓ ɔ ɕ ɖ ɗ ɘ ə ɚ ɛ ɜ ɝ ɞ ɟ Ơ ơ Ƣ ƣ Ƥ ƥ Ʀ Ƨ ƨ Ʃ ƪ ƫ Ƭ ƭ Ʈ Ư ư Ʊ Ʋ Ƴ ƴ Ƶ ƶ Ʒ Ƹ ƹ ƺ ƻ Ƽ ƽ ƾ ƿ Š š Ţ ţ Ť ť Ŧ ŧ Ũ ũ Ū ū Ŭ ŭ Ů ů Ű ű Ų ų Ŵ ŵ Ŷ ŷ Ÿ Ź ź Ż ż Ž ž ſ  ¡ ¢ £ ¤ ¥ ¦ § ¨ © ª « ¬ ­ ® ¯ ° ± ² ³ ´ µ ¶ · ¸ ¹ º » ¼ ½ ¾ ¿";
  }


}//END module

