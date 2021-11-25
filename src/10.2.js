// Advent of Code 2019
// Day 10: Monitoring Station
// Part 2
import { asc } from './funtils';
import {
  isVert,
  slope,
} from './10v2';


// Point {
//   x: number,
//   y: number,
// }

// equality for Point types
export const eq = (a) => (b) => a.x === b.x && a.y === b.y;

// distance without the sqrt because it isnt necessary for comparison
// number -> number -> number
export const distance = (ptA) => (ptB) =>
  (ptB.y - ptA.y) ** 2 + (ptB.x - ptA.x) ** 2;

// SlopeMap {
//    above: []{ pt: Point, distance: number },
//    [string]: {
//      right: []{ pt: Point, distance: number },
//      left: []{ pt: Point, distance: number },
//    }
// }>

// return map of slope to point
// Point -> []Point -> SlopeMap
export const slopeMap = (pt) => (nodes) => nodes.reduce(
    (acc, node) => {
      const _distance = distance(pt)(node);
      let _slope;
      let side;
      if (isVert(pt)(node)) {
        _slope = (pt.y < node.y) ? 'below' : 'above';
      } else {
        _slope = slope(pt)(node);
        side = (pt.x < node.x) ? 'right' : 'left';
      }

      const key = _slope;
      const result = {
        pt: node,
        distance: _distance,
      };

      if (side === undefined) {
        (acc[key] === undefined)
            ? acc[key] = [result]
            : acc[key].push(result);
      } else {
        if (acc[key] === undefined) acc[key] = { right: [], left: [] };
        acc[key][side].push(result);
      }

      return acc;
    },
    { above: [], below: [] },
);

// distance ascending sort comparator
const distanceAsc = (a, b) => asc(a.distance, b.distance);

// sort nodes in slope map by distance
export const sortByDistance = (map) =>
  Object.entries(map).reduce(
      (acc, [key, val]) => {
        if (key === 'above' || key === 'below') {
          acc[key] = val.sort(distanceAsc);
        } else {
          acc[key] = {
            right: val.right.sort(distanceAsc),
            left: val.left.sort(distanceAsc),
          };
        }

        return acc;
      },
      {},
  );
