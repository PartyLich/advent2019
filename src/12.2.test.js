import test from 'tape';

import { parseBody } from './12';
import {
  eq,
  lcm,
  solve,
} from './12.2';


test('12.2: array shallow eq()', (t) => {
  {
    const msg = 'true when array contents are equal';
    const actual = eq([-1, 2, 4, 3])([-1, 2, 4, 3]);
    t.ok(actual, msg);
  }
  {
    const msg = 'false when array contents differ';
    const actual = eq([-1, 2, 4, 3])([]);
    t.notOk(actual, msg);
  }
  t.end();
});

test('12.2: least common multiple', (t) => {
  const msg = 'should return the least common multiple';
  {
    const expected = 90;
    const actual = lcm(18, 30);
    t.equal(actual, expected, msg);
  }
  {
    const expected = 84;
    const actual = lcm(21, 28);
    t.equal(actual, expected, msg);
  }
  {
    const expected = 140;
    const actual = lcm(14, 20);
    t.equal(actual, expected, msg);
  }
  t.end();
});

test('12.2: solve()', (t) => {
  const msg = 'returns steps required to repeat initial state';
  {
    const ex0 = `<x=-1, y=0, z=2>
<x=2, y=-10, z=-7>
<x=4, y=-8, z=8>
<x=3, y=5, z=-1>`;
    const expected = 2772;
    const actual = solve(ex0.split('\n').map(parseBody));
    t.deepEqual(actual, expected, msg);
  }
  {
    const input = `<x=-8, y=-10, z=0>
<x=5, y=5, z=10>
<x=2, y=-7, z=3>
<x=9, y=-8, z=-3>`;
    const expected = 4686774924;
    const actual = solve(input.split('\n').map(parseBody));
    t.deepEqual(actual, expected, msg);
  }
  t.end();
});
