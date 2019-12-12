import test from 'tape';
import {
  inpMap,
} from './10';
import {
  trace,
  mapNodes,
  solve,
} from './10v2';


test('10v2: trace()', (t) => {
  const grid = [
    [1, 0, 1],
    [1, 1, 1],
  ];
  {
    const msg = '4 visible';
    const expected = 4;
    const actual = trace({ x: 0, y: 0 }, mapNodes(grid));
    t.equal(actual, expected, msg);
  }
  {
    const msg = '3 visible';
    const expected = 3;
    const actual = trace({ x: 0, y: 1 }, mapNodes(grid));
    t.equal(actual, expected, msg);
  }
  {
    const grid = [
      [1, 0, 1],
      [1, 1, 1],
    ];
    const msg = '3 visible';
    const expected = 3;
    const actual = trace({ x: 2, y: 1 }, mapNodes(grid));
    t.equal(actual, expected, msg);
  }

  t.end();
},

);
test('10v2: solve()', (t) => {
  {
    const input = `......#.#.
#..#.#....
..#######.
.#.#.###..
.#..#.....
..#....#.#
#..#....#.
.##.#..###
##...#..#.
.#....####`;
    const msg = 'large ex 1';
    const expected = {
      pt: { x: 5, y: 8 },
      sum: 33,
    };
    const actual = solve(input.split('\n').map(inpMap));
    t.deepEqual(actual, expected, msg);
  }
  {
    const input = `#.#...#.#.
.###....#.
.#....#...
##.#.#.#.#
....#.#.#.
.##..###.#
..#...##..
..##....##
......#...
.####.###.`;
    const msg = 'large ex 2';
    const expected = {
      pt: { x: 1, y: 2 },
      sum: 35,
    };
    const actual = solve(input.split('\n').map(inpMap));
    t.deepEqual(actual, expected, msg);
  }
  {
    const input = `.#..#..###
####.###.#
....###.#.
..###.##.#
##.##.#.#.
....###..#
..#.#..#.#
#..#.#.###
.##...##.#
.....#.#..`;
    const msg = 'large ex 3';
    const expected = {
      pt: { x: 6, y: 3 },
      sum: 41,
    };
    const actual = solve(input.split('\n').map(inpMap));
    t.deepEqual(actual, expected, msg);
  }
  {
    const input = `.#..##.###...#######
##.############..##.
.#.######.########.#
.###.#######.####.#.
#####.##.#.##.###.##
..#####..#.#########
####################
#.####....###.#.#.##
##.#################
#####.##.###..####..
..######..##.#######
####.##.####...##..#
.#####..#.######.###
##...#.##########...
#.##########.#######
.####.#.###.###.#.##
....##.##.###..#####
.#.#.###########.###
#.#.#.#####.####.###
###.##.####.##.#..##`;
    const msg = 'large ex 4';
    const expected = {
      pt: { x: 11, y: 13 },
      sum: 210,
    };
    const actual = solve(input.split('\n').map(inpMap));
    t.deepEqual(actual, expected, msg);
  }

  t.end();
});
