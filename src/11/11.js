// Advent of Code 2019
// Day 11: Space Police
import { parseInstruction, parseOpcode, parseMode } from '../5';
import {
  OPCODES,
  makeOpcodes,
  transition,
} from '../9';


// opcode constants
const INPUT = 3;
const OUTPUT = 4;

// return iterator over [Computer, number | undefined]
export const makeGen = function* ({ mem = [], pc = 0, rb = 0 } = {}) {
  let state = {
    mem: mem.slice() || [],
    pc,
    rb,
  };
  const outputBuf = [];
  let input;
  const inputBuf = [];

  const opcodes = makeOpcodes(
      // take input from head of queue
      () => inputBuf.shift(),
      // set output buffer
      (value) => outputBuf.push(value),
  );

  let { opcode, modes } = parseInstruction(state.mem[state.pc]);
  let op = opcodes[opcode];


  while (op.fn) {
    if (op === OPCODES[INPUT]) {
      // yield same state until we get input (e.g. Block)
      while (input === undefined) {
        // input = yield [state, outputBuf.shift()];
        input = yield [state, undefined];
      }
      inputBuf.push(input);
      input = undefined;
    }

    state = transition(state, op, modes);

    if (op === OPCODES[OUTPUT]) {
      // yield that output baby
      input = yield [state, outputBuf.shift()];
    }

    opcode = parseOpcode(state.mem[state.pc]);
    modes = parseMode(state.mem[state.pc]);
    op = opcodes[opcode];
  }

  return [state, outputBuf.shift()];
};

export const Point = (x, y) => ({ x, y });
