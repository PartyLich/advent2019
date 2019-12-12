import test from 'tape';

import {
  traverse,
  inpMap,
  toAdjacencyMap,
} from './6';

test('6: inpMap()', (t) => {
  {
    const msg = 'maps to [parent, child] arrays';
    const expected = [
      ['COM', 'B'],
      ['B', 'C'],
    ];
    const actual = ['COM)B', 'B)C'].map(inpMap);
    t.deepEqual(actual, expected, msg);
  }
  t.end();
});

test('6: toAdjacencyMap()', (t) => {
  const input = [
    'B)C',
    'C)D',
    'D)E',
    'E)F',
    'COM)B',
    'B)G',
    'G)H',
    'D)I',
    'E)J',
    'J)K',
    'K)L',
  ];
  {
    const msg = 'maps to adjacency map/list';
    const expected = {
      'COM': ['B'],
      'B': ['C', 'G'],
      'C': ['D'],
      'D': ['E', 'I'],
      'E': ['F', 'J'],
      'G': ['H'],
      'J': ['K'],
      'K': ['L'],
    };
    const actual = (input.map(inpMap)).reduce(toAdjacencyMap, {});
    t.deepEqual(actual, expected, msg);
  }

  t.end();
});

test('6: traverse()', (t) => {
  const map = {
    'COM': ['B'],
    'B': ['C', 'G'],
    'C': ['D'],
    'D': ['E', 'I'],
    'E': ['F', 'J'],
    'G': ['H'],
    'J': ['K'],
    'K': ['L'],
  };
  {
    const msg = 'sums node distances in graph traversal';
    const expected = 42;
    const actual = traverse(map)('COM');
    t.deepEqual(actual, expected, msg);
  }

  t.end();
});
