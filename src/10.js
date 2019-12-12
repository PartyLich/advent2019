// Advent of Code 2019
// Day 10: Monitoring Station

// traverse from node along each slope m = y/x where x and y are integers
//   positive and negative
//   track slope, don't reuse
//   stop at first full node
//   special case: verticals (x === 0)
const charMap = {
  '#': 1,
  '.': 0,
};
export const parseLine = (line) => line.split('').map((char) => charMap[char]);
export const inpMap = parseLine;

export const inRange = (min, max) => (val) => val >= min && val <= max;
// [][]number -> number, number -> bool
export const onGrid = (grid) => {
  const height = grid.length - 1;
  const width = grid[0].length - 1;
  const xOk = inRange(0, width);
  const yOk = inRange(0, height);

  return (x, y) => xOk(x) && yOk(y);
};

// [][]number -> number, number -> number
export const countVertical = (grid) => (x, y) => {
  const height = grid.length;
  const ok = onGrid(grid);
  let sum = 0;
  let pos = false;
  let neg = false;

  for (let v = 1; v < height; v++) {
    if (!pos && ok(x, y + v)) {
      pos = (grid[y+v][x]) ? ++sum : 0;
    }
    if (!neg && ok(x, y - v)) {
      neg = (grid[y-v][x]) ? ++sum : 0;
    }
  }

  return sum;
};


// []number -> number, number -> number
export const trace = (grid) => (x, y) => {
  const height = grid.length;
  const width = grid[0].length;
  const ok = onGrid(grid);
  let sum = 0;
  const usedSlopes = new Set();

  for (let run = 1; run < width; run++) {
    for (let rise = 0; rise < height; rise++) {
      const slope = rise / run;
      if (usedSlopes.has(slope)) continue;

      let pos = 0;
      let neg = 0;
      let posEven = 0;
      let negEven = 0;
      let xPos = x + run;
      let yPos = y + rise;
      let xNeg = x - run;
      let yNeg = y - rise;

      while (
        !(pos && neg && posEven && negEven) &&
        (ok(xPos, yPos) || ok(xNeg, yNeg) ||
         ok(xPos, yNeg) || ok(xNeg, yPos))
      ) {
        // quad 3
        if (!pos && ok(xPos, yPos)) {
          pos = (grid[yPos][xPos]) ? ++sum : 0;
        }
        // quad 1
        if (!neg && ok(xNeg, yNeg)) {
          neg = (grid[yNeg][xNeg]) ? ++sum : 0;
        }
        // quad 2
        if (!posEven && ok(xPos, yNeg) && (yNeg != yPos)) {
          posEven = (grid[yNeg][xPos]) ? ++sum : 0;
        }
        // quad 4
        if (!negEven && ok(xNeg, yPos) && (yNeg != yPos)) {
          negEven = (grid[yPos][xNeg]) ? ++sum : 0;
        }

        xPos += run;
        yPos += rise;
        xNeg -= run;
        yNeg -= rise;
      }
      usedSlopes.add(slope);
    }
  }

  return sum + countVertical(grid)(x, y);
};

export const solve = (grid) => {
  const height = grid.length;
  const width = grid[0].length;
  const count = trace(grid);
  let max = 0;
  let pt;


  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      if (!grid[r][c]) continue;

      const visible = count(c, r);
      if (visible > max) {
        max = visible;
        pt = [c, r];
      }
    }
  }

  return {
    pt,
    sum: max,
  };
};
