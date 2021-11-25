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
