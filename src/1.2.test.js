import test from 'tape';

import { subFuel } from './1.2';

test('subFuel()', function (t) {
  {
    const msg = 'mass 14 -> 2';
    const actual = subFuel(14);
    const expected = 2;
    t.equal(actual, expected, msg);
  }
  {
    const msg = 'mass 1969 -> 966';
    const actual = subFuel(1969);
    const expected = 966;
    t.equal(actual, expected, msg);
  }
  {
    const msg = 'mass 100756 -> 50346';
    const actual = subFuel(100756);
    const expected = 50346;
    t.equal(actual, expected, msg);
  }

  t.end();
});
