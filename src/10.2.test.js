import test from 'tape';

import { mapNodes } from './10v2';
import {
  eq,
  distance,
  slopeMap,
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

test('10.2: slopeMap()', (t) => {
  const grid = [
    [0, 0, 1],
    [1, 1, 1],
  ];
  {
    const msg = 'creates map from slope to node list';
    const expected = {
      'above': [],
      'below': [{ pt: { x: 0, y: 1 }, distance: 1 }],
      '0': { right: [{ pt: { x: 2, y: 0 }, distance: 4 }], left: [] },
      '1': { right: [{ pt: { x: 1, y: 1 }, distance: 2 }], left: [] },
      '0.5': { right: [{ pt: { x: 2, y: 1 }, distance: 5 }], left: [] },
    };
    const actual = slopeMap({ x: 0, y: 0 })(mapNodes(grid));
    t.deepEqual(actual, expected, msg);
  }
  t.end();
});
