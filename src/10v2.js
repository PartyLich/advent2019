// Advent of Code 2019
// Day 10: Monitoring Station
// Rewrite
import { sum } from './funtils';

export { inpFilter } from './3';
export { inpMap } from './10';


// string -> obj -> obj -> bool
const isAligned = (dir) => (pt) =>
  (node) => (node != pt) && (pt[dir] === node[dir]);
export const isVert = isAligned('x');
// const isHorz = isAligned('y');

export const slope = (ptA) => (ptB) => (ptB.y - ptA.y) / (ptB.x - ptA.x);
const above = (ptA) => (ptB) => ptB.y < ptA.y;
const below = (ptA) => (ptB) => ptB.y > ptA.y;

const aboveOrBelow = (pt) => (acc, next) => {
  acc[0] = above(pt)(next) ? 1 : acc[0];
  acc[1] = below(pt)(next) ? 1 : acc[1];
  return acc;
};

// object, []objects -> number
export const trace = (pt, nodes) => {
  const leftSlopes = new Set();
  const rightSlopes = new Set();

  const vertical = nodes.filter(isVert(pt));
  const vertTotal = vertical.reduce(aboveOrBelow(pt), [0, 0]).reduce(sum);

  const angles = nodes.filter((node) => (node != pt) && !(isVert(pt)(node)));

  for (const ptB of angles) {
    const _slope = slope(pt)(ptB);
    const left = Math.sign(pt.x - ptB.x) < 0;
    const right = Math.sign(pt.x - ptB.x) > 0;

    if (left && leftSlopes.has(_slope)) continue;
    if (right && rightSlopes.has(_slope)) continue;

    left ? leftSlopes.add(_slope) : rightSlopes.add(_slope);
  }

  return leftSlopes.size + rightSlopes.size + vertTotal;
};

// create node/meteor list
// [][]number -> []object
export const mapNodes = (grid) => {
  const height = grid.length;
  const width = grid[0].length;
  let nodes = [];

  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      if (!grid[r][c]) continue;

      nodes = nodes.concat({
        x: c,
        y: r,
      });
    }
  }

  return nodes;
};

export const solve = (grid) => {
  let max = 0;
  let pt;
  // create node/meteor list
  const nodes = mapNodes(grid);

  for (const node of nodes) {
    const visible = trace(node, nodes);
    if (visible > max) {
      max = visible;
      pt = node;
    }
  }

  return {
    pt,
    sum: max,
  };
};
