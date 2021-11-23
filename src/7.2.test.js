import test from 'tape';

import { makeOpcodes } from './7';
import {
  computer,
} from './7.2';


test('7.2: computer()', (t) => {
  const msg = 'iterates through computer state';
  {
    const program = [
      3, 26, 1001, 26, -4, 26, 3, 27, 1002, 27, 2, 27, 1, 27, 26,
      27, 4, 27, 1001, 28, -1, 28, 1005, 28, 6, 99, 0, 0, 5,
    ];
    const inputIter = [9, 0][Symbol.iterator]();
    const stateIter = computer(makeOpcodes(
        () => inputIter.next().value,
        (_) => {/* noop */},
    ))({ state: program });

    const expected = 2;
    const actual = stateIter.next().value;
    t.equal(actual.pc, expected, msg);
  }
  {
    const program = [
      3, 26, 1001, 26, -4, 26, 3, 27, 1002, 27, 2, 27, 1, 27, 26,
      27, 4, 27, 1001, 28, -1, 28, 1005, 28, 6, 99, 0, 0, 5,
    ];

    let output;
    const inputIter = [9, 0][Symbol.iterator]();
    const stateIter = computer(makeOpcodes(
        () => inputIter.next().value,
        (value) => {
          // side effect: set accumulator to output value
          output = value;
        },
    ))({ state: program });

    const expected = 5;
    let actual;
    for (let i = 0; i < 6; i++) {
      actual = stateIter.next().value;
    }

    t.equal(actual.state[27], expected, msg);
    t.equal(actual.state[26], expected, msg);
    t.equal(actual.state[28], expected, msg);
    t.equal(output, expected, msg);
  }
  t.end();
});
