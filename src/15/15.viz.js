// Advent of Code 2019
// Day 15: Oxygen System
// aka roomba.js
import { pipe } from '../funtils';

import { Computer } from '../9';
import { eq } from '../10.2';
import { makeGen, Point, concat, toKey } from '../11/11';
import { SOFT_CLEAR, SET_CURSOR } from '../13';


const NORTH = 1;
const SOUTH = 2;
const WEST = 3;
const EAST = 4;
// type Movement = NORTH | SOUTH | EAST | WEST

// The repair droid hit a wall. Its position has not changed.
const WALL = 0;
// The repair droid has moved one step in the requested direction.
const OK = 1;
// The repair droid has moved one step in the requested direction;
// its new position is the location of the oxygen system.
const GOAL = 2;
// type Status = WALL | OK | GOAL

const BOT = 'D';

// cardinal direction vectors
const DIR_VECTORS = [
  // NORTH,
  Point(0, -1),
  // EAST,
  Point(1, 0),
  // SOUTH,
  Point(0, 1),
  // WEST,
  Point(-1, 0),
];
// map cardinal direction vector to Movement
const VEC_MAP = [NORTH, EAST, SOUTH, WEST];

// visual representation of map tiles
const TILE_MAP = {
  [WALL]: '#',
  [OK]: ' ',
  [GOAL]: '@',
  [BOT]: 'D',
  // '∞'
};

// robot display characters
const BOT_MAP = [
  // NORTH,
  '▲',
  // EAST,
  '▶',
  // SOUTH,
  '▼',
  // WEST,
  '◀',
];

// SYNCHRONOUS sleep
export const sleep = (ms) =>
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);

// type Tile = {
//   tile: char,
//   weight: number,
// }

// type TileMap = { [string]: Tile }

// transform a list of tiles into a 2d matrix of chars
// the tile list may contain negatives, while our array indices clearly cannot
// TileMap -> char -> [][]string
const renderPanels = (tiles) => (botChar) => {
  const [negMinPt, maxPt] = Object.entries(tiles).reduce(
      ([{ x: minX, y: minY }, { x: maxX, y: maxY }], [position]) => {
        const pos = JSON.parse(position);
        return [
          Point(
              Math.min(minX, pos.x),
              Math.min(minY, pos.y),
          ),
          Point(
              Math.max(maxX, pos.x),
              Math.max(maxY, pos.y),
          ),
        ];
      },
      [Point(), Point()],
  );
  const minPt = Point(Math.abs(negMinPt.x), Math.abs(negMinPt.y));

  // initialize display matrix
  const rows = maxPt.y - negMinPt.y + 1;
  const cols = maxPt.x - negMinPt.x + 1;
  const display = Array(rows).fill(null)
      .map(() => Array(cols).fill(TILE_MAP[OK]));

  for (const [posStr, { tile }] of Object.entries(tiles)) {
    const pos = JSON.parse(posStr);
    const adjPos = concat(minPt)(pos);

    display[adjPos.y][adjPos.x] = TILE_MAP[tile];
    // replace roomba display char
    if (tile === BOT) display[adjPos.y][adjPos.x] = botChar;
    // replace starting tile
    if (pos.x === 0 && pos.y === 0) display[adjPos.y][adjPos.x] = `X`;
  }

  return display;
};

// return vector list index of the lowest weighted neighbor
// TileMap -> Point -> number
const getInput = (tiles) => (position) => {
  const weights = DIR_VECTORS.map((vec) => {
    const key = toKey(concat(position)(vec));
    return (tiles[key] && tiles[key].weight) || -1;
  });

  return weights.reduce((acc, next, i) => (weights[acc] > next) ? i : acc, 0);
};

// update node weights in place (MUTATION)
// []string -> TileMap -> TileMap
const updateWeights = (goalKeys) => (tiles) => {
  let changes = 0;
  let result;
  // mutate for speedup
  const reweight = (acc, [key, value]) => {
    if (value.weight === Infinity) return acc;

    // ensure goals stay at 0
    if (goalKeys.includes(key)) {
      acc[key] = { ...value, weight: 0 };
      return acc;
    }

    const position = JSON.parse(key);
    // find minimum neighbor weight
    const minWeight = DIR_VECTORS.reduce(
        (minWeight, vec) => {
          const key = toKey(concat(position)(vec));
          const weight = (tiles[key] && tiles[key].weight) || 0;
          return (minWeight < weight) ? minWeight : weight;
        },
        Infinity,
    );
    // set new weight to minimum neigbor + 1 (i.e. distance from the goal)
    const weight = minWeight + 1;
    changes += weight !== value.weight;

    acc[key] = { ...value, weight };
    return acc;
  };

  result = Object.entries(tiles).reduce(reweight, tiles);

  // repeat until no further changes made
  while (changes) {
    changes = 0;
    result = Object.entries(result).reduce(reweight, result);
  }

  return result;
};

// Computer ->  [TileMap, Point] | undefined -> number
const solveMaze = (computer) => ([tiles = {}, target] = []) => {
  const bot = makeGen(computer);
  // initial vec north
  let vecIdx = 0;
  let vector = DIR_VECTORS[vecIdx];
  let position = Point();

  // initial position is empty
  tiles[toKey(position)] = { tile: OK, weight: 1 };
  if (target) tiles[toKey(target)] = { tile: GOAL, weight: 0 };

  let i = 0;
  let next = bot.next();
  // NOTE: the intcode program never halts (afaik), so this loop does not
  // terminate
  while (!next.done) {
    const start = Date.now();
    const [, status] = next.value;
    if (status === undefined) {
      // expecting input, of Movement type
      vecIdx = getInput(tiles)(position);
      vector = DIR_VECTORS[vecIdx];
      const input = VEC_MAP[vecIdx];

      next = bot.next(input);
      continue;
    }

    const newPosition = concat(position)(vector);
    const key = toKey(newPosition);
    switch (status) {
      case OK:
        position = newPosition;
        if (tiles[key] === undefined) {
          tiles[key] = { tile: OK, weight: 1 };
        }
        break;
      case WALL:
        if (tiles[key] === undefined) {
          tiles[key] = { tile: WALL, weight: Infinity };
        }
        break;
      case GOAL:
        if (tiles[key] === undefined) {
          tiles[key] = { tile: GOAL, weight: 0 };
        }

        return [tiles, newPosition];
    }
    // update tile weights
    tiles = updateWeights([toKey(target)])(tiles);

    // display state
    process.stdout.write(SOFT_CLEAR);
    process.stdout.write(SET_CURSOR);
    console.log('Current Map');
    console.log(' frame', i);
    renderPanels({
      ...tiles,
      [toKey(position)]: { tile: BOT },
    })(BOT_MAP[vecIdx])
        .forEach((row) => console.log(row.join('')));

    next = bot.next();
    i += 1;

    // cap framerate to max 60fps with synchronous madness
    const elapsed = Date.now() - start;
    sleep((16 - elapsed) || 0);
  }
};

// create a computer from the supplied program
// []number -> Computer
const makeComputer = pipe(
    (input) => input.flat(),
    Computer,
);

// What is the fewest number of movement commands required to move the repair
// droid from its starting position to the location of the oxygen system?
// []number -> number
export const solve = pipe(
    makeComputer,
    (cpu) => {
      // find the target position
      let [tiles, target] = solveMaze(cpu)();

      tiles = Object.entries(tiles).reduce(
          (acc, [key, value]) => {
            if (value.weight === Infinity) return acc;

            const position = JSON.parse(key);
            // set goal to 0 and other floor cells arbitrarily high
            const weight = (eq(target)(position)) ? 0 : 2000;

            acc[key] = { ...value, weight };
            return acc;
          },
          tiles,
      );

      // map the rest of the maze
      const [dijkMap, _] = solveMaze(cpu)([tiles, target]);
      return dijkMap[toKey(Point())].weight;
    },
);
