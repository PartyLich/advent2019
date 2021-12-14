// Advent of Code 2019
// Day 19: Tractor Beam
// Part 2: Gettin Triggy Wit It
import { makeGen, Point } from '../11/11';


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

// return width of the beam at provided height
// ((number, number) -> bool) -> (number, number | undefined) -> number
export const rowWidth = (isInBeam) => (y, from = 0) => {
  let width = 0;
  let hit = false;
  let end = false;
  let x = from;

  while (!(hit && end)) {
    const output = isInBeam(x, y);
    width += output;
    hit = hit || output;
    end = !output;
    x += 1;
  }

  return width;
};

// return first beam affected Point at the supplied height y, starting at from
// ((number, number) -> bool) -> (number, number | undefined) -> Point
export const first = (isInBeam) => (y, from = 0) => {
  // potentially infinite
  for (let x = from; true; x++) {
    if (isInBeam(x, y)) return Point(x, y);
  }
};

// true if square of given size with bottom left corner at given point is
// within the beam
// check corners, provide bottom left
// (number) -> ((number, number) -> bool) -> Point -> bool
export const squareInBeam = (size) => (isInBeam) => ({ x = 0, y = 0 } = {}) =>
  // bottom left
  isInBeam(x, y) &&
  // top left
  isInBeam(x, y - (size - 1)) &&
  // bottom right
  // isInBeam(x + (size - 1), y) &&
  // top right
  isInBeam(x + (size - 1), y - (size - 1));
