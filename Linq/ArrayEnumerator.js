var TS;
(function (TS) {
    "use strict";

    (function (Linq) {
        var ArrayEnumerator = (function () {
            function ArrayEnumerator(dataArray) {
                if (TS.Utils.TypeInfo.isNullOrUndefined(dataArray)) {
                    throw new TS.ArgumentNullOrUndefinedException("dataArray", "Argument 'dataArray' must not be null or undefined in the constructor or 'TArrayEnumerator'.");
                }
                this._dataArray = dataArray.slice(0, dataArray.length);
                this._index = -1;
            }
            Object.defineProperty(ArrayEnumerator.prototype, "current", {
                get: function () {
                    if (this._dataArray != null && this._index > -1) {
                        return this._dataArray[this._index];
                    }
                    return undefined;
                },
                enumerable: true,
                configurable: true
            });

            ArrayEnumerator.prototype.moveNext = function () {
                if (this._dataArray == null) {
                    return false;
                }

                if (this._index < this._dataArray.length - 1) {
                    this._index++;
                    return true;
                }

                this.dispose();
                return false;
            };

            ArrayEnumerator.prototype.dispose = function () {
                this._dataArray = undefined;
                this._index = -1;
            };
            return ArrayEnumerator;
        })();
        Linq.ArrayEnumerator = ArrayEnumerator;
    })(TS.Linq || (TS.Linq = {}));
    var Linq = TS.Linq;
})(TS || (TS = {}));
