// Advent of Code 2019
// Day 12: The N-Body Problem
// part 2

// array equality. Check nested objects by reference (although we only have
// primitives in this specific usage)
// reduce would be more compact, but exiting early is a nice feature
// []number => []number -> bool
export const eq = (arr1) => (arr2) => {
  if (arr1.length !== arr2.length) return false;

  for (const [idx, a] of arr1.entries()) {
    if (a !== arr2[idx]) return false;
  }

  return true;
};
