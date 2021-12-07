// Advent of Code 2019
// Day 17: Set and Forget
// part 2
import { Point } from '../11/11';


// return index of a bot character and orientation
export const findBot = (map) => {
  const BOT_CHARS = [
    // ^
    map.indexOf(94),
    // >
    map.indexOf(62),
    // v
    map.indexOf(118),
    // <
    map.indexOf(60),
  ];
  const idx = BOT_CHARS.findIndex((x) => x > -1);
  const pos = BOT_CHARS[idx];

  return {
    pos,
    orient: idx,
  };
};

// convert 1d index to 2d Point
export const idxToPoint = (width) => (idx) => {
  const c = idx % width;
  const r = Math.floor(idx / width);
  return Point(c, r);
};
