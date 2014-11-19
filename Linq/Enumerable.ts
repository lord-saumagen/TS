//
//Requires:
// TS.Exception,
// TS.Linq.Exception
// TS.Linq.Extensions
// TS.Utils.TypeInfo
//

module TS
{
  "use strict";

  export module Linq
  {

    /**
    * @class
    * @classdesc 
    *    This is the base implementation of the 'IEnumerable<T>'
    *    interface. The class implements wrappers to the most
    *    common standard query operators in LINQ.
    *    The operators are defined in file 'Extensions.ts' and 
    *    are assigned to the Enumerable. 
    *    They behave much like there counterparts in C# but
    *    some are not available because of the limitations
    *    of javascript and some may behave differently for
    *    the same reason.
    *
    *    Take a look at the link below for a list of C# standard LINQ operators.
    *
    *  @see {@link http://msdn.microsoft.com/en-us/library/bb397896.aspx | MSDN}
    *    
    *
    *    The following LINQ operators are not implemented because of 
    *    the restrictions of the javascript language.
    *
    *      AsEnumerable<TSource>
    *      Cast<TResult>
    */
    export class Enumerable<T> implements IEnumerable<T>
    {
      private _callback: () => IEnumerator<T>;

      /**
      * @constructs
      *    The constructor takes a callback function which returns 
      *    an instance of 'IEnumerator<T>' as it's only parameter.
      *    That callback is used to get the iterator for the underlying
      *    data source. 
      */
      constructor(callback: () => IEnumerator<T>)
      {
        if (TS.Utils.TypeInfo.isNullOrUndefined(callback))
        {
          throw new ArgumentNullOrUndefinedException("callback", "Argument 'callback' must not be null or undefined in the constructor of 'Enumerable'.");
        }//END if

        this._callback = callback;
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
      public aggregate(accumulator: (first: T, second: T) => T): T
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
      *    TS.Linq.EmptyEnumerableException
      *
      *  @throws
      *    TS.InvalidTypeException.
      */
      public aggregate<TSource, TAccumulate>(accumulator: (first: TAccumulate, second: TSource) => TAccumulate, seed: TAccumulate): TAccumulate
      public aggregate<TSource, TAccumulate>(accumulator: (first: TAccumulate, second: TSource) => TAccumulate, seed?: any): TAccumulate
      {
        return Extensions.aggregate(this, accumulator, seed);
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
      public all(predicate: (item: T) => boolean): boolean
      {
        return Extensions.all(this, predicate);
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
      public any(predicate: (item: T) => boolean): boolean
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
      public any(): boolean
      public any(predicate?: (item: T) => boolean): boolean
      {
        return Extensions.any(this, predicate);
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
      *    TS.Linq.EmptyEnumerableException
      *
      *  @throws
      *    TS.InvalidTypeException
      *
      *  @throws
      *    TS.OverflowException
      */
      public average(): number
      {
        var _numberArray: Array<number>;
        var _enumerator: IEnumerator<T>;

        if (this.count() == 0)
        {
          throw new TS.Linq.EmptyEnumerableException(this, "The LINQ operation 'average' is not applicable on empty enumerables'.");
        }//END if

        _enumerator = this.getEnumerator();
        _numberArray = new Array<number>()

        while (_enumerator.moveNext())
        {
          if (!TS.Utils.TypeInfo.isNumber(_enumerator.current))
          {
            _enumerator.dispose();
            throw new TS.InvalidTypeException("this", this, "The LINQ operation 'average' is only applicable on enumerables of type 'Enumerable<number>'.");
          }//END if
          _numberArray.push(Number(_enumerator.current));
        }//END while

        _enumerator.dispose();

        return Extensions.average(Enumerable.fromArray(_numberArray));
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
      *    Enumerable<T>, the concatenated sequences.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      */
      public concat(enumerable: Enumerable<T>): Enumerable<T>
      {
        return Extensions.concat(this, enumerable);
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
      *  @returns
      *    boolen, true if the 'enumerable' contains the given 'element',
      *    otherwise false.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      */
      public contains(element: T): boolean
      /**
      *  @description
      *    Determines whether a sequence contains a specified element 
      *    by using a specified equalityComparer<T>. 
      *
      *    Immediate execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.contains.aspx | MSDN}
      *
      *  @returns
      *    boolen, true if the 'enumerable' contains the given 'element',
      *    otherwise false.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      */
      public contains(element: T, equalityComparer: (first: T, second: T) => boolean): boolean
      public contains(element: T, equalityComparer?: (first: T, second: T) => boolean): boolean
      {
        if (equalityComparer == null)
        {
          return Extensions.contains(this, element);
        }//END if
        else
        {
          return Extensions.contains(this, element, equalityComparer);
        }//END else
      }


      /**
      *  @description
      *    Returns the number of elements in a sequence.
      *
      *    If argument 'predicate' is provided:
      *
      *    Returns a number that represents how many elements in the specified sequence satisfy a condition.
      *
      *    Immediate execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.count.aspx | MSDN}
      *
      *  @returns
      *    number, the number of elements in the enumerable.
      *
      */
      public count(predicate?: (item: T) => boolean): number
      {
        return Extensions.count(this, predicate);
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
      *    Attention:
      *    Use this function with a subsequent call to
      *    'take' to limit the output or you will run out 
      *    of memeory.
      *
      *    Deferred execution.
      *
      *  @returns
      *    Enumerable<TSource>, the result enumerable.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException.
      */
      public cycle()
      {
        return Extensions.cycle(this);
      }


      /**
      *  @description
      *    Returns the elements of an Enumerable<T>, or a default valued singleton collection if the sequence is empty.
      *
      *    Deferred execution.
      *
      *    That function differs from the .NET counterpart in that way that is has a 
      *    'defaultConstructor' in the singnature. That argument is needed because
      *    javascript doesn't offer reflection or a type system which you can rely on
      *    at runtime.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.defaultifempty.aspx | MSDN}
      *
      *  @retuns
      *   Enumerable<T>, the result enumerable.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      */
      public defaultIfEmpty(defaultConstructor: { new (): T; }): Enumerable<T>
      {
        return Extensions.defaultIfEmpty(this, defaultConstructor);
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
      *   Enumerable<T>, the result enumerable.
      *
      */
      public distinct(): Enumerable<T>
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
      *   Enumerable<T>, the result enumerable.
      *
      */
      public distinct(equalityComparer: (first: T, second: T) => boolean): Enumerable<T>
      public distinct(equalityComparer?: (first: T, second: T) => boolean): Enumerable<T>
      {
        if (equalityComparer == null)
        {
          return Extensions.distinct(this);
        }//END if
        return Extensions.distinct(this, equalityComparer);
      }


      /**
      *  @description
      *    Returns the element at a specified index in a sequence.
      *
      *    Immediate execution.
      *
      *  @see {@link http://referencesource.microsoft.com/#System.Core/System/Linq/Enumerable.cs | MSDN}
      *
      *  @retuns
      *   T, the result elemement.
      *
      *  @throws
      *    TS.ArgumentOutOfRangeException
      *
      *  @throws
      *    TS.IndexOutOfRangeException
      */
      public elementAt(index: number): T
      {
        return Extensions.elementAt(this, index);
      }


      /**
      *  @description
      *    Returns the element at a specified index in a sequence or 
      *    a default value if the index is out of range.
      *
      *    Immediate execution.
      *
      *    That function differs from the .NET counterpart in that way that is has a 
      *    'defaultConstructor' in the singnature. That argument is needed because
      *    javascript doesn't offer reflection or a type system which you can rely on
      *    at runtime.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/bb494386.aspx | MSDN}
      *
      *  @retuns
      *   T, the result elemement.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.ArgumentOutOfRangeException
      *
      */
      public elemementAtOrDefault(index: number, defaultConstructor: { new (): T }): T
      {
        return Extensions.elementAtOrDefault(this, index, defaultConstructor);
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
      public static empty<T>(): Enumerable<T>
      {
        return Extensions.empty<T>();
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
      *    Enumerable<T>, the resulting enumerable.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      */
      public except(otherEnumerable: Enumerable<T>): Enumerable<T>
      /**
      *  @description
      *    Produces the set difference of two sequences by using the specified
      *    equalityComparer<T> to compare values.
      *
      *    Deferred execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.except.aspx | MSDN}
      *
      *  @retuns
      *    Enumerable<T>, the resulting enumerable.
      *
      *  @throws
      *    TS.ArgumentNullOrUndefinedException
      *
      */
      public except(otherEnumerable: Enumerable<T>, equalityComparer: <T>(first: T, second: T) => boolean): Enumerable<T>
      public except(otherEnumerable: Enumerable<T>, equalityComparer?: <T>(first: T, second: T) => boolean): Enumerable<T>
      {
        return Extensions.except(this, otherEnumerable, equalityComparer);
      }


      /**
      *  @description
      *    Returns the first element of a sequence.
      *
      *    If the predicate is provided:
      *
      *    Returns the first element in a sequence that satisfies the specified condition.
      *
      *    Immediate execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.first.aspx | MSDN}
      *
      *  @returns
      *     T, the result element.
      *
      *  @throws
      *     TS.Linq.EmptyEnumerableException
      *
      *  @throws
      *     TS.InvalidOperationException
      *
      */
      public first(predicate?: (item: T) => boolean): T
      {
        if (TS.Utils.TypeInfo.isNullOrUndefined(predicate))
        {
          return Extensions.first(this);
        }//END if

        return Extensions.first(this, predicate);
      }


      /**
      *  @description
      *    Returns the first element of a sequence, or a default value if the sequence contains no elements.
      *
      *    If the predicate is provided:
      *
      *    Returns the first element of the sequence that satisfies the specified condition 
      *    or a default value if no such element is found.
      *
      *    Immediate execution.
      *
      *    That function differs from the .NET counterpart in that way that is has a 
      *    'defaultConstructor' in the singnature. That argument is needed because
      *    javascript doesn't offer reflection or a type system which you can rely on
      *    at runtime.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.first.aspx | MSDN}
      *
      *  @returns
      *     T, the result element.
      *
      *  @throws
      *     TS.ArgumentNullOrUndefinedException
      *
      */
      public firstOrDefault(defaultConstructor: { new (): T; }, predicate?: (item: T) => boolean): T
      {
        if (TS.Utils.TypeInfo.isNullOrUndefined(predicate))
        {
          return Extensions.firstOrDefault(this, defaultConstructor);
        }//END if

        return Extensions.firstOrDefault(this, defaultConstructor, predicate);
      }


      /**
      *  @description
      *    Creates and returns a new 'Enumerable' form the array
      *    given in argument 'sourceArray'.
      *
      *  @returns
      *    Enumerable<TSource>, the result enumerable.
      *
      *  @throws
      *     TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException
      *
      */
      public static fromArray<T>(sourceArray: Array<T>): TS.Linq.ArrayEnumerable<T>
      {
        return TS.Linq.Extensions.fromArray(sourceArray);
      }


      /**
      * @description
      *    Implements interface IEnumerable<T>
      */
      public getEnumerator(): IEnumerator<T>
      {
        return this._callback();
      }


      /**
      *  @description
      *    Groups the elements of a sequence according to a specified key selector function.
      *
      *    Deferred execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.groupby.aspx | MSDN}
      *
      *  @returns
      *    Enumerable<Grouping<TKey, TSource>>, the result enumerable.
      *
      *  @throws
      *     TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException
      */
      public groupBy<T, TKey>(keySelector: (item: T) => TKey): Enumerable<Grouping<TKey, T>>
      /**
      *  @description
      *    Groups the elements of a sequence according to a specified key selector 
      *    function.
      *    The keys are compared by using the specified comparer in argument 'equalityComparer'.
      *    Deferred execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.groupby.aspx | MSDN}
      *
      *  @returns
      *    Enumerable<Grouping<TKey, TSource>>, the result enumerable.
      *
      *  @throws
      *     TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException
      */
      public groupBy<T, TKey>(keySelector: (item: T) => TKey, equalityComparer: (first: TKey, second: TKey) => boolean): Enumerable<Grouping<TKey, T>>
      /**
      *  @description
      *    Groups the elements of a sequence according to a specified key selector 
      *    function and projects the elements for each group by using a specified function.
      *    The keys are compared by using the specified comparer in argument 'equalityComparer' if provided.
      *
      *    Deferred execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.groupby.aspx | MSDN}
      *
      *  @returns
      *    Enumerable<Grouping<TKey, TElement>>, the result enumerable.
      *
      *  @throws
      *     TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException
      */
      public groupBy<TKey, TElement>(keySelector: (item: T) => TKey, equalityComparer?: (first: TKey, second: TKey) => boolean, elementSelector?: (item: T) => TElement): Enumerable<Grouping<TKey, TElement>>
      /**
      *  @description
      *    Groups the elements of a sequence according to a specified key selector function and creates a result 
      *    value from each group and its key.
      *    The keys are compared by using the specified comparer in argument 'equalityComparer' if provided.
      *
      *    Deferred execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.groupby.aspx | MSDN}
      *
      *  @returns
      *    Enumerable<TResult>, the result enumerable.
      *
      *  @throws
      *     TS.ArgumentNullOrUndefinedException
      *
      *  @throws
      *    TS.InvalidTypeException
      */
      public groupBy<TKey, TResult>(keySelector: (item: T) => TKey, equalityComparer?: (first: TKey, second: TKey) => boolean, resultSelector?: (key: TKey, group: Enumerable<T>) => TResult): Enumerable<TResult>

      public groupBy<TKey, any>(keySelector: (item: T) => TKey, equalityComparer?: (first: TKey, second: TKey) => boolean, elementOrResultSelector?: any): Enumerable<any>
      {
        return TS.Linq.Extensions.groupBy(this, keySelector, equalityComparer, elementOrResultSelector);
      }


      /**
      *  @description
      *    Correlates the elements of two sequences based on key equality and groups the results. 
      *    Uses either the default equalityComparer (===) or if provided a specified equalityComparer
      *    to compare keys.
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
      public groupJoin<T, TInner, TKey, TResult>(innerEnumerable: Enumerable<TInner>, outerKeySelector: (outerItem: T) => TKey, innerKeySelector: (innerItem: TInner) => TKey, resultSelector: (outerItem: T, group: IEnumerable<TInner>) => TResult, equalityComparer?: <TKey>(first: TKey, second: TKey) => boolean): Enumerable<TResult>
      {
        return Extensions.groupJoin(this, innerEnumerable, outerKeySelector, innerKeySelector, resultSelector, equalityComparer);
      }


      /**
      *  @description
      *    Produces the set intersection of two sequences by using the default equality comparer (===) to compare values.
      *
      *    If the equalityComparer is provided:
      *
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
      public intersect(otherEnumerable: Enumerable<T>, equalityComparer?: (first: T, second: T) => boolean): Enumerable<T>
      {
        return Extensions.intersect(this, otherEnumerable, equalityComparer);
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
      public join<TOuter, TInner, TKey, TResult>(innerEnumerable: Enumerable<TInner>, outerKeySelector: (outerItem: TOuter) => TKey, innerKeySelector: (innerItem: TInner) => TKey, resultSelector: (outerItem: TOuter, innerItem: TInner) => TResult): Enumerable<TResult>
      {
        return Extensions.join(this, innerEnumerable, outerKeySelector, innerKeySelector, resultSelector);
      }


      /**
      *  @description
      *    Returns the last element of a sequence or if the predicate is provided
      *    the last element of a sequence that satisfies the specified condition.
      *
      *    Immediate execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.last.aspx | MSDN}
      *
      *  @returns
      *    Enumerable<TResult>, the result enumerable.
      *
      *  @throws
      *    TS.InvalidTypeException.
      *
      *  @throws
      *    TS.Linq.EmptyEnumerableException
      */
      public last(predicate?: (item: T) => boolean): T
      {
        return Extensions.last(this, predicate);
      }


      /**
      *  @description
      *    Returns the last element of a sequence, or a default value if the sequence 
      *    contains no elements.
      *    
      *    If the precicate is provided:
      *
      *    Returns the last element of a sequence that satisfies the specified condition 
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
      public lastOrDefault(defaultConstructor: { new (): T; }, predicate?: (item: T) => boolean): T
      {
        return Extensions.lastOrDefault(this, defaultConstructor, predicate);
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
      *    TS.InvalidTypeException.
      */
      public max<number>(): number
      {
        var _numberArray: Array<number>;
        var _enumerator: IEnumerator<T>;

        if (this.count() == 0)
        {
          throw new TS.Linq.EmptyEnumerableException(this, "The LINQ operation 'max' is not applicable on empty enumerables'.");
        }//END if

        _enumerator = this.getEnumerator();
        _numberArray = new Array<number>();

        while (_enumerator.moveNext())
        {
          if (!TS.Utils.TypeInfo.isNumber(_enumerator.current))
          {
            _enumerator.dispose();
            throw new TS.InvalidTypeException("this", this, "The LINQ operation 'max' is only applicable on enumerables of type 'Enumerable<number>'.");
          }//END if
          _numberArray.push(Number(_enumerator.current));
        }//END while

        _enumerator.dispose();

        return Extensions.max(Enumerable.fromArray(_numberArray));
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
      *    TS.InvalidTypeException.
      */
      public min<number>(): number
      {
        var _numberArray: Array<number>;
        var _enumerator: IEnumerator<T>;

        if (this.count() == 0)
        {
          throw new TS.Linq.EmptyEnumerableException(this, "The LINQ operation 'min' is not applicable on empty enumerables'.");
        }//END if

        _enumerator = this.getEnumerator();
        _numberArray = new Array<number>();

        while (_enumerator.moveNext())
        {
          if (!TS.Utils.TypeInfo.isNumber(_enumerator.current))
          {
            _enumerator.dispose();
            throw new TS.InvalidTypeException("this", this, "The LINQ operation 'min' is only applicable on enumerables of type 'Enumerable<number>'.");
          }//END if
          _numberArray.push(Number(_enumerator.current));
        }//END while

        _enumerator.dispose();

        return Extensions.min(Enumerable.fromArray(_numberArray));
      }


      /**
      *  @description
      *    Sorts the elements of a sequence in ascending order according to a key.
      *    
      *    I the comparer is provided:
      *
      *    Sorts the elements of a sequence in ascending order by using the specified comparer.
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
      public orderBy<TKey>(keySelector: (item: T) => TKey, comparer?: (first: TKey, second: TKey) => number): OrderedEnumerable<T>
      {
        return Extensions.orderBy(this, keySelector, comparer);
      }


      /**
      *  @description
      *    Sorts the elements of a sequence in descending order according to a key.
      *    
      *    I the comparer is provided:
      *
      *    Sorts the elements of a sequence in descending order by using thea specified comparer.
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
      public orderByDescending<TKey>(keySelector: (item: T) => TKey, comparer?: (first: TKey, second: TKey) => number): OrderedEnumerable<T>
      {
        return Extensions.orderByDescending(this, keySelector, comparer);
      }
      

      /**
      *  @description
      *    Retuns random elements from the curren enumerable.
      *    The function uses a generator to select the
      *    current randome element. For that reason the
      *    function will return as much elements as required,
      *    regardless how much elements the underlying enumerable
      *    holds. There is one exception of that rule.
      *    If the underlying enumerable is empty, the
      *    random function will never give a result.
      *
      *    Limit the number of returned elements by calling
      *    a 'take' operator or some other limiting operator.
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
      public random(): Enumerable<T>
      {
        return TS.Linq.Extensions.random(this);
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
      public static range(start: number, count: number): Enumerable<Number>
      {
        return Extensions.range(start, count);
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
      *    TS.ArgumentOutOfRangeException
      */
      public static repeat<U>(item: U, count: number): Enumerable<U>
      {
        return Extensions.repeat(item, count);
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
      public reverse(): Enumerable<T>
      {
        return Extensions.reverse(this);
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
      public select<U>(selector: (item: T) => U): Enumerable<U>
      {
        return Extensions.select(this, selector);
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
      public selectMany<U>(selector: (item: T) => U[]): Enumerable<U>
      {
        return Extensions.selectMany(this, selector);
      }


      /**
      *  @description
      *    Determines whether two sequences are equal by comparing the elements
      *    by using the default equality comparer (===).
      *
      *    If the equalityComparer is provided:
      *
      *    Determines whether two sequences are equal by comparing their
      *    elements by using the specified equalityComparer.
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
      public sequenceEqual(enumerable: Enumerable<T>, equalityComparer?: (first: T, second: T) => boolean): boolean
      {
        return Extensions.sequenceEqual(this, enumerable, equalityComparer);
      }


      /**
      *  @description
      *    Returns a shuffled version from the current enumerable.
      *    That means, the resulting enumerable has exact the same elements
      *    but in a randomized order.
      *
      *    Deferred execution.
      *
      *  @see {@link http://www.dotnetperls.com/fisher-yates-shuffle}
      *
      *  @returns
      *    Enumerable<T>, the resulting enumerable.
      *
      *  @throws
      *    TS.InvalidTypeException
      */
      public shuffle(): Enumerable<T>
      {
        return Extensions.shuffle<T>(this);
      }


      /**
      *  @description
      *    Returns the only element of a sequence, and throws an exception
      *    if there is not exactly one element in the sequence.
      *
      *    If the predicate is provided:
      *
      *    Returns the only element of a sequence that satisfies a specified condition,
      *    and throws an exception if more than one such element exists.
      *
      *    Immediate execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.single.aspx : MSDN }
      *
      *  @returns
      *    T, the result element.
      *
      *  @throws
      *    TS.InvalidTypeException.
      *
      *  @throws
      *    TS.InvalidOperationException
      *
      *  @throws
      *    TS.Linq.EmptyEnumerableException
      *
      *  @throws
      *    TS.Linq.MoreThanOneElementException
      */
      public single(predicate?: (item: T) => boolean): T
      {
        return Extensions.single(this, predicate);
      }


      /**
      *  @description
      *    Returns the only element of a sequence, or a default value if the sequence is empty. This method throws an
      *    exception if there is more than one element in the sequence.
      *
      *    If the predicate is provided:
      *
      *    Returns the only element of a sequence that satisfies a specified condition or a default value
      *    if no such element exists. This method throws an exception if more than one element satisfies the condition.
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
      public singleOrDefault(defaultConstructor: { new (): T; }, predicate?: (item: T) => boolean): T
      {
        return Extensions.singleOrDefault(this, defaultConstructor, predicate);
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
      public skip(count: number): Enumerable<T>
      {
        return Extensions.skip(this, count);
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
      public skipWhile(predicate: (item: T) => boolean): Enumerable<T>
      {
        return Extensions.skipWhile(this, predicate);
      }


      /**
      *  @description
      *    Computes the sum of the sequence of numeric values that are obtained by
      *    invoking a selector function on each element of the input sequence.
      *
      *    Computes the sum of a sequence of numeric values if the selector is null
      *    or undefined.
      *
      *    Immediate execution.
      *
      *  @see {@link http://msdn.microsoft.com/en-us/library/system.linq.enumerable.sum.aspx | MSDN}
      *
      *  @returns
      *    number, the result value.
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
      public sum(): number
      {
        var _numberArray: Array<number>;
        var _enumerator: IEnumerator<T>;

        if (this.count() == 0)
        {
          throw new TS.Linq.EmptyEnumerableException(this, "The LINQ operation 'sum' is not applicable on empty enumerables'.");
        }//END if

        _enumerator = this.getEnumerator();
        _numberArray = new Array<number>();

        while (_enumerator.moveNext())
        {
          if (!TS.Utils.TypeInfo.isNumber(_enumerator.current))
          {
            _enumerator.dispose();
            throw new TS.InvalidTypeException("this", this, "The LINQ operation 'sum' is only applicable on enumerables of type 'Enumerable<number>'.");
          }//END if
          _numberArray.push(Number(_enumerator.current));
        }//END while

        _enumerator.dispose();

        return Extensions.sum(Enumerable.fromArray(_numberArray));
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
      public take(count: number): Enumerable<T>
      {
        return Extensions.take(this, count);
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
      public takeWhile(predicate: (item: T) => boolean): Enumerable<T>
      {
        return Extensions.takeWhile(this, predicate);
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
      public toArray(): Array<T>
      {
        return Extensions.toArray(this);
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
      public union<TSource>(secondEnumerable: Enumerable<TSource>): Enumerable<TSource>
      {
        return Extensions.union(this, secondEnumerable);
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
      public where(predicate: (item: T) => boolean): Enumerable<T>
      {
        return Extensions.where(this, predicate);
      }


    }//END class
  }//END module
}//END module