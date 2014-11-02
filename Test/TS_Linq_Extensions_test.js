"use strict";
var TS_Linq_Extensions_test;
(function (TS_Linq_Extensions_test) {
    var getPersonData = Person400.getData;
    var getNYData = Get_NY.getData;
    var getMM = MM.getData;
    var getCustomers = Customers.getData;
    var getOrders = Orders.getData;

    var personEnumerable;
    var nyEnumerable;
    var mmEnumerable;
    var customersEnumerable;
    var ordersEnumerable;

    QUnit.module("TS.Linq.Extensions", {
        setupOnce: function () {
            personEnumerable = TS.Linq.Extensions.fromArray(getPersonData());
            nyEnumerable = TS.Linq.Extensions.fromArray(getNYData());
            mmEnumerable = TS.Linq.Extensions.fromArray(getMM()[0].lfs);
            customersEnumerable = TS.Linq.Extensions.fromArray(getCustomers());
            ordersEnumerable = TS.Linq.Extensions.fromArray(getOrders());
        },
        setup: function () {
        },
        teardown: function () {
        },
        teardownOnce: function () {
            personEnumerable = null;
        }
    });

    QUnit.test("aggregate", function (assert) {
        var _testNumberEnumerable;
        var _testStringEnumerable;
        var _testCarEnumerable;
        var _testNumberResult;
        var _testStringResult;
        var _testCarNumberResult;
        var _testCarStringResult;
        var _undefined;

        _testNumberEnumerable = TS.Linq.Enumerable.fromArray(CreateNumberArray());
        _testStringEnumerable = TS.Linq.Enumerable.fromArray(CreateStringArray());
        _testCarEnumerable = TS.Linq.Enumerable.fromArray(CreateCarsArray());

        _testNumberResult = TS.Linq.Extensions.aggregate(_testNumberEnumerable, function (first, second) {
            return first + second;
        });

        assert.equal(_testNumberResult, 55, "should return '55' on TS.Linq.Enumerable<number> .");

        _testStringResult = TS.Linq.Extensions.aggregate(_testStringEnumerable, function (first, second) {
            return first + ", " + second;
        });

        assert.equal(_testStringResult, "one, two, three, four, five, six, seven, eight, nine, ten", "should return 'one, two, three, four, five, six, seven, eight, nine, ten' on TS.Linq.Enumerable<string> .");

        _testCarNumberResult = TS.Linq.Extensions.aggregate(_testCarEnumerable, function (first, second) {
            return first + second.horsePower;
        }, 0);
        assert.equal(_testCarNumberResult, 595, "should return 595 on TS.Linq.Enumerable<Car> with an accumulator function on 'horsePower' should return 595.");

        _testCarStringResult = TS.Linq.Extensions.aggregate(_testCarEnumerable, function (first, second) {
            return first + second.name;
        }, "");
        assert.equal(_testCarStringResult, "BMWAUDIVWFIATTRABANT", "should return 'BMWAUDIVWFIATTRABANT' on TS.Linq.Enumerable<Car> with an accumulator function on 'name'.");

        assert.throws(function () {
            TS.Linq.Extensions.aggregate(TS.Linq.Enumerable.fromArray([]), function (first, second) {
                return first + second;
            });
        }, function (err) {
            return ((err.name == "TS.Linq.EmptyEnumerableException") ? true : false);
        }, "Should throw a 'TS.Linq.EmptyEnumerableException' for an empty 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.aggregate(_testStringEnumerable, null);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'accumulator' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.aggregate(null, function (first, second) {
                return first + second;
            });
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.aggregate(_testStringEnumerable, _undefined);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'accumulator' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.aggregate(_undefined, function (first, second) {
                return first + second;
            });
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");
    });

    QUnit.test("all", function (assert) {
        var _testResult;
        var _undefined;

        assert.equal(TS.Linq.Extensions.all(TS.Linq.Enumerable.fromArray([]), function (item) {
            return false;
        }), true, "Should return true for an empty enumerable.");
        _testResult = TS.Linq.Extensions.all(TS.Linq.Enumerable.fromArray(CreateStringArray()), function (item) {
            return item.length >= 3;
        });
        assert.ok(_testResult, "Should return true on a predicate that should pass.");
        _testResult = TS.Linq.Extensions.all(TS.Linq.Enumerable.fromArray(CreateStringArray()), function (item) {
            return item.lenght > 4;
        });
        assert.ok(!_testResult, "Should return false on a predicate that shouldn't pass.");

        assert.throws(function () {
            TS.Linq.Extensions.all(null, function (item) {
                return item.length < 0;
            });
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.all(TS.Linq.Enumerable.fromArray(CreateStringArray()), null);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'predicate' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.all(_undefined, function (item) {
                return item.length < 0;
            });
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.all(TS.Linq.Enumerable.fromArray(CreateStringArray()), _undefined);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'predicate' argument.");
    });

    QUnit.test("any", function (assert) {
        var _testResult;
        var _undefined;

        assert.equal(TS.Linq.Extensions.any(TS.Linq.Enumerable.fromArray([]), function (item) {
            return true;
        }), false, "Should return false on an empty 'enumerable'.");
        _testResult = TS.Linq.Extensions.any(TS.Linq.Enumerable.fromArray(CreateStringArray()), function (item) {
            return item.length >= 3;
        });
        assert.ok(_testResult, "Should return true on a predicate that should pass.");
        _testResult = TS.Linq.Extensions.any(TS.Linq.Enumerable.fromArray(CreateStringArray()), function (item) {
            return item.lenght < 2;
        });
        assert.ok(!_testResult, "Should return false on a predicate that shouldn't pass.");
        _testResult = TS.Linq.Extensions.any(TS.Linq.Enumerable.fromArray(CreateStringArray()));
        assert.ok(_testResult, "Should return true on a none empty 'enumerable' without predicate.");
        _testResult = TS.Linq.Extensions.any(TS.Linq.Enumerable.fromArray([]));
        assert.ok(!_testResult, "Should return false on an empty 'enumerable' without predicate.");

        assert.throws(function () {
            TS.Linq.Extensions.any(null, function (item) {
                return item.length < 0;
            });
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.any(_undefined, function (item) {
                return item.length < 0;
            });
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");
    });

    QUnit.test("average", function (assert) {
        var _testNumberArray;
        var _testResult;
        var _undefined;

        _testNumberArray = CreateNumberArray();
        _testResult = TS.Linq.Extensions.average(TS.Linq.Extensions.fromArray(_testNumberArray));
        assert.equal(_testResult, 5.5, "Should return expected average.");

        assert.throws(function () {
            TS.Linq.Extensions.average(TS.Linq.Extensions.empty());
        }, function (err) {
            return ((err.name == "TS.Linq.EmptyEnumerableException") ? true : false);
        }, "Should throw a 'TS.Linq.EmptyEnumerableException' for an empty 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.average(null);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for null 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.average(_undefined);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for undefined 'enumerable' argument.");

        _testNumberArray.push(Number.MAX_VALUE / 2);
        _testNumberArray.push(Number.MAX_VALUE);

        assert.throws(function () {
            TS.Linq.Extensions.average(TS.Linq.Extensions.fromArray(_testNumberArray));
        }, function (err) {
            return ((err.name == "TS.OverflowException") ? true : false);
        }, "Should throw a 'TS.OverflowException' for an 'Enumerable<number>' which exceeds the number range in sum in the 'enumerable' argument.");
    });

    QUnit.test("concat", function (assert) {
        var _testNumberResult;
        var _testStringResult;
        var _resultNumberArray;
        var _resultStringArray;
        var _compareNumberArray;
        var _undefined;

        _testNumberResult = TS.Linq.Extensions.concat(TS.Linq.Enumerable.fromArray(CreateNumberArray()), TS.Linq.Enumerable.fromArray(CreateNumberArray()));
        _resultNumberArray = _testNumberResult.toArray();
        assert.deepEqual(_resultNumberArray, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "Should return concatenation of two 'Enumerable<number>'.");

        _testStringResult = TS.Linq.Extensions.concat(TS.Linq.Enumerable.fromArray(CreateStringArray()), TS.Linq.Enumerable.fromArray(CreateStringArray()));
        _resultStringArray = _testStringResult.toArray();
        assert.deepEqual(_resultStringArray, ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"], "Should return concatenation of two 'Enumerable<string>'.");

        assert.throws(function () {
            TS.Linq.Extensions.concat(null, TS.Linq.Enumerable.fromArray(CreateStringArray()));
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an null 'firstEnumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.concat(TS.Linq.Enumerable.fromArray(CreateStringArray()), null);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an null 'secondEnumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.concat(_undefined, TS.Linq.Enumerable.fromArray(CreateStringArray()));
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'firstEnumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.concat(TS.Linq.Enumerable.fromArray(CreateStringArray()), _undefined);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'secondEnumerable' argument.");
    });

    QUnit.test("contains", function (assert) {
        var _testResult;
        var _testEmptyEnumerable;
        var _testCar;
        var _undefined;

        _testCar = new Car("SCODA");

        _testEmptyEnumerable = TS.Linq.Extensions.empty();

        _testResult = TS.Linq.Extensions.contains(TS.Linq.Enumerable.fromArray(CreateNumberArray()), 5);
        assert.ok(_testResult, "Should return true on a  lookup for an element in 'Enumerable<number>'.");

        _testResult = TS.Linq.Extensions.contains(TS.Linq.Enumerable.fromArray(CreateNumberArray()), 11);
        assert.ok(!_testResult, "Should return false on a lookup for a none existing element in 'Enumerable<number>'.");

        _testResult = TS.Linq.Extensions.contains(TS.Linq.Enumerable.fromArray(CreateStringArray()), "five");
        assert.ok(_testResult, "Should return true on a lookup for an element in 'Enumerable<string>'.");

        _testResult = TS.Linq.Extensions.contains(TS.Linq.Enumerable.fromArray(CreateStringArray()), "eleven");
        assert.ok(!_testResult, "Should return false on a lookup for a none existing element in 'Enumerable<string>'.");

        _testResult = TS.Linq.Extensions.contains(_testEmptyEnumerable, 123);
        assert.ok(!_testResult, "Should return false on a lookup in an empty enumerable.");

        _testResult = TS.Linq.Extensions.contains(TS.Linq.Enumerable.fromArray(CreateCarsArray()), CreateCarsArray()[3], function (first, second) {
            return first.name == second.name;
        });
        assert.ok(_testResult, "Should return true on a lookup for an element in 'Enumerable<Car>' with an equalityComparer.");

        _testResult = TS.Linq.Extensions.contains(TS.Linq.Enumerable.fromArray(CreateCarsArray()), _testCar, function (first, second) {
            return first.name == second.name;
        });
        assert.ok(!_testResult, "Should return false on a lookup for a none existing element in 'Enumerable<Car>' with an equalityComparer.");

        assert.throws(function () {
            TS.Linq.Extensions.contains(null, 123);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.contains(_testEmptyEnumerable, null);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'element' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.contains(_undefined, 123);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.contains(_testEmptyEnumerable, _undefined);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'element' argument.");
    });

    QUnit.test("count", function (assert) {
        var _testNumberEnumerable;
        var _testStringEnumerable;
        var _testCarEnumerable;
        var _undefined;

        _testNumberEnumerable = TS.Linq.Enumerable.fromArray(CreateNumberArray());
        _testStringEnumerable = TS.Linq.Enumerable.fromArray(CreateStringArray());
        _testCarEnumerable = TS.Linq.Enumerable.fromArray(CreateCarsArray());

        assert.equal(TS.Linq.Extensions.count(_testNumberEnumerable), 10, "Should count 10 numbers out of 10.");
        assert.equal(TS.Linq.Extensions.count(_testNumberEnumerable, function (item) {
            return item > 5;
        }), 5, "Should count 5 numbers greater 5 out of 10.");
        assert.equal(TS.Linq.Extensions.count(TS.Linq.Extensions.empty()), 0, "Should counted 0 on an empty enumerable.");
        assert.equal(TS.Linq.Extensions.count(_testStringEnumerable, function (item) {
            return item.indexOf("e") > -1;
        }), 7, "Should count 7 elements with character 'e' in an 'Enumerable<string>' using a predicate.");
        assert.equal(TS.Linq.Extensions.count(_testCarEnumerable, function (item) {
            return item.horsePower > 100;
        }), 3, "Should count 4 elements with horsePower greater 100 in an 'Enumerable<Car>' using a predicate.");

        assert.throws(function () {
            TS.Linq.Extensions.count(null);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.count(_undefined);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");
    });

    QUnit.test("cycle", function (assert) {
        var _testStringEnumerable;
        var _testResultEnumerable;
        var _testResultArray;
        var _undefined;

        _testStringEnumerable = TS.Linq.Extensions.fromArray(CreateStringArray());
        _testResultEnumerable = TS.Linq.Extensions.cycle(_testStringEnumerable).take(40);
        _testResultArray = _testResultEnumerable.toArray();
        assert.equal(_testResultArray.length, 40, "Should return 40 elements after a call to 'take(40)'.");

        _testResultArray = TS.Linq.Extensions.cycle(TS.Linq.Extensions.empty()).take(20).toArray();

        assert.equal(_testResultArray.length, 0, "Should return an empty enumerable if the argument 'enumerable' was also an empty enumerable.");

        assert.throws(function () {
            TS.Linq.Extensions.cycle(null);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.cycle(_undefined);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");
    });

    QUnit.test("defaultIfEmpty", function (assert) {
        var _testResultCarEnumerable;
        var _testResultCarArray;
        var _undefined;

        _testResultCarEnumerable = TS.Linq.Extensions.defaultIfEmpty(TS.Linq.Extensions.empty(), Car);
        _testResultCarArray = _testResultCarEnumerable.toArray();
        assert.deepEqual(_testResultCarArray[0], new Car(), "Should return an enumerable with one default element on an empty enumerable.");

        _testResultCarEnumerable = TS.Linq.Extensions.defaultIfEmpty(TS.Linq.Extensions.fromArray(CreateCarsArray()), Car);
        _testResultCarArray = _testResultCarEnumerable.toArray();
        assert.deepEqual(_testResultCarArray, CreateCarsArray(), "Should return the original enumerable on a none empty enumerable.");

        assert.throws(function () {
            TS.Linq.Extensions.defaultIfEmpty(null, Car);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.defaultIfEmpty(TS.Linq.Extensions.empty(), null);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'defaultConstructor' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.defaultIfEmpty(_undefined, Car);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should threw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.defaultIfEmpty(TS.Linq.Extensions.empty(), _undefined);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'defaultConstructor' argument.");
    });

    QUnit.test("distinct", function (assert) {
        var _testResultCarEnumerable;
        var _testResultCarArray;
        var _testInputCarEnumerable;
        var _testInputCarArray;
        var _testResultNumberArray;
        var _undefined;

        _testInputCarArray = CreateCarsArray();
        _testInputCarArray.push(new Car("VOLVO", 220, false, Date.parse("1999-01-01"), 21000));
        _testInputCarArray.push(new Car("AUDI", 110, false, Date.parse("1999-04-15"), 4000));
        _testInputCarArray.push(new Car("BENTLEY", 350, false, Date.parse("2012-01-01"), 55000));
        _testInputCarArray.push(new Car("FIAT", 60, false, Date.parse("1980-01-01"), 500));
        _testInputCarEnumerable = TS.Linq.Extensions.fromArray(_testInputCarArray);
        _testResultCarEnumerable = TS.Linq.Extensions.distinct(_testInputCarEnumerable, function (first, second) {
            return first.name == second.name;
        });
        _testResultCarArray = TS.Linq.Extensions.toArray(_testResultCarEnumerable);
        assert.equal(_testResultCarArray.length, 7, "Should return a result enumerable with 7 elements from the input enumerable with 9 elements using the given 'equalityComparer'.");

        _testResultNumberArray = TS.Linq.Extensions.fromArray([0, 0, 1, 2, 2, 2, 3, 4, 4, 5, 6, 6, 6, 6, 6, 7, 8, 8, 8, 9, 9]).distinct().toArray();
        assert.equal(_testResultNumberArray.length, 10, "Should return a result enumerable with 10 elements from the input enumerable of type 'Enumerable<number>' with no 'equalityComparer' defined.");

        assert.throws(function () {
            TS.Linq.Extensions.distinct(null);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.distinct(_undefined);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");
    });

    QUnit.test("elementAt", function (assert) {
        var _testInputCarEnumerable;
        var _testResultCar;
        var _undefined;

        _testInputCarEnumerable = TS.Linq.Extensions.fromArray(CreateCarsArray());

        _testResultCar = TS.Linq.Extensions.elementAt(_testInputCarEnumerable, 3);
        assert.deepEqual(_testResultCar, CreateCarsArray()[3], "Should return the element at the required position.");

        assert.throws(function () {
            TS.Linq.Extensions.elementAt(_testInputCarEnumerable, -3);
        }, function (err) {
            return ((err.name == "TS.ArgumentOutOfRangeException") ? true : false);
        }, "Should throw a 'TS.ArgumentOutOfRangeException' for an 'index' argument value less than 0.");

        assert.throws(function () {
            TS.Linq.Extensions.elementAt(_testInputCarEnumerable, 3.5);
        }, function (err) {
            return ((err.name == "TS.ArgumentOutOfRangeException") ? true : false);
        }, "Should throw a 'TS.ArgumentOutOfRangeException' for an 'index' argument value which is a float and not an integer.");

        assert.throws(function () {
            TS.Linq.Extensions.elementAt(_testInputCarEnumerable, 20);
        }, function (err) {
            return ((err.name == "TS.IndexOutOfRangeException") ? true : false);
        }, "Should throw a 'TS.IndexOutOfRangeException' for an 'index' argument value greater than the number of elements in argument 'enumerable'.");

        assert.throws(function () {
            TS.Linq.Extensions.elementAt(null, 20);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.elementAt(_testInputCarEnumerable, null);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'index' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.elementAt(_undefined, 20);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.elementAt(_testInputCarEnumerable, _undefined);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'index' argument.");
    });

    QUnit.test("elementAtOrDefault", function (assert) {
        var _testInputCarEnumerable;
        var _testResultCar;
        var _undefined;

        _testInputCarEnumerable = TS.Linq.Extensions.fromArray(CreateCarsArray());

        _testResultCar = TS.Linq.Extensions.elementAtOrDefault(_testInputCarEnumerable, 3, Car);
        assert.deepEqual(_testResultCar, CreateCarsArray()[3], "Should return the element at the required position.");

        _testResultCar = TS.Linq.Extensions.elementAtOrDefault(_testInputCarEnumerable, 20, Car);
        assert.deepEqual(_testResultCar, new Car(), "Should return a default element for a required position out of the range of the enumerable.");

        assert.throws(function () {
            TS.Linq.Extensions.elementAtOrDefault(_testInputCarEnumerable, -3, Car);
        }, function (err) {
            return ((err.name == "TS.ArgumentOutOfRangeException") ? true : false);
        }, "Should throw a 'TS.ArgumentOutOfRangeException' for an 'index' argument value less than 0.");

        assert.throws(function () {
            TS.Linq.Extensions.elementAtOrDefault(null, 20, Car);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.elementAtOrDefault(_testInputCarEnumerable, null, Car);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'index' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.elementAtOrDefault(_testInputCarEnumerable, 20, null);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'defaultConstructor' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.elementAtOrDefault(_undefined, 20, Car);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.elementAtOrDefault(_testInputCarEnumerable, _undefined, Car);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'index' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.elementAtOrDefault(_testInputCarEnumerable, 20, _undefined);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'defaultConstructor' argument.");
    });

    QUnit.test("empty", function (assert) {
        var _emptyCar;
        var _emptyArr;
        _emptyCar = TS.Linq.Extensions.empty();
        _emptyArr = _emptyCar.toArray();
        assert.ok(_emptyArr.length == 0, "Should create an enumerable with 0 elements.");
    });

    QUnit.test("except", function (assert) {
        var _firstSet;
        var _secondSet;
        var _resultSet;
        var _resultArray;
        var _testInputCarArray;
        var _testInputCarEnumerable;
        var _testCarResultArray;
        var _undefined;

        _firstSet = TS.Linq.Extensions.fromArray([1, 2, 3, 4, 5, 6]);
        _secondSet = TS.Linq.Extensions.fromArray([4, 5, 6, 7, 8, 9]);
        _resultSet = TS.Linq.Extensions.except(_firstSet, _secondSet);
        _resultArray = _resultSet.toArray();
        assert.deepEqual(_resultArray, [1, 2, 3], "Should return a result set with 3 elements.");

        _secondSet = TS.Linq.Extensions.fromArray([1, 2]);
        _resultSet = TS.Linq.Extensions.except(_firstSet, _secondSet);
        _resultArray = _resultSet.toArray();
        assert.deepEqual(_resultArray, [3, 4, 5, 6], "Should return a result set with 4 elements.");

        _secondSet = TS.Linq.Extensions.fromArray([2, 5]);
        _resultSet = TS.Linq.Extensions.except(_firstSet, _secondSet);
        _resultArray = _resultSet.toArray();
        assert.deepEqual(_resultArray, [1, 3, 4, 6], "Should return a result set with 4 elements.");

        _testInputCarArray = new Array();
        _testInputCarArray.push(new Car("VOLVO", 220, false, Date.parse("1999-01-01"), 21000));
        _testInputCarArray.push(new Car("AUDI", 110, false, Date.parse("1999-04-15"), 4000));
        _testInputCarArray.push(new Car("BENTLEY", 350, false, Date.parse("2012-01-01"), 55000));
        _testInputCarArray.push(new Car("FIAT", 60, false, Date.parse("1980-01-01"), 500));
        _testInputCarEnumerable = TS.Linq.Extensions.fromArray(_testInputCarArray);

        _resultArray = TS.Linq.Extensions.except(TS.Linq.Extensions.fromArray(CreateCarsArray()), _testInputCarEnumerable, function (first, second) {
            return (first.name == second.name);
        }).toArray();
        assert.equal(_resultArray.length, 3, "Should return a result set with 3 elements.");

        assert.throws(function () {
            TS.Linq.Extensions.except(null, _secondSet);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'firstEnumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.except(_firstSet, null);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'secondEnumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.except(_undefined, _secondSet);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'firstEnumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.except(_firstSet, _undefined);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'secondEnumerable' argument.");
    });

    QUnit.test("first", function (assert) {
        var _result;
        var _undefined;

        _result = TS.Linq.Extensions.where(personEnumerable, function (item) {
            return item.FirstName == "Michael";
        }).first();
        assert.equal(_result.LastName, "Blythe", "Should return the first match in the result set.");

        _result = TS.Linq.Extensions.first(personEnumerable, function (item) {
            return item.FirstName == "Michael";
        });
        assert.equal(_result.LastName, "Blythe", "Should return the first match in the result set when called with a predicate.");

        assert.throws(function () {
            TS.Linq.Extensions.first(TS.Linq.Extensions.empty());
        }, function (err) {
            return ((err.name == "TS.Linq.EmptyEnumerableException") ? true : false);
        }, "Should trow a TS.Linq.EmptyEnumerableException on an empty enumerable.");

        assert.throws(function () {
            TS.Linq.Extensions.first(personEnumerable, function (item) {
                return item.NoAttribute == "NOP";
            });
        }, function (err) {
            return ((err.name == "TS.InvalidOperationException") ? true : false);
        }, "Should trow a TS.InvalidOperationException when called with an invalid predicate.");

        assert.throws(function () {
            TS.Linq.Extensions.first(TS.Linq.Extensions.empty(), function (item) {
                return item.toString() == "5";
            });
        }, function (err) {
            return ((err.name == "TS.Linq.EmptyEnumerableException") ? true : false);
        }, "Should trow a TS.Linq.EmptyEnumerableException on an empty enumerable when called with a predicate.");

        assert.throws(function () {
            TS.Linq.Extensions.first(null);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.first(_undefined);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");
    });

    QUnit.test("firstOrDefault", function (assert) {
        var _result;
        var _carEnumerable;

        _carEnumerable = TS.Linq.Extensions.fromArray(CreateCarsArray());

        _result = TS.Linq.Extensions.where(_carEnumerable, function (item) {
            return item.name == "VW";
        }).firstOrDefault(Car);
        assert.equal(_result.name, "VW", "Should return the first match in the result set.");

        _result = TS.Linq.Extensions.where(_carEnumerable, function (item) {
            return item.name == "faöejrfkesjköpaf";
        }).firstOrDefault(Car);
        assert.deepEqual(_result, new Car(), "Should return a default object if the enumerable is empyt.");

        _result = TS.Linq.Extensions.firstOrDefault(_carEnumerable, Car, function (item) {
            return item.name == "AUDI";
        });
        assert.equal(_result.name, "AUDI", "Should return the first match in the result set when called with a predicate.");

        _result = TS.Linq.Extensions.firstOrDefault(_carEnumerable, Car, function (item) {
            return item.name == "faöejrfkesjköpaf";
        });
        assert.deepEqual(_result, new Car(), "Should return a default object on an enumerable with no match on the predicate.");

        _result = TS.Linq.Extensions.firstOrDefault(_carEnumerable, Car, function (item) {
            return item.noValidAttribute == 5;
        });
        assert.deepEqual(_result, new Car(), "Should return a default object on an enumerable with an invalid predicate.");
    });

    QUnit.test("fromArray", function (assert) {
        var _testArray = CreateNumberArray();
        var _testEnumerable;

        _testEnumerable = TS.Linq.Extensions.fromArray(CreateNumberArray());
        assert.equal(_testEnumerable.count(), _testArray.length, "Should return a enumerable with as much elements as the source array.");

        _testEnumerable = TS.Linq.Extensions.fromArray([]);
        assert.equal(_testEnumerable.count(), 0, "Should return an empty enumerable when calle with an empty array.");

        assert.throws(function () {
            TS.Linq.Extensions.fromArray(null);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'sourceArray' argument.");
    });

    QUnit.test("join", function (assert) {
        var _jointEnum;
        var _jointArray;
        var _undefined;

        _jointEnum = TS.Linq.Extensions.join(customersEnumerable, ordersEnumerable, function (outerItem) {
            return outerItem.CustomerID;
        }, function (innerItem) {
            return innerItem.CustomerID;
        }, function (outerItem, innerItem) {
            return ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry });
        });

        _jointArray = _jointEnum.toArray();
        assert.ok(_jointArray.length == 830, "Should return 830 records for the executed expression.");

        assert.throws(function () {
            TS.Linq.Extensions.join(customersEnumerable, ordersEnumerable, null, function (innerItem) {
                return innerItem.CustomerID;
            }, function (outerItem, innerItem) {
                return ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry });
            });
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'outerKeySelector' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.join(customersEnumerable, ordersEnumerable, _undefined, function (innerItem) {
                return innerItem.CustomerID;
            }, function (outerItem, innerItem) {
                return ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry });
            });
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'outerKeySelector' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.join(customersEnumerable, ordersEnumerable, function (outerItem) {
                return outerItem.CustomerID;
            }, null, function (outerItem, innerItem) {
                return ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry });
            });
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'innerKeySelector' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.join(customersEnumerable, ordersEnumerable, function (outerItem) {
                return outerItem.CustomerID;
            }, _undefined, function (outerItem, innerItem) {
                return ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry });
            });
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'innerKeySelector' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.join(customersEnumerable, ordersEnumerable, function (outerItem) {
                return outerItem.CustomerID;
            }, function (innerItem) {
                return innerItem.CustomerID;
            }, null);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'resultSelector' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.join(customersEnumerable, ordersEnumerable, function (outerItem) {
                return outerItem.CustomerID;
            }, function (innerItem) {
                return innerItem.CustomerID;
            }, _undefined);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'resultSelector' argument.");
    });

    QUnit.test("last", function (assert) {
        var _result;
        var _undefined;

        _result = TS.Linq.Extensions.where(personEnumerable, function (item) {
            return item.FirstName == "Michael";
        }).last();
        assert.equal(_result.LastName, "Martin", "Should return the last element in the result set.");

        _result = TS.Linq.Extensions.last(personEnumerable, function (item) {
            return item.FirstName == "Michael";
        });
        assert.equal(_result.LastName, "Martin", "Should return the last match in the result set when called with a predicate.");

        assert.throws(function () {
            TS.Linq.Extensions.last(TS.Linq.Extensions.empty());
        }, function (err) {
            return ((err.name == "TS.Linq.EmptyEnumerableException") ? true : false);
        }, "Should trow a TS.Linq.EmptyEnumerableException on an empty enumerable.");

        assert.throws(function () {
            TS.Linq.Extensions.last(personEnumerable, function (item) {
                return item.NoAttribute == "NOP";
            });
        }, function (err) {
            return ((err.name == "TS.InvalidOperationException") ? true : false);
        }, "Should trow a TS.InvalidOperationException when called with an invalid predicate.");

        assert.throws(function () {
            TS.Linq.Extensions.last(TS.Linq.Extensions.empty(), function (item) {
                return item.toString() == "5";
            });
        }, function (err) {
            return ((err.name == "TS.Linq.EmptyEnumerableException") ? true : false);
        }, "Should trow a TS.Linq.EmptyEnumerableException on an empty enumerable when called with a predicate.");

        assert.throws(function () {
            TS.Linq.Extensions.last(null);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.last(_undefined);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");
    });

    QUnit.test("lastOrDefault", function (assert) {
        var _result;
        var _undefined;

        var _arr = customersEnumerable.toArray();

        _result = TS.Linq.Extensions.lastOrDefault(customersEnumerable, Customer);
        assert.equal(_result.ContactName, "Zbyszek Piestrzeniewicz", "Should return the last element in the enumerable.");

        _result = TS.Linq.Extensions.lastOrDefault(customersEnumerable.where(function (Item) {
            return Item.Country == "NOP";
        }), Customer);
        assert.deepEqual(_result, new Customer(), "Should return a default object if the enumerable is empyt.");

        _result = TS.Linq.Extensions.lastOrDefault(customersEnumerable, Customer, function (Item) {
            return Item.Country == "USA";
        });
        assert.equal(_result.CompanyName, "White Clover Markets", "Should return the last match in the result set when called with a predicate.");

        _result = TS.Linq.Extensions.lastOrDefault(customersEnumerable, Customer, function (Item) {
            return Item.Country == "NOP";
        });
        assert.deepEqual(_result, new Customer(), "Should return a default object if the result set is empyt.");

        assert.throws(function () {
            TS.Linq.Extensions.lastOrDefault(null, Customer);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.lastOrDefault(_undefined, Customer);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.lastOrDefault(customersEnumerable, null);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'defaultConstructor' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.lastOrDefault(customersEnumerable, _undefined);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'defaultConstructor' argument.");
    });

    QUnit.test("orderBy", function (assert) {
        var _sortTestArray;
        var _randomNumberArray;
        var _resultISortTestArray;
        var _resultNumberTestArray;
        var _orderCorrect;
        var _index;
        var _undefined;

        _sortTestArray = CreateSortTestArray();
        _resultISortTestArray = TS.Linq.Extensions.orderBy(TS.Linq.Extensions.fromArray(_sortTestArray), function (item) {
            return item.color;
        }).toArray();

        _orderCorrect = true;

        for (_index = 0; _index < _resultISortTestArray.length - 1; _index++) {
            if (_resultISortTestArray[_index].color > _resultISortTestArray[_index + 1].color) {
                _orderCorrect = false;
                break;
            }
        }

        assert.ok(_orderCorrect, "The array of ISortTestItems should be sorted by color in ascending order.");

        _randomNumberArray = CreateRandomNumberArray(100);
        _resultNumberTestArray = TS.Linq.Extensions.orderBy(TS.Linq.Extensions.fromArray(_randomNumberArray), function (item) {
            return item;
        }).toArray();

        _orderCorrect = true;

        for (_index = 0; _index < _resultNumberTestArray.length - 1; _index++) {
            if (_resultNumberTestArray[_index] > _resultNumberTestArray[_index + 1]) {
                _orderCorrect = false;
                break;
            }
        }

        assert.ok(_orderCorrect, "Should returns an array of numbers sorted in ascending order.");

        assert.throws(function () {
            TS.Linq.Extensions.orderBy(null, function (item) {
                return item;
            });
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.orderBy(_undefined, function (item) {
                return item;
            });
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");
    });

    QUnit.test("random", function (assert) {
        var _emptyEnumerable;
        var _stringEnumerable;
        var _stringArray;
        var _stringResultArray;
        var _numberResultArray;
        var _isRandom = false;
        var _index;
        var _undefined;

        _stringArray = CreateStringArray();
        _stringEnumerable = TS.Linq.Extensions.fromArray(_stringArray);
        _stringResultArray = TS.Linq.Extensions.random(_stringEnumerable).take(50).toArray();

        for (_index = 0; _index < _stringArray.length; _index++) {
            if (_stringArray[_index] != _stringResultArray[_index]) {
                _isRandom = true;
                break;
            }
        }

        assert.ok(_isRandom, "Should return a string array in random order.");

        _emptyEnumerable = TS.Linq.Extensions.empty();
        _numberResultArray = TS.Linq.Extensions.random(_emptyEnumerable).take(50).toArray();

        assert.equal(_numberResultArray.length, 0, "Should return an empty enumeration if the input enumeration was also empty.");

        assert.throws(function () {
            TS.Linq.Extensions.random(null).take(50);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.random(_undefined).take(50);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");
    });

    QUnit.test("repeat", function (assert) {
        var _sourceElement;
        var _undefined;
        var _resultArray;

        _sourceElement = CreateCarsArray()[0];

        _resultArray = TS.Linq.Extensions.repeat(_sourceElement, 50).toArray();
        assert.ok(_resultArray.length == 50 && _resultArray[0].name == "BMW", "Should return a result with as much elements as required in repeat and of the same type.");

        assert.throws(function () {
            TS.Linq.Extensions.repeat(null, 33);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should trow a TS.ArgumentNullOrUndefinedException for a null 'item' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.repeat(_undefined, 33);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should trow a TS.ArgumentNullOrUndefinedException for an undefined 'item' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.repeat(_sourceElement, -33);
        }, function (err) {
            return ((err.name == "TS.ArgumentOutOfRangeException") ? true : false);
        }, "Should trow a TS.TS.ArgumentOutOfRangeException on a negative 'count' argument.");
    });

    QUnit.test("reverse", function (assert) {
        var _numberArray;
        var _resultArray;
        var _controlArray;
        var _emptyEnumerable;
        var _index;
        var _failed;
        var _undefined;

        _numberArray = CreateNumberArray();
        _controlArray = CreateNumberArray().reverse();

        _resultArray = TS.Linq.Extensions.reverse(TS.Linq.Extensions.fromArray(_numberArray)).toArray();
        _failed = false;

        for (_index = 0; _index < _resultArray.length; _index++) {
            if (_resultArray[_index] != _controlArray[_index]) {
                _failed = true;
                break;
            }
        }

        assert.ok(!_failed, "Should return an array which matches with the control array.");

        _emptyEnumerable = TS.Linq.Extensions.empty();
        _resultArray = TS.Linq.Extensions.reverse(_emptyEnumerable).toArray();

        assert.equal(_resultArray.length, 0, "Should return an empty enumerabe if the input enumerable was also empty.");

        assert.throws(function () {
            TS.Linq.Extensions.reverse(null);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.reverse(_undefined);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should trow a TS.ArgumentNullOrUndefinedException for an undefined 'enumerable' argument.");
    });

    QUnit.test("select", function (assert) {
        var _carsEnumerable;
        var _resultArray;
        var _expensiveCount;
        var _undefined;
        var _index;

        _carsEnumerable = TS.Linq.Extensions.fromArray(CreateCarsArray());
        _resultArray = TS.Linq.Extensions.select(_carsEnumerable, function (item) {
            return ({ buildYear: "'" + item.buildYear + "'", name: "'" + item.name + "'", expensive: ((item.price > 5000) ? "yes" : "no") });
        }).toArray();

        _expensiveCount = 0;
        for (_index = 0; _index < _resultArray.length; _index++) {
            if (_resultArray[_index].expensive == "yes") {
                _expensiveCount++;
            }
        }

        assert.ok(_expensiveCount == 2, "Should return two expensive cars from the cars enumerable.");

        assert.throws(function () {
            TS.Linq.Extensions.select(mmEnumerable, function (item) {
                return item.NOP;
            }).toArray();
        }, function (err) {
            return ((err.name == "TS.Linq.SelectorException") ? true : false);
        }, "Should throw a TS.Linq.SelectorException if called with an invalid selector.");

        assert.throws(function () {
            TS.Linq.Extensions.select(null, function (item) {
                return item;
            });
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a TS.ArgumentNullOrUndefinedException for a null 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.select(_undefined, function (item) {
                return item;
            });
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a TS.ArgumentNullOrUndefinedException for an undefined 'enumerable' argument.");
    });

    QUnit.test("selectMany", function (assert) {
        var _outerIndex;
        var _innerIndex;
        var _simpleElementsCount;
        var _resultMany;
        var _resultSimple;
        var _resultSimpleExpanded;
        var _undefined;

        var _resultMany = TS.Linq.Extensions.selectMany(mmEnumerable, function (item) {
            return item.vars;
        }).toArray();
        var _resultSimple = TS.Linq.Extensions.select(mmEnumerable, function (item) {
            return item.vars;
        }).toArray();

        _simpleElementsCount = 0;
        _resultSimpleExpanded = new Array();

        for (_outerIndex = 0; _outerIndex < _resultSimple.length; _outerIndex++) {
            if (_resultSimple[_outerIndex].length > 0) {
                for (_innerIndex = 0; _innerIndex < _resultSimple[_outerIndex].length; _innerIndex++) {
                    _simpleElementsCount++;
                    _resultSimpleExpanded.push(_resultSimple[_outerIndex][_innerIndex]);
                }
            }
        }

        assert.equal(_simpleElementsCount, _resultMany.length, "Should return a result which has the same length as an expanded simple select.");
        assert.deepEqual(_resultMany, _resultSimpleExpanded, "Should return a result which should be equal to the expanded simple select result.");

        assert.throws(function () {
            TS.Linq.Extensions.selectMany(mmEnumerable, function (item) {
                return item.NOP;
            }).toArray();
        }, function (err) {
            return ((err.name == "TS.Linq.SelectorException") ? true : false);
        }, "Should throw a TS.Linq.SelectorException if called with an invalid selector.");

        assert.throws(function () {
            TS.Linq.Extensions.selectMany(null, function (item) {
                return item;
            });
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a TS.ArgumentNullOrUndefinedException for a null 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.selectMany(_undefined, function (item) {
                return item;
            });
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a TS.ArgumentNullOrUndefinedException for an undefined 'enumerable' argument.");
    });

    QUnit.test("shuffle", function (assert) {
        var _numberArr;
        var _nuberEnumerable;
        var _undefined;

        _nuberEnumerable = TS.Linq.Enumerable.fromArray(CreateNumberArray());
        _nuberEnumerable = TS.Linq.Extensions.shuffle(_nuberEnumerable);
        _numberArr = _nuberEnumerable.toArray();

        assert.equal(_numberArr.length, CreateNumberArray().length, "Should return a result array with the same length as the source array.");
        assert.notDeepEqual(_numberArr, CreateNumberArray(), "Should return a shuffled array which doesn't be equal to the source array");
        _numberArr = _numberArr.sort(function (first, second) {
            return first - second;
        });
        assert.deepEqual(_numberArr, CreateNumberArray(), "Should match with the source array after sorting.");

        assert.throws(function () {
            TS.Linq.Extensions.shuffle(null);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.shuffle(_undefined);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");
    });

    QUnit.test("skip", function (assert) {
        var _numberArr;
        var _numberEnumerable;
        var _expectedArr;
        var _undefined;

        _expectedArr = new Array();
        _expectedArr.push(5, 6, 7, 8, 9, 10);
        _numberEnumerable = TS.Linq.Enumerable.fromArray(CreateNumberArray());
        _numberArr = TS.Linq.Extensions.skip(_numberEnumerable, 4).toArray();
        assert.deepEqual(_numberArr, _expectedArr, "Should return a result array which matches with the expected array.");

        assert.throws(function () {
            TS.Linq.Extensions.skip(_numberEnumerable, -5);
        }, function (err) {
            return ((err.name == "TS.ArgumentOutOfRangeException") ? true : false);
        }, "Should throw a 'TS.ArgumentOutOfRangeException' for a negative 'count' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.skip(null, 5);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.skip(_undefined, 5);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");
    });

    QUnit.test("skipWhile", function (assert) {
        var _numberArr;
        var _numberEnumerable;
        var _expectedArr;
        var _undefined;

        _expectedArr = new Array();
        _expectedArr.push(5, 6, 7, 8, 9, 10);
        _numberEnumerable = TS.Linq.Enumerable.fromArray(CreateNumberArray());
        _numberArr = TS.Linq.Extensions.skipWhile(_numberEnumerable, function (item) {
            return item < 5;
        }).toArray();
        assert.deepEqual(_numberArr, _expectedArr, "Should return a result array which matches with the expected array.");

        assert.throws(function () {
            TS.Linq.Extensions.skipWhile(null, function (item) {
                return item < 5;
            });
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.skipWhile(_undefined, function (item) {
                return item < 5;
            });
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.skipWhile(_numberEnumerable, null);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'predicate' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.skipWhile(_numberEnumerable, _undefined);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'predicate' argument.");
    });

    QUnit.test("sum", function (assert) {
        var _testNumberArray;
        var _testResult;
        var _undefined;

        _testNumberArray = CreateNumberArray();
        _testResult = TS.Linq.Extensions.sum(TS.Linq.Enumerable.fromArray(_testNumberArray));
        assert.equal(_testResult, 55, "Should return expected sum.");

        assert.throws(function () {
            TS.Linq.Extensions.sum(TS.Linq.Extensions.empty());
        }, function (err) {
            return ((err.name == "TS.Linq.EmptyEnumerableException") ? true : false);
        }, "Should throw a 'TS.Linq.EmptyEnumerableException' for an empty 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.sum(null);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for null 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.sum(_undefined);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for undefined 'enumerable' argument.");

        _testNumberArray.push(Number.MAX_VALUE / 2);
        _testNumberArray.push(Number.MAX_VALUE);

        assert.throws(function () {
            TS.Linq.Extensions.average(TS.Linq.Extensions.fromArray(_testNumberArray));
        }, function (err) {
            return ((err.name == "TS.OverflowException") ? true : false);
        }, "Should throw a 'TS.OverflowException' for an 'Enumerable<number>' which exceeds the number range in sum in the 'enumerable' argument.");
    });

    QUnit.test("take", function (assert) {
        var _numberArr;
        var _numberEnumerable;
        var _expectedArr;
        var _undefined;

        _expectedArr = new Array();
        _expectedArr.push(1, 2, 3, 4);
        _numberEnumerable = TS.Linq.Enumerable.fromArray(CreateNumberArray());
        _numberArr = TS.Linq.Extensions.take(_numberEnumerable, 4).toArray();
        assert.deepEqual(_numberArr, _expectedArr, "Should return a result array which matches with the expected array.");

        assert.throws(function () {
            TS.Linq.Extensions.take(_numberEnumerable, -5);
        }, function (err) {
            return ((err.name == "TS.ArgumentOutOfRangeException") ? true : false);
        }, "Should throw a 'TS.ArgumentOutOfRangeException' for a negative 'count' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.take(null, 5);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.take(_undefined, 5);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");
    });

    QUnit.test("takeWhile", function (assert) {
        var _numberArr;
        var _numberEnumerable;
        var _expectedArr;
        var _undefined;

        _expectedArr = new Array();
        _expectedArr.push(1, 2, 3, 4);
        _numberEnumerable = TS.Linq.Enumerable.fromArray(CreateNumberArray());
        _numberArr = TS.Linq.Extensions.takeWhile(_numberEnumerable, function (item) {
            return item < 5;
        }).toArray();
        assert.deepEqual(_numberArr, _expectedArr, "Should return a result array which matches with the expected array.");

        assert.throws(function () {
            TS.Linq.Extensions.takeWhile(null, function (item) {
                return item < 5;
            });
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.takeWhile(_undefined, function (item) {
                return item < 5;
            });
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.takeWhile(_numberEnumerable, null);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'predicate' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.takeWhile(_numberEnumerable, _undefined);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'predicate' argument.");
    });

    QUnit.test("toArray", function (assert) {
        var _numberArr;
        var _numberEnumerable;
        var _expectedArr;
        var _undefined;

        _expectedArr = CreateNumberArray();
        _numberEnumerable = TS.Linq.Enumerable.fromArray(CreateNumberArray());
        _numberArr = TS.Linq.Extensions.toArray(_numberEnumerable);
        assert.deepEqual(_numberArr, _expectedArr, "Should return a result array which matches with the expected array.");

        assert.throws(function () {
            TS.Linq.Extensions.toArray(null);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.toArray(_undefined);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");
    });

    QUnit.test("thenBy", function (assert) {
        var _sortTestEnumerable;
        var _orderedEnumerable;
        var _resultArray;
        var _resultArrayColorGroup;
        var _colorsArray;
        var _index;
        var _sortedAsExpected;
        var _undefined;

        _sortTestEnumerable = TS.Linq.Enumerable.fromArray(CreateSortTestArray());
        _orderedEnumerable = _sortTestEnumerable.orderBy(function (Item) {
            return Item.color;
        });
        _orderedEnumerable = TS.Linq.Extensions.thenBy(_orderedEnumerable, function (Item) {
            return Item.location;
        });
        _resultArray = _orderedEnumerable.toArray();

        _sortedAsExpected = true;

        for (_index = 0; _index < _resultArray.length; _index++) {
            if (_index < 1) {
                continue;
            }

            if (_resultArray[_index].color < _resultArray[_index - 1].color) {
                _sortedAsExpected = false;
                break;
            }
        }

        _colorsArray = TS.Linq.Enumerable.fromArray(_resultArray).select(function (Item) {
            return Item.color;
        }).distinct().toArray();
        _colorsArray.forEach(function (value) {
            _resultArrayColorGroup = _resultArray.filter(function (Item) {
                return Item.color == value;
            });

            for (_index = 0; _index < _resultArrayColorGroup.length; _index++) {
                if (_index < 1) {
                    continue;
                }

                if (_resultArrayColorGroup[_index].location < _resultArrayColorGroup[_index - 1].location) {
                    _sortedAsExpected = false;
                    break;
                }
            }
        });
        assert.ok(_sortedAsExpected, "Should return a result array which is sorted by color in first order and by location in secondary order.");

        assert.throws(function () {
            TS.Linq.Extensions.thenBy(null, function (Item) {
                return Item.location;
            });
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.thenBy(_undefined, function (Item) {
                return Item.location;
            });
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");
    });

    QUnit.test("thenByDescending", function (assert) {
        var _sortTestEnumerable;
        var _orderedEnumerable;
        var _resultArray;
        var _resultArrayColorGroup;
        var _colorsArray;
        var _index;
        var _sortedAsExpected;
        var _undefined;

        _sortTestEnumerable = TS.Linq.Enumerable.fromArray(CreateSortTestArray());
        _orderedEnumerable = _sortTestEnumerable.orderBy(function (Item) {
            return Item.color;
        });
        _orderedEnumerable = TS.Linq.Extensions.thenByDescending(_orderedEnumerable, function (Item) {
            return Item.location;
        });
        _resultArray = _orderedEnumerable.toArray();

        _sortedAsExpected = true;

        for (_index = 0; _index < _resultArray.length; _index++) {
            if (_index < 1) {
                continue;
            }

            if (_resultArray[_index].color < _resultArray[_index - 1].color) {
                _sortedAsExpected = false;
                break;
            }
        }

        _colorsArray = TS.Linq.Enumerable.fromArray(_resultArray).select(function (Item) {
            return Item.color;
        }).distinct().toArray();
        _colorsArray.forEach(function (value) {
            _resultArrayColorGroup = _resultArray.filter(function (Item) {
                return Item.color == value;
            });

            for (_index = 0; _index < _resultArrayColorGroup.length; _index++) {
                if (_index < 1) {
                    continue;
                }

                if (_resultArrayColorGroup[_index].location > _resultArrayColorGroup[_index - 1].location) {
                    _sortedAsExpected = false;
                    break;
                }
            }
        });
        assert.ok(_sortedAsExpected, "Should return a result array which is sorted by color in first order and by location descending in secondary order.");

        assert.throws(function () {
            TS.Linq.Extensions.thenByDescending(null, function (Item) {
                return Item.location;
            });
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.thenByDescending(_undefined, function (Item) {
                return Item.location;
            });
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");
    });

    QUnit.test("union", function (assert) {
        var _carsEnumOne;
        var _carsEnumTwo;
        var _carsEnumResult;
        var _carsArrayResult;
        var _undefined;

        _carsEnumOne = TS.Linq.Enumerable.fromArray(CreateCarsArray());
        _carsEnumTwo = TS.Linq.Enumerable.fromArray(CreateCarsUnionTestArray());

        _carsEnumResult = TS.Linq.Extensions.union(_carsEnumOne, _carsEnumTwo);
        _carsArrayResult = _carsEnumResult.toArray();

        assert.ok(_carsArrayResult.length == 10, "Should return a result with 8 elements.");

        assert.throws(function () {
            TS.Linq.Extensions.union(null, _carsEnumTwo);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null first 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.union(_carsEnumOne, null);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null second 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.union(_undefined, _carsEnumTwo);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined first 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.union(_carsEnumOne, _undefined);
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined second 'enumerable' argument.");
    });

    QUnit.test("where", function (assert) {
        var _resultArrayBob = TS.Linq.Extensions.where(personEnumerable, function (item) {
            return item.FirstName == "Bob";
        }).toArray();
        var _resultArrayMichael = TS.Linq.Extensions.where(personEnumerable, function (item) {
            return item.FirstName == "Michael";
        }).toArray();
        var _resultArrayEdward = TS.Linq.Extensions.where(personEnumerable, function (item) {
            return item.FirstName == "Edward";
        }).toArray();
        var _allArray = TS.Linq.Extensions.orderBy(personEnumerable, function (item) {
            return item.FirstName;
        }).select(function (item) {
            return item.FirstName;
        }).toArray();
        var _undefined;

        assert.ok((_resultArrayBob.length == 1 && _resultArrayMichael.length == 5 && _resultArrayEdward.length == 3 && _allArray.length == 400), "Should return the expected number of items for the executed 'where' causes.");

        assert.throws(function () {
            TS.Linq.Extensions.where(null, function (item) {
                return item.FirstName != "";
            });
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

        assert.throws(function () {
            TS.Linq.Extensions.where(_undefined, function (item) {
                return item.FirstName != "";
            });
        }, function (err) {
            return ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false);
        }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");
    });

    var Customer = (function () {
        function Customer(Address, City, CompanyName, ContactName, ContactTitle, Country, CustomerID, Fax, Phone, PostalCode, Region) {
            if (typeof Address === "undefined") { Address = ""; }
            if (typeof City === "undefined") { City = ""; }
            if (typeof CompanyName === "undefined") { CompanyName = ""; }
            if (typeof ContactName === "undefined") { ContactName = ""; }
            if (typeof ContactTitle === "undefined") { ContactTitle = ""; }
            if (typeof Country === "undefined") { Country = ""; }
            if (typeof CustomerID === "undefined") { CustomerID = ""; }
            if (typeof Fax === "undefined") { Fax = ""; }
            if (typeof Phone === "undefined") { Phone = ""; }
            if (typeof PostalCode === "undefined") { PostalCode = ""; }
            if (typeof Region === "undefined") { Region = ""; }
            this.Address = Address;
            this.City = City;
            this.CompanyName = CompanyName;
            this.ContactName = ContactName;
            this.ContactTitle = ContactTitle;
            this.Country = Country;
            this.CustomerID = CustomerID;
            this.Fax = Fax;
            this.Phone = Phone;
            this.PostalCode = PostalCode;
            this.Region = Region;
        }
        return Customer;
    })();
    TS_Linq_Extensions_test.Customer = Customer;

    var Car = (function () {
        function Car(name, horsePower, disel, buildYear, price) {
            if (typeof name === "undefined") { name = ""; }
            if (typeof horsePower === "undefined") { horsePower = 0; }
            if (typeof disel === "undefined") { disel = false; }
            if (typeof buildYear === "undefined") { buildYear = Date.parse("1970-01-01"); }
            if (typeof price === "undefined") { price = 0; }
            this.name = name;
            this.horsePower = horsePower;
            this.disel = disel;
            this.buildYear = buildYear;
            this.price = price;
        }
        return Car;
    })();
    TS_Linq_Extensions_test.Car = Car;

    function CreateCarsUnionTestArray() {
        var _resultCarArray;

        _resultCarArray = new Array();

        _resultCarArray.push(new Car("VOLVO", 220, false, Date.parse("1999-01-01"), 21000));
        _resultCarArray.push(new Car("AUDI", 160, true, Date.parse("2000-09-01"), 15000));
        _resultCarArray.push(new Car("BENTLEY", 350, false, Date.parse("2012-01-01"), 55000));
        _resultCarArray.push(new Car("FIAT", 80, true, Date.parse("1980-12-01"), 1000));
        _resultCarArray.push(new Car("SCODA", 133, true, Date.parse("1999-01-01"), 3333));
        return _resultCarArray;
    }
    TS_Linq_Extensions_test.CreateCarsUnionTestArray = CreateCarsUnionTestArray;

    function CreateCarsArray() {
        return new Array({ name: "BMW", horsePower: 200, disel: false, buildYear: Date.parse("2010-01-01"), price: 22000 }, { name: "AUDI", horsePower: 160, disel: true, buildYear: Date.parse("2000-09-01"), price: 15000 }, { name: "VW", horsePower: 120, disel: false, buildYear: Date.parse("1999-04-01"), price: 4000 }, { name: "FIAT", horsePower: 80, disel: true, buildYear: Date.parse("1980-12-01"), price: 1000 }, { name: "TRABANT", horsePower: 35, disel: false, buildYear: Date.parse("1977-06-01"), price: 1 });
    }
    TS_Linq_Extensions_test.CreateCarsArray = CreateCarsArray;

    function CreateSortTestArray() {
        return new Array({ color: "red", number: 1, location: "europe" }, { color: "blue", number: 3, location: "asia" }, { color: "red", number: 1, location: "europe" }, { color: "red", number: 2, location: "america" }, { color: "blue", number: 2, location: "australia" }, { color: "red", number: 1, location: "america" }, { color: "green", number: 1, location: "asia" }, { color: "red", number: 1, location: "america" }, { color: "green", number: 3, location: "greenland" }, { color: "red", number: 3, location: "europe" }, { color: "blue", number: 1, location: "africa" }, { color: "red", number: 3, location: "greenland" });
    }
    TS_Linq_Extensions_test.CreateSortTestArray = CreateSortTestArray;

    function CreateRandomNumberArray(numbers) {
        var _index;
        var _resultArr;

        _resultArr = new Array();

        for (_index = 0; _index < numbers; _index++) {
            _resultArr.push(Math.floor(Math.random() * numbers));
        }

        return _resultArr;
    }
    TS_Linq_Extensions_test.CreateRandomNumberArray = CreateRandomNumberArray;

    function CreateNumberArray() {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    }
    TS_Linq_Extensions_test.CreateNumberArray = CreateNumberArray;

    function CreateStringArray() {
        return ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
    }
    TS_Linq_Extensions_test.CreateStringArray = CreateStringArray;
})(TS_Linq_Extensions_test || (TS_Linq_Extensions_test = {}));
