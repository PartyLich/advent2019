import test from 'tape';
import {
  get2d,
} from './17';
import {
  findBot,
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
