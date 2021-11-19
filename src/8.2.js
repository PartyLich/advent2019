// Advent of Code 2019
// Day 8: Space Image Format
// Part Two
const isSet = (px) => px === 0 || px === 1;
export const setIfBlank = (layer) => (px, i) => {
  if (isSet(px)) return px;
  return layer[i];
};

// []number, number, number -> []number
export const flattenLayers = (pixels, width, height) => {
  const imgSize = (width * height);
  let flatImg = pixels.slice(0, imgSize);

  for (let i = imgSize; i <= pixels.length - imgSize; i += imgSize) {
    flatImg = flatImg.map(setIfBlank(pixels.slice(i, i + imgSize)));
  }

  return flatImg;
};

// []number, number -> []number
export const toString = (pixels = [], width) => {
  let result = '';

  for (let i = 0; i <= pixels.length - width; i += width) {
    if (i > 0) result += '\n';
    result += pixels.slice(i, i + width)
        .toString()
        .split(',')
        .join('');
  }

  return result;
};

export const solve = (input) => {
  const width = 25;
  const height = 6;

  const img = flattenLayers(input.flat(), width, height);
  // so I can read it in terminal
  console.log(toString(img, width).replace(/0/g, ' '));

  return toString(img, width);
};
