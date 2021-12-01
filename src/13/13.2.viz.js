// Advent of Code 2019
// Day 13: Care Package
// part 2, visual
// import * as readline from 'readline';

import { pipe } from '../funtils';
import { Computer } from '../9';
import { makeGen, toKey } from '../11';


// a block tile. Blocks can be broken by the ball.
const EMPTY = 0;
const WALL = 1;
const BLOCK = 2;
const PADDLE = 3;
const BALL = 4;
// type Tile = EMPTY | WALL | BLOCK | PADDLE | BALL

const TILE_MAP = {
  [BLOCK]: '#',
  [EMPTY]: ' ',
  [WALL]: '~',
  [PADDLE]: '_',
  [BALL]: '@',
};

// // joystick in the neutral position
// const NEUTRAL = 0;
// // joystick is tilted to the left
// const LEFT = -1;
// // joystick is tilted to the right,
// const RIGHT = 1;
// // type Input = NEUTRAL | LEFT | RIGHT

const FPS_60 = 16;
const frame = () => new Promise((resolve) => setTimeout(resolve, FPS_60));

// transform tile list to 2d tile array
const toGrid = (tiles) => {
  const WIDTH = 38;
  const HEIGHT = 20;
  const display = Array(HEIGHT).fill(null)
      .map(() => Array(WIDTH).fill(TILE_MAP[EMPTY]));

  // set tiles to display value
  for (const [posStr, tile] of Object.entries(tiles)) {
    if (tile === EMPTY) continue;

    const pos = JSON.parse(posStr);
    display[pos[1]][pos[0]] = TILE_MAP[tile];
  }

  return display;
};

// string to clear the console
const SOFT_CLEAR = '\x1B[2J';
// set cursor to (1, 1)
const SET_CURSOR = '\x1B[1;1H';

// play a game of breakout
// Computer -> number
const playGame = async (computer) => {
  // const rl = readline.createInterface({
  //   input: process.stdin,
  //   output: process.stdout,
  // });

  const game = makeGen(computer);
  const tiles = {};
  let state;
  let isDisplay = false;
  let score = -1;

  let next = game.next();
  while (!next.done) {
    const [, x] = next.value;
    if (x === undefined) {
      // expecting input
      // follow the ball
      const ballX = state ? state.mem[388] : 0;
      const paddleX = state ? state.mem[392] : 0;
      const input = ballX - paddleX;
      // poorly done interactive version
      // let input;
      // while (input === undefined) {
      //   const keypress = await new Promise((resolve) => {
      //     rl.question('input > ', resolve);
      //   });

      //   switch (keypress.trim()) {
      //     case 'n':
      //       input = LEFT;
      //       break;
      //     case 'e':
      //       input = NEUTRAL;
      //       break;
      //     case 'i':
      //       input = RIGHT;
      //       break;
      //     default:
      //       // invalid input
      //       input = NEUTRAL;
      //   }
      // }

      next = game.next(input);
      continue;
    }
    isDisplay = (x === -1);
    const [, y] = game.next().value;
    const [newState, tile] = game.next().value;
    state = newState;

    if (isDisplay) {
      score = tile;
    } else {
      const key = toKey([x, y]);
      tiles[key] = tile;
    }

    // render the game state
    if (Object.values(tiles).length >= 760) {
      process.stdout.write(SOFT_CLEAR);
      process.stdout.write(SET_CURSOR);
      toGrid(tiles).forEach((row) => console.log(row.join('')));
      console.log('Score: ', state.mem[386]);

      console.log('  mem[390] ball direction', state.mem[390]);
      console.log('  mem[391] ', state.mem[391]);
      console.log('  mem[389] ball y', state.mem[389]);
      console.log('  mem[388] ball x', state.mem[388]);
      console.log('  mem[392] paddle x', state.mem[392]);
      await frame();
    }

    next = game.next();
  }
  state = next.value[0];

  // rl.close();

  // return score
  // return state.mem[386];
  return score;
};

// Memory address 0 represents the number of quarters that have been inserted;
// set it to 2 to play for free.
const setCoins = (input) => {
  const result = input.slice();
  result[0] = 2;
  return result;
};


// []number -> Computer
const makeComputer = pipe(
    (input) => input.flat(),
    setCoins,
    Computer,
);

// how many tiles are Block tiles?
// []number -> number
export const solve = pipe(
    makeComputer,
    // this is async, need to wait to actually get the return val
    playGame,
);
