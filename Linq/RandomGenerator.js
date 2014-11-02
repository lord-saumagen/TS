var TS;
(function (TS) {
    "use strict";

    (function (Linq) {
        var RandomGenerator = (function () {
            function RandomGenerator(dataArray) {
                if (TS.Utils.TypeInfo.isNullOrUndefined(dataArray)) {
                    throw new TS.ArgumentNullOrUndefinedException("dataArray", "Argument 'dataArray' must not be null or undefined in the constructor or 'RandomGenerator'.");
                }
                this._dataArray = dataArray.slice(0, dataArray.length);
            }
            Object.defineProperty(RandomGenerator.prototype, "current", {
                get: function () {
                    return this._current;
                },
                enumerable: true,
                configurable: true
            });

            RandomGenerator.prototype.moveNext = function () {
                if (this._dataArray.length == 0) {
                    return false;
                }

                do {
                    this._index = Math.floor(Math.random() * this._dataArray.length);
                } while(this._index >= this._dataArray.length);

                this._current = this._dataArray[this._index];
                return true;
            };

            RandomGenerator.prototype.dispose = function () {
                this._dataArray = undefined;
            };
            return RandomGenerator;
        })();
        Linq.RandomGenerator = RandomGenerator;
    })(TS.Linq || (TS.Linq = {}));
    var Linq = TS.Linq;
})(TS || (TS = {}));
