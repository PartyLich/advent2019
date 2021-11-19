import test from 'tape';

import {
  jumpTrue,
  jumpFalse,
  lessThan,
  eq,
} from './5.2';


test('5.2: lessThan()', (t) => {
  {
    const msg = 'if a < b, returns 1';
    const expected = 1;
    const a = 5;
    const b = 12;
    const actual = lessThan(a, b);
    t.equal(actual, expected, msg);
  }
  {
    const msg = 'if a >= b, returns 0';
    const expected = 0;
    const a = 99;
    const b = 0;
    const actual = lessThan(a, b);
    t.equal(actual, expected, msg);
  }
  t.end();
});

test('5.2: equals()', (t) => {
  {
    const msg = 'if a = b, returns 1';
    const expected = 1;
    const a = 5;
    const b = 5;
    const actual = eq(a, b);
    t.equal(actual, expected, msg);
  }
  {
    const msg = 'if a != b, returns 0';
    const expected = 0;
    const a = 99;
    const b = 0;
    const actual = eq(a, b);
    t.equal(actual, expected, msg);
  }
  t.end();
});

test('5.2: jumpTrue()', (t) => {
  {
    const msg = 'if first param is non-zero, returns second param';
    const expected = 12;
    const actual = jumpTrue(5, expected);
    t.equal(actual, expected, msg);
  }
  {
    const msg = 'if first param is zero, returns null';
    const expected = null;
    const actual = jumpTrue(0, 12);
    t.equal(actual, expected, msg);
  }
  t.end();
});

test('5.2: jumpFalse()', (t) => {
  {
    const msg = 'if first param is zero, returns second param';
    const expected = 12;
    const actual = jumpFalse(0, expected);
    t.equal(actual, expected, msg);
  }
  {
    const msg = 'if first param is non-zero, returns null';
    const expected = null;
    const actual = jumpFalse(5, 12);
    t.equal(actual, expected, msg);
  }
  t.end();
});
