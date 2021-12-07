import test from 'tape';
import {
  get2d,
} from './17';
import {
  findBot,
  idxToPoint,
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
