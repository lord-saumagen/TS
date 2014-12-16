
"use strict";
var TS_Linq_Extensions_test;
(function (TS_Linq_Extensions_test)
{

  QUnit.test("aggregate", function (assert)
  {
    assert.throws(function ()
    {
      TS.Linq.Extensions.aggregate(TS.Linq.Enumerable.fromArray(TS_Linq_test_common.CreateStringArray()), new TS_Linq_test_common.Car(), null);
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'accumulator' argument type.");

  });


  QUnit.test("all", function (assert)
  {

    assert.throws(function ()
    {
      TS.Linq.Extensions.all(TS.Linq.Enumerable.fromArray(TS_Linq_test_common.CreateStringArray()), {});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'predicate' argument type.");

  });


  QUnit.test("any", function (assert)
  {

    assert.throws(function ()
    {
      TS.Linq.Extensions.any(TS.Linq.Enumerable.fromArray(TS_Linq_test_common.CreateStringArray()), {});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'predicate' argument type.");

  });


  QUnit.test("average", function (assert)
  {

    assert.throws(function ()
    {
      TS.Linq.Extensions.sum({});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'enumerable' argument type.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.sum(TS.Linq.Enumerable.fromArray([1, 2, 3, {}, ""]), {});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'enumerable' argument type.");

  });


  QUnit.test("concat", function (assert)
  {
    assert.throws(function ()
    {
      TS.Linq.Extensions.concat({}, TS.Linq.Enumerable.fromArray(TS_Linq_test_common.CreateStringArray()));
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'firstEnumerable' argument type.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.concat(TS.Linq.Enumerable.fromArray(TS_Linq_test_common.CreateStringArray()), {});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'secondEnumerable' argument type.");

  });


  QUnit.test("contains", function (assert)
  {
    assert.throws(function ()
    {
      TS.Linq.Extensions.contains(TS.Linq.Enumerable.fromArray(TS_Linq_test_common.CreateStringArray()), "NOP", {});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'equalityComparer' argument type.");

  });


  QUnit.test("count", function (assert)
  {
    assert.throws(function ()
    {
      TS.Linq.Extensions.count({}, function (item) { return true; });
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'enumerable' argument type.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.count(TS.Linq.Enumerable.fromArray(TS_Linq_test_common.CreateStringArray()), new TS_Linq_test_common.Car());
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'predicate' argument type.");

  });


  QUnit.test("cycle", function (assert)
  {
    assert.throws(function ()
    {
      TS.Linq.Extensions.cycle({});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'enumerable' argument type.");

  });


  QUnit.test("defaultIfEmpty", function (assert)
  {
    var _testInputCarEnumerable;
    var _testResultCar;

    _testInputCarEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateCarsArray());

    assert.throws(function ()
    {
      TS.Linq.Extensions.defaultIfEmpty({}, "Five");
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'enumerable' argument type.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.defaultIfEmpty(_testInputCarEnumerable, "Five");
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'defaultConstructor' argument type.");

  });


  QUnit.test("distinct", function (assert)
  {
    var _testInputCarEnumerable;
    var _testResultCar;

    _testInputCarEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateCarsArray());

    assert.throws(function ()
    {
      TS.Linq.Extensions.distinct({});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'enumerable' argument type.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.distinct(_testInputCarEnumerable, "Five");
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'equalityComparer' argument type.");

  });


  QUnit.test("elementAt", function (assert)
  {
    var _testInputCarEnumerable;
    var _testResultCar;

    _testInputCarEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateCarsArray());

    assert.throws(function ()
    {
      TS.Linq.Extensions.elementAt({}, "Five");
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'enumerable' argument type.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.elementAt(_testInputCarEnumerable, "Five");
    }, function (err)
    {
      return (err.name == "TS.ArgumentOutOfRangeException") ? true : false;
    }, "Should throw a 'TS.ArgumentOutOfRangeException' for an invalid 'index' argument type.");

  });


  QUnit.test("elementAtOrDefault", function (assert)
  {
    var _testInputCarEnumerable;

    _testInputCarEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateCarsArray());

    assert.throws(function ()
    {
      TS.Linq.Extensions.elementAtOrDefault({}, 2, TS_Linq_test_common.Car);
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'enumerable' argument type.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.elementAtOrDefault(_testInputCarEnumerable, "2", TS_Linq_test_common.Car);
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'index' argument type.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.elementAtOrDefault(_testInputCarEnumerable, 2, "NOP");
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'defaultConstructor' argument type.");

  });


  QUnit.test("except", function (assert)
  {
    var _testInputCarEnumerable;
    var _testResultCar;

    _testInputCarEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateCarsArray());

    assert.throws(function ()
    {
      TS.Linq.Extensions.except({}, _testInputCarEnumerable);
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'firstEnumerable' argument type.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.except(_testInputCarEnumerable, {});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'secondEnumerable' argument type.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.except(_testInputCarEnumerable, _testInputCarEnumerable, {});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'equalityComparer' argument type.");

  });


  QUnit.test("first", function (assert)
  {
    var _testInputCarEnumerable;
    var _testResultCar;

    _testInputCarEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateCarsArray());

    assert.throws(function ()
    {
      TS.Linq.Extensions.first({}, function (item) { return true; });
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'enumerable' argument type.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.first(_testInputCarEnumerable, {});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'predicate' argument type.");

  });


  QUnit.test("firstOrDefault", function (assert)
  {
    var _testInputCarEnumerable;
    var _testResultCar;

    _testInputCarEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateCarsArray());

    _testResultCar = TS.Linq.Extensions.firstOrDefault(_testInputCarEnumerable, TS_Linq_test_common.Car, function (item) { return item.NOP == "NOP" });
    assert.deepEqual(_testResultCar, new TS_Linq_test_common.Car(), "Should return a default object if the predicate is erroneous.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.firstOrDefault({}, TS_Linq_test_common.Car, function (item) { return true; });
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'enumerable' argument type.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.firstOrDefault(_testInputCarEnumerable, {}, function (item) { return true; });
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'defaultConstructor' argument type.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.firstOrDefault(_testInputCarEnumerable, TS_Linq_test_common.Car, {});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'predicate' argument type.");

  });


  QUnit.test("forEach", function (assert)
  {
    var _emptyEnum = TS.Linq.Extensions.empty();

    assert.throws(function ()
    {
      TS.Linq.Extensions.forEach({}, function (item) { });
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for for an invalid 'enumerable' argument.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.forEach(_emptyEnum, { });
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for for an invalid 'enumerable' argument.");

  });


  QUnit.test("fromArray", function (assert)
  {
    assert.throws(function ()
    {
      TS.Linq.Extensions.fromArray({});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for for an invalid 'sourceArray' argument.");

  });


  QUnit.test("groupBy", function (assert)
  {
    var _productEnumerable

    _productEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateProductArray());

    assert.throws(function ()
    {
      TS.Linq.Extensions.groupBy({}, function (Item) { return Item.Currency })
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'enumerable' argument.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.groupBy(_productEnumerable, {})
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'keySelector' argument.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.groupBy(_productEnumerable, function (Item) { return Item.Currency }, {})
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'equalityComparer' argument.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.groupBy(_productEnumerable, function (Item) { return Item.Currency }, function (first, second) { return first === second; }, {})
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'elementOrResultSelector' argument.");

  });


  QUnit.test("groupJoin", function (assert)
  {
    var _customersEnumerable;
    var _ordersEnumerable;
    var _undefined;

    _customersEnumerable = TS.Linq.Extensions.fromArray(Customers.getData());
    _ordersEnumerable = TS.Linq.Extensions.fromArray(Orders.getData());

    assert.throws(function ()
    {
      TS.Linq.Extensions.groupJoin(null, _ordersEnumerable, function (outerItem) { return outerItem.CustomerID; }, function (innerItem) { return innerItem.CustomerID; }, function (outerItem, group) { return { Customer: outerItem, OrderGroup: group }; });
    }, function (err)
    {
      return (err.name == "TS.ArgumentNullOrUndefinedException") ? true : false;
    }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'outerEnumerable' argument.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.groupJoin(_undefined, _ordersEnumerable, function (outerItem) { return outerItem.CustomerID; }, function (innerItem) { return innerItem.CustomerID; }, function (outerItem, group) { return { Customer: outerItem, OrderGroup: group }; });
    }, function (err)
    {
      return (err.name == "TS.ArgumentNullOrUndefinedException") ? true : false;
    }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'outerEnumerable' argument.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.groupJoin({}, _ordersEnumerable, function (outerItem) { return outerItem.CustomerID; }, function (innerItem) { return innerItem.CustomerID; }, function (outerItem, group) { return { Customer: outerItem, OrderGroup: group }; });
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'outerEnumerable' argument.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.groupJoin(_customersEnumerable, null, function (outerItem) { return outerItem.CustomerID; }, function (innerItem) { return innerItem.CustomerID; }, function (outerItem, group) { return { Customer: outerItem, OrderGroup: group }; });
    }, function (err)
    {
      return (err.name == "TS.ArgumentNullOrUndefinedException") ? true : false;
    }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'innerEnumerable' argument.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.groupJoin(_customersEnumerable, _undefined, function (outerItem) { return outerItem.CustomerID; }, function (innerItem) { return innerItem.CustomerID; }, function (outerItem, group) { return { Customer: outerItem, OrderGroup: group }; });
    }, function (err)
    {
      return (err.name == "TS.ArgumentNullOrUndefinedException") ? true : false;
    }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'innerEnumerable' argument.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.groupJoin(_customersEnumerable, {}, function (outerItem) { return outerItem.CustomerID; }, function (innerItem) { return innerItem.CustomerID; }, function (outerItem, group) { return { Customer: outerItem, OrderGroup: group }; });
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'innerEnumerable' argument.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.groupJoin(_customersEnumerable, _ordersEnumerable, {}, function (innerItem) { return innerItem.CustomerID; }, function (outerItem, group) { return { Customer: outerItem, OrderGroup: group }; });
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'outerKeySelector' argument.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.groupJoin(_customersEnumerable, _ordersEnumerable, function (outerItem) { return outerItem.CustomerID; }, {}, function (outerItem, group) { return { Customer: outerItem, OrderGroup: group }; });
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'innerKeySelector' argument.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.groupJoin(_customersEnumerable, _ordersEnumerable, function (outerItem) { return outerItem.CustomerID; }, function (innerItem) { return innerItem.CustomerID; }, {});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'resultSelector' argument.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.groupJoin(_customersEnumerable, _ordersEnumerable, function (outerItem) { return outerItem.CustomerID; }, function (innerItem) { return innerItem.CustomerID; }, function (outerItem, group) { return { Customer: outerItem, OrderGroup: group }; }, {});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'equalityComparer' argument.");
  });


  QUnit.test("intersect", function (assert)
  {

    assert.throws(function ()
    {
      TS.Linq.Extensions.intersect({}, TS.Linq.Extensions.empty());
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for a invalid 'firstEnumerable' argument.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.intersect(TS.Linq.Extensions.empty(), {});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for a invalid 'secondEnumerable' argument.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.intersect(TS.Linq.Extensions.empty(), TS.Linq.Extensions.empty(), {});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for a invalid 'equalityComparer' argument.");

  });


  QUnit.test("join", function (assert)
  {
    var _customersEnumerable;
    var _ordersEnumerable;
    var _undefined;

    _customersEnumerable = TS.Linq.Extensions.fromArray(Customers.getData());
    _ordersEnumerable = TS.Linq.Extensions.fromArray(Orders.getData());

    assert.throws(function ()
    {
      TS.Linq.Extensions.join(null, _ordersEnumerable, function (outerItem) { return outerItem.CustomerID; }, function (innerItem) { return innerItem.CustomerID; }, function (outerItem, innerItem) { return { CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }; });
    }, function (err)
    {
      return (err.name == "TS.ArgumentNullOrUndefinedException") ? true : false;
    }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'outerEnumerable' argument.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.join(_undefined, _ordersEnumerable, function (outerItem) { return outerItem.CustomerID; }, function (innerItem) { return innerItem.CustomerID; }, function (outerItem, innerItem) { return { CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }; });
    }, function (err)
    {
      return (err.name == "TS.ArgumentNullOrUndefinedException") ? true : false;
    }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'outerEnumerable' argument.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.join({}, _ordersEnumerable, function (outerItem) { return outerItem.CustomerID; }, function (innerItem) { return innerItem.CustomerID; }, function (outerItem, innerItem) { return { CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }; });
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'outerEnumerable' argument.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.join(_customersEnumerable, null, function (outerItem) { return outerItem.CustomerID; }, function (innerItem) { return innerItem.CustomerID; }, function (outerItem, innerItem) { return { CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }; });
    }, function (err)
    {
      return (err.name == "TS.ArgumentNullOrUndefinedException") ? true : false;
    }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for a null 'innerEnumerable' argument.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.join(_customersEnumerable, _undefined, function (outerItem) { return outerItem.CustomerID; }, function (innerItem) { return innerItem.CustomerID; }, function (outerItem, innerItem) { return { CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }; });
    }, function (err)
    {
      return (err.name == "TS.ArgumentNullOrUndefinedException") ? true : false;
    }, "Should throw a 'TS.ArgumentNullOrUndefinedException' for an undefined 'innerEnumerable' argument.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.join(_customersEnumerable, {}, function (outerItem) { return outerItem.CustomerID; }, function (innerItem) { return innerItem.CustomerID; }, function (outerItem, innerItem) { return { CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }; });
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'innerEnumerable' argument.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.join(_customersEnumerable, _ordersEnumerable, {}, function (innerItem) { return innerItem.CustomerID; }, function (outerItem, innerItem) { return { CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }; });
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'outerKeySelector' argument.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.join(_customersEnumerable, _ordersEnumerable, function (outerItem) { return outerItem.CustomerID; }, {}, function (outerItem, innerItem) { return { CustID: outerItem.CustomerID, CustName: outerItem.ContactName, OrdID: innerItem.OrderID, OrdDate: innerItem.OrderDate, OrdRequDate: innerItem.RequiredDate, OrdShippingCountry: innerItem.ShipCountry }; });
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'innerKeySelector' argument.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.join(_customersEnumerable, _ordersEnumerable, function (outerItem) { return outerItem.CustomerID; }, function (innerItem) { return innerItem.CustomerID; }, {});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'resultSelector' argument.");
  });


  QUnit.test("last", function (assert)
  {
    var _testInputCarEnumerable;
    var _testResultCar;

    _testInputCarEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateCarsArray());

    assert.throws(function ()
    {
      TS.Linq.Extensions.last({}, function (item) { return true; });
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'enumerable' argument type.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.last(_testInputCarEnumerable, {});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'predicate' argument type.");

  });


  QUnit.test("lastOrDefault", function (assert)
  {
    var _testInputCarEnumerable;
    var _testResultCar;

    _testInputCarEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateCarsArray());

    _testResultCar = TS.Linq.Extensions.lastOrDefault(_testInputCarEnumerable, TS_Linq_test_common.Car, function (item) { return item.NOP == "NOP" });
    assert.deepEqual(_testResultCar, new TS_Linq_test_common.Car(), "Should return a default object if the predicate is erroneous.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.lastOrDefault({}, TS_Linq_test_common.Car, function (item) { return true; });
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'enumerable' argument type.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.lastOrDefault(_testInputCarEnumerable, {}, function (item) { return true; });
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'defaultConstructor' argument type.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.lastOrDefault(_testInputCarEnumerable, TS_Linq_test_common.Car, {});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'predicate' argument type.");
  });


  QUnit.test("max", function (assert)
  {
    var _stringEnumerable;

    _stringEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateStringArray());

    assert.throws(function ()
    {
      TS.Linq.Extensions.max({});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'enumerable' argument type.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.max(_stringEnumerable);
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an an 'enumerable' argument which is not of type 'Enumerable<number>'.");

  });


  QUnit.test("min", function (assert)
  {
    var _stringEnumerable;

    _stringEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateStringArray());

    assert.throws(function ()
    {
      TS.Linq.Extensions.min({});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'enumerable' argument type.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.min(_stringEnumerable);
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an an 'enumerable' argument which is not of type 'Enumerable<number>'.");

  });


  QUnit.test("orderBy", function (assert)
  {
    var _testInputCarEnumerable;
    var _testResultCar;

    _testInputCarEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateCarsArray());

    assert.throws(function ()
    {
      TS.Linq.Extensions.orderBy({}, function (item) { return item; }, function (first, second) { return first == second; });
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'enumerable' argument type.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.orderBy(_testInputCarEnumerable, {}, function (first, second) { return first == second; });
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'selector' argument type.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.orderBy(_testInputCarEnumerable, function (item) { return item; }, {});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'comparer' argument type.");

  });


  QUnit.test("orderByDescending", function (assert)
  {
    var _testInputCarEnumerable;
    var _testResultCar;

    _testInputCarEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateCarsArray());

    assert.throws(function ()
    {
      TS.Linq.Extensions.orderByDescending({}, function (item) { return item; }, function (first, second) { return first == second; });
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'enumerable' argument type.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.orderByDescending(_testInputCarEnumerable, {}, function (first, second) { return first == second; });
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'selector' argument type.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.orderByDescending(_testInputCarEnumerable, function (item) { return item; }, {});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'comparer' argument type.");

  });


  QUnit.test("range", function (assert)
  {
    assert.throws(function ()
    {
      TS.Linq.Extensions.range({}, 5);
    },function(err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should trhow a 'TS.InvalidTypeException' for an invalid 'start' argument type.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.range(12, {});
    },function(err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should trhow a 'TS.InvalidTypeException' for an invalid 'count' argument type.");
  });


  QUnit.test("repeat", function (assert)
  {

    assert.throws(function ()
    {
      TS.Linq.Extensions.repeat("NOP", {});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'count' argument type.");

  });


  QUnit.test("reverse", function (assert)
  {

    assert.throws(function ()
    {
      TS.Linq.Extensions.reverse("NOP");
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'enumerable' argument type.");

  });


  QUnit.test("select", function (assert)
  {
    var _carsEnumerable;
    var _resultArray;

    _carsEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateCarsArray());

    assert.throws(function ()
    {
      _resultArray = TS.Linq.Extensions.select({}, function (item) { return item; }).toArray();
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'enumerable' argument type.");

    assert.throws(function ()
    {
      _resultArray = TS.Linq.Extensions.select(_carsEnumerable, false).toArray();
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'selector' argument type.");

  });


  QUnit.test("selectMany", function (assert)
  {
    var _carsEnumerable;
    var _resultArray;

    _carsEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateCarsArray());

    assert.throws(function ()
    {
      _resultArray = TS.Linq.Extensions.selectMany({}, function (item) { return item.subitem; }).toArray();
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'enumerable' argument type.");

    assert.throws(function ()
    {
      _resultArray = TS.Linq.Extensions.selectMany(_carsEnumerable, false).toArray();
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'selector' argument type.");

  });


  QUnit.test("sequenceEqual", function (assert)
  {
    var _numberEnumerable;

    _numberEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateNumberArray())
    assert.throws(function ()
    {
      TS.Linq.Extensions.sequenceEqual({}, _numberEnumerable);
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'firstEnumerable' argument type.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.sequenceEqual(_numberEnumerable, {});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'secondEnumerable' argument type.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.sequenceEqual(_numberEnumerable, _numberEnumerable, {});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'equalityComparer' argument type.");

  });


  QUnit.test("skip", function (assert)
  {
    var _carsEnumerable;

    _carsEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateCarsArray());

    assert.throws(function ()
    {
      TS.Linq.Extensions.skip({}, 50);
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'enumerable' argument type.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.skip(_carsEnumerable, {});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'count' argument type.");

  });


  QUnit.test("skipWhile", function (assert)
  {
    var _carsEnumerable;

    _carsEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateCarsArray());

    assert.throws(function ()
    {
      TS.Linq.Extensions.skipWhile({}, function (item) { return item.name != "VW"; });
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'enumerable' argument type.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.skipWhile(_carsEnumerable, {});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'predicate' argument type.");

  });


  QUnit.test("sum", function (assert)
  {

    assert.throws(function ()
    {
      TS.Linq.Extensions.sum({});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'enumerable' argument type.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.sum(TS.Linq.Enumerable.fromArray([1,2,3,{},""]), {});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'enumerable' argument type.");

  });


  QUnit.test("take", function (assert)
  {
    var _carsEnumerable;

    _carsEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateCarsArray());

    assert.throws(function ()
    {
      TS.Linq.Extensions.take({}, 50);
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'enumerable' argument type.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.take(_carsEnumerable, {});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'count' argument type.");

  });


  QUnit.test("takeWhile", function (assert)
  {
    var _carsEnumerable;

    _carsEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateCarsArray());

    assert.throws(function ()
    {
      TS.Linq.Extensions.takeWhile(_carsEnumerable, "NOP");
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'predicate' argument type.");

  });


  QUnit.test("thenBy", function (assert)
  {
    var _sortTestEnumerable;
    var _orderedEnumerable;
    var _undefined;

    _sortTestEnumerable = TS.Linq.Enumerable.fromArray(TS_Linq_test_common.CreateSortTestArray());
    _orderedEnumerable = _sortTestEnumerable.orderBy(function (item) { return item.color; });

    assert.throws(function ()
    {
      TS.Linq.Extensions.thenBy(_orderedEnumerable, "NOP");
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'selector' argument type.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.thenBy(_orderedEnumerable, function (item) { return item; }, "NOP");
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'comparer' argument type.");

  });


  QUnit.test("thenByDescending", function (assert)
  {
    var _sortTestEnumerable;
    var _orderedEnumerable;
    var _undefined;

    _sortTestEnumerable = TS.Linq.Enumerable.fromArray(TS_Linq_test_common.CreateSortTestArray());
    _orderedEnumerable = _sortTestEnumerable.orderBy(function (item) { return item.color; });

    assert.throws(function ()
    {
      TS.Linq.Extensions.thenByDescending(_orderedEnumerable, "NOP");
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'selector' argument type.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.thenByDescending(_orderedEnumerable, function (item) { return item; }, "NOP");
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'comparer' argument type.");

  });


  QUnit.test("union", function (assert)
  {
    var _carsEnumerable;

    _carsEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateCarsArray());

    assert.throws(function ()
    {
      TS.Linq.Extensions.union({}, _carsEnumerable);
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'firstEnumerable' argument type.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.union(_carsEnumerable, {});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'secondEnumerable' argument type.");

  });


  QUnit.test("where", function (assert)
  {
    var _carsEnumerable;

    _carsEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_test_common.CreateCarsArray());

    assert.throws(function ()
    {
      TS.Linq.Extensions.where({}, function (item) { return item.name != "VW"; });
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'enumerable' argument type.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.where(_carsEnumerable, {});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'predicate' argument type.");

  });


})(TS_Linq_Extensions_test || (TS_Linq_Extensions_test = {})); //END module
