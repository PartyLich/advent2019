import test from 'tape';
import {
  checkCriteria,
  baseCase,
} from './4.2';


test('4.2: checkCriteria()', (t) => {
  {
    const msg = '4.2 example 1';
    const expected = { last: '3', double: 3 };
    const actual = '112233'.split('').reduce(checkCriteria, baseCase);
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = '4.2 example 2';
    const expected = { last: '4', double: 0 };
    const actual = '123444'.split('').reduce(checkCriteria, baseCase);
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = '4.2 example 3';
    const expected = { last: '2', double: 1 };
    const actual = '111122'.split('').reduce(checkCriteria, baseCase);
    t.deepEqual(actual, expected, msg);
  }

  t.end();
});
