// Advent of Code 2019
// Day 24: Planet of Discord
// Part 2
import { union } from '../funtils';


// return string key for supplied 3d coord (ie a just adequate hash function)
const toKey = (r = 0, c = 0, z = 0) => JSON.stringify({ r, c, z });

// format input as a Set of 3d coordinates
// [][]bool -> Set<string>
export const fmt = (input) => input.reduce(
    (acc, row, r) => union(acc)((row.reduce(
        (acc, tile, c) => (tile)
            ? acc.concat(toKey(r, c, 0))
            : acc,
        [],
    ))),
    new Set(),
);

// Set<bool> -> (number, number, number) -> bool
const getTile = (map) => (r, c, z) => map.has(toKey(r, c, z));

// return list of neighbors and their status
// ((r, c, z) => bool) -> (r, c, z) -> [][bool, string]
const getNeighbors = (getTile) => (r, c, z) => {
  const top = [getTile(r - 1, c, z), toKey(r - 1, c, z)];
  const right = [getTile(r, c + 1, z), toKey(r, c + 1, z)];
  const bottom = [getTile(r + 1, c, z), toKey(r + 1, c, z)];
  const left = [getTile(r, c - 1, z), toKey(r, c - 1, z)];
  if (c === 2 && r == 1) {
    return [
      top,
      right,
      // 5 bottom
      [getTile(0, 0, z + 1), toKey(0, 0, z + 1)],
      [getTile(0, 1, z + 1), toKey(0, 1, z + 1)],
      [getTile(0, 2, z + 1), toKey(0, 2, z + 1)],
      [getTile(0, 3, z + 1), toKey(0, 3, z + 1)],
      [getTile(0, 4, z + 1), toKey(0, 4, z + 1)],
      left,
    ];
  }
  if (c === 2 && r == 3) {
    return [
      // 5 top
      [getTile(4, 0, z + 1), toKey(4, 0, z + 1)],
      [getTile(4, 1, z + 1), toKey(4, 1, z + 1)],
      [getTile(4, 2, z + 1), toKey(4, 2, z + 1)],
      [getTile(4, 3, z + 1), toKey(4, 3, z + 1)],
      [getTile(4, 4, z + 1), toKey(4, 4, z + 1)],
      right,
      bottom,
      left,
    ];
  }
  if (c === 1 && r == 2) {
    return [
      top,
      // 5 rights
      [getTile(0, 0, z + 1), toKey(0, 0, z + 1)],
      [getTile(1, 0, z + 1), toKey(1, 0, z + 1)],
      [getTile(2, 0, z + 1), toKey(2, 0, z + 1)],
      [getTile(3, 0, z + 1), toKey(3, 0, z + 1)],
      [getTile(4, 0, z + 1), toKey(4, 0, z + 1)],
      bottom,
      left,
    ];
  }
  if (c === 3 && r == 2) {
    return [
      top,
      right,
      bottom,
      // 5 lefts
      [getTile(0, 4, z + 1), toKey(0, 4, z + 1)],
      [getTile(1, 4, z + 1), toKey(1, 4, z + 1)],
      [getTile(2, 4, z + 1), toKey(2, 4, z + 1)],
      [getTile(3, 4, z + 1), toKey(3, 4, z + 1)],
      [getTile(4, 4, z + 1), toKey(4, 4, z + 1)],
    ];
  }

  return [
    // top in next plane?
    (r === 0)
        ? [getTile(1, 2, z - 1), toKey(1, 2, z - 1)]
        : top,
    // right in next plane?
    (c === 4)
        ? [getTile(2, 3, z - 1), toKey(2, 3, z - 1)]
        : right,
    // bottom in next plane?
    (r === 4)
        ? [getTile(3, 2, z - 1), toKey(3, 2, z - 1)]
        : bottom,
    // left in next plane?
    (c === 0)
        ? [getTile(2, 1, z - 1), toKey(2, 1, z - 1)]
        : left,
  ];
};

// update all alive/dead states simultaneously and return new set
// Set<string> -> Set<string>
export const step = (grid) => {
  const res = new Set();
  const visited = new Set();
  const _getNeighbors = getNeighbors(getTile(grid));
  const isAlive = (prev) => ({ r, c, z, neighbors }) => {
    visited.add(toKey(r, c, z));
    const frenCount = neighbors.filter(([alive]) => !!alive).length;
    if (prev) return frenCount === 1;

    return (frenCount === 1 || frenCount === 2);
  };

  for (const tile of grid) {
    const { r, c, z } = JSON.parse(tile);
    const neighbors = _getNeighbors(r, c, z);

    if (isAlive(true)({ r, c, z, neighbors })) res.add(tile);
    for (const [alive, neighbor] of neighbors) {
      if (visited.has(neighbor)) continue;

      const { r, c, z } = JSON.parse(neighbor);
      const neighbors = _getNeighbors(r, c, z);
      if (isAlive(alive)({ r, c, z, neighbors })) res.add(neighbor);
    }
  }

  return res;
};
