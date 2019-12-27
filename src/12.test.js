import test from 'tape';
import {
  parseBody,
  accelerate,
  reposition,
  stepOnce,
  // solve,
} from './12';


test('12: parseBody()', (t) => {
  {
    const msg = 'throws when string does not match';
    const expected = /body parse failure/;
    const actual = () => parseBody('invalid string');
    t.throws(actual, expected, msg);
  }
  {
    const msg = 'returns object';
    const expected = 'object';
    const actual = typeof parseBody('<x=-1, y=0, z=2>');
    t.equal(actual, expected, msg);
  }
  {
    const msg = 'fills position';
    const expected = [-1, 0, 2];
    const actual = parseBody('<x=-1, y=0, z=2>').pos;
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = 'fills velocity with default 0s';
    const expected = [0, 0, 0];
    const actual = parseBody('<x=-1, y=0, z=2>').vel;
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = 'multidigit numbers';
    const expected = [2, -10, -7];
    const actual = parseBody('<x=2, y=-10, z=-7>').pos;
    t.deepEqual(actual, expected, msg);
  }

  t.end();
});

test('12: reposition()', (t) => {
  const body = {
    pos: [1, 2, 3],
    vel: [-2, 0, 3],
  };

  {
    const msg = 'updates pos';
    const expected = [-1, 2, 6];
    const actual = reposition(body).pos;
    t.deepEqual(actual, expected, msg);
  }

  t.end();
});

test('12: accelerate()', (t) => {
  const a = {
    pos: [3, 2, 5],
    vel: [0, 0, 0],
  };
  const b = {
    pos: [5, 2, 3],
    vel: [0, 0, 0],
  };

  {
    const msg = 'updates pos';
    const expected = [
      {
        pos: [3, 2, 5],
        vel: [1, 0, -1],
      },
      {
        pos: [5, 2, 3],
        vel: [-1, 0, 1],
      },
    ];
    const actual = accelerate(a, b);
    t.deepEqual(actual, expected, msg);
  }

  t.end();
});

test('12: stepOnce()', (t) => {
  const ex0 = '[{"pos":[-1,0,2],"vel":[0,0,0]},{"pos":[2,-10,-7],"vel":[0,0,0]},{"pos":[4,-8,8],"vel":[0,0,0]},{"pos":[3,5,-1],"vel":[0,0,0]}]';
  {
    const msg = 'simulate a single time step';
    const expected = JSON.parse('[{"pos":[2,-1,1],"vel":[3,-1,-1]},{"pos":[3,-7,-4],"vel":[1,3,3]},{"pos":[1,-7,5],"vel":[-3,1,-3]},{"pos":[2,2,0],"vel":[-1,-3,1]}]');
    const actual = stepOnce(JSON.parse(ex0));
    t.deepEqual(actual, expected, msg);
  }

  t.end();
});
