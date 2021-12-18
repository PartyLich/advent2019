import test from 'tape';
import { parseLine } from './24';

import {
  fmt,
  step,
  solve,
} from './24.2';


test('24.2: fmt()', (t) => {
  {
    const msg = 'format input as Set of 3d coordinates';
    const input = [
      [false, true],
      [true, false],
    ];

    const expected = new Set([
      JSON.stringify({ r: 0, c: 1, z: 0 }),
      JSON.stringify({ r: 1, c: 0, z: 0 }),
    ]);
    const actual = fmt(input);
    t.deepEqual(actual, expected, msg);
  }
  t.end();
});

test('24.2: step()', (t) => {
  {
    const msg = 'updates all alive/dead states simultaneously';
    const grid = new Set([
      JSON.stringify({ r: 0, c: 4, z: 0 }),
      JSON.stringify({ r: 1, c: 0, z: 0 }),
      JSON.stringify({ r: 1, c: 3, z: 0 }),
      JSON.stringify({ r: 2, c: 0, z: 0 }),
      JSON.stringify({ r: 2, c: 3, z: 0 }),
      JSON.stringify({ r: 2, c: 4, z: 0 }),
      JSON.stringify({ r: 3, c: 2, z: 0 }),
      JSON.stringify({ r: 4, c: 0, z: 0 }),
    ]);

    const expected = new Set([
      JSON.stringify({ r: 0, c: 0, z: 0 }),
      JSON.stringify({ r: 0, c: 3, z: 0 }),
      JSON.stringify({ r: 1, c: 0, z: 0 }),
      JSON.stringify({ r: 1, c: 1, z: 0 }),
      JSON.stringify({ r: 1, c: 2, z: 0 }),
      JSON.stringify({ r: 1, c: 3, z: 0 }),
      JSON.stringify({ r: 2, c: 0, z: 0 }),
      JSON.stringify({ r: 2, c: 1, z: 0 }),
      JSON.stringify({ r: 2, c: 4, z: 0 }),
      JSON.stringify({ r: 3, c: 0, z: 0 }),
      JSON.stringify({ r: 3, c: 1, z: 0 }),
      JSON.stringify({ r: 3, c: 3, z: 0 }),
      JSON.stringify({ r: 3, c: 4, z: 0 }),
      JSON.stringify({ r: 4, c: 1, z: 0 }),
      JSON.stringify({ r: 4, c: 2, z: 0 }),

      JSON.stringify({ r: 3, c: 2, z: -1 }),
      JSON.stringify({ r: 1, c: 2, z: -1 }),
      JSON.stringify({ r: 2, c: 3, z: -1 }),

      JSON.stringify({ r: 0, c: 4, z: 1 }),
      JSON.stringify({ r: 1, c: 4, z: 1 }),
      JSON.stringify({ r: 2, c: 4, z: 1 }),
      JSON.stringify({ r: 3, c: 4, z: 1 }),
      JSON.stringify({ r: 4, c: 4, z: 1 }),
      JSON.stringify({ r: 4, c: 3, z: 1 }),
      JSON.stringify({ r: 4, c: 2, z: 1 }),
      JSON.stringify({ r: 4, c: 1, z: 1 }),
      JSON.stringify({ r: 4, c: 0, z: 1 }),
    ]);
    const actual = step(grid);
    t.deepEqual(actual, expected, msg);
  }
  t.end();
});

test('24.2: solve()', (t) => {
  {
    const msg = 'return count of living bugs';
    const input = `....#
#..#.
#..##
..#..
#....`.split('\n').map(parseLine);

    const expected = 99;
    const actual = solve(input, 10);
    t.equal(actual, expected, msg);
  }
  t.end();
});
