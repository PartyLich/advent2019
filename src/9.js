// Advent of Code 2019
// Day 9: Sensor Boost
import {
  add,
  parseInstruction,
  parseOpcode,
  parseMode,
} from './5';
import {
  OPCODES as PREV_OPCODES,
} from './5.2';

export { inpFilter } from './3';
export { inpMap } from './5';


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

// given a Computer state, Operation, and mode list
//   returns the next Computer state
// (Computer, Operation, []number) -> Computer
export const transition = (state = {}, op = {}, modes = []) => {
  let { pc, mem, rb } = state;
  let args = mem.slice(pc + 1, pc + 1 + op.params);

  let dest = args.slice(-1)[0];
  if ((modes[modes.length - 1 - (op.params - 1)] || 0) === RELATIVE) {
    // relative mode write destination
    dest += state.rb;
  }

  args = args.map(loadArgs(state)(modes));

  const result = op.fn(...args);
  pc = add(pc, op.params + 1);
  switch (op) {
    case OPCODES[4]:
      return { mem, pc, rb };

    case OPCODES[5]:
      // intentional fallthrough
    case OPCODES[6]:
      return {
        mem,
        pc: (result !== null) ? result : pc,
        rb,
      };

    case OPCODES[9]:
      return { mem, pc, rb: rb + result };

    default:
      const nextMem = mem.slice();
      nextMem[dest] = result;
      return {
        mem: nextMem,
        pc,
        rb,
      };
  }
};

// run program to completion
// object -> []number -> []number
export const compute = (opcodes) => (state = {}) => {
  let { opcode, modes } = parseInstruction(state.mem[state.pc]);
  let op = opcodes[opcode];

  while (op.fn) {
    const nextState = transition(state, op, modes);
    state = nextState;
    opcode = parseOpcode(state.mem[state.pc]);
    modes = parseMode(state.mem[state.pc]);
    op = opcodes[opcode];
  }

  return state;
};

// The BOOST program will ask for a single input; run it in test mode by
// providing it the value 1.
const testMode = () => 1;

// what diagnostic code does the program produce?
// []number -> number
export const solve = (input = []) => {
  const program = input.flat();
  let output;

  compute(makeOpcodes(
      testMode,
      (value) => output = value,
  ))(Computer(program));

  return output;
};
