var TS;
(function (TS) {
    "use strict";

    (function (Utils) {
        (function (TypeEnum) {
            TypeEnum[TypeEnum["UNKNOWN"] = 0] = "UNKNOWN";
            TypeEnum[TypeEnum["ARGUMENTS"] = 1] = "ARGUMENTS";
            TypeEnum[TypeEnum["ARRAY"] = 2] = "ARRAY";
            TypeEnum[TypeEnum["BOOLEAN_OBJECT"] = 3] = "BOOLEAN_OBJECT";
            TypeEnum[TypeEnum["BOOLEAN_VALUE"] = 4] = "BOOLEAN_VALUE";
            TypeEnum[TypeEnum["DATE"] = 5] = "DATE";
            TypeEnum[TypeEnum["FUNCTION"] = 6] = "FUNCTION";
            TypeEnum[TypeEnum["NAN"] = 7] = "NAN";
            TypeEnum[TypeEnum["NEGATIVE_INFINITY"] = 8] = "NEGATIVE_INFINITY";
            TypeEnum[TypeEnum["NULL"] = 9] = "NULL";
            TypeEnum[TypeEnum["NUMBER_OBJECT"] = 10] = "NUMBER_OBJECT";
            TypeEnum[TypeEnum["NUMBER_VALUE"] = 11] = "NUMBER_VALUE";
            TypeEnum[TypeEnum["OBJECT"] = 12] = "OBJECT";
            TypeEnum[TypeEnum["POSITIVE_INFINITY"] = 13] = "POSITIVE_INFINITY";
            TypeEnum[TypeEnum["REGEX"] = 14] = "REGEX";
            TypeEnum[TypeEnum["STRING_OBJECT"] = 15] = "STRING_OBJECT";
            TypeEnum[TypeEnum["STRING_VALUE"] = 16] = "STRING_VALUE";
            TypeEnum[TypeEnum["UNDEFINED"] = 17] = "UNDEFINED";
        })(Utils.TypeEnum || (Utils.TypeEnum = {}));
        var TypeEnum = Utils.TypeEnum;

        var TypeInfo = (function () {
            function TypeInfo() {
            }
            TypeInfo.getType = function (obj) {
                if (this.isArguments(obj)) {
                    return 1 /* ARGUMENTS */;
                }

                if (this.isArray(obj)) {
                    return 2 /* ARRAY */;
                }

                if (this.isBooleanObject(obj)) {
                    return 3 /* BOOLEAN_OBJECT */;
                }

                if (this.isBooleanValue(obj)) {
                    return 4 /* BOOLEAN_VALUE */;
                }

                if (this.isDate(obj)) {
                    return 5 /* DATE */;
                }

                if (this.isFunction(obj)) {
                    return 6 /* FUNCTION */;
                }

                if (this.isNull(obj)) {
                    return 9 /* NULL */;
                }

                if (this.isNaN(obj)) {
                    return 7 /* NAN */;
                }

                if (this.isNegativInfiniteNumber(obj)) {
                    return 8 /* NEGATIVE_INFINITY */;
                }

                if (this.isPositiveInfiniteNumber(obj)) {
                    return 13 /* POSITIVE_INFINITY */;
                }

                if (this.isNumberObject(obj)) {
                    return 10 /* NUMBER_OBJECT */;
                }

                if (this.isNumberValue(obj)) {
                    return 11 /* NUMBER_VALUE */;
                }

                if (this.isRegEx(obj)) {
                    return 14 /* REGEX */;
                }

                if (this.isStringObject(obj)) {
                    return 15 /* STRING_OBJECT */;
                }

                if (this.isStringValue(obj)) {
                    return 16 /* STRING_VALUE */;
                }

                if (this.isUndefined(obj)) {
                    return 17 /* UNDEFINED */;
                }

                if (this.isObject(obj)) {
                    return 12 /* OBJECT */;
                }

                return 0 /* UNKNOWN */;
            };

            TypeInfo.isArguments = function (source) {
                if (this.isObject(source)) {
                    return source.toString().toLowerCase().indexOf("arguments") > -1;
                }

                return false;
            };

            TypeInfo.isArray = function (source) {
                if (this.isNullOrUndefined(source)) {
                    return false;
                }

                return Array.isArray(source);
            };

            TypeInfo.isBoolean = function (source) {
                return this.isBooleanObject(source) || this.isBooleanValue(source);
            };

            TypeInfo.isBooleanObject = function (source) {
                if (!this.isObject(source)) {
                    return false;
                }

                return typeof (source.valueOf()) == "boolean";
            };

            TypeInfo.isBooleanValue = function (source) {
                if (this.isNullOrUndefined(source) || this.isObject(source)) {
                    return false;
                }

                return typeof (source) == "boolean";
            };

            TypeInfo.isDate = function (source) {
                if (this.isNullOrUndefined(source)) {
                    return false;
                }

                return Object.prototype.toString.call(source).indexOf("Date") > 0;
            };

            TypeInfo.isFunction = function (source) {
                if (this.isNullOrUndefined(source)) {
                    return false;
                }

                return typeof (source) == "function";
            };

            TypeInfo.isIntegerNumber = function (source) {
                if (this.isNumber(source) && (Math.floor(source) == source)) {
                    return true;
                }

                return false;
            };

            TypeInfo.isNaN = function (source) {
                if (!this.isNullOrUndefined(source) && (typeof (source) == "number") && isNaN(source)) {
                    return true;
                }

                return false;
            };

            TypeInfo.isNull = function (source) {
                return source === null;
            };

            TypeInfo.isNullOrUndefined = function (source) {
                return this.isUndefined(source) || this.isNull(source);
            };

            TypeInfo.isNullUndefOrEmpty = function (source) {
                if (this.isUndefined(source)) {
                    return true;
                }

                if (this.isNull(source)) {
                    return true;
                }

                if (Array.isArray(source)) {
                    return source.length == 0;
                }

                if (TS.Utils.TypeInfo.isString(source)) {
                    return String(source).length == 0;
                }

                return false;
            };

            TypeInfo.isNullUndefOrWhiteSpace = function (source) {
                if (this.isNullOrUndefined(source)) {
                    return true;
                }

                if (!this.isNull(source) && !this.isString(source)) {
                    throw new TS.InvalidTypeException("source", source, "Argument 'source' in function 'isNullUndefOrWhiteSpace' must either be a null value, undefined or a valid string.");
                }

                if (source.trim().length == 0) {
                    return true;
                }

                return false;
            };

            TypeInfo.isNumber = function (source) {
                return this.isNumberObject(source) || this.isNumberValue(source);
            };

            TypeInfo.isNumberObject = function (source) {
                if (!this.isObject(source)) {
                    return false;
                }

                return typeof (source.valueOf()) == "number";
            };

            TypeInfo.isNumberValue = function (source) {
                if (this.isNullOrUndefined(source) || this.isObject(source)) {
                    return false;
                }

                if (typeof (source) == "number") {
                    if (this.isNaN(source)) {
                        return false;
                    }

                    return true;
                }

                return false;
            };

            TypeInfo.isInfiniteNumber = function (source) {
                return this.isNumberValue(source) && (source === Number.POSITIVE_INFINITY || source === Number.NEGATIVE_INFINITY);
            };

            TypeInfo.isPositiveInfiniteNumber = function (source) {
                return this.isNumberValue(source) && (source === Number.POSITIVE_INFINITY);
            };

            TypeInfo.isNegativInfiniteNumber = function (source) {
                return this.isNumberValue(source) && (source === Number.NEGATIVE_INFINITY);
            };

            TypeInfo.isObject = function (source) {
                if (this.isNullOrUndefined(source)) {
                    return false;
                }

                return typeof (source) == "object";
            };

            TypeInfo.isPositiveIntegerNumber = function (source) {
                if (this.isIntegerNumber(source)) {
                    return source > -1;
                }

                return false;
            };

            TypeInfo.isRegEx = function (source) {
                if (this.isNullOrUndefined(source)) {
                    return false;
                }

                return Object.prototype.toString.call(source).indexOf("RegExp") > 0;
            };

            TypeInfo.isString = function (source) {
                return this.isStringObject(source) || this.isStringValue(source);
            };

            TypeInfo.isStringObject = function (source) {
                if (!this.isObject(source)) {
                    return false;
                }

                return typeof (source.valueOf()) == "string";
            };

            TypeInfo.isStringValue = function (source) {
                if (this.isNullOrUndefined(source) || this.isObject(source)) {
                    return false;
                }

                return typeof (source) == "string";
            };

            TypeInfo.isUndefined = function (source) {
                return source === undefined;
            };
            return TypeInfo;
        })();
        Utils.TypeInfo = TypeInfo;
    })(TS.Utils || (TS.Utils = {}));
    var Utils = TS.Utils;
})(TS || (TS = {}));
