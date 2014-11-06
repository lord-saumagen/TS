/// <reference path="../scripts/qunit.d.ts" />
/// <reference path="../scripts/jquery.d.ts" />
/// <reference path="../utils/utils.ts" />
/// <reference path="../utils/typeinfo.ts" />
/// <reference path="../linq/enumerable.ts" />

"use strict";

module TS_Utils_test
{
  declare var document;
  var _arguments;

  QUnit.module("TS.Utils",
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


  QUnit.test("createGUID", (assert) =>
  {
    var _GUIDArray: Array<string>;
    var _index: number;

    _GUIDArray = new Array<string>();

    for (_index = 0; _index < 1000; _index++)
    {
      _GUIDArray.push(TS.Utils.createGUID());
    }//END for

    assert.equal(_GUIDArray.length, 1000, "Should create an array with 1000 GUIDs.");

    _GUIDArray = TS.Linq.Extensions.distinct(TS.Linq.Enumerable.fromArray(_GUIDArray)).toArray();
    assert.equal(_GUIDArray.length, 1000, "All elements in the array should be unique.");
  });

  QUnit.test("HTMLCollectionToArray", (assert) =>
  {
    var _HTMLArray: Array<HTMLElement>;
    var _HTMLEnumearable: TS.Linq.Enumerable<HTMLElement>;
    var _htmlElement: HTMLElement;
    var _headElement: HTMLElement;
    var _bodyElement: HTMLElement;

    _HTMLArray = TS.Utils.HTMLCollectionToArray((<HTMLDocument> document).all);

    assert.ok(_HTMLArray.length > 1, "Should return an array with more than one element.");

    _HTMLEnumearable = TS.Linq.Extensions.fromArray(_HTMLArray);

    _htmlElement = _HTMLEnumearable.where(_ELE => _ELE.tagName.toLowerCase() == "html").single();
    _headElement = _HTMLEnumearable.where(_ELE => _ELE.tagName.toLowerCase() == "head").single();
    _bodyElement = _HTMLEnumearable.where(_ELE => _ELE.tagName.toLowerCase() == "body").single();

    assert.ok(_htmlElement != null && _headElement != null && _bodyElement != null, "Schould at least consist of a 'html', 'head' and 'body' element.");
  });

} 