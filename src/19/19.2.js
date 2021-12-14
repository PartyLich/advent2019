// Advent of Code 2019
// Day 19: Tractor Beam
// Part 2: Gettin Triggy Wit It
import { makeGen } from '../11/11';


// return true if the supplied point is affected by the beam, false otherwise
// Computer -> (number, number) -> bool
const isInBeam = (computer) => (x, y) => {
  const bot = makeGen(computer);
  let next = bot.next();
  next = bot.next(x);
  next = bot.next(y);

  const [, output] = next.value;
  return !!output;
};
