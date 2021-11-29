// Advent of Code 2019
// Day 13: Care Package
import { pipe } from '../funtils';
import { Computer } from '../9';
import { makeGen, toKey } from '../11';


// a block tile. Blocks can be broken by the ball.
const BLOCK = 2;

// create a tile map from the computer outputs
const drawScreen = (computer) => {
  const tiles = {};

  let next = computer.next();
  while (!next.done) {
    const [, x] = next.value;
    const [, y] = computer.next().value;
    const [, tile] = computer.next().value;

    const key = toKey([x, y]);
    tiles[key] = tile;

    next = computer.next();
  }

  return Object.values(tiles);
};

const isBlock = (tile) => tile === BLOCK;

// tile reducer that counts Block tiles
const countBlocks = (acc, tile) => isBlock(tile) ? acc + 1 : acc;

// []number -> ComputerGenerator thing
const makeGame = pipe(
    (input) => input.flat(),
    Computer,
    makeGen,
);

// how many tiles are Block tiles?
// []number -> number
export const solve = pipe(
    makeGame,
    drawScreen,
    (tiles) => tiles.reduce(countBlocks, 0),
);
