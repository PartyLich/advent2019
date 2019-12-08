import test from 'tape';

import { xForm } from './1';
import {
  inpMap,
  distance,
  inRange,
  makeSegment,
  findIntersects,
  solve,
} from './3';

test('3: distance()', (t) => {
  {
    const msg = '(0,0) -> (3, 3) = 6';
    const expected = 6;
    const actual = distance([0, 0])([3, 3]);
    t.equal(actual, expected, msg);
  }
  {
    const msg = '(1,1) -> (-1, -1) = 4';
    const expected = 4;
    const actual = distance([-1, -1])([1, 1]);
    t.equal(actual, expected, msg);
  }
  {
    const msg = 'same point = 0';
    const expected = 0;
    const actual = distance([10, 10])([10, 10]);
    t.equal(actual, expected, msg);
  }
  t.end();
});

test('3: inRange', (t) => {
  {
    const msg = 'within range';
    const expected = true;
    const actual = inRange(4, { start: 0, end: 10 });
    t.equal(actual, expected, msg);
  }
  {
    const msg = 'within range (start)';
    const expected = true;
    const start = 0;
    const actual = inRange(start, { start, end: 10 });
    t.equal(actual, expected, msg);
  }
  {
    const msg = 'within range (end)';
    const expected = true;
    const end = 10;
    const actual = inRange(end, { start: 0, end });
    t.equal(actual, expected, msg);
  }
  {
    const msg = 'within range (start < end)';
    const expected = true;
    const actual = inRange(5, { start: 10, end: 0 });
    t.equal(actual, expected, msg);
  }
  {
    const msg = 'above range';
    const expected = false;
    const actual = inRange(20, { start: 0, end: 10 });
    t.equal(actual, expected, msg);
  }
  {
    const msg = 'below range';
    const expected = false;
    const actual = inRange(-5, { start: 0, end: 10 });
    t.equal(actual, expected, msg);
  }
  t.end();
});

test('3: solve()', (t) => {
  {
    const msg = 'example case 1';
    const input = xForm('R8,U5,L5,D3\nU7,R6,D4,L4')
        .filter((el) => !!el)
        .map(inpMap);
    const expected = 6;
    const actual = solve(input);
    t.equal(actual, expected, msg);
  }
  {
    const msg = 'example case 2';
    const input = xForm(
        'R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83',
    )
        .filter((el) => !!el)
        .map(inpMap);
    const expected = 159;
    const actual = solve(input);
    t.equal(actual, expected, msg);
  }
  {
    const msg = 'example case 3';
    const input = xForm(
        'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7',
    )
        .filter((el) => !!el)
        .map(inpMap);
    const expected = 135;
    const actual = solve(input);
    t.equal(actual, expected, msg);
  }
  t.end();
});

test('3: makeSegment', (t) => {
  {
    const msg = 'vertical segment';
    const expected = {
      start: 0,
      end: 10,
      x: 0,
    };
    const actual = makeSegment(10, true, [0, 0]);
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = 'horizontal segment';
    const expected = {
      start: 0,
      end: 10,
      y: 0,
    };
    const actual = makeSegment(10, false, [0, 0]);
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = 'from point other than origin';
    const expected = {
      start: 8,
      end: 3,
      y: 5,
    };
    const actual = makeSegment(-5, false, [8, 5]);
    t.deepEqual(actual, expected, msg);
  }
  t.end();
});

test('3: findIntersects', (t) => {
  {
    const msg = 'one intersection';
    const v = {
      start: 7,
      end: 3,
      x: 6,
    };
    const h = {
      start: 8,
      end: 3,
      y: 5,
    };
    const expected = [[6, 5]];
    const actual = findIntersects([h], [v]);
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = 'zero intersection';
    const v = {
      start: 7,
      end: 3,
      x: 9,
    };
    const h = {
      start: 8,
      end: 3,
      y: 5,
    };
    const expected = [];
    const actual = findIntersects([h], [v]);
    t.deepEqual(actual, expected, msg);
  }
  t.end();
});
