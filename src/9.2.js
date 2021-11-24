// Advent of Code 2019
// Day 9: Sensor Boost
// part 2
import {
  Computer,
  compute,
  makeOpcodes,
} from './9';

export { inpFilter } from './3';
export { inpMap } from './5';


// The BOOST program will ask for a single input; run it in sensor boost mode by
// providing it the value 2.
const boostMode = () => 2;

// What are the coordinates of the distress signal (the program output)?
// []number -> number
export const solve = (input = []) => {
  const program = input.flat();
  let output;

  compute(makeOpcodes(
      boostMode,
      (value) => output = value,
  ))(Computer(program));

  return output;
};
