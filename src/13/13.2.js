// Advent of Code 2019
// Day 13: Care Package
// part 2
import { pipe } from '../funtils';
import { Computer } from '../9';
import { makeGen } from '../11';


// 'play' a game of breakout and return the final score
// Computer -> number
const playGame = (computer) => {
  const game = makeGen(computer);
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

      next = game.next(input);
      continue;
    }
    isDisplay = (x === -1);
    const [, _y] = game.next().value;
    const [newState, tile] = game.next().value;
    state = newState;

    if (isDisplay) {
      score = tile;
    }

    next = game.next();
  }
  state = next.value[0];

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

// create a breakout computer from the supplied program
// []number -> Computer
const makeComputer = pipe(
    (input) => input.flat(),
    setCoins,
    Computer,
);

// what is the final score after beating the game?
// []number -> number
export const solve = pipe(
    makeComputer,
    playGame,
);
