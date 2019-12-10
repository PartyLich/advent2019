// Advent of Code 2019
// Day 4: Secure Container
// Part 2 - matching pair not part of a larger group of matching digits.
import { seek } from './4';


export const baseCase = { last: -1, double: {} };
const isTwo = (num) => num === 2;

export const checkCriteria = (acc, next, i, { length }) => {
  if (!acc) return false;
  if (next < acc.last) return false;

  let double = { ...acc.double };
  if ((next === acc.last)) {
    double[next] = (double[next])
        ? double[next] + 1
        : 2;
  }

  // last element, count pairs
  if (i === length - 1) double = Object.values(double).filter(isTwo).length;

  return {
    last: next,
    double,
  };
};

export const solve = (input) => {
  const [start, end] = input.flat();
  return seek(checkCriteria, baseCase)(start)(end);
};
