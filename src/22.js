// Advent of Code 2019
// Day 22: Slam Shuffle

// To deal into new stack, create a new stack of cards by dealing the top card
// of the deck onto the top of the new stack repeatedly until you run out of
// cards
// const reverseArr = (arr) => arr.reduce((acc, next) => [next, ...acc], []);
// number -> []any -> []any
const reverseArr = (arr) => arr.reduce((acc, next) => {
  acc.unshift(next);
  return acc;
}, []);
export const dealNew = () => reverseArr;

// To cut N cards, take the top N cards off the top of the deck and move them as
// a single unit to the bottom of the deck, retaining their order. For example,
// to cut 3:
const moveFirst = (n) => (arr) => arr.slice(n).concat(arr.slice(0, n));
export const cut = moveFirst;

// To deal with increment N, start by clearing enough space on your table to lay
// out all of the cards individually in a long line. Deal the top card into the
// leftmost position. Then, move N positions to the right and deal the next
// card there. If you would move into a position past the end of the space on
// your table, wrap around and keep counting from the leftmost card again.
// Continue this process until you run out of cards.
// number, number, number -> number
const getDest = (i, n, len) => {
  const ixn = i * n;
  const b = Math.floor(ixn / (len));
  return ixn - (b * (len - 1)) - b;
};

// number -> []any -> []any
export const dealWith = (n) => (deck) => deck.reduce((acc, num, i) => {
  const dest = getDest(i, n, deck.length);
  acc[dest] = num;
  return acc;
}, []);

// number -> []number
export const makeDeck = (n) => new Array(n).fill(0)
    .map((_, i) => i);

// string -> []string|number
export const parseDeal = (line) => {
  try {
    const reWith = /^deal with/;
    const reNum = /(-?\d+)$/;
    return reWith.test(line)
        ? ['dealWith', parseInt(reNum.exec(line)[1])]
        : ['dealNew', 0];
  } catch (e) {
    throw new Error('string parse failure');
  }
};

// string -> []string|number
export const parseCut = (line) => {
  const reNum = /(-?\d+)$/;
  return ['cut', parseInt(reNum.exec(line)[1])];
};

// string -> []string|number
export const parseAction = (line) => {
  switch (line.slice(0, 4)) {
    case 'cut ':
      return parseCut(line);
    case 'deal':
      return parseDeal(line);
  }
};

const methods = new Map(Object.entries({
  dealNew,
  cut,
  dealWith,
}));

export const deckReducer = (deck = [], [type, payload] = []) => {
  return (methods.has(type))
        ? methods.get(type)(payload)(deck)
        : deck;
};

// [][]string|number -> number
export const solve = (actions) => {
  return actions.reduce(deckReducer, makeDeck(10007))
      .indexOf(2019);
};
