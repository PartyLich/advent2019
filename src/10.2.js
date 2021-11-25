// Advent of Code 2019
// Day 10: Monitoring Station
// Part 2
import { asc, not, pipe } from './funtils';
import {
  isVert,
  mapNodes,
  slope,
  solve as solve10,
} from './10v2';

export { inpFilter } from './3';
export { inpMap } from './10';


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

const ABOVE = 'above';
const BELOW = 'below';
const LEFT = 'left';
const RIGHT = 'right';

// SlopeMap {
//    above: []{ pt: Point, distance: number },
//    below: []{ pt: Point, distance: number },
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
        _slope = (pt.y < node.y) ? BELOW : ABOVE;
      } else {
        _slope = slope(pt)(node);
        side = (pt.x < node.x) ? RIGHT : LEFT;
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

const isAboveOrBelow = (key) => key === ABOVE || key === BELOW;

// sort nodes in slope map by distance
export const sortByDistance = (map) =>
  Object.entries(map).reduce(
      (acc, [key, val]) => {
        if (isAboveOrBelow(key)) {
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

// get ordered list of asteroid slopes relative to the station
const getSlopeList = (slopeMap) => {
  const rightSet = new Set();
  const leftSet = new Set();
  for (const slope of Object.keys(slopeMap)) {
    if (isAboveOrBelow(slope)) continue;

    if (slopeMap[slope].left.length) leftSet.add(slope);
    if (slopeMap[slope].right.length) rightSet.add(slope);
  }
  const rightSlopes = [...rightSet];
  const leftSlopes = [...leftSet];
  rightSlopes.sort(asc);
  leftSlopes.sort(asc);

  return [ABOVE, ...rightSlopes, BELOW, ...leftSlopes];
};

// return the ideal station location
const getStation = (grid) => solve10(grid).pt;

const sortedSlopeMap = (station) => pipe(
    slopeMap(station),
    sortByDistance,
);

// return the 200th asteroid to be vaporized's (X coord * 100 + Y coord)
export const solve = (grid) => {
  // create node/meteor list
  const station = getStation(grid);
  const asteroids = mapNodes(grid).filter(not(eq(station)));

  // organize slope and distance information
  const map = sortedSlopeMap(station)(asteroids);
  const slopeList = getSlopeList(map);

  // vaporized asteroid sequence number
  const TARGET_NUM = 200;

  // ordered list of vaporized asteroids
  const vaporized = [];
  let idx = 0;
  let right = false;
  while (vaporized.length < TARGET_NUM && vaporized.length < asteroids.length) {
    const slope = slopeList[idx];
    idx = (idx + 1) % slopeList.length;

    if (isAboveOrBelow(slope)) {
      // toggle side
      right = !right;

      if (!map[slope].length) continue;

      // take the first asteroid in the list
      vaporized.push(map[slope].shift());
    } else {
      const side = (right) ? RIGHT : LEFT;
      if (!map[slope][side].length) continue;

      vaporized.push(map[slope][side].shift());
    }
  }

  const target = vaporized[TARGET_NUM - 1] && vaporized[TARGET_NUM - 1].pt;

  return (target.x * 100) + target.y;
};
