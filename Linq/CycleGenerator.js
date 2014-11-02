var TS;
(function (TS) {
    "use strict";

    (function (Linq) {
        var CycleGenerator = (function () {
            function CycleGenerator(dataArray) {
                if (TS.Utils.TypeInfo.isNullOrUndefined(dataArray)) {
                    throw new TS.ArgumentNullOrUndefinedException("dataArray", "Argument 'dataArray' must not be null or undefined in the constructor of 'CycleGenerator'.");
                }
                this._dataArray = dataArray.slice(0, dataArray.length);
                this._index = -1;
            }
            Object.defineProperty(CycleGenerator.prototype, "current", {
                get: function () {
                    if (this._dataArray != null && this._index > -1) {
                        return this._dataArray[this._index];
                    }
                    return undefined;
                },
                enumerable: true,
                configurable: true
            });

            CycleGenerator.prototype.moveNext = function () {
                if (this._dataArray.length == 0) {
                    return false;
                }

                if (this._index < this._dataArray.length) {
                    this._index++;

                    if (this._index == this._dataArray.length) {
                        this._index = 0;
                    }
                }

                return true;
            };

            CycleGenerator.prototype.dispose = function () {
                this._dataArray = undefined;
                this._index = -1;
            };
            return CycleGenerator;
        })();
        Linq.CycleGenerator = CycleGenerator;
    })(TS.Linq || (TS.Linq = {}));
    var Linq = TS.Linq;
})(TS || (TS = {}));
