import test from 'tape';

import { totalFuel, fuelReq } from './1.js';

test('fuelReq()', function (t) {
  {
    const msg = 'mass 12 -> 2';
    const actual = fuelReq(12);
    const expected = 2;
    t.equal(actual, expected, msg);
    t.equal(actual, expected, msg);
  }
  {
    const msg = 'mass 14 -> 2';
    const actual = fuelReq(14);
    const expected = 2;
    t.equal(actual, expected, msg);
  }
  {
    const msg = 'mass 1969 -> 654';
    const actual = fuelReq(1969);
    const expected = 654;
    t.equal(actual, expected, msg);
  }
  {
    const msg = 'mass 100756 -> 33583';
    const actual = fuelReq(100756);
    const expected = 33583;
    t.equal(actual, expected, msg);
  }

  t.end();
});

test('totalFuel()', function (t) {
  {
    const msg = '[12, 14] -> 2 + 2';
    const actual = totalFuel([12, 14]);
    const expected = 2 + 2;
    t.equal(actual, expected, msg);
  }
  {
    const msg = '[100756, 1969] -> 33583 + 654';
    const actual = totalFuel([100756, 1969]);
    const expected = 33583 + 654;
    t.equal(actual, expected, msg);
  }
  {
    const msg = '[100756, 1969, 12, 14] -> 33583 + 654 + 2 + 2';
    const actual = totalFuel([100756, 1969, 12, 14]);
    const expected = 33583 + 654 + 2 + 2;
    t.equal(actual, expected, msg);
  }

  t.end();
});
