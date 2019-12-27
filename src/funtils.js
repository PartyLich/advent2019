export const identity = (x) => x;

// string -> number
export const toDecimal = (str) => parseInt(str, 10);

export const pipe = (...fns) => (x) => fns.reduce((acc, f) => f(acc), x);

// number -> number
export const sum = (a, b) => a + b;

// number -> number
export const mult = (a, b) => a * b;
