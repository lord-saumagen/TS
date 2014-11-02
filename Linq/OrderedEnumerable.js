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
        var EnumerationTypeEnum;
        (function (EnumerationTypeEnum) {
            EnumerationTypeEnum[EnumerationTypeEnum["undefined"] = 0] = "undefined";
            EnumerationTypeEnum[EnumerationTypeEnum["normal"] = 1] = "normal";
            EnumerationTypeEnum[EnumerationTypeEnum["partitioned"] = 2] = "partitioned";
        })(EnumerationTypeEnum || (EnumerationTypeEnum = {}));

        var OrderedEnumerable = (function (_super) {
            __extends(OrderedEnumerable, _super);
            function OrderedEnumerable(callback, selector, comparer) {
                if (TS.Utils.TypeInfo.isNullOrUndefined(callback)) {
                    throw new TS.ArgumentNullOrUndefinedException("callback", "Argument 'callback' must not be null or undefined in the constructor of 'OrderedEnumerable'.");
                }

                if (TS.Utils.TypeInfo.isNullOrUndefined(selector)) {
                    throw new TS.ArgumentNullOrUndefinedException("selector", "Argument 'selector' must not be null or undefined in the constructor of 'OrderedEnumerable'.");
                }

                if (TS.Utils.TypeInfo.isNullOrUndefined(comparer)) {
                    throw new TS.ArgumentNullOrUndefinedException("comparer", "Argument 'comparer' must not be null or undefined in the constructor of 'OrderedEnumerable'.");
                }

                _super.call(this, callback);
                this._selector = selector;
                this._comparer = comparer;
                this._enumerationType = 0 /* undefined */;
                this._lastItem = null;
                this._bufferArray = new Array();
            }
            OrderedEnumerable.prototype.getEnumerator = function () {
                if (this._enumerationType == 0 /* undefined */) {
                    this._enumerationType = 1 /* normal */;
                }

                if (this._enumerationType == 1 /* normal */) {
                    return _super.prototype.getEnumerator.call(this);
                }

                return null;
            };

            OrderedEnumerable.prototype.getPartitionEnumerator = function () {
                var _this = this;
                if (this._enumerationType == 0 /* undefined */) {
                    this._enumerationType = 2 /* partitioned */;
                    this._internalEnumerator = _super.prototype.getEnumerator.call(this);
                }

                if (this._enumerationType == 2 /* partitioned */) {
                    this._bufferArray = new Array();

                    if (this._lastItem != null) {
                        this._bufferArray.push(this._lastItem);
                        this._lastItem = null;
                    }

                    while (this._internalEnumerator.moveNext()) {
                        if (this._bufferArray.length == 0) {
                            this._bufferArray.push(this._internalEnumerator.current);
                        } else {
                            if (this._comparer(this._selector(this._bufferArray[this._bufferArray.length - 1]), this._selector(this._internalEnumerator.current)) == 0) {
                                this._bufferArray.push(this._internalEnumerator.current);
                            } else {
                                this._lastItem = this._internalEnumerator.current;
                                break;
                            }
                        }
                    }

                    if (this._bufferArray.length > 0) {
                        return new Linq.Enumerator(function () {
                            return new Linq.ArrayEnumerator(_this._bufferArray);
                        });
                    }
                }

                return null;
            };

            OrderedEnumerable.prototype.thenBy = function (selector, comparer) {
                return Linq.Extensions.thenBy(this, selector, comparer);
            };

            OrderedEnumerable.prototype.thenByDescending = function (selector, comparer) {
                return Linq.Extensions.thenByDescending(this, selector, comparer);
            };
            return OrderedEnumerable;
        })(Linq.Enumerable);
        Linq.OrderedEnumerable = OrderedEnumerable;
    })(TS.Linq || (TS.Linq = {}));
    var Linq = TS.Linq;
})(TS || (TS = {}));
