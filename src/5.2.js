// Advent of Code 2019
// Day 5: Sunny with a Chance of Asteroids
// part 2
import {
  add,
  OPCODES as PREV_OPCODES,
  loadArgs,
  parseInstruction,
  parseOpcode,
  parseMode,
} from './5';

export { inpFilter } from './3';
export { inpMap } from './5';


// (number, number) -> number
export const lessThan = (a, b) => a < b ? 1 : 0;

// (number, number) -> number
export const eq = (a, b) => a === b ? 1 : 0;

const THERMAL_RADIATOR_ID = 5;

// return Thermal Radiator System ID for all input operations
const getInput = () => THERMAL_RADIATOR_ID;

// number -> number
const input = () => getInput();

// if the first parameter is non-zero, it sets the instruction pointer to the
// value from the second parameter.
// Otherwise, it does nothing (returns null).
// (number, number) -> number
export const jumpTrue = (a, b) => (a !== 0) ? b : null;

// if the first parameter is zero, it sets the instruction pointer to the value
// from the second parameter.
// Otherwise, it does nothing (returns null).
// (number, number) -> number
export const jumpFalse = (a, b) => (a === 0) ? b : null;

// opcode map
export const OPCODES = Object.assign(PREV_OPCODES, {
  3: { fn: input, params: 1 },
  5: { fn: jumpTrue, params: 2 },
  6: { fn: jumpFalse, params: 2 },
  7: { fn: lessThan, params: 3 },
  8: { fn: eq, params: 3 },
});

// returns the next state and next PC (if the PC was updated)
// array, number, function -> [array, number]
export const transition = (state, i, op, modes = []) => {
  let args = state.slice(i + 1, i + 1 + op.params);
  const dest = args.slice(-1)[0];

  args = args.map(loadArgs(state)(modes));

  const result = op.fn(...args);
  switch (op) {
    case OPCODES[4]:
      return [state, null];

    case OPCODES[5]:
      return [state, result];

    case OPCODES[6]:
      return [state, result];

    default:
      return [
        state.map((v, i) => i === dest ? result : v),
        null,
      ];
  }
};

// run program to completion
// object -> []number -> []number
export const compute = (opcodes) => (state = []) => {
  // program counter
  let pc = 0;
  let { opcode, modes } = parseInstruction(state[pc]);
  // operation
  let op = opcodes[opcode];

  while (op.fn) {
    const [nextState, nextPc] = transition(state, pc, op, modes);
    state = nextState;
    pc = nextPc !== null ? nextPc : add(pc, op.params + 1);
    opcode = parseOpcode(state[pc]);
    modes = parseMode(state[pc]);
    op = opcodes[opcode];
  }

  return state;
};

export const computer = compute(OPCODES);

// what diagnostic code does the program produce?
// []number -> number
export const solve = (input = []) => computer(input.flat())[0];
