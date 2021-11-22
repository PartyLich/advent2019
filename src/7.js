// Advent of Code 2019
// Day 7: Amplification Circuit
import {
  OPCODES,
  compute,
} from './5.2';

export { inpFilter } from './3';
export { inpMap } from './5';


// create a (lazy) iterator from the provided array
export const getInput = function* (init = []) {
  let input = init.slice();

  while (input.length) {
    const val = yield input.shift();
    if (Array.isArray(val)) input = val.slice();
  }
};

// set up opcodes with the specified input and output fns
// (ie supply the effectful computations)
const makeOpcodes = (inputFn, outputFn) => Object.assign(OPCODES, {
  3: { fn: inputFn, params: 1 },
  4: { fn: outputFn, params: 1 },
});

// execute program on a sequence of 'amps' with a list of phase settings and
// return the last amp's output
// []number -> []number -> number
export const trySettings = (program) => (phaseSettings) => phaseSettings.reduce(
    (output, phase) => {
      const inputList = [phase, output];
      const inputIter = getInput(inputList);
      // run program to completion
      compute(makeOpcodes(
          () => inputIter.next().value,
          (value) => {
            // side effect: set accumulator to output value
            output = value;
          },
      ))(program);

      return output;
    },
    0,
);

// returns list of array permutations
// object -> []any -> [][]any
export const getPermutations = (cache = {}) => (arr = []) => {
  if (arr.length <= 1) return arr;

  if (cache[JSON.stringify(arr)] === undefined) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      const first = arr.slice(i, i + 1);
      const rest = arr.slice(0, i).concat(arr.slice(i + 1));
      const permutations = getPermutations(cache)(rest);
      for (const permute of permutations) {
        result.push(first.concat(permute));
      }
    }

    cache[JSON.stringify(arr)] = result;
  }

  return cache[JSON.stringify(arr)];
};

// default: empty cache
export const permutationFinder = getPermutations({});

// []number -> number
export const solve = (input = []) => {
  const program = input.flat();
  const phasePermutations = permutationFinder([0, 1, 2, 3, 4]);

  // reduce list of phase setting permutations to maximum program output
  return phasePermutations.reduce(
      (acc, phaseSettings) =>
        Math.max(acc, trySettings(program)(phaseSettings)),
      -1,
  );
};
