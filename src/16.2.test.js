import test from 'tape';
import {
  formatInput,
  inpMap,
  getOffset,
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


test('16.2: solve()', (t) => {
  {
    console.time('inpMap');
    const input = inpMap('03036732577212944063491565474664');
    console.timeEnd('inpMap');
    console.log(Array.isArray(input), input.length);
    const msg = '100 phases FFT of 03036732577212944063491565474664 -> 84462026';
    const expected = '84462026';
    console.time('solve');
    const actual = solve([input]);
    console.timeEnd('solve');
    t.equal(actual, expected, msg);
  }
  {
    const msg = '100 phases FFT of 02935109699940807407585447034323 -> 78725270';
    const expected = '78725270';
    const actual = solve(['02935109699940807407585447034323']);
    t.equal(actual, expected, msg);
  }
  {
    const msg = '100 phases FFT of 03081770884921959731165446850517 -> 53553731';
    const expected = '53553731';
    const actual = solve(['03081770884921959731165446850517']);
    t.equal(actual, expected, msg);
  }

  t.end();
});
