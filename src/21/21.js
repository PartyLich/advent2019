// Advent of Code 2019
// Day 21: Springdroid Adventure
import { pipe } from '../funtils';

import { Computer } from '../9';
import { makeGen } from '../11/11';
import { toAscii } from '../17';


// '\n' char
const NEWLINE = 10;
// ' ' char
const SPACE = 32;
const WALK = toAscii('WALK');
const NOT = toAscii('NOT');
const AND = toAscii('AND');
const OR = toAscii('OR');
const T = 84;
const J = 74;
const A = 65;
const B = 66;
const C = 67;
const D = 68;

// format a springdroid instruction as ascii
// -> []number -> number, number -> []number
const instruction = (op) => (x, y) => [op, SPACE, x, SPACE, y, NEWLINE].flat();
export const and = instruction(AND);
export const or = instruction(OR);
export const not = instruction(NOT);
const walk = () => [WALK, NEWLINE].flat();

// create a computer from the supplied program
// []number -> Generator<[Computer, number], , number>
export const makeComputer = pipe(
    (input) => input.flat(),
    Computer,
    makeGen,
);

// returns springdroid program
// walking springdroid jumps 4 tiles
const getProgram = () => [
  not(A, J),
  not(B, T),
  // a or b is missing
  or(T, J),
  not(C, T),
  // a b or c missing
  or(T, J),
  // d present
  and(D, J),
  walk(),
].flat();

// What amount of hull damage does it report?
// []number -> number
export const solve = (input) => {
  const bot = makeComputer(input);
  const program = getProgram();
  let result;

  let next = bot.next();
  while (!next.done) {
    const [, output] = next.value;
    if (output === undefined) {
      // expecting input
      next = bot.next(program.shift());
      continue;
    }

    result = output;
    next = bot.next();
  }

  return result;
};

// What amount of hull damage does it report?
// []number -> number
export const visual = (input) => {
  const bot = makeComputer(input);
  const line = [];
  const program = getProgram();
  console.log(`Program:\n${ String.fromCharCode(...program) }`);

  let next = bot.next();
  while (!next.done) {
    const [, output] = next.value;
    let input;
    switch (output) {
      case undefined:
        input = program.shift();
        break;

      case NEWLINE:
        console.log(String.fromCharCode(...line));
        line.length = 0;
        break;

      default:
        line.push(output);
    }

    next = bot.next(input);
  }

  return line[0];
};
