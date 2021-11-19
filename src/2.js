// Advent of Code 2019
// Day 2: 1202 Program Alarm

// number -> number
export const add = (a) => (b) => a + b;
// number -> number
export const mult = (a) => (b) => a * b;
// number -> number
const next = add(4);

// array, number, function -> array
export const transition = (state, i, op) => {
  const a = state[i + 1];
  const b = state[i + 2];
  const dest = state[i + 3];
  const result = op(state[a])(state[b]);
  return state.map((v, i) => i === dest ? result : v);
};

// opcode map
const OPCODES = {
  1: add,
  2: mult,
  99: false,
};

// object -> []number -> []number
const compute = (OPCODES) => (input = []) => {
  let state = input;
  // program counter
  let pc = 0;
  // operation
  let op;

  while (op = OPCODES[state[pc]]) {
    state = transition(state, pc, op);
    pc = next(pc);
  }

  return state;
};

export const computer = compute(OPCODES);

// replace position 1 with the value 12 and replace position 2 with the value 2
// []number -> []number
export const restore = (state = []) => {
  return state.map((v, i) => {
    if (i === 1) return 12;
    if (i === 2) return 2;
    return v;
  });
};

// What value is left at position 0 after the program halts?
// []number -> number
export const solve = (input = []) => {
  return computer(restore(input))[0];
};

// Buffer -> []string
export const xForm = (chunk) => chunk.toString().split(',');
