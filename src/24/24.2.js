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
