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
        var ArrayEnumerable = (function (_super) {
            __extends(ArrayEnumerable, _super);
            function ArrayEnumerable(dataArray) {
                if (TS.Utils.TypeInfo.isNullOrUndefined(dataArray)) {
                    throw new TS.ArgumentNullOrUndefinedException("dataArray", "Argument 'dataArray' must not be null or undefined in the constructor of 'TArrayEnumerable'.");
                }

                _super.call(this, function () {
                    return new Linq.ArrayEnumerator(dataArray);
                });
            }
            ArrayEnumerable.prototype.getEnumerator = function () {
                return _super.prototype.getEnumerator.call(this);
            };
            return ArrayEnumerable;
        })(Linq.Enumerable);
        Linq.ArrayEnumerable = ArrayEnumerable;
    })(TS.Linq || (TS.Linq = {}));
    var Linq = TS.Linq;
})(TS || (TS = {}));
