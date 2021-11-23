import test from 'tape';

import { makeOpcodes } from './7';
import {
  computer,
  trySettings,
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

test('7.2: trySettings()', (t) => {
  const msg = 'returns final thruster signal after amplification';
  {
    const program = [
      3, 26, 1001, 26, -4, 26, 3, 27, 1002, 27, 2, 27, 1, 27, 26,
      27, 4, 27, 1001, 28, -1, 28, 1005, 28, 6, 99, 0, 0, 5,
    ];
    const phases = [9, 8, 7, 6, 5];

    const expected = 139629729;
    const actual = trySettings(program)(phases)();
    t.equal(actual, expected, msg);
  }
  {
    const program = [
      3, 52, 1001, 52, -5, 52, 3, 53, 1, 52, 56, 54, 1007, 54, 5, 55, 1005, 55,
      26, 1001, 54, -5, 54, 1105, 1, 12, 1, 53, 54, 53, 1008, 54, 0, 55, 1001,
      55, 1, 55, 2, 53, 55, 53, 4, 53, 1001, 56, -1, 56, 1005, 56, 6, 99, 0, 0,
      0, 0, 10,
    ];
    const phases = [9, 7, 8, 5, 6];

    const expected = 18216;
    const actual = trySettings(program)(phases)();
    t.equal(actual, expected, msg);
  }
  t.end();
});
