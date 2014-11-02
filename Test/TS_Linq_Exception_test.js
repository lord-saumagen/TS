"use strict";
var TS_Linq_Exception_test;
(function (TS_Linq_Exception_test) {
    QUnit.module("TS.Linq.Exceptions", {
        setupOnce: function () {
        },
        setup: function () {
        },
        teardown: function () {
        },
        teardownOnce: function () {
        }
    });

    QUnit.test("SelectorException", function (assert) {
        var ExceptionMessage = "TS.Linq.SelectorException message";

        assert.throws(function () {
            throw new TS.Linq.SelectorException(function (item) {
                return item;
            }, "AnItem", ExceptionMessage);
        }, new TS.Linq.SelectorException(function (item) {
            return item;
        }, "AnItem", ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

        assert.throws(function () {
            throw new TS.Linq.SelectorException(function (item) {
                return item;
            }, "AnItem", ExceptionMessage, GetInnerException());
        }, function (err) {
            if (err.message == ExceptionMessage) {
                if (CheckInnerException(err)) {
                    return true;
                }
            }
            return false;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });

    QUnit.test("EmptyEnumerableException", function (assert) {
        var ExceptionMessage = "TS.Linq.EmptyEnumerableException message";

        assert.throws(function () {
            throw new TS.Linq.EmptyEnumerableException(TS.Linq.Extensions.empty(), ExceptionMessage);
        }, new TS.Linq.EmptyEnumerableException(TS.Linq.Extensions.empty(), ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

        assert.throws(function () {
            throw new TS.Linq.EmptyEnumerableException(TS.Linq.Extensions.empty(), ExceptionMessage, GetInnerException());
        }, function (err) {
            if (err.message == ExceptionMessage) {
                if (CheckInnerException(err)) {
                    return true;
                }
            }
            return false;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });

    function GetInnerException() {
        return new TS.Exception("Inner exception message");
    }

    function CheckInnerException(exception) {
        if (TS.Utils.TypeInfo.isNullOrUndefined(TS.Exception)) {
            return false;
        }

        if (TS.Utils.TypeInfo.isNullOrUndefined(exception.innerException)) {
            return false;
        }

        if (exception.innerException.message == "Inner exception message") {
            return true;
        }
    }
})(TS_Linq_Exception_test || (TS_Linq_Exception_test = {}));
