import test from 'tape';
import {
  inpMap,
  checkImage,
  // solve,
} from './8';

test('8: inpMap()', (t) => {
  {
    const msg = 'maps to []number decimal integers';
    const expected = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2]];
    const actual = ['123456789012'].map(inpMap);
    t.deepEqual(actual, expected, msg);
  }

  t.end();
});

test('8: checkImage()', (t) => {
  const input = [
    1, 2, 3, 4, 5, 6,
    7, 8, 9, 0, 1, 2,
  ];

  {
    const msg = 'number of 1 digits multiplied by the number of 2 digits';
    const expected = 1;
    const actual = checkImage(3 * 2)(input);
    t.equal(actual, expected, msg);
  }
  {
    const input = [
      1, 2, 3, 4, 5, 0,
      7, 8, 9, 0, 1, 2,
      7, 8, 1, 1, 1, 2,
    ];
    const msg = 'number of 1 digits multiplied by the number of 2 digits';
    const expected = 3;
    const actual = checkImage(3 * 2)(input);
    t.equal(actual, expected, msg);
  }

  t.end();
});
