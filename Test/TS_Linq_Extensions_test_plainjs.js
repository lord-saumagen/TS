var TS_Linq_Extensions_test;
(function (TS_Linq_Extensions_test)
{

  QUnit.test("aggregate", function (assert)
  {
    assert.throws(function ()
    {
      TS.Linq.Extensions.aggregate(TS.Linq.Enumerable.fromArray(TS_Linq_Extensions_test.CreateStringArray()), new TS_Linq_Extensions_test.Car(), null);
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'accumulator' argument type.");

  });


  QUnit.test("all", function (assert)
  {

    assert.throws(function ()
    {
      TS.Linq.Extensions.all(TS.Linq.Enumerable.fromArray(TS_Linq_Extensions_test.CreateStringArray()), {});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'predicate' argument type.");

  });


  QUnit.test("any", function (assert)
  {

    assert.throws(function ()
    {
      TS.Linq.Extensions.any(TS.Linq.Enumerable.fromArray(TS_Linq_Extensions_test.CreateStringArray()), {});
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
      TS.Linq.Extensions.concat({}, TS.Linq.Enumerable.fromArray(TS_Linq_Extensions_test.CreateStringArray()));
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'firstEnumerable' argument type.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.concat(TS.Linq.Enumerable.fromArray(TS_Linq_Extensions_test.CreateStringArray()), {});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'secondEnumerable' argument type.");

  });


  QUnit.test("contains", function (assert)
  {
    assert.throws(function ()
    {
      TS.Linq.Extensions.contains(TS.Linq.Enumerable.fromArray(TS_Linq_Extensions_test.CreateStringArray()), "NOP", {});
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
      TS.Linq.Extensions.count(TS.Linq.Enumerable.fromArray(TS_Linq_Extensions_test.CreateStringArray()), new TS_Linq_Extensions_test.Car());
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

    _testInputCarEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_Extensions_test.CreateCarsArray());

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

    _testInputCarEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_Extensions_test.CreateCarsArray());

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

    _testInputCarEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_Extensions_test.CreateCarsArray());

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

    _testInputCarEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_Extensions_test.CreateCarsArray());

    assert.throws(function ()
    {
      TS.Linq.Extensions.elementAtOrDefault({}, 2, TS_Linq_Extensions_test.Car);
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'enumerable' argument type.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.elementAtOrDefault(_testInputCarEnumerable, "2", TS_Linq_Extensions_test.Car);
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

    _testInputCarEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_Extensions_test.CreateCarsArray());

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

    _testInputCarEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_Extensions_test.CreateCarsArray());

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

    _testInputCarEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_Extensions_test.CreateCarsArray());

    _testResultCar = TS.Linq.Extensions.firstOrDefault(_testInputCarEnumerable, TS_Linq_Extensions_test.Car, function (item) { return item.NOP == "NOP" });
    assert.deepEqual(_testResultCar, new TS_Linq_Extensions_test.Car(), "Should return a default object if the predicate is erroneous.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.firstOrDefault({}, TS_Linq_Extensions_test.Car, function (item) { return true; });
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
      TS.Linq.Extensions.firstOrDefault(_testInputCarEnumerable, TS_Linq_Extensions_test.Car, {});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'predicate' argument type.");

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

    _testInputCarEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_Extensions_test.CreateCarsArray());

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

    _testInputCarEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_Extensions_test.CreateCarsArray());

    _testResultCar = TS.Linq.Extensions.lastOrDefault(_testInputCarEnumerable, TS_Linq_Extensions_test.Car, function (item) { return item.NOP == "NOP" });
    assert.deepEqual(_testResultCar, new TS_Linq_Extensions_test.Car(), "Should return a default object if the predicate is erroneous.");

    assert.throws(function ()
    {
      TS.Linq.Extensions.lastOrDefault({}, TS_Linq_Extensions_test.Car, function (item) { return true; });
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
      TS.Linq.Extensions.lastOrDefault(_testInputCarEnumerable, TS_Linq_Extensions_test.Car, {});
    }, function (err)
    {
      return (err.name == "TS.InvalidTypeException") ? true : false;
    }, "Should throw a 'TS.InvalidTypeException' for an invalid 'predicate' argument type.");
  });

  QUnit.test("orderBy", function (assert)
  {
    var _testInputCarEnumerable;
    var _testResultCar;

    _testInputCarEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_Extensions_test.CreateCarsArray());

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

    _carsEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_Extensions_test.CreateCarsArray());

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

    _carsEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_Extensions_test.CreateCarsArray());

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


  QUnit.test("skip", function (assert)
  {
    var _carsEnumerable;

    _carsEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_Extensions_test.CreateCarsArray());

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

    _carsEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_Extensions_test.CreateCarsArray());

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

    _carsEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_Extensions_test.CreateCarsArray());

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

    _carsEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_Extensions_test.CreateCarsArray());

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

    _sortTestEnumerable = TS.Linq.Enumerable.fromArray(TS_Linq_Extensions_test.CreateSortTestArray());
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

    _sortTestEnumerable = TS.Linq.Enumerable.fromArray(TS_Linq_Extensions_test.CreateSortTestArray());
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

    _carsEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_Extensions_test.CreateCarsArray());

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

    _carsEnumerable = TS.Linq.Extensions.fromArray(TS_Linq_Extensions_test.CreateCarsArray());

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
