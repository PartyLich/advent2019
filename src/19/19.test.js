import test from 'tape';
import {
  rowWidth,
  first,
  squareInBeam,
  formatAnswer,
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

    const actual = first(inBeam)(3, 2);
    t.equal(typeof actual, 'object');
    t.equal(5, actual.x, msg);
    t.equal(3, actual.y, msg);
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

test('19.2: formatAnswer()', (t) => {
  {
    const msg = 'formats point to specified number format';
    const expected = 250020;
    const actual = formatAnswer(10)({ x: 25, y: 29 });
    t.equal(actual, expected, msg);
  }
  t.end();
});
