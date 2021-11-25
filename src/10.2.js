// Advent of Code 2019
// Day 10: Monitoring Station
// Part 2

// Point {
//   x: number,
//   y: number,
// }

// equality for Point types
export const eq = (a) => (b) => a.x === b.x && a.y === b.y;

// distance without the sqrt because it isnt necessary for comparison
// number -> number -> number
export const distance = (ptA) => (ptB) =>
  (ptB.y - ptA.y) ** 2 + (ptB.x - ptA.x) ** 2;
