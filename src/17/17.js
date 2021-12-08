// Advent of Code 2019
// Day 17: Set and Forget
import { pipe } from '../funtils';

import { Computer } from '../9';
import { makeGen } from '../11/11';


// retrieve camera output from an intcode program
// NOTE: keeps empty cells, which isnt necessary or useful for part 1
// Computer -> []number
export const getMap = (computer) => {
  const bot = makeGen(computer);
  const map = [];

  for (const [, output] of bot) {
    map.push(output);
  }

  return map;
};

// get array value with 2d index
export const get2d = (width = 0) => (arr = []) => (row = 0) => (col = 0) =>
  arr[(width * row) + col];

// return the dimensions of this 2d map
// []any -> { width: number, height: number }
export const getDimensions = (map) => {
  // NOTE: lines terminated by newline char
  const width = map.indexOf(10) + 1;
  // NOTE: bonus newline char at the end
  const height = (map.length - 1) / width;
  return { width, height };
};


// return the sum of the alignment parameters
// for each scaffold intersection, its alignment parameter is the distance
// between its left edge and the left edge of the view multiplied by the
// distance between its top edge and the top edge of the view.
// []number -> number
export const sumAlignmentParameters = (map) => {
  const { width, height } = getDimensions(map);
  const get = get2d(width)(map);

  let alignmentSum = 0;
  for (let r = 1; r < (height - 1); r++) {
    // note: -2 due to the newline char
    for (let c = 1; c < (width - 2); c++) {
      if (get(r)(c) === 46) continue;
      const neighbors =
          get(r + 1)(c) +
          get(r - 1)(c) +
          get(r)(c + 1) +
          get(r)(c - 1);
      // all neighbors are scaffold (ie 35. so 35 * 4 = 140)
      if (neighbors === 140) alignmentSum += r * c;
    }
  }

  return alignmentSum;
};

// create a computer from the supplied program
// []number -> Computer
export const makeComputer = pipe(
    (input) => input.flat(),
    Computer,
);

// What is the sum of the alignment parameters for the scaffold intersections?
// []number -> number
export const solve = pipe(
    makeComputer,
    getMap,
    sumAlignmentParameters,
);
