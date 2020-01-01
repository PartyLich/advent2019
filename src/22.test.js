import test from 'tape';
import {
  makeDeck,
  dealNew,
  cut,
  dealWith,
  parseCut,
  parseDeal,
  parseAction,
  deckReducer,
  // solve,
} from './22';


test('22: dealNew()', (t) => {
  {
    const msg = 'reverses array';
    const expected = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    const actual = dealNew(0)(makeDeck(10));
    t.deepEqual(actual, expected, msg);
  }
  t.end();
});

test('22: cut()', (t) => {
  {
    const msg = 'moves n elements to opposite end of array';
    const expected = [3, 4, 5, 6, 7, 8, 9, 0, 1, 2];
    const actual = cut(3)(makeDeck(10));
    t.deepEqual(actual, expected, msg);
    const expectedNeg = [6, 7, 8, 9, 0, 1, 2, 3, 4, 5];
    const actualNeg = cut(-4)(makeDeck(10));
    t.deepEqual(actualNeg, expectedNeg, msg);
  }
  t.end();
});

test('22: dealWith()', (t) => {
  {
    const msg = '';
    const expected = [0, 7, 4, 1, 8, 5, 2, 9, 6, 3];
    const actual = dealWith(3)(makeDeck(10));
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = '';
    const expected = [0, 9, 5, 1, 10, 6, 2, 11, 7, 3, 12, 8, 4];
    const actual = dealWith(3)(makeDeck(13));
    t.deepEqual(actual, expected, msg);
  }
  t.end();
});

test('22: parseCut', (t) => {
  {
    const msg = 'returns array pair ["cut", number]';
    const expected = ['cut', 6];
    const actual = parseCut('cut 6');
    t.deepEqual(actual, expected, msg);
    const expectedNeg = ['cut', -6];
    const actualNeg = parseCut('cut -6');
    t.deepEqual(actualNeg, expectedNeg, msg);
  }
  t.end();
});

test('22: parseDeal', (t) => {
  {
    const msg = 'returns array pair ["dealWith", number]';
    const expected = ['dealWith', 7];
    const actual = parseDeal('deal with increment 7');
    t.deepEqual(actual, expected, msg);
    const expectedNeg = ['dealWith', -7];
    const actualNeg = parseDeal('deal with increment -7');
    t.deepEqual(actualNeg, expectedNeg, msg);
  }
  {
    const msg = 'returns array pair ["dealNew", number]';
    const expected = ['dealNew', 0];
    const actual = parseDeal('deal into new stack');
    t.deepEqual(actual, expected, msg);
  }

  t.end();
});

test('22: ', (t) => {
  {
    const msg = 'returns array pair ["cut", number]';
    const expected = ['cut', 6];
    const actual = parseAction('cut 6');
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = 'returns array pair ["dealWith", number]';
    const expected = ['dealWith', 7];
    const actual = parseAction('deal with increment 7');
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = 'returns array pair ["dealNew", number]';
    const expected = ['dealNew', 0];
    const actual = parseAction('deal into new stack');
    t.deepEqual(actual, expected, msg);
  }

  t.end();
});

test('22: ', (t) => {
  {
    const msg = 'defaults to empty array';
    const expected = [];
    const actual = deckReducer();
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = 'returns state with no action';
    const expected = makeDeck(10);
    const actual = deckReducer(expected);
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = '';
    const actions = [
      'cut 6',
      'deal with increment 7',
      'deal into new stack',
    ].map(parseAction);
    const expected = [3, 0, 7, 4, 1, 8, 5, 2, 9, 6];
    const actual = actions.reduce(deckReducer, makeDeck(10));
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = '';
    const actions = [
      'deal with increment 7',
      'deal with increment 9',
      'cut -2',
    ].map(parseAction);
    const expected = [6, 3, 0, 7, 4, 1, 8, 5, 2, 9];
    const actual = actions.reduce(deckReducer, makeDeck(10));
    t.deepEqual(actual, expected, msg);
  }
  {
    const msg = '';
    const actions = [
      'deal into new stack',
      'cut -2',
      'deal with increment 7',
      'cut 8',
      'cut -4',
      'deal with increment 7',
      'cut 3',
      'deal with increment 9',
      'deal with increment 3',
      'cut -1',
    ].map(parseAction);
    const expected = [9, 2, 5, 8, 1, 4, 7, 0, 3, 6];
    const actual = actions.reduce(deckReducer, makeDeck(10));
    t.deepEqual(actual, expected, msg);
  }

  t.end();
});
