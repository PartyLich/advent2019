import test from 'tape';
import {
  formatInput,
  inpMap,
  getOffset,
  lastHalfFFt,
  mutLastHalfFFt,
  fftFrom,
  solve,
} from './16.2';


test('16.2: inpMap()', (t) => {
  {
    const msg = 'repeat sequence and format as array';
    const expected = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const actual = formatInput(10)('00');
    t.deepEqual(actual, expected, msg);
  }

  t.end();
});

test('16.2: getOffset()', (t) => {
  {
    const msg = 'return first seven digits as integer';
    const expected = 303673;
    const actual = getOffset('03036732577212944063491565474664'.split(''));
    t.equal(actual, expected, msg);
  }
  {
    const msg = 'return first seven digits as integer';
    const expected = 293510;
    const actual = getOffset('02935109699940807407585447034323'.split(''));
    t.equal(actual, expected, msg);
  }
  {
    const msg = 'return first seven digits as integer';
    const expected = 308177;
    const actual = getOffset('03081770884921959731165446850517'.split(''));
    t.equal(actual, expected, msg);
  }

  t.end();
});

test('16.2: lastHalfFft()', (t) => {
  {
    const msg = 'last half of ----5678 updated after one FFT -> ----6158';
    const input = [1, 2, 3, 4, 5, 6, 7, 8];

    const expected = [1, 2, 3, 4, 6, 1, 5, 8];
    const actual = lastHalfFFt()(input);
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = 'last half of ----5518 updated after one FFT -> ----9498';
    const input = [1, 2, 3, 4, 5, 5, 1, 8];

    const expected = [1, 2, 3, 4, 9, 4, 9, 8];
    const actual = lastHalfFFt()(input);
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = 'update from idx 5 of ----5518 updated after one FFT -> ----9498';
    const input = [1, 2, 3, 4, 5, 5, 1, 8];

    const expected = [1, 2, 3, 4, 5, 4, 9, 8];
    const actual = lastHalfFFt(5)(input);
    t.deepEqual(actual, expected, msg);
  }
  t.end();
});

test('16.2: mutLastHalfFft()', (t) => {
  {
    const msg = 'last half of ----5678 updated after one FFT -> ----6158';
    const input = [1, 2, 3, 4, 5, 6, 7, 8];

    const expected = [1, 2, 3, 4, 6, 1, 5, 8];
    const actual = mutLastHalfFFt()(input);
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = 'last half of ----5518 updated after one FFT -> ----9498';
    const input = [1, 2, 3, 4, 5, 5, 1, 8];

    const expected = [1, 2, 3, 4, 9, 4, 9, 8];
    const actual = mutLastHalfFFt()(input);
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = 'update from idx 5 of ----5518 updated after one FFT -> ----9498';
    const input = [1, 2, 3, 4, 5, 5, 1, 8];

    const expected = [1, 2, 3, 4, 5, 4, 9, 8];
    const actual = mutLastHalfFFt(5)(input);
    t.deepEqual(actual, expected, msg);
  }
  t.end();
});

test('16.2: fftFrom()', (t) => {
  {
    const msg = '2 phases FFT of ----5678 -> ----0438';
    const expected = [1, 2, 3, 4, 0, 4, 3, 8];
    const actual = fftFrom()(2)([1, 2, 3, 4, 5, 6, 7, 8]);
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = '3 phases FFT of ----5678 -> ----5518';
    const expected = [1, 2, 3, 4, 5, 5, 1, 8];
    const actual = fftFrom()(3)([1, 2, 3, 4, 5, 6, 7, 8]);
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = '4 phases FFT of ----5678 -> ----9498';
    const expected = [1, 2, 3, 4, 9, 4, 9, 8];
    const actual = fftFrom()(4)([1, 2, 3, 4, 5, 6, 7, 8]);
    t.deepEqual(actual, expected, msg);
  }

  t.end();
});

test('16.2: solve()', (t) => {
  {
    const input = inpMap('03036732577212944063491565474664');
    const msg = '100 phases FFT of 03036732577212944063491565474664 -> 84462026';
    const expected = '84462026';
    const actual = solve([input]);
    t.equal(actual, expected, msg);
  }
  {
    const msg = '100 phases FFT of 02935109699940807407585447034323 -> 78725270';
    const input = inpMap('02935109699940807407585447034323');
    const expected = '78725270';
    const actual = solve([input]);
    t.equal(actual, expected, msg);
  }
  {
    const msg = '100 phases FFT of 03081770884921959731165446850517 -> 53553731';
    const input = inpMap('03081770884921959731165446850517');
    const expected = '53553731';
    const actual = solve([input]);
    t.equal(actual, expected, msg);
  }

  t.end();
});
