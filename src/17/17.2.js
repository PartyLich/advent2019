// Advent of Code 2019
// Day 17: Set and Forget
// part 2


// return index of a bot character and orientation
export const findBot = (map) => {
  const BOT_CHARS = [
    // ^
    map.indexOf(94),
    // >
    map.indexOf(62),
    // v
    map.indexOf(118),
    // <
    map.indexOf(60),
  ];
  const idx = BOT_CHARS.findIndex((x) => x > -1);
  const pos = BOT_CHARS[idx];

  return {
    pos,
    orient: idx,
  };
};
