import test from 'tape';
import {
  get2d,
  sumAlignmentParameters,
} from './17';


test('17: get2d()', (t) => {
  {
    const msg = 'returns value as though array was 2x2';
    const arr = [1, 2, 3, 4];
    const width = 2;

    let expected = 1;
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 2; c++) {
        const actual = get2d(width)(arr)(r)(c);
        t.equal(actual, expected, msg);
        expected += 1;
      }
    }
  }
  t.end();
});

test('17: sumAlignmentParameters()', (t) => {
  {
    const msg = 'sums intersection alignment parameters';
    const img = `..#..........
..#..........
#######...###
#.#...#...#.#
#############
..#...#...#..
..#####...^..

`;
    const map = img.split('').map((str) => str.charCodeAt(0));

    const expected = 76;
    const actual = sumAlignmentParameters(map);
    t.equal(actual, expected, msg);
  }
  t.end();
});
