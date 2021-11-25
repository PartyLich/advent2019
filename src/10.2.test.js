import test from 'tape';

import {
  eq,
  distance,
} from './10.2';


test('10.2: Point eq()', (t) => {
  const msg = 'compare two Points for equality';
  {
    const point = { x: -1, y: 42 };
    const actual = eq(point)(point);
    t.ok(actual, msg);
  }
  {
    const actual = eq({ x: 0, y: 0 })({ x: 1, y: 1 });
    t.notOk(actual, msg);
  }
  t.end();
});

test('10.2: distance()', (t) => {
  const msg = 'squared distance between two points';
  {
    const expected = 2;
    const actual = distance({ x: 0, y: 0 })({ x: 1, y: 1 });
    t.equal(actual, expected, msg);
  }
  {
    const expected = 5;
    const actual = distance({ x: 0, y: 0 })({ x: 2, y: 1 });
    t.equal(actual, expected, msg);
  }
  t.end();
});
