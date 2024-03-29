// Advent of Code 2019
// Day 17: Set and Forget
// part 2
import { pipe } from '../funtils';

import { Computer } from '../9';
import { Point, concat, makeGen } from '../11/11';
import { eq } from '../12.2';
import { DIR_VECTORS } from '../15/15';
import { get2d, getDimensions, makeComputer, getMap } from './17';


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

// reduce path instruction list
// []string -> [][]string | number
export const getBuckets = (path) => {
  let start = 0;
  let end = 1;
  const buckets = [];

  while (start < path.length - 2) {
    let window = path.slice(start, end + 1);
    let bucket = window;

    let exists = path.slice(end + 1).join('')
        .includes(window.join(''));
    if (!exists) break;

    while (exists) {
      bucket = window;
      end += 2;
      const occurences = [
        ...path.slice(end + 1).join('')
            .matchAll(bucket.join('')),
      ].length;
      buckets.push([bucket, occurences]);

      window = path.slice(start, end + 1);
      exists = path.slice(end + 1).join('')
          .includes(window.join(''));
    }

    start += 2;
    end = start + 1;
  }

  return optimize(path)(buckets);
};

// reduce buckets to a set of 3 that covers the entire path
const optimize = (path) => (buckets) => {
  // sort by length then by occurences
  buckets = buckets.sort(([a, countA], [b, countB]) =>
    (a.length !== b.length)
        ? b.length - a.length
        : countB - countA);

  const len = buckets.length;
  const result = [];
  let first = 0;

  while (result.length !== 3) {
    let str = path.join('');
    result.length = 0;

    for (let i = first; i < len; i++) {
      const [bucket] = buckets[i];
      const bucketStr = bucket.join('');
      // NOTE: max fn size 20. size = len + (len - 1)
      if (bucketStr.length > 10) continue;

      let count = [...str.matchAll(bucketStr)];
      if (count.length > 1) {
        result.push(bucket);

        str = str.replaceAll(bucketStr, ' '.repeat(bucket.length));
        count = [...str.matchAll(bucketStr)];
      }
      // too many fns, retry
      if (result.length > 3) break;
    }

    first += 1;
  }

  return result;
};

// return fn call sequence from the supplied fn list and path
// []string -> []string -> []number
export const getRoutine = (path) => (buckets) => {
  const routine = [];

  let distance = 0;
  while (distance < path.length) {
    for (const [j, bucket] of buckets.entries()) {
      const segment = path.slice(distance, distance + bucket.length);
      if (eq(bucket)(segment)) {
        routine.push(j);
        distance += bucket.length;
        break;
      }
    }
  }

  return routine;
};

const FN_MAP = [
  // A
  65,
  // B
  66,
  // C
  67,
];
const COMMA = 44;
const NEWLINE = 10;

// any -> []number
export const toAscii = (c) => `${ c }`.split('').map((char) => char.charCodeAt(0));

// format fns and main as bot input list (ascii codes)
// [][]string | number -> []number -> []number
export const formatProgram = (buckets) => (main) => [
  ...main.flatMap((i, idx) => idx > 0 ? [COMMA, FN_MAP[i]] : [FN_MAP[i]]),
  NEWLINE,
  ...buckets.flatMap((bucket) => bucket
      .flatMap((c, idx) => idx > 0 ? [COMMA].concat(toAscii(c)) : toAscii(c))
      .concat([NEWLINE])),
  // you will be asked whether you want to see a continuous video feed;
  // provide either y or n and a newline.
  'n'.charCodeAt(0),
  NEWLINE,
];

// create a controllable computer from the supplied program
// []number -> Computer
const makeControllable = pipe(
    (input) => input.flat(),
    (input) => {
      // Force the vacuum robot to wake up by changing the value in your ASCII
      // program at address 0 from 1 to 2
      input[0] = 2;
      return input;
    },
    Computer,
);

const getProgram = pipe(
    makeComputer,
    getMap,
    findPath,
    (path) => {
      const buckets = getBuckets(path);
      const routine = getRoutine(path)(buckets);
      return formatProgram(buckets)(routine);
    },
);

// how much dust does the vacuum robot report it has collected?
export const solve = pipe((input) => {
  const program = getProgram(input);
  const cpu = makeControllable(input);
  const bot = makeGen(cpu);
  let dust = 0;

  let next = bot.next();
  while (!next.done) {
    const [, output] = next.value;
    if (output === undefined) {
      // expecting input
      const input = program.shift();
      next = bot.next(input);
      continue;
    }

    dust = output;
    next = bot.next();
  }

  return dust;
});
