// Advent of Code 2019
// Day 4: Secure Container

// object, string -> object|bool
export const checkCriteria = (acc, next) => {
  if (!acc) return false;
  if (next < acc.last) return false;
  const double = acc.double || (next === acc.last);
  return {
    last: next,
    double,
  };
};

export const baseCase = { last: -1, double: false };

// function, object -> number -> number -> number
export const seek = (checkCriteria, baseCase) => (start) => (end) => {
  let count = 0;
  // each num
  // TODO: there's a lot of numbers that dont need to be checked
  for (let i = start; i <= end; i++) {
    // each digit
    const arr = ('' + i).split('');
    const valid = arr.reduce(checkCriteria, baseCase);

    if (valid && valid.double) count++;
  }

  return count;
};

// array -> number
export const solve = (input) => {
  const [start, end] = input.flat();
  return seek(checkCriteria, baseCase)(parseInt(start))(parseInt(end));
};
