import test from 'tape';

import { Computer } from '../9';
import {
  makeGen,
  Point,
  concat,
} from './11';


test('11: generator', (t) => {
  {
    const msg = 'produces a copy of itself as output';
    const program = [
      109, 1, 204, -1, 1001, 100, 1, 100, 1008, 100, 16, 101, 1006, 101, 0, 99,
    ];
    const computer = makeGen(Computer(program));
    const actual = [];
    for (const [_state, output] of computer) {
      actual.push(output);
    }

    t.deepEqual(actual, program, msg);
  }
  {
    const msg = 'produces a copy of itself as output';
    const program = [
      109, 1, 204, -1, 1001, 100, 1, 100, 1008, 100, 16, 101, 1006, 101, 0, 99,
    ];
    const computer = makeGen(Computer(program));
    const actual = [...computer].map(([_state, output]) => output);
    t.deepEqual(actual, program, msg);
  }
  {
    const msg = 'program should output a 16 digit number';
    const program = [
      1102, 34915192, 34915192, 7, 4, 7, 99, 0,
    ];
    const expected = 16;
    let actual;

    const computer = makeGen(Computer(program));
    for (const [_state, output] of computer) {
      actual = `${ output }`;
    }

    t.equal(actual.length, expected, msg);
  }
  {
    const msg = '2 == 2, so set idx 9 to 1';
    const program = [
      9, 1, 2108, 2, 2, 9, 4, 9, 99, 5,
    ];
    const expected = 1;
    let actual;

    const computer = makeGen(Computer(program));
    for (const [_state, output] of computer) {
      actual = output;
    }
    t.equal(actual, expected, msg);
  }
  {
    const msg = '2 + 2 = 4';
    const program = [
      9, 1, 2101, 2, 2, 9, 4, 9, 99, 4,
    ];
    const expected = 4;
    let actual;

    const computer = makeGen(Computer(program));
    for (const [_state, output] of computer) {
      actual = output;
    }
    t.equal(actual, expected, msg);
  }
  {
    const msg = 'input test. 3 + 3 = 6';
    const program = [
      9, 1, 3, 6, 2101, 3, -1, 11, 4, 11, 99, -2,
    ];
    const expected = 6;
    let actual;
    const computer = makeGen(Computer(program));

    let next = computer.next();
    t.equal(next.value[0].pc, 2, 'yields at first input instruction');

    while (!next.done) {
      actual = next.value[1];
      // provide i = 5 - RB. RB should be 1 at this point, so
      next = computer.next(4);
    }

    t.equal(actual, expected, msg);
  }
  t.end();
});

test('11: Point constructor()', (t) => {
  const msg = 'creates a Point instance (with zero validation OMG)';
  {
    const expected = { x: 1, y: 1 };
    const actual = Point(1, 1);
    t.deepEqual(actual, expected, msg);
  }
  {
    const expected = { x: -20, y: 21 };
    const actual = Point(-20, 21);
    t.deepEqual(actual, expected, msg);
  }
  t.end();
});

test('11: Point concat()', (t) => {
  const msg = 'joins two Point instances';
  {
    const expected = { x: 1, y: 1 };
    const actual = concat({ x: 0, y: 0 })({ x: 1, y: 1 });
    t.deepEqual(actual, expected, msg);
  }
  {
    const expected = { x: -20, y: 21 };
    const actual = concat({ x: 30, y: -21 })({ x: -50, y: 42 });
    t.deepEqual(actual, expected, msg);
  }
  t.end();
});
