import test from 'tape';

import {
  eq,
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
