import test from 'tape';

import {
  checkCriteria,
  baseCase,
  seek,
} from './4';


test('4: checkCriteria()', (t) => {
  {
    const msg = 'example 1 -- 111111';
    const expected = { last: '1', double: true };
    const actual = '111111'.split('').reduce(checkCriteria, baseCase);
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = 'example 2 -- 223450';
    const actual = '223450'.split('').reduce(checkCriteria, baseCase);
    t.notOk(actual, msg);
  }
  {
    const msg = 'example 3 -- 123789';
    const expected = { last: '9', double: false };
    const actual = '123789'.split('').reduce(checkCriteria, baseCase);
    t.deepEqual(actual, expected, msg);
  }

  t.end();
});

test('4: seek()', (t) => {
  {
    const msg = 'example 111111-111120 --> 9';
    const expected = 9;
    const actual = seek(checkCriteria, baseCase)(111111)(111120);
    t.equal(actual, expected, msg);
  }

  t.end();
});
