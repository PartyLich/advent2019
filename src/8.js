// Advent of Code 2019
// Day 8: Space Image Format
import { toDecimal } from './funtils';


export const inpMap = (str) => str.split('').map(toDecimal);

// number -> array -> number
export const checkImage = (len) => (buf) => {
  const layers = [[0, 0, 0]];
  let current = 0;
  let target = 0;
  let min = len + 1;

  buf.map((px, i) => {
    if (px >= 0 && px <= 2) {
      layers[current][px] = layers[current][px]
            ? layers[current][px] + 1
            : 1;
    }

    if (((i+1) % len) === 0) {
      if (layers[current][0] < min) {
        target = current;
        min = layers[current][0];
      }
      current++;
      layers[current] = [0, 0, 0];
    }
  });

  // number of 1 digits multiplied by the number of 2 digits
  const [ones, twos] = layers[target].slice(1);
  return ones * twos;
};

export const solve = (input) => {
  const width = 25;
  const height = 6;

  return checkImage(width * height)(input.flat());
};
