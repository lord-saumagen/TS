var TS;
(function (TS) {
    "use strict";

    (function (Linq) {
        var Enumerable = (function () {
            function Enumerable(callback) {
                if (TS.Utils.TypeInfo.isNullOrUndefined(callback)) {
                    throw new TS.ArgumentNullOrUndefinedException("callback", "Argument 'callback' must not be null or undefined in the constructor of 'Enumerable'.");
                }

                this._callback = callback;
            }
            Enumerable.prototype.aggregate = function (accumulator, seed) {
                return Linq.Extensions.aggregate(this, accumulator, seed);
            };

            Enumerable.prototype.all = function (predicate) {
                return Linq.Extensions.all(this, predicate);
            };

            Enumerable.prototype.any = function (predicate) {
                return Linq.Extensions.any(this, predicate);
            };

            Enumerable.prototype.average = function () {
                var _numberArray;
                var _enumerator;

                if (this.count() == 0) {
                    throw new TS.Linq.EmptyEnumerableException(this, "The LINQ operation 'average' is not applicable on empty enumerables'.");
                }

                _enumerator = this.getEnumerator();

                while (_enumerator.moveNext()) {
                    if (!TS.Utils.TypeInfo.isNumber(_enumerator.current)) {
                        _enumerator.dispose();
                        throw new TS.InvalidTypeException("this", this, "The LINQ operation 'average' is only applicable on enumerables of type 'Enumerable<number>'.");
                    }
                    _numberArray.push(Number(_enumerator.current));
                }

                _enumerator.dispose();

                return Linq.Extensions.average(Enumerable.fromArray(_numberArray));
            };

            Enumerable.prototype.concat = function (enumerable) {
                return Linq.Extensions.concat(this, enumerable);
            };

            Enumerable.prototype.contains = function (element, equalityComparer) {
                if (equalityComparer == null) {
                    return Linq.Extensions.contains(this, element);
                } else {
                    return Linq.Extensions.contains(this, element, equalityComparer);
                }
            };

            Enumerable.prototype.count = function () {
                return Linq.Extensions.count(this);
            };

            Enumerable.prototype.defaultIfEmpty = function (defaultConstructor) {
                return Linq.Extensions.defaultIfEmpty(this, defaultConstructor);
            };

            Enumerable.prototype.distinct = function (equalityComparer) {
                if (equalityComparer == null) {
                    return Linq.Extensions.distinct(this);
                }
                return Linq.Extensions.distinct(this, equalityComparer);
            };

            Enumerable.prototype.elementAt = function (index) {
                return Linq.Extensions.elementAt(this, index);
            };

            Enumerable.prototype.elemementAtOrDefault = function (index, defaultConstructor) {
                return Linq.Extensions.elementAtOrDefault(this, index, defaultConstructor);
            };

            Enumerable.prototype.empty = function () {
                return Linq.Extensions.empty();
            };

            Enumerable.prototype.except = function (otherEnumerable, equalityComparer) {
                return Linq.Extensions.except(this, otherEnumerable, equalityComparer);
            };

            Enumerable.prototype.first = function (predicate) {
                if (TS.Utils.TypeInfo.isNullOrUndefined(predicate)) {
                    return Linq.Extensions.first(this);
                }

                return Linq.Extensions.first(this, predicate);
            };

            Enumerable.prototype.firstOrDefault = function (defaultConstructor, predicate) {
                if (TS.Utils.TypeInfo.isNullOrUndefined(predicate)) {
                    return Linq.Extensions.firstOrDefault(this, defaultConstructor);
                }

                return Linq.Extensions.firstOrDefault(this, defaultConstructor);
            };

            Enumerable.fromArray = function (sourceArray) {
                return TS.Linq.Extensions.fromArray(sourceArray);
            };

            Enumerable.prototype.getEnumerator = function () {
                return this._callback();
            };

            Enumerable.prototype.groupJoin = function (outerEnumerable, innerEnumerable, outerKeySelector, innerKeySelector, resultSelector, equalityComparer) {
                return Linq.Extensions.groupJoin(this, innerEnumerable, outerKeySelector, innerKeySelector, resultSelector);
            };

            Enumerable.prototype.join = function (innerEnumerable, outerKeySelector, innerKeySelector, resultSelector) {
                return Linq.Extensions.join(this, innerEnumerable, outerKeySelector, innerKeySelector, resultSelector);
            };

            Enumerable.prototype.last = function (predicate) {
                return Linq.Extensions.last(this, predicate);
            };

            Enumerable.prototype.lastOrDefault = function (defaultConstructor, predicate) {
                return Linq.Extensions.lastOrDefault(this, defaultConstructor, predicate);
            };

            Enumerable.prototype.orderBy = function (selector, comparer) {
                return Linq.Extensions.orderBy(this, selector, comparer);
            };

            Enumerable.prototype.orderByDescending = function (selector, comparer) {
                return Linq.Extensions.orderByDescending(this, selector, comparer);
            };

            Enumerable.repeat = function (item, count) {
                return Linq.Extensions.repeat(item, count);
            };

            Enumerable.prototype.reverse = function () {
                return Linq.Extensions.reverse(this);
            };

            Enumerable.prototype.select = function (selector) {
                return Linq.Extensions.select(this, selector);
            };

            Enumerable.prototype.selectMany = function (selector) {
                return Linq.Extensions.selectMany(this, selector);
            };

            Enumerable.prototype.skip = function (count) {
                return Linq.Extensions.skip(this, count);
            };

            Enumerable.prototype.skipWhile = function (predicate) {
                return Linq.Extensions.skipWhile(this, predicate);
            };

            Enumerable.prototype.sum = function () {
                var _numberArray;
                var _enumerator;

                if (this.count() == 0) {
                    throw new TS.Linq.EmptyEnumerableException(this, "The LINQ operation 'sum' is not applicable on empty enumerables'.");
                }

                _enumerator = this.getEnumerator();

                while (_enumerator.moveNext()) {
                    if (!TS.Utils.TypeInfo.isNumber(_enumerator.current)) {
                        _enumerator.dispose();
                        throw new TS.InvalidTypeException("this", this, "The LINQ operation 'sum' is only applicable on enumerables of type 'Enumerable<number>'.");
                    }
                    _numberArray.push(Number(_enumerator.current));
                }

                _enumerator.dispose();

                return Linq.Extensions.sum(Enumerable.fromArray(_numberArray));
            };

            Enumerable.prototype.take = function (count) {
                return Linq.Extensions.take(this, count);
            };

            Enumerable.prototype.takeWhile = function (predicate) {
                return Linq.Extensions.takeWhile(this, predicate);
            };

            Enumerable.prototype.toArray = function () {
                return Linq.Extensions.toArray(this);
            };

            Enumerable.prototype.union = function (secondEnumerable) {
                return Linq.Extensions.union(this, secondEnumerable);
            };

            Enumerable.prototype.where = function (predicate) {
                return Linq.Extensions.where(this, predicate);
            };
            return Enumerable;
        })();
        Linq.Enumerable = Enumerable;
    })(TS.Linq || (TS.Linq = {}));
    var Linq = TS.Linq;
})(TS || (TS = {}));
