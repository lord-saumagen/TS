var TS;
(function (TS) {
    "use strict";

    (function (Linq) {
        (function (Extensions) {
            var Pair = (function () {
                function Pair(first, second) {
                    this._first = first;
                    this._second = second;
                }
                Object.defineProperty(Pair.prototype, "first", {
                    get: function () {
                        return this._first;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Pair.prototype, "second", {
                    get: function () {
                        return this._second;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Pair;
            })();

            function checkEnumerable(enumerable, functionName) {
                if (TS.Utils.TypeInfo.isNullOrUndefined(enumerable)) {
                    throw new TS.ArgumentNullOrUndefinedException("enumerable", "Argument 'enumerable' must not be null or undefined in function '" + functionName + "'.");
                }

                if (TS.Utils.TypeInfo.isUndefined(enumerable.getEnumerator)) {
                    throw new TS.InvalidTypeException("enumerable", enumerable, "Argument 'enumerable' has the wrong type in function '" + functionName + "'.");
                }

                if (!TS.Utils.TypeInfo.isFunction(enumerable.getEnumerator)) {
                    throw new TS.InvalidTypeException("enumerable", enumerable, "Argument 'enumerable' has the wrong type in function '" + functionName + "'.");
                }
            }

            function checkFunctionParameter(paramToCheck, paramName, functionName) {
                if (!TS.Utils.TypeInfo.isFunction(paramToCheck)) {
                    throw new TS.InvalidTypeException(paramName, paramToCheck, "Argument '" + paramName + "' must be a function parameter in function '" + functionName + "'.");
                }
            }

            function checkParameter(paramToCheck, paramName, functionName) {
                if (TS.Utils.TypeInfo.isNullOrUndefined(paramToCheck)) {
                    throw new TS.ArgumentNullOrUndefinedException(paramName, "Argument '" + paramName + "' must not be null or undefinde in function '" + functionName + "'.");
                }
            }

            function checkConstructor(constructorToCheck, paramName, functionName) {
                var _object;

                if (TS.Utils.TypeInfo.isNullOrUndefined(constructorToCheck)) {
                    throw new TS.ArgumentNullOrUndefinedException(paramName, "Argument '" + paramName + "' must not be null or undefinde in function '" + functionName + "'.");
                }

                if (typeof (checkConstructor) != "function") {
                    throw new TS.InvalidTypeException(paramName, "Argument '" + paramName + "' must not of type 'function' in function '" + functionName + "'.");
                }

                try  {
                    _object = new constructorToCheck();
                } catch (Ex) {
                }
                ;

                if (TS.Utils.TypeInfo.isNullOrUndefined(_object)) {
                    throw new TS.InvalidTypeException(paramName, "Argument '" + paramName + "' must be a valid constructor function in function '" + functionName + "'.");
                }
            }

            

            
            function aggregate(enumerable, accumulator, seed) {
                var _checkEnumerable = checkEnumerable;
                var _checkParameter = checkParameter;
                var _checkFunctionParameter = checkFunctionParameter;

                var _resultValue;
                var _enumerator;

                _checkEnumerable(enumerable, "TS.Linq.Extensions.aggregate");
                _checkParameter(accumulator, "accumulator", "TS.Linq.Extensions.aggregate");
                _checkFunctionParameter(accumulator, "accumulator", "TS.Linq.Extensions.aggregate");

                _enumerator = enumerable.getEnumerator();

                if (!_enumerator.moveNext()) {
                    throw new TS.Linq.EmptyEnumerableException(enumerable, "The argument 'enumerable' must not be an empty enumerable in function 'TS.Linq.Extensions.aggregate'.");
                }

                if (TS.Utils.TypeInfo.isNullOrUndefined(seed)) {
                    _resultValue = _enumerator.current;
                } else {
                    _resultValue = accumulator(seed, _enumerator.current);
                }

                while (_enumerator.moveNext()) {
                    _resultValue = accumulator(_resultValue, _enumerator.current);
                }

                _enumerator.dispose();

                return _resultValue;
            }
            Extensions.aggregate = aggregate;

            function all(enumerable, predicate) {
                var _checkParameter = checkParameter;
                var _checkEnumerable = checkEnumerable;
                var _checkFunctionParameter = checkFunctionParameter;

                var _resultValue = true;
                var _enumerator;

                _checkEnumerable(enumerable, "TS.Linq.Extensions.all");
                _checkParameter(predicate, "predicate", "TS.Linq.Extensions.all");
                _checkFunctionParameter(predicate, "predicate", "TS.Linq.Extensions.all");

                _enumerator = enumerable.getEnumerator();

                while (_enumerator.moveNext()) {
                    if (!predicate(_enumerator.current)) {
                        _resultValue = false;
                    }
                }

                _enumerator.dispose();

                return _resultValue;
            }
            Extensions.all = all;

            

            
            function any(enumerable, predicate) {
                var _checkEnumerable = checkEnumerable;
                var _checkFunctionParameter = checkFunctionParameter;

                var _resultValue = false;
                var _enumerator;

                _checkEnumerable(enumerable, "TS.Linq.Extensions.any");

                if (!TS.Utils.TypeInfo.isNullOrUndefined(predicate)) {
                    _checkFunctionParameter(predicate, "predicate", "TS.Linq.Extensions.any");
                }

                _enumerator = enumerable.getEnumerator();

                if (TS.Utils.TypeInfo.isNullOrUndefined(predicate)) {
                    _resultValue = _enumerator.moveNext();
                } else {
                    while (_enumerator.moveNext()) {
                        if (predicate(_enumerator.current)) {
                            _resultValue = true;
                            break;
                        }
                    }
                }

                _enumerator.dispose();

                return _resultValue;
            }
            Extensions.any = any;

            function average(enumerable) {
                var _checkEnumerable = checkEnumerable;

                var _sum = 0;
                var _count = 0;
                var _enumerator;

                _checkEnumerable(enumerable, "TS.Linq.Extensions.average");

                _enumerator = enumerable.getEnumerator();

                while (_enumerator.moveNext()) {
                    if (!TS.Utils.TypeInfo.isNumber(_enumerator.current)) {
                        _enumerator.dispose();
                        throw new TS.InvalidTypeException("this", this, "The LINQ operation 'average' is only applicable on enumerables of type 'Enumerable<number>' in function 'TS.Linq.Extensions.average'.");
                    }
                    _sum += _enumerator.current;

                    if (_sum < -Number.MAX_VALUE || _sum > Number.MAX_VALUE) {
                        _enumerator.dispose();
                        throw new TS.OverflowException("An overflow occured in function 'TS.Linq.Extensions.average'.");
                    }

                    _count++;
                }

                if (_count > 0) {
                    return _sum / _count;
                }

                throw new TS.Linq.EmptyEnumerableException(enumerable, "The argument 'enumerable' must not be an empty enumerable in function 'TS.Linq.Extensions.average'.");
            }
            Extensions.average = average;

            function concat(firstEnumerable, secondEnumerable) {
                var _checkParameter = checkParameter;
                var _checkEnumerable = checkEnumerable;

                var _callback;
                var _arr;
                var _enumerator;

                _checkEnumerable(firstEnumerable, "TS.Linq.Extensions.concat");
                _checkEnumerable(secondEnumerable, "TS.Linq.Extensions.concat");

                _callback = function () {
                    _arr = new Array();
                    _enumerator = firstEnumerable.getEnumerator();

                    while (_enumerator.moveNext()) {
                        _arr.push(_enumerator.current);
                    }

                    _enumerator = secondEnumerable.getEnumerator();

                    while (_enumerator.moveNext()) {
                        _arr.push(_enumerator.current);
                    }

                    return new Linq.ArrayEnumerator(_arr);
                };

                return new Linq.Enumerable(_callback);
            }
            Extensions.concat = concat;

            

            
            function contains(enumerable, element, equalityComparer) {
                var _checkParameter = checkParameter;
                var _checkEnumerable = checkEnumerable;
                var _checkFunctionParameter = checkFunctionParameter;

                var _contains;
                var _enumerator;

                _checkEnumerable(enumerable, "TS.Linq.Extensions.contains");
                _checkParameter(element, "element", "TS.Linq.Extensions.contains");

                if (!TS.Utils.TypeInfo.isNullOrUndefined(equalityComparer)) {
                    _checkFunctionParameter(equalityComparer, "equalityComparer", "TS.Linq.Extensions.contains");
                }

                _contains = false;
                _enumerator = enumerable.getEnumerator();

                if (TS.Utils.TypeInfo.isNullOrUndefined(equalityComparer)) {
                    while (_enumerator.moveNext()) {
                        if (_enumerator.current === element) {
                            _contains = true;
                            _enumerator.dispose();
                            break;
                        }
                    }
                } else {
                    while (_enumerator.moveNext()) {
                        if (equalityComparer(_enumerator.current, element)) {
                            _contains = true;
                            _enumerator.dispose();
                            break;
                        }
                    }
                }

                return _contains;
            }
            Extensions.contains = contains;

            

            
            function count(enumerable, predicate) {
                var _checkEnumerable = checkEnumerable;
                var _checkFunctionParameter = checkFunctionParameter;

                var _count;
                var _enumerator;

                _checkEnumerable(enumerable, "TS.Linq.Extensions.count");

                if (!TS.Utils.TypeInfo.isNullOrUndefined(predicate)) {
                    _checkFunctionParameter(predicate, "equalityComparer", "TS.Linq.Extensions.count");
                }

                _enumerator = enumerable.getEnumerator();
                _count = 0;

                if (TS.Utils.TypeInfo.isNullOrUndefined(predicate)) {
                    while (_enumerator.moveNext()) {
                        _count++;
                    }
                } else {
                    while (_enumerator.moveNext()) {
                        if (predicate(_enumerator.current)) {
                            _count++;
                        }
                    }
                }

                return _count;
            }
            Extensions.count = count;

            function cycle(enumerable) {
                var _checkEnumerable = checkEnumerable;

                var _callback;

                _checkEnumerable(enumerable, "TS.Linq.Extensions.cycle");

                _callback = function () {
                    return new Linq.CycleGenerator(enumerable.toArray());
                };
                return new Linq.Enumerable(_callback);
            }
            Extensions.cycle = cycle;

            function defaultIfEmpty(enumerable, defaultConstructor) {
                var _checkEnumerable = checkEnumerable;
                var _checkConstructor = checkConstructor;

                var _arr;
                var _callback;
                var _enumerator;

                _checkEnumerable(enumerable, "TS.Linq.Extensions.defaultIfEmpty");
                _checkConstructor(defaultConstructor, "defaultConstructor", "TS.Linq.Extensions.defaultIfEmpty");

                _callback = function () {
                    _arr = new Array();
                    _enumerator = enumerable.getEnumerator();

                    if (_enumerator.moveNext()) {
                        _arr.push(_enumerator.current);
                        while (_enumerator.moveNext()) {
                            _arr.push(_enumerator.current);
                        }
                    } else {
                        _arr.push(new defaultConstructor());
                    }

                    return new Linq.ArrayEnumerator(_arr);
                };

                return new Linq.Enumerable(_callback);
            }
            Extensions.defaultIfEmpty = defaultIfEmpty;

            

            
            function distinct(enumerable, equalityComparer) {
                var _checkEnumerable = checkEnumerable;
                var _checkFunctionParameter = checkFunctionParameter;

                var _arr;
                var _callback;
                var _index;
                var _enumerator;
                var _hasElement;
                var _currentElement;

                _checkEnumerable(enumerable, "TS.Linq.Extensions.distinct");

                if (!TS.Utils.TypeInfo.isNullOrUndefined(equalityComparer)) {
                    _checkFunctionParameter(equalityComparer, "equalityComparer", "TS.Linq.Extensions.distinct");
                }

                _index = 0;

                if (TS.Utils.TypeInfo.isNullOrUndefined(equalityComparer)) {
                    _callback = function () {
                        _enumerator = enumerable.getEnumerator();
                        _arr = new Array();

                        if (_enumerator.moveNext()) {
                            _arr.push(_enumerator.current);
                        }

                        while (_enumerator.moveNext()) {
                            _hasElement = false;
                            _currentElement = _enumerator.current;

                            for (_index = 0; _index < _arr.length; _index++) {
                                if (_arr[_index] === _currentElement) {
                                    _hasElement = true;
                                    break;
                                }
                            }
                            if (!_hasElement) {
                                _arr.push(_currentElement);
                            }
                        }
                        return new Linq.ArrayEnumerator(_arr);
                    };
                } else {
                    _callback = function () {
                        _enumerator = enumerable.getEnumerator();
                        _arr = new Array();

                        if (_enumerator.moveNext()) {
                            _arr.push(_enumerator.current);
                        }

                        while (_enumerator.moveNext()) {
                            _hasElement = false;
                            _currentElement = _enumerator.current;

                            for (_index = 0; _index < _arr.length; _index++) {
                                if (equalityComparer(_arr[_index], _currentElement)) {
                                    _hasElement = true;
                                    break;
                                }
                            }
                            if (!_hasElement) {
                                _arr.push(_currentElement);
                            }
                        }
                        return new Linq.ArrayEnumerator(_arr);
                    };
                }

                return new Linq.Enumerable(_callback);
            }
            Extensions.distinct = distinct;

            function elementAt(enumerable, index) {
                var _checkEnumerable = checkEnumerable;
                var _checkParameter = checkParameter;

                var _enumerator;
                var _currentElement;

                _checkEnumerable(enumerable, "TS.Linq.Extensions.elementAt");
                _checkParameter(index, "index", "Argument 'index' must not be null or undefined in function 'TS.Linq.Extensions.elementAt'.");

                if (!TS.Utils.TypeInfo.isPositiveIntegerNumber(index)) {
                    throw new TS.ArgumentOutOfRangeException("index", index, "Argument 'index'  must be an integer greater or equal zero in function 'TS.Linq.Extensions.elementAt'.");
                }

                _enumerator = enumerable.getEnumerator();

                while (_enumerator.moveNext()) {
                    if (index == 0) {
                        _currentElement = _enumerator.current;
                        _enumerator.dispose();
                        return _currentElement;
                    }

                    index--;
                }

                throw new TS.IndexOutOfRangeException("The 'index' in function 'TS.Linq.Extensions.elementAt' is out of the range of the current enumerable.");
            }
            Extensions.elementAt = elementAt;

            function elementAtOrDefault(enumerable, index, defaultConstructor) {
                var _checkEnumerable = checkEnumerable;
                var _checkConstructor = checkConstructor;

                var _enumerator;
                var _currentElement;
                var _checkParameter = checkParameter;

                _checkEnumerable(enumerable, "elementAtOrDefault");
                _checkParameter(index, "index", "TS.Linq.Extensions.elementAtOrDefault");
                _checkConstructor(defaultConstructor, "defaultConstructor", "TS.Linq.Extensions.elementAtOrDefault");

                if (!TS.Utils.TypeInfo.isIntegerNumber(index)) {
                    throw new TS.InvalidTypeException("index", index, "Argument 'index' must be an integer number in function 'TS.Linq.Extensions.elementAtOrDefault'.");
                }

                if (index < 0) {
                    throw new TS.ArgumentOutOfRangeException("index", index, "Argument 'index' must be greater or equal zero in function 'TS.Linq.Extensions.elementAtOrDefault'.");
                }

                _enumerator = enumerable.getEnumerator();

                while (_enumerator.moveNext()) {
                    if (index == 0) {
                        _currentElement = _enumerator.current;
                        _enumerator.dispose();
                        return _currentElement;
                    }

                    index--;
                }

                return new defaultConstructor();
            }
            Extensions.elementAtOrDefault = elementAtOrDefault;

            function empty() {
                return new TS.Linq.ArrayEnumerable(new Array());
            }
            Extensions.empty = empty;

            

            
            function except(firstEnumerable, secondEnumerable, equalityComparer) {
                var _checkEnumerable = checkEnumerable;
                var _checkFunctionParameter = checkFunctionParameter;

                var _resultArray;
                var _secondEnumArray;
                var _callback;
                var _index;
                var _found;
                var _enumerator;

                _checkEnumerable(firstEnumerable, "TS.Linq.Extensions.except");
                _checkEnumerable(secondEnumerable, "TS.Linq.Extensions.except");

                if (!TS.Utils.TypeInfo.isNullOrUndefined(equalityComparer)) {
                    _checkFunctionParameter(equalityComparer, "equalityComparer", "TS.Linq.Extensions.except");
                }

                _callback = function () {
                    _secondEnumArray = new Array();
                    _enumerator = secondEnumerable.getEnumerator();

                    while (_enumerator.moveNext()) {
                        _secondEnumArray.push(_enumerator.current);
                    }

                    _enumerator.dispose();
                    _enumerator = firstEnumerable.getEnumerator();
                    _resultArray = new Array();

                    if (TS.Utils.TypeInfo.isNullOrUndefined(equalityComparer)) {
                        while (_enumerator.moveNext()) {
                            _found = false;
                            for (_index = 0; _index < _secondEnumArray.length; _index++) {
                                if (_enumerator.current === _secondEnumArray[_index]) {
                                    _found = true;
                                    break;
                                }
                            }
                            if (!_found) {
                                _resultArray.push(_enumerator.current);
                            }
                        }
                    } else {
                        while (_enumerator.moveNext()) {
                            _found = false;
                            for (_index = 0; _index < _secondEnumArray.length; _index++) {
                                if (equalityComparer(_enumerator.current, _secondEnumArray[_index])) {
                                    _found = true;
                                    break;
                                }
                            }
                            if (!_found) {
                                _resultArray.push(_enumerator.current);
                            }
                        }
                    }

                    _enumerator.dispose();
                    return new Linq.ArrayEnumerator(_resultArray);
                };

                return new Linq.Enumerable(_callback);
            }
            Extensions.except = except;

            

            
            function first(enumerable, predicate) {
                var _checkEnumerable = checkEnumerable;
                var _checkFunctionParameter = checkFunctionParameter;

                var _enumerator;
                var _result;
                var _movedOnce;

                _checkEnumerable(enumerable, "first");

                if (!TS.Utils.TypeInfo.isNullOrUndefined(predicate)) {
                    _checkFunctionParameter(predicate, "predicate", "TS.Linq.Extensions.first");
                }

                _enumerator = enumerable.getEnumerator();

                if (TS.Utils.TypeInfo.isNullOrUndefined(predicate)) {
                    if (_enumerator.moveNext()) {
                        _result = _enumerator.current;
                        _enumerator.dispose();
                        return _result;
                    }

                    _enumerator.dispose();
                    throw new TS.Linq.EmptyEnumerableException(enumerable, "Argument 'enumerable' must not be empty in function 'TS.Linq.Extensions.first'.");
                } else {
                    _movedOnce = false;

                    while (_enumerator.moveNext()) {
                        if (predicate(_enumerator.current)) {
                            _result = _enumerator.current;
                            _enumerator.dispose();
                            return _result;
                        }

                        _movedOnce = true;
                    }

                    if (_movedOnce) {
                        _enumerator.dispose();
                        throw new TS.InvalidOperationException("There is no element in the current enumerable which matches the given predicate in function 'TS.Linq.Extensions.first'.");
                    }

                    _enumerator.dispose();
                    throw new TS.Linq.EmptyEnumerableException(enumerable, "Argument 'enumerable' must not be empty in function 'TS.Linq.Extensions.first'.");
                }
            }
            Extensions.first = first;

            

            
            function firstOrDefault(enumerable, defaultConstructor, predicate) {
                var _checkEnumerable = checkEnumerable;
                var _checkConstructor = checkConstructor;
                var _checkFunctionParameter = checkFunctionParameter;

                var _enumerator;
                var _result;

                _checkEnumerable(enumerable, "firstOrDefault");
                _checkConstructor(defaultConstructor, "defaultConstructor", "TS.Linq.Extensions.firstOrDefault");

                if (!TS.Utils.TypeInfo.isNullOrUndefined(predicate)) {
                    _checkFunctionParameter(predicate, "predicate", "TS.Linq.Extensions.firstOrDefault");
                }

                _enumerator = enumerable.getEnumerator();

                if (TS.Utils.TypeInfo.isNullOrUndefined(predicate)) {
                    if (_enumerator.moveNext()) {
                        _result = _enumerator.current;
                        _enumerator.dispose();
                        return _result;
                    }

                    _enumerator.dispose();
                    return new defaultConstructor();
                } else {
                    while (_enumerator.moveNext()) {
                        if (predicate(_enumerator.current)) {
                            _result = _enumerator.current;
                            _enumerator.dispose();
                            return _result;
                        }
                    }

                    _enumerator.dispose();
                    return new defaultConstructor();
                }
            }
            Extensions.firstOrDefault = firstOrDefault;

            function fromArray(sourceArray) {
                var _checkParameter = checkParameter;

                _checkParameter(sourceArray, "sourceArray", "TS.Linq.Extensions.fromArray");

                if (!TS.Utils.TypeInfo.isArray(sourceArray)) {
                    throw new TS.InvalidTypeException("sourceArray", sourceArray, "Argument '" + sourceArray + "' must be a valid array in function '" + fromArray + "'.");
                }

                return new TS.Linq.ArrayEnumerable(sourceArray);
            }
            Extensions.fromArray = fromArray;

            function join(outerEnumerable, innerEnumerable, outerKeySelector, innerKeySelector, resultSelector) {
                var _checkEnumerable = checkEnumerable;
                var _checkFunctionParameter = checkFunctionParameter;
                var _checkParameter = checkParameter;

                var _pairCtor = Pair;
                var _joinArray;
                var _index;
                var _enumeratorOuter;
                var _enumeratorInner;
                var _resultArray;
                var _callback;
                var _outerKey;

                _checkEnumerable(outerEnumerable, "TS.Linq.Extensions.join");
                _checkEnumerable(innerEnumerable, "TS.Linq.Extensions.join");
                _checkParameter(outerKeySelector, "outerKeySelector", "TS.Linq.Extensions.join");
                _checkFunctionParameter(outerKeySelector, "outerKeySelector", "TS.Linq.Extensions.join");

                _checkParameter(innerKeySelector, "innerKeySelector", "TS.Linq.Extensions.join");
                _checkFunctionParameter(innerKeySelector, "innerKeySelector", "TS.Linq.Extensions.join");

                _checkParameter(resultSelector, "resultSelector", "TS.Linq.Extensions.join");
                _checkFunctionParameter(resultSelector, "resultSelector", "TS.Linq.Extensions.join");

                _callback = function () {
                    _resultArray = new Array();
                    _joinArray = new Array();
                    _enumeratorOuter = outerEnumerable.getEnumerator();

                    while (_enumeratorOuter.moveNext()) {
                        _outerKey = outerKeySelector(_enumeratorOuter.current);
                        _enumeratorInner = innerEnumerable.where(function (Item) {
                            return innerKeySelector(Item) == _outerKey;
                        }).getEnumerator();
                        while (_enumeratorInner.moveNext()) {
                            _joinArray.push(new Pair(_enumeratorOuter.current, _enumeratorInner.current));
                        }
                    }

                    for (_index = _joinArray.length - 1; _index > -1; _index--) {
                        _resultArray.push(resultSelector(_joinArray[_index].first, _joinArray[_index].second));
                    }

                    _joinArray = null;
                    return new Linq.ArrayEnumerator(_resultArray);
                };

                return new Linq.Enumerable(_callback);
            }
            Extensions.join = join;

            

            
            function last(enumerable, predicate) {
                var _checkEnumerable = checkEnumerable;
                var _checkFunctionParameter = checkFunctionParameter;
                var _checkParameter = checkParameter;

                var _enumerator;
                var _result;
                var _resultAssigned;

                _result = null;
                _checkEnumerable(enumerable, "last");

                if (enumerable.count() == 0) {
                    throw new TS.Linq.EmptyEnumerableException(enumerable, "Argument 'enumerable' must not be empty in function 'TS.Linq.Extensions.first'.");
                }

                if (!TS.Utils.TypeInfo.isNullOrUndefined(predicate)) {
                    _checkFunctionParameter(predicate, "predicate", "TS.Linq.Extensions.last");
                }

                _enumerator = enumerable.getEnumerator();

                if (TS.Utils.TypeInfo.isNullOrUndefined(predicate)) {
                    while (_enumerator.moveNext()) {
                        _result = _enumerator.current;
                    }
                    _enumerator.dispose();
                    return _result;
                } else {
                    _resultAssigned = false;
                    while (_enumerator.moveNext()) {
                        if (predicate(_enumerator.current)) {
                            _result = _enumerator.current;
                            _resultAssigned = true;
                        }
                    }

                    _enumerator.dispose();

                    if (_resultAssigned) {
                        return _result;
                    }

                    throw new TS.InvalidOperationException("There is no element in the current enumerable which matches the given predicate in function 'TS.Linq.Extensions.last'.");
                }
            }
            Extensions.last = last;

            

            
            function lastOrDefault(enumerable, defaultConstructor, predicate) {
                var _checkEnumerable = checkEnumerable;
                var _checkConstructor = checkConstructor;
                var _checkFunctionParameter = checkFunctionParameter;

                var _enumerator;
                var _result;
                var _resultAssigned;

                _checkEnumerable(enumerable, "lastOrDefault");
                _checkConstructor(defaultConstructor, "defaultConstructor", "TS.Linq.Extensions.lastOrDefault");

                if (enumerable.count() == 0) {
                    return new defaultConstructor();
                }

                if (!TS.Utils.TypeInfo.isNullOrUndefined(predicate)) {
                    _checkFunctionParameter(predicate, "predicate", "TS.Linq.Extensions.lastOrDefault");
                }

                _enumerator = enumerable.getEnumerator();

                if (TS.Utils.TypeInfo.isNullOrUndefined(predicate)) {
                    while (_enumerator.moveNext()) {
                        _result = _enumerator.current;
                    }

                    _enumerator.dispose();
                    return _result;
                } else {
                    _resultAssigned = false;

                    while (_enumerator.moveNext()) {
                        if (predicate(_enumerator.current)) {
                            _result = _enumerator.current;
                            _resultAssigned = true;
                        }
                    }

                    _enumerator.dispose();

                    if (_resultAssigned) {
                        return _result;
                    }

                    return new defaultConstructor();
                }
            }
            Extensions.lastOrDefault = lastOrDefault;

            

            
            function orderBy(enumerable, selector, comparer) {
                var _checkEnumerable = checkEnumerable;
                var _checkFunctionParameter = checkFunctionParameter;
                var _checkParameter = checkParameter;

                var _callback;

                _checkEnumerable(enumerable, "TS.Linq.Extensions.orderBy");
                _checkFunctionParameter(selector, "selector", "TS.Linq.Extensions.orderBy");

                if (!TS.Utils.TypeInfo.isNullOrUndefined(comparer)) {
                    _checkFunctionParameter(comparer, "comparer", "TS.Linq.Extensions.orderBy");
                }

                if (TS.Utils.TypeInfo.isNullOrUndefined(comparer)) {
                    comparer = function (_first, _second) {
                        if (_first < _second) {
                            return -1;
                        }
                        ;
                        if (_first > _second) {
                            return 1;
                        }
                        ;
                        return 0;
                    };
                } else {
                    _checkFunctionParameter(comparer, "comparer", "TS.Linq.Extensions.orderBy");
                }

                _callback = function () {
                    return new Linq.ArrayEnumerator(enumerable.toArray().sort(function (first, second) {
                        var _first = selector(first);
                        var _second = selector(second);
                        return comparer(_first, _second);
                    }));
                };

                return new Linq.OrderedEnumerable(_callback, selector, comparer);
            }
            Extensions.orderBy = orderBy;

            

            
            function orderByDescending(enumerable, selector, comparer) {
                var _checkEnumerable = checkEnumerable;
                var _checkFunctionParameter = checkFunctionParameter;
                var _checkParameter = checkParameter;

                var _callback;

                _checkEnumerable(enumerable, "TS.Linq.Extensions.orderBy");
                _checkFunctionParameter(selector, "selector", "TS.Linq.Extensions.orderBy");

                if (!TS.Utils.TypeInfo.isNullOrUndefined(comparer)) {
                    _checkFunctionParameter(comparer, "comparer", "TS.Linq.Extensions.orderBy");
                }

                if (TS.Utils.TypeInfo.isNullOrUndefined(comparer)) {
                    comparer = function (_first, _second) {
                        if (_first < _second) {
                            return -1;
                        }
                        ;
                        if (_first > _second) {
                            return 1;
                        }
                        ;
                        return 0;
                    };
                } else {
                    _checkFunctionParameter(comparer, "comparer", "TS.Linq.Extensions.orderBy");
                }

                _callback = function () {
                    return new Linq.ArrayEnumerator(enumerable.toArray().sort(function (first, second) {
                        var _first = selector(first);
                        var _second = selector(second);
                        return -1 * comparer(_first, _second);
                    }));
                };

                return new Linq.OrderedEnumerable(_callback, selector, comparer);
            }
            Extensions.orderByDescending = orderByDescending;

            function random(enumerable) {
                var _checkEnumerable = checkEnumerable;

                var _callback;

                _checkEnumerable(enumerable, "TS.Linq.Extensions.random");

                _callback = function () {
                    return new TS.Linq.RandomGenerator(enumerable.toArray());
                };
                return new Linq.Enumerable(_callback);
            }
            Extensions.random = random;

            function repeat(item, count) {
                var _checkParameter = checkParameter;

                var _index = 0;
                var _resultArray;

                _checkParameter(item, "item", "TS.Linq.Extensions.repeat");
                if (!TS.Utils.TypeInfo.isNumber(count)) {
                    throw new TS.InvalidTypeException("count", count, "Argument 'count' has the wrong type in function 'TS.Linq.Extensions.repeat'.");
                }

                if (!TS.Utils.TypeInfo.isPositiveIntegerNumber(count)) {
                    throw new TS.ArgumentOutOfRangeException("count", count, "Argument 'count' must be a positive integer number in function 'TS.Linq.Extensions.repeat'.");
                }

                _resultArray = new Array();
                while (_index < count) {
                    _resultArray.push(item);
                    _index++;
                }

                return new Linq.ArrayEnumerable(_resultArray);
            }
            Extensions.repeat = repeat;

            function reverse(enumerable) {
                var _checkEnumerable = checkEnumerable;

                var _callback;

                _checkEnumerable(enumerable, "TS.Linq.Extensions.reverse");

                _callback = function () {
                    return new Linq.ArrayEnumerator(enumerable.toArray().reverse());
                };

                return new Linq.Enumerable(_callback);
            }
            Extensions.reverse = reverse;

            function select(enumerable, selector) {
                var _checkFunctionParameter = checkFunctionParameter;
                var _checkEnumerable = checkEnumerable;
                var _checkParameter = checkParameter;

                var _resultArray;
                var _selectorResult;
                var _callback;
                var _enumerator;

                _checkEnumerable(enumerable, "TS.Linq.Extensions.select");
                _checkParameter(selector, "selector", "TS.Linq.Extensions.select");
                _checkFunctionParameter(selector, "selector", "TS.Linq.Extensions.select");

                _enumerator = enumerable.getEnumerator();

                _callback = function () {
                    _resultArray = new Array();
                    _enumerator = enumerable.getEnumerator();

                    while (_enumerator.moveNext()) {
                        _selectorResult = selector(_enumerator.current);

                        if (TS.Utils.TypeInfo.isUndefined(_selectorResult)) {
                            try  {
                                throw new TS.Linq.SelectorException(selector, _enumerator.current, "The selector: '" + selector.toString() + "' failed in function 'TS.Linq.Extensions.select' on item: '" + _enumerator.current.toString() + "'.");
                            } finally {
                                _enumerator.dispose();
                            }
                        }

                        _resultArray.push(_selectorResult);
                    }

                    _enumerator.dispose();
                    return new Linq.ArrayEnumerator(_resultArray);
                };

                return new Linq.Enumerable(_callback);
            }
            Extensions.select = select;

            function selectMany(enumerable, selector) {
                var _checkFunctionParameter = checkFunctionParameter;
                var _checkEnumerable = checkEnumerable;
                var _checkParameter = checkParameter;

                var _callback;
                var _enumerator;
                var _resultArray;
                var _selectorResult;

                _checkEnumerable(enumerable, "TS.Linq.Extensions.selectMany");
                _checkParameter(selector, "selector", "TS.Linq.Extensions.selectMany");
                _checkFunctionParameter(selector, "selector", "TS.Linq.Extensions.selectMany");

                _callback = function () {
                    _resultArray = new Array();
                    _enumerator = enumerable.getEnumerator();

                    while (_enumerator.moveNext()) {
                        _selectorResult = selector(_enumerator.current);

                        if (TS.Utils.TypeInfo.isUndefined(_selectorResult)) {
                            try  {
                                throw new TS.Linq.SelectorException(selector, _enumerator.current, "The selector: '" + selector.toString() + "' failed in function 'TS.Linq.Extensions.selectMany' on item: '" + _enumerator.current.toString() + "'.");
                            } finally {
                                _enumerator.dispose();
                            }
                        }

                        _resultArray = _resultArray.concat(_selectorResult);
                    }
                    _enumerator.dispose();
                    return new Linq.ArrayEnumerator(_resultArray);
                };

                return new Linq.Enumerable(_callback);
            }
            Extensions.selectMany = selectMany;

            function sum(enumerable) {
                var _checkEnumerable = checkEnumerable;
                var _checkParameter = checkParameter;

                var _sum = 0;
                var _count = 0;
                var _enumerator;
                var _currentNumber;

                _checkEnumerable(enumerable, "TS.Linq.Extensions.sum");

                if (enumerable.count() == 0) {
                    throw new TS.Linq.EmptyEnumerableException(enumerable, "The argument 'enumerable' must not be an empty enumerable in function 'TS.Linq.Extensions.sum'.");
                }

                _enumerator = enumerable.getEnumerator();

                while (_enumerator.moveNext()) {
                    if (!TS.Utils.TypeInfo.isNumber(_enumerator.current)) {
                        _enumerator.dispose();
                        throw new TS.InvalidTypeException("this", this, "The LINQ operation 'sum' is only applicable on enumerables of type 'Enumerable<number>' in function 'TS.Linq.Extensions.sum'.");
                    }

                    _sum += _enumerator.current;

                    if (_sum < -Number.MAX_VALUE || _sum > Number.MAX_VALUE) {
                        _enumerator.dispose();
                        throw new TS.OverflowException("An overflow occured in function 'TS.Linq.Extensions.sum'.");
                    }
                }

                return _sum;
            }
            Extensions.sum = sum;

            function shuffle(enumerable) {
                var _checkEnumerable = checkEnumerable;

                var _callback;
                var _sourceArr;
                var _resultArr;
                var _index;

                _checkEnumerable(enumerable, "TS.Linq.Extensions.shuffle");

                _callback = function () {
                    _sourceArr = enumerable.toArray();
                    _resultArr = new Array();

                    while (_sourceArr.length > 0) {
                        do {
                            _index = Math.floor(Math.random() * _sourceArr.length);
                        } while(_index >= _sourceArr.length);

                        _resultArr.push(_sourceArr[_index]);
                        delete _sourceArr[_index];
                        _sourceArr = TS.Utils.compactArray(_sourceArr);
                    }

                    _sourceArr = null;
                    return new Linq.ArrayEnumerator(_resultArr);
                };

                return new Linq.Enumerable(_callback);
            }
            Extensions.shuffle = shuffle;

            function skip(enumerable, count) {
                var _checkEnumerable = checkEnumerable;

                var _index = 0;
                var _resultArray;
                var _callback;
                var _enumerator;

                _checkEnumerable(enumerable, "TS.Linq.Extensions.skip");

                if (!TS.Utils.TypeInfo.isNumber(count)) {
                    throw new TS.InvalidTypeException("count", count, "Argument 'count' has the wrong type in function 'TS.Linq.Extensions.skip'.");
                }

                if (!TS.Utils.TypeInfo.isPositiveIntegerNumber(count)) {
                    throw new TS.ArgumentOutOfRangeException("count", count, "Argument 'count' must be a positive integer number in function 'TS.Linq.Extensions.skip'.");
                }

                _enumerator = enumerable.getEnumerator();

                _callback = function () {
                    _resultArray = new Array();
                    _enumerator = enumerable.getEnumerator();

                    while (_enumerator.moveNext()) {
                        if (_index++ < count) {
                            continue;
                        }

                        _resultArray.push(_enumerator.current);
                    }

                    _enumerator.dispose();
                    return new Linq.ArrayEnumerator(_resultArray);
                };

                return new Linq.Enumerable(_callback);
            }
            Extensions.skip = skip;

            function skipWhile(enumerable, predicate) {
                var _checkEnumerable = checkEnumerable;
                var _checkFunctionParameter = checkFunctionParameter;
                var _checkParameter = checkParameter;

                var _resultArray;
                var _callback;
                var _enumerator;

                _checkEnumerable(enumerable, "TS.Linq.Extensions.skipWhile");
                _checkParameter(predicate, "predicate", "TS.Linq.Extensions.skipWhile");
                _checkFunctionParameter(predicate, "predicate", "TS.Linq.Extensions.skipWhile");

                _enumerator = enumerable.getEnumerator();

                _callback = function () {
                    _resultArray = new Array();
                    _enumerator = enumerable.getEnumerator();

                    while (_enumerator.moveNext()) {
                        if ((_resultArray.length == 0) && predicate(_enumerator.current)) {
                            continue;
                        }

                        _resultArray.push(_enumerator.current);
                    }

                    _enumerator.dispose();
                    return new Linq.ArrayEnumerator(_resultArray);
                };

                return new Linq.Enumerable(_callback);
            }
            Extensions.skipWhile = skipWhile;

            function take(enumerable, count) {
                var _checkEnumerable = checkEnumerable;
                var _checkParameter = checkParameter;

                var _resultArray;
                var _callback;
                var _index = 0;
                var _enumerator;
                var _arrayEnumerable;

                _checkEnumerable(enumerable, "TS.Linq.Extensions.take");

                if (!TS.Utils.TypeInfo.isNumber(count)) {
                    throw new TS.InvalidTypeException("count", count, "Argument 'count' has the wrong type in function 'TS.Linq.Extensions.take'.");
                }

                if (!TS.Utils.TypeInfo.isPositiveIntegerNumber(count)) {
                    throw new TS.ArgumentOutOfRangeException("count", count, "Argument 'count' must be a positive integer number in function 'TS.Linq.Extensions.take'.");
                }

                _callback = function () {
                    _enumerator = enumerable.getEnumerator();
                    _index = 0;
                    _resultArray = new Array();

                    while (_enumerator.moveNext()) {
                        if (_index++ < count) {
                            _resultArray.push(_enumerator.current);
                            continue;
                        }

                        break;
                    }

                    _enumerator.dispose();
                    return new Linq.ArrayEnumerator(_resultArray);
                };

                return new Linq.Enumerable(_callback);
            }
            Extensions.take = take;

            function takeWhile(enumerable, predicate) {
                var _checkEnumerable = checkEnumerable;
                var _checkFunctionParameter = checkFunctionParameter;
                var _checkParameter = checkParameter;

                var _resultArray;
                var _callback;
                var _enumerator;

                _checkEnumerable(enumerable, "TS.Linq.Extensions.takeWhile");
                _checkParameter(predicate, "predicate", "TS.Linq.Extensions.takeWhile");
                _checkFunctionParameter(predicate, "predicate", "TS.Linq.Extensions.takeWhile");

                _callback = function () {
                    _resultArray = new Array();
                    _enumerator = enumerable.getEnumerator();

                    while (_enumerator.moveNext()) {
                        if (predicate(_enumerator.current)) {
                            _resultArray.push(_enumerator.current);
                        } else {
                            break;
                        }
                    }

                    _enumerator.dispose();
                    return new Linq.ArrayEnumerator(_resultArray);
                };

                return new Linq.Enumerable(_callback);
            }
            Extensions.takeWhile = takeWhile;

            function toArray(enumerable) {
                var _checkEnumerable = checkEnumerable;

                var _resultArray;
                var _enumerator;

                _checkEnumerable(enumerable, "TS.Linq.Extensions.toArray");

                _resultArray = new Array();
                _enumerator = enumerable.getEnumerator();

                while (_enumerator.moveNext()) {
                    _resultArray.push(_enumerator.current);
                }

                _enumerator.dispose();

                return _resultArray;
            }
            Extensions.toArray = toArray;

            function thenBy(enumerable, selector, comparer) {
                var _checkEnumerable = checkEnumerable;
                var _checkFunctionParameter = checkFunctionParameter;

                var _callback;
                var _partitionedEnumerator;
                var _bufferArray;
                var _resultArray;

                _checkEnumerable(enumerable, "TS.Linq.Extensions.thenBy");
                _checkFunctionParameter(selector, "selector", "TS.Linq.Extensions.thenBy");

                if (TS.Utils.TypeInfo.isNullOrUndefined(enumerable.getPartitionEnumerator)) {
                    throw new TS.InvalidTypeException("enumerable", enumerable, "Argument enumerable must be of type 'IOrderedEnumerable' in function 'TS.Linq.Extensions.thenBy'.");
                }

                if (TS.Utils.TypeInfo.isNullOrUndefined(comparer)) {
                    comparer = function (_first, _second) {
                        if (_first < _second) {
                            return -1;
                        }
                        ;
                        if (_first > _second) {
                            return 1;
                        }
                        ;
                        return 0;
                    };
                } else {
                    _checkFunctionParameter(comparer, "comparer", "TS.Linq.Extensions.thenBy");
                }

                _callback = function () {
                    _resultArray = new Array();

                    while (true) {
                        _bufferArray = new Array();
                        _partitionedEnumerator = enumerable.getPartitionEnumerator();
                        if (_partitionedEnumerator == null) {
                            break;
                        }

                        while (_partitionedEnumerator.moveNext()) {
                            _bufferArray.push(_partitionedEnumerator.current);
                        }

                        _bufferArray.sort(function (first, second) {
                            var _first = selector(first);
                            var _second = selector(second);
                            return comparer(_first, _second);
                        });

                        _resultArray = _resultArray.concat(_bufferArray);
                    }

                    return new Linq.ArrayEnumerator(_resultArray);
                };

                return new Linq.OrderedEnumerable(_callback, selector, comparer);
            }
            Extensions.thenBy = thenBy;

            function thenByDescending(enumerable, selector, comparer) {
                var _checkEnumerable = checkEnumerable;
                var _checkFunctionParameter = checkFunctionParameter;

                var _callback;
                var _partitionedEnumerator;
                var _bufferArray;
                var _resultArray;

                _checkEnumerable(enumerable, "TS.Linq.Extensions.thenByDescending");
                _checkFunctionParameter(selector, "selector", "TS.Linq.Extensions.thenByDescending");

                if (TS.Utils.TypeInfo.isNullOrUndefined(enumerable.getPartitionEnumerator)) {
                    throw new TS.InvalidTypeException("enumerable", enumerable, "Argument enumerable must be of type 'IOrderedEnumerable' in function 'TS.Linq.Extensions.thenByDescending'.");
                }

                if (TS.Utils.TypeInfo.isNullOrUndefined(comparer)) {
                    comparer = function (_first, _second) {
                        if (_first < _second) {
                            return -1;
                        }
                        ;
                        if (_first > _second) {
                            return 1;
                        }
                        ;
                        return 0;
                    };
                } else {
                    _checkFunctionParameter(comparer, "comparer", "TS.Linq.Extensions.thenByDescending");
                }

                _callback = function () {
                    _resultArray = new Array();

                    while (true) {
                        _bufferArray = new Array();
                        _partitionedEnumerator = enumerable.getPartitionEnumerator();
                        if (_partitionedEnumerator == null) {
                            break;
                        }

                        while (_partitionedEnumerator.moveNext()) {
                            _bufferArray.push(_partitionedEnumerator.current);
                        }

                        _bufferArray.sort(function (first, second) {
                            var _first = selector(first);
                            var _second = selector(second);
                            return comparer(_first, _second);
                        });

                        _bufferArray.reverse();

                        _resultArray = _resultArray.concat(_bufferArray);
                    }

                    return new Linq.ArrayEnumerator(_resultArray);
                };

                return new Linq.OrderedEnumerable(_callback, selector, comparer);
            }
            Extensions.thenByDescending = thenByDescending;

            function union(firstEnumerable, secondEnumerable) {
                var _checkEnumerable = checkEnumerable;

                var _index;
                var _enumerator;
                var _resultArray;
                var _callback;

                _checkEnumerable(firstEnumerable, "TS.Linq.Extensions.union");
                _checkEnumerable(secondEnumerable, "TS.Linq.Extensions.union");

                _callback = function () {
                    _enumerator = firstEnumerable.getEnumerator();
                    _resultArray = new Array();

                    while (_enumerator.moveNext()) {
                        _resultArray.push(_enumerator.current);
                    }

                    _enumerator.dispose();
                    _enumerator = secondEnumerable.getEnumerator();

                    while (_enumerator.moveNext()) {
                        for (_index = 0; _index < _resultArray.length; _index++) {
                            if (_resultArray[_index] === _enumerator.current) {
                                continue;
                            }
                        }
                        _resultArray.push(_enumerator.current);
                    }

                    _enumerator.dispose();
                    return new Linq.ArrayEnumerator(_resultArray);
                };

                return new Linq.Enumerable(_callback);
            }
            Extensions.union = union;

            function where(enumerable, predicate) {
                var _checkEnumerable = checkEnumerable;
                var _checkFunctionParameter = checkFunctionParameter;

                var _resultArray;
                var _enumerator;
                var _callback;

                _checkEnumerable(enumerable, "TS.Linq.Extensions.where");
                _checkFunctionParameter(predicate, "predicate", "TS.Linq.Extensions.where");

                _callback = function () {
                    _enumerator = enumerable.getEnumerator();
                    _resultArray = new Array();

                    while (_enumerator.moveNext()) {
                        if (predicate(_enumerator.current)) {
                            _resultArray.push(_enumerator.current);
                        }
                    }

                    _enumerator.dispose();
                    return new Linq.ArrayEnumerator(_resultArray);
                };

                return new Linq.Enumerable(_callback);
            }
            Extensions.where = where;
        })(Linq.Extensions || (Linq.Extensions = {}));
        var Extensions = Linq.Extensions;
    })(TS.Linq || (TS.Linq = {}));
    var Linq = TS.Linq;
})(TS || (TS = {}));
