// Advent of Code 2019
// Day 19: Tractor Beam
import { pipe } from '../funtils';

import { makeGen } from '../11/11';
import { makeComputer } from '../17/17';


// return number of points affected by tractor beam in a max x max square area
// Computer -> number -> []number
export const testBeam = (max) => (computer) => {
  let sum = 0;

  let start = 0;
  for (let y = 0; y < max; y++) {
    let first = false;
    for (let x = start; x < max; x++) {
      const bot = makeGen(computer);
      let next = bot.next();
      next = bot.next(x);
      next = bot.next(y);
      const [, output] = next.value;
      sum += output;

      // minimum x val for next row is always >= current x val
      if (!first && output) {
        first = true;
        start = x;
      }
      // output is contiguous; break when we stop getting active values
      if (first && !output) {
        break;
      }
    }
  }

  return sum;
};

// How many points are affected by the tractor beam in the 50x50 area closest to
// the emitter?
// []number -> number
export const solve = pipe(
    makeComputer,
    testBeam(50),
);
