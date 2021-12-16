// Advent of Code 2019
// Day 20: Donut Maze
import { isUpperCase } from '../funtils';

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
