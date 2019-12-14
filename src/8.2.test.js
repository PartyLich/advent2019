import test from 'tape';
import {
  setIfBlank,
  flattenLayers,
  toString,
} from './8.2';

test('8.2: setIfBlank()', (t) => {
  const pixels = '0222112222120000'.split('').map((x) => parseInt(x, 10));

  {
    const msg = 'set blank pixel to black';
    const expected = 0;
    const actual = setIfBlank(pixels)(2, 0);
    t.equal(actual, expected, msg);
  }
  {
    const msg = 'set blank pixel to white';
    const expected = 1;
    const actual = setIfBlank(pixels)(2, 4);
    t.equal(actual, expected, msg);
  }
  {
    const msg = 'return already set pixel';
    const expected = 1;
    const actual = setIfBlank(pixels)(1, 0);
    t.equal(actual, expected, msg);
  }

  t.end();
});

test('8.2: flattenLayers()', (t) => {
  {
    const pixels = '0222112222120000'.split('').map((x) => parseInt(x, 10));
    const msg = 'flatten img layers';
    const expected = [0, 1, 1, 0];
    const actual = flattenLayers(pixels, 2, 2);
    t.deepEqual(actual, expected, msg);
  }

  t.end();
});

test('8.2: checkImage()', (t) => {
  {
    const img = [
      0, 1,
      1, 0,
    ];
    const msg = 'translate image buffer to string';
    const expected = `01
10`;
    const actual = toString(img, 2);
    t.equal(actual, expected, msg);
  }

  t.end();
});
