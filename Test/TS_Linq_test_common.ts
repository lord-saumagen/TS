module TS_Linq_test_common
{
  "use strict";

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
  export function CreateCarsUnionTestArray(): Array<Car>
  {
    var _resultCarArray: Array<Car>;

    _resultCarArray = new Array<Car>();

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
  export function CreateCarsArray(): Array<Car>
  {
    return new Array<Car>(
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
    _product = { ID: 3333, Name: "Meat", Price: 5.0, Currency: "¥", Storage: { Room: "STR 003", Rack: 1, Shelf: 1, Sector: 1, Place: 2, Amount: 2000, Unit: "Kilo" } };
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

}