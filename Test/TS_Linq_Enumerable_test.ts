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
var getCustomers: () => Array<ICustomer> = Customers.getData;
var getOrders: () => Array<IOrders> = Orders.getData;

var personEnumerable;
var nyEnumerable;
var mmEnumerable;
var customersEnumerable: TS.Linq.Enumerable<ICustomer>;
var ordersEnumerable: TS.Linq.Enumerable<IOrders>;

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
    var _testCarEnumerable: TS.Linq.Enumerable<Car>;
    var _testNumberResult: number;
    var _testStringResult: string;
    var _testCarNumberResult: number;
    var _testCarStringResult: string;
    var _undefined;

    _testNumberEnumerable = TS.Linq.Enumerable.fromArray(CreateNumberArray());
    _testStringEnumerable = TS.Linq.Enumerable.fromArray(CreateStringArray());
    _testCarEnumerable = TS.Linq.Enumerable.fromArray(CreateCarsArray());

    _testNumberResult = _testNumberEnumerable.aggregate((first, second) => first + second);
    assert.equal(_testNumberResult, 55, "should return '55' on TS.Linq.Enumerable<number> .");

    _testStringResult = _testStringEnumerable.aggregate((first, second) => first + ", " + second);
    assert.equal(_testStringResult, "one, two, three, four, five, six, seven, eight, nine, ten", "should return 'one, two, three, four, five, six, seven, eight, nine, ten' on TS.Linq.Enumerable<string> .");

    _testCarNumberResult = _testCarEnumerable.aggregate((first: number, second: Car) => first + second.horsePower, 0);
    assert.equal(_testCarNumberResult, 595, "should return 595 on TS.Linq.Enumerable<Car> with an accumulator function on 'horsePower' and a seed value of '0'.");

    _testCarStringResult = _testCarEnumerable.aggregate((first: string, second: Car) => first + second.name, "");
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

    _testResult = TS.Linq.Enumerable.fromArray(CreateStringArray()).all((item) => item.length >= 3);
    assert.ok(_testResult, "Should return true on a predicate that should pass.");

    _testResult = TS.Linq.Extensions.fromArray(CreateStringArray()).all((item) => item.length > 4);
    assert.ok(!_testResult, "Should return false on a predicate that shouldn't pass.");

    assert.throws(() =>
    {
      TS.Linq.Enumerable.fromArray(CreateStringArray()).all(null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'predicate' argument.");


    assert.throws(() =>
    {
      TS.Linq.Enumerable.fromArray(CreateStringArray()).all(_undefined);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'predicate' argument.");

  });


  QUnit.test("any", (assert) => 
  {
    var _testResult: boolean;
    var _undefined;

    assert.equal(TS.Linq.Enumerable.fromArray([]).any((item) => true), false, "Should return false on an empty 'enumerable'.");

    _testResult = TS.Linq.Enumerable.fromArray(CreateStringArray()).any((item) => item.length >= 3);
    assert.ok(_testResult, "Should return true on a predicate that should pass.");

    _testResult = TS.Linq.Enumerable.fromArray(CreateStringArray()).any((item) => item.length < 2);
    assert.ok(!_testResult, "Should return false on a predicate that shouldn't pass.");

    _testResult = TS.Linq.Enumerable.fromArray(CreateStringArray()).any();
    assert.ok(_testResult, "Should return true on a none empty 'enumerable' without predicate.");

    _testResult = TS.Linq.Enumerable.fromArray([]).any();
    assert.ok(!_testResult, "Should return false on an empty 'enumerable' without predicate.");

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

    _testNumberResult = TS.Linq.Enumerable.fromArray(CreateNumberArray()).concat(TS.Linq.Enumerable.fromArray(CreateNumberArray()));
    _resultNumberArray = _testNumberResult.toArray();
    assert.deepEqual(_resultNumberArray, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "Should return concatenation of two 'Enumerable<number>'.");

    _testStringResult = TS.Linq.Enumerable.fromArray(CreateStringArray()).concat(TS.Linq.Enumerable.fromArray(CreateStringArray()));
    _resultStringArray = _testStringResult.toArray();
    assert.deepEqual(_resultStringArray, ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"], "Should return concatenation of two 'Enumerable<string>'.");

    assert.throws(() =>
    {
      TS.Linq.Enumerable.fromArray(CreateStringArray()).concat(null);
    }, (err) => ((err.name == "TS.ArgumentNullOrUndefinedException") ? true : false), "Should throw a 'TS.ArgumentNullOrUndefinedException' for an null 'secondEnumerable' argument.");

    assert.throws(() =>
    {
      TS.Linq.Enumerable.fromArray(CreateStringArray()).concat(_undefined);
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

    _testResult = TS.Linq.Enumerable.fromArray(CreateNumberArray()).contains(5);
    assert.ok(_testResult, "Should return true on a  lookup for an element in 'Enumerable<number>'.");

    _testResult = TS.Linq.Enumerable.fromArray(CreateNumberArray()).contains(11);
    assert.ok(!_testResult, "Should return false on a lookup for a none existing element in 'Enumerable<number>'.");

    _testResult = TS.Linq.Enumerable.fromArray(CreateStringArray()).contains("five");
    assert.ok(_testResult, "Should return true on a lookup for an element in 'Enumerable<string>'.");

    _testResult = TS.Linq.Enumerable.fromArray(CreateStringArray()).contains("eleven");
    assert.ok(!_testResult, "Should return false on a lookup for a none existing element in 'Enumerable<string>'.");

    _testResult = _testEmptyEnumerable.contains(123);
    assert.ok(!_testResult, "Should return false on a lookup in an empty enumerable.");

    _testResult = TS.Linq.Enumerable.fromArray(CreateCarsArray()).contains(CreateCarsArray()[3], (first, second) => first.name == second.name);
    assert.ok(_testResult, "Should return true on a lookup for an element in 'Enumerable<Car>' with an equalityComparer.");

    _testResult = TS.Linq.Enumerable.fromArray(CreateCarsArray()).contains(_testCar, (first, second) => first.name == second.name);
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
    var _testCarEnumerable: TS.Linq.Enumerable<Car>;
    var _undefined;

    _testNumberEnumerable = TS.Linq.Enumerable.fromArray(CreateNumberArray());
    _testStringEnumerable = TS.Linq.Enumerable.fromArray(CreateStringArray());
    _testCarEnumerable = TS.Linq.Enumerable.fromArray(CreateCarsArray());

    assert.equal(_testNumberEnumerable.count(), 10, "Should count 10 numbers out of 10.");
    assert.equal(_testNumberEnumerable.count((item) => item > 5), 5, "Should count 5 numbers greater 5 out of 10.");
    assert.equal(TS.Linq.Extensions.empty().count(), 0, "Should counted 0 on an empty enumerable.");
    assert.equal(TS.Linq.Extensions.count(_testStringEnumerable, (item) => item.indexOf("e") > -1), 7, "Should count 7 elements with character 'e' in an 'Enumerable<string>' using a predicate.");
    assert.equal(TS.Linq.Extensions.count(_testCarEnumerable, (item) => item.horsePower > 100), 3, "Should count 4 elements with horsePower greater 100 in an 'Enumerable<Car>' using a predicate.");

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


  export interface IStorage
  {
    Room: string;
    Rack: number;
    Shelf: number;
    Sector: number;
    Place: number;
    Amount: number;
    Unit: string;
  }


  export interface IProduct
  {
    ID: number;
    Name: string;
    Price: number;
    Currency: string;
    Storage: IStorage;
  }


  export function CreateProductArray() 
  {
    var _productArray: Array<IProduct>;
    var _product: IProduct;

    _productArray = new Array<IProduct>();
    _product = { ID: 1234, Name: "Nexus 1530", Price: 250.0, Currency: "Euro", Storage: { Room: "STR 001", Rack: 25, Shelf: 13, Sector: 8, Place: 44, Amount: 15, Unit: "Piece" } };
    _productArray.push(_product);
    _product = { ID: 2345, Name: "Hair Dryer", Price: 20.0, Currency: "$", Storage: { Room: "STR 001", Rack: 20, Shelf: 44, Sector: 12, Place: 8, Amount: 200, Unit: "Piece" } };
    _productArray.push(_product);
    _product = { ID: 3456, Name: "Digital Clock", Price: 5.0, Currency: "YEN", Storage: { Room: "STR 001", Rack: 20, Shelf: 45, Sector: 4, Place: 1, Amount: 2000, Unit: "Piece" } };
    _productArray.push(_product);
    _product = { ID: 4567, Name: "Wrench", Price: 4.30, Currency: "£", Storage: { Room: "STR 002", Rack: 4, Shelf: 1, Sector: 1, Place: 5, Amount: 400, Unit: "Piece" } };
    _productArray.push(_product);
    _product = { ID: 5678, Name: "Screw Driver", Price: 5.20, Currency: "¥", Storage: { Room: "STR 002", Rack: 4, Shelf: 1, Sector: 1, Place: 6, Amount: 400, Unit: "Piece" } };
    _productArray.push(_product);
    _product = { ID: 6789, Name: "Nuts", Price: 0.04, Currency: "€", Storage: { Room: "STR 002", Rack: 4, Shelf: 1, Sector: 1, Place: 7, Amount: 5000, Unit: "Piece" } };
    _productArray.push(_product);
    _product = { ID: 7890, Name: "Shim", Price: 0.01, Currency: "GBP", Storage: { Room: "STR 002", Rack: 4, Shelf: 1, Sector: 1, Place: 8, Amount: 50000, Unit: "Piece" } };
    _productArray.push(_product);
    _product = { ID: 8901, Name: "Nail", Price: 0.01, Currency: "EUR", Storage: { Room: "STR 002", Rack: 4, Shelf: 1, Sector: 1, Place: 8, Amount: 50000, Unit: "Piece" } };
    _productArray.push(_product);
    _product = { ID: 9012, Name: "Glue", Price: 4.0, Currency: "$", Storage: { Room: "STR 002", Rack: 5, Shelf: 2, Sector: 7, Place: 10, Amount: 500, Unit: "Litre" } };
    _productArray.push(_product);
    _product = { ID: 9013, Name: "Cast", Price: 5.0, Currency: "€", Storage: { Room: "STR 002", Rack: 5, Shelf: 2, Sector: 7, Place: 11, Amount: 1500, Unit: "Kilo" } };
    _productArray.push(_product);
    _product = { ID: 2222, Name: "Grain", Price: 0.5, Currency: "EURO", Storage: { Room: "STR 003", Rack: 1, Shelf: 1, Sector: 1, Place: 1, Amount: 1000, Unit: "Kilo" } };
    _productArray.push(_product);
    _product = { ID: 3333, Name: "Meet", Price: 5.0, Currency: "¥", Storage: { Room: "STR 003", Rack: 1, Shelf: 1, Sector: 1, Place: 2, Amount: 2000, Unit: "Kilo" } };
    _productArray.push(_product);
    _product = { ID: 4444, Name: "Fish", Price: 6.0, Currency: "£", Storage: { Room: "STR 003", Rack: 1, Shelf: 1, Sector: 1, Place: 3, Amount: 3000, Unit: "Kilo" } };
    _productArray.push(_product);
    _product = { ID: 5555, Name: "Vegetables", Price: 3.0, Currency: "YEN", Storage: { Room: "STR 003", Rack: 1, Shelf: 1, Sector: 1, Place: 4, Amount: 4000, Unit: "Kilo" } };
    _productArray.push(_product);

    return _productArray;
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