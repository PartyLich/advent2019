import test from 'tape';

import {
  eq,
  lcm,
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
