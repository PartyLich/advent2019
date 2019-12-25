// Advent of Code 2019
// Day 16: Flawed Frequency Transmission
import {
  pipe,
  toDecimal,
} from './funtils';

// string -> []number
export const inpMap = (str) => str.split('').map(toDecimal);

// number -> array | string -> array | string
export const sliceFirst = (count) => (arr) => arr.slice(0, count);

// array | string -> array | string
export const firstEight = sliceFirst(8);

export const makeNode = (val, next = null) => ({
  val,
  next,
});


// []number -> []number
export const calcDigits = (digits) => {
  const res = [];

  for (let i = 0, len = digits.length; i < len; i++) {
    let tmp = 0;
    let counter = i + 1;
    let val = 1;

    for (let j = i; j < len; j++) {
      const digit = digits[j];
      tmp += digit * val;

      counter--;
      if (counter === 0) {
        counter = i + 1;
        // flip multiplier
        val = -val;
        // skip zeroes
        j += i + 1;
      }
    }

    res.push(tmp);
  }

  return res;
};

// number -> number
export const lastDigit = (num) => Math.abs(num % 10);
// []number -> string
export const joinDigits = (arr) => arr.join('');

// function -> array -> array
const mapWith = (fn) => (arr) => arr.map(fn);


// number -> number -> number
export const fftOnce = pipe(
    calcDigits,
    mapWith(lastDigit),
);

// number -> []number -> []number
export const fft = (phases) => (num) => {
  let result = num;

  for (let i = phases; i > 0; i--) {
    result = fftOnce(result);
  }

  return result;
};

// []string -> string
export const solve = ([input]) => {
  return pipe(
      fft(100),
      firstEight,
      joinDigits,
  )(input);
};
