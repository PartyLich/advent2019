import test from 'tape';
import {
  add,
  mult,
  parseMode,
  parseOpcode,
  transition,
  loadArgs,
  computer,
} from './5';


test('5: add()', (t) => {
  {
    const msg = 'commutative: the sum is the same regardless of the order of the addends';
    const left = 5;
    const right = 12;
    t.equal(add(right, left), add(left, right), msg);
  }
  {
    const msg = 'associative: the sum is the same regardless of the grouping of the addends';
    const left = add(add(2, 3), 4);
    const right = add(2, add(3, 4));
    t.equal(left, right, msg);
  }
  {
    const msg = 'identity: sum of any number and zero is the original number';
    const left = Math.floor(Math.random() * 10);
    const right = add(0, left);
    t.equal(left, right, msg);
  }
  t.end();
});

test('5: mult()', (t) => {
  {
    const msg = 'commutative: the product is the same regardless of the order of the multiplicands';
    const left = 5;
    const right = 12;
    t.equal(mult(right, left), mult(left, right), msg);
  }
  {
    // (2 * 3) * 4 = 2 * (3 * 4)
    const msg = 'associative: the product is the same regardless of the grouping of the factors';
    const left = mult(mult(2, 3), 4);
    const right = mult(2, mult(3, 4));
    t.equal(left, right, msg);
  }
  {
    const msg = 'identity: product of any number and one is that number';
    const left = Math.floor(Math.random() * 10);
    const right = mult(1, left);
    t.equal(left, right, msg);
  }
  {
    const msg = 'distributive property';
    const left = mult(4, 6 + 3);
    const right = mult(4, 6) + mult(4, 3);
    t.equal(left, right, msg);
  }
  t.end();
});

test('5: parseOpcode()', (t) => {
  {
    const msg = 'parse 10s and 1s places from string';
    const expected = 2;
    const actual = parseOpcode(1002);
    t.equal(actual, expected, msg);
  }
  t.end();
});

test('5: parseMode()', (t) => {
  {
    const msg = 'create mode array from number';
    const expected = [1, 0];
    const actual = parseMode(1002);
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = 'handle implicit 0 modes';
    const expected = [0];
    const actual = parseMode(2);
    t.deepEqual(actual, expected, msg);
  }
  t.end();
});

test('loadArgs()', (t) => {
  {
    const state = [1002, 4, 3, 4, 33];
    const msg = 'position mode';
    const expected = 33;
    const actual = loadArgs(state)([1, 0])(4, 0);
    t.equal(actual, expected, msg);
  }
  {
    const state = [1002, 4, 3, 4, 33];
    const msg = 'immediate mode';
    const expected = 3;
    const actual = loadArgs(state)([1, 0])(3, 1);
    t.equal(actual, expected, msg);
  }

  t.end();
});

test('transition()', (t) => {
  {
    const msg = 'adds and stores';
    const expected = [1, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50];
    const actual = transition(
        [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50], 0, { fn: add, params: 3 });
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = 'multiplies and stores';
    const expected = [150, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50];
    const actual = transition(
        [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50], 4, { fn: mult, params: 3 });
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = '1,0,0,0,99 becomes 2,0,0,0,99 (1 + 1 = 2).';
    const expected = [2, 0, 0, 0, 99];
    const actual = transition([1, 0, 0, 0, 99], 0, { fn: add, params: 3 });
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = '2,4,4,5,99,0 becomes 2,4,4,5,99,9801 (99 * 99 = 9801).';
    const expected = [2, 4, 4, 5, 99, 9801];
    const actual = transition([2, 4, 4, 5, 99, 0], 0, { fn: mult, params: 3 });
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = '2,3,0,3,99 becomes 2,3,0,6,99 (3 * 2 = 6).';
    const expected = [2, 3, 0, 6, 99];
    const actual = transition([2, 3, 0, 3, 99], 0, { fn: mult, params: 3 });
    t.deepEqual(actual, expected, msg);
  }

  t.end();
});

test('5: computer()', (t) => {
  {
    const msg = '1,0,0,0,99 becomes 2,0,0,0,99 (1 + 1 = 2).';
    const expected = [2, 0, 0, 0, 99];
    const actual = computer([1, 0, 0, 0, 99]);
    t.deepEqual(actual, expected, msg);
  }
  {
    const input = [2, 3, 0, 3, 99];
    const msg = '2,3,0,3,99 becomes 2,3,0,6,99 (3 * 2 = 6).';
    const expected = [2, 3, 0, 6, 99];
    const actual = computer(input);
    t.deepEqual(actual, expected, msg);
    t.deepEqual(input, [2, 3, 0, 3, 99], 'input not modified');
  }
  {
    const msg = '2,4,4,5,99,0 becomes 2,4,4,5,99,9801 (99 * 99 = 9801).';
    const expected = [2, 4, 4, 5, 99, 9801];
    const actual = computer([2, 4, 4, 5, 99, 0]);
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = '1,1,1,4,99,5,6,0,99 becomes 30,1,1,4,2,5,6,0,99.';
    const expected = [30, 1, 1, 4, 2, 5, 6, 0, 99];
    const actual = computer([1, 1, 1, 4, 99, 5, 6, 0, 99]);
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = '1002, 4, 3, 4, 33 becomes 1002, 4, 3, 4, 99';
    const expected = [1002, 4, 3, 4, 99];
    const actual = computer([1002, 4, 3, 4, 33]);
    t.deepEqual(actual, expected, msg);
  }

  t.end();
});
