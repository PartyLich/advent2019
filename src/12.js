// Advent of Code 2019
// Day 12: The N-Body Problem
import {
  pipe,
  toDecimal,
  sum,
  mult,
} from './funtils';

const makeBody = (
    x = 0, y = 0, z = 0,
    dX = 0, dY = 0, dZ = 0,
) => ({
  pos: [x, y, z],
  vel: [dX, dY, dZ],
});

export const parseBody = (str) => {
  const re = /(-?\d+)/g;
  try {
    const position = str.match(re).map(toDecimal);
    return makeBody(...position);
  } catch (e) {
    throw new Error('body parse failure');
  }
};

export const inpMap = (str) => parseBody(str);

// To apply gravity, consider every pair of moons. On each axis (x, y, and z),
// the velocity of each moon changes by exactly +1 or -1 to pull the moons
// together. For example, if Ganymede has an x position of 3, and Callisto has a
// x position of 5, then Ganymede's x velocity changes by +1 (because 5 > 3) and
// Callisto's x velocity changes by -1 (because 3 < 5).
// However, if the positions on a given axis are the same, the velocity on that
// axis does not change for that pair of moons.
export const accelerate = (a, b) => {
  const aVel = a.vel.slice();
  const bVel = b.vel.slice();

  for (let i = 0; i < 3; i++) {
    if (a.pos[i] === b.pos[i]) continue;
    if (a.pos[i] < b.pos[i]) {
      aVel[i] += 1;
      bVel[i] += -1;
    } else {
      aVel[i] += -1;
      bVel[i] += 1;
    }
  }

  return [
    { ...a, vel: aVel },
    { ...b, vel: bVel },
  ];
};

const applyGravity = (bodies) => {
  for (let i = 0, len = bodies.length; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      [bodies[i], bodies[j]] = accelerate(bodies[i], bodies[j]);
    }
  }

  return bodies;
};

export const reposition = (body) => ({
  ...body,
  pos: body.pos.map((p, i) => (p += body.vel[i])),
});

const applyVelocity = (bodies) => bodies.map(reposition);

// Simulate the motion of the moons in time steps.
export const stepOnce = pipe(
    // first update the velocity of every moon by applying gravity.
    applyGravity,
    // Then, update the position of every moon by applying velocity.
    applyVelocity,
);

const step = (t) => (bodies) => {
  let res = bodies.slice();
  for (let i = t; i > 0; i--) {
    res = stepOnce(res);
  }

  return res;
};

// The total energy for a single moon is its potential energy multiplied by its
// kinetic energy. A moon's potential energy is the sum of the absolute values
// of its x, y, and z position coordinates. A moon's kinetic energy is the sum
// of the absolute values of its velocity coordinates. Below, each line shows
// the calculations for a moon's potential energy (pot), kinetic energy (kin),
// and total energy:
// const sumAbs = (a, b) => Math.abs(a) + Math.abs(b);
const sumAbs = (a, b) => [a, b].map(Math.abs).reduce(sum);
const calcEnergy = (body) => {
  return Object.values(body)
      .map((arr) => arr.reduce(sumAbs))
      .reduce(mult);
};

// total energy in the system.
const systemEnergy = (bodies) => bodies.map(calcEnergy).reduce(sum);

// What is the total energy in the system after simulating the moons given in
// your scan for 1000 steps?
export const solve = pipe(
    step(1000),
    systemEnergy,
);
