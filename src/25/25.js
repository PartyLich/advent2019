// Advent of Code 2019
// Day 25: Cryostasis
import * as readline from 'readline';

import { toAscii } from '../17';
import { makeComputer } from '../23/23';


// '\n' char
const NEWLINE = 10;

const NORTH = toAscii('north').concat(NEWLINE);
const SOUTH = toAscii('south').concat(NEWLINE);
const EAST = toAscii('east').concat(NEWLINE);
const WEST = toAscii('west').concat(NEWLINE);
const INV = toAscii('inv').concat(NEWLINE);

// string -> []number
const parseInput = (answer) => {
  switch (answer.trim().slice(0, 4)) {
    case 'e':
      return NORTH;
    case 'i':
      return EAST;
    case 'n':
      return SOUTH;
    case 'h':
      return WEST;
    case 'inv':
      return INV;
    case 'drop':
      // intentional fallthrough
    case 'take':
      return toAscii(answer).concat(NEWLINE);
  }
};

// What is the password for the main airlock?
// final Items in inventory with my input:
// - klein bottle
// - mutex
// - hypercube
// - mug
// []number -> number
export const solve = async (input) => {
  const bot = makeComputer(input);
  const line = [];
  const inputBuf = [];
  const hasInput = () => !!inputBuf.length;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let next = bot.next();
  while (!next.done) {
    const [, output] = next.value;
    let input;
    switch (output) {
      case undefined:
        if (hasInput()) {
          input = inputBuf.shift();
        } else {
          // get user input
          const answer = await new Promise((resolve) => {
            rl.question('input > ', resolve);
          });
          inputBuf.push(...parseInput(answer));
        }
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

  rl.close();
};
