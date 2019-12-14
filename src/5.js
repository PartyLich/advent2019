// Advent of Code 2019
// Day 5: Sunny with a Chance of Asteroids
import {
  add as curryAdd,
  mult as curryMult,
} from './2';
import { inpMap as commaSplit } from './3';


// string -> number
export const toDecimal = (str) => parseInt(str, 10);

// string -> []number
export const inpMap = (str) => commaSplit(str).map(toDecimal);

// number -> number
export const parseOpcode = (instruction) => instruction % 100;

// number -> []number
export const parseMode = (instruction) =>
  (Math.floor(instruction / 100) + '').split('').map(toDecimal);

// number -> object
const parseInstruction = (instruction) => ({
  opcode: parseOpcode(instruction),
  modes: parseMode(instruction),
});

// number -> number
export const add = (a, b) => curryAdd(a)(b);
export const mult = (a, b) => curryMult(a)(b);

// number -> number
const input = () => getInput();

// number -> SIDE EFFECT
const output = (input) => {
  console.log(`[OUTPUT]: ${ input }`);
  return input;
};

// opcode map
const OPCODES = {
  1: { fn: add, params: 3 },
  2: { fn: mult, params: 3 },
  3: { fn: input, params: 1 },
  4: { fn: output, params: 1 },
  99: { fn: false, params: 0 },
};

const POSITION = 0;
const IMMEDIATE = 1;

export const loadArgs = (state) => (modes) => (arg, i) => {
  // read modes from back to front
  const mode = modes[modes.length - 1 - i] || 0;

  switch (mode) {
    case IMMEDIATE:
      return arg;
    case POSITION: // intentional fallthrough
    default:
      return state[arg];
  }
};

// array, number, function -> array
export const transition = (state, i, op, modes = []) => {
  let args = state.slice(i+1, i + 1 + op.params);
  const dest = args.slice(-1)[0];

  args = args.map(loadArgs(state)(modes));

  const result = op.fn(...args);
  if (op == OPCODES[4]) return state;
  return state.map((v, i) => i === dest ? result : v);
};


// object -> []number -> []number
const compute = (OPCODES) => (state = []) => {
  let pc = 0; // program counter
  let { opcode, modes } = parseInstruction(state[pc]);
  let op = OPCODES[opcode]; // operation

  while (op.fn) {
    state = transition(state, pc, op, modes);
    pc = add(pc, op.params + 1);
    opcode = parseOpcode(state[pc]);
    modes = parseMode(state[pc]);
    op = OPCODES[opcode];
  }

  return state;
};

// export const computer = compute(OPCODES);
export const computer = compute(OPCODES);


// What value is left at position 0 after the program halts?
// []number -> number
export const solve = (input = []) => computer(input.flat())[0];

/**
 * fake some input
 * @return {number}
 */
function getInput() {
  return 1;
}
