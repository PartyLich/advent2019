// Advent of Code 2019
// Day 16: Flawed Frequency Transmission
// Part 2
import { pipe, toDecimal } from './funtils';
import { joinDigits, sliceFirst } from './16';

export { inpFilter } from './3';


const firstSeven = sliceFirst(7);

// number -> string -> []number
export const formatInput = (times) => (str) => {
  const arr = [];
  arr.length = times;
  const nums = str.split('').map(toDecimal);
  arr.fill(null);
  return arr.flatMap(() => nums.slice());
};

export const inpMap = formatInput(10000);

const sliceArr = (start, end) => (arr) => arr.slice(start, end);

export const getOffset = pipe(
    firstSeven,
    joinDigits,
    toDecimal,
);

// calculate the digits for the last half, starting from the index specified
// number -> []number -> []number
export const lastHalfFFt = (from) => (digits) => {
  const result = [];
  const len = digits.length;
  from = from || (len / 2);

  for (let i = 0; i < len - from; i++) {
    const prev = result[0] || 0;
    const next = (prev + digits[len - 1 - i]) % 10;
    result.unshift(next);
  }

  return digits.slice(0, from).concat(result);
};

// as above, but with mutation to avoid array creation overhead (ie perf)
// it's a massive difference. 59minutes vs 250ms
// number -> []number -> []number
export const mutLastHalfFFt = (from) => (digits) => {
  const len = digits.length;
  from = from || (len / 2);

  for (let i = 1; i < (len - from); i++) {
    const prev = digits[len - i];
    const next = (prev + digits[len - i - 1]) % 10;
    digits[len - i - 1] = next;
  }

  return digits;
};

// number -> number -> []number
export const fftFrom = (from) => (phases) => (signal) => {
  let result = signal.slice();

  for (let i = phases; i > 0; i--) {
    result = mutLastHalfFFt(from)(result);
  }

  return result;
};

// what is the eight-digit message embedded in the final output list?
// []string -> string
export const solve = ([input]) => {
  const MSG_LENGTH = 8;
  const msgOffset = getOffset(input);

  return pipe(
      fftFrom(msgOffset)(100),
      sliceArr(msgOffset, msgOffset + MSG_LENGTH),
      joinDigits,
  )(input);
};
