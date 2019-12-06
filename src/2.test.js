import test from 'tape';

import {
  add,
  mult,
  transition,
  computer,
  restore,
} from './2';


test('add()', (t) => {
  {
    const msg = 'commutative: the sum is the same regardless of the order of the addends';
    const left = 5;
    const right = 12;
    t.equal(add(right)(left), add(left)(right), msg);
  }
  {
    const msg = 'associative: the sum is the same regardless of the grouping of the addends';
    const left = add(add(2)(3))(4);
    const right = add(2)(add(3)(4));
    t.equal(left, right, msg);
  }
  {
    const msg = 'identity: sum of any number and zero is the original number';
    const left = Math.floor(Math.random() * 10);
    const right = add(0)(left);
    t.equal(left, right, msg);
  }
  t.end();
});

test('mult()', (t) => {
  {
    const msg = 'commutative: the product is the same regardless of the order of the multiplicands';
    const left = 5;
    const right = 12;
    t.equal(mult(right)(left), mult(left)(right), msg);
  }
  {
    // (2 * 3) * 4 = 2 * (3 * 4)
    const msg = 'associative: the product is the same regardless of the grouping of the factors';
    const left = mult(mult(2)(3))(4);
    const right = mult(2)(mult(3)(4));
    t.equal(left, right, msg);
  }
  {
    const msg = 'identity: product of any number and one is that number';
    const left = Math.floor(Math.random() * 10);
    const right = mult(1)(left);
    t.equal(left, right, msg);
  }
  {
    const msg = 'distributive property';
    const left = mult(4)(6 + 3);
    const right = mult(4)(6) + mult(4)(3);
    t.equal(left, right, msg);
  }
  t.end();
});

test('restore()', (t) => {
  {
    const msg = 'replace position 1 with the value 12 and replace position 2 with the value 2';
    const expected = [0, 12, 2, 3, 4, 5];
    const actual = restore([0, 9, 8, 3, 4, 5]);
    t.deepEqual(actual, expected, msg);
  }
  t.end();
});

test('computer()', (t) => {
  {
    const msg = '1,0,0,0,99 becomes 2,0,0,0,99 (1 + 1 = 2).';
    const expected = [2, 0, 0, 0, 99];
    const actual = computer([1, 0, 0, 0, 99]);
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = '2,3,0,3,99 becomes 2,3,0,6,99 (3 * 2 = 6).';
    const expected = [2, 3, 0, 6, 99];
    const actual = computer([2, 3, 0, 3, 99]);
    t.deepEqual(actual, expected, msg);
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

  t.end();
});

test('transition()', (t) => {
  {
    const msg = 'adds and stores';
    const expected = [1, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50];
    const actual = transition(
        [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50], 0, add);
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = 'multiplies and stores';
    const expected = [150, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50];
    const actual = transition(
        [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50], 4, mult);
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = '1,0,0,0,99 becomes 2,0,0,0,99 (1 + 1 = 2).';
    const expected = [2, 0, 0, 0, 99];
    const actual = transition([1, 0, 0, 0, 99], 0, add);
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = '2,4,4,5,99,0 becomes 2,4,4,5,99,9801 (99 * 99 = 9801).';
    const expected = [2, 4, 4, 5, 99, 9801];
    const actual = transition([2, 4, 4, 5, 99, 0], 0, mult);
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = '2,3,0,3,99 becomes 2,3,0,6,99 (3 * 2 = 6).';
    const expected = [2, 3, 0, 6, 99];
    const actual = transition([2, 3, 0, 3, 99], 0, mult);
    t.deepEqual(actual, expected, msg);
  }

  t.end();
});
