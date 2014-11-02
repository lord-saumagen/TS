var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TS;
(function (TS) {
    "use strict";

    var Exception = (function () {
        function Exception(message, innerException) {
            this._message = (message) ? message : "";
            this._innerException = (innerException) ? innerException : null;
        }
        Object.defineProperty(Exception.prototype, "name", {
            get: function () {
                return this.type;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Exception.prototype, "type", {
            get: function () {
                return "TS.Exception";
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Exception.prototype, "message", {
            get: function () {
                return this._message;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Exception.prototype, "innerException", {
            get: function () {
                return this._innerException;
            },
            enumerable: true,
            configurable: true
        });

        Exception.prototype.toString = function () {
            return this.type + ((this.message.length > 0) ? " :: " + this.message : "");
        };
        return Exception;
    })();
    TS.Exception = Exception;

    var ArgumentException = (function (_super) {
        __extends(ArgumentException, _super);
        function ArgumentException(argumentName, argumentValue, message, innerException) {
            _super.call(this, message, innerException);
            this._argumentName = (argumentName) ? argumentName : "";
            this._argumentValue = argumentValue;
        }
        Object.defineProperty(ArgumentException.prototype, "type", {
            get: function () {
                return "TS.ArgumentException";
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(ArgumentException.prototype, "argumentName", {
            get: function () {
                return this._argumentName;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(ArgumentException.prototype, "argumentValue", {
            get: function () {
                return this._argumentValue;
            },
            enumerable: true,
            configurable: true
        });
        return ArgumentException;
    })(Exception);
    TS.ArgumentException = ArgumentException;

    var ArgumentNullException = (function (_super) {
        __extends(ArgumentNullException, _super);
        function ArgumentNullException(argumentName, message, innerException) {
            _super.call(this, message, innerException);
            this._argumentName = (argumentName) ? argumentName : "";
        }
        Object.defineProperty(ArgumentNullException.prototype, "type", {
            get: function () {
                return "TS.ArgumentNullException";
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(ArgumentNullException.prototype, "argumentName", {
            get: function () {
                return this._argumentName;
            },
            enumerable: true,
            configurable: true
        });
        return ArgumentNullException;
    })(Exception);
    TS.ArgumentNullException = ArgumentNullException;

    var ArgumentNullOrUndefinedException = (function (_super) {
        __extends(ArgumentNullOrUndefinedException, _super);
        function ArgumentNullOrUndefinedException(argumentName, message, innerException) {
            _super.call(this, message, innerException);
            this._argumentName = (argumentName) ? argumentName : "";
        }
        Object.defineProperty(ArgumentNullOrUndefinedException.prototype, "type", {
            get: function () {
                return "TS.ArgumentNullOrUndefinedException";
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(ArgumentNullOrUndefinedException.prototype, "argumentName", {
            get: function () {
                return this._argumentName;
            },
            enumerable: true,
            configurable: true
        });
        return ArgumentNullOrUndefinedException;
    })(Exception);
    TS.ArgumentNullOrUndefinedException = ArgumentNullOrUndefinedException;

    var ArgumentNullUndefOrWhiteSpaceException = (function (_super) {
        __extends(ArgumentNullUndefOrWhiteSpaceException, _super);
        function ArgumentNullUndefOrWhiteSpaceException(argumentName, message, innerException) {
            _super.call(this, message, innerException);
            this._argumentName = (argumentName) ? argumentName : "";
        }
        Object.defineProperty(ArgumentNullUndefOrWhiteSpaceException.prototype, "type", {
            get: function () {
                return "TS.ArgumentNullUndefOrWhiteSpaceException";
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(ArgumentNullUndefOrWhiteSpaceException.prototype, "argumentName", {
            get: function () {
                return this._argumentName;
            },
            enumerable: true,
            configurable: true
        });
        return ArgumentNullUndefOrWhiteSpaceException;
    })(Exception);
    TS.ArgumentNullUndefOrWhiteSpaceException = ArgumentNullUndefOrWhiteSpaceException;

    var ArgumentOutOfRangeException = (function (_super) {
        __extends(ArgumentOutOfRangeException, _super);
        function ArgumentOutOfRangeException(argumentName, argumentValue, message, innerException) {
            _super.call(this, argumentName, argumentValue, message, innerException);
        }
        Object.defineProperty(ArgumentOutOfRangeException.prototype, "type", {
            get: function () {
                return "TS.ArgumentOutOfRangeException";
            },
            enumerable: true,
            configurable: true
        });
        return ArgumentOutOfRangeException;
    })(ArgumentException);
    TS.ArgumentOutOfRangeException = ArgumentOutOfRangeException;

    var IndexOutOfRangeException = (function (_super) {
        __extends(IndexOutOfRangeException, _super);
        function IndexOutOfRangeException(message, innerException) {
            _super.call(this, message, innerException);
        }
        Object.defineProperty(IndexOutOfRangeException.prototype, "type", {
            get: function () {
                return "TS.IndexOutOfRangeException";
            },
            enumerable: true,
            configurable: true
        });
        return IndexOutOfRangeException;
    })(Exception);
    TS.IndexOutOfRangeException = IndexOutOfRangeException;

    var InvalidOperationException = (function (_super) {
        __extends(InvalidOperationException, _super);
        function InvalidOperationException(message, innerException) {
            _super.call(this, message, innerException);
        }
        Object.defineProperty(InvalidOperationException.prototype, "type", {
            get: function () {
                return "TS.InvalidOperationException";
            },
            enumerable: true,
            configurable: true
        });
        return InvalidOperationException;
    })(Exception);
    TS.InvalidOperationException = InvalidOperationException;

    var InvalidCastException = (function (_super) {
        __extends(InvalidCastException, _super);
        function InvalidCastException(message, innerException) {
            _super.call(this, message, innerException);
        }
        Object.defineProperty(InvalidCastException.prototype, "type", {
            get: function () {
                return "TS.InvalidCastException";
            },
            enumerable: true,
            configurable: true
        });
        return InvalidCastException;
    })(Exception);
    TS.InvalidCastException = InvalidCastException;

    var InvalidTypeException = (function (_super) {
        __extends(InvalidTypeException, _super);
        function InvalidTypeException(argumentName, argumentValue, message, innerException) {
            _super.call(this, message, innerException);
            (TS.Utils.TypeInfo.isNullOrUndefined(argumentName)) ? this._argumentName = "" : this._argumentName = argumentName;
            (TS.Utils.TypeInfo.isNullOrUndefined(argumentValue)) ? this._argumentValue = "" : this._argumentValue = argumentValue;
        }
        Object.defineProperty(InvalidTypeException.prototype, "type", {
            get: function () {
                return "TS.InvalidTypeException";
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(InvalidTypeException.prototype, "argumentName", {
            get: function () {
                return this._argumentName;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(InvalidTypeException.prototype, "argumentValue", {
            get: function () {
                return this._argumentValue;
            },
            enumerable: true,
            configurable: true
        });
        return InvalidTypeException;
    })(Exception);
    TS.InvalidTypeException = InvalidTypeException;

    var ArithmeticException = (function (_super) {
        __extends(ArithmeticException, _super);
        function ArithmeticException(message, innerException) {
            _super.call(this, message, innerException);
        }
        Object.defineProperty(ArithmeticException.prototype, "type", {
            get: function () {
                return "TS.ArithmeticException";
            },
            enumerable: true,
            configurable: true
        });
        return ArithmeticException;
    })(Exception);
    TS.ArithmeticException = ArithmeticException;

    var OverflowException = (function (_super) {
        __extends(OverflowException, _super);
        function OverflowException(message, innerException) {
            _super.call(this, message, innerException);
        }
        Object.defineProperty(OverflowException.prototype, "type", {
            get: function () {
                return "TS.OverflowException";
            },
            enumerable: true,
            configurable: true
        });
        return OverflowException;
    })(ArithmeticException);
    TS.OverflowException = OverflowException;

    var DivideByZeroException = (function (_super) {
        __extends(DivideByZeroException, _super);
        function DivideByZeroException(message, innerException) {
            _super.call(this, message, innerException);
        }
        Object.defineProperty(DivideByZeroException.prototype, "type", {
            get: function () {
                return "TS.DivideByZeroException";
            },
            enumerable: true,
            configurable: true
        });
        return DivideByZeroException;
    })(ArithmeticException);
    TS.DivideByZeroException = DivideByZeroException;

    var NotFiniteNumberException = (function (_super) {
        __extends(NotFiniteNumberException, _super);
        function NotFiniteNumberException(message, innerException) {
            _super.call(this, message, innerException);
        }
        Object.defineProperty(NotFiniteNumberException.prototype, "type", {
            get: function () {
                return "TS.NotFiniteNumberException";
            },
            enumerable: true,
            configurable: true
        });
        return NotFiniteNumberException;
    })(ArithmeticException);
    TS.NotFiniteNumberException = NotFiniteNumberException;
})(TS || (TS = {}));
