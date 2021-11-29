// Advent of Code 2019
// Day 12: The N-Body Problem
// part 2
import { pipe } from './funtils';
import { stepOnce } from './12';


// array equality. Check nested objects by reference (although we only have
// primitives in this specific usage)
// reduce would be more compact, but exiting early is a nice feature
// []number => []number -> bool
export const eq = (arr1) => (arr2) => {
  if (arr1.length !== arr2.length) return false;

  for (const [idx, a] of arr1.entries()) {
    if (a !== arr2[idx]) return false;
  }

  return true;
};

// number -> bool
const negative = (i) => i < 0;

// map bodies to arrays of initial values
const positions = (bodies) =>
  [0, 1, 2]
      .map((idx) => bodies.flatMap((body) => [body.pos[idx], body.vel[idx]]));

// find repeat intervals for initial body states
const getIntervals = (bodies) => {
  const initPos = positions(bodies);
  let intervals = Array(3).fill(-Infinity);
  let step = 1;

  while (intervals.some(negative)) {
    bodies = stepOnce(bodies);
    const curPos = positions(bodies);
    intervals = intervals.map((interval, idx) => {
      if (!negative(interval)) return interval;

      return eq(initPos[idx])(curPos[idx])
          ? step
          : interval;
    });

    step += 1;
  }

  return intervals;
};

// find least common multiple of a pair of numbers
// (number, number) -> number
export const lcm = (a, b) => {
  if (a === 0 || b === 0) {
    return 0;
  }

  const min = Math.min(a, b);
  const max = Math.max(a, b);
  if (max % min === 0) {
    return max;
  }

  let lcm = max;
  while (lcm % min !== 0) {
    lcm += max;
  }

  return lcm;
};

// find LCM of state repeat intervals for each dimension
// I didnt come up with the necessary idea. After a bunch of time reading N-body
// problem wiki pages and determining what I remember about differential
// equations from over a decade ago (to whit: not enough to be usable), I gave
// up and found this
// [tip/explanation](https://www.reddit.com/r/adventofcode/comments/e9jxh2/comment/far9cgu/?utm_source=reddit&utm_medium=web2x&context=3)
export const solve = pipe(getIntervals);
