import test from 'tape';
import {
  parseLine,
  getTile,
  arrCompare,
  rate,
  step,
  // solve,
} from './24';


test('24: getTile()', (t) => {
  {
    const msg = 'get by row col';
    const ex = `.....
.....
.....
#....
.#...`;

    const exGrid = ex.split('\n').map(parseLine)
        .reduce((a, n) => a.concat(n), []);
    const actual = getTile(exGrid)(3, 0);
    const expected = true;
    t.equal(actual, expected, msg);
  }

  t.end();
});

test('24: arrCompare', (t) => {
  {
    const msg = 'equal arrs';
    const actual = arrCompare([1, 2, 3, 4], [1, 2, 3, 4]);
    t.ok(actual, msg);
  }
  {
    const msg = 'different lengths';
    const actual = arrCompare([1, 2, 3, 4], [1, 2, 3]);
    t.notOk(actual, msg);
  }
  {
    const msg = 'different values';
    const actual = arrCompare([1, 2, 3, 4], [1, 2, 3, 5]);
    t.notOk(actual, msg);
  }
  {
    const msg = 'different lengths';
    const actual = arrCompare([1, 2, 3, 4], [1, 2, 3, 4, 5]);
    t.notOk(actual, msg);
  }

  t.end();
});

test('24: rate()', (t) => {
  {
    const msg = 'calculate biodiversity rating';
    const ex = `.....
.....
.....
#....
.#...`;

    const exGrid = ex.split('\n').map(parseLine)
        .reduce((a, n) => a.concat(n), []);
    const expected = 2129920;
    const actual = rate(exGrid);
    t.deepEqual(actual, expected, msg);
  }

  t.end();
});

test('24: step()', (t) => {
  {
    const msg = 'step';
    const ex = `....#
#..#.
#..##
..#..
#....`;

    const exGrid = ex.split('\n').map(parseLine)
        .reduce((a, n) => a.concat(n), []);
    const expected = `#..#.
####.
###.#
##.##
.##..`.split('\n').map(parseLine)
        .reduce((a, n) => a.concat(n), []);
    const actual = step(exGrid);
    t.deepEqual(actual, expected, msg);
  }

  t.end();
});
