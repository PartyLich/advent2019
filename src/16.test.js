import test from 'tape';
import {
  firstEight,
  makeNode,
  fftOnce,
  fft,
  lastDigit,
  solve,
} from './16';


test('16: lastDigit()', (t) => {
  {
    const msg = 'only digit';
    const expected = 8;
    const actual = lastDigit('8');
    t.equal(actual, expected, msg);
  }
  {
    const msg = 'negatives';
    const expected = 8;
    const actual = lastDigit('-12345678');
    t.equal(actual, expected, msg);
  }
  {
    const msg = 'bigger number';
    const expected = 8;
    const actual = lastDigit('12345678');
    t.equal(actual, expected, msg);
  }

  t.end();
});

test('16: firstEight()', (t) => {
  {
    const msg = 'returns a string';
    const expected = 'string';
    const actual = typeof firstEight('12345678');
    t.equal(actual, expected, msg);
  }
  {
    const msg = 'first 8 digits of 5596 -> 5596';
    const expected = '5596';
    const actual = firstEight('5596');
    t.equal(actual, expected, msg);
  }
  {
    const msg = 'first 8 digits of 1961780420720220 -> 19617804';
    const expected = '19617804';
    const actual = firstEight('1961780420720220');
    t.equal(actual, expected, msg);
  }
  {
    const msg = 'handle ints bigger than Number max size';
    const expected = '80871224';
    const actual = firstEight('80871224585914546619083218645595');
    t.equal(actual, expected, msg);
  }

  t.end();
});

test('16: makeNode()', (t) => {
  {
    const msg = 'returns an object';
    const expected = 'object';
    const actual = typeof makeNode();
    t.equal(actual, expected, msg);
  }
  {
    const msg = 'node.next defaults to null';
    const expected = null;
    const actual = makeNode().next;
    t.equal(actual, expected, msg);
  }
  {
    const msg = 'node.val can be initialized';
    const expected = 5;
    const actual = makeNode(expected).val;
    t.equal(actual, expected, msg);
  }

  t.end();
});

test('16: fftOnce()', (t) => {
  {
    const msg = '1 phase FFT of 12345678 -> 48226158';
    const expected = [4, 8, 2, 2, 6, 1, 5, 8];
    const actual = fftOnce([1, 2, 3, 4, 5, 6, 7, 8]);
    t.deepEqual(actual, expected, msg);
  }

  t.end();
});

test('16: fft()', (t) => {
  {
    const msg = '2 phases FFT of 12345678 -> 34040438';
    const expected = [3, 4, 0, 4, 0, 4, 3, 8];
    const actual = fft(2)([1, 2, 3, 4, 5, 6, 7, 8]);
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = '3 phases FFT of 12345678 -> 03415518';
    const expected = [0, 3, 4, 1, 5, 5, 1, 8];
    const actual = fft(3)([1, 2, 3, 4, 5, 6, 7, 8]);
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = '4 phases FFT of 12345678 -> 01029498';
    const expected = [0, 1, 0, 2, 9, 4, 9, 8];
    const actual = fft(4)([1, 2, 3, 4, 5, 6, 7, 8]);
    t.deepEqual(actual, expected, msg);
  }

  t.end();
});

test('16: solve()', (t) => {
  {
    const msg = '100 phases FFT of 80871224585914546619083218645595 -> 24176176';
    const expected = '24176176';
    const actual = solve(['80871224585914546619083218645595']);
    t.equal(actual, expected, msg);
  }
  {
    const msg = '100 phases FFT of 19617804207202209144916044189917 -> 73745418';
    const expected = '73745418';
    const actual = solve(['19617804207202209144916044189917']);
    t.equal(actual, expected, msg);
  }
  {
    const msg = '100 phases FFT of 69317163492948606335995924319873 -> 52432133';
    const expected = '52432133';
    const actual = solve(['69317163492948606335995924319873']);
    t.equal(actual, expected, msg);
  }

  t.end();
});
