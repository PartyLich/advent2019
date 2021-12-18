import test from 'tape';

import {
  fmt,
} from './24.2';


test('24.2: fmt()', (t) => {
  {
    const msg = 'format input as Set of 3d coordinates';
    const input = [
      [false, true],
      [true, false],
    ];

    const expected = new Set([
      JSON.stringify({ r: 0, c: 1, z: 0 }),
      JSON.stringify({ r: 1, c: 0, z: 0 }),
    ]);
    const actual = fmt(input);
    t.deepEqual(actual, expected, msg);
  }
  t.end();
});
