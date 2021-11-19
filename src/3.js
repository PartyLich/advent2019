// Advent of Code 2019
// Day 3: Crossed Wires

// * -> bool
export const inpFilter = (el) => true;

// string -> []string
export const inpMap = (str) => str.split(',');


// the distance between two points as the sum of the absolute differences of
// their Cartesian coordinates
export const distance = (origin) => (dest) => {
  const dX = Math.abs(origin[0] - dest[0]);
  const dY = Math.abs(origin[1] - dest[1]);
  return dX + dY;
};

const originDist = distance([0, 0]);

// int, bool, []int -> object
export const makeSegment = (magnitude = 0, isVert = true, last = [0, 0]) => {
  const start = isVert ? last[1] : last[0];
  const end = start + magnitude;
  return (isVert)
      ? { start, end, x: last[0] }
      : { start, end, y: last[1] };
};

// array -> object
export const toSegments = (wire = []) => {
  const horz = [];
  const vert = [];
  const last = [0, 0];

  for (const path of wire) {
    const direction = path[0];
    let magnitude = parseInt(path.substr(1));

    switch (direction) {
      case 'L':
        magnitude *= -1;
        // intentional fallthrough
      case 'R':
        horz.push(makeSegment(magnitude, false, last));
        last[0] += magnitude;
        break;

      case 'D':
        magnitude *= -1;
        // intentional fallthrough
      case 'U':
        vert.push(makeSegment(magnitude, true, last));
        last[1] += magnitude;
        break;
    }
  }

  return {
    horz,
    vert,
  };
};

// number, object -> bool
export const inRange = (i, { start, end }) =>
  i >= Math.min(start, end) && i <= Math.max(start, end);

// ascending sort comparator
export const ascending = (a, b) => a - b;
// * -> bool
const notZero = (val) => val !== 0;

// []segments -> []segments -> []int
export const findIntersects = (horz, vert) => {
  const intersects = [];

  for (const segH of horz) {
    for (const segV of vert) {
      if (inRange(segH.y, segV) && inRange(segV.x, segH)) {
        intersects.push([segV.x, segH.y]);
      }
    }
  }

  return intersects;
};

export const solve = (input) => {
  const segments = input.map(toSegments);
  let intersects = [];

  for (let i = 0; i < segments.length - 1; i++) {
    intersects = intersects
        .concat(findIntersects(segments[i].horz, segments[i + 1].vert))
        .concat(findIntersects(segments[i + 1].horz, segments[i].vert));
  }

  return intersects
      .map(originDist)
      .filter(notZero)
      .sort(ascending)[0];
};
