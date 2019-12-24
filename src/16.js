// Advent of Code 2019
// Day 16: Flawed Frequency Transmission
import {
  pipe,
  toDecimal,
  sum,
} from './funtils';

const castBigNumbers = (num) => (num > Number.MAX_SAFE_INTEGER)
    ? BigInt(num)
    : num;

// number -> array | string -> array | string
const sliceFirst = (count) => (arr) => arr.slice(0, count);

// any -> string
const toString = (el) => el.toString();

// number -> number
export const firstEight = pipe(
    castBigNumbers,
    toString,
    sliceFirst(8),
    toDecimal,
);

// string -> []number
const strToDigits = (str) => str.split('').map(toDecimal);

// number -> []number
const numToDigits = pipe(
    castBigNumbers,
    toString,
    strToDigits,
);

export const makeNode = (val, next = null) => ({
  val,
  next,
});

const circleList = (val) => {
  let head = null;
  if (val !== undefined) {
    head = makeNode(val);
    head.next = head;
  }

  return {
    get head() {
      return head;
    },
    set head(node) {
      head = node;
    },

    add(val) {
      if (!head) {
        head = makeNode(val);
        head.next = head;
        return head;
      }

      let node = head;
      while (node.next != head) {
        node = node.next;
      }

      return (node.next = makeNode(val, head));
    },
  };
};

const makePattern = () => {
  const list = circleList(0);
  list.add(1);
  list.add(0);
  list.add(-1);
  return list;
};

// number -> [][]number
export const calcDigits = (len) => (num) => {
  const pattern = makePattern();
  const digits = numToDigits(num);
  let res = [];

  // zero pad
  while (digits.length < len) {
    digits.unshift(0);
  }

  for (let i = 0, len = digits.length; i < len; i++ ) {
    let tmp = [];
    let counter = i + 1;
    let node = pattern.head;

    for (const digit of digits) {
      counter--;
      if (counter === 0) {
        counter = i + 1;
        node = node.next;
      }

      tmp = [...tmp, digit * node.val];
    }
    res = [...res, tmp];
  }

  return res;
};

// []number -> number
const sumArray = (arr) => arr.reduce(sum);
// [][]number -> []number
const reduceDigits = (arr) => arr.map(sumArray);
// number -> number
const lastDigit = (num) => Math.abs(num % 10);
// []number -> []number
const mapLastDigit = (arr) => arr.map(lastDigit);
// []number -> number
const joinDigits = (arr) => arr.join('');

// number -> number -> number
export const fftOnce = (len) => pipe(
    calcDigits(len),
    reduceDigits,
    mapLastDigit,
    joinDigits,
    toDecimal,
);

// number -> number -> number
export const fft = (phases) => (num) => {
  const len = castBigNumbers(num).toString().length;
  let result = num;

  for (let i = phases; i > 0; i--) {
    result = fftOnce(len)(result);
  }

  return result;
};

export const solve = ([input]) => {
  return pipe(
      fft(100),
      firstEight,
  )(input);
};
