import test from 'tape';

import {
  add,
  mult,
} from './5';
import {
  jumpTrue,
  jumpFalse,
  lessThan,
  eq,
  transition,
  OPCODES,
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

test('5.2: transition()', (t) => {
  {
    const msg = 'adds and stores';
    const expected = [1, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50];
    const actual = transition(
        [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50],
        0,
        { fn: add, params: 3 },
    )[0];
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = 'multiplies and stores';
    const expected = [150, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50];
    const actual = transition(
        [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50],
        4,
        { fn: mult, params: 3 },
    )[0];
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = '1,0,0,0,99 becomes 2,0,0,0,99 (1 + 1 = 2).';
    const expected = [2, 0, 0, 0, 99];
    const actual = transition([1, 0, 0, 0, 99], 0, { fn: add, params: 3 })[0];
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = '2,4,4,5,99,0 becomes 2,4,4,5,99,9801 (99 * 99 = 9801).';
    const expected = [2, 4, 4, 5, 99, 9801];
    const actual = transition(
        [2, 4, 4, 5, 99, 0],
        0,
        { fn: mult, params: 3 },
    )[0];
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = '2,3,0,3,99 becomes 2,3,0,6,99 (3 * 2 = 6).';
    const expected = [2, 3, 0, 6, 99];
    const actual = transition([2, 3, 0, 3, 99], 0, { fn: mult, params: 3 })[0];
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = '3,9,8,9,10,9,4,9,99,-1,8 becomes 3,9,8,9,10,9,4,9,99,0,8 (-1 != 8)';
    const expected = [3, 9, 8, 9, 10, 9, 4, 9, 99, 0, 8];
    const actual = transition(
        [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
        2,
        { fn: eq, params: 3 },
    )[0];
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = '3,9,7,9,10,9,4,9,99,-1,8 becomes 3,9,7,9,10,9,4,9,99,1,8 (-1 < 8)';
    const expected = [3, 9, 7, 9, 10, 9, 4, 9, 99, 1, 8];
    const actual = transition(
        [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8],
        2,
        { fn: lessThan, params: 3 },
    )[0];
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = '3,3,1108,-1,8,3,4,3,99 becomes 3,3,1108,0,8,3,4,3,99 (-1 != 8)';
    const expected = [3, 3, 1108, 0, 8, 3, 4, 3, 99];
    const actual = transition(
        [3, 3, 1108, -1, 8, 3, 4, 3, 99],
        2,
        { fn: eq, params: 3 },
        [1, 1],
    )[0];
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = '3,3,1107,-1,8,3,4,3,99 becomes 3,3,1107,1,8,3,4,3,99 (-1 < 8)';
    const expected = [3, 3, 1107, 1, 8, 3, 4, 3, 99];
    const actual = transition(
        [3, 3, 1107, -1, 8, 3, 4, 3, 99],
        2,
        { fn: lessThan, params: 3 },
        [1, 1],
    )[0];
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = '3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9 doesnt change PC';
    const expected = null;
    const actual = transition(
        [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9],
        2,
        { fn: jumpFalse, params: 2 },
        OPCODES['6'],
    )[1];
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = '3,3,1105,-1,9,1101,0,0,12,4,12,99,1 sets PC to 9';
    const expected = 9;
    const actual = transition(
        [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1],
        2,
        OPCODES['5'],
        [1, 1],
    )[1];
    t.deepEqual(actual, expected, msg);
  }

  t.end();
});
