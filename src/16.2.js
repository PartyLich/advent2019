// Advent of Code 2019
// Day 16: Flawed Frequency Transmission
// Part 2
import {
  pipe,
  toDecimal,
} from './funtils';
import {
  fft,
  joinDigits,
  sliceFirst,
} from './16';

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

// []string -> string
export const solve = ([input]) => {
  const msgLength = 8;
  const msgOffset = getOffset(input);
  console.log('msgOffset dec: ', msgOffset);

  return pipe(
      fft(100),
      sliceArr(msgOffset, msgOffset + msgLength),
      joinDigits,
  )(input);
};
