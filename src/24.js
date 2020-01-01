// Advent of Code 2019
// Day 24: Planet of Discord

// string -> bool
const isBug = (char) => char === '#';

// string -> []bool
export const parseLine = (line) => line.split('').map(isBug);


export const inRange = ({ start, end }) => (i) =>
  i >= Math.min(start, end) && i <= Math.max(start, end);
const onGrid = inRange({ start: 0, end: 4 });

export const getTile = (grid) => (row, col) => onGrid(row) &&
      onGrid(col) &&
      grid[row * 5 + col];

export const arrCompare = (a, b) => {
  return (a.length === b.length) &&
        a.reduce((acc, next, i) => acc && b[i] === next, true);
};

// To calculate the biodiversity rating for this layout, consider each tile
// left-to-right in the top row, then left-to-right in the second row, and so
// on. Each of these tiles is worth biodiversity points equal to increasing
// powers of two: 1, 2, 4, 8, 16, 32, and so on. Add up the biodiversity points
// for tiles with bugs; in this example, the 16th tile (32768 points) and 22nd
// tile (2097152 points) have bugs, a total biodiversity rating of 2129920.
export const rate = (grid) =>
  grid.map((tile, i) => (tile && Math.pow(2, i)) || 0)
      .reduce((a, b) => a + b);

const getNeighbors = (grid) => (r, c) => {
  return [
    getTile(grid)(r - 1, c),
    getTile(grid)(r + 1, c),
    getTile(grid)(r, c + 1),
    getTile(grid)(r, c - 1),
  ];
};

export const step = (grid = []) => {
  const res = [];

  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      const frenCount = getNeighbors(grid)(r, c).filter((x) => x).length;
      const i = r * 5 + c;
      res[i] = (grid[i])
            ? frenCount === 1
            : frenCount === 1 || frenCount === 2;
    }
  }
  return res;
};

export const solve = (input) => {
  const ratings = [];
  let state = input.reduce((a, b) => a.concat(b), []);
  let rating = rate(state);

  while (!ratings.includes(rating)) {
    ratings.push(rating);
    state = step(state);
    rating = rate(state);
  }

  return rating;
};
