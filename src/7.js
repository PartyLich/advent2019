// Advent of Code 2019
// Day 7: Amplification Circuit


// create a (lazy) iterator from the provided array
export const getInput = function* (init = []) {
  let input = init.slice();

  while (input.length) {
    const val = yield input.shift();
    if (Array.isArray(val)) input = val.slice();
  }
};
