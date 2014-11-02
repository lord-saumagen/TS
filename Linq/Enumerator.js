var TS;
(function (TS) {
    "use strict";

    (function (Linq) {
        var Enumerator = (function () {
            function Enumerator(callback) {
                if (TS.Utils.TypeInfo.isNullOrUndefined(callback)) {
                    throw new TS.ArgumentNullOrUndefinedException("callback", "Argument 'callback' must not be null or undefined in the constructor of 'TEnumerable'.");
                }

                this._callback = callback;
                this._enumerator = undefined;
            }
            Object.defineProperty(Enumerator.prototype, "current", {
                get: function () {
                    if (this._enumerator != null) {
                        return this._enumerator.current;
                    }

                    return undefined;
                },
                enumerable: true,
                configurable: true
            });

            Enumerator.prototype.moveNext = function () {
                if (this._enumerator == null) {
                    if (this._callback == null) {
                        return false;
                    } else {
                        this._enumerator = this._callback();
                    }
                }

                if (this._enumerator.moveNext()) {
                    return true;
                }

                this.dispose();
                return false;
            };

            Enumerator.prototype.dispose = function () {
                if (this._enumerator != null) {
                    this._enumerator.dispose();
                }
                this._enumerator = undefined;
                this._callback = undefined;
            };
            return Enumerator;
        })();
        Linq.Enumerator = Enumerator;
    })(TS.Linq || (TS.Linq = {}));
    var Linq = TS.Linq;
})(TS || (TS = {}));
