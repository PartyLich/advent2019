// Advent of Code 2019
// Day 9: Sensor Boost
import {
  OPCODES as PREV_OPCODES,
} from './5.2';


// type Operation {
//  fn: Function,
//  params: number,
// }

// type Computer {
//  // system memory
//  mem: []number,
//  // program counter
//  pc: number,
//  // relative base
//  rb: number,
// }

// Computer obj factory
export const Computer = (program = []) => ({
  mem: program,
  pc: 0,
  rb: 0,
});

// adjusts the relative base by the value of the offset parameter
// number -> number
export const rbOffset = (offset) => offset;

// opcode map
export const OPCODES = Object.assign(PREV_OPCODES, {
  9: { fn: rbOffset, params: 1 },
});

// set up opcodes with the specified input and output fns
// (ie supply the effectful computations)
export const makeOpcodes = (inputFn, outputFn) => Object.assign(OPCODES, {
  3: { fn: inputFn, params: 1 },
  4: { fn: outputFn, params: 1 },
});

const POSITION = 0;
const IMMEDIATE = 1;
const RELATIVE = 2;

// Computer -> []number -> (number, number) -> number
export const loadArgs = ({ mem = [], rb = 0 } = {}) => (modes = []) =>
  (arg, i) => {
    // read modes from back to front
    const mode = modes[modes.length - 1 - i] || 0;

    switch (mode) {
      case IMMEDIATE:
        return arg;
      case RELATIVE:
        return mem[rb + arg] || 0;
      case POSITION:
      // intentional fallthrough
      default:
        return mem[arg] || 0;
    }
  };
