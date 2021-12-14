import test from 'tape';
import {
  rowWidth,
  first,
  squareInBeam,
} from './19.2';


test('19.2: rowWidth()', (t) => {
  {
    const msg = 'return width of the beam at provided height';
    const inBeam = (x, _y) => [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0][x];

    const expected = 3;
    const actual = rowWidth(inBeam)(3, 2);
    t.equal(actual, expected, msg);
  }
  t.end();
});

test('19.2: first()', (t) => {
  {
    const msg = 'return first beam affected Point at the supplied height y';
    const inBeam = (x, _y) => [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0][x];

    const expected = { x: 5, y: 3 };
    const actual = first(inBeam)(3, 2);
    t.deepEqual(actual, expected, msg);
  }
  t.end();
});

test('19.2: squareInBeam()', (t) => {
  {
    const msg = 'true if square of given size with bottom left corner at given point is within the beam';
    const inBeam = (x, y) => [
      [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    ][y][x];

    const inside = squareInBeam(3)(inBeam)({ x: 5, y: 2 });
    t.ok(inside, msg);
    const outside = squareInBeam(3)(inBeam)({ x: 6, y: 2 });
    t.notOk(outside, msg);
  }
  t.end();
});
