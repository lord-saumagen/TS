var TS;
(function (TS) {
    "use strict";

    (function (Utils) {
        function HTMLCollectionToArray(collection) {
            var _index;
            var _resultArray;

            if (TS.Utils.TypeInfo.isNullOrUndefined(collection)) {
                throw new TS.ArgumentNullException("collection", "Argument 'collection' must not be null in function 'HTMLCollectionToArray'.");
            }

            if (TS.Utils.TypeInfo.isNullOrUndefined(collection.length)) {
                throw new TS.InvalidTypeException("collection", collection, "Argument 'collection' has the wrong type in function 'HTMLCollectionToArray'.");
            }

            _resultArray = new Array();

            for (_index = 0; _index < collection.length; _index++) {
                _resultArray.push(collection[_index]);
            }

            return _resultArray;
        }
        Utils.HTMLCollectionToArray = HTMLCollectionToArray;

        function compactArray(arr) {
            if (!TS.Utils.TypeInfo.isArray(arr)) {
                return [];
            }

            if (arr.length == 0) {
                return [];
            }

            return arr.filter(function (element) {
                return element !== undefined && element != null;
            });
        }
        Utils.compactArray = compactArray;

        function normalizePath(path) {
            var _returnPath;

            if (TS.Utils.TypeInfo.isNullUndefOrWhiteSpace(path)) {
                return "";
            }

            _returnPath = new String(path);

            while (_returnPath.indexOf("\\") > -1) {
                _returnPath = _returnPath.replace("\\", "/");
            }

            return _returnPath.toString();
        }
        Utils.normalizePath = normalizePath;

        function fillLeft(source, fillChar, length) {
            var _fillString;
            var _resultString;

            if (TS.Utils.TypeInfo.isNullUndefOrEmpty(fillChar)) {
                return new String(source).toString();
            }

            if (!TS.Utils.TypeInfo.isPositiveIntegerNumber(length)) {
                return new String(source).toString();
            }

            _fillString = fillChar;
            while (_fillString.length < length) {
                _fillString += _fillString;
            }
            _fillString = _fillString.substr(0, length);

            if (TS.Utils.TypeInfo.isNullUndefOrEmpty(source)) {
                return _fillString;
            } else {
                _fillString = _fillString.substr(0, length - source.length);
                _fillString += source;
                return _fillString;
            }
        }
        Utils.fillLeft = fillLeft;

        function getPrototypeChainKeys(obj) {
            var _resultArray;
            var _duplicateDeleteArray;
            var _index;
            var _key;

            if (TS.Utils.TypeInfo.isNullOrUndefined(obj)) {
                throw new TS.ArgumentNullException("obj", "Argument 'obj' must not be null in function 'getPrototypeChainKeys'.");
            }

            if (!TS.Utils.TypeInfo.isObject(obj)) {
                throw new TS.InvalidTypeException("obj", obj, "Argument 'obj' must be of type 'object' in function 'getPrototypeChainKeys'.");
            }

            _resultArray = new Array();

            if (Object.getPrototypeOf(obj) != null) {
                _resultArray = _resultArray.concat(Utils.getPrototypeChainKeys(Object.getPrototypeOf(obj)));
            }

            for (_key in obj) {
                _resultArray.push(_key);
            }

            _resultArray = _resultArray.sort();

            if (_resultArray.length < 2) {
                return _resultArray;
            }

            _duplicateDeleteArray = new Array();

            for (_index = 0; _index < _resultArray.length - 1; _index++) {
                if (_resultArray[_index] == _resultArray[_index + 1]) {
                    _duplicateDeleteArray.push(_index);
                }
            }

            for (_index = 0; _index < _duplicateDeleteArray.length; _index++) {
                delete _resultArray[_duplicateDeleteArray[_index]];
            }

            _resultArray = TS.Utils.compactArray(_resultArray);
            return _resultArray;
        }
        Utils.getPrototypeChainKeys = getPrototypeChainKeys;
    })(TS.Utils || (TS.Utils = {}));
    var Utils = TS.Utils;
})(TS || (TS = {}));
