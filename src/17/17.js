// Advent of Code 2019
// Day 17: Set and Forget
import { pipe } from '../funtils';

import { Computer } from '../9';
import { makeGen } from '../11/11';


// retrieve camera output from an intcode program
// Computer -> []number
const getMap = (computer) => {
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

// create a computer from the supplied program
// []number -> Computer
const makeComputer = pipe(
    (input) => input.flat(),
    Computer,
);

// What is the sum of the alignment parameters for the scaffold intersections?
// []number -> number
export const solve = pipe(
    makeComputer,
    getMap,
    (map) => {
      console.log(String.fromCharCode(...map));
      return map;
    },
);
