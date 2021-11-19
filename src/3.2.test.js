import test from 'tape';

import { xForm } from './1';
import {
  inpMap,
  solve,
  eq,
} from './3.2';


test('3.2: eq()', (t) => {
  {
    const msg = 'pair equals itself';
    const actual = eq([0, 0], [0, 0]);
    t.ok(actual, msg);
  }
  {
    const msg = 'different pairs are not equal';
    const actual = eq([0, 0], [3, 4]);
    t.notOk(actual, msg);
  }
  t.end();
});

test('3.2: solve()', (t) => {
  {
    const msg = 'example case 1';
    const input = xForm('R8,U5,L5,D3\nU7,R6,D4,L4')
        .filter((el) => !!el)
        .map(inpMap);
    const expected = 30;
    const actual = solve(input);
    t.equal(actual, expected, msg);
  }
  {
    const msg = 'example case 2';
    const input = xForm('R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83')
        .filter((el) => !!el)
        .map(inpMap);
    const expected = 610;
    const actual = solve(input);
    t.equal(actual, expected, msg);
  }
  {
    const msg = 'example case 3';
    const input = xForm(`R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`)
        .filter((el) => !!el)
        .map(inpMap);
    const expected = 410;
    const actual = solve(input);
    t.equal(actual, expected, msg);
  }
  t.end();
});
