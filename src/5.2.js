// Advent of Code 2019
// Day 5: Sunny with a Chance of Asteroids
// part 2

// (number, number) -> number
export const lessThan = (a, b) => a < b ? 1 : 0;
// (number, number) -> number
export const eq = (a, b) => a === b ? 1 : 0;

// if the first parameter is non-zero, it sets the instruction pointer to the
// value from the second parameter.
// Otherwise, it does nothing (returns null).
// (number, number) -> number
export const jumpTrue = (a, b) => (a !== 0) ? b : null;

// if the first parameter is zero, it sets the instruction pointer to the value
// from the second parameter.
// Otherwise, it does nothing (returns null).
// (number, number) -> number
export const jumpFalse = (a, b) => (a === 0) ? b : null;
