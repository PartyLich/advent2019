// Advent of Code 2019
// Day 20: Donut Maze
import { isUpperCase, pipe } from '../funtils';

import { Point, concat } from '../11/11';
import { DIR_VECTORS } from '../15/15';


const Node = ({ weight = 9999, neighbors = [] } = {}) => ({
  weight,
  neighbors,
});

// Assume input has labels on all external sides
// [][]string -> { [string]: number }
const parseLabels = (grid) => {
  // traversable node
  const PATH = '.';
  const map = {};
  const portals = {};

  // find all path nodes and portal labels
  for (const [r, row] of grid.entries()) {
    for (const [c, char] of row.entries()) {
      const above = grid[r - 1] && grid[r - 1][c];
      const below = grid[r + 1] && grid[r + 1][c];
      const left = grid[r][c - 1] && grid[r][c - 1];
      const right = grid[r][c + 1] && grid[r][c + 1];
      const p = Point(c, r);

      if (char === PATH) {
        const neighbors = [];
        if (above === PATH) neighbors.push(Point(c, r - 1));
        if (below === PATH) neighbors.push(Point(c, r + 1));
        if (left === PATH) neighbors.push(Point(c - 1, r));
        if (right === PATH) neighbors.push(Point(c + 1, r));

        map[p] = Node({ neighbors });
      } else if (isUpperCase(char)) {
        const neighbors = [
          // above
          grid[r - 1] && grid[r - 1][c],
          // right
          grid[r][c + 1] && grid[r][c + 1],
          // below
          grid[r + 1] && grid[r + 1][c],
          // left
          grid[r][c - 1] && grid[r][c - 1],
        ];
        const labels = [
          char + neighbors[2],
          neighbors[3] + char,
          neighbors[0] + char,
          char + neighbors[1],
        ];
        for (const [i, n] of neighbors.entries()) {
          if (n === PATH) {
            const opposite = neighbors[(i + 2) % 4];
            if (isUpperCase(opposite)) {
              const label = labels[i];
              portals[label] = portals[label]
                ? portals[label].concat(concat(p)(DIR_VECTORS[i]))
                : [concat(p)(DIR_VECTORS[i])];
            }
          }
        }
      }
    }
  }

  // add portal connected neighbors to list
  for (const nodes of Object.values(portals)) {
    for (const point of nodes) {
      map[point].neighbors
          .push(...nodes.filter((node) =>
            node.toString() !== point.toString()));
    }
  }

  return { portals, map };
};

// dijkstra's algorithm
// edge lengths are all implicitly 1
// Point -> {[string]: Node } -> {[string]: Node }
export const dijkstra = (source) => (grid) => {
  const visited = new Set();
  const result = {};

  const key = source.toString();
  result[key] = Node({
    ...source,
    weight: 0,
  });
  const queue = [source];

  while (queue.length) {
    const current = queue.shift();
    const key = current.toString();
    if (visited.has(key)) continue;

    visited.add(key);

    const { neighbors } = grid[key];
    for (const neighbor of neighbors) {
      const nKey = neighbor.toString();
      if (visited.has(nKey)) continue;

      const prevDist = result[key].weight;
      const tile = grid[nKey];
      const alt = prevDist + 1;

      result[nKey] = Node({
        ...tile,
        weight: alt,
      });
      queue.push(neighbor);
    }
  }

  return result;
};

export const inpMap = (str) => str.split('');

// Return shortest steps to get from the open tile marked AA to the open tile
// marked ZZ
// [][]string -> number
export const solve = pipe(
    parseLabels,
    ({ portals, map }) => {
      const start = portals['AA'][0];
      const end = portals['ZZ'][0];
      const distance = dijkstra(start)(map);

      return distance[end].weight;
    },
);
