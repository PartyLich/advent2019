// Advent of Code 2019
// Day 6: Universal Orbit Map

// string -> []string
export const inpMap = (line) => line.split(')');

export const toAdjacencyMap = (acc, [parent, child]) => {
  const update = acc[parent]
      ? acc[parent].concat(child)
      : [child];
  return {
    ...acc,
    [parent]: update,
  };
};

// object -> string, [number] -> number
export const traverse = (map) => (head, depth = 0) => {
  if (!map[head]) return depth;

  let result = depth;
  for (const child of map[head]) {
    result += traverse(map)(child, depth + 1);
  }
  return result;
};

export const solve = (input) => {
  const map = input.reduce(toAdjacencyMap, {});
  return traverse(map)('COM');
};
