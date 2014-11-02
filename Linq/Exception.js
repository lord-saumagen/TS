var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TS;
(function (TS) {
    "use strict";

    (function (Linq) {
        var SelectorException = (function (_super) {
            __extends(SelectorException, _super);
            function SelectorException(selector, value, message, innerException) {
                _super.call(this, message, innerException);
                this._selector = selector;
                this._value = value;
            }
            Object.defineProperty(SelectorException.prototype, "type", {
                get: function () {
                    return "TS.Linq.SelectorException";
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(SelectorException.prototype, "selector", {
                get: function () {
                    return this._selector;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(SelectorException.prototype, "value", {
                get: function () {
                    return this._value;
                },
                enumerable: true,
                configurable: true
            });
            return SelectorException;
        })(TS.Exception);
        Linq.SelectorException = SelectorException;

        var EmptyEnumerableException = (function (_super) {
            __extends(EmptyEnumerableException, _super);
            function EmptyEnumerableException(enumerable, message, innerException) {
                _super.call(this, message, innerException);
                this._enumerable = enumerable;
            }
            Object.defineProperty(EmptyEnumerableException.prototype, "type", {
                get: function () {
                    return "TS.Linq.EmptyEnumerableException";
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(EmptyEnumerableException.prototype, "enumerable", {
                get: function () {
                    return this._enumerable;
                },
                enumerable: true,
                configurable: true
            });
            return EmptyEnumerableException;
        })(TS.Exception);
        Linq.EmptyEnumerableException = EmptyEnumerableException;
    })(TS.Linq || (TS.Linq = {}));
    var Linq = TS.Linq;
})(TS || (TS = {}));
