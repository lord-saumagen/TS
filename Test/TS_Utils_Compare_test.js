"use strict";
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TS_Utils_Compare_test;
(function (TS_Utils_Compare_test) {
    QUnit.module("TS.Utils.Compare", {
        setupOnce: function () {
        },
        setup: function () {
        },
        teardown: function () {
        },
        teardownOnce: function () {
        }
    });

    QUnit.test("objects", function (assert) {
        var testSimpleObj1 = new SimpleObject("SimpleObjOne", "SimpleObjOneValue");
        var testSimpleObj2 = new SimpleObject("SimpleObjTwo", "SimpleObjTwoValue");

        assert.ok(!TS.Utils.Compare.objects(testSimpleObj1, testSimpleObj2, 2), "Should return false on different objects of the same type.");
        assert.ok(!TS.Utils.Compare.objects(testSimpleObj1, { name: "SimpleObjOne", value: "SimpleObjOneValue", info: function () {
            } }), "Should return false on different objects of differnt types.");
    });

    QUnit.test("functions", function (assert) {
        assert.ok(!TS.Utils.Compare.functions(function () {
            return 1;
        }, function () {
            return 2;
        }), "Should return false on different functions.");
        assert.ok(TS.Utils.Compare.functions(function () {
            return 1;
        }, function () {
            return 1;
        }), "Should return true on identical functions.");
    });

    QUnit.test("arrays", function (assert) {
        assert.ok(!TS.Utils.Compare.arrays(new Array("one", "two", "three"), new Array(1, 2, 3)), "Should return false on arrays of different type.");
        assert.ok(!TS.Utils.Compare.arrays(new Array("one", "two", "three"), new Array("four", "five", "six")), "Should return false on arrays of the same type with different values.");
        assert.ok(TS.Utils.Compare.arrays(new Array("one", "two", "three"), new Array("one", "two", "three")), "Should return true on arrays of the same type with same values.");
        assert.ok(TS.Utils.Compare.arrays(new Array("one", "two", "three"), new Array("three", "two", "one")), "Should return true on arrays of the same type with same values but in different order.");
    });

    var SimpleObject = (function () {
        function SimpleObject(name, value) {
            this.name = name;
            this.value = value;
        }
        SimpleObject.prototype.info = function () {
            return this.name + " :: " + this.value.toString();
        };
        return SimpleObject;
    })();
    TS_Utils_Compare_test.SimpleObject = SimpleObject;

    var ComplexObject = (function (_super) {
        __extends(ComplexObject, _super);
        function ComplexObject(name, value, array, innerObject) {
            _super.call(this, name, value);
            this._array = array;
            this._innerObject = innerObject;
        }
        Object.defineProperty(ComplexObject.prototype, "array", {
            get: function () {
                return this._array;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(ComplexObject.prototype, "innerObject", {
            get: function () {
                return this._innerObject;
            },
            enumerable: true,
            configurable: true
        });
        return ComplexObject;
    })(SimpleObject);
    TS_Utils_Compare_test.ComplexObject = ComplexObject;

    function createEquivObject(obj) {
        var _index;
        var _returnObj;
        var _currentKey;
        var _keyArr;

        _keyArr = TS.Utils.getPrototypeChainKeys(obj);
        _keyArr = _keyArr.concat(Object.keys(obj));
        _returnObj = {};

        if (_keyArr.length == 0) {
            return _returnObj;
        }

        while (_keyArr.length > 0) {
            _index = Math.floor(Math.random() * _keyArr.length);
            _currentKey = _keyArr[_index];

            if (TS.Utils.TypeInfo.isArray(obj[_currentKey])) {
                _returnObj[_currentKey] = new Array();

                obj[_currentKey].forEach(function (element) {
                    _returnObj[_currentKey].push(element);
                });
            } else {
                _returnObj[_currentKey] = obj[_currentKey];
            }
            delete _keyArr[_index];
            _keyArr = TS.Utils.compactArray(_keyArr);
        }

        return _returnObj;
    }
    TS_Utils_Compare_test.createEquivObject = createEquivObject;
})(TS_Utils_Compare_test || (TS_Utils_Compare_test = {}));
