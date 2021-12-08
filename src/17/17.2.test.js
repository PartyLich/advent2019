import test from 'tape';
import {
  get2d,
} from './17';
import {
  findBot,
  idxToPoint,
  findPath,
  getBuckets,
  getRoutine,
} from './17.2';


test('17.2: findBot()', (t) => {
  {
    const msg = 'returns index of robot';
    const img = `..#..........
..#..........
#######...###
#.#...#...#.#
#############
..#...#...#..
..#####...^..

`;
    const map = img.split('').map((str) => str.charCodeAt(0));

    const expected = get2d(14)(map)(6)(10);
    const actual = map[findBot(map).pos];
    t.equal(actual, expected, msg);
  }
  {
    const msg = 'returns index of robot';
    const img = `..#..........
..#..........
#######...###
#.#...#...#.#
#############
..#...#...#..
..#####...>..

`;
    const map = img.split('').map((str) => str.charCodeAt(0));

    const expected = get2d(14)(map)(6)(10);
    const actual = map[findBot(map).pos];
    t.equal(actual, expected, msg);
  }
  {
    const msg = 'returns index of robot';
    const img = `..#..........
..#..........
#######...###
#.#...#...#.#
#############
..#...#...#..
..#####...<..

`;
    const map = img.split('').map((str) => str.charCodeAt(0));

    const expected = get2d(14)(map)(6)(10);
    const actual = map[findBot(map).pos];
    t.equal(actual, expected, msg);
  }
  {
    const msg = 'returns index of robot';
    const img = `..#..........
..#..........
#######...###
#.#...#...#.#
#############
..#...#...#..
..#####...v..

`;
    const map = img.split('').map((str) => str.charCodeAt(0));

    const expected = get2d(14)(map)(6)(10);
    const actual = map[findBot(map).pos];
    t.equal(actual, expected, msg);
  }
  t.end();
});

test('17.2: idxToPoint()', (t) => {
  {
    const msg = 'convert 1d index to Point as though array was 2x2';
    const width = 2;

    let i = 0;
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 2; c++) {
        const expected = { x: c, y: r };
        const actual = idxToPoint(width)(i);
        t.deepEqual(actual, expected, msg);

        i += 1;
      }
    }
  }
  t.end();
});

test('17.2: findPath()', (t) => {
  {
    const msg = 'returns unoptimized path instruction list';
    const img = `#######...#####
#.....#...#...#
#.....#...#...#
......#...#...#
......#...###.#
......#.....#.#
^########...#.#
......#.#...#.#
......#########
........#...#..
....#########..
....#...#......
....#...#......
....#...#......
....#####......

`;
    const map = img.split('').map((str) => str.charCodeAt(0));

    const expected = 'R,8,R,8,R,4,R,4,R,8,L,6,L,2,R,4,R,4,R,8,R,8,R,8,L,6,L,2';
    const actual = findPath(map).join(',');
    t.equal(actual, expected, msg);
  }
  t.end();
});

test('17.2: getBuckets()', (t) => {
  {
    const msg = 'reduces path instruction list to repeated chunks';
    const path = ['R', 8, 'R', 8, 'R', 4, 'R', 4, 'R', 8, 'L', 6, 'L', 2, 'R', 4, 'R', 4, 'R', 8, 'R', 8, 'R', 8, 'L', 6, 'L', 2];

    const expected = [
      ['R', 8, 'R', 8],
      ['R', 4, 'R', 4, 'R', 8],
      ['L', 6, 'L', 2],
    ];
    const actual = getBuckets(path);
    t.deepEqual(actual.sort(), expected.sort(), msg);
  }
  t.end();
});

test('17.2: getRoutine()', (t) => {
  {
    const msg = 'creates a main fn from the supplied fn list';
    const path = ['R', 8, 'R', 8, 'R', 4, 'R', 4, 'R', 8, 'L', 6, 'L', 2, 'R', 4, 'R', 4, 'R', 8, 'R', 8, 'R', 8, 'L', 6, 'L', 2];
    const buckets = [
      ['R', 8, 'R', 8],
      ['R', 4, 'R', 4, 'R', 8],
      ['L', 6, 'L', 2],
    ];

    const expected = [0, 1, 2, 1, 0, 2];
    const actual = getRoutine(path)(buckets);
    t.deepEqual(actual, expected, msg);
  }
  t.end();
});
