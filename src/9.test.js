import test from 'tape';

import {
  makeOpcodes,
  compute,
} from './9';


test('9: compute()', (t) => {
  {
    const msg = 'produces a copy of itself as output';
    const program = [
      109, 1, 204, -1, 1001, 100, 1, 100, 1008, 100, 16, 101, 1006, 101, 0, 99,
    ];
    const actual = [];
    compute(makeOpcodes(
        () => {},
        (value) => actual.push(value),
    ))({ mem: program, pc: 0, rb: 0 });
    t.deepEqual(actual, program, msg);
  }
  {
    const msg = 'program should output a 16 digit number';
    const program = [
      1102, 34915192, 34915192, 7, 4, 7, 99, 0,
    ];
    const expected = 16;
    let actual = '';
    compute(makeOpcodes(
        () => {},
        (value) => actual += value,
    ))({ mem: program, pc: 0, rb: 0 });
    t.deepEqual(actual.length, expected, msg);
  }
  {
    const msg = 'program should output 1125899906842624';
    const program = [104, 1125899906842624, 99];
    const expected = 1125899906842624;
    let actual;
    compute(makeOpcodes(
        () => {},
        (value) => actual = value,
    ))({ mem: program, pc: 0, rb: 0 });
    t.equal(actual, expected, msg);
  }
  {
    const msg = '1 < 2, so set idx 7 to 1';
    const program = [
      2107, 1, 2, 7, 4, 7, 99, 5,
    ];
    const expected = 1;
    let actual;
    compute(makeOpcodes(
        () => {},
        (value) => actual = value,
    ))({ mem: program, pc: 0, rb: 0 });
    t.equal(actual, expected, msg);
  }
  {
    const msg = '2 == 2, so set idx 9 to 1';
    const program = [
      9, 1, 2108, 2, 2, 9, 4, 9, 99, 5,
    ];
    const expected = 1;
    let actual;
    compute(makeOpcodes(
        () => {},
        (value) => actual = value,
    ))({ mem: program, pc: 0, rb: 0 });
    t.equal(actual, expected, msg);
  }
  {
    const msg = '2 + 2 = 4';
    const program = [
      9, 1, 2101, 2, 2, 9, 4, 9, 99, 4,
    ];
    const expected = 4;
    let actual;
    compute(makeOpcodes(
        () => {},
        (value) => actual = value,
    ))({ mem: program, pc: 0, rb: 0 });
    t.equal(actual, expected, msg);
  }
  {
    const msg = '2 * 2 = 4';
    const program = [
      9, 1, 2102, 2, 2, 9, 4, 9, 99, 4,
    ];
    const expected = 4;
    let actual;
    compute(makeOpcodes(
        () => {},
        (value) => actual = value,
    ))({ mem: program, pc: 0, rb: 0 });
    t.equal(actual, expected, msg);
  }
  t.end();
});
