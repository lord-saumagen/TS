module TS
{
  "use strict";

  export module Linq
  {
    export module Extensions
    {

      // -------------------------------------
      // LINQ Extensions
      // http://msdn.microsoft.com/en-us/library/bb397896.aspx (Standard query operators)
      // http://msdn.microsoft.com/en-us/library/bb882641.aspx (Classification of Standard Query Operators by Manner of Execution)
      // http://referencesource.microsoft.com/#System.Core/System/Linq/Enumerable.cs (Reference Source)
      // -------------------------------------

      class Pair<TFirst, TSecond>
      {
        private _first: TFirst;
        private _second: TSecond;

        public get first(): TFirst
        {
          return this._first;
        }

        public get second(): TSecond
        {
          return this._second;
        }

        constructor(first: TFirst, second: TSecond)
        {
          this._first = first;
          this._second = second;
        }

      }


      class Set<TSource>
      {
        private _setArray: Array<TSource>;
        private _equalityComparer: (first: TSource, second: TSource) => boolean;

        constructor(equalityComparer: (first: TSource, second: TSource) => boolean)
        {

          if (!TS.Utils.TypeInfo.isFunction(equalityComparer))
          {
            throw new TS.InvalidTypeException("equalityComparer", equalityComparer, "Argument '" + equalityComparer + "' must be a function parameter in the constructor of 'TS.Linq.Extensions.Set'.");
          }//END if

          this._setArray = new Array<TSource>();
          this._equalityComparer = equalityComparer;
        }

        public add(element: TSource): Boolean
        {
          if (!this.contains(element))
          {
            this._setArray.push(element);
            return true;
          }//END if

          return false;
        }

        public remove(element)
        {
          if (TS.Utils.TypeInfo.isNullOrUndefined(element))
          {
            throw new TS.ArgumentNullOrUndefinedException("element", "Argument 'element' must not be null or undefined in function 'TS.Linq.Extensions.Set.remove'.");
          }//END if

          this._setArray = this._setArray.filter((value, index, array): boolean =>
          {
            return !this._equalityComparer(value, element);
          });
        }

        public contains(element)
        {

          if (TS.Utils.TypeInfo.isNullOrUndefined(element))
          {
            throw new TS.ArgumentNullOrUndefinedException("element", "Argument 'element' must not be null or undefined in function 'TS.Linq.Extensions.Set.contains'.");
          }//END if

          return this._setArray.some((value, index, array): boolean =>
          {
            return this._equalityComparer(value, element);
          });

          return false;
        }

        public dispose()
        {
          this._setArray = undefined;
          this._equalityComparer = undefined;
        }
      }


      /**
      *  @description
      *    This function checks the argument 'enumerable' against null and 
      *    undefined and throws a 'TS.ArgumentNullOrUndefinedException' if
      *    the argument is either null or undefined.
      *    The exceptions message uses the 'functionName' to signal from
      *    which function received the invalid enumerable.
      *
      *  @requires
      *    TS.Utils.TypeInfo
      *    TS.Linq.RandomGenerator
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException
      */
      function checkEnumerable(enumerable: Enumerable<any>, functionName: string)
      {

        if (TS.Utils.TypeInfo.isNullOrUndefined(enumerable))
        {
          throw new TS.ArgumentNullOrUndefinedException("enumerable", "Argument 'enumerable' must not be null or undefined in function '" + functionName + "'.");
        }//END if

        if (TS.Utils.TypeInfo.isUndefined(enumerable.getEnumerator))
        {
          throw new TS.InvalidTypeException("enumerable", enumerable, "Argument 'enumerable' has the wrong type in function '" + functionName + "'.");
        }//END if

        if (!TS.Utils.TypeInfo.isFunction(enumerable.getEnumerator))
        {
          throw new TS.InvalidTypeException("enumerable", enumerable, "Argument 'enumerable' has the wrong type in function '" + functionName + "'.");
        }//END if

      }


      /**
      *  @description
      *    This function checks whether argument 'paramToCheck' is a
      *    function or not.
      *    If not, a 'InvalidTypeException' is thrown.
      *    The exceptions message uses the 'pramName' and 'functionName'
      *    in its message to signal which parameter failed the check and 
      *    which function received the invalid parameter.
      *
      *  @throws
      *    TS.InvalidTypeException
      */
      function checkFunctionParameter(paramToCheck: any, paramName: string, functionName: string)
      {
        if (!TS.Utils.TypeInfo.isFunction(paramToCheck))
        {
          throw new TS.InvalidTypeException(paramName, paramToCheck, "Argument '" + paramName + "' must be a function parameter in function '" + functionName + "'.");
        }//END if
      }


      /**
      *  @description
      *    This function checks the argument 'paramToCheck' against null and 
      *    undefined and throws a 'TS.ArgumentNullOrUndefinedException' if
      *    the argument is either null or undefined. 
      *    The exceptions message uses the 'paramName' and 'functionName' 
      *    in its message to signal which parameter failed the check and 
      *    which function received the invalid parameter.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      */
      function checkParameter(paramToCheck: any, paramName: string, functionName: string)
      {
        if (TS.Utils.TypeInfo.isNullOrUndefined(paramToCheck))
        {
          throw new TS.ArgumentNullOrUndefinedException(paramName, "Argument '" + paramName + "' must not be null or undefinde in function '" + functionName + "'.");
        }//END if
      }


      /**
      *  @description
      *    This function checks the argument 'constructorToCheck' against null and 
      *    undefined and throws a 'TS.ArgumentNullOrUndefinedException' if
      *    the argument is either null or undefined. 
      *
      *    The function checks also the type of the argument which must evaluate
      *    to 'function' and checks whether the function is a constructor function.
      *    The function throws a 'TS.InvalidTypeException' if one of the two
      *    checks failed.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException
      */
      function checkConstructor(constructorToCheck: any, paramName: string, functionName: string)
      {
        var _object: any;

        if (TS.Utils.TypeInfo.isNullOrUndefined(constructorToCheck))
        {
          throw new TS.ArgumentNullOrUndefinedException(paramName, "Argument '" + paramName + "' must not be null or undefinde in function '" + functionName + "'.");
        }//END if

        if (typeof (checkConstructor) != "function")
        {
          throw new TS.InvalidTypeException(paramName, "Argument '" + paramName + "' must not of type 'function' in function '" + functionName + "'.");
        }//END if

        try
        {
          _object = new constructorToCheck();
        }//END try
        catch (Ex) { };

        if (TS.Utils.TypeInfo.isNullOrUndefined(_object))
        {
          throw new TS.InvalidTypeException(paramName, "Argument '" + paramName + "' must be a valid constructor function in function '" + functionName + "'.");
        }//END if

      }


      /**
      *  @description
      *    Applies an accumulator function over a sequence.
      *
      *    Immediate execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.aggregate.aspx | MSDN}
      *
      *  @returns
      *    TSource, the aggregation result.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.Linq.EmptyEnumerableException
      *
      *  @throws
      *    TS.InvalidTypeException.
      */
      export function aggregate<TSource>(enumerable: Enumerable<TSource>, accumulator: (first: TSource, second: TSource) => TSource): TSource
      /**
      *  @description
      *    Applies an accumulator function over a sequence. The specified seed value is used as the initial accumulator value.
      *
      *    Immediate execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.aggregate.aspx | MSDN}
      *
      *  @returns
      *    TSource, the aggregation result.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException.
      */
      export function aggregate<TSource, TAccumulate>(enumerable: Enumerable<TSource>, accumulator: (first: TAccumulate, second: TSource) => TAccumulate, seed: TAccumulate): TAccumulate
      export function aggregate<TSource, any>(enumerable: Enumerable<TSource>, accumulator: (first: any, second: TSource) => any, seed?: any): any
      {
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;
        var _checkParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkParameter;
        var _checkFunctionParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkFunctionParameter;

        var _resultValue: any;
        var _enumerator: IEnumerator<TSource>;

        _checkEnumerable(enumerable, "TS.Linq.Extensions.aggregate");
        _checkParameter(accumulator, "accumulator", "TS.Linq.Extensions.aggregate");
        _checkFunctionParameter(accumulator, "accumulator", "TS.Linq.Extensions.aggregate");

        _enumerator = enumerable.getEnumerator();

        if (!_enumerator.moveNext())
        {
          if (TS.Utils.TypeInfo.isNullOrUndefined(seed))
          {
            throw new TS.Linq.EmptyEnumerableException(enumerable, "The argument 'enumerable' must not be an empty enumerable in function 'TS.Linq.Extensions.aggregate'.");
          }//END if
          else
          {
            _resultValue = seed;
          }//END else
        }//END if
        else
        {
          if (TS.Utils.TypeInfo.isNullOrUndefined(seed))
          {
            _resultValue = _enumerator.current;
          }//END if
          else
          {
            _resultValue = accumulator(seed, _enumerator.current);
          }//END else
        }//END else

        while (_enumerator.moveNext())
        {
          _resultValue = accumulator(_resultValue, _enumerator.current);
        }//END while

        _enumerator.dispose();

        return _resultValue;
      }


      /**
      *  @description
      *    Determines whether all elements of a sequence satisfy a condition.
      *
      *    Immediate execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/bb548541.aspx | MSDN}
      *
      *  @returns
      *    Boolean
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException
      */
      export function all<TSource>(enumerable: Enumerable<TSource>, predicate: (item: TSource) => boolean): boolean
      {
        var _checkParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkParameter;
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;
        var _checkFunctionParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkFunctionParameter;

        var _resultValue = true;
        var _enumerator: IEnumerator<TSource>

        _checkEnumerable(enumerable, "TS.Linq.Extensions.all");
        _checkParameter(predicate, "predicate", "TS.Linq.Extensions.all");
        _checkFunctionParameter(predicate, "predicate", "TS.Linq.Extensions.all");

        _enumerator = enumerable.getEnumerator();

        while (_enumerator.moveNext())
        {
          if (!predicate(_enumerator.current))
          {
            _resultValue = false;
          }//END if
        }//END while

        _enumerator.dispose();

        return _resultValue;
      }


      /**
      *  @description
      *    Determines whether any element of a sequence satisfies a condition.
      *
      *    Immediate execution.
      *
      *  @see {@link  http://msdn.microsoft.com/en-us/library/system.linq.enumerable.any.aspx | MSDN}
      *
      *  @returns
      *    Boolean
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException
      */
      export function any<TSource>(enumerable: Enumerable<TSource>, predicate: (item: TSource) => boolean): boolean
      /**
      *  @description
      *    Determines whether a sequence contains any element(s).
      *
      *    Immediate execution.
      *
      *  @see {@link  http://msdn.microsoft.com/en-us/library/system.linq.enumerable.any.aspx | MSDN}
      *
      *  @returns
      *    Boolean
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException
      */
      export function any<TSource>(enumerable: Enumerable<TSource>): boolean
      export function any<TSource>(enumerable: Enumerable<TSource>, predicate?: (item: TSource) => boolean): boolean
      {
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;
        var _checkFunctionParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkFunctionParameter;

        var _resultValue = false;
        var _enumerator: IEnumerator<TSource>


        _checkEnumerable(enumerable, "TS.Linq.Extensions.any");

        if (!TS.Utils.TypeInfo.isNullOrUndefined(predicate))
        {
          _checkFunctionParameter(predicate, "predicate", "TS.Linq.Extensions.any");
        }//END if

        _enumerator = enumerable.getEnumerator();

        if (TS.Utils.TypeInfo.isNullOrUndefined(predicate))
        {
          _resultValue = _enumerator.moveNext();
        }//END if
        else
        {
          while (_enumerator.moveNext())
          {
            if (predicate(_enumerator.current))
            {
              _resultValue = true;
              break;
            }//END if
          }//END while
        }//END else

        _enumerator.dispose();

        return _resultValue;
      }


      /**
      *  @description
      *    Calculates and returns the average of all elements of the 
      *    current enumerable.
      *
      *    Immediate execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/bb354760.aspx | MSDN}
      *
      *  @number
      *    number: the average of all items in the enumerable.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.ArgumentException
      *
      *  @throws
      *    TS.InvalidTypeException
      * 
      *  @throws
      *    TS.Linq.EmptyEnumerableException
      */
      export function average(enumerable: Enumerable<number>): number
      {
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;

        var _sum = 0;
        var _count = 0;
        var _enumerator: IEnumerator<number>;
        var _tempCurrent: any;

        _checkEnumerable(enumerable, "TS.Linq.Extensions.average");

        _enumerator = enumerable.getEnumerator();

        while (_enumerator.moveNext())
        {
          if (!TS.Utils.TypeInfo.isNumber(_enumerator.current))
          {
            _tempCurrent = _enumerator.current;
            _enumerator.dispose();
            throw new TS.InvalidTypeException("enumerable", _tempCurrent, "All elements in argument 'enumerable' must be of type 'number' in function 'TS.Linq.Extensions.average'.");
          }//END if
          _sum += _enumerator.current;

          if (_sum < -Number.MAX_VALUE || _sum > Number.MAX_VALUE)
          {
            _enumerator.dispose();
            throw new TS.OverflowException("An overflow occured in function 'TS.Linq.Extensions.average'.");
          }//END if

          _count++;

        }//END while

        if (_count > 0)
        {
          return _sum / _count;
        }//END if

        throw new TS.Linq.EmptyEnumerableException(enumerable, "The argument 'enumerable' must not be an empty enumerable in function 'TS.Linq.Extensions.average'.");
      }


      /**
      *  @description
      *    Concatenates two sequences.
      *
      *    Deferred execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/bb302894.aspx | MSDN}
      *
      *  @returns
      *    Enumerable<TSource>, the concatenation of the two
      *    enumerables.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException.
      */
      export function concat<TSource>(firstEnumerable: Enumerable<TSource>, secondEnumerable: Enumerable<TSource>): Enumerable<TSource>
      {
        var _checkParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkParameter;
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;

        var _callback: () => IEnumerator<TSource>;
        var _arr: Array<TSource>;
        var _enumerator: IEnumerator<TSource>;

        _checkEnumerable(firstEnumerable, "TS.Linq.Extensions.concat");
        _checkEnumerable(secondEnumerable, "TS.Linq.Extensions.concat");

        _callback = () =>
        {
          _arr = new Array<TSource>();
          _enumerator = firstEnumerable.getEnumerator();

          while (_enumerator.moveNext())
          {
            _arr.push(_enumerator.current);
          }//END while

          _enumerator = secondEnumerable.getEnumerator();

          while (_enumerator.moveNext())
          {
            _arr.push(_enumerator.current);
          }//END while

          return new ArrayEnumerator(_arr);
        };

        return new Enumerable<TSource>(_callback);
      }


      /**
      *  @description
      *    Determines whether a sequence contains a specified element.
      *    Uses javascript strict comparsion operator
      *    'strict equality (===)' to determine whether two elements are
      *    equal.
      *
      *    Immediate execution.
      *
      *    This function may produce results that differ from the C# counterpart,
      *    because the comparsion operators have different implementations in C#
      *    and javascript.
      *    
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.contains.aspx | MSDN}
      *
      *  @param
      *    enumerable, the source enumerable.
      *
      *  @param
      *    element, the element to locate in the enumerable.
      *
      *  @returns
      *    boolen, true if the 'enumerable' contains the given 'element',
      *    otherwise false.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException.
      */
      export function contains<TSource>(enumerable: Enumerable<TSource>, element: TSource): boolean
      /**
      *  @description
      *    Determines whether a sequence contains a specified element.
      *
      *    Immediate execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.contains.aspx | MSDN}
      *
      *  @param
      *    enumerable, the source enumerable.
      *
      *  @param
      *    element, the element to locate in the enumerable.
      *
      *  @param
      *    equalityComparer, an equality comparer to compare values.
      *
      *  @returns
      *    boolen, true if the 'enumerable' contains the given 'element',
      *    otherwise false.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException.
      */
      export function contains<TSource>(enumerable: Enumerable<TSource>, element: TSource, equalityComparer: <TSource>(first: TSource, second: TSource) => boolean): boolean
      export function contains<TSource>(enumerable: Enumerable<TSource>, element: TSource, equalityComparer?: <TSource>(first: TSource, second: TSource) => boolean): boolean
      {
        var _checkParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkParameter;
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;
        var _checkFunctionParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkFunctionParameter;

        var _contains: boolean;
        var _enumerator: IEnumerator<TSource>;

        _checkEnumerable(enumerable, "TS.Linq.Extensions.contains");
        _checkParameter(element, "element", "TS.Linq.Extensions.contains");

        if (!TS.Utils.TypeInfo.isNullOrUndefined(equalityComparer))
        {
          _checkFunctionParameter(equalityComparer, "equalityComparer", "TS.Linq.Extensions.contains");
        }//END if

        _contains = false;
        _enumerator = enumerable.getEnumerator();

        if (TS.Utils.TypeInfo.isNullOrUndefined(equalityComparer))
        {
          while (_enumerator.moveNext())
          {
            if (_enumerator.current === element)
            {
              _contains = true;
              _enumerator.dispose();
              break;
            }//END if
          }//END while
        }//END if
        else
        {
          while (_enumerator.moveNext())
          {
            if (equalityComparer(_enumerator.current, element))
            {
              _contains = true;
              _enumerator.dispose();
              break;
            }//END if
          }//END while
        }//END else

        return _contains;
      }


      /**
      *  @description
      *    Returns the number of elements in a sequence.
      *
      *    Immediate execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.count.aspx | MSDN}
      *
      *  @param
      *    enumerable, the source enumerable.
      *
      *  @returns
      *    number, the number of elements in the enumerable.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException.
      */
      export function count<TSource>(enumerable: Enumerable<TSource>): number
      /**
      *  @description
      *    Returns a number that represents how many elements in the specified sequence satisfy a condition.
      *
      *    Immediate execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.count.aspx | MSDN}
      *
      *  @param
      *    enumerable, the source enumerable.
      *
      *  @param
      *    predicate, the condition the elements must satisfy.
      *
      *  @returns
      *    number, the number of elements in the enumerable.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException.
      */
      export function count<TSource>(enumerable: Enumerable<TSource>, predicate: (item: TSource) => boolean): number
      export function count<TSource>(enumerable: Enumerable<TSource>, predicate?: (item: TSource) => boolean): number
      {
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;
        var _checkFunctionParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkFunctionParameter;

        var _count: number;
        var _enumerator: IEnumerator<TSource>;

        _checkEnumerable(enumerable, "TS.Linq.Extensions.count");

        if (!TS.Utils.TypeInfo.isNullOrUndefined(predicate))
        {
          _checkFunctionParameter(predicate, "equalityComparer", "TS.Linq.Extensions.count");
        }//END if
        else
        {
          predicate = (item) => true;
        }//END else

        _enumerator = enumerable.getEnumerator();
        _count = 0;

        while (_enumerator.moveNext())
        {
          if (predicate(_enumerator.current))
          {
            _count++;
          }//END if
        }//END while

        return _count;
      }


      /**
      *  @description
      *    This function retuns as much elements from the 
      *    base enumeration as required. The function starts
      *    over with the first element in the base enumeration
      *    when the end of the base enumeration is reached.
      *    The generator runs in cycles over the underlying
      *    data source. Hence the name for that function. This 
      *    function will never run out of data.
      *    There is one exception of that rule. If the
      *    underlying enumeration was empty, the 
      *    cycle function will never give a result.
      *
      *    Deferred execution.
      *
      *  @retuns
      *    Enumerable<TSource>, the result enumerable.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException.
      */
      export function cycle<TSource>(enumerable: Enumerable<TSource>): Enumerable<TSource>
      {
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;

        var _callback: () => IEnumerator<TSource>;

        _checkEnumerable(enumerable, "TS.Linq.Extensions.cycle");

        _callback = () => new CycleGenerator(enumerable.toArray());
        return new Enumerable<TSource>(_callback);
      }


      /**
      *  @description
      *    Returns the elements of an Enumerable<T>, or a default valued singleton collection if the sequence is empty.
      *
      *    Deferred execution.
      *
      *    That function differs from the .NET counterpart in that way that is has a 
      *    'defaultConstructor' in the singnature. That argument is needed because
      *    javascript doesn't offer reflections or a type system which you can rely on
      *    at runtime.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.defaultifempty.aspx | MSDN}
      *
      *  @retuns
      *   Enumerable<TSource>, the result enumerable.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException
      */
      export function defaultIfEmpty<TSource>(enumerable: Enumerable<TSource>, defaultConstructor: { new (): TSource; }): Enumerable<TSource>
      {
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;
        var _checkConstructor: (constructorToCheck: any, paramName: string, functionName: string) => void = checkConstructor;

        var _arr: Array<TSource>;
        var _callback: () => IEnumerator<TSource>;
        var _enumerator: IEnumerator<TSource>;

        _checkEnumerable(enumerable, "TS.Linq.Extensions.defaultIfEmpty");
        _checkConstructor(defaultConstructor, "defaultConstructor", "TS.Linq.Extensions.defaultIfEmpty");

        _callback = () => 
        {
          _arr = new Array<TSource>();
          _enumerator = enumerable.getEnumerator();

          if (_enumerator.moveNext())
          {
            _arr.push(_enumerator.current);
            while (_enumerator.moveNext())
            {
              _arr.push(_enumerator.current);
            }//END while
          }//END if
          else
          {
            _arr.push(new defaultConstructor());
          }//END else

          return new ArrayEnumerator(_arr);
        }

        return new Enumerable<TSource>(_callback);
      }


      /**
      *  @description
      *    Returns distinct elements from a sequence.
      *    Uses javascript strict comparsion operator
      *    'strict equality (===)' to achieve distinction.
      *
      *    Deffered execution
      *
      *    This function may produce results that differ from the C# counterpart,
      *    because the comparsion operators have different implementations in C#
      *    and javascript.
      *    
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.distinct.aspx | MSDN}
      *
      *  @retuns
      *    Enumerable<TSource>, the result enumerable.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException.
      */
      export function distinct<TSource>(enumerable: Enumerable<TSource>): Enumerable<TSource>
      /**
      *  @description
      *    Returns distinct elements from a sequence.
      *    Uses the function defined in argument 'equalityComparer'
      *    to achieve distinction.
      *
      *    Deffered execution
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.distinct.aspx | MSDN}
      *
      *  @retuns
      *    Enumerable<TSource>, the result enumerable.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException.
      */
      export function distinct<TSource>(enumerable: Enumerable<TSource>, equalityComparer: (first: TSource, second: TSource) => boolean): Enumerable<TSource>
      export function distinct<TSource>(enumerable: Enumerable<TSource>, equalityComparer?: (first: TSource, second: TSource) => boolean): Enumerable<TSource>
      {
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;
        var _checkFunctionParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkFunctionParameter;

        var _arr: Array<TSource>;
        var _callback: () => IEnumerator<TSource>;
        var _index: number;
        var _enumerator: IEnumerator<TSource>;
        var _hasElement: boolean;
        var _currentElement: TSource;

        _checkEnumerable(enumerable, "TS.Linq.Extensions.distinct");

        if (!TS.Utils.TypeInfo.isNullOrUndefined(equalityComparer))
        {
          _checkFunctionParameter(equalityComparer, "equalityComparer", "TS.Linq.Extensions.distinct");
        }//END if

        _index = 0;

        if (TS.Utils.TypeInfo.isNullOrUndefined(equalityComparer))
        {
          _callback = () => 
          {
            _enumerator = enumerable.getEnumerator();
            _arr = new Array<TSource>();

            if (_enumerator.moveNext())
            {
              _arr.push(_enumerator.current);
            }//END if

            while (_enumerator.moveNext())
            {
              _hasElement = false;
              _currentElement = _enumerator.current;

              for (_index = 0; _index < _arr.length; _index++)
              {
                if (_arr[_index] === _currentElement)
                {
                  _hasElement = true;
                  break;
                }//END if
              }//END for
              if (!_hasElement)
              {
                _arr.push(_currentElement);
              }//END if
            }//END while
            return new ArrayEnumerator(_arr);
          }
        }//END if
        else
        {
          _callback = () => 
          {
            _enumerator = enumerable.getEnumerator();
            _arr = new Array<TSource>();

            if (_enumerator.moveNext())
            {
              _arr.push(_enumerator.current);
            }//END if

            while (_enumerator.moveNext())
            {
              _hasElement = false;
              _currentElement = _enumerator.current;

              for (_index = 0; _index < _arr.length; _index++)
              {
                if (equalityComparer(_arr[_index], _currentElement))
                {
                  _hasElement = true;
                  break;
                }//END if
              }//END for
              if (!_hasElement)
              {
                _arr.push(_currentElement);
              }//END if
            }//END while
            return new ArrayEnumerator(_arr);
          }
        }//END else

        return new Enumerable<TSource>(_callback);
      }


      /**
      *  @description
      *    Returns the element at a specified index in a sequence.
      *
      *    Immediate execution.
      *
      *  @see {@link http://referencesource.microsoft.com/#System.Core/System/Linq/Enumerable.cs | MSDN}
      *
      *  @param
      *    enumerable, the source enumerable.
      *
      *  @param
      *    index, the position of the required element. Must be a positive integer and less or equal the 
      *    number of elements in the 'enumerable' argument.
      *
      *  @retuns
      *   TSource, the result elemement.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException.
      *
      *  @throws
      *    TS.ArgumentOutOfRangeException, thrown if argument 'index' is invalid.
      *
      *  @throws
      *    TS.IndexOutOfRangeException, thrown if the value of the 'index' argument 
      *    exceeds the number of elements in argument 'enumerable'
      *
      *  @throws
      *    TS.InvalidTypeException.
      */
      export function elementAt<TSource>(enumerable: Enumerable<TSource>, index: number): TSource
      {
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;
        var _checkParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkParameter;

        var _enumerator: IEnumerator<TSource>;
        var _currentElement: TSource;

        _checkEnumerable(enumerable, "TS.Linq.Extensions.elementAt");
        _checkParameter(index, "index", "Argument 'index' must not be null or undefined in function 'TS.Linq.Extensions.elementAt'.");

        if (!TS.Utils.TypeInfo.isPositiveIntegerNumber(index))
        {
          throw new TS.ArgumentOutOfRangeException("index", index, "Argument 'index'  must be an integer greater or equal zero in function 'TS.Linq.Extensions.elementAt'.");
        }//END if

        _enumerator = enumerable.getEnumerator();

        while (_enumerator.moveNext())
        {
          if (index == 0)
          {
            _currentElement = _enumerator.current;
            _enumerator.dispose();
            return _currentElement;
          }//END if

          index--;
        }//END while

        throw new TS.IndexOutOfRangeException("The 'index' in function 'TS.Linq.Extensions.elementAt' is out of the range of the current enumerable.");
      }


      /**
      *  @description
      *    Returns the element at a specified index in a sequence or a default value if the index is out of range.
      *
      *    Immediate execution.
      *
      *    That function differs from the .NET counterpart in that way that is has a 
      *    'defaultConstructor' in the singnature. That argument is needed because
      *    javascript doesn't offer reflections or a type system which you can rely on
      *    at runtime.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/bb494386.aspx | MSDN}
      *
      *  @retuns
      *   TSource, the result elemement.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException, thrown if one of the arguments is null or undefined.
      *
      *  @throws
      *    TS.ArgumentOutOfRangeException, thrown if argument 'index' is less than 0.
      *
      *  @throws
      *    TS.InvalidTypeException.
      */
      export function elementAtOrDefault<TSource>(enumerable: Enumerable<TSource>, index: number, defaultConstructor: { new (): TSource; }): TSource
      {
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;
        var _checkConstructor: (constructorToCheck: any, paramName: string, functionName: string) => void = checkConstructor;

        var _enumerator: IEnumerator<TSource>;
        var _currentElement: TSource;
        var _checkParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkParameter;

        _checkEnumerable(enumerable, "TS.Linq.Extensions.elementAtOrDefault");
        _checkParameter(index, "index", "TS.Linq.Extensions.elementAtOrDefault");
        _checkConstructor(defaultConstructor, "defaultConstructor", "TS.Linq.Extensions.elementAtOrDefault");

        if (!TS.Utils.TypeInfo.isIntegerNumber(index))
        {
          throw new TS.InvalidTypeException("index", index, "Argument 'index' must be an integer number in function 'TS.Linq.Extensions.elementAtOrDefault'.");
        }//END if

        if (index < 0)
        {
          throw new TS.ArgumentOutOfRangeException("index", index, "Argument 'index' must be greater or equal zero in function 'TS.Linq.Extensions.elementAtOrDefault'.");
        }//ENd if

        _enumerator = enumerable.getEnumerator();

        while (_enumerator.moveNext())
        {
          if (index == 0)
          {
            _currentElement = _enumerator.current;
            _enumerator.dispose();
            return _currentElement;
          }//END if

          index--;
        }//END while

        return new defaultConstructor();
      }


      /**
      *  @description
      *    Returns an empty Enumerable<TResult> that has the specified type argument.
      *
      *    Immediate execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/bb341042.aspx | MSDN}
      *
      *  @retuns
      *    Enumerable<TResult>, an empty enumerable.
      */
      export function empty<TResult>(): Enumerable<TResult>
      {
        return new TS.Linq.ArrayEnumerable<TResult>(new Array<TResult>());
      }


      /**
      *  @description
      *    Produces the set difference of two sequences by using the strict 
      *    comparsion operator (===).
      *
      *    Deferred execution.
      *
      *    This function may produce results that differ from the C# counterpart,
      *    because the comparsion operators have different implementations in C#
      *    and javascript.
      *    
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.except.aspx | MSDN}
      *
      *  @retuns
      *    Enumerable<TSource>, the resulting enumerable.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      */
      export function except<TSource>(firstEnumerable: Enumerable<TSource>, secondEnumerable: Enumerable<TSource>): Enumerable<TSource>
      /**
      *  @description
      *    Produces the set difference of two sequences by using the specified
      *    equalityComparer<TSource> to compare values.
      *
      *    Deferred execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.except.aspx | MSDN}
      *
      *  @retuns
      *    Enumerable<TSource>, the resulting enumerable.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException.
      */
      export function except<TSource>(firstEnumerable: Enumerable<TSource>, secondEnumerable: Enumerable<TSource>, equalityComparer: (first: TSource, second: TSource) => boolean): Enumerable<TSource>
      export function except<TSource>(firstEnumerable: Enumerable<TSource>, secondEnumerable: Enumerable<TSource>, equalityComparer?: (first: TSource, second: TSource) => boolean): Enumerable<TSource>
      {
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;
        var _checkFunctionParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkFunctionParameter;

        var _resultArray: Array<TSource>;
        var _secondEnumArray: Array<TSource>
        var _callback: () => IEnumerator<TSource>;
        var _index: number;
        var _found: boolean;
        var _firstEnumerator: IEnumerator<TSource>;
        var _secondEnumerator: IEnumerator<TSource>;

        _checkEnumerable(firstEnumerable, "TS.Linq.Extensions.except");
        _checkEnumerable(secondEnumerable, "TS.Linq.Extensions.except");

        if (!TS.Utils.TypeInfo.isNullOrUndefined(equalityComparer))
        {
          _checkFunctionParameter(equalityComparer, "equalityComparer", "TS.Linq.Extensions.except");
        }//END if
        else
        {
          equalityComparer = (first, second) => first === second;
        }//END else

        _callback = () => 
        {
          _firstEnumerator = firstEnumerable.getEnumerator();
          _resultArray = new Array<TSource>();

          while (_firstEnumerator.moveNext())
          {
            _found = false;
            _secondEnumerator = secondEnumerable.getEnumerator();

            while (_secondEnumerator.moveNext())
            {
              if (equalityComparer(_firstEnumerator.current, _secondEnumerator.current))
              {
                _found = true;
                _secondEnumerator.dispose();
                break;
              }//END if
            }//END while
            if (!_found)
            {
              _resultArray.push(_firstEnumerator.current);
            }//END if
          }//END while

          _firstEnumerator.dispose();
          return new ArrayEnumerator(_resultArray);
        }

        return new Enumerable(_callback);
      }


      /**
      *  @description
      *    Returns the first element of a sequence.
      *
      *    Immediate execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.first.aspx | MSDN}
      *
      *  @returns
      *     TSource, the result element.
      *
      *  @throws
      *     TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *     TS.InvalidOperationException
      *
      *  @throws
      *    TS.InvalidTypeException.
      */
      export function first<TSource>(enumerable: Enumerable<TSource>): TSource
      /**
      *  @description
      *    Returns the first element in a sequence that satisfies a specified condition.
      *
      *    Immediate execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.first.aspx | MSDN}
      *
      *  @returns
      *     TSource, the result element.
      *
      *  @throws
      *     TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *     TS.InvalidOperationException
      *
      *  @throws
      *     TS.InvalidTypeException.
      */
      export function first<TSource>(enumerable: Enumerable<TSource>, predicate: (item: TSource) => boolean): TSource
      export function first<TSource>(enumerable: Enumerable<TSource>, predicate?: (item: TSource) => boolean): TSource
      {
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;
        var _checkFunctionParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkFunctionParameter;

        var _enumerator: IEnumerator<TSource>;
        var _result: TSource;
        var _movedOnce: boolean;

        _checkEnumerable(enumerable, "TS.Linq.Extensions.first");

        if (!TS.Utils.TypeInfo.isNullOrUndefined(predicate))
        {
          _checkFunctionParameter(predicate, "predicate", "TS.Linq.Extensions.first");
        }//END if
        else
        {
          predicate = (item) => true;
        }//END else

        _enumerator = enumerable.getEnumerator();

        while (_enumerator.moveNext())
        {
          if (predicate(_enumerator.current))
          {
            _result = _enumerator.current;
            _enumerator.dispose();
            return _result;
          }//END if
        }//END while

        _enumerator.dispose();
        throw new TS.InvalidOperationException("The'enumerable' is either empty or has no matche with the given predicate in function 'TS.Linq.Extensions.first'.");

      }


      /**
      *  @description
      *    Returns the first element of a sequence, or a default value if the sequence contains no elements.
      *
      *    Immediate execution.
      *
      *    That function differs from the .NET counterpart in that way that is has a 
      *    'defaultConstructor' in the singnature. That argument is needed because
      *    javascript doesn't offer reflection or a type system which you can rely on
      *    at runtime. So there is no way to tell which constructor to use for the
      *    default value exept the constructor it is already available as function parameter.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.firstordefault.aspx | MSDN}
      *
      *  @returns
      *     TSource, the result element.
      *
      *  @throws
      *     TS.ArgumentNullOrUndefinedException.
      *
      *  @throws
      *    TS.InvalidTypeException.
      */
      export function firstOrDefault<TSource>(enumerable: Enumerable<TSource>, defaultConstructor: { new (): TSource; }): TSource
      /**
      *  @description
      *    Returns the first element of the sequence that satisfies a condition or 
      *    a default value if no element satisfied the condition.
      *
      *    Immediate execution.
      *
      *    That function differs from the .NET counterpart in that way that is has a 
      *    'defaultConstructor' in the singnature. That argument is needed because
      *    javascript doesn't offer reflection or a type system which you can rely on
      *    at runtime. So there is no way to tell which constructor to use for the
      *    default value exept the constructor it is already available as function parameter.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.firstordefault.aspx | MSDN}
      *
      *  @returns
      *     TSource, the result element.
      *
      *  @throws
      *     TS.ArgumentNullOrUndefinedException.
      *
      *  @throws
      *    TS.InvalidTypeException.
      */
      export function firstOrDefault<TSource>(enumerable: Enumerable<TSource>, defaultConstructor: { new (): TSource; }, predicate: (item: TSource) => boolean): TSource
      export function firstOrDefault<TSource>(enumerable: Enumerable<TSource>, defaultConstructor: { new (): TSource; }, predicate?: (item: TSource) => boolean): TSource
      {
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;
        var _checkConstructor: (constructorToCheck: any, paramName: string, functionName: string) => void = checkConstructor;
        var _checkFunctionParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkFunctionParameter;

        var _enumerator: IEnumerator<TSource>;
        var _result: TSource;

        _checkEnumerable(enumerable, "TS.Linq.Extensions.firstOrDefault");
        _checkConstructor(defaultConstructor, "defaultConstructor", "TS.Linq.Extensions.firstOrDefault");

        if (!TS.Utils.TypeInfo.isNullOrUndefined(predicate))
        {
          _checkFunctionParameter(predicate, "predicate", "TS.Linq.Extensions.firstOrDefault");
        }//END if
        else
        {
          predicate = (item) => true;
        }//END else

        _enumerator = enumerable.getEnumerator();

        while (_enumerator.moveNext())
        {
          if (predicate(_enumerator.current))
          {
            _result = _enumerator.current;
            _enumerator.dispose();
            return _result;
          }//END if
        }//END while

        _enumerator.dispose();
        return new defaultConstructor();

      }


      /**
      *  @description
      *    Creates and returns a new 'Enumerable' form the array
      *    given in argument 'sourceArray'.
      *
      *    Immediate execution.
      *
      *  @returns
      *    Enumerable<TSource>, the result enumerable.
      *
      *  @throws
      *     TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException
      */
      export function fromArray<TSource>(sourceArray: Array<TSource>): TS.Linq.ArrayEnumerable<TSource>
      {
        var _checkParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkParameter;

        _checkParameter(sourceArray, "sourceArray", "TS.Linq.Extensions.fromArray");

        if (!Utils.TypeInfo.isArray(sourceArray))
        {
          throw new TS.InvalidTypeException("sourceArray", sourceArray, "Argument '" + sourceArray + "' must be a valid array in function '" + fromArray + "'.");
        }//END if

        return new TS.Linq.ArrayEnumerable<TSource>(sourceArray);
      }


      /**
      *  @description
      *    Correlates the elements of two sequences based on equality of keys and groups 
      *    the results. The default equality comparer is used to compare keys.
      *
      *    Deferred execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.groupjoin.aspx | MSDN} 
      *
      *  @returns
      *    Enumerable<TResult>, the result enumerable.
      *
      *  @throws
      *     TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException.
      */
      export function groupJoin<TOuter, TInner, TKey, TResult>(outerEnumerable: Enumerable<TOuter>, innerEnumerable: Enumerable<TInner>, outerKeySelector: (outerItem: TOuter) => TKey, innerKeySelector: (innerItem: TInner) => TKey, resultSelector: (outerItem: TOuter, group: IEnumerable<TInner>) => TResult): Enumerable<TResult>
      /**
      *  @description
      *    Correlates the elements of two sequences based on key equality and groups the results. 
      *    A specified equalityComparer is used to compare keys.
      *
      *    Deferred execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.groupjoin.aspx | MSDN} 
      *
      *  @returns
      *    Enumerable<TResult>, the result enumerable.
      *
      *  @throws
      *     TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException.
      */
      export function groupJoin<TOuter, TInner, TKey, TResult>(outerEnumerable: Enumerable<TOuter>, innerEnumerable: Enumerable<TInner>, outerKeySelector: (outerItem: TOuter) => TKey, innerKeySelector: (innerItem: TInner) => TKey, resultSelector: (outerItem: TOuter, group: IEnumerable<TInner>) => TResult, equalityComparer: <TKey>(outerKey: TKey, innerKey: TKey) => boolean): Enumerable<TResult>
      export function groupJoin<TOuter, TInner, TKey, TResult>(outerEnumerable: Enumerable<TOuter>, innerEnumerable: Enumerable<TInner>, outerKeySelector: (outerItem: TOuter) => TKey, innerKeySelector: (innerItem: TInner) => TKey, resultSelector: (outerItem: TOuter, group: IEnumerable<TInner>) => TResult, equalityComparer?: <TKey>(outerKey: TKey, innerKey: TKey) => boolean): Enumerable<TResult>
      {
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;
        var _checkFunctionParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkFunctionParameter;
        var _checkParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkParameter;

        var _joinArray: Array<Pair<TOuter, Enumerable<TInner>>>;
        var _index: number;
        var _enumeratorOuter: IEnumerator<TOuter>;
        var _enumeratorInner: IEnumerator<TInner>;
        var _resultArray: Array<TResult>;
        var _callback: () => IEnumerator<TResult>;
        var _outerKey: any;
        var _groupArray: Array<TInner>;

        _checkEnumerable(outerEnumerable, "TS.Linq.Extensions.groupJoin");
        _checkEnumerable(innerEnumerable, "TS.Linq.Extensions.groupJoin");

        _checkParameter(outerKeySelector, "outerKeySelector", "TS.Linq.Extensions.groupJoin");
        _checkFunctionParameter(outerKeySelector, "outerKeySelector", "TS.Linq.Extensions.groupJoin");

        _checkParameter(innerKeySelector, "innerKeySelector", "TS.Linq.Extensions.groupJoin");
        _checkFunctionParameter(innerKeySelector, "innerKeySelector", "TS.Linq.Extensions.groupJoin");

        _checkParameter(resultSelector, "resultSelector", "TS.Linq.Extensions.groupJoin");
        _checkFunctionParameter(resultSelector, "resultSelector", "TS.Linq.Extensions.groupJoin");

        if (!TS.Utils.TypeInfo.isNullOrUndefined(equalityComparer))
        {
          _checkFunctionParameter(equalityComparer, "equalityComparer", "TS.Linq.Extensions.contains");
        }//END if
        else
        {
          equalityComparer = (outerKey: TKey, innerKey: TKey) =>
          {
            return outerKey === innerKey;
          }
        }//END else

        _callback = () =>
        {
          _resultArray = new Array<TResult>();
          _joinArray = new Array<Pair<TOuter, Enumerable<TInner>>>();
          _enumeratorOuter = outerEnumerable.getEnumerator();

          while (_enumeratorOuter.moveNext())
          {
            _outerKey = outerKeySelector(_enumeratorOuter.current);
            _enumeratorInner = innerEnumerable.where(Item => equalityComparer(_outerKey, innerKeySelector(Item))).getEnumerator();
            _groupArray = new Array<TInner>();
            while (_enumeratorInner.moveNext())
            {
              _groupArray.push(_enumeratorInner.current);
            }//END while

            if (_groupArray.length > 0)
            {
              _joinArray.push(new Pair<TOuter, Enumerable<TInner>>(_enumeratorOuter.current, Enumerable.fromArray(_groupArray)));
            }//END if
            else
            {
              _joinArray.push(new Pair<TOuter, Enumerable<TInner>>(_enumeratorOuter.current, TS.Linq.Extensions.empty<TInner>()));
            }//END else
          }//END while

          for (_index = _joinArray.length - 1; _index > -1; _index--)
          {
            _resultArray.push(resultSelector(_joinArray[_index].first, _joinArray[_index].second));
          }//END for

          _joinArray = null;
          return new ArrayEnumerator<TResult>(_resultArray);
        };

        return new Enumerable<TResult>(_callback);
      }

      /**
      *  @description
      *    Produces the set intersection of two sequences by using the default equality comparer (===) to compare values.
      *
      *    Deferred execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.intersect.aspx | MSDN}
      *
      *  @returns
      *    Enumerable<TResult>, the result enumerable.
      *
      *  @throws
      *     TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException.
      */     
      export function intersect<TSource>(firstEnumerable: Enumerable<TSource>, secondEnumerable: Enumerable<TSource>): Enumerable<TSource>
      /**
      *  @description
      *    Produces the set intersection of two sequences by using the specified equalityComparer to compare values.
      *
      *    Deferred execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.intersect.aspx | MSDN}
      *
      *  @returns
      *    Enumerable<TResult>, the result enumerable.
      *
      *  @throws
      *     TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException.
      */
      export function intersect<TSource>(firstEnumerable: Enumerable<TSource>, secondEnumerable: Enumerable<TSource>, equalityComparer: (first: TSource, second: TSource) => boolean): Enumerable<TSource>
      export function intersect<TSource>(firstEnumerable: Enumerable<TSource>, secondEnumerable: Enumerable<TSource>, equalityComparer?: (first: TSource, second: TSource) => boolean): Enumerable<TSource>
      {

        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;
        var _checkFunctionParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkFunctionParameter;
        var _checkParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkParameter;

        var _set: Set<TSource>;
        var _firstEnumerator: IEnumerator<TSource>;
        var _secondEnumerator: IEnumerator<TSource>;
        var _resultArray: Array<TSource>;
        var _callback: () => IEnumerator<TSource>;

        _checkEnumerable(firstEnumerable, "TS.Linq.Extensions.intersect");
        _checkEnumerable(secondEnumerable, "TS.Linq.Extensions.intersect");

        if (!TS.Utils.TypeInfo.isNullOrUndefined(equalityComparer))
        {
          _checkFunctionParameter(equalityComparer, "predicate", "TS.Linq.Extensions.intersect");
        }//END if
        else
        {
          equalityComparer = (first, second) => first === second;
        }//END else

        _callback = () =>
        {
          _firstEnumerator = firstEnumerable.getEnumerator();
          _secondEnumerator = secondEnumerable.getEnumerator();
          _set = new Set<TSource>(equalityComparer);
          _resultArray = new Array<TSource>();

          while (_firstEnumerator.moveNext())
          {
            _set.add(_firstEnumerator.current);
          }//END while

          while (_secondEnumerator.moveNext())
          {
            if (_set.contains(_secondEnumerator.current))
            {
              _resultArray.push(_secondEnumerator.current);
              _set.remove(_secondEnumerator.current);
            }//END if
          }//END while

          return new ArrayEnumerator<TSource>(_resultArray);
        };

        return new Enumerable<TSource>(_callback);
      }


      /**
      *  @description
      *    Correlates the elements of two sequences based on matching keys.
      *
      *    Deferred execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.join.aspx | MSDN}
      *
      *  @returns
      *    Enumerable<TResult>, the result enumerable.
      *
      *  @throws
      *     TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException.
      */
      export function join<TOuter, TInner, TKey, TResult>(outerEnumerable: Enumerable<TOuter>, innerEnumerable: Enumerable<TInner>, outerKeySelector: (outerItem: TOuter) => TKey, innerKeySelector: (innerItem: TInner) => TKey, resultSelector: (outerItem: TOuter, innerItem: TInner) => TResult): Enumerable<TResult>
      {
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;
        var _checkFunctionParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkFunctionParameter;
        var _checkParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkParameter;

        var _joinArray: Array<Pair<TOuter, TInner>>;
        var _index: number;
        var _enumeratorOuter: IEnumerator<TOuter>;
        var _enumeratorInner: IEnumerator<TInner>;
        var _resultArray: Array<TResult>;
        var _callback: () => IEnumerator<TResult>;
        var _outerKey: any;

        _checkEnumerable(outerEnumerable, "TS.Linq.Extensions.join");
        _checkEnumerable(innerEnumerable, "TS.Linq.Extensions.join");
        _checkParameter(outerKeySelector, "outerKeySelector", "TS.Linq.Extensions.join");
        _checkFunctionParameter(outerKeySelector, "outerKeySelector", "TS.Linq.Extensions.join");

        _checkParameter(innerKeySelector, "innerKeySelector", "TS.Linq.Extensions.join");
        _checkFunctionParameter(innerKeySelector, "innerKeySelector", "TS.Linq.Extensions.join");

        _checkParameter(resultSelector, "resultSelector", "TS.Linq.Extensions.join");
        _checkFunctionParameter(resultSelector, "resultSelector", "TS.Linq.Extensions.join");

        _callback = () =>
        {
          _resultArray = new Array<TResult>();
          _joinArray = new Array<Pair<TOuter, TInner>>();
          _enumeratorOuter = outerEnumerable.getEnumerator();

          while (_enumeratorOuter.moveNext())
          {
            _outerKey = outerKeySelector(_enumeratorOuter.current);
            _enumeratorInner = innerEnumerable.where(Item => innerKeySelector(Item) == _outerKey).getEnumerator();
            while (_enumeratorInner.moveNext())
            {
              _joinArray.push(new Pair(_enumeratorOuter.current, _enumeratorInner.current));
            }//END while
          }//END while

          for (_index = _joinArray.length - 1; _index > -1; _index--)
          {
            _resultArray.push(resultSelector(_joinArray[_index].first, _joinArray[_index].second));
          }//END for

          _joinArray = null;
          return new ArrayEnumerator<TResult>(_resultArray);
        };

        return new Enumerable<TResult>(_callback);
      }


      /**
      *  @description
      *    Returns the last element of a sequence.
      *
      *    Immediate execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.last.aspx | MSDN}
      *
      *  @returns
      *    TResult, the result value.
      *
      *  @throws
      *     TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException.
      */
      export function last<TSource>(enumerable: Enumerable<TSource>): TSource
      /**
      *  @description
      *    Returns the last element of a sequence that satisfies a specified condition.
      *
      *    Immediate execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.last.aspx | MSDN}
      *
      *  @returns
      *    TResult, the result value.
      *
      *  @throws
      *     TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException.
      *
      *  @throws
      *    TS.InvalidOperationException
      */
      export function last<TSource>(enumerable: Enumerable<TSource>, predicate: (item: TSource) => boolean): TSource
      export function last<TSource>(enumerable: Enumerable<TSource>, predicate?: (item: TSource) => boolean): TSource
      {
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;
        var _checkFunctionParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkFunctionParameter;
        var _checkParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkParameter;

        var _enumerator: IEnumerator<TSource>;
        var _result: TSource;
        var _resultAssigned: boolean;

        _result = null;
        _checkEnumerable(enumerable, "last");

        if (!TS.Utils.TypeInfo.isNullOrUndefined(predicate))
        {
          _checkFunctionParameter(predicate, "predicate", "TS.Linq.Extensions.last");
        }//END if
        else
        {
          predicate = (item) => true;
        }//END else

        _enumerator = enumerable.getEnumerator();
        _resultAssigned = false;

        while (_enumerator.moveNext())
        {
          if (predicate(_enumerator.current))
          {
            _result = _enumerator.current;
            _resultAssigned = true;
          }//END if
        }//END if

        _enumerator.dispose();

        if (_resultAssigned)
        {
          return _result;
        }//END if

        throw new TS.InvalidOperationException("The'enumerable' is either empty or has no matche with the given predicate in function 'TS.Linq.Extensions.last'.");
      }


      /**
      *  @description
      *    Returns the last element of a sequence, or a default value if the sequence contains no elements.
      *
      *    Immediate execution.
      *
      *    That function differs from the .NET counterpart in that way that is has a 
      *    'defaultConstructor' in the singnature. That argument is needed because
      *    javascript doesn't offer reflection or a type system which you can rely on
      *    at runtime. So there is no way to tell which constructor to use for the
      *    default value exept the constructor it is already available as function parameter.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.lastordefault.aspx | MSDN}
      *
      *  @returns
      *     TSource, the result element.
      *
      *  @throws
      *     TS.ArgumentNullOrUndefinedException.
      *
      *  @throws
      *    TS.InvalidTypeException.
      */
      export function lastOrDefault<TSource>(enumerable: Enumerable<TSource>, defaultConstructor: { new (): TSource; }): TSource
      /**
      *  @description
      *    Returns the last element of a sequence that satisfies a condition 
      *    or a default value if no such element is found.
      *
      *    Immediate execution.
      *
      *    That function differs from the .NET counterpart in that way that is has a 
      *    'defaultConstructor' in the singnature. That argument is needed because
      *    javascript doesn't offer reflection or a type system which you can rely on
      *    at runtime. So there is no way to tell which constructor to use for the
      *    default value exept the constructor it is already available as function parameter.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.lastordefault.aspx | MSDN}
      *
      *  @returns
      *     TSource, the result element.
      *
      *  @throws
      *     TS.ArgumentNullOrUndefinedException.
      *
      *  @throws
      *    TS.InvalidTypeException.
      */
      export function lastOrDefault<TSource>(enumerable: Enumerable<TSource>, defaultConstructor: { new (): TSource; }, predicate: (item: TSource) => boolean): TSource
      export function lastOrDefault<TSource>(enumerable: Enumerable<TSource>, defaultConstructor: { new (): TSource; }, predicate?: (item: TSource) => boolean): TSource
      {
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;
        var _checkConstructor: (constructorToCheck: any, paramName: string, functionName: string) => void = checkConstructor;
        var _checkFunctionParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkFunctionParameter;

        var _enumerator: IEnumerator<TSource>;
        var _result: TSource;
        var _resultAssigned: boolean;

        _checkEnumerable(enumerable, "TS.Linq.Extensions.lastOrDefault");
        _checkConstructor(defaultConstructor, "defaultConstructor", "TS.Linq.Extensions.lastOrDefault");

        if (enumerable.count() == 0)
        {
          return new defaultConstructor();
        }//END if

        if (!TS.Utils.TypeInfo.isNullOrUndefined(predicate))
        {
          _checkFunctionParameter(predicate, "predicate", "TS.Linq.Extensions.lastOrDefault");
        }//END if

        _enumerator = enumerable.getEnumerator();

        if (TS.Utils.TypeInfo.isNullOrUndefined(predicate))
        {
          while (_enumerator.moveNext())
          {
            _result = _enumerator.current;
          }//END if

          _enumerator.dispose();
          return _result;
        }//END if
        else
        {
          _resultAssigned = false;

          while (_enumerator.moveNext())
          {
            if (predicate(_enumerator.current))
            {
              _result = _enumerator.current;
              _resultAssigned = true;
            }//END if
          }//END while

          _enumerator.dispose();

          if (_resultAssigned)
          {
            return _result;
          }//END if

          return new defaultConstructor();

        }//END else
      }


      /**
      *  @description
      *    Returns the maximum value in a sequence of values.
      *
      *    Immediate execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.max.aspx | MSDN}
      *
      *  @returns
      *    number, the maximum number.
      *
      *  @throws
      *    TS.Linq.EmptyEnumerableException.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException.
      *
      *  @throws
      *    TS.InvalidTypeException.
      */
      export function max<number>(enumerable: Enumerable<number>): number
      {
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;

        var _tempMax: number;
        var _tempCurrent: any;
        var _enumerator: IEnumerator<number>;

        _checkEnumerable(enumerable, "TS.Linq.Extensions.max");

        if (enumerable.count() == 0)
        {
          throw new TS.Linq.EmptyEnumerableException(enumerable, "The argument 'enumerable' must not be an empty enumerable in function 'TS.Linq.Extensions.max'.");
        }//END if

        _tempMax = Number.MIN_VALUE;
        _enumerator = enumerable.getEnumerator();

        while (_enumerator.moveNext())
        {
          if (!TS.Utils.TypeInfo.isNumber(_enumerator.current))
          {
            _tempCurrent = _enumerator.current;
            _enumerator.dispose();
            throw new TS.InvalidTypeException("enumerable", _tempCurrent, "All elements in argument 'enumerable' must be of type 'number' in function 'TS.Linq.Extensions.max'.");
          }//END if

          if (_enumerator.current > _tempMax)
          {
            _tempMax = _enumerator.current;
          }//END if
        }//END while

        return _tempMax;
      }


      /**
      *  @description
      *    Returns the minimum value in a sequence of values.
      *
      *    Immediate execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.min.aspx | MSDN}
      *
      *  @returns
      *    number, the minimum number.
      *
      *  @throws
      *    TS.Linq.EmptyEnumerableException.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException.
      *
      *  @throws
      *    TS.InvalidTypeException.
      */
      export function min<number>(enumerable: Enumerable<number>): number
      {
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;

        var _tempMin: number;
        var _tempCurrent: any;
        var _enumerator: IEnumerator<number>;

        _checkEnumerable(enumerable, "TS.Linq.Extensions.min");

        if (enumerable.count() == 0)
        {
          throw new TS.Linq.EmptyEnumerableException(enumerable, "The argument 'enumerable' must not be an empty enumerable in function 'TS.Linq.Extensions.min'.");
        }//END if

        _tempMin = Number.MAX_VALUE;
        _enumerator = enumerable.getEnumerator();

        while (_enumerator.moveNext())
        {
          if (!TS.Utils.TypeInfo.isNumber(_enumerator.current))
          {
            _tempCurrent = _enumerator.current;
            _enumerator.dispose();
            throw new TS.InvalidTypeException("enumerable", _tempCurrent, "All elements in argument 'enumerable' must be of type 'number' in function 'TS.Linq.Extensions.min'.");
          }//END if

          if (_enumerator.current < _tempMin)
          {
            _tempMin = _enumerator.current;
          }//END if
        }//END while

        return _tempMin;
      }


      /**
      *  @description
      *    Sorts the elements of a sequence in ascending order according to a key.
      *
      *    Deferred execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.orderby.aspx | MSDN}
      *
      *  @returns
      *    Enumerable<TSource>, the resulting enumerable.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      */
      export function orderBy<TSource, U>(enumerable: Enumerable<TSource>, selector: (item: TSource) => U): OrderedEnumerable<TSource>
      /**
      *  @description
      *    Sorts the elements of a sequence in ascending order by using a specified comparer.
      *
      *    Deferred execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.orderby.aspx | MSDN}
      *
      *  @returns
      *    Enumerable<TSource>, the resulting enumerable.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException.
      */
      export function orderBy<TSource, U>(enumerable: Enumerable<TSource>, selector: (item: TSource) => U, comparer: (first: U, second: U) => number): OrderedEnumerable<TSource>
      export function orderBy<TSource, U>(enumerable: Enumerable<TSource>, selector: (item: TSource) => U, comparer?: (first: U, second: U) => number): OrderedEnumerable<TSource>
      {
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;
        var _checkFunctionParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkFunctionParameter;
        var _checkParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkParameter;

        var _callback: () => IEnumerator<TSource>;

        _checkEnumerable(enumerable, "TS.Linq.Extensions.orderBy");
        _checkFunctionParameter(selector, "selector", "TS.Linq.Extensions.orderBy");

        if (!TS.Utils.TypeInfo.isNullOrUndefined(comparer))
        {
          _checkFunctionParameter(comparer, "comparer", "TS.Linq.Extensions.orderBy");
        }//END if

        if (TS.Utils.TypeInfo.isNullOrUndefined(comparer))
        {
          //
          // Use the  default comparsion operator.
          //
          comparer = (_first, _second) => { if (_first < _second) { return -1; }; if (_first > _second) { return 1 }; return 0; };
        }//END if
        else
        {
          _checkFunctionParameter(comparer, "comparer", "TS.Linq.Extensions.orderBy");
        }//END else

        _callback = () => new ArrayEnumerator(enumerable.toArray().sort((first, second) => { var _first = selector(first); var _second = selector(second); return comparer(_first, _second); }));

        return new OrderedEnumerable<TSource>(_callback, selector, comparer);
      }


      /**
      *  @description
      *    Sorts the elements of a sequence in descending order according to a key.
      *
      *    Deferred execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.orderbydescending.aspx | MSDN}
      *
      *  @returns
      *    Enumerable<TSource>, the resulting enumerable.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      */
      export function orderByDescending<TSource, U>(enumerable: Enumerable<TSource>, selector: (item: TSource) => U): OrderedEnumerable<TSource>
      /**
      *  @description
      *    Sorts the elements of a sequence in descending order by using a specified comparer.
      *
      *    Deferred execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.orderbydescending.aspx | MSDN}
      *
      *  @returns
      *    Enumerable<TSource>, the resulting enumerable.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException.
      */
      export function orderByDescending<TSource, U>(enumerable: Enumerable<TSource>, selector: (item: TSource) => U, comparer: (first: U, second: U) => number): OrderedEnumerable<TSource>
      export function orderByDescending<TSource, U>(enumerable: Enumerable<TSource>, selector: (item: TSource) => U, comparer?: (first: U, second: U) => number): OrderedEnumerable<TSource>
      {
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;
        var _checkFunctionParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkFunctionParameter;
        var _checkParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkParameter;

        var _callback: () => IEnumerator<TSource>;

        _checkEnumerable(enumerable, "TS.Linq.Extensions.orderBy");
        _checkFunctionParameter(selector, "selector", "TS.Linq.Extensions.orderBy");

        if (!TS.Utils.TypeInfo.isNullOrUndefined(comparer))
        {
          _checkFunctionParameter(comparer, "comparer", "TS.Linq.Extensions.orderBy");
        }//END if

        if (TS.Utils.TypeInfo.isNullOrUndefined(comparer))
        {
          //
          // Use the  default comparsion operator.
          //
          comparer = (_first, _second) => { if (_first < _second) { return -1; }; if (_first > _second) { return 1 }; return 0; };
        }//END if
        else
        {
          _checkFunctionParameter(comparer, "comparer", "TS.Linq.Extensions.orderBy");
        }//END else

        _callback = () => new ArrayEnumerator(enumerable.toArray().sort((first, second) => { var _first = selector(first); var _second = selector(second); return -1 * comparer(_first, _second); }));

        return new OrderedEnumerable<TSource>(_callback, selector, comparer);
      }


      /**
      *  @description
      *    Retuns random elements from the base enumeration. 
      *    The function uses a generator to select the 
      *    current randome element. For that reason the 
      *    function will return as much elements as required, 
      *    regardless how much elments the underlying enumeration
      *    could offer. There is one exception of that rule.
      *    If the underlying enumeration is empty, the 
      *    random function will never give a result.
      *
      *    Limit the number of returned elements by calling
      *    a 'take' operator or some other limiting operator
      *    before you call 'toArray' after the random operator. 
      *    Otherwise you will run out fo memory.
      *
      *    This function uses the "TS.Linq.RandomGenerator" class
      *    which must be referenced in order to function normally. 
      *
      *    Deferred execution.
      *
      *  @requires
      *    TS.Linq.RandomGenerator
      *
      *  @returns
      *    TEnumerable<TSource>, the resulting enumerable.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException.
      */
      export function random<TSource>(enumerable: Enumerable<TSource>): Enumerable<TSource>
      {
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;

        var _callback: () => IEnumerator<TSource>;

        _checkEnumerable(enumerable, "TS.Linq.Extensions.random");

        _callback = () => new TS.Linq.RandomGenerator(enumerable.toArray());
        return new Enumerable<TSource>(_callback);
      }


      /**
      *  @description
      *    Generates a sequence of integral numbers within a specified range.
      *
      *    Immediate execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.range.aspx | MSDN}
      *
      *  @returns
      *    Enumerable<Number>, the resulting enumerable.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException
      *
      *  @throws
      *    TS.ArgumentOutOfRangeException
      */
      export function range(start: number, count: number) : Enumerable<Number>
      {
        var _checkParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkParameter;

        var _resultArray: Array<number>;
        var _index: number;

        _checkParameter(start, "start", "TS.Linq.Extensions.range");
        _checkParameter(count, "count", "TS.Linq.Extensions.range");


        if (!TS.Utils.TypeInfo.isNumber(start))
        {
          throw new TS.InvalidTypeException("start", count, "Argument 'start' has the wrong type in function 'TS.Linq.Extensions.range'.");
        }//END if

        if (!TS.Utils.TypeInfo.isNumber(count))
        {
          throw new TS.InvalidTypeException("count", count, "Argument 'count' has the wrong type in function 'TS.Linq.Extensions.range'.");
        }//END if

        if (!TS.Utils.TypeInfo.isPositiveIntegerNumber(count))
        {
          throw new TS.ArgumentOutOfRangeException("count", count, "Argument 'count' must be a positive integer number in function 'TS.Linq.Extensions.range'.");
        }//END if

        _resultArray = new Array<number>();

        for (_index = 0; _index < count; _index ++)
        {
          _resultArray.push(start + _index);
        }//END for

        return Extensions.fromArray(_resultArray);
      }


      /**
      *  @description
      *    Generates a sequence that contains one repeated value
      *    as often as specified in count.
      *
      *    Immediate execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/bb348899.aspx | MSDN}
      *
      *  @returns
      *    Enumerable<TSource>, the resulting enumerable.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException
      *
      *  @throws
      *    TS.ArgumentOutOfRangeException
      */
      export function repeat<TSource>(item: TSource, count: number): Enumerable<TSource>
      {
        var _checkParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkParameter;

        var _index = 0;
        var _resultArray: Array<TSource>;

        _checkParameter(item, "item", "TS.Linq.Extensions.repeat");

        if (!TS.Utils.TypeInfo.isNumber(count))
        {
          throw new TS.InvalidTypeException("count", count, "Argument 'count' has the wrong type in function 'TS.Linq.Extensions.repeat'.");
        }//END if

        if (!TS.Utils.TypeInfo.isPositiveIntegerNumber(count))
        {
          throw new TS.ArgumentOutOfRangeException("count", count, "Argument 'count' must be a positive integer number in function 'TS.Linq.Extensions.repeat'.");
        }//END if

        _resultArray = new Array<TSource>();
        while (_index < count)
        {
          _resultArray.push(item);
          _index++;
        }//END while

        return new ArrayEnumerable(_resultArray);
      }


      /**
      *  @description
      *    Inverts the order of the elements in a sequence.
      *
      *    Deferred execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/bb358497.aspx | MSDN}
      *
      *  @returns
      *    Enumerable<TSource>, the resulting enumerable.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException.
      */
      export function reverse<TSource>(enumerable: Enumerable<TSource>): Enumerable<TSource>
      {
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;

        var _callback: () => IEnumerator<TSource>;

        _checkEnumerable(enumerable, "TS.Linq.Extensions.reverse");

        _callback = () => new ArrayEnumerator(enumerable.toArray().reverse());

        return new Enumerable(_callback)
      }


      /**
      *  @description
      *    Projects each element of a sequence into a new form.
      *
      *    Deferred execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.select.aspx | MSDN}
      *
      *  @returns
      *    Enumerable<TSource>, the resulting enumerable.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException.
      *
      *  @throws
      *    TS.Linq.SelectorException. Thrown if the selector doesn't match with the source.
      *
      *  @throws
      *    TS.InvalidTypeException.
      */
      export function select<TSource, TResult>(enumerable: Enumerable<TSource>, selector: (item: TSource) => TResult): Enumerable<TResult>
      {
        var _checkFunctionParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkFunctionParameter;
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;
        var _checkParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkParameter;

        var _resultArray: Array<TResult>;
        var _selectorResult: TResult;
        var _callback: () => IEnumerator<TResult>;
        var _enumerator: IEnumerator<TSource>;
        var _tempCurrent: any;



        _checkEnumerable(enumerable, "TS.Linq.Extensions.select");
        _checkParameter(selector, "selector", "TS.Linq.Extensions.select");
        _checkFunctionParameter(selector, "selector", "TS.Linq.Extensions.select");

        _enumerator = enumerable.getEnumerator();

        _callback = () =>
        {
          _resultArray = new Array<any>();
          _enumerator = enumerable.getEnumerator();

          while (_enumerator.moveNext())
          {
            _selectorResult = selector(_enumerator.current);

            if (TS.Utils.TypeInfo.isUndefined(_selectorResult))
            {
              _tempCurrent = _enumerator.current;
              _enumerator.dispose();
              throw new TS.Linq.SelectorException(selector, _tempCurrent, "The selector: '" + selector.toString() + "' failed in function 'TS.Linq.Extensions.select' on item: '" + _tempCurrent.toString() + "'.");
            }//END if

            _resultArray.push(_selectorResult);
          }//END while

          _enumerator.dispose();
          return new ArrayEnumerator<TResult>(_resultArray);
        };

        return new Enumerable<TResult>(_callback);
      }


      /**
      *  @description
      *    Projects each element of a sequence to an IEnumerable<T> and flattens 
      *    the resulting sequences into one sequence
      *
      *    Deferred execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.selectmany.aspx | MSDN}
      *
      *  @returns
      *    Enumerable<TSource>, the resulting enumerable.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.Linq.SelectorException. Thrown if the selector doesn't match with the source.
      *
      *  @throws
      *    TS.InvalidTypeException.
      */
      export function selectMany<TSource, TResult>(enumerable: Enumerable<TSource>, selector: (item: TSource) => Array<TResult>): Enumerable<TResult>
      {
        var _checkFunctionParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkFunctionParameter;
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;
        var _checkParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkParameter;

        var _callback: () => IEnumerator<TResult>;
        var _enumerator: IEnumerator<TSource>;
        var _resultArray: Array<TResult>;
        var _selectorResult: Array<TResult>;
        var _tempCurrent: any;


        _checkEnumerable(enumerable, "TS.Linq.Extensions.selectMany");
        _checkParameter(selector, "selector", "TS.Linq.Extensions.selectMany");
        _checkFunctionParameter(selector, "selector", "TS.Linq.Extensions.selectMany");

        _callback = () =>
        {
          _resultArray = new Array<TResult>();
          _enumerator = enumerable.getEnumerator();

          while (_enumerator.moveNext())
          {
            _selectorResult = selector(_enumerator.current);

            if (TS.Utils.TypeInfo.isUndefined(_selectorResult))
            {
              _tempCurrent = _enumerator.current;
              _enumerator.dispose();
              throw new TS.Linq.SelectorException(selector, _tempCurrent, "The selector: '" + selector.toString() + "' failed in function 'TS.Linq.Extensions.selectMany' on item: '" + _tempCurrent.toString() + "'.");
            }//END if

            _resultArray = _resultArray.concat(_selectorResult);
          }//END while
          _enumerator.dispose();
          return new ArrayEnumerator<TResult>(_resultArray);
        }//END callback

        return new Enumerable<TResult>(_callback);
      }


      /**
      *  @description
      *    Determines whether two sequences are equal by comparing the elements 
      *    by using the default equality comparer (===).
      *
      *    Immediate execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.sequenceequal.aspx | MSDN}
      *
      *  @returns
      *    Boolean
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException.
      */
       export function sequenceEqual<TSource>(firstEnumerable: Enumerable<TSource>, secondEnumerable: Enumerable<TSource>): boolean
      /**
      *  @description
      *    Determines whether two sequences are equal by comparing their 
      *    elements by using a specified equalityComparer.
      *
      *    Immediate execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.sequenceequal.aspx | MSDN}
      *
      *  @returns
      *    Boolean
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException.
      */
      export function sequenceEqual<TSource>(firstEnumerable: Enumerable<TSource>, secondEnumerable: Enumerable<TSource>, equalityComparer: (first: TSource, second: TSource) => boolean): boolean
      export function sequenceEqual<TSource>(firstEnumerable: Enumerable<TSource>, secondEnumerable: Enumerable<TSource>, equalityComparer?: (first: TSource, second: TSource) => boolean): boolean
      {
        var _checkFunctionParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkFunctionParameter;
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;
        var _checkParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkParameter;

        var _firstEnumerator: IEnumerator<TSource>;
        var _secondEnumerator: IEnumerator<TSource>;

        _checkEnumerable(firstEnumerable, "TS.Linq.Extensions.sequenceEqual");
        _checkEnumerable(secondEnumerable, "TS.Linq.Extensions.sequenceEqual");

        if (!TS.Utils.TypeInfo.isNullOrUndefined(equalityComparer))
        {
          _checkFunctionParameter(equalityComparer, "equalityComparer", "TS.Linq.Extensions.sequenceEqual");
        }//END if
        else
        {
          equalityComparer = (first, second) => first === second;
        }//END else

        _firstEnumerator = firstEnumerable.getEnumerator();
        _secondEnumerator = secondEnumerable.getEnumerator();

        while (_firstEnumerator.moveNext())
        {
          if (!(_secondEnumerator.moveNext() && equalityComparer(_firstEnumerator.current, _secondEnumerator.current)))
          {
            _firstEnumerator.dispose();
            _secondEnumerator.dispose();
            return false;
          }//END if
        }//END while
        if (_secondEnumerator.moveNext())
        {
          _firstEnumerator.dispose();
          _secondEnumerator.dispose();
          return false;
        }//END if

        return true;
      }


      /**
      *  @description
      *    Returns the only element of a sequence, and throws an exception 
      *    if there is not exactly one element in the sequence.
      * 
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.single.aspx : MSDN }
      *
      *  @returns
      *    TSource, the result element.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException.
      *
      *  @throws
      *    TS.InvalidOperationException
      *
      *  @throws
      *    TS.Linq.MoreThanOneElementException
      */
      export function single<TSource>(enumerable: Enumerable<TSource>): TSource
      /**
      *  @description
      *    Returns the only element of a sequence that satisfies a specified condition, 
      *    and throws an exception if more than one such element exists.
      * 
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.single.aspx : MSDN }
      *
      *  @returns
      *    TSource, the result element.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException.
      *
      *  @throws
      *    TS.InvalidOperationException
      *
      *  @throws
      *    TS.Linq.MoreThanOneElementException
      */
      export function single<TSource>(enumerable: Enumerable<TSource>, predicate: (item: TSource) => boolean): TSource
      export function single<TSource>(enumerable: Enumerable<TSource>, predicate?: (item: TSource) => boolean): TSource
      {
        var _enumerator: IEnumerator<TSource>;
        var _tempCurrent: any;
        var _gotOne: boolean;

        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;
        var _checkFunctionParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkFunctionParameter;


        if (!TS.Utils.TypeInfo.isNullOrUndefined(predicate))
        {
          _checkFunctionParameter(predicate, "predicate", "TS.Linq.Extensions.single");
        }//END if
        else
        {
          predicate = (item) => true;
        }//END else

        _checkEnumerable(enumerable, "TS.Linq.Extensions.single");

        _enumerator = enumerable.getEnumerator();
        _gotOne = false;

        while (_enumerator.moveNext())
        {
          if (predicate(_enumerator.current))
          {
            if (!_gotOne)
            {
              _tempCurrent = _enumerator.current;
              _gotOne = true;
            }//END if
            else
            {
              _enumerator.dispose();
              throw new TS.Linq.MoreThanOneElementException(enumerable, "The 'enumerable' must only have one result element in function 'TS.Linq.Extensions.single'.");
            }//END else
          }//END if
        }//END while

        if (!_gotOne)
        {
          throw new TS.InvalidOperationException("The'enumerable' is either empty or has no matche with the given predicate in function 'TS.Linq.Extensions.single'.");
        }//END if

        return _tempCurrent;
      }


      /**
      *  @description
      *    Returns the only element of a sequence, or a default value if the sequence is empty. This method throws an 
      *    exception if there is more than one element in the sequence.
      * 
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.singleordefault.aspx : MSDN }
      *
      *  @returns
      *    TSource, the result element.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException.
      *
      *  @throws
      *    TS.Linq.MoreThanOneElementException
      */
      export function singleOrDefault<TSource>(enumerable: Enumerable<TSource>, defaultConstructor: { new (): TSource; }): TSource
      /**
      *  @description
      *    Returns the only element of a sequence that satisfies a specified condition or a default value 
      *    if no such element exists, This method throws an exception if more than one element satisfies the condition.
      * 
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.singleordefault.aspx : MSDN }
      *
      *  @returns
      *    TSource, the result element.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException.
      *
      *  @throws
      *    TS.Linq.MoreThanOneElementException
      */
      export function singleOrDefault<TSource>(enumerable: Enumerable<TSource>, defaultConstructor: { new (): TSource; }, predicate: (item: TSource) => boolean): TSource
      export function singleOrDefault<TSource>(enumerable: Enumerable<TSource>, defaultConstructor: { new (): TSource; }, predicate?: (item: TSource) => boolean): TSource
      {
        var _enumerator: IEnumerator<TSource>;
        var _tempCurrent: any;
        var _gotOne: boolean;

        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;
        var _checkConstructor: (constructorToCheck: any, paramName: string, functionName: string) => void = checkConstructor;
        var _checkFunctionParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkFunctionParameter;

        _checkEnumerable(enumerable, "TS.Linq.Extensions.singleOrDefault");
        _checkConstructor(defaultConstructor, "defaultConstructor", "TS.Linq.Extensions.singleOrDefault");

        if (!TS.Utils.TypeInfo.isNullOrUndefined(predicate))
        {
          _checkFunctionParameter(predicate, "predicate", "TS.Linq.Extensions.singleOrDefault");
        }//END if
        else
        {
          predicate = (item) => true;
        }//END else

        _enumerator = enumerable.getEnumerator();
        _gotOne = false;

        while (_enumerator.moveNext())
        {
          if (predicate(_enumerator.current))
          {
            if (!_gotOne)
            {
              _tempCurrent = _enumerator.current;
              _gotOne = true;
            }//END if
            else
            {
              _enumerator.dispose();
              throw new TS.Linq.MoreThanOneElementException(enumerable, "The 'enumerable' must only have one result element in function 'TS.Linq.Extensions.singleOrDefault'.");
            }//END else
          }//END if
        }//END while

        if (!_gotOne)
        {
          return new defaultConstructor();
        }//END if

        return _tempCurrent;
      }

      /**
      *  @description
      *    Computes the sum of a sequence of numeric values.
      *
      *    Immediate execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.sum.aspx | MSDN}
      *
      *  @returns
      *    number, the result value.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.Linq.EmptyEnumerableException.
      *
      *  @throws
      *    TS.InvalidTypeException.
      *
      *  @throws
      *    TS.OverflowException
      */
      export function sum(enumerable: Enumerable<number>): number
      {
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;
        var _checkParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkParameter;

        var _sum = 0;
        var _count = 0;
        var _enumerator: IEnumerator<number>;
        var _tempCurrent: any;
        var _movedOnce: boolean;

        _checkEnumerable(enumerable, "TS.Linq.Extensions.sum");

        _enumerator = enumerable.getEnumerator();
        _movedOnce = false;

        while (_enumerator.moveNext())
        {
          _movedOnce = true;
          if (!TS.Utils.TypeInfo.isNumber(_enumerator.current))
          {
            _tempCurrent = _enumerator.current;
            _enumerator.dispose();
            throw new TS.InvalidTypeException("enumerable", _tempCurrent, "All elements in argument 'enumerable' must be of type 'number' in function 'TS.Linq.Extensions.sum'.");
          }//END if

          _sum += _enumerator.current;

          if (_sum < -Number.MAX_VALUE || _sum > Number.MAX_VALUE)
          {
            _enumerator.dispose();
            throw new TS.OverflowException("An overflow occured in function 'TS.Linq.Extensions.sum'.");
          }//END if
        }//END while

        if (!_movedOnce)
        {
          throw new TS.Linq.EmptyEnumerableException(enumerable, "The argument 'enumerable' must not be an empty enumerable in function 'TS.Linq.Extensions.sum'.");
        }//END if

        return _sum;
      }


      /**
      *  @description
      *    Returns a shuffled version from the enumerable given in argument enumerable.
      *    That means, the resulting enumerable has exact the same elements as the 
      *    input enumerable but in a randomized order.
      *
      *    Deferred execution.
      *
      *  @see {@link http://www.dotnetperls.com/fisher-yates-shuffle}
      *
      *  @returns
      *    Enumerable<TSource>, the resulting enumerable.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException
      */
      export function shuffle<TSource>(enumerable: Enumerable<TSource>): Enumerable<TSource>
      {
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;

        var _callback: () => IEnumerator<TSource>;
        var _sourceArr: Array<TSource>;
        var _resultArr: Array<TSource>;
        var _index: number;

        _checkEnumerable(enumerable, "TS.Linq.Extensions.shuffle");

        _callback = () => 
        {
          _sourceArr = enumerable.toArray();
          _resultArr = new Array<TSource>();

          while (_sourceArr.length > 0)
          {
            do
            {
              _index = Math.floor(Math.random() * _sourceArr.length);
            } while (_index >= _sourceArr.length);

            _resultArr.push(_sourceArr[_index]);
            delete _sourceArr[_index];
            _sourceArr = TS.Utils.compactArray(_sourceArr);
          }//END while

          _sourceArr = null;
          return new ArrayEnumerator<TSource>(_resultArr);
        }

        return new Enumerable<TSource>(_callback);
      }


      /**
      *  @description
      *    Bypasses a specified number of elements in a sequence and 
      *    returns the remaining elements.
      *
      *    Deferred execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/bb358985.aspx | MSDN}
      *
      *  @returns
      *    Enumerable<TSource>, the resulting enumerable.
      *
      *  @throws
      *    TS.ArgumentOutOfRangeException. Thrown in case where the 
      *    argument 'count' is invalid.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException
      */
      export function skip<TSource>(enumerable: Enumerable<TSource>, count: number): Enumerable<TSource>
      {
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;

        var _index = 0;
        var _resultArray: Array<TSource>;
        var _callback: () => IEnumerator<TSource>;
        var _enumerator: IEnumerator<TSource>


        _checkEnumerable(enumerable, "TS.Linq.Extensions.skip");

        if (!TS.Utils.TypeInfo.isNumber(count))
        {
          throw new TS.InvalidTypeException("count", count, "Argument 'count' has the wrong type in function 'TS.Linq.Extensions.skip'.");
        }//END if

        if (!TS.Utils.TypeInfo.isPositiveIntegerNumber(count))
        {
          throw new TS.ArgumentOutOfRangeException("count", count, "Argument 'count' must be a positive integer number in function 'TS.Linq.Extensions.skip'.");
        }//END if

        _enumerator = enumerable.getEnumerator();

        _callback = () =>
        {
          _resultArray = new Array<TSource>();
          _enumerator = enumerable.getEnumerator();

          while (_enumerator.moveNext())
          {
            if (_index++ < count)
            {
              continue;
            }//END while

            _resultArray.push(_enumerator.current);

          }//END while

          _enumerator.dispose();
          return new ArrayEnumerator(_resultArray);
        }

        return new Enumerable<TSource>(_callback);
      }


      /**
      *  @description
      *    Bypasses elements in a sequence as long as a specified condition 
      *    is true and then returns the remaining elements.
      *
      *    Deferred execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.skipwhile.aspx | MSDN}
      *
      *  @returns
      *    Enumerable<TSource>, the resulting enumerable.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException
      */
      export function skipWhile<TSource>(enumerable: Enumerable<TSource>, predicate: (item: TSource) => boolean): Enumerable<TSource>
      {
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;
        var _checkFunctionParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkFunctionParameter;
        var _checkParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkParameter;

        var _resultArray: Array<TSource>;
        var _callback: () => IEnumerator<TSource>;
        var _enumerator: IEnumerator<TSource>


        _checkEnumerable(enumerable, "TS.Linq.Extensions.skipWhile");
        _checkParameter(predicate, "predicate", "TS.Linq.Extensions.skipWhile");
        _checkFunctionParameter(predicate, "predicate", "TS.Linq.Extensions.skipWhile");

        _enumerator = enumerable.getEnumerator();

        _callback = () => 
        {
          _resultArray = new Array<TSource>();
          _enumerator = enumerable.getEnumerator();

          while (_enumerator.moveNext())
          {
            if ((_resultArray.length == 0) && predicate(_enumerator.current))
            {
              continue;
            }//END if

            _resultArray.push(_enumerator.current);
          }//END while

          _enumerator.dispose();
          return new ArrayEnumerator<TSource>(_resultArray);
        };

        return new Enumerable(_callback);
      }


      /**
      *  @description
      *    Returns a specified number of contiguous elements from the 
      *    start of a sequence.
      *
      *    Deffered execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/bb503062.aspx | MSDN}
      *
      *  @returns
      *    Enumerable<TSource>, the resulting enumerable.
      *
      *  @throws
      *    TS.ArgumentOutOfRangeException. Thrown in case where the 
      *    argument 'count' is invalid.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException
      */
      export function take<TSource>(enumerable: Enumerable<TSource>, count: number): Enumerable<TSource>
      {
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;
        var _checkParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkParameter;

        var _resultArray: Array<TSource>;
        var _callback: () => IEnumerator<TSource>;
        var _index = 0;
        var _enumerator: IEnumerator<TSource>
        var _arrayEnumerable: Enumerable<TSource>

        _checkEnumerable(enumerable, "TS.Linq.Extensions.take");

        if (!TS.Utils.TypeInfo.isNumber(count))
        {
          throw new TS.InvalidTypeException("count", count, "Argument 'count' has the wrong type in function 'TS.Linq.Extensions.take'.");
        }//END if

        if (!TS.Utils.TypeInfo.isPositiveIntegerNumber(count))
        {
          throw new TS.ArgumentOutOfRangeException("count", count, "Argument 'count' must be a positive integer number in function 'TS.Linq.Extensions.take'.");
        }//END if

        _callback = () => 
        {
          _enumerator = enumerable.getEnumerator();
          _index = 0;
          _resultArray = new Array<TSource>();

          while (_enumerator.moveNext())
          {

            if (_index++ < count)
            {
              _resultArray.push(_enumerator.current);
              continue;
            }//END if

            break;
          }//END while

          _enumerator.dispose();
          return new ArrayEnumerator(_resultArray);
        }

        return new Enumerable(_callback);
      }


      /**
      *  @description
      *    Returns elements from a sequence as long as a specified condition is true. 
      *
      *    Deffered execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.takewhile.aspx | MSDN}
      *
      *  @returns
      *    Enumerable<TSource>, the resulting enumerable.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException
      */
      export function takeWhile<TSource>(enumerable: Enumerable<TSource>, predicate: (item: TSource) => boolean): Enumerable<TSource>
      {
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;
        var _checkFunctionParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkFunctionParameter;
        var _checkParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkParameter;

        var _resultArray: Array<TSource>;
        var _callback: () => IEnumerator<TSource>;
        var _enumerator: IEnumerator<TSource>

        _checkEnumerable(enumerable, "TS.Linq.Extensions.takeWhile");
        _checkParameter(predicate, "predicate", "TS.Linq.Extensions.takeWhile");
        _checkFunctionParameter(predicate, "predicate", "TS.Linq.Extensions.takeWhile");

        _callback = () => 
        {
          _resultArray = new Array<TSource>();
          _enumerator = enumerable.getEnumerator();

          while (_enumerator.moveNext())
          {
            if (predicate(_enumerator.current))
            {
              _resultArray.push(_enumerator.current);
            }//END if
            else
            {
              break;
            }//END else
          }

          _enumerator.dispose();
          return new ArrayEnumerator(_resultArray);
        }

        return new Enumerable(_callback);
      }


      /**
      *  @description
      *    Casts the 'enumerable' to an array.
      *
      *    Immediate execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/bb298736 | MSDN}
      *
      *  @returns
      *    Array<TSource>, the resulting array.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException
      */
      export function toArray<TSource>(enumerable: Enumerable<TSource>): Array<TSource>
      {
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;

        var _resultArray: Array<TSource>;
        var _enumerator: IEnumerator<TSource>

        _checkEnumerable(enumerable, "TS.Linq.Extensions.toArray");

        _resultArray = new Array<TSource>();
        _enumerator = enumerable.getEnumerator();

        while (_enumerator.moveNext())
        {
          _resultArray.push(_enumerator.current);
        }//END while

        _enumerator.dispose();

        return _resultArray;
      }


      /**
      *  @description
      *    Performs a subsequent ordering of the elements in a sequence in ascending order.
      *
      *    Deferred execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.thenby.aspx | MSDN}
      *
      *  @returns
      *    OrderedEnumerable<TSource>, the resulting ordered enumerable.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException
      */
      export function thenBy<TSource, TKey>(enumerable: OrderedEnumerable<TSource>, selector: (item: TSource) => TKey, comparer?: (first: TKey, second: TKey) => number): OrderedEnumerable<TSource>
      {
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;
        var _checkFunctionParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkFunctionParameter;

        var _callback: () => IEnumerator<TSource>;
        var _partitionedEnumerator: IEnumerator<TSource>;
        var _bufferArray: Array<TSource>;
        var _resultArray: Array<TSource>;

        _checkEnumerable(enumerable, "TS.Linq.Extensions.thenBy");
        _checkFunctionParameter(selector, "selector", "TS.Linq.Extensions.thenBy");


        if (TS.Utils.TypeInfo.isNullOrUndefined(enumerable.getPartitionEnumerator))
        {
          throw new TS.InvalidTypeException("enumerable", enumerable, "Argument enumerable must be of type 'IOrderedEnumerable' in function 'TS.Linq.Extensions.thenBy'.");
        }//END if

        if (TS.Utils.TypeInfo.isNullOrUndefined(comparer))
        {
          //
          // Use the  default comparsion operator.
          //
          comparer = (_first, _second) => { if (_first < _second) { return -1; }; if (_first > _second) { return 1 }; return 0; };
        }//END if
        else
        {
          _checkFunctionParameter(comparer, "comparer", "TS.Linq.Extensions.thenBy");
        }//END else

        _callback = () =>
        {

          _resultArray = new Array<TSource>();

          while (true)
          {
            _bufferArray = new Array<TSource>();
            _partitionedEnumerator = enumerable.getPartitionEnumerator();
            if (_partitionedEnumerator == null)
            {
              break;
            }//END if

            while (_partitionedEnumerator.moveNext())
            {
              _bufferArray.push(_partitionedEnumerator.current);
            }//END while

            _bufferArray.sort((first, second) => { var _first = selector(first); var _second = selector(second); return comparer(_first, _second); });

            _resultArray = _resultArray.concat(_bufferArray);

          }//END while

          return new ArrayEnumerator(_resultArray);
        }

        return new OrderedEnumerable<TSource>(_callback, selector, comparer);
      }


      /**
      *  @description
      *    Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
      *
      *    Deferred execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.thenbydescending.aspx | MSDN}
      *
      *  @returns
      *    OrderedEnumerable<TSource>, the resulting ordered enumerable.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException
      */
      export function thenByDescending<TSource, TKey>(enumerable: OrderedEnumerable<TSource>, selector: (item: TSource) => TKey, comparer?: (first: TKey, second: TKey) => number): OrderedEnumerable<TSource>
      {
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;
        var _checkFunctionParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkFunctionParameter;

        var _callback: () => IEnumerator<TSource>;
        var _partitionedEnumerator: IEnumerator<TSource>;
        var _bufferArray: Array<TSource>;
        var _resultArray: Array<TSource>;

        _checkEnumerable(enumerable, "TS.Linq.Extensions.thenByDescending");
        _checkFunctionParameter(selector, "selector", "TS.Linq.Extensions.thenByDescending");

        if (TS.Utils.TypeInfo.isNullOrUndefined(enumerable.getPartitionEnumerator))
        {
          throw new TS.InvalidTypeException("enumerable", enumerable, "Argument enumerable must be of type 'IOrderedEnumerable' in function 'TS.Linq.Extensions.thenByDescending'.");
        }//END if

        if (TS.Utils.TypeInfo.isNullOrUndefined(comparer))
        {
          //
          // Use the  default comparsion operator.
          //
          comparer = (_first, _second) => { if (_first < _second) { return -1; }; if (_first > _second) { return 1 }; return 0; };
        }//END if
        else
        {
          _checkFunctionParameter(comparer, "comparer", "TS.Linq.Extensions.thenByDescending");
        }//END else

        _callback = () =>
        {

          _resultArray = new Array<TSource>();

          while (true)
          {
            _bufferArray = new Array<TSource>();
            _partitionedEnumerator = enumerable.getPartitionEnumerator();
            if (_partitionedEnumerator == null)
            {
              break;
            }//END if

            while (_partitionedEnumerator.moveNext())
            {
              _bufferArray.push(_partitionedEnumerator.current);
            }//END while

            _bufferArray.sort((first, second) => { var _first = selector(first); var _second = selector(second); return comparer(_first, _second); });

            _bufferArray.reverse();

            _resultArray = _resultArray.concat(_bufferArray);

          }//END while

          return new ArrayEnumerator(_resultArray);
        }

        return new OrderedEnumerable<TSource>(_callback, selector, comparer);
      }


      /**
      *  @description
      *    Produces the set union of two sequences by using the strict 
      *    comparsion operator (===).
      *    This function may produce results that differ from the C# counterpart,
      *    because the comparsion operators have different implementations in C#
      *    and javascript.
      *
      *    Deferred execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.union.aspx | MSDN}
      *
      *  @returns
      *    Enumerable<TSource>, the resulting enumerable.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException
      */
      export function union<TSource>(firstEnumerable: Enumerable<TSource>, secondEnumerable: Enumerable<TSource>): Enumerable<TSource>
      {
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;

        var _index: number;
        var _enumerator: IEnumerator<TSource>;
        var _resultArray: Array<TSource>;
        var _callback: () => IEnumerator<TSource>;

        _checkEnumerable(firstEnumerable, "TS.Linq.Extensions.union");
        _checkEnumerable(secondEnumerable, "TS.Linq.Extensions.union");

        _callback = () => 
        {
          _enumerator = firstEnumerable.getEnumerator();
          _resultArray = new Array<TSource>();

          while (_enumerator.moveNext())
          {
            _resultArray.push(_enumerator.current);
          }//END while

          _enumerator.dispose();
          _enumerator = secondEnumerable.getEnumerator();

          while (_enumerator.moveNext())
          {
            for (_index = 0; _index < _resultArray.length; _index++)
            {
              if (_resultArray[_index] === _enumerator.current)
              {
                continue;
              }//END if
            }//END for
            _resultArray.push(_enumerator.current);
          }//END while

          _enumerator.dispose();
          return new ArrayEnumerator(_resultArray);
        }

        return new Enumerable<TSource>(_callback);
      }


      /**
      *  @description
      *    Filters a sequence of values based on a predicate.
      *
      *    Deferred execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.where.aspx | MSDN}
      *
      *  @returns
      *    Enumerable<TSource>, the resulting enumerable.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException
      */
      export function where<TSource>(enumerable: Enumerable<TSource>, predicate: (item: TSource) => boolean): Enumerable<TSource>
      {
        var _checkEnumerable: (enumerable: Enumerable<any>, functionName: string) => void = checkEnumerable;
        var _checkFunctionParameter: (paramToCheck: any, paramName: string, functionName: string) => void = checkFunctionParameter;

        var _resultArray: Array<TSource>;
        var _enumerator: IEnumerator<TSource>;
        var _callback: () => IEnumerator<TSource>;

        _checkEnumerable(enumerable, "TS.Linq.Extensions.where");
        _checkFunctionParameter(predicate, "predicate", "TS.Linq.Extensions.where");

        _callback = () =>
        {
          _enumerator = enumerable.getEnumerator();
          _resultArray = new Array<TSource>();

          while (_enumerator.moveNext())
          {
            if (predicate(_enumerator.current))
            {
              _resultArray.push(_enumerator.current);
            }//END if
          }

          _enumerator.dispose();
          return new ArrayEnumerator(_resultArray);
        };

        return new Enumerable<TSource>(_callback);
      }

    }//END module
  }//END module
}//END module 