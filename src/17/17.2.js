// Advent of Code 2019
// Day 17: Set and Forget
// part 2
import { Point, concat } from '../11/11';
import { DIR_VECTORS } from '../15/15';
import {
  get2d,
  getDimensions,
} from './17';


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

const TILE = 35;

// returns unoptimized path instruction list
// []number -> []string
export const findPath = (map) => {
  const { width } = getDimensions(map);
  let { pos, orient } = findBot(map);
  const get = get2d(width)(map);
  const toPoint = idxToPoint(width);

  const path = [];
  pos = toPoint(pos);
  let advance = 0;
  while (true) {
    // forward until space
    let forward = concat(pos)(DIR_VECTORS[orient]);
    while (get(forward.y)(forward.x) === TILE) {
      advance += 1;
      pos = forward;
      forward = concat(pos)(DIR_VECTORS[orient]);
    }
    if (advance) {
      path.push(advance);
      advance = 0;
    }

    // turn
    const right = concat(pos)(DIR_VECTORS[(orient + 1) % 4]);
    const left = concat(pos)(DIR_VECTORS[(orient + 3) % 4]);
    if (get(right.y)(right.x) === TILE) {
      orient = (orient + 1) % 4;
      path.push('R');
    } else if ((get(left.y)(left.x) === TILE)) {
      orient = (orient + 3) % 4;
      path.push('L');
    } else {
      return path;
    }
  }
};
