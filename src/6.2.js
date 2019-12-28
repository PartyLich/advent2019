// Advent of Code 2019
// Day 6: Universal Orbit Map
// Part 2
import { toAdjacencyMap } from './6';

const getParent = (map) => (node) => {
  for (const [parent, children] of Object.entries(map)) {
    if (children.includes(node)) return parent;
  }
  return null;
};

const getAncestors = (map) => (child) => {
  const res = [];

  let tmp = child;
  while (tmp = getParent(map)(tmp)) {
    res.unshift(tmp);
  }

  return res;
};

const getPath = (map) => (a, b) => {
  const aTree = getAncestors(map)(a);
  const bTree = getAncestors(map)(b);

  for (let i = 0, len = aTree.length; i < len; i++) {
    if (aTree[i] !== bTree[i]) {
      return aTree.slice(i - 1).concat(bTree.slice(i));
    }
  }
};

export const solve = (input) => {
  const map = input.reduce(toAdjacencyMap, {});
  const path = getPath(map)('YOU', 'SAN');
  return path.length - 1;
};
