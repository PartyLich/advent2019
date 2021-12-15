// Advent of Code 2019
// Day 19: Tractor Beam
// Part 2: Gettin Triggy Wit It
import { pipe } from '../funtils';

import { makeGen, Point, concat } from '../11/11';
import { makeComputer } from '../17/17';


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

// draw the relevant section of the beam
// ((number, number) -> bool) -> Point -> void
// const draw = (isInBeam) => (point) => {
//   for (let y = (point.y - 104); y < (point.y + 2); y++) {
//     const row = [];
//     row.push(`${ y } `);
//     for (let x = (point.x - 10); x < (point.x + 104); x++) {
//       const output = isInBeam(x, y);
//       if (x >= point.x && x < point.x + 100 &&
//           y > point.y - 100 && y <= point.y
//       ) {
//         row.push(output ? 'O' : '!');
//       } else {
//         row.push(output ? '#' : '.');
//       }
//     }
//     console.log(row.join(''));
//   }
// };

// returns bottom left corner of the hxh square closest to the emitter that
// fits entirely within the tractor beam
// number -> ((number, number) -> bool) -> Point
const findPoint = (h) => (isInBeam) => {
  // returns first point in beam at given height
  const _first = first(isInBeam);
  const slope = (h / (_first(h - 1).x - 1));
  // approx x value of the first beam affected point for given height y
  const getStart = (y) => Math.floor(y / slope);
  const r = rowWidth(isInBeam)(h - 1, getStart(h - 1)) / 2;
  // returns true if the square with bottom left corner at given Point is in the
  // beam, false otherwise
  const inBeam = squareInBeam(h)(isInBeam);
  const tan = r / h;

  // find a reasonable start point, y where beam width is ≈ (1.7 * h)
  const initY = Math.round((h * 1.7) / (2 * tan));
  let p = _first(initY, getStart(initY));

  // let iter = 0;
  while (!inBeam(p)) {
    // iter += 1;
    p = _first(p.y + 100, getStart(p.y + 100));
  }
  while (inBeam(p)) {
    // iter += 1;
    p = _first(p.y - 1, getStart(p.y - 1));
  }
  // console.log('iter %d', iter);

  // draw(isInBeam)(concat(p)(Point(0, 1)));

  return concat(p)(Point(0, 1));
};

// given the size of a square and its bottom left Point, format the top left
// Point as a number
// number -> Point -> number
export const formatAnswer = (size) => (p) => p.x * 10000 + (p.y - (size - 1));

// Find the 100x100 square closest to the emitter that fits entirely within the
// tractor beam; within that square, find the point closest to the emitter.
// Return this point formatted as a single number.
export const solve = pipe(
    makeComputer,
    isInBeam,
    findPoint(100),
    formatAnswer(100),
);
