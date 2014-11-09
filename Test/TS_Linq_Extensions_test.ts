/// <reference path="../scripts/qunit.d.ts" />
/// <reference path="../scripts/jquery.d.ts" />


"use strict";

module TS_Linq_Extensions_test
{
  declare var Person400;
  declare var Get_NY;
  declare var MM;
  declare var Customers;
  declare var Orders;

  var getPersonData: () => Array<any> = Person400.getData;
  var getNYData: () => Array<any> = Get_NY.getData;
  var getMM: () => Array<any> = MM.getData;
  var getCustomers: () => Array<ICustomer> = Customers.getData;
  var getOrders: () => Array<IOrders> = Orders.getData;

  var personEnumerable;
  var nyEnumerable;
  var mmEnumerable;
  var customersEnumerable: TS.Linq.Enumerable<ICustomer>;
  var ordersEnumerable: TS.Linq.Enumerable<IOrders>;

  QUnit.module("TS.Linq.Extensions", {
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
      personEnumerable = null;
    }
  });


  QUnit.test("aggregate", (assert) => 
  {
    var _testNumberEnumerable: TS.Linq.Enumerable<number>;
    var _testStringEnumerable: TS.Linq.Enumerable<string>;
    var _testCarEnumerable: TS.Linq.Enumerable<Car>;
    var _testNumberResult: number;
    var _testStringResult: string;
    var _testCarNumberResult: number;
    var _testCarStringResult: string;
    var _undefined;

    _testNumberEnumerable = TS.Linq.Enumerable.fromArray(CreateNumberArray());
    _testStringEnumerable = TS.Linq.Enumerable.fromArray(CreateStringArray());
    _testCarEnumerable = TS.Linq.Enumerable.fromArray(CreateCarsArray());

    _testNumberResult = TS.Linq.Extensions.aggregate(_testNumberEnumerable, (first, second) =>
    {
      return first + second;
    });

    assert.equal(_testNumberResult, 55, "should return '55' on TS.Linq.Enumerable<number> .");

    _testStringResult = TS.Linq.Extensions.aggregate(_testStringEnumerable, (first, second) =>
    {
      return first + ", " + second;
    });

    assert.equal(_testStringResult, "one, two, three, four, five, six, seven, eight, nine, ten", "should return 'one, two, three, four, five, six, seven, eight, nine, ten' on TS.Linq.Enumerable<string> .");

    _testCarNumberResult = TS.Linq.Extensions.aggregate(_testCarEnumerable, (first: number, second: Car) => first + second.horsePower, 0);
    assert.equal(_testCarNumberResult, 595, "should return 595 on TS.Linq.Enumerable<Car> with an accumulator function on 'horsePower' and a seed value of '0'.");

    _testCarStringResult = TS.Linq.Extensions.aggregate(_testCarEnumerable, (first: string, second: Car) => first + second.name, "");
    assert.equal(_testCarStringResult, "BMWAUDIVWFIATTRABANT", "should return 'BMWAUDIVWFIATTRABANT' on TS.Linq.Enumerable<Car> with an accumulator function on 'name' and a seed value of ''.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.aggregate<string>(TS.Linq.Enumerable.fromArray([]), (first, second) => { return first + second; });
    }, (err) => ((err.name == "TS.Linq.EmptyEnumerableException") ? true : false), "Should throw a 'TS.Linq.EmptyEnumerableException' for an empty 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.aggregate(_testStringEnumerable, null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'accumulator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.aggregate<string>(null, (first, second) => { return first + second; });
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.aggregate(_testStringEnumerable, _undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'accumulator' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.aggregate<string>(_undefined, (first, second) => { return first + second; });
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");
  });


  QUnit.test("all", (assert) =>
  {
    var _testResult: boolean;
    var _undefined;

    assert.equal(TS.Linq.Extensions.all(TS.Linq.Enumerable.fromArray([]), (item) => false), true, "Should return true for an empty enumerable.");
    _testResult = TS.Linq.Extensions.all(TS.Linq.Enumerable.fromArray(CreateStringArray()), (item) => item.length >= 3);
    assert.ok(_testResult, "Should return true on a predicate that should pass.");
    _testResult = TS.Linq.Extensions.all(TS.Linq.Enumerable.fromArray(CreateStringArray()), (item) => item.lenght > 4);
    assert.ok(!_testResult, "Should return false on a predicate that shouldn't pass.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.all<string>(null, (item) => item.length < 0);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.all<string>(TS.Linq.Enumerable.fromArray(CreateStringArray()), null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'predicate' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.all<string>(_undefined, (item) => item.length < 0);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.all<string>(TS.Linq.Enumerable.fromArray(CreateStringArray()), _undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'predicate' argument.");

  });


  QUnit.test("any", (assert) => 
  {
    var _testResult: boolean;
    var _undefined;

    assert.equal(TS.Linq.Extensions.any(TS.Linq.Enumerable.fromArray([]), (item) => true), false, "Should return false on an empty 'enumerable'.");
    _testResult = TS.Linq.Extensions.any(TS.Linq.Enumerable.fromArray(CreateStringArray()), (item) => item.length >= 3);
    assert.ok(_testResult, "Should return true on a predicate that should pass.");
    _testResult = TS.Linq.Extensions.any(TS.Linq.Enumerable.fromArray(CreateStringArray()), (item) => item.lenght < 2);
    assert.ok(!_testResult, "Should return false on a predicate that shouldn't pass.");
    _testResult = TS.Linq.Extensions.any(TS.Linq.Enumerable.fromArray(CreateStringArray()));
    assert.ok(_testResult, "Should return true on a none empty 'enumerable' without predicate.");
    _testResult = TS.Linq.Extensions.any(TS.Linq.Enumerable.fromArray([]));
    assert.ok(!_testResult, "Should return false on an empty 'enumerable' without predicate.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.any<string>(null, (item) => item.length < 0);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.any<string>(_undefined, (item) => item.length < 0);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");

  });


  QUnit.test("average", (assert) =>
  {
    var _testNumberArray: Array<number>;
    var _testResult: number;
    var _undefined;

    _testNumberArray = CreateNumberArray();
    _testResult = TS.Linq.Extensions.average(TS.Linq.Extensions.fromArray(_testNumberArray));
    assert.equal(_testResult, 5.5, "Should return expected average.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.average(TS.Linq.Extensions.empty<number>());
    }, (err) => ((err.name == "TS.Linq.EmptyEnumerableException") ? true : false), "Should throw a 'TS.Linq.EmptyEnumerableException' for an empty 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.average(null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for null 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.average(_undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for undefined 'enumerable' argument.");

    _testNumberArray.push(Number.MAX_VALUE / 2);
    _testNumberArray.push(Number.MAX_VALUE);

    assert.throws(() =>
    {
      TS.Linq.Extensions.average(TS.Linq.Extensions.fromArray(_testNumberArray));
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

    _testNumberResult = TS.Linq.Extensions.concat(TS.Linq.Enumerable.fromArray(CreateNumberArray()), TS.Linq.Enumerable.fromArray(CreateNumberArray()));
    _resultNumberArray = _testNumberResult.toArray();
    assert.deepEqual(_resultNumberArray, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "Should return concatenation of two 'Enumerable<number>'.");

    _testStringResult = TS.Linq.Extensions.concat(TS.Linq.Enumerable.fromArray(CreateStringArray()), TS.Linq.Enumerable.fromArray(CreateStringArray()));
    _resultStringArray = _testStringResult.toArray();
    assert.deepEqual(_resultStringArray, ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"], "Should return concatenation of two 'Enumerable<string>'.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.concat(null, TS.Linq.Enumerable.fromArray(CreateStringArray()));
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an null 'firstEnumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.concat(TS.Linq.Enumerable.fromArray(CreateStringArray()), null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an null 'secondEnumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.concat(_undefined, TS.Linq.Enumerable.fromArray(CreateStringArray()));
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'firstEnumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.concat(TS.Linq.Enumerable.fromArray(CreateStringArray()), _undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'secondEnumerable' argument.");
  });


  QUnit.test("contains", (assert) =>
  {
    var _testResult: boolean;
    var _testEmptyEnumerable: TS.Linq.Enumerable<any>;
    var _testCar: ICar
    var _undefined;

    _testCar = new Car("SCODA");

    _testEmptyEnumerable = TS.Linq.Extensions.empty<any>();

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

    _testResult = TS.Linq.Extensions.contains<ICar>(TS.Linq.Enumerable.fromArray<ICar>(CreateCarsArray()), CreateCarsArray()[3], (first: ICar, second: ICar) => first.name == second.name);
    assert.ok(_testResult, "Should return true on a lookup for an element in 'Enumerable<Car>' with an equalityComparer.");

    _testResult = TS.Linq.Extensions.contains<ICar>(TS.Linq.Enumerable.fromArray<ICar>(CreateCarsArray()), _testCar, (first: ICar, second: ICar) => first.name == second.name);
    assert.ok(!_testResult, "Should return false on a lookup for a none existing element in 'Enumerable<Car>' with an equalityComparer.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.contains(null, 123);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.contains(_testEmptyEnumerable, null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'element' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.contains(_undefined, 123);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.contains(_testEmptyEnumerable, _undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'element' argument.");
  });


  QUnit.test("count", (assert) =>
  {
    var _testNumberEnumerable: TS.Linq.Enumerable<number>;
    var _testStringEnumerable: TS.Linq.Enumerable<string>;
    var _testCarEnumerable: TS.Linq.Enumerable<Car>;
    var _undefined;

    _testNumberEnumerable = TS.Linq.Enumerable.fromArray(CreateNumberArray());
    _testStringEnumerable = TS.Linq.Enumerable.fromArray(CreateStringArray());
    _testCarEnumerable = TS.Linq.Enumerable.fromArray(CreateCarsArray());

    assert.equal(TS.Linq.Extensions.count(_testNumberEnumerable), 10, "Should count 10 numbers out of 10.");
    assert.equal(TS.Linq.Extensions.count(_testNumberEnumerable, (item: number) => item > 5), 5, "Should count 5 numbers greater 5 out of 10.");
    assert.equal(TS.Linq.Extensions.count(TS.Linq.Extensions.empty()), 0, "Should counted 0 on an empty enumerable.");
    assert.equal(TS.Linq.Extensions.count(_testStringEnumerable, (item: string) => item.indexOf("e") > -1), 7, "Should count 7 elements with character 'e' in an 'Enumerable<string>' using a predicate.");
    assert.equal(TS.Linq.Extensions.count(_testCarEnumerable, (item: Car) => item.horsePower > 100), 3, "Should count 4 elements with horsePower greater 100 in an 'Enumerable<Car>' using a predicate.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.count(null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.count(_undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");
  });


  QUnit.test("cycle", (assert) =>
  {
    var _testStringEnumerable: TS.Linq.Enumerable<string>;
    var _testResultEnumerable: TS.Linq.Enumerable<string>;
    var _testResultArray: Array<string>;
    var _undefined;

    _testStringEnumerable = TS.Linq.Extensions.fromArray(CreateStringArray());
    _testResultEnumerable = TS.Linq.Extensions.cycle(_testStringEnumerable).take(40);
    _testResultArray = _testResultEnumerable.toArray();
    assert.equal(_testResultArray.length, 40, "Should return 40 elements after a call to 'take(40)'.");

    _testResultArray = TS.Linq.Extensions.cycle(TS.Linq.Extensions.empty<string>()).take(20).toArray();

    assert.equal(_testResultArray.length, 0, "Should return an empty enumerable if the argument 'enumerable' was also an empty enumerable.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.cycle(null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.cycle(_undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");
  });


  QUnit.test("defaultIfEmpty", (assert) =>
  {
    var _testResultCarEnumerable: TS.Linq.Enumerable<Car>;
    var _testResultCarArray: Array<Car>;
    var _undefined;

    _testResultCarEnumerable = TS.Linq.Extensions.defaultIfEmpty(TS.Linq.Extensions.empty<Car>(), Car);
    _testResultCarArray = _testResultCarEnumerable.toArray();
    assert.deepEqual(_testResultCarArray[0], new Car(), "Should return an enumerable with one default element on an empty enumerable.");

    _testResultCarEnumerable = TS.Linq.Extensions.defaultIfEmpty(TS.Linq.Extensions.fromArray(CreateCarsArray()), Car);
    _testResultCarArray = _testResultCarEnumerable.toArray();
    assert.deepEqual(_testResultCarArray, CreateCarsArray(), "Should return the original enumerable on a none empty enumerable.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.defaultIfEmpty(null, Car);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.defaultIfEmpty(TS.Linq.Extensions.empty<Car>(), null)
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'defaultConstructor' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.defaultIfEmpty(_undefined, Car);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should threw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.defaultIfEmpty(TS.Linq.Extensions.empty<Car>(), _undefined)
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'defaultConstructor' argument.");
  });


  QUnit.test("distinct", (assert) =>
  {
    var _testResultCarEnumerable: TS.Linq.Enumerable<Car>;
    var _testResultCarArray: Array<Car>;
    var _testInputCarEnumerable: TS.Linq.Enumerable<Car>;
    var _testInputCarArray: Array<Car>;
    var _testResultNumberArray: Array<number>;
    var _undefined;

    _testInputCarArray = CreateCarsArray();
    _testInputCarArray.push(new Car("VOLVO", 220, false, Date.parse("1999-01-01"), 21000));
    _testInputCarArray.push(new Car("AUDI", 110, false, Date.parse("1999-04-15"), 4000));
    _testInputCarArray.push(new Car("BENTLEY", 350, false, Date.parse("2012-01-01"), 55000));
    _testInputCarArray.push(new Car("FIAT", 60, false, Date.parse("1980-01-01"), 500));
    _testInputCarEnumerable = TS.Linq.Extensions.fromArray(_testInputCarArray);
    _testResultCarEnumerable = TS.Linq.Extensions.distinct(_testInputCarEnumerable, (first: Car, second: Car) => first.name == second.name);
    _testResultCarArray = TS.Linq.Extensions.toArray(_testResultCarEnumerable);
    assert.equal(_testResultCarArray.length, 7, "Should return a result enumerable with 7 elements from the input enumerable with 9 elements using the given 'equalityComparer'.");

    _testResultNumberArray = TS.Linq.Extensions.fromArray([0, 0, 1, 2, 2, 2, 3, 4, 4, 5, 6, 6, 6, 6, 6, 7, 8, 8, 8, 9, 9]).distinct().toArray();
    assert.equal(_testResultNumberArray.length, 10, "Should return a result enumerable with 10 elements from the input enumerable of type 'Enumerable<number>' with no 'equalityComparer' defined.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.distinct(null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.distinct(_undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");
  });


  QUnit.test("elementAt", (assert) =>
  {
    var _testInputCarEnumerable: TS.Linq.Enumerable<Car>;
    var _testResultCar: Car;
    var _undefined;

    _testInputCarEnumerable = TS.Linq.Extensions.fromArray(CreateCarsArray());

    _testResultCar = TS.Linq.Extensions.elementAt(_testInputCarEnumerable, 3);
    assert.deepEqual(_testResultCar, CreateCarsArray()[3], "Should return the element at the required position.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.elementAt(_testInputCarEnumerable, -3);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for an 'index' argument value less than 0.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.elementAt(_testInputCarEnumerable, 3.5);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for an 'index' argument value which is a float and not an integer.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.elementAt(_testInputCarEnumerable, 20);
    }, (err) => ((err.name == "TS.IndexOutOfRangeException") ? true : false), "Should throw a 'TS.IndexOutOfRangeException' for an 'index' argument value greater than the number of elements in argument 'enumerable'.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.elementAt(null, 20);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.elementAt(_testInputCarEnumerable, null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'index' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.elementAt(_undefined, 20);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.elementAt(_testInputCarEnumerable, _undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'index' argument.");

  });


  QUnit.test("elementAtOrDefault", (assert) =>
  {
    var _testInputCarEnumerable: TS.Linq.Enumerable<Car>;
    var _testResultCar: Car;
    var _undefined;

    _testInputCarEnumerable = TS.Linq.Extensions.fromArray(CreateCarsArray());

    _testResultCar = TS.Linq.Extensions.elementAtOrDefault(_testInputCarEnumerable, 3, Car);
    assert.deepEqual(_testResultCar, CreateCarsArray()[3], "Should return the element at the required position.");

    _testResultCar = TS.Linq.Extensions.elementAtOrDefault(_testInputCarEnumerable, 20, Car);
    assert.deepEqual(_testResultCar, new Car(), "Should return a default element for a required position out of the range of the enumerable.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.elementAtOrDefault(_testInputCarEnumerable, -3, Car);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for an 'index' argument value less than 0.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.elementAtOrDefault(null, 20, Car);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.elementAtOrDefault(_testInputCarEnumerable, null, Car);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'index' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.elementAtOrDefault(_testInputCarEnumerable, 20, null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'defaultConstructor' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.elementAtOrDefault(_undefined, 20, Car);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.elementAtOrDefault(_testInputCarEnumerable, _undefined, Car);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'index' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.elementAtOrDefault(_testInputCarEnumerable, 20, _undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'defaultConstructor' argument.");
  });


  QUnit.test("empty", (assert) =>
  {
    var _emptyCar: TS.Linq.Enumerable<Car>;
    var _emptyArr: Array<Car>;
    _emptyCar = TS.Linq.Extensions.empty<Car>();
    _emptyArr = _emptyCar.toArray();
    assert.ok(_emptyArr.length == 0, "Should create an enumerable with 0 elements.");
  });


  QUnit.test("except", (assert) =>
  {
    var _firstSet: TS.Linq.Enumerable<number>;
    var _secondSet: TS.Linq.Enumerable<number>;
    var _resultSet: TS.Linq.Enumerable<number>;
    var _resultArray: Array<number>;
    var _testInputCarArray: Array<Car>;
    var _testInputCarEnumerable: TS.Linq.Enumerable<Car>;
    var _testCarResultArray: Array<Car>;
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

    _testInputCarArray = new Array<Car>();
    _testInputCarArray.push(new Car("VOLVO", 220, false, Date.parse("1999-01-01"), 21000));
    _testInputCarArray.push(new Car("AUDI", 110, false, Date.parse("1999-04-15"), 4000));
    _testInputCarArray.push(new Car("BENTLEY", 350, false, Date.parse("2012-01-01"), 55000));
    _testInputCarArray.push(new Car("FIAT", 60, false, Date.parse("1980-01-01"), 500));
    _testInputCarEnumerable = TS.Linq.Extensions.fromArray(_testInputCarArray);

    _resultArray = TS.Linq.Extensions.except(TS.Linq.Extensions.fromArray(CreateCarsArray()), _testInputCarEnumerable, (first: Car, second: Car) => (first.name == second.name)).toArray();
    assert.equal(_resultArray.length, 3, "Should return a result set with 3 elements.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.except(null, _secondSet);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'firstEnumerable' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.except(_firstSet, null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'secondEnumerable' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.except(_undefined, _secondSet);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'firstEnumerable' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.except(_firstSet, _undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'secondEnumerable' argument.");
  });


  QUnit.test("first", (assert) =>
  {
    var _result: any;
    var _undefined;

    _result = TS.Linq.Extensions.where(personEnumerable, (item: any) => item.FirstName == "Michael").first();
    assert.equal(_result.LastName, "Blythe", "Should return the first match in the result set.");

    _result = TS.Linq.Extensions.first(personEnumerable, (item: any) => item.FirstName == "Michael");
    assert.equal(_result.LastName, "Blythe", "Should return the first match in the result set when called with a predicate.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.first(TS.Linq.Extensions.empty<number>());
    }, (err) => ((err.name == "TS.InvalidOperationException") ? true : false), "Should trow a TS.InvalidOperationException on an empty enumerable.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.first(personEnumerable, (item: any) => item.NoAttribute == "NOP");
    }, (err) => ((err.name == "TS.InvalidOperationException") ? true : false), "Should trow a TS.InvalidOperationException when called with an invalid predicate.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.first(TS.Linq.Extensions.empty<number>(), (item: number) => item.toString() == "5");
    }, (err) => ((err.name == "TS.InvalidOperationException") ? true : false), "Should trow a TS.InvalidOperationException on an empty enumerable when called with a predicate.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.first(null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.first(_undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");

  });


  QUnit.test("firstOrDefault", (assert) =>
  {
    var _result: any;
    var _carEnumerable: TS.Linq.Enumerable<Car>;

    _carEnumerable = TS.Linq.Extensions.fromArray(CreateCarsArray());

    _result = TS.Linq.Extensions.where(_carEnumerable, (item: Car) => item.name == "VW").firstOrDefault(Car)
    assert.equal(_result.name, "VW", "Should return the first match in the result set.");

    _result = TS.Linq.Extensions.where(_carEnumerable, (item: Car) => item.name == "faöejrfkesjköpaf").firstOrDefault(Car);
    assert.deepEqual(_result, new Car(), "Should return a default object if the enumerable is empyt.");

    _result = TS.Linq.Extensions.firstOrDefault(_carEnumerable, Car, (item: Car) => item.name == "AUDI");
    assert.equal(_result.name, "AUDI", "Should return the first match in the result set when called with a predicate.");

    _result = TS.Linq.Extensions.firstOrDefault(_carEnumerable, Car, (item: Car) => item.name == "faöejrfkesjköpaf");
    assert.deepEqual(_result, new Car(), "Should return a default object on an enumerable with no match on the predicate.");

    _result = TS.Linq.Extensions.firstOrDefault(_carEnumerable, Car, (item: any) => item.noValidAttribute == 5);
    assert.deepEqual(_result, new Car(), "Should return a default object on an enumerable with an invalid predicate.");
  });

  QUnit.test("fromArray", (assert) =>
  {
    var _testArray = CreateNumberArray();
    var _testEnumerable: TS.Linq.Enumerable<number>;

    _testEnumerable = TS.Linq.Extensions.fromArray(CreateNumberArray());
    assert.equal(_testEnumerable.count(), _testArray.length, "Should return a enumerable with as much elements as the source array.");

    _testEnumerable = TS.Linq.Extensions.fromArray([]);
    assert.equal(_testEnumerable.count(), 0, "Should return an empty enumerable when calle with an empty array.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.fromArray(null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'sourceArray' argument.");

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


    _jointEnum = TS.Linq.Extensions.groupJoin(customersEnumerable, ordersEnumerable, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, (outerItem, group) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrderGroup: group }));

    _jointArray = _jointEnum.toArray();
    _orders = 0;
    for (_index = _jointArray.length - 1; _index > -1; _index--)
    {
      _jointArray[_index].OrderGroup = _jointArray[_index].OrderGroup.toArray();
      _orders += _jointArray[_index].OrderGroup.length;
    }//END for

    assert.ok(_jointArray.length == 91, "Should return 91 joined records for the executed expression.");
    assert.ok(_orders == 830, "Should return 830 order records for the executed expression.");

    //
    //Call the query once again but using the 'equalityComparer' instead of the default comparer.
    //Should return the same result.
    //
    _jointEnum = TS.Linq.Extensions.groupJoin(customersEnumerable, ordersEnumerable, (outerItem) => outerItem, (innerItem) => innerItem, (outerItem, group) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrderGroup: group }), (outerKey, innerKey) =>
    {
      return outerKey.CustomerID === innerKey.CustomerID
    });

    _jointArray = _jointEnum.toArray();
    _orders = 0;
    for (_index = _jointArray.length - 1; _index > -1; _index--)
    {
      _jointArray[_index].OrderGroup = _jointArray[_index].OrderGroup.toArray();
      _orders += _jointArray[_index].OrderGroup.length;
    }//END for

    assert.ok(_jointArray.length == 91, "Should return 91 joined records for the executed expression.");
    assert.ok(_orders == 830, "Should return 830 order records for the executed expression.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.groupJoin(customersEnumerable, ordersEnumerable, null, (innerItem) => innerItem.CustomerID, (outerItem, group) => ({ Customer: outerItem, OrderGroup: group }));
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'outerKeySelector' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.groupJoin(customersEnumerable, ordersEnumerable, _undefined, (innerItem) => innerItem.CustomerID, (outerItem, group) => ({ Customer: outerItem, OrderGroup: group }));
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'outerKeySelector' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.groupJoin(customersEnumerable, ordersEnumerable, (outerItem) => outerItem.CustomerID, null, (outerItem, group) => ({ Customer: outerItem, OrderGroup: group }));
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'innerKeySelector' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.groupJoin(customersEnumerable, ordersEnumerable, (outerItem) => outerItem.CustomerID, _undefined, (outerItem, group) => ({ Customer: outerItem, OrderGroup: group }));
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'innerKeySelector' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.groupJoin(customersEnumerable, ordersEnumerable, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'resultSelector' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.groupJoin(customersEnumerable, ordersEnumerable, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, _undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'resultSelector' argument.");
  });



  QUnit.test("intersect", (assert) => 
  {
    var _carsUnionEnum: TS.Linq.Enumerable<Car>;
    var _carsEnum: TS.Linq.Enumerable<Car>;
    var _carsIntersect: TS.Linq.Enumerable<Car>;
    var _numberEnumFirst: TS.Linq.Enumerable<Number>;
    var _numberEnumSecond: TS.Linq.Enumerable<Number>;
    var _numberIntersect: TS.Linq.Enumerable<Number>;
    var _resultArr: Array<Car>;
    var _undefined;

    _carsUnionEnum = TS.Linq.Extensions.fromArray(CreateCarsUnionTestArray());
    _carsEnum = TS.Linq.Extensions.fromArray(CreateCarsArray());

    _carsIntersect = TS.Linq.Extensions.intersect(_carsEnum, _carsUnionEnum, (first, second) => first.name === second.name);
    _resultArr = _carsIntersect.toArray();

    assert.equal(_carsIntersect.count(), 2, "Schould return a result set with 2 elements when called with an equality comparer.");

    _numberEnumFirst = TS.Linq.Extensions.fromArray(CreateNumberArray());
    _numberEnumSecond = TS.Linq.Extensions.fromArray([2, 4, 7, 8]);
    _numberIntersect = TS.Linq.Extensions.intersect(_numberEnumFirst, _numberEnumSecond);

    assert.equal(_numberIntersect.count(), 4, "Schould return a result set with 4 elements when called without an equality comparer.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.intersect(null, _numberEnumSecond);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'firstEnumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.intersect(_undefined, _numberEnumSecond);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'firstEnumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.intersect(_numberEnumFirst, null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'secondEnumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.intersect(_numberEnumFirst, _undefined);
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


    _jointEnum = TS.Linq.Extensions.join(customersEnumerable, ordersEnumerable, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, (outerItem, innerItem) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }));

    _jointArray = _jointEnum.toArray();
    assert.ok(_jointArray.length == 830, "Should return 830 records for the executed expression.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.join(customersEnumerable, ordersEnumerable, null, (innerItem) => innerItem.CustomerID, (outerItem, innerItem) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }));
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'outerKeySelector' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.join(customersEnumerable, ordersEnumerable, _undefined, (innerItem) => innerItem.CustomerID, (outerItem, innerItem) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }));
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'outerKeySelector' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.join(customersEnumerable, ordersEnumerable, (outerItem) => outerItem.CustomerID, null, (outerItem, innerItem) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }));
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'innerKeySelector' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.join(customersEnumerable, ordersEnumerable, (outerItem) => outerItem.CustomerID, _undefined, (outerItem, innerItem) => ({ CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }));
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'innerKeySelector' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.join(customersEnumerable, ordersEnumerable, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'resultSelector' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.join(customersEnumerable, ordersEnumerable, (outerItem) => outerItem.CustomerID, (innerItem) => innerItem.CustomerID, _undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'resultSelector' argument.");
  });


  QUnit.test("last", (assert) =>
  {
    var _result: any;
    var _undefined;

    _result = TS.Linq.Extensions.where(personEnumerable, (item: any) => item.FirstName == "Michael").last();
    assert.equal(_result.LastName, "Martin", "Should return the last element in the result set.");

    _result = TS.Linq.Extensions.last(personEnumerable, (item: any) => item.FirstName == "Michael");
    assert.equal(_result.LastName, "Martin", "Should return the last match in the result set when called with a predicate.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.last(TS.Linq.Extensions.empty<number>());
    }, (err) => ((err.name == "TS.InvalidOperationException") ? true : false), "Should trow a TS.InvalidOperationException on an empty enumerable.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.last(personEnumerable, (item: any) => item.NoAttribute == "NOP");
    }, (err) => ((err.name == "TS.InvalidOperationException") ? true : false), "Should trow a TS.InvalidOperationException when called with a predicate that doesn't match.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.last(TS.Linq.Extensions.empty<number>(), (item: number) => item.toString() == "5");
    }, (err) => ((err.name == "TS.InvalidOperationException") ? true : false), "Should trow a TS.InvalidOperationException on an empty enumerable when called with a predicate.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.last(null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.last(_undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");

  });


  QUnit.test("lastOrDefault", (assert) =>
  {
    var _result: ICustomer;
    var _undefined;

    _result = TS.Linq.Extensions.lastOrDefault(customersEnumerable, Customer);
    assert.equal(_result.ContactName, "Zbyszek Piestrzeniewicz", "Should return the last element in the enumerable.");

    _result = TS.Linq.Extensions.lastOrDefault(customersEnumerable.where(Item => Item.Country == "NOP"), Customer);
    assert.deepEqual(_result, new Customer(), "Should return a default object if the enumerable is empyt.");

    _result = TS.Linq.Extensions.lastOrDefault(customersEnumerable, Customer, (Item) => Item.Country == "USA");
    assert.equal(_result.CompanyName, "White Clover Markets", "Should return the last match in the result set when called with a predicate."); 

    _result = TS.Linq.Extensions.lastOrDefault(customersEnumerable, Customer, (Item) => Item.Country == "NOP");
    assert.deepEqual(_result, new Customer(), "Should return a default object when called with a prdicate that doesn't match.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.lastOrDefault(null, Customer);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.lastOrDefault(_undefined, Customer);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.lastOrDefault(customersEnumerable, null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'defaultConstructor' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.lastOrDefault(customersEnumerable, _undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'defaultConstructor' argument.");

    //assert.ok(false, "Not implemented.");
  });


  QUnit.test("max", (assert) =>
  {
    var _max: number;
    var _undefined;
    //Run the following query in 'LinqPad' against the 'NORTHWND' database.
    //Orders.Select(_ORD => _ORD.Freight).Max().Dump();
    //The query will return 1007.6400

    _max = TS.Linq.Extensions.max(<TS.Linq.Enumerable<number>> ordersEnumerable.select<Number>(_ORD => _ORD.Freight));
    assert.equal(_max, 1007.64, "Should return the expected value.");

    _max = TS.Linq.Extensions.max(TS.Linq.Extensions.fromArray(CreateNumberArray()));
    assert.equal(_max, 10, "Should return the expected value.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.max(null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.max(_undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.max(TS.Linq.Extensions.empty<number>());
    }, (err) => ((err.name == "TS.Linq.EmptyEnumerableException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a empty 'enumerable' argument.");
  });


  QUnit.test("min", (assert) =>
  {
    var _min: number;
    var _undefined;
    //Run the following query in 'LinqPad' against the 'NORTHWND' database.
    //Orders.Select(_ORD => _ORD.Freight).Min().Dump();
    //The query will return 0.0200

    _min = TS.Linq.Extensions.min(<TS.Linq.Enumerable<number>> ordersEnumerable.select<Number>(_ORD => _ORD.Freight));
    assert.equal(_min, 0.02, "Should return the expected value.");

    _min = TS.Linq.Extensions.min(TS.Linq.Extensions.fromArray(CreateNumberArray()));
    assert.equal(_min, 1, "Should return the expected value.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.min(null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.min(_undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");

    assert.throws(() => 
    {
      TS.Linq.Extensions.min(TS.Linq.Extensions.empty<number>());
    }, (err) => ((err.name == "TS.Linq.EmptyEnumerableException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a empty 'enumerable' argument.");
  });


  QUnit.test("orderBy", (assert) =>
  {
    var _sortTestArray: Array<any>;
    var _randomNumberArray: Array<number>;
    var _resultISortTestArray: Array<ISortTestItem>;
    var _resultNumberTestArray: Array<number>;
    var _orderCorrect: boolean;
    var _index: number;
    var _undefined;

    _sortTestArray = CreateSortTestArray();
    _resultISortTestArray = TS.Linq.Extensions.orderBy(TS.Linq.Extensions.fromArray(_sortTestArray), (item: any) => (<ISortTestItem> item).color).toArray();

    _orderCorrect = true;

    for (_index = 0; _index < _resultISortTestArray.length - 1; _index++)
    {
      if (_resultISortTestArray[_index].color > _resultISortTestArray[_index + 1].color)
      {
        _orderCorrect = false;
        break;
      }//END if
    }//END for

    assert.ok(_orderCorrect, "The array of ISortTestItems should be sorted by color in ascending order.");

    _randomNumberArray = CreateRandomNumberArray(100);
    _resultNumberTestArray = TS.Linq.Extensions.orderBy(TS.Linq.Extensions.fromArray(_randomNumberArray), item => item).toArray();

    _orderCorrect = true;

    for (_index = 0; _index < _resultNumberTestArray.length - 1; _index++)
    {
      if (_resultNumberTestArray[_index] > _resultNumberTestArray[_index + 1])
      {
        _orderCorrect = false;
        break;
      }//END if
    }//END for

    assert.ok(_orderCorrect, "Should returns an array of numbers sorted in ascending order.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.orderBy(null, item => item);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.orderBy(_undefined, item => item);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");
  });


  QUnit.test("random", (assert) =>
  {
    var _emptyEnumerable: TS.Linq.Enumerable<number>;
    var _stringEnumerable: TS.Linq.Enumerable<string>;
    var _stringArray: Array<string>;
    var _stringResultArray: Array<string>;
    var _numberResultArray: Array<number>;
    var _isRandom = false;
    var _index: number;
    var _undefined;

    _stringArray = CreateStringArray();
    _stringEnumerable = TS.Linq.Extensions.fromArray(_stringArray);
    _stringResultArray = TS.Linq.Extensions.random(_stringEnumerable).take(50).toArray();

    for (_index = 0; _index < _stringArray.length; _index++)
    {
      if (_stringArray[_index] != _stringResultArray[_index])
      {
        _isRandom = true;
        break;
      }//END if
    }//END for

    assert.ok(_isRandom, "Should return a string array in random order.");

    _emptyEnumerable = TS.Linq.Extensions.empty<number>();
    _numberResultArray = TS.Linq.Extensions.random(_emptyEnumerable).take(50).toArray();

    assert.equal(_numberResultArray.length, 0, "Should return an empty enumeration if the input enumeration was also empty.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.random(null).take(50);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.random(_undefined).take(50);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");
  });


  QUnit.test("range", (assert) => 
  {
    var _resultEnum: TS.Linq.Enumerable<Number>;
    var _resultArray: Array<Number>
    var _undefined;

    _resultEnum = TS.Linq.Extensions.range(1, 50);
    _resultArray = _resultEnum.toArray();
    assert.equal(_resultEnum.count(), 50, "Should return an enumerable with 50 elements.");

    _resultEnum = TS.Linq.Extensions.range(111, 0);
    _resultArray = _resultEnum.toArray();
    assert.equal(_resultEnum.count(), 0, "Should return an enumerable with 0 elements.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.range(1, -3);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should trow a TS.ArgumentOutOfRangeException for a negative 'count' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.range(null, 33);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should trow a TS.ArgumentNullOrUndefinedException for a null 'start' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.range(_undefined, 33);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should trow a TS.ArgumentNullOrUndefinedException for an undefined 'start' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.range(12, null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should trow a TS.ArgumentNullOrUndefinedException for a null 'count' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.range(12, _undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should trow a TS.ArgumentNullOrUndefinedException for an undefined 'count' argument.");
  });


  QUnit.test("repeat", (assert) =>
  {
    var _sourceElement: ICar;
    var _undefined;
    var _resultArray: Array<ICar>;

    _sourceElement = CreateCarsArray()[0];

    _resultArray = TS.Linq.Extensions.repeat(_sourceElement, 50).toArray();
    assert.ok(_resultArray.length == 50 && _resultArray[0].name == "BMW", "Should return a result with as much elements as required in repeat and of the same type.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.repeat(null, 33);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should trow a TS.ArgumentNullOrUndefinedException for a null 'item' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.repeat(_undefined, 33);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should trow a TS.ArgumentNullOrUndefinedException for an undefined 'item' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.repeat(_sourceElement, -33);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should trow a TS.TS.ArgumentOutOfRangeException on a negative 'count' argument.");
  });


  QUnit.test("reverse", (assert) =>
  {
    var _numberArray: Array<number>;
    var _resultArray: Array<number>;
    var _controlArray: Array<number>;
    var _emptyEnumerable: TS.Linq.Enumerable<number>;
    var _index: number;
    var _failed: boolean;
    var _undefined;

    _numberArray = CreateNumberArray();
    _controlArray = CreateNumberArray().reverse();

    _resultArray = TS.Linq.Extensions.reverse(TS.Linq.Extensions.fromArray(_numberArray)).toArray();
    _failed = false;

    for (_index = 0; _index < _resultArray.length; _index++)
    {
      if (_resultArray[_index] != _controlArray[_index])
      {
        _failed = true;
        break;
      }//END if
    }//END for

    assert.ok(!_failed, "Should return an array which matches with the control array.");

    _emptyEnumerable = TS.Linq.Extensions.empty<number>();
    _resultArray = TS.Linq.Extensions.reverse(_emptyEnumerable).toArray();

    assert.equal(_resultArray.length, 0, "Should return an empty enumerabe if the input enumerable was also empty.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.reverse(null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");


    assert.throws(() =>
    {
      TS.Linq.Extensions.reverse(_undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should trow a TS.ArgumentNullOrUndefinedException for an undefined 'enumerable' argument.");

  });


  QUnit.test("select", (assert) =>
  {
    var _carsEnumerable: TS.Linq.Enumerable<ICar>;
    var _resultArray: Array<any>;
    var _expensiveCount: number;
    var _undefined;
    var _index: number;

    _carsEnumerable = TS.Linq.Extensions.fromArray(CreateCarsArray());
    _resultArray = TS.Linq.Extensions.select(_carsEnumerable, (item) => ({ buildYear: "'" + item.buildYear + "'", name: "'" + item.name + "'", expensive: ((item.price > 5000) ? "yes" : "no") })).toArray();

    _expensiveCount = 0;
    for (_index = 0; _index < _resultArray.length; _index++)
    {
      if (_resultArray[_index].expensive == "yes")
      {
        _expensiveCount++;
      }//END if
    }//END for

    assert.ok(_expensiveCount == 2, "Should return two expensive cars from the cars enumerable.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.select<any, any>(mmEnumerable, item => item.NOP).toArray();
    }, (err) => ((err.name == "TS.Linq.SelectorException") ? true : false), "Should throw a TS.Linq.SelectorException if called with an invalid selector.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.select(null, item => item);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a TS.ArgumentNullOrUndefinedException for a null 'enumerable' argument.")

    assert.throws(() =>
    {
      TS.Linq.Extensions.select(_undefined, item => item);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a TS.ArgumentNullOrUndefinedException for an undefined 'enumerable' argument.");

  });


  QUnit.test("selectMany", (assert) =>
  {
    var _outerIndex: number;
    var _innerIndex: number;
    var _simpleElementsCount: number;
    var _resultMany: Array<any>;
    var _resultSimple: Array<any>;
    var _resultSimpleExpanded: Array<any>;
    var _undefined;

    var _resultMany = TS.Linq.Extensions.selectMany<any, any>(mmEnumerable, item => item.vars).toArray();
    var _resultSimple = TS.Linq.Extensions.select<any, any>(mmEnumerable, item => item.vars).toArray();

    _simpleElementsCount = 0;
    _resultSimpleExpanded = new Array<any>();

    for (_outerIndex = 0; _outerIndex < _resultSimple.length; _outerIndex++)
    {
      if (_resultSimple[_outerIndex].length > 0)
      {
        for (_innerIndex = 0; _innerIndex < _resultSimple[_outerIndex].length; _innerIndex++)
        {
          _simpleElementsCount++;
          _resultSimpleExpanded.push(_resultSimple[_outerIndex][_innerIndex]);
        }//END for
      }//END for
    }//END for

    assert.equal(_simpleElementsCount, _resultMany.length, "Should return a result which has the same length as an expanded simple select.");
    assert.deepEqual(_resultMany, _resultSimpleExpanded, "Should return a result which should be equal to the expanded simple select result.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.selectMany<any, any>(mmEnumerable, item => item.NOP).toArray();
    }, (err) => ((err.name == "TS.Linq.SelectorException") ? true : false), "Should throw a TS.Linq.SelectorException if called with an invalid selector.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.selectMany<any, any>(null, item => item);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a TS.ArgumentNullOrUndefinedException for a null 'enumerable' argument.")

    assert.throws(() =>
    {
      TS.Linq.Extensions.selectMany<any, any>(_undefined, item => item);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a TS.ArgumentNullOrUndefinedException for an undefined 'enumerable' argument.");
  });


  QUnit.test("sequenceEqual", (assert) =>
  {
    var _numberArray: Array<Number>;
    var _customerArray: Array<ICustomer>;
    var _firstNumberEnumerable: TS.Linq.Enumerable<Number>;
    var _secondNumberEnumerable: TS.Linq.Enumerable<Number>;
    var _compareResult: boolean;
    var _undefined;

    _firstNumberEnumerable = TS.Linq.Extensions.fromArray(CreateNumberArray());
    _secondNumberEnumerable = TS.Linq.Extensions.fromArray(CreateNumberArray());

    _compareResult = TS.Linq.Extensions.sequenceEqual(_firstNumberEnumerable, _secondNumberEnumerable);
    assert.ok(_compareResult, "Should return true when comparing two equal enumerables");

    _compareResult = TS.Linq.Extensions.sequenceEqual(customersEnumerable, customersEnumerable, (first, second) => first.ContactName == second.ContactName);
    assert.ok(_compareResult, "Should return true when comparing two equal enumerables using an equalityComparer");

    _customerArray = customersEnumerable.toArray();
    _customerArray[55] = new Customer();
    _customerArray[55].ContactName = "No Contact Name";
    _compareResult = TS.Linq.Extensions.sequenceEqual(customersEnumerable, TS.Linq.Extensions.fromArray(_customerArray), (first, second) => first.ContactName == second.ContactName);
    assert.ok(!_compareResult, "Should return false when comparing two enumerables with different elements usin an equalityComparer");

    _numberArray = CreateNumberArray();
    _numberArray.pop();
    _secondNumberEnumerable = TS.Linq.Extensions.fromArray(_numberArray);
    _compareResult = TS.Linq.Extensions.sequenceEqual(_firstNumberEnumerable, _secondNumberEnumerable);
    assert.ok(!_compareResult, "Should return false when comparing two enumerables with different length");

    _numberArray = CreateNumberArray();
    _numberArray.push(11);
    _secondNumberEnumerable = TS.Linq.Extensions.fromArray(_numberArray);
    _compareResult = TS.Linq.Extensions.sequenceEqual(_firstNumberEnumerable, _secondNumberEnumerable);
    assert.ok(!_compareResult, "Should return false when comparing two enumerables with different length");

    _numberArray = CreateNumberArray();
    _numberArray[5] = Math.PI;
    _secondNumberEnumerable = TS.Linq.Extensions.fromArray(_numberArray);
    _compareResult = TS.Linq.Extensions.sequenceEqual(_firstNumberEnumerable, _secondNumberEnumerable);
    assert.ok(!_compareResult, "Should return false when comparing two unequal enumerables");

    assert.throws(() =>
    {
      TS.Linq.Extensions.sequenceEqual(null, _secondNumberEnumerable);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'firstEnumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.sequenceEqual(_undefined, _secondNumberEnumerable);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'firstEnumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.sequenceEqual(_firstNumberEnumerable, null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'secondEnumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.sequenceEqual(_firstNumberEnumerable, _undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'secondEnumerable' argument.");

  });


  QUnit.test("shuffle", (assert) =>
  {
    var _numberArr: Array<number>;
    var _nuberEnumerable: TS.Linq.Enumerable<number>;
    var _undefined;

    _nuberEnumerable = TS.Linq.Enumerable.fromArray(CreateNumberArray());
    _nuberEnumerable = TS.Linq.Extensions.shuffle(_nuberEnumerable);
    _numberArr = _nuberEnumerable.toArray();

    assert.equal(_numberArr.length, CreateNumberArray().length, "Should return a result array with the same length as the source array.");
    assert.notDeepEqual(_numberArr, CreateNumberArray(), "Should return a shuffled array which doesn't be equal to the source array");
    _numberArr = _numberArr.sort((first, second) => { return first - second; });
    assert.deepEqual(_numberArr, CreateNumberArray(), "Should match with the source array after sorting.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.shuffle(null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.shuffle(_undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");
  });


  QUnit.test("single", (assert) =>
  {
    var _result: Customer;
    var _undedined;

    _result = TS.Linq.Extensions.single(customersEnumerable.where(_CUST => _CUST.CustomerID == "OTTIK"));

    assert.equal(_result.CustomerID, "OTTIK", "Should return the expected single result.");

    _result = TS.Linq.Extensions.single(customersEnumerable, (_CUST) => _CUST.CustomerID == "OTTIK");

    assert.equal(_result.CustomerID, "OTTIK", "Should return the expected single result.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.single(customersEnumerable.where(_CUST => _CUST.CustomerID.indexOf("BO") > -1));
    }, (err) => ((err.name == "TS.Linq.MoreThanOneElementException") ? true : false), "Should throw a 'TS.Linq.MoreThanOneElementException' for an 'enumerable' argument with more than one element.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.single(customersEnumerable, (_CUST) => _CUST.CustomerID.indexOf("BO") > -1);
    }, (err) => ((err.name == "TS.Linq.MoreThanOneElementException") ? true : false), "Should throw a 'TS.Linq.MoreThanOneElementException' for an for a 'predicate' which matches more than one element.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.single(customersEnumerable.where(_CUST => _CUST.CustomerID.indexOf("NOP") > -1));
    }, (err) => ((err.name == "TS.InvalidOperationException") ? true : false), "Should throw a 'TS.InvalidOperationException' for an empty 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.single(customersEnumerable, (_CUST) => _CUST.CustomerID == "NOP");
    }, (err) => ((err.name == "TS.InvalidOperationException") ? true : false), "Should throw a 'TS.InvalidOperationException' for a 'predicate' which doesn't match.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.single(null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.single(_undedined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");
  });


  QUnit.test("singleOrDefault", (assert) =>
  {
    var _result: Customer;
    var _undedined;

    _result = TS.Linq.Extensions.singleOrDefault(customersEnumerable.where(_CUST => _CUST.CustomerID == "OTTIK"), Customer);
    assert.equal(_result.CustomerID, "OTTIK", "Should return the expected single result.");

    _result = TS.Linq.Extensions.singleOrDefault(customersEnumerable, Customer, (_CUST) => _CUST.CustomerID == "OTTIK");
    assert.equal(_result.CustomerID, "OTTIK", "Should return the expected single result.");

    _result = TS.Linq.Extensions.singleOrDefault(customersEnumerable.where(_CUST => _CUST.CustomerID == "NOP"), Customer);
    assert.deepEqual(_result, new Customer(), "Shoud return a default object for an 'enumerable' which is empty.");

    _result = TS.Linq.Extensions.singleOrDefault(customersEnumerable, Customer, (_CUST) => _CUST.CustomerID == "NOP");
    assert.deepEqual(_result, new Customer(), "Shoud return a default object for a 'predicate' which doesn't match with the enumerable.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.singleOrDefault(customersEnumerable.where(_CUST => _CUST.CustomerID.indexOf("BO") > -1), Customer);
    }, (err) => ((err.name == "TS.Linq.MoreThanOneElementException") ? true : false), "Should throw a 'TS.Linq.MoreThanOneElementException' for an 'enumerable' argument with more than one element.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.singleOrDefault(customersEnumerable, Customer, (_CUST) => _CUST.CustomerID.indexOf("BO") > -1);
    }, (err) => ((err.name == "TS.Linq.MoreThanOneElementException") ? true : false), "Should throw a 'TS.Linq.MoreThanOneElementException' for an for a 'predicate' which matches more than one element.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.singleOrDefault(null, Customer);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.singleOrDefault(_undedined, Customer);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.singleOrDefault(customersEnumerable, null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'defaultConstructor' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.singleOrDefault(customersEnumerable, _undedined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'defaultConstructor' argument.");
  });


  QUnit.test("skip", (assert) =>
  {
    var _numberArr: Array<number>;
    var _numberEnumerable: TS.Linq.Enumerable<number>;
    var _expectedArr: Array<number>;
    var _undefined;

    _expectedArr = new Array();
    _expectedArr.push(5, 6, 7, 8, 9, 10);
    _numberEnumerable = TS.Linq.Enumerable.fromArray(CreateNumberArray());
    _numberArr = TS.Linq.Extensions.skip(_numberEnumerable, 4).toArray();
    assert.deepEqual(_numberArr, _expectedArr, "Should return a result array which matches with the expected array.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.skip(_numberEnumerable, -5);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a negative 'count' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.skip(null, 5);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.skip(_undefined, 5);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");
  });


  QUnit.test("skipWhile", (assert) =>
  {
    var _numberArr: Array<number>;
    var _numberEnumerable: TS.Linq.Enumerable<number>;
    var _expectedArr: Array<number>;
    var _undefined;

    _expectedArr = new Array();
    _expectedArr.push(5, 6, 7, 8, 9, 10);
    _numberEnumerable = TS.Linq.Enumerable.fromArray(CreateNumberArray());
    _numberArr = TS.Linq.Extensions.skipWhile(_numberEnumerable, (item) => item < 5).toArray();
    assert.deepEqual(_numberArr, _expectedArr, "Should return a result array which matches with the expected array.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.skipWhile(null, (item) => item < 5);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.skipWhile(_undefined, (item) => item < 5);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.skipWhile(_numberEnumerable, null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'predicate' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.skipWhile(_numberEnumerable, _undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'predicate' argument.");
  });


  QUnit.test("sum", (assert) =>
  {
    var _testNumberArray: Array<number>;
    var _testResult: number;
    var _undefined;

    _testNumberArray = CreateNumberArray();
    _testResult = TS.Linq.Extensions.sum(TS.Linq.Enumerable.fromArray(_testNumberArray));
    assert.equal(_testResult, 55, "Should return expected sum.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.sum(TS.Linq.Extensions.empty<number>());
    }, (err) => ((err.name == "TS.Linq.EmptyEnumerableException") ? true : false), "Should throw a 'TS.Linq.EmptyEnumerableException' for an empty 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.sum(null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for null 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.sum(_undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for undefined 'enumerable' argument.");

    _testNumberArray.push(Number.MAX_VALUE / 2);
    _testNumberArray.push(Number.MAX_VALUE);

    assert.throws(() =>
    {
      TS.Linq.Extensions.average(TS.Linq.Extensions.fromArray(_testNumberArray));
    }, (err) => ((err.name == "TS.OverflowException") ? true : false), "Should throw a 'TS.OverflowException' for an 'Enumerable<number>' which exceeds the number range in sum in the 'enumerable' argument.");
  });


  QUnit.test("take", (assert) =>
  {
    var _numberArr: Array<number>;
    var _numberEnumerable: TS.Linq.Enumerable<number>;
    var _expectedArr: Array<number>;
    var _undefined;

    _expectedArr = new Array();
    _expectedArr.push(1, 2, 3, 4);
    _numberEnumerable = TS.Linq.Enumerable.fromArray(CreateNumberArray());
    _numberArr = TS.Linq.Extensions.take(_numberEnumerable, 4).toArray();
    assert.deepEqual(_numberArr, _expectedArr, "Should return a result array which matches with the expected array.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.take(_numberEnumerable, -5);
    }, (err) => ((err.name == "TS.ArgumentOutOfRangeException") ? true : false), "Should throw a 'TS.ArgumentOutOfRangeException' for a negative 'count' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.take(null, 5);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.take(_undefined, 5);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");
  });


  QUnit.test("takeWhile", (assert) =>
  {
    var _numberArr: Array<number>;
    var _numberEnumerable: TS.Linq.Enumerable<number>;
    var _expectedArr: Array<number>;
    var _undefined;

    _expectedArr = new Array();
    _expectedArr.push(1, 2, 3, 4);
    _numberEnumerable = TS.Linq.Enumerable.fromArray(CreateNumberArray());
    _numberArr = TS.Linq.Extensions.takeWhile(_numberEnumerable, (item) => item < 5).toArray();
    assert.deepEqual(_numberArr, _expectedArr, "Should return a result array which matches with the expected array.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.takeWhile(null, (item) => item < 5);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.takeWhile(_undefined, (item) => item < 5);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.takeWhile(_numberEnumerable, null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'predicate' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.takeWhile(_numberEnumerable, _undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'predicate' argument.");
  });


  QUnit.test("toArray", (assert) =>
  {
    var _numberArr: Array<number>;
    var _numberEnumerable: TS.Linq.Enumerable<number>;
    var _expectedArr: Array<number>;
    var _undefined;

    _expectedArr = CreateNumberArray()
    _numberEnumerable = TS.Linq.Enumerable.fromArray(CreateNumberArray());
    _numberArr = TS.Linq.Extensions.toArray(_numberEnumerable);
    assert.deepEqual(_numberArr, _expectedArr, "Should return a result array which matches with the expected array.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.toArray(null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.toArray(_undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");
  });


  QUnit.test("thenBy", (assert) =>
  {
    var _sortTestEnumerable: TS.Linq.Enumerable<ISortTestItem>;
    var _orderedEnumerable: TS.Linq.OrderedEnumerable<ISortTestItem>;
    var _resultArray: Array<ISortTestItem>;
    var _resultArrayColorGroup: Array<ISortTestItem>;
    var _colorsArray: Array<string>;
    var _index: number;
    var _sortedAsExpected: boolean;
    var _undefined;

    _sortTestEnumerable = TS.Linq.Enumerable.fromArray(CreateSortTestArray());
    _orderedEnumerable = _sortTestEnumerable.orderBy(Item => Item.color);
    _orderedEnumerable = TS.Linq.Extensions.thenBy(_orderedEnumerable, Item => Item.location);
    _resultArray = _orderedEnumerable.toArray();

    _sortedAsExpected = true;

    //
    //Check that the items are sorted by color as 
    //expected.
    //
    for (_index = 0; _index < _resultArray.length; _index++)
    {
      if (_index < 1)
      {
        continue;
      }//END if

      if (_resultArray[_index].color < _resultArray[_index - 1].color)
      {
        _sortedAsExpected = false;
        break;
      }//END if

    }//END for

    //
    //Check that in each color group the items 
    //are sorted by location as expected.
    //
    _colorsArray = TS.Linq.Enumerable.fromArray<ISortTestItem>(_resultArray).select<string>(Item => Item.color).distinct().toArray();
    _colorsArray.forEach((value) => 
    {
      _resultArrayColorGroup = _resultArray.filter(Item => Item.color == value);

      for (_index = 0; _index < _resultArrayColorGroup.length; _index++)
      {
        if (_index < 1)
        {
          continue;
        }//END if

        if (_resultArrayColorGroup[_index].location < _resultArrayColorGroup[_index - 1].location)
        {
          _sortedAsExpected = false;
          break;
        }//END if

      }//END for
    });
    assert.ok(_sortedAsExpected, "Should return a result array which is sorted by color in first order and by location in secondary order.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.thenBy<ISortTestItem, string>(null, Item => Item.location);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.thenBy<ISortTestItem, string>(_undefined, Item => Item.location);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");
  });


  QUnit.test("thenByDescending", (assert) =>
  {
    var _sortTestEnumerable: TS.Linq.Enumerable<ISortTestItem>;
    var _orderedEnumerable: TS.Linq.OrderedEnumerable<ISortTestItem>;
    var _resultArray: Array<ISortTestItem>;
    var _resultArrayColorGroup: Array<ISortTestItem>;
    var _colorsArray: Array<string>;
    var _index: number;
    var _sortedAsExpected: boolean;
    var _undefined;

    _sortTestEnumerable = TS.Linq.Enumerable.fromArray(CreateSortTestArray());
    _orderedEnumerable = _sortTestEnumerable.orderBy(Item => Item.color);
    _orderedEnumerable = TS.Linq.Extensions.thenByDescending(_orderedEnumerable, Item => Item.location);
    _resultArray = _orderedEnumerable.toArray();

    _sortedAsExpected = true;

    //
    //Check that the items are sorted by color as 
    //expected.
    //
    for (_index = 0; _index < _resultArray.length; _index++)
    {
      if (_index < 1)
      {
        continue;
      }//END if

      if (_resultArray[_index].color < _resultArray[_index - 1].color)
      {
        _sortedAsExpected = false;
        break;
      }//END if

    }//END for

    //
    //Check that in each color group the items 
    //are sorted by location as expected.
    //
    _colorsArray = TS.Linq.Enumerable.fromArray<ISortTestItem>(_resultArray).select<string>(Item => Item.color).distinct().toArray();
    _colorsArray.forEach((value) => 
    {
      _resultArrayColorGroup = _resultArray.filter(Item => Item.color == value);

      for (_index = 0; _index < _resultArrayColorGroup.length; _index++)
      {
        if (_index < 1)
        {
          continue;
        }//END if

        if (_resultArrayColorGroup[_index].location > _resultArrayColorGroup[_index - 1].location)
        {
          _sortedAsExpected = false;
          break;
        }//END if

      }//END for
    });
    assert.ok(_sortedAsExpected, "Should return a result array which is sorted by color in first order and by location descending in secondary order.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.thenByDescending<ISortTestItem, string>(null, Item => Item.location);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.thenByDescending<ISortTestItem, string>(_undefined, Item => Item.location);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");
  });


  QUnit.test("union", (assert) =>
  {
    var _carsEnumOne: TS.Linq.Enumerable<ICar>;
    var _carsEnumTwo: TS.Linq.Enumerable<ICar>;
    var _carsEnumResult: TS.Linq.Enumerable<ICar>;
    var _carsArrayResult: Array<ICar>;
    var _undefined;

    _carsEnumOne = TS.Linq.Enumerable.fromArray(CreateCarsArray());
    _carsEnumTwo = TS.Linq.Enumerable.fromArray(CreateCarsUnionTestArray());

    _carsEnumResult = TS.Linq.Extensions.union(_carsEnumOne, _carsEnumTwo);
    _carsArrayResult = _carsEnumResult.toArray();

    assert.ok(_carsArrayResult.length == 10, "Should return a result with 8 elements.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.union(null, _carsEnumTwo);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null first 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.union(_carsEnumOne, null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null second 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.union(_undefined, _carsEnumTwo);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined first 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.union(_carsEnumOne, _undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined second 'enumerable' argument.");
  });


  QUnit.test("where", (assert) =>
  {
    var _resultArrayBob = TS.Linq.Extensions.where(personEnumerable, (item: any) => item.FirstName == "Bob").toArray();
    var _resultArrayMichael = TS.Linq.Extensions.where(personEnumerable, (item: any) => item.FirstName == "Michael").toArray();
    var _resultArrayEdward = TS.Linq.Extensions.where(personEnumerable, (item: any) => item.FirstName == "Edward").toArray();
    var _allArray = TS.Linq.Extensions.orderBy(personEnumerable, (item: any) => item.FirstName).select((item: any) => item.FirstName).toArray();
    var _undefined;

    assert.ok((_resultArrayBob.length == 1 && _resultArrayMichael.length == 5 && _resultArrayEdward.length == 3 && _allArray.length == 400), "Should return the expected number of items for the executed 'where' causes.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.where(null, (item: any) => item.FirstName != "");
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'enumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Extensions.where(_undefined, (item: any) => item.FirstName != "");
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'enumerable' argument.");
  });

  export interface IOrders
  {
    CustomerID: string;
    EmployeeID: number;
    Freight: number;
    OrderDate: Date;
    OrderID: number;
    RequiredDate: Date;
    ShipAddress: string;
    ShipCity: string;
    ShipCountry: string;
    ShipName: string;
    ShippedDate: Date;
    ShipPostalCode: string;
    ShipRegion: string;
    ShipVia: number;
  }

  export interface ICustomer
  {
    Address: string;
    City: string;
    CompanyName: string;
    ContactName: string;
    ContactTitle: string;
    Country: string;
    CustomerID: string;
    Fax: string;
    Phone: string;
    PostalCode: string;
    Region: string;
  }

  export class Customer implements ICustomer
  {
    constructor(public Address: string = "", public City: string = "", public CompanyName: string = "", public ContactName: string = "", public ContactTitle: string = "", public Country: string = "", public CustomerID: string = "", public Fax: string = "", public Phone: string = "", public PostalCode: string = "", public Region: string = "")
    {
    }

  }

  export interface ICar
  {
    name: string;
    horsePower: number;
    disel: boolean;
    buildYear: number;
    price: number;
  }


  export class Car implements ICar
  {
    constructor(public name: string = "", public horsePower: number = 0, public disel: boolean = false, public buildYear: number = Date.parse("1970-01-01"), public price: number = 0)
    {
    }

  }


  /**
  *  @description
  *    Creates and returns an array containing
  *    5 elements of type 'ICar'. Two of the elements
  *    are also part of the array created by the
  *    function 'CreateCarsArray'. (AUDI, FIAT)
  */
  export function CreateCarsUnionTestArray(): Array<ICar>
  {
    var _resultCarArray: Array<ICar>;

    _resultCarArray = new Array<ICar>();

    _resultCarArray.push(new Car("VOLVO", 220, false, Date.parse("1999-01-01"), 21000));
    _resultCarArray.push(new Car("AUDI", 160, true, Date.parse("2000-09-01"), 15000));
    _resultCarArray.push(new Car("BENTLEY", 350, false, Date.parse("2012-01-01"), 55000));
    _resultCarArray.push(new Car("FIAT", 80, true, Date.parse("1980-12-01"), 1000));
    _resultCarArray.push(new Car("SCODA", 133, true, Date.parse("1999-01-01"), 3333));
    return _resultCarArray;
  }

  /**
  *  @description
  *    Creates and returns an array containing
  *    5 elements of type 'ICar'.
  */
  export function CreateCarsArray(): Array<ICar>
  {
    return new Array<ICar>(
      { name: "BMW", horsePower: 200, disel: false, buildYear: Date.parse("2010-01-01"), price: 22000 },
      { name: "AUDI", horsePower: 160, disel: true, buildYear: Date.parse("2000-09-01"), price: 15000 },
      { name: "VW", horsePower: 120, disel: false, buildYear: Date.parse("1999-04-01"), price: 4000 },
      { name: "FIAT", horsePower: 80, disel: true, buildYear: Date.parse("1980-12-01"), price: 1000 },
      { name: "TRABANT", horsePower: 35, disel: false, buildYear: Date.parse("1977-06-01"), price: 1 }
      );
  }

  export interface ISortTestItem
  {
    color: string;
    number: number;
    location: string;
  }


  /**
  *  @description
  *    Creates and returns an array containing
  *    12 elements of type 'ISortTestItem'.
  */
  export function CreateSortTestArray(): Array<any>
  {
    return new Array(
      { color: "red", number: 1, location: "europe" },
      { color: "blue", number: 3, location: "asia" },
      { color: "red", number: 1, location: "europe" },
      { color: "red", number: 2, location: "america" },
      { color: "blue", number: 2, location: "australia" },
      { color: "red", number: 1, location: "america" },
      { color: "green", number: 1, location: "asia" },
      { color: "red", number: 1, location: "america" },
      { color: "green", number: 3, location: "greenland" },
      { color: "red", number: 3, location: "europe" },
      { color: "blue", number: 1, location: "africa" },
      { color: "red", number: 3, location: "greenland" });
  }

  /**
  *  @description
  *    Creates and returns an array containing
  *    as much random number as defined in 
  *    argument 'number'.
  */
  export function CreateRandomNumberArray(numbers: number)
  {
    var _index: number;
    var _resultArr: Array<number>;

    _resultArr = new Array<number>();

    for (_index = 0; _index < numbers; _index++)
    {
      _resultArr.push(Math.floor(Math.random() * numbers));
    }//END for;

    return _resultArr;
  }

  /**
  *  @description
  *    Creates and returns an array containing
  *    the numbers from 1 to 10.
  */
  export function CreateNumberArray()
  {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }


  /**
  *  @description
  *    Creates and returns an array containing
  *    the worde "one" to "ten".
  */
  export function CreateStringArray()
  {
    return ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
  }
}//END module