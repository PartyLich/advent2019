import test from 'tape';
import {
  and,
  or,
  not,
} from './21';


test('21: instructions()', (t) => {
  {
    const msg = 'return ascii coded AND instruction';

    const expected = [65, 78, 68, 32, 65, 32, 74, 10];
    const actual = and('A'.charCodeAt(0), 'J'.charCodeAt(0));
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = 'return ascii coded NOT instruction';

    const expected = [78, 79, 84, 32, 65, 32, 74, 10];
    const actual = not('A'.charCodeAt(0), 'J'.charCodeAt(0));
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = 'return ascii coded OR instruction';

    const expected = [79, 82, 32, 65, 32, 74, 10];
    const actual = or('A'.charCodeAt(0), 'J'.charCodeAt(0));
    t.deepEqual(actual, expected, msg);
  }
  t.end();
});
