import test from 'tape';

import {
  getInput,
  trySettings,
  getPermutations,
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

test('7: trySettings()', (t) => {
  const msg = 'returns final thruster signal after amplification';
  {
    const expected = 43210;
    const program = [
      3, 15, 3, 16, 1002, 16, 10, 16, 1, 16, 15, 15, 4, 15, 99, 0, 0,
    ];
    const phases = [4, 3, 2, 1, 0];
    const actual = trySettings(program)(phases);
    t.equal(actual, expected, msg);
  }
  {
    const expected = 54321;
    const program = [
      3, 23, 3, 24, 1002, 24, 10, 24, 1002, 23, -1, 23,
      101, 5, 23, 23, 1, 24, 23, 23, 4, 23, 99, 0, 0,
    ];
    const phases = [0, 1, 2, 3, 4];
    const actual = trySettings(program)(phases);
    t.equal(actual, expected, msg);
  }
  {
    const expected = 65210;
    const program = [
      3, 31, 3, 32, 1002, 32, 10, 32, 1001, 31, -2, 31, 1007, 31, 0, 33,
      1002, 33, 7, 33, 1, 33, 31, 31, 1, 32, 31, 31, 4, 31, 99, 0, 0, 0,
    ];
    const phases = [1, 0, 4, 3, 2];
    const actual = trySettings(program)(phases);
    t.equal(actual, expected, msg);
  }
  t.end();
});

test('7: getPermutations()', (t) => {
  {
    const msg = 'returns list of array permutations';
    const expected = [
      [0, 1, 2],
      [0, 2, 1],
      [1, 0, 2],
      [1, 2, 0],
      [2, 0, 1],
      [2, 1, 0],
    ];
    const actual = getPermutations({})([0, 1, 2]);
    const THREE_FACTORIAL = 6;
    t.equal(actual.length, THREE_FACTORIAL, msg);
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = 'returns list with n! length';
    const actual = getPermutations({})([0, 1, 2, 3, 4]);
    const FIVE_FACTORIAL = 120;
    t.equal(actual.length, FIVE_FACTORIAL, msg);
  }
  t.end();
});
