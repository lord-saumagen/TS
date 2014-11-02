"use strict";
var TS_Exception_test;
(function (TS_Exception_test) {
    QUnit.module("TS.Exceptions", {
        setupOnce: function () {
        },
        setup: function () {
        },
        teardown: function () {
        },
        teardownOnce: function () {
        }
    });

    QUnit.test("ArgumentException", function (assert) {
        var ExceptionMessage = "Argument exception message";

        assert.throws(function () {
            throw new TS.ArgumentException("ArgName", 5, ExceptionMessage);
        }, new TS.ArgumentException("ArgName", 5, ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

        assert.throws(function () {
            throw new TS.ArgumentException("ArgName", 5, ExceptionMessage, GetInnerException());
        }, function (err) {
            if (err.message == ExceptionMessage) {
                if (CheckInnerException(err)) {
                    return true;
                }
            }
            return false;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });

    QUnit.test("ArgumentNullException", function (assert) {
        var ExceptionMessage = "ArgumentNull exception message";

        assert.throws(function () {
            throw new TS.ArgumentNullException("ArgName", ExceptionMessage);
        }, new TS.ArgumentNullException("ArgName", ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

        assert.throws(function () {
            throw new TS.ArgumentNullException("ArgName", ExceptionMessage, GetInnerException());
        }, function (err) {
            if (err.message == ExceptionMessage) {
                if (CheckInnerException(err)) {
                    return true;
                }
            }
            return false;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });

    QUnit.test("ArgumentNullOrUndefinedException", function (assert) {
        var ExceptionMessage = "ArgumentNullOrUndefined exception message";

        assert.throws(function () {
            throw new TS.ArgumentNullOrUndefinedException("ArgName", ExceptionMessage);
        }, new TS.ArgumentNullOrUndefinedException("ArgName", ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

        assert.throws(function () {
            throw new TS.ArgumentNullOrUndefinedException("ArgName", ExceptionMessage, GetInnerException());
        }, function (err) {
            if (err.message == ExceptionMessage) {
                if (CheckInnerException(err)) {
                    return true;
                }
            }
            return false;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });

    QUnit.test("ArgumentNullUndefOrWhiteSpaceException", function (assert) {
        var ExceptionMessage = "ArgumentNullUndefOrWhiteSpaceException exception message";

        assert.throws(function () {
            throw new TS.ArgumentNullUndefOrWhiteSpaceException("ArgName", ExceptionMessage);
        }, new TS.ArgumentNullUndefOrWhiteSpaceException("ArgName", ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

        assert.throws(function () {
            throw new TS.ArgumentNullOrUndefinedException("ArgName", ExceptionMessage, GetInnerException());
        }, function (err) {
            if (err.message == ExceptionMessage) {
                if (CheckInnerException(err)) {
                    return true;
                }
            }
            return false;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });

    QUnit.test("ArgumentOutOfRangeException", function (assert) {
        var ExceptionMessage = "ArgumentOutOfRange exception message";

        assert.throws(function () {
            throw new TS.ArgumentOutOfRangeException("ArgName", 12, ExceptionMessage);
        }, new TS.ArgumentOutOfRangeException("ArgName", 12, ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

        assert.throws(function () {
            throw new TS.ArgumentOutOfRangeException("ArgName", 12, ExceptionMessage, GetInnerException());
        }, function (err) {
            if (err.message == ExceptionMessage) {
                if (CheckInnerException(err)) {
                    return true;
                }
            }
            return false;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });

    QUnit.test("ArithmeticException", function (assert) {
        var ExceptionMessage = "Arithmetic exception message";

        assert.throws(function () {
            throw new TS.ArithmeticException(ExceptionMessage);
        }, new TS.ArithmeticException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

        assert.throws(function () {
            throw new TS.ArithmeticException(ExceptionMessage, GetInnerException());
        }, function (err) {
            if (err.message == ExceptionMessage) {
                if (CheckInnerException(err)) {
                    return true;
                }
            }
            return false;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });

    QUnit.test("DivideByZeroException", function (assert) {
        var ExceptionMessage = "Divide by zero exception message";

        assert.throws(function () {
            throw new TS.DivideByZeroException(ExceptionMessage);
        }, new TS.DivideByZeroException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

        assert.throws(function () {
            throw new TS.DivideByZeroException(ExceptionMessage, GetInnerException());
        }, function (err) {
            if (err.message == ExceptionMessage) {
                if (CheckInnerException(err)) {
                    return true;
                }
            }
            return false;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });

    QUnit.test("Exception", function (assert) {
        var ExceptionMessage = "Exception message";

        assert.throws(function () {
            throw new TS.Exception(ExceptionMessage);
        }, new TS.Exception(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

        assert.throws(function () {
            throw new TS.Exception(ExceptionMessage, GetInnerException());
        }, function (err) {
            if (err.message == ExceptionMessage) {
                if (CheckInnerException(err)) {
                    return true;
                }
            }
            return false;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });

    QUnit.test("IndexOutOfRangeException", function (assert) {
        var ExceptionMessage = "IndexOutOfRange exception message";

        assert.throws(function () {
            throw new TS.IndexOutOfRangeException(ExceptionMessage);
        }, new TS.IndexOutOfRangeException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

        assert.throws(function () {
            throw new TS.IndexOutOfRangeException(ExceptionMessage, GetInnerException());
        }, function (err) {
            if (err.message == ExceptionMessage) {
                if (CheckInnerException(err)) {
                    return true;
                }
            }
            return false;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });

    QUnit.test("InvalidCastException", function (assert) {
        var ExceptionMessage = "InvalidCast exception message";

        assert.throws(function () {
            throw new TS.InvalidCastException(ExceptionMessage);
        }, new TS.InvalidCastException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

        assert.throws(function () {
            throw new TS.InvalidCastException(ExceptionMessage, GetInnerException());
        }, function (err) {
            if (err.message == ExceptionMessage) {
                if (CheckInnerException(err)) {
                    return true;
                }
            }
            return false;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });

    QUnit.test("InvalidCastException", function (assert) {
        var ExceptionMessage = "InvalidCast exception message";

        assert.throws(function () {
            throw new TS.InvalidCastException(ExceptionMessage);
        }, new TS.InvalidCastException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

        assert.throws(function () {
            throw new TS.InvalidCastException(ExceptionMessage, GetInnerException());
        }, function (err) {
            if (err.message == ExceptionMessage) {
                if (CheckInnerException(err)) {
                    return true;
                }
            }
            return false;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });

    QUnit.test("InvalidOperationException", function (assert) {
        var ExceptionMessage = "Invalid operation exception message";

        assert.throws(function () {
            throw new TS.InvalidOperationException(ExceptionMessage);
        }, new TS.InvalidOperationException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

        assert.throws(function () {
            throw new TS.InvalidOperationException(ExceptionMessage, GetInnerException());
        }, function (err) {
            if (err.message == ExceptionMessage) {
                if (CheckInnerException(err)) {
                    return true;
                }
            }
            return false;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });

    QUnit.test("InvalidTypeException", function (assert) {
        var ExceptionMessage = "Invalid type exception message";

        assert.throws(function () {
            throw new TS.InvalidTypeException("ArgName", "NOP", ExceptionMessage);
        }, new TS.InvalidTypeException("ArgName", "NOP", ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

        assert.throws(function () {
            throw new TS.InvalidTypeException("ArgName", "NOP", ExceptionMessage, GetInnerException());
        }, function (err) {
            if (err.message == ExceptionMessage) {
                if (CheckInnerException(err)) {
                    return true;
                }
            }
            return false;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });

    QUnit.test("NotFiniteNumberException", function (assert) {
        var ExceptionMessage = "Not finite number exception message";

        assert.throws(function () {
            throw new TS.NotFiniteNumberException(ExceptionMessage);
        }, new TS.NotFiniteNumberException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

        assert.throws(function () {
            throw new TS.NotFiniteNumberException(ExceptionMessage, GetInnerException());
        }, function (err) {
            if (err.message == ExceptionMessage) {
                if (CheckInnerException(err)) {
                    return true;
                }
            }
            return false;
        }, "Should raise an exception instance of the expected type with an inner exception.");
    });

    QUnit.test("OverflowException", function (assert) {
        var ExceptionMessage = "Overflow exception message";

        assert.throws(function () {
            throw new TS.OverflowException(ExceptionMessage);
        }, new TS.OverflowException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

        assert.throws(function () {
            throw new TS.OverflowException(ExceptionMessage, GetInnerException());
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
})(TS_Exception_test || (TS_Exception_test = {}));
