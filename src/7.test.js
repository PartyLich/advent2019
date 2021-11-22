import test from 'tape';

import {
  getInput,
} from './7';


test('7: input generator', (t) => {
  {
    const msg = 'yields array values in order';
    const iter = getInput([3, 0]);

    t.equal(iter.next().value, 3, msg);
    t.equal(iter.next().value, 0, msg);
    t.equal(iter.next().value, undefined, msg);
    t.ok(iter.next().done, msg);
  }
  {
    const msg = 'accepts new array';
    const iter = getInput([3, 0]);

    t.equal(iter.next().value, 3, msg);
    t.equal(iter.next([4, 5]).value, 4, msg);
    t.equal(iter.next().value, 5, msg);
    t.ok(iter.next().done, msg);
  }
  t.end();
});
