/// <reference path="../scripts/qunit.d.ts" />
/// <reference path="../scripts/jquery.d.ts" />
/// <reference path="../exception/exception.ts" />

"use strict";

declare var Person400;
declare var Get_NY;
declare var MM;
declare var Customers;
declare var Orders;

var getPersonData: () => Array<any> = Person400.getData;
var getNYData: () => Array<any> = Get_NY.getData;
var getMM: () => Array<any> = MM.getData;
var getCustomers: () => Array<TS_Linq_test_common.ICustomer> = Customers.getData;
var getOrders: () => Array<TS_Linq_test_common.IOrders> = Orders.getData;

var personEnumerable: TS.Linq.Enumerable<any>
var nyEnumerable: TS.Linq.Enumerable<any>
var mmEnumerable: TS.Linq.Enumerable<any>
var customersEnumerable: TS.Linq.Enumerable<TS_Linq_test_common.ICustomer>;
var ordersEnumerable: TS.Linq.Enumerable<TS_Linq_test_common.IOrders>;

module TS_Linq_Enumerable_test
{

  QUnit.module("TS.Linq.Enumerable",
    {
      setupOnce: function ()
      {
        // runs once before anything else in the module
        personEnumerable = TS.Linq.Extensions.fromArray(getPersonData());
        nyEnumerable = TS.Linq.Extensions.fromArray(getNYData());
        mmEnumerable = TS.Linq.Extensions.fromArray(getMM()[0].lfs);
        customersEnumerable = TS.Linq.Extensions.fromArray(getCustomers());
        ordersEnumerable = TS.Linq.Extensions.fromArray(getOrders());
      },
      setup: function ()
      {
        // prepare something for all following tests
      },
      teardown: function ()
      {
        // clean up after each test
      },
      teardownOnce: function ()
      {
        // runs once after all unit tests finished (including teardown)
      }
    });


  QUnit.test("aggregate", function (assert)
  {
    var _testNumberEnumerable: TS.Linq.Enumerable<number>;
    var _testStringEnumerable: TS.Linq.Enumerable<string>;
    var _testCarEnumerable: TS.Linq.Enumerable<TS_Linq_test_common.Car>;
    var _testNumberResult: number;
    var _testStringResult: string;
    var _testCarNumberResult: number;
    var _testCarStringResult: string;
    var _undefined;

    _testNumberEnumerable = TS.Linq.Enumerable.fromArray(TS_Linq_test_common.CreateNumberArray());
    _testStringEnumerable = TS.Linq.Enumerable.fromArray(TS_Linq_test_common.CreateStringArray());
    _testCarEnumerable = TS.Linq.Enumerable.fromArray(TS_Linq_test_common.CreateCarsArray());

    _testNumberResult = _testNumberEnumerable.aggregate((first, second) => first + second);
    assert.equal(_testNumberResult, 55, "should return '55' on TS.Linq.Enumerable<number> .");

    _testStringResult = _testStringEnumerable.aggregate((first, second) => first + ", " + second);
    assert.equal(_testStringResult, "one, two, three, four, five, six, seven, eight, nine, ten", "should return 'one, two, three, four, five, six, seven, eight, nine, ten' on TS.Linq.Enumerable<string> .");

    _testCarNumberResult = _testCarEnumerable.aggregate((first: number, second: TS_Linq_test_common.Car) => first + second.horsePower, 0);
    assert.equal(_testCarNumberResult, 595, "should return 595 on TS.Linq.Enumerable<Car> with an accumulator function on 'horsePower' and a seed value of '0'.");

    _testCarStringResult = _testCarEnumerable.aggregate((first: string, second: TS_Linq_test_common.Car) => first + second.name, "");
    assert.equal(_testCarStringResult, "BMWAUDIVWFIATTRABANT", "should return 'BMWAUDIVWFIATTRABANT' on TS.Linq.Enumerable<Car> with an accumulator function on 'name' and a seed value of ''.");

    assert.throws(() =>
    {
      _testStringEnumerable.aggregate(null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'accumulator' argument.");

    assert.throws(() =>
    {
      _testStringEnumerable.aggregate(_undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'accumulator' argument.");

  });


  QUnit.test("all", (assert) =>
  {
    var _testResult: boolean;
    var _undefined;

    assert.equal(TS.Linq.Extensions.fromArray([]).all((item) => false), true, "Should return true for an empty enumerable.");

    _testResult = TS.Linq.Enumerable.fromArray(TS_Linq_test_common.CreateStringArray()).all((item) => item.length >= 3);
    assert.ok(_testResult, "Should return true on a predicate that should pass.");

    _testResult = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateStringArray()).all((item) => item.length > 4);
    assert.ok(!_testResult, "Should return false on a predicate that shouldn't pass.");

    assert.throws(() =>
    {
      TS.Linq.Enumerable.fromArray(TS_Linq_test_common.CreateStringArray()).all(null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'predicate' argument.");


    assert.throws(() =>
    {
      TS.Linq.Enumerable.fromArray(TS_Linq_test_common.CreateStringArray()).all(_undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'predicate' argument.");

  });


  QUnit.test("any", (assert) => 
  {
    var _testResult: boolean;
    var _undefined;

    assert.equal(TS.Linq.Enumerable.fromArray([]).any((item) => true), false, "Should return false on an empty 'enumerable'.");

    _testResult = TS.Linq.Enumerable.fromArray(TS_Linq_test_common.CreateStringArray()).any((item) => item.length >= 3);
    assert.ok(_testResult, "Should return true on a predicate that should pass.");

    _testResult = TS.Linq.Enumerable.fromArray(TS_Linq_test_common.CreateStringArray()).any((item) => item.length < 2);
    assert.ok(!_testResult, "Should return false on a predicate that shouldn't pass.");

    _testResult = TS.Linq.Enumerable.fromArray(TS_Linq_test_common.CreateStringArray()).any();
    assert.ok(_testResult, "Should return true on a none empty 'enumerable' without predicate.");

    _testResult = TS.Linq.Enumerable.fromArray([]).any();
    assert.ok(!_testResult, "Should return false on an empty 'enumerable' without predicate.");

  });


  QUnit.test("average", (assert) =>
  {
    var _testNumberArray: Array<number>;
    var _testResult: number;
    var _undefined;

    _testNumberArray = TS_Linq_test_common.CreateNumberArray();
    _testResult = TS.Linq.Extensions.average(TS.Linq.Extensions.fromArray(_testNumberArray));
    assert.equal(_testResult, 5.5, "Should return expected average.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.empty<number>().average();
    }, (err) => ((err.name == "TS.Linq.EmptyEnumerableException") ? true : false), "Should throw a 'TS.Linq.EmptyEnumerableException' for an empty 'enumerable' argument.");

    _testNumberArray.push(Number.MAX_VALUE / 2);
    _testNumberArray.push(Number.MAX_VALUE);

    assert.throws(() =>
    {
      TS.Linq.Extensions.fromArray(_testNumberArray).average();
    }, (err) => ((err.name == "TS.OverflowException") ? true : false), "Should throw a 'TS.OverflowException' for an 'Enumerable<number>' which exceeds the number range in sum in the 'enumerable' argument.");
  });


  QUnit.test("concat", (assert) =>
  {
    var _testNumberResult: TS.Linq.Enumerable<number>;
    var _testStringResult: TS.Linq.Enumerable<string>;
    var _resultNumberArray: Array<number>;
    var _resultStringArray: Array<string>;
    var _compareNumberArray: Array<number>;
    var _undefined;

    _testNumberResult = TS.Linq.Enumerable.fromArray(TS_Linq_test_common.CreateNumberArray()).concat(TS.Linq.Enumerable.fromArray(TS_Linq_test_common.CreateNumberArray()));
    _resultNumberArray = _testNumberResult.toArray();
    assert.deepEqual(_resultNumberArray, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "Should return concatenation of two 'Enumerable<number>'.");

    _testStringResult = TS.Linq.Enumerable.fromArray(TS_Linq_test_common.CreateStringArray()).concat(TS.Linq.Enumerable.fromArray(TS_Linq_test_common.CreateStringArray()));
    _resultStringArray = _testStringResult.toArray();
    assert.deepEqual(_resultStringArray, ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"], "Should return concatenation of two 'Enumerable<string>'.");

    assert.throws(() =>
    {
      TS.Linq.Enumerable.fromArray(TS_Linq_test_common.CreateStringArray()).concat(null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an null 'secondEnumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Enumerable.fromArray(TS_Linq_test_common.CreateStringArray()).concat(_undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'secondEnumerable' argument.");
  });


  QUnit.test("contains", (assert) =>
  {
    var _testResult: boolean;
    var _testEmptyEnumerable: TS.Linq.Enumerable<any>;
    var _testCar: TS_Linq_test_common.ICar
    var _undefined;

    _testCar = new TS_Linq_test_common.Car("SCODA");

    _testEmptyEnumerable = TS.Linq.Extensions.empty<any>();

    _testResult = TS.Linq.Enumerable.fromArray(TS_Linq_test_common.CreateNumberArray()).contains(5);
    assert.ok(_testResult, "Should return true on a  lookup for an element in 'Enumerable<number>'.");

    _testResult = TS.Linq.Enumerable.fromArray(TS_Linq_test_common.CreateNumberArray()).contains(11);
    assert.ok(!_testResult, "Should return false on a lookup for a none existing element in 'Enumerable<number>'.");

    _testResult = TS.Linq.Enumerable.fromArray(TS_Linq_test_common.CreateStringArray()).contains("five");
    assert.ok(_testResult, "Should return true on a lookup for an element in 'Enumerable<string>'.");

    _testResult = TS.Linq.Enumerable.fromArray(TS_Linq_test_common.CreateStringArray()).contains("eleven");
    assert.ok(!_testResult, "Should return false on a lookup for a none existing element in 'Enumerable<string>'.");

    _testResult = _testEmptyEnumerable.contains(123);
    assert.ok(!_testResult, "Should return false on a lookup in an empty enumerable.");

    _testResult = TS.Linq.Enumerable.fromArray(TS_Linq_test_common.CreateCarsArray()).contains(TS_Linq_test_common.CreateCarsArray()[3], (first, second) => first.name == second.name);
    assert.ok(_testResult, "Should return true on a lookup for an element in 'Enumerable<Car>' with an equalityComparer.");

    _testResult = TS.Linq.Enumerable.fromArray(TS_Linq_test_common.CreateCarsArray()).contains(_testCar, (first, second) => first.name == second.name);
    assert.ok(!_testResult, "Should return false on a lookup for a none existing element in 'Enumerable<Car>' with an equalityComparer.");

    assert.throws(() =>
    {
      _testEmptyEnumerable.contains(null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'element' argument.");

    assert.throws(() =>
    {
      _testEmptyEnumerable.contains(_undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'element' argument.");
  });


  QUnit.test("count", (assert) =>
  {
    var _testNumberEnumerable: TS.Linq.Enumerable<number>;
    var _testStringEnumerable: TS.Linq.Enumerable<string>;
    var _testCarEnumerable: TS.Linq.Enumerable<TS_Linq_test_common.Car>;
    var _undefined;

    _testNumberEnumerable = TS.Linq.Enumerable.fromArray(TS_Linq_test_common.CreateNumberArray());
    _testStringEnumerable = TS.Linq.Enumerable.fromArray(TS_Linq_test_common.CreateStringArray());
    _testCarEnumerable = TS.Linq.Enumerable.fromArray(TS_Linq_test_common.CreateCarsArray());

    assert.equal(_testNumberEnumerable.count(), 10, "Should count 10 numbers out of 10.");
    assert.equal(_testNumberEnumerable.count((item) => item > 5), 5, "Should count 5 numbers greater 5 out of 10.");
    assert.equal(TS.Linq.Extensions.empty().count(), 0, "Should counted 0 on an empty enumerable.");
    assert.equal(TS.Linq.Extensions.count(_testStringEnumerable, (item) => item.indexOf("e") > -1), 7, "Should count 7 elements with character 'e' in an 'Enumerable<string>' using a predicate.");
    assert.equal(TS.Linq.Extensions.count(_testCarEnumerable, (item) => item.horsePower > 100), 3, "Should count 4 elements with horsePower greater 100 in an 'Enumerable<TS_Linq_test_common.Car>' using a predicate.");

  });


  QUnit.test("cycle", (assert) =>
  {
    var _testStringEnumerable: TS.Linq.Enumerable<string>;
    var _testResultEnumerable: TS.Linq.Enumerable<string>;
    var _testResultArray: Array<string>;

    _testStringEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateStringArray());
    _testResultEnumerable = _testStringEnumerable.cycle().take(40);
    _testResultArray = _testResultEnumerable.toArray();
    assert.equal(_testResultArray.length, 40, "Should return 40 elements after a call to 'take(40)'.");

    _testResultArray = TS.Linq.Extensions.empty<string>().cycle().take(20).toArray();

    assert.equal(_testResultArray.length, 0, "Should return an empty enumerable if the argument 'enumerable' was also an empty enumerable.");

  });


  QUnit.test("defaultIfEmpty", (assert) =>
  {
    var _testResultCarEnumerable: TS.Linq.Enumerable<TS_Linq_test_common.Car>;
    var _testResultCarArray: Array<TS_Linq_test_common.Car>;
    var _undefined;

    _testResultCarEnumerable = TS.Linq.Extensions.empty<TS_Linq_test_common.Car>().defaultIfEmpty(TS_Linq_test_common.Car);
    _testResultCarArray = _testResultCarEnumerable.toArray();
    assert.deepEqual(_testResultCarArray[0], new TS_Linq_test_common.Car(), "Should return an enumerable with one default element on an empty enumerable.");

    _testResultCarEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateCarsArray()).defaultIfEmpty(TS_Linq_test_common.Car);
    _testResultCarArray = _testResultCarEnumerable.toArray();
    assert.deepEqual(_testResultCarArray, TS_Linq_test_common.CreateCarsArray(), "Should return the original enumerable on a none empty enumerable.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.empty<TS_Linq_test_common.Car>().defaultIfEmpty(null)
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'defaultConstructor' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.empty<TS_Linq_test_common.Car>().defaultIfEmpty(_undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'defaultConstructor' argument.");
  });


  QUnit.test("distinct", (assert) =>
  {
    var _testResultCarEnumerable: TS.Linq.Enumerable<TS_Linq_test_common.Car>;
    var _testResultCarArray: Array<TS_Linq_test_common.Car>;
    var _testInputCarEnumerable: TS.Linq.Enumerable<TS_Linq_test_common.Car>;
    var _testInputCarArray: Array<TS_Linq_test_common.Car>;
    var _testResultNumberArray: Array<number>;

    _testInputCarArray = TS_Linq_test_common.CreateCarsArray();
    _testInputCarArray.push(new TS_Linq_test_common.Car("VOLVO", 220, false, Date.parse("1999-01-01"), 21000));
    _testInputCarArray.push(new TS_Linq_test_common.Car("AUDI", 110, false, Date.parse("1999-04-15"), 4000));
    _testInputCarArray.push(new TS_Linq_test_common.Car("BENTLEY", 350, false, Date.parse("2012-01-01"), 55000));
    _testInputCarArray.push(new TS_Linq_test_common.Car("FIAT", 60, false, Date.parse("1980-01-01"), 500));
    _testInputCarEnumerable = TS.Linq.Extensions.fromArray(_testInputCarArray);
    _testResultCarEnumerable = _testInputCarEnumerable.distinct((first, second) => first.name == second.name);
    _testResultCarArray = _testResultCarEnumerable.toArray();
    assert.equal(_testResultCarArray.length, 7, "Should return a result enumerable with 7 elements from the input enumerable with 9 elements using the given 'equalityComparer'.");
    _testResultCarEnumerable = TS.Linq.Extensions.distinct(_testInputCarEnumerable, (first, second) => first.name == second.name);
    _testResultNumberArray = TS.Linq.Extensions.fromArray([0, 0, 1, 2, 2, 2, 3, 4, 4, 5, 6, 6, 6, 6, 6, 7, 8, 8, 8, 9, 9]).distinct().toArray();
    assert.equal(_testResultNumberArray.length, 10, "Should return a result enumerable with 10 elements from the input enumerable of type 'Enumerable<number>' with no 'equalityComparer' defined.");

  });


  QUnit.test("elementAt", (assert) =>
  {
    var _testInputCarEnumerable: TS.Linq.Enumerable<TS_Linq_test_common.Car>;
    var _testResultCar: TS_Linq_test_common.Car;
    var _undefined;

    _testInputCarEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateCarsArray());

    _testResultCar = _testInputCarEnumerable.elementAt(3);
    assert.deepEqual(_testResultCar, TS_Linq_test_common.CreateCarsArray()[3], "Should return the element at the required position.");

    assert.throws(() => 
    {
      _testInputCarEnumerable.elementAt(-3);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for an 'index' argument value less than 0.");

    assert.throws(() => 
    {
      _testInputCarEnumerable.elementAt(3.5);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for an 'index' argument value which is a float and not an integer.");

    assert.throws(() => 
    {
      _testInputCarEnumerable.elementAt(20);
    }, (err) => ((err.name == "TS.IndexOutOfRangeException") ? true : false), "Should throw a 'TS.IndexOutOfRangeException' for an 'index' argument value greater than the number of elements in argument 'enumerable'.");

    assert.throws(() => 
    {
      _testInputCarEnumerable.elementAt(null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'index' argument.");

    assert.throws(() => 
    {
      _testInputCarEnumerable.elementAt(_undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'index' argument.");

  });


  QUnit.test("elementAtOrDefault", (assert) =>
  {
    var _testInputCarEnumerable: TS.Linq.Enumerable<TS_Linq_test_common.Car>;
    var _testResultCar: TS_Linq_test_common.Car;
    var _undefined;

    _testInputCarEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateCarsArray());

    _testResultCar = _testInputCarEnumerable.elemementAtOrDefault(3, TS_Linq_test_common.Car);
    assert.deepEqual(_testResultCar, TS_Linq_test_common.CreateCarsArray()[3], "Should return the element at the required position.");

    _testResultCar = _testInputCarEnumerable.elemementAtOrDefault(20, TS_Linq_test_common.Car);
    assert.deepEqual(_testResultCar, new TS_Linq_test_common.Car(), "Should return a default element for a required position out of the range of the enumerable.");

    assert.throws(() => 
    {
      _testInputCarEnumerable.elemementAtOrDefault(-3, TS_Linq_test_common.Car);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for an 'index' argument value less than 0.");

    assert.throws(() => 
    {
      _testInputCarEnumerable.elemementAtOrDefault(null, TS_Linq_test_common.Car);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'index' argument.");

    assert.throws(() => 
    {
      _testInputCarEnumerable.elemementAtOrDefault(20, null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'defaultConstructor' argument.");

    assert.throws(() => 
    {
      _testInputCarEnumerable.elemementAtOrDefault(_undefined, TS_Linq_test_common.Car);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'index' argument.");

    assert.throws(() => 
    {
      _testInputCarEnumerable.elemementAtOrDefault(20, _undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'defaultConstructor' argument.");
  });


  QUnit.test("empty", (assert) =>
  {
    var _emptyCar: TS.Linq.Enumerable<TS_Linq_test_common.Car>;
    var _emptyArr: Array<TS_Linq_test_common.Car>;
    _emptyCar = TS.Linq.Enumerable.empty<TS_Linq_test_common.Car>();
    _emptyArr = _emptyCar.toArray();
    assert.ok(_emptyArr.length == 0, "Should create an enumerable with 0 elements.");
  });


  QUnit.test("except", (assert) =>
  {
    var _firstSet: TS.Linq.Enumerable<number>;
    var _secondSet: TS.Linq.Enumerable<number>;
    var _resultSet: TS.Linq.Enumerable<number>;
    var _resultArray: Array<number>;
    var _testInputCarArray: Array<TS_Linq_test_common.Car>;
    var _testInputCarEnumerable: TS.Linq.Enumerable<TS_Linq_test_common.Car>;
    var _testCarResultArray: Array<TS_Linq_test_common.Car>;
    var _undefined;

    _firstSet = TS.Linq.Extensions.fromArray([1, 2, 3, 4, 5, 6]);
    _secondSet = TS.Linq.Extensions.fromArray([4, 5, 6, 7, 8, 9]);
    _resultSet = _firstSet.except(_secondSet);
    _resultArray = _resultSet.toArray();
    assert.deepEqual(_resultArray, [1, 2, 3], "Should return a result set with 3 elements.");

    _secondSet = TS.Linq.Extensions.fromArray([1, 2]);
    _resultSet = _firstSet.except(_secondSet);
    _resultArray = _resultSet.toArray();
    assert.deepEqual(_resultArray, [3, 4, 5, 6], "Should return a result set with 4 elements.");

    _secondSet = TS.Linq.Extensions.fromArray([2, 5]);
    _resultSet = _firstSet.except(_secondSet);
    _resultArray = _resultSet.toArray();
    assert.deepEqual(_resultArray, [1, 3, 4, 6], "Should return a result set with 4 elements.");

    _testInputCarArray = new Array<TS_Linq_test_common.Car>();
    _testInputCarArray.push(new TS_Linq_test_common.Car("VOLVO", 220, false, Date.parse("1999-01-01"), 21000));
    _testInputCarArray.push(new TS_Linq_test_common.Car("AUDI", 110, false, Date.parse("1999-04-15"), 4000));
    _testInputCarArray.push(new TS_Linq_test_common.Car("BENTLEY", 350, false, Date.parse("2012-01-01"), 55000));
    _testInputCarArray.push(new TS_Linq_test_common.Car("FIAT", 60, false, Date.parse("1980-01-01"), 500));
    _testInputCarEnumerable = TS.Linq.Extensions.fromArray(_testInputCarArray);

    _testCarResultArray = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateCarsArray()).except(_testInputCarEnumerable, (first, second) => (first.name == second.name)).toArray();
    assert.equal(_testCarResultArray.length, 3, "Should return a result set with 3 elements.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.except(_firstSet, null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'secondEnumerable' argument.");


    assert.throws(() => 
    {
      TS.Linq.Extensions.except(_firstSet, _undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'secondEnumerable' argument.");
  });


  QUnit.test("first", (assert) =>
  {
    var _result: any;
    var _undefined;

    _result = personEnumerable.first();
    assert.equal(_result.LastName, "Sánchez", "Should return the first match in the result set.");


    _result = personEnumerable.first((item: any) => item.FirstName == "Michael");
    assert.equal(_result.LastName, "Blythe", "Should return the first match in the result set when called with a predicate.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.empty<number>().first();
    }, (err) => ((err.name == "TS.InvalidOperationException") ? true : false), "Should trow a TS.InvalidOperationException on an empty enumerable.");

    assert.throws(() =>
    {
      personEnumerable.first((item: any) => item.NoAttribute == "NOP");
    }, (err) => ((err.name == "TS.InvalidOperationException") ? true : false), "Should trow a TS.InvalidOperationException when called with an invalid predicate.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.empty<number>().first((item: number) => item.toString() == "5");
    }, (err) => ((err.name == "TS.InvalidOperationException") ? true : false), "Should trow a TS.InvalidOperationException on an empty enumerable when called with a predicate.");

  });


  QUnit.test("firstOrDefault", (assert) =>
  {
    var _result: any;
    var _carEnumerable: TS.Linq.Enumerable<TS_Linq_test_common.Car>;

    _carEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateCarsArray());

    _result = _carEnumerable.firstOrDefault(TS_Linq_test_common.Car)
    assert.equal(_result.name, "BMW", "Should return the first match in the result set.");

    _result = TS.Linq.Extensions.empty<TS_Linq_test_common.Car>().firstOrDefault(TS_Linq_test_common.Car);
    assert.deepEqual(_result, new TS_Linq_test_common.Car(), "Should return a default object if the enumerable is empyt.");

    _result = _carEnumerable.firstOrDefault(TS_Linq_test_common.Car, (item: TS_Linq_test_common.Car) => item.name == "AUDI");
    assert.equal(_result.name, "AUDI", "Should return the first match in the result set when called with a predicate.");

    _result = _carEnumerable.firstOrDefault(TS_Linq_test_common.Car, (item: TS_Linq_test_common.Car) => item.name == "faöejrfkesjköpaf");
    assert.deepEqual(_result, new TS_Linq_test_common.Car(), "Should return a default object on an enumerable with no match on the predicate.");

    _result = _carEnumerable.firstOrDefault(TS_Linq_test_common.Car, (item: any) => item.noValidAttribute == 5);
    assert.deepEqual(_result, new TS_Linq_test_common.Car(), "Should return a default object on an enumerable with an invalid predicate.");
  });



  QUnit.test("fromArray", (assert) =>
  {
    var _testEnumerable: TS.Linq.Enumerable<number>;

    _testEnumerable = TS.Linq.Enumerable.fromArray(TS_Linq_test_common.CreateNumberArray());
    assert.equal(_testEnumerable.count(), TS_Linq_test_common.CreateNumberArray().length, "Should return a enumerable with as much elements as the source array.");

  });

  QUnit.test("groupBy", (assert) =>
  {
    var _resultCustomerEnumerable: TS.Linq.Enumerable<TS.Linq.Grouping<string, TS_Linq_test_common.ICustomer>>;
    var _resultProductEnumerable: TS.Linq.Enumerable<TS.Linq.Grouping<string, TS_Linq_test_common.IProduct>>;
    var _resultProductEnumerableStorageRoom: TS.Linq.Enumerable<TS.Linq.Grouping<string, string>>;
    var _resultProductEnumerableStorageRoomConcat: TS.Linq.Enumerable<{ Key: string; RoomConcat: string }>;
    var _productEnumerable: TS.Linq.Enumerable<TS_Linq_test_common.IProduct>;
    var _undefined;

    _productEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateProductArray());

    //Type inference failed for this call to 'groupBy'. So you have to 
    //declare the type in the type parameter by yourself.
    _resultCustomerEnumerable = customersEnumerable.groupBy<TS_Linq_test_common.ICustomer, string>(_CUST => _CUST.Country);
    assert.equal(_resultCustomerEnumerable.count(), 21, "Should return 21 elements for the executed expression.");
    assert.equal(_resultCustomerEnumerable.where(item => item.key == "Germany").single().count(), 11, "Should return 11 elements in group 'Germany'");
    assert.equal(_resultCustomerEnumerable.where(item => item.key == "UK").single().count(), 7, "Should return 7 elements in group 'UK'");

    //Type inference failed for this call to 'groupBy'. So you have to 
    //declare the type in the type parameter by yourself.
    _resultProductEnumerable = _productEnumerable.groupBy<TS_Linq_test_common.IProduct, string>(item => unifyCurrency(item.Currency), (first, second) => unifyCurrency(first) === unifyCurrency(second));
    assert.equal(_resultProductEnumerable.count(), 4, "Should return 4 elements for the executed expression with equalityComparer.");
    assert.equal(_resultProductEnumerable.where(item => item.key == "EURO").single().count(), 5, "Should return 5 elements in group 'EURO'");
    assert.equal(_resultProductEnumerable.where(item => item.key == "YEN").single().count(), 4, "Should return 4 elements in group 'YEN'");

    _resultProductEnumerableStorageRoom = _productEnumerable.groupBy(item => unifyCurrency(item.Currency), null, item => item.Storage.Room);
    assert.equal(_resultProductEnumerableStorageRoom.count(), 4, "Should return 4 elements for the executed expression with elementSelector.");
    assert.equal(_resultProductEnumerableStorageRoom.where(Item => Item.key == "EURO").single().count(), 5, "Should return 5 elements in group 'EURO'");
    assert.equal(_resultProductEnumerableStorageRoom.where(Item => Item.key == "YEN").single().count(), 4, "Should return 4 elements in group 'YEN'");

    _resultProductEnumerableStorageRoomConcat = _productEnumerable.groupBy(item => unifyCurrency(item.Currency), null, (key, group) => { return { Key: key, RoomConcat: TS.Linq.Extensions.toArray(group.select(gr => gr.Storage.Room)).join(",") }; });
    assert.equal(_resultProductEnumerableStorageRoomConcat.count(), 4, "Should return the 4 elements for the executed expression with resultSelector.");
    assert.equal(_resultProductEnumerableStorageRoomConcat.where(Item => Item.Key == "EURO").single().RoomConcat, "STR 001,STR 002,STR 002,STR 002,STR 003", "Should return the expected room list for the executed expression with resultSelector.");
    assert.equal(_resultProductEnumerableStorageRoomConcat.where(Item => Item.Key == "YEN").single().RoomConcat, "STR 001,STR 002,STR 003,STR 003", "Should return the expected room list for the executed expression with resultSelector.");


    //EURO: STR 001, STR 002, STR 002, STR 002, STR 003
    //DOLLAR: STR 001, STR 002
    //YEN: STR 001, STR 002, STR 003, STR 003
    //GBP: STR 002, STR 002, STR 003


    assert.throws(() =>
    {
      TS.Linq.Extensions.groupBy(customersEnumerable, null);;
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.groupBy(customersEnumerable, undefined);;
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a undefined 'enumerable' argument.");

    function unifyCurrency(currency: string): string
    {
      var _euroArray = ["EUR", "EURO", "€"];
      var _dollarArray = ["USD", "DOLLAR", "$"];
      var _yenArray = ["YEN", "¥"];
      var _gbpArray = ["POUND STERLING", "GBP", "£"];

      if (_euroArray.filter((value, index, array) => currency.toUpperCase() == value).length > 0)
      {
        return "EURO";
      }//END if

      if (_dollarArray.filter((value, index, array) => currency.toUpperCase() == value).length > 0)
      {
        return "DOLLAR";
      }//END if

      if (_yenArray.filter((value, index, array) => currency.toUpperCase() == value).length > 0)
      {
        return "YEN";
      }//END if

      if (_gbpArray.filter((value, index, array) => currency.toUpperCase() == value).length > 0)
      {
        return "GBP";
      }//END if

      return currency.toUpperCase();
    }
  });

  QUnit.test("groupJoin", (assert) =>
  {
    var _jointEnum;
    var _jointArray;
    var _undefined;
    var _index: number;
    var _orders: number;
    //Run the following query in 'LinqPad' against the 'NORTHWND' database.
    //Customers.GroupJoin(Orders, _CUST => _CUST.CustomerID, _ORD => _ORD.CustomerID, (_CUST, _ORD_ENUM) => new { _CUST.ContactName, _ORD_ENUM}).Dump();
    //The query will return 91 Results.


    //Type inference failed for this call to 'groupJoin'. So you have to 
    //declare the type in the type parameter by yourself.
    _jointEnum = customersEnumerable.groupJoin<TS_Linq_test_common.ICustomer, TS_Linq_test_common.IOrders, string, any>(ordersEnumerable, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, (outerItem, group) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrderGroup: group }));

    _jointArray = TS.Linq.Extensions.toArray(_jointEnum);
    _orders = 0;
    for (_index = _jointArray.length - 1; _index > -1; _index--)
    {
      _jointArray[_index].OrderGroup = TS.Linq.Extensions.toArray(_jointArray[_index].OrderGroup);
      _orders += _jointArray[_index].OrderGroup.length;
    }//END for

    assert.ok(_jointArray.length == 91, "Should return 91 joined records for the executed expression.");
    assert.ok(_orders == 830, "Should return 830 order records for the executed expression.");

    //
    //Call the query once again but using the 'equalityComparer' instead of the default comparer.
    //Should return the same result.
    //

    //Type inference failed for this call to 'groupJoin'. So you have to 
    //declare the type in the type parameter by yourself.
    _jointEnum = customersEnumerable.groupJoin<TS_Linq_test_common.ICustomer, TS_Linq_test_common.IOrders, any, any>(ordersEnumerable, (outerItem) => outerItem, (innerItem) => innerItem, (outerItem, group) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrderGroup: group }), (outerKey, innerKey) =>
    {
      return outerKey.CustomerID === innerKey.CustomerID
    });

    _jointArray = _jointEnum.toArray();
    _orders = 0;
    for (_index = _jointArray.length - 1; _index > -1; _index--)
    {
      _jointArray[_index].OrderGroup = TS.Linq.Extensions.toArray(_jointArray[_index].OrderGroup);
      _orders += _jointArray[_index].OrderGroup.length;
    }//END for

    assert.ok(_jointArray.length == 91, "Should return 91 joined records for the executed expression.");
    assert.ok(_orders == 830, "Should return 830 order records for the executed expression.");

    assert.throws(() =>
    {
      customersEnumerable.groupJoin(ordersEnumerable, null, (innerItem) => innerItem.CustomerID, (outerItem, group) => ({ Customer: outerItem, OrderGroup: group }));
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'outerKeySelector' argument.");

    assert.throws(() =>
    {
      customersEnumerable.groupJoin(ordersEnumerable, _undefined, (innerItem) => innerItem.CustomerID, (outerItem, group) => ({ Customer: outerItem, OrderGroup: group }));
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'outerKeySelector' argument.");

    assert.throws(() =>
    {
      //Type inference failed for this call to 'groupJoin'. So you have to 
      //declare the type in the type parameter by yourself.
      customersEnumerable.groupJoin<TS_Linq_test_common.ICustomer, TS_Linq_test_common.IOrders, any, any>(ordersEnumerable, (outerItem) => outerItem.CustomerID, null, (outerItem, group) => ({ Customer: outerItem, OrderGroup: group }));
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'innerKeySelector' argument.");

    assert.throws(() =>
    {
      //Type inference failed for this call to 'groupJoin'. So you have to 
      //declare the type in the type parameter by yourself.
      customersEnumerable.groupJoin<TS_Linq_test_common.ICustomer, TS_Linq_test_common.IOrders, any, any>(ordersEnumerable, (outerItem) => outerItem.CustomerID, _undefined, (outerItem, group) => ({ Customer: outerItem, OrderGroup: group }));
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'innerKeySelector' argument.");

    assert.throws(() =>
    {
      //Type inference failed for this call to 'groupJoin'. So you have to 
      //declare the type in the type parameter by yourself.
      customersEnumerable.groupJoin<TS_Linq_test_common.ICustomer, TS_Linq_test_common.IOrders, any, any>(ordersEnumerable, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'resultSelector' argument.");

    assert.throws(() =>
    {
      //Type inference failed for this call to 'groupJoin'. So you have to 
      //declare the type in the type parameter by yourself.
      customersEnumerable.groupJoin<TS_Linq_test_common.ICustomer, TS_Linq_test_common.IOrders, any, any>(ordersEnumerable, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, _undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'resultSelector' argument.");
  });


  QUnit.test("intersect", (assert) => 
  {
    var _carsUnionEnum: TS.Linq.Enumerable<TS_Linq_test_common.Car>;
    var _carsEnum: TS.Linq.Enumerable<TS_Linq_test_common.Car>;
    var _carsIntersect: TS.Linq.Enumerable<TS_Linq_test_common.Car>;
    var _numberEnumFirst: TS.Linq.Enumerable<Number>;
    var _numberEnumSecond: TS.Linq.Enumerable<Number>;
    var _numberIntersect: TS.Linq.Enumerable<Number>;
    var _resultArr: Array<TS_Linq_test_common.Car>;
    var _undefined;

    _carsUnionEnum = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateCarsUnionTestArray());
    _carsEnum = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateCarsArray());

    _carsIntersect = _carsEnum.intersect(_carsUnionEnum, (first, second) => first.name === second.name);
    _resultArr = TS.Linq.Extensions.toArray(_carsIntersect);

    assert.equal(_carsIntersect.count(), 2, "Schould return a result set with 2 elements when called with an equality comparer.");

    _numberEnumFirst = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateNumberArray());
    _numberEnumSecond = TS.Linq.Extensions.fromArray([2, 4, 7, 8]);
    _numberIntersect = _numberEnumFirst.intersect(_numberEnumSecond);

    assert.equal(_numberIntersect.count(), 4, "Schould return a result set with 4 elements when called without an equality comparer.");

    assert.throws(() =>
    {
      _numberEnumFirst.intersect(null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'secondEnumerable' argument.");

    assert.throws(() =>
    {
      _numberEnumFirst.intersect(_undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'secondEnumerable' argument.");
  });


  QUnit.test("join", (assert) =>
  {
    var _jointEnum;
    var _jointArray;
    var _undefined;
    //Run the following query in 'LinqPad' against the 'NORTHWND' database.
    //Customers.Join(Orders, CUST => CUST.CustomerID, ORD => ORD.CustomerID, (CUST, ORD) => new { CustID = CUST.CustomerID, CustName = CUST.ContactName, OrdID = ORD.OrderID, OrdDate = ORD.OrderDate, OrdRequireDate = ORD.RequiredDate, OrdShippingCountry = ORD.ShipCountry} ).OrderBy(RES => RES.CustID).Dump();
    //The query will return 830 Results.


      //Type inference failed for this call to 'join'. So you have to 
      //declare the type in the type parameter by yourself.
    _jointEnum = customersEnumerable.join<TS_Linq_test_common.ICustomer, TS_Linq_test_common.IOrders, string, any>(ordersEnumerable, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, (outerItem, innerItem) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }));

    _jointArray = TS.Linq.Extensions.toArray(_jointEnum);
    assert.ok(_jointArray.length == 830, "Should return 830 records for the executed expression.");

    assert.throws(() =>
    {
      //Type inference failed for this call to 'join'. So you have to 
      //declare the type in the type parameter by yourself.
      customersEnumerable.join<TS_Linq_test_common.ICustomer, TS_Linq_test_common.IOrders, string, any>(ordersEnumerable, null, (innerItem) => innerItem.CustomerID, (outerItem, innerItem) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }));
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'outerKeySelector' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.join(customersEnumerable, ordersEnumerable, _undefined, (innerItem) => innerItem.CustomerID, (outerItem, innerItem) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }));
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'outerKeySelector' argument.");

    assert.throws(() =>
    {
      //Type inference failed for this call to 'join'. So you have to 
      //declare the type in the type parameter by yourself.
      customersEnumerable.join<TS_Linq_test_common.ICustomer, TS_Linq_test_common.IOrders, string, any>(ordersEnumerable, (outerItem) => outerItem.CustomerID, null, (outerItem, innerItem) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }));
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'innerKeySelector' argument.");

    assert.throws(() =>
    {
      //Type inference failed for this call to 'join'. So you have to 
      //declare the type in the type parameter by yourself.
      customersEnumerable.join<TS_Linq_test_common.ICustomer, TS_Linq_test_common.IOrders, string, any>(ordersEnumerable, (outerItem) => outerItem.CustomerID, _undefined, (outerItem, innerItem) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }));
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'innerKeySelector' argument.");

    assert.throws(() =>
    {
      //Type inference failed for this call to 'join'. So you have to 
      //declare the type in the type parameter by yourself.
      customersEnumerable.join<TS_Linq_test_common.ICustomer, TS_Linq_test_common.IOrders, string, any>(ordersEnumerable, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'resultSelector' argument.");

    assert.throws(() =>
    {
      //Type inference failed for this call to 'join'. So you have to 
      //declare the type in the type parameter by yourself.
      customersEnumerable.join<TS_Linq_test_common.ICustomer, TS_Linq_test_common.IOrders, string, any>(ordersEnumerable, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, _undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'resultSelector' argument.");
  });


  QUnit.test("last", (assert) =>
  {
    var _result: TS_Linq_test_common.ICustomer;

    _result = customersEnumerable.last();
    assert.equal(_result.ContactName, "Zbyszek Piestrzeniewicz", "Should return the last element in the result set.");

    _result = customersEnumerable.last((item) => item.ContactName == "Palle Ibsen");
    assert.equal(_result.ContactName, "Palle Ibsen", "Should return the last match in the result set when called with a predicate.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.empty<number>().last();
    }, (err) => ((err.name == "TS.InvalidOperationException") ? true : false), "Should trow a TS.InvalidOperationException on an empty enumerable.");

    assert.throws(() =>
    {
      personEnumerable.last((item: any) => item.NoAttribute == "NOP");
    }, (err) => ((err.name == "TS.InvalidOperationException") ? true : false), "Should trow a TS.InvalidOperationException when called with a predicate that doesn't match.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.empty<number>().last((item: number) => item.toString() == "5");
    }, (err) => ((err.name == "TS.InvalidOperationException") ? true : false), "Should trow a TS.InvalidOperationException on an empty enumerable when called with a predicate.");

  });


  QUnit.test("lastOrDefault", (assert) =>
  {
    var _result: TS_Linq_test_common.ICustomer;
    var _undefined;

    _result = customersEnumerable.lastOrDefault(TS_Linq_test_common.Customer);
    assert.equal(_result.ContactName, "Zbyszek Piestrzeniewicz", "Should return the last element in the enumerable.");

    _result = TS.Linq.Enumerable.empty<TS_Linq_test_common.ICustomer>().lastOrDefault(TS_Linq_test_common.Customer);
    assert.deepEqual(_result, new TS_Linq_test_common.Customer(), "Should return a default object if the enumerable is empyt.");

    _result = TS.Linq.Extensions.lastOrDefault(customersEnumerable, TS_Linq_test_common.Customer, (Item) => Item.Country == "USA");
    assert.equal(_result.CompanyName, "White Clover Markets", "Should return the last match in the result set when called with a predicate.");

    _result = customersEnumerable.lastOrDefault(TS_Linq_test_common.Customer, (Item) => Item.Country == "NOP");
    assert.deepEqual(_result, new TS_Linq_test_common.Customer(), "Should return a default object when called with a prdicate that doesn't match.");

    assert.throws(() => 
    {
      customersEnumerable.lastOrDefault(null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'defaultConstructor' argument.");

    assert.throws(() => 
    {
      customersEnumerable.lastOrDefault(_undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'defaultConstructor' argument.");

    //assert.ok(false, "Not implemented.");
  });


  QUnit.test("max", (assert) =>
  {
    var _max: number;
    //Run the following query in 'LinqPad' against the 'NORTHWND' database.
    //Orders.Select(_ORD => _ORD.Freight).Max().Dump();
    //The query will return 1007.6400

    _max = ordersEnumerable.select(_ORD => _ORD.Freight).max();
    assert.equal(_max, 1007.64, "Should return the expected value.");

    _max = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateNumberArray()).max();
    assert.equal(_max, 10, "Should return the expected value.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.empty<number>().max();
    }, (err) => ((err.name == "TS.Linq.EmptyEnumerableException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a empty 'enumerable' argument.");
  });


  QUnit.test("min", (assert) =>
  {
    var _min: number;
    //Run the following query in 'LinqPad' against the 'NORTHWND' database.
    //Orders.Select(_ORD => _ORD.Freight).Min().Dump();
    //The query will return 0.0200

    _min = ordersEnumerable.select(_ORD => _ORD.Freight).min();
    assert.equal(_min, 0.02, "Should return the expected value.");

    _min = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateNumberArray()).min();
    assert.equal(_min, 1, "Should return the expected value.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.empty<number>().min();
    }, (err) => ((err.name == "TS.Linq.EmptyEnumerableException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a empty 'enumerable' argument.");
  });


  QUnit.test("orderBy", (assert) =>
  {
    var _sortTestArray: Array<any>;
    var _randomNumberArray: Array<number>;
    var _resultISortTestArray: Array<TS_Linq_test_common.ISortTestItem>;
    var _resultNumberTestArray: Array<number>;
    var _resultCustomersTestArray: Array<TS_Linq_test_common.Customer>;
    var _orderCorrect: boolean;
    var _index: number;
    var _undefined;

    _sortTestArray = TS_Linq_test_common.CreateSortTestArray();
    _resultISortTestArray = TS.Linq.Extensions.fromArray(_sortTestArray).orderBy((item: any) => (<TS_Linq_test_common.ISortTestItem> item).color).toArray();
    _orderCorrect = true;

    for (_index = 0; _index < _resultISortTestArray.length - 2; _index++)
    {
      if (_resultISortTestArray[_index].color > _resultISortTestArray[_index + 1].color)
      {
        _orderCorrect = false;
        break;
      }//END if
    }//END for

    assert.ok(_orderCorrect, "The array of ISortTestItems should be sorted by color in ascending order.");

    _randomNumberArray = TS_Linq_test_common.CreateRandomNumberArray(100);
    _resultNumberTestArray = TS.Linq.Extensions.fromArray(_randomNumberArray).orderBy(item => item).toArray();

    _orderCorrect = true;

    for (_index = 0; _index < _resultNumberTestArray.length - 2; _index++)
    {
      if (_resultNumberTestArray[_index] > _resultNumberTestArray[_index + 1])
      {
        _orderCorrect = false;
        break;
      }//END if
    }//END for

    assert.ok(_orderCorrect, "Should returns an array of numbers sorted in ascending order.");


    _resultCustomersTestArray = customersEnumerable.orderBy(item => item.Country, (first, second) =>
    {
      if (first > second)
      {
        return 1;
      };
      if (first < second)
      {
        return -1;
      };
      return 0;
    }).toArray();

    var _resultString = _resultCustomersTestArray[0].Country + ", " + _resultCustomersTestArray[_resultCustomersTestArray.length - 1].Country;

    assert.equal(_resultString, "Argentina, Venezuela", "Should return an array sorted by country in ascending order using the specified key and comparer.");

    assert.throws(() =>
    {
      customersEnumerable.orderBy(null);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a null 'selector' argument.");

    assert.throws(() =>
    {
      customersEnumerable.orderBy(_undefined);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'selector' argument.");
  });


  QUnit.test("orderByDescending", (assert) =>
  {
    var _sortTestArray: Array<any>;
    var _randomNumberArray: Array<number>;
    var _resultISortTestArray: Array<TS_Linq_test_common.ISortTestItem>;
    var _resultNumberTestArray: Array<number>;
    var _resultCustomersTestArray: Array<TS_Linq_test_common.Customer>;
    var _orderCorrect: boolean;
    var _index: number;
    var _undefined;

    _sortTestArray = TS_Linq_test_common.CreateSortTestArray();
    _resultISortTestArray = TS.Linq.Extensions.fromArray(_sortTestArray).orderByDescending((item) => (<TS_Linq_test_common.ISortTestItem> item).color).toArray();

    _orderCorrect = true;

    for (_index = 0; _index < _resultISortTestArray.length - 2; _index++)
    {
      if (_resultISortTestArray[_index].color < _resultISortTestArray[_index + 1].color)
      {
        _orderCorrect = false;
        break;
      }//END if
    }//END for

    assert.ok(_orderCorrect, "The array of ISortTestItems should be sorted by color in descending order.");

    _randomNumberArray = TS_Linq_test_common.CreateRandomNumberArray(100);
    _resultNumberTestArray = TS.Linq.Extensions.fromArray(_randomNumberArray).orderByDescending(item => item).toArray();

    _orderCorrect = true;

    for (_index = 0; _index < _resultNumberTestArray.length - 1; _index++)
    {
      if (_resultNumberTestArray[_index] < _resultNumberTestArray[_index + 1])
      {
        _orderCorrect = false;
        break;
      }//END if
    }//END for

    assert.ok(_orderCorrect, "Should returns an array of numbers sorted in descending order.");

    _resultCustomersTestArray = TS.Linq.Extensions.toArray(TS.Linq.Extensions.orderByDescending(customersEnumerable, item => item.Country, (first, second) =>
    {
      if (first > second)
      {
        return 1;
      };
      if (first < second)
      {
        return -1;
      };
      return 0;
    }));

    var _resultString = _resultCustomersTestArray[0].Country + ", " + _resultCustomersTestArray[_resultCustomersTestArray.length - 1].Country;

    assert.equal(_resultString, "Venezuela, Argentina", "Should return an array sorted by country in descending order using the specified key and comparer.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.orderByDescending(null, item => item);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.orderByDescending(_undefined, item => item);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.orderByDescending(customersEnumerable, null);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for a null 'selctor' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.orderByDescending(customersEnumerable, _undefined);
    }, (err) => ((err.name == "TS.InvalidTypeException") ? true : false), "Should throw a 'TS.InvalidTypeException' for an undefined 'selector' argument.");

  });

}//END module