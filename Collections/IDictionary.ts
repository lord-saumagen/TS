module TS
{
  "use strict";

  export module Collections
  {

    export interface IDictionary<TKey, TValue> extends TS.Collections.ICollection<TS.Collections.KeyValuePair<TKey, TValue>>
    {
      add(item: TS.Collections.KeyValuePair<TKey, TValue>): TS.Collections.ICollection<TS.Collections.KeyValuePair<TKey, TValue>>;
      add(key: TKey, value: TValue): IDictionary<TKey, TValue>;
      clear(): IDictionary<TKey, TValue>;

      containsKey(key: TKey): boolean;
      copyTo(targetArray: Array<KeyValuePair<TKey, TValue>>, index?: number) : IDictionary<TKey, TValue>;
      getValue(key: TKey): TValue;
      memberwiseClone(): IDictionary<TKey, TValue>;

      remove(item: TS.Collections.KeyValuePair<TKey, TValue>): TS.Collections.ICollection<TS.Collections.KeyValuePair<TKey, TValue>>;
      remove(key: TKey): IDictionary<TKey, TValue>;

      setItem(key: TKey, newValue: TValue): IDictionary<TKey, TValue>;
      keys: TS.Linq.Enumerable<TKey>;
      values: TS.Linq.Enumerable<TValue>;
    }

  }//END module
}//END module      