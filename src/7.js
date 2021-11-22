// Advent of Code 2019
// Day 7: Amplification Circuit
import {
  OPCODES,
  compute,
} from './5.2';


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
