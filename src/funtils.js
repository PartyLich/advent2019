// @flow
export const identity = /* :: <T> */(x /* : T */)/* : T */ => x;

export const toDecimal = (str/* : string */)/* : number */ => parseInt(str, 10);

export const pipe = (...fns /* : Array<function> */) =>
/* ::<T>*/ (x /* : T*/) => fns.reduce(
      (acc, f /* : function*/) => f(acc),
      x,
  );

// (number, number) -> number
export const sum = (a /* : number */, b /* : number */)/* : number */ => a + b;

// (number, number) -> number
export const mult = (a /* : number */, b /* : number */)/* : number */ => a * b;

// ascending sort comparator
export const asc = (a /* : number */, b /* : number */) => a - b;

// descending sort comparator
export const desc = (a /* : number */, b /* : number */) => b - a;

// negate a predicate
export const not = /* ::<T> */(predicate /* : (T) => bool */) =>
  (value /* : T */) => !predicate(value);

// string -> bool
export const isUpperCase = (char /* : string */) => /[A-Z]/.test(char);

// string -> bool
export const isLowerCase = (char /* : string */) => /[a-z]/.test(char);

export const union = /* ::<T> */(a /* : Set<T> */) =>
  (b /* : Iterable<T> */) => {
    const result /* : Set<T> */ = new Set(a);
    for (const el of b) result.add(el);
    return result;
  };
