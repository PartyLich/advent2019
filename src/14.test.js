import test from 'tape';
import {
  lineToObj,
  joinObjs,
  oreCal,
  isOreResult,
  findFormula,
  simplifyFormula,
  solve,
  solve2,
} from './14';


test('14: lineToObj()', (t) => {
  {
    const line = '10 ORE => 10 A';
    const msg = 'map formula line to object';
    const expected = {
      A: {
        prod: 10,
        ingredients: [
          [10, 'ORE'],
        ],
      },
    };
    const actual = lineToObj(line);
    t.deepEqual(actual, expected, msg);
  }
  t.end();
});

test('14: joinObjs', (t) => {
  {
    const objArr = [
      { A: 10 },
      { B: 1 },
    ];
    const msg = 'joins array of objects into single object';
    const expected = {
      A: 10,
      B: 1,
    }; ;
    const actual = objArr.reduce(joinObjs);
    t.deepEqual(actual, expected, msg);
    t.equal(typeof actual, 'object', 'return type is object');
  }
  t.end();
});

test('14: oreCal()', (t) => {
  {
    const reaction = {
      prod: 3,
      ingredients: [[8, 'ORE']],
    };
    const msg = 'calculate minimum ore required for requested quantity';
    const expected = 24;
    const actual = oreCal(reaction, 7);
    t.equal(actual, expected, msg);
  }
  t.end();
});

test('14: isOreResult()', (t) => {
  {
    const reaction = {
      prod: 3,
      ingredients: [[8, 'ORE']],
    };
    const msg = 'true if product results directly from ORE';
    const actual = isOreResult(reaction);
    t.ok(actual, msg);
  }
  {
    const reaction = {
      prod: 10,
      ingredients: [
        [7, 'A'],
        [1, 'C'],
      ],
    };
    const msg = 'false if product is not directly from ORE';
    const actual = isOreResult(reaction);
    t.notOk(actual, msg);
  }

  t.end();
});

test('14: findFormula()', (t) => {
  const factory = {
    A: { prod: '10', ingredients: [[10, 'ORE']] },
    B: { prod: '1', ingredients: [[1, 'ORE']] },
    C: { prod: '1', ingredients: [[7, 'A'], [1, 'B']] },
    D: { prod: '1', ingredients: [[7, 'A'], [1, 'C']] },
    E: { prod: '1', ingredients: [[7, 'A'], [1, 'D']] },
    FUEL: { prod: '1', ingredients: [[7, 'A'], [1, 'E']] },
  };
  const msg = 'calc formula for a given product and factory';

  {
    const expected = [
      [7, 'A'],
      [1, 'B'],
    ];
    const actual = findFormula('C')(factory);
    t.deepEqual(actual, expected, msg);
  }
  {
    // 1D = 7A + 1C
    //    = 7A + (7A + 1B)
    const expected = [
      [14, 'A'],
      [1, 'B'],
    ];
    const actual = findFormula('D')(factory);
    t.deepEqual(actual, expected, msg);
  }
  {
    // 1 FUEL = 7A + 1E
    //        = 7A + (7A + 1 D)
    //        = 7A + 7A + (7A + 1C)
    //        = 7A + 7A + 7A + (7A + 1B)
    const expected = [
      [28, 'A'],
      [1, 'B'],
    ];
    const actual = findFormula('FUEL')(factory);
    t.deepEqual(actual, expected, msg);
  }
  t.end();
});

test('14: simplifyFormula()', (t) => {
  const msg = 'joins formula into single object';
  {
    const arr = [
      [7, 'A'],
      [3, 'A'],
      [1, 'B'],
    ];
    const actual = simplifyFormula(arr);
    const expected = {
      A: 10,
      B: 1,
    };
    t.deepEqual(actual, expected, msg);
  }
  {
    const arr = [
      [7, 'A'],
      [7, 'A'],
      [7, 'A'],
      [7, 'A'],
      [1, 'B'],
    ];
    const actual = simplifyFormula(arr);
    const expected = {
      A: 28,
      B: 1,
    };
    t.deepEqual(actual, expected, msg);
  }

  t.end();
});

test('14: solve()', (t) => {
  {
    const ex = `157 ORE => 5 NZVS
165 ORE => 6 DCFZ
44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL
12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ
179 ORE => 7 PSHF
177 ORE => 5 HKGWZ
7 DCFZ, 7 PSHF => 2 XJWVT
165 ORE => 2 GPVTF
3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT`.split('\n');
    const msg = 'ex3 -> 13312 ORE for 1 FUEL';
    const actual = solve(ex);
    const expected = 13312;
    t.equal(actual, expected, msg);
  }
  {
    const ex = `2 VPVL, 7 FWMGM, 2 CXFTF, 11 MNCFX => 1 STKFG
17 NVRVD, 3 JNWZP => 8 VPVL
53 STKFG, 6 MNCFX, 46 VJHF, 81 HVMC, 68 CXFTF, 25 GNMV => 1 FUEL
22 VJHF, 37 MNCFX => 5 FWMGM
139 ORE => 4 NVRVD
144 ORE => 7 JNWZP
5 MNCFX, 7 RFSQX, 2 FWMGM, 2 VPVL, 19 CXFTF => 3 HVMC
5 VJHF, 7 MNCFX, 9 VPVL, 37 CXFTF => 6 GNMV
145 ORE => 6 MNCFX
1 NVRVD => 8 CXFTF
1 VJHF, 6 MNCFX => 4 RFSQX
176 ORE => 6 VJHF`.split('\n');
    const msg = 'ex4 -> 180697 ORE for 1 FUEL';
    const actual = solve(ex);
    const expected = 180697;
    t.equal(actual, expected, msg);
  }
  {
    const ex = `171 ORE => 8 CNZTR
7 ZLQW, 3 BMBT, 9 XCVML, 26 XMNCP, 1 WPTQ, 2 MZWV, 1 RJRHP => 4 PLWSL
114 ORE => 4 BHXH
14 VRPVC => 6 BMBT
6 BHXH, 18 KTJDG, 12 WPTQ, 7 PLWSL, 31 FHTLT, 37 ZDVW => 1 FUEL
6 WPTQ, 2 BMBT, 8 ZLQW, 18 KTJDG, 1 XMNCP, 6 MZWV, 1 RJRHP => 6 FHTLT
15 XDBXC, 2 LTCX, 1 VRPVC => 6 ZLQW
13 WPTQ, 10 LTCX, 3 RJRHP, 14 XMNCP, 2 MZWV, 1 ZLQW => 1 ZDVW
5 BMBT => 4 WPTQ
189 ORE => 9 KTJDG
1 MZWV, 17 XDBXC, 3 XCVML => 2 XMNCP
12 VRPVC, 27 CNZTR => 2 XDBXC
15 KTJDG, 12 BHXH => 5 XCVML
3 BHXH, 2 VRPVC => 7 MZWV
121 ORE => 7 VRPVC
7 XCVML => 6 RJRHP
5 BHXH, 4 VRPVC => 5 LTCX`.split('\n');
    const msg = 'ex5 -> 2210736 ORE for 1 FUEL';
    const actual = solve(ex);
    const expected = 2210736;
    t.equal(actual, expected, msg);
  }
  t.end();
});

test('14.2: solve()', (t) => {
  {
    const ex = `157 ORE => 5 NZVS
165 ORE => 6 DCFZ
44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL
12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ
179 ORE => 7 PSHF
177 ORE => 5 HKGWZ
7 DCFZ, 7 PSHF => 2 XJWVT
165 ORE => 2 GPVTF
3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT`.split('\n');
    const msg = 'ex3 -> 13312 ORE for 1 FUEL';
    const actual = solve2(ex);
    const expected = 82892753;
    t.equal(actual, expected, msg);
  }
  {
    const ex = `2 VPVL, 7 FWMGM, 2 CXFTF, 11 MNCFX => 1 STKFG
17 NVRVD, 3 JNWZP => 8 VPVL
53 STKFG, 6 MNCFX, 46 VJHF, 81 HVMC, 68 CXFTF, 25 GNMV => 1 FUEL
22 VJHF, 37 MNCFX => 5 FWMGM
139 ORE => 4 NVRVD
144 ORE => 7 JNWZP
5 MNCFX, 7 RFSQX, 2 FWMGM, 2 VPVL, 19 CXFTF => 3 HVMC
5 VJHF, 7 MNCFX, 9 VPVL, 37 CXFTF => 6 GNMV
145 ORE => 6 MNCFX
1 NVRVD => 8 CXFTF
1 VJHF, 6 MNCFX => 4 RFSQX
176 ORE => 6 VJHF`.split('\n');
    const msg = 'ex4 -> 180697 ORE for 1 FUEL';
    const actual = solve2(ex);
    const expected = 5586022;
    t.equal(actual, expected, msg);
  }
  {
    const ex = `171 ORE => 8 CNZTR
7 ZLQW, 3 BMBT, 9 XCVML, 26 XMNCP, 1 WPTQ, 2 MZWV, 1 RJRHP => 4 PLWSL
114 ORE => 4 BHXH
14 VRPVC => 6 BMBT
6 BHXH, 18 KTJDG, 12 WPTQ, 7 PLWSL, 31 FHTLT, 37 ZDVW => 1 FUEL
6 WPTQ, 2 BMBT, 8 ZLQW, 18 KTJDG, 1 XMNCP, 6 MZWV, 1 RJRHP => 6 FHTLT
15 XDBXC, 2 LTCX, 1 VRPVC => 6 ZLQW
13 WPTQ, 10 LTCX, 3 RJRHP, 14 XMNCP, 2 MZWV, 1 ZLQW => 1 ZDVW
5 BMBT => 4 WPTQ
189 ORE => 9 KTJDG
1 MZWV, 17 XDBXC, 3 XCVML => 2 XMNCP
12 VRPVC, 27 CNZTR => 2 XDBXC
15 KTJDG, 12 BHXH => 5 XCVML
3 BHXH, 2 VRPVC => 7 MZWV
121 ORE => 7 VRPVC
7 XCVML => 6 RJRHP
5 BHXH, 4 VRPVC => 5 LTCX`.split('\n');
    const msg = 'ex5 -> 2210736 ORE for 1 FUEL';
    const actual = solve2(ex);
    const expected = 460664;
    t.equal(actual, expected, msg);
  }
  t.end();
});
