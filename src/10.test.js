import test from 'tape';
import {
  inpMap,
  onGrid,
  trace,
  countVertical,
  parseLine,
  solve,
} from './10';

test('10: parseLine()', (t) => {
  {
    const line = '##.##..#.####...#.#.####';
    const msg = 'converts string rep to []int';
    const expected =
      [1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1];
    const actual = parseLine(line);
    t.deepEqual(actual, expected, msg);
  }
  //   {
  //     const example = `.#..#
  // .....
  // #####
  // ....#
  // ...##`;
  //     example.split('\n').map(inpMap);
  //   }

  t.end();
});

test('10: onGrid()', (t) => {
  const grid = [
    [1, 2],
    [1, 2],
  ];
  {
    const msg = 'in bounds';
    const actual = onGrid(grid)(1, 1);
    t.ok(actual, msg);
  }
  {
    const msg = 'out of bounds';
    const actual = onGrid(grid)(-1, 1);
    t.notOk(actual, msg);
  }
  t.end();
});

test('10: countVertical()', (t) => {
  const grid = [
    [1, 1],
    [1, 1],
    [1, 1],
    [1, 1],
  ];
  {
    const msg = '1 below';
    const expected = 1;
    const actual = countVertical(grid)(0, 0);
    t.equal(actual, expected, msg);
  }
  {
    const msg = '1 above and 1 below';
    const expected = 2;
    const actual = countVertical(grid)(1, 1);
    t.equal(actual, expected, msg);
  }

  t.end();
});

test('10: trace()', (t) => {
  const grid = [
    [1, 0, 1],
    [1, 1, 1],
  ];
  {
    const msg = '4 visible';
    const expected = 4;
    const actual = trace(grid)(0, 0);
    t.equal(actual, expected, msg);
  }
  {
    const msg = '3 visible';
    const expected = 3;
    const actual = trace(grid)(0, 1);
    t.equal(actual, expected, msg);
  }
  {
    const grid = [
      [1, 0, 1],
      [1, 1, 1],
    ];
    const msg = '3 visible';
    const expected = 3;
    const actual = trace(grid)(2, 1);
    t.equal(actual, expected, msg);
  }
  t.end();
});


test('10: solve()', (t) => {
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
      pt: [5, 8],
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
      pt: [1, 2],
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
      pt: [6, 3],
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
      pt: [11, 13],
      sum: 210,
    };
    const actual = solve(input.split('\n').map(inpMap));
    t.deepEqual(actual, expected, msg);
  }

  t.end();
});
