// Advent of Code 2019
// Day 23: Category Six
import { pipe } from '../funtils';

import { Computer } from '../9';
import { makeGen } from '../11/11';


// create a computer from the supplied program
// []number -> Computer
export const makeComputer = pipe(
    (input) => input.flat(),
    Computer,
    makeGen,
);

// returns an array of specified size containing instances of intcode computers
// with the supplied program
// number -> []number -> []Computer
const makeNetwork = (size) => (program) => Array(size)
    .fill(null)
    .map(() => {
      const comp = makeComputer(program);
      return { comp, next: comp.next() };
    });
