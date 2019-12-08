// Advent of Code 2019
// Day 2: 1202 Program Alarm
// Part 2
import { computer } from './2';

// replace position 1 with the noun and replace position 2 with the verb
// []number -> []number
export const restore = (state = []) => (noun, verb) => {
  return state.map((v, i) => {
    if (i === 1) return noun;
    if (i === 2) return verb;
    return v;
  });
};

// what pair of inputs produces the output 19690720?
// noun and verb are each between 0 and 99 inclusive
// []number -> number
export const solve = (input = []) => {
  const target = 19690720;
  let result = 0;
  let noun;
  let verb;
  let inc = Math.floor(99 / 2);
  let iter = 0;

  for (noun = 0; noun < 100; noun++) {
    for (verb = 0; verb < 100; verb += inc) {
      result = computer(restore(input)(noun, verb))[0];
      iter++;
      if (result === target) break;
      if (result > target) {
        verb -= inc;
        inc -= Math.floor(inc / 2);
        console.log('inc: %s, result: %s', inc, result);
      }
    }
    if (result === target) break;
  }

  console.log('noun: %s, verb: %s, iter: %s', noun, verb, iter);
  return 100 * noun + verb;
};
