import test from 'tape';

import {
  restore,
} from './2.2';


test('restore() 2.2', (t) => {
  {
    const msg = 'restore state with noun = 12 and verb = 2';
    const expected = [0, 12, 2, 3, 4, 5];
    const [noun, verb] = [12, 2];
    const actual = restore([0, 9, 8, 3, 4, 5])(noun, verb);
    t.deepEqual(actual, expected, msg);
  }
  t.end();
});
