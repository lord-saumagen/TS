var TS;
(function (TS) {
    "use strict";

    (function (Utils) {
        var NameValue = (function () {
            function NameValue(name, value) {
                if (TS.Utils.TypeInfo.isNullUndefOrWhiteSpace(name)) {
                    throw new TS.ArgumentNullUndefOrWhiteSpaceException("name", "Argument 'name' must not be null, undefined or whitespace in the constructor of 'TS.Utils.NameValue'.");
                }
                this._name = name;
                this._value = value;
            }
            Object.defineProperty(NameValue.prototype, "name", {
                get: function () {
                    return this._name;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(NameValue.prototype, "value", {
                get: function () {
                    return this._value;
                },
                enumerable: true,
                configurable: true
            });
            return NameValue;
        })();
        Utils.NameValue = NameValue;

        var Compare = (function () {
            function Compare() {
            }
            Compare.objects = function (first, second, depth) {
                if (typeof depth === "undefined") { depth = 0; }
                var _index;
                var _firstKeyValueArray;
                var _secondKeyValueArray;

                if (!TS.Utils.TypeInfo.isObject(first) || !TS.Utils.TypeInfo.isObject(second)) {
                    return false;
                }

                _firstKeyValueArray = createKeyValueArray(first);
                _secondKeyValueArray = createKeyValueArray(second);

                if (_firstKeyValueArray.length != _secondKeyValueArray.length) {
                    return false;
                }

                _firstKeyValueArray = sortNameValueArray(_firstKeyValueArray);
                _secondKeyValueArray = sortNameValueArray(_secondKeyValueArray);

                for (_index = 0; _index < _firstKeyValueArray.length; _index++) {
                    if (_firstKeyValueArray[_index].name != _secondKeyValueArray[_index].name) {
                        return false;
                    }

                    if (!compareAny(_firstKeyValueArray[_index].value, _secondKeyValueArray[_index].value, depth)) {
                        return false;
                    }
                }

                return true;
            };

            Compare.regularExpressions = function (first, second) {
                if (!TS.Utils.TypeInfo.isRegEx(first) || !TS.Utils.TypeInfo.isRegEx(second)) {
                    return false;
                }

                return first.source === second.source && first.global === second.global && first.ignoreCase === second.ignoreCase && first.multiline === second.multiline && first.sticky === second.sticky;
            };

            Compare.functions = function (first, second) {
                if (!TS.Utils.TypeInfo.isFunction(first) || !TS.Utils.TypeInfo.isFunction(second)) {
                    return false;
                }

                if (first.length != second.length) {
                    return false;
                }

                if (first.toString() != second.toString()) {
                    return false;
                }

                return true;
            };

            Compare.arrays = function (first, second, depth) {
                if (typeof depth === "undefined") { depth = 0; }
                var _index;
                var _firstArray;
                var _secondArray;

                if (!TS.Utils.TypeInfo.isArray(first) || !TS.Utils.TypeInfo.isArray(second)) {
                    return false;
                }

                _firstArray = TS.Utils.compactArray(first);
                _secondArray = TS.Utils.compactArray(second);

                if (_firstArray.length != _secondArray.length) {
                    return false;
                }

                _firstArray = sortArray(_firstArray);
                _secondArray = sortArray(_secondArray);

                for (_index = 0; _index < _firstArray.length; _index++) {
                    if (!compareAny(_firstArray[_index], _secondArray[_index], depth)) {
                        return false;
                    }
                }

                return true;
            };
            return Compare;
        })();
        Utils.Compare = Compare;

        function compareAny(first, second, depth) {
            if (typeof depth === "undefined") { depth = 0; }
            var _firstType;
            var _secondType;

            _firstType = TS.Utils.TypeInfo.getType(first);
            _secondType = TS.Utils.TypeInfo.getType(second);

            if (_firstType != _secondType) {
                return false;
            }

            switch (_firstType) {
                case 2 /* ARRAY */: {
                    if ((depth - 1) >= 0) {
                        return Compare.arrays(first, second, depth - 1);
                    }

                    return true;
                }
                case 3 /* BOOLEAN_OBJECT */:
                case 10 /* NUMBER_OBJECT */:
                case 15 /* STRING_OBJECT */: {
                    return first.valueOf() === second.valueOf();
                }
                case 12 /* OBJECT */: {
                    if ((depth - 1) >= 0) {
                        return Compare.objects(first, second, depth - 1);
                    }

                    return true;
                }
                case 14 /* REGEX */: {
                    return Compare.regularExpressions(first, second);
                }
                case 5 /* DATE */: {
                    return first.valueOf() === second.valueOf();
                }
                case 9 /* NULL */:
                case 17 /* UNDEFINED */:
                case 7 /* NAN */: {
                    return true;
                }
                case 4 /* BOOLEAN_VALUE */:
                case 11 /* NUMBER_VALUE */:
                case 16 /* STRING_VALUE */: {
                    return first === second;
                }
                case 6 /* FUNCTION */:
                     {
                        return Compare.functions(first, second);
                    }
                    defaul:
                     {
                        throw new TS.InvalidOperationException("The function 'TS.Utils.Compare.any' failed for the arguments of type: '" + typeof (first) + "'. There is no comparator defined for that type.");
                    }
            }
        }

        function sortArray(arr) {
            var _objArray;
            var _arrArray;
            var _resultArray;
            var _index;

            if (TS.Utils.TypeInfo.isNullOrUndefined(arr)) {
                throw new TS.ArgumentNullOrUndefinedException("arr", "Argument 'arr' must not be null or undefined in function 'TS.Utils.Compare.sortArray'.");
            }

            if (!TS.Utils.TypeInfo.isArray(arr)) {
                throw new TS.InvalidTypeException("arr", arr, "Argument 'arr' must be an array in function 'TS.Utils.Compare.sortArray'.");
            }

            _objArray = new Array();
            _arrArray = new Array();
            _resultArray = new Array();

            for (_index = 0; _index < arr.length; _index++) {
                if (TS.Utils.TypeInfo.isObject(arr[_index])) {
                    _objArray.push(arr[_index]);
                    continue;
                }

                if (TS.Utils.TypeInfo.isArray(arr[_index])) {
                    _arrArray.push(arr[_index]);
                    continue;
                }

                _resultArray.push(arr[_index]);
            }

            if (_objArray.length > 1) {
                _objArray = _objArray.sort(function (firstElement, secondElement) {
                    var _firstElementHash;
                    var _secondElementHast;

                    _firstElementHash = createObjInterfaceHash(firstElement);
                    _secondElementHast = createObjInterfaceHash(secondElement);

                    if (_firstElementHash == _secondElementHast) {
                        return 0;
                    }

                    if (_firstElementHash > _secondElementHast) {
                        return 1;
                    }

                    return -1;
                });
            }

            if (_arrArray.length > 1) {
                _arrArray = _arrArray.sort(function (firstElement, secondElement) {
                    if (firstElement.length == secondElement.length) {
                        return 0;
                    }

                    if (firstElement.length > secondElement.length) {
                        return 1;
                    }

                    return -1;
                });
            }

            _resultArray = _resultArray.sort();
            _resultArray = Array.prototype.concat(_objArray, _arrArray, _resultArray);
            return _resultArray;
        }

        function createObjInterfaceHash(obj) {
            var _keyArray;

            if (TS.Utils.TypeInfo.isNullOrUndefined(obj)) {
                throw new TS.ArgumentNullOrUndefinedException("obj", "Argument 'arr' must not be null or undefined in function 'TS.Utils.Compare.crateObjHash'.");
            }

            if (!TS.Utils.TypeInfo.isObject(obj)) {
                throw new TS.InvalidTypeException("obj", obj, "Argument 'obj' must be of type 'Object' in function 'TS.Utils.Compare.crateObjHash'.");
            }

            _keyArray = Object.keys(obj);
            _keyArray = _keyArray.sort();

            return _keyArray.join();
        }

        function sortNameValueArray(arr) {
            var _resultArray;

            if (TS.Utils.TypeInfo.isNullOrUndefined(arr)) {
                throw new TS.ArgumentNullOrUndefinedException("arr", "Argument 'arr' must not be null or undefined in function 'TS.Utils.Compare.SortKeyValueArray'.");
            }

            _resultArray = arr.sort(function (firstItem, secondItem) {
                if (firstItem.name == secondItem.name) {
                    return 0;
                }

                if (firstItem.name > secondItem.name) {
                    return 1;
                }

                return -1;
            });

            return _resultArray;
        }

        function createKeyValueArray(obj) {
            var _key;
            var _returnArray;

            if (TS.Utils.TypeInfo.isNullOrUndefined(obj)) {
                throw new TS.ArgumentNullOrUndefinedException("obj", "Argument 'obj' must not be null or undefined in function 'TS.Utils.Compare.CreateKeyValueArray'.");
            }

            _returnArray = new Array();

            for (_key in obj) {
                _returnArray.push(new NameValue(_key, obj[_key]));
            }

            return _returnArray;
        }
    })(TS.Utils || (TS.Utils = {}));
    var Utils = TS.Utils;
})(TS || (TS = {}));
