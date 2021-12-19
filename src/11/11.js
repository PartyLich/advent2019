// Advent of Code 2019
// Day 11: Space Police
import { parseInstruction, parseOpcode, parseMode } from '../5';
import {
  OPCODES,
  makeOpcodes,
  transition,
  Computer,
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
        input = yield [state, undefined];
      }
      inputBuf.push(input);
      input = undefined;
    }

    state = transition(opcodes)(state, op, modes);

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

// Takes x and y coordinates and returns a Point instance
export const Point = (x = 0, y = 0) => ({
  x,
  y,
  __proto__: {
    constructor: Point,
    toString() {
      return JSON.stringify(this);
    },
  },
});

// concat for Point type
export const concat = (ptA) => (ptB) => Point(
    ptA.x + ptB.x,
    ptA.y + ptB.y,
);

// robot turning directions. always 90degrees
// type Direction = LEFT | RIGHT
export const LEFT = 0;
export const RIGHT = 1;

// turn a vector 90 degrees in the specified direction
// Direction -> Point -> Point
export const turn = (turnDir) => (currentVector) => {
  switch (turnDir) {
    case LEFT:
      return {
        x: -currentVector.y,
        y: currentVector.x,
      };

    case RIGHT:
      return {
        x: currentVector.y,
        y: -currentVector.x,
      };
  }
};

// pseudo hashing fn for objects
export const toKey = (obj) => JSON.stringify(obj);

// hull panel colors
// type Color = BLACK | WHITE
export const BLACK = 0;
// const WHITE = 1;

// how many panels are painted at least once?
// []number -> number
export const solve = (input = []) => {
  const robot = makeGen(Computer(input.flat()));
  const panels = {};
  let vector = Point(0, 1);
  let position = Point(0, 0);
  let key = toKey(position);

  let next = robot.next();
  while (!next.done) {
    let [, color] = next.value;
    if (color === undefined) {
      // expecting input
      const panel = panels[key] || BLACK;
      next = robot.next(panel);
      color = next.value[1];
    }
    panels[key] = color;

    // update robot position
    const [, dir] = robot.next().value;
    vector = turn(dir)(vector);
    position = concat(position)(vector);
    key = toKey(position);

    next = robot.next();
  }

  return Object.keys(panels).length;
};
