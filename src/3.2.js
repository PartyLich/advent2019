// Advent of Code 2019
// Day 3: Crossed Wires
// Part 2
//
// NOTE: to run, add/replace the following in runner.js
//   `import { inpFilter, inpMap, solve } from './3.2';`
// then execute with `npm start day3`
import {
  ascending,
  distance,
  toSegments,
  inRange,
} from './3';

export { inpMap, inpFilter } from './3';


// returns true if two pairs are equal
// ([any, any], [any, any]) -> bool
export const eq = (a, b) => (a[0] === b[0]) && (a[1] === b[1]);

// find intersection points and update (MUTATE) segment list in place
// returns list of intersection points
// []Segment -> []Pair
export const mutateIntersects = (segments) => {
  const intersects = [];
  const findIntersects = (horz, vert) => {
    for (const segH of horz) {
      for (const segV of vert) {
        if (inRange(segH.y, segV) && inRange(segV.x, segH)) {
          const intersect =[segV.x, segH.y];
          segH.intersect = (!!segH.intersect)
              ? segH.intersect.concat([intersect])
              : [intersect];
          segV.intersect = (!!segV.intersect)
              ? segV.intersect.concat([intersect])
              : [intersect];
          intersects.push(intersect);
        }
      }
    }

    return intersects;
  };

  for (let i = 0; i < segments.length - 1; i++) {
    findIntersects(segments[i].horz, segments[i+1].vert);
    findIntersects(segments[i+1].horz, segments[i].vert);
  }

  return intersects;
};

// combine separate horizontal and vertical segments into a single ordered path
// []object -> []object
const toPath = (segments) => segments.map(({ horz, vert }) => {
  let x = 0;
  const result = [];

  while (horz.length || vert.length) {
    const isVert = vert[0] && (vert[0].x === x);
    const next = isVert ? vert.shift() : horz.shift();
    if (!isVert) {
      x = next.end;
    }

    result.push(next);
  }

  return result;
});

// returns the length of a path terminating at the specified intersection
// []object -> [number, number] -> number
const pathLength = (segments) => (intersection) => {
  let acc = 0;
  for (const next of segments) {
    if (next.intersect && next.intersect.length) {
      for (const intersect of next.intersect) {
        if (eq(intersect, intersection)) {
          acc += (next.x !== undefined)
            ? distance([next.x, next.start])(intersect)
            : distance([next.start, next.y])(intersect);

          return acc;
        }
      }
    }

    acc += (next.x !== undefined)
      ? distance([next.x, next.start])([next.x, next.end])
      : distance([next.start, next.y])([next.end, next.y]);
  }

  return acc;
};

// What is the fewest combined steps the wires must take to reach an
// intersection?
export const solve = (input) => {
  const segments = input.map(toSegments);
  const intersects = mutateIntersects(segments);
  const paths = toPath(segments);

  return intersects
      .filter((intersect) => !eq(intersect, [0, 0]))
      .map((intersection) => paths.reduce(
          (acc, next) => acc + pathLength(next)(intersection),
          0,
      ))
      .sort(ascending)[0];
};
