// Advent of Code 2019
// Day 14: Space Stoichiometry
import { pipe, toDecimal } from './funtils';

export { identity as inpMap } from './funtils';
export { inpFilter } from './3';


// string -> []string
export const splitSpaces = (str) => str.split(/\s/);

const parseQuantity = ([num, ...rest]) => [toDecimal(num), ...rest];

const mapIngredients = pipe(
    splitSpaces,
    parseQuantity,
);

// type Ingredient = [number, string]

// type Formula = {
//   prod: number,
//   ingredients: []Ingredient
// }

// type Factory = {
//   [string]: Formula
// }

// string -> { [string]: Formula }
export const lineToObj = (str) => {
  const [, lhs, rhs] = str.match(/(.*)\s=>\s(.*)/);
  const ingredients = lhs.split(/\s?,\s?/)
      .map(mapIngredients);
  const [prod, key] = mapIngredients(rhs);

  return {
    [key]: {
      prod,
      ingredients,
    },
  };
};

// object, object -> object
export const joinObjs = (acc, next) => ({
  ...acc,
  ...next,
});

// Formula -> bool
export const isOreResult = ({ ingredients }) => ingredients[0][1] === 'ORE';

// Formula, number -> number
export const oreCal = (formula, quant) => {
  if (!isOreResult(formula)) throw new Error(`${ formula.prod } is not direct ore product`);

  const { prod, ingredients } = formula;
  return Math.ceil(quant / prod) * ingredients[0][0];
};

// level order tree traversal
// string -> Factory -> []Ingredient
export const findFormula = (product) => (factory) => {
  const { ingredients } = factory[product];
  let equation = ingredients.slice();
  const excesses = {};

  while (
    equation.some((ingredient) => !isOreResult(factory[ingredient[1]]))
  ) {
    equation = equation.flatMap((ingredient) => {
      const [need, name] = ingredient;
      if (isOreResult(factory[name])) return [ingredient];

      const { prod, ingredients: formula } = factory[name];

      // reuse excess production
      let adjNeed = need;
      if (excesses[name]) {
        adjNeed = (need - excesses[name]) || 0;
        excesses[name] -= need - adjNeed;
      }

      const ratio = Math.ceil(adjNeed / prod);
      const excess = prod * ratio - adjNeed;
      if (excess) excesses[name] = (excesses[name] || 0) + excess;

      return formula.map(([q, ...rest]) => [q * ratio, ...rest]);
    });

    equation = Object.entries(simplifyFormula(equation))
        .map(([name, q]) => [q, name]);
  }

  return equation;
};

// []Ingredient -> { [string]: number }
export const simplifyFormula = (arr) => arr.reduce((acc, next) => ({
  ...acc,
  [next[1]]: (acc[next[1]] || 0) + next[0],
}), {});

// sum ore requirements for given factory and formula
// Factory, { [string]: number } -> number
export const sumOreRequired = (factory, formula) =>
  Object.entries(formula).reduce(
      (acc, [prod, quant]) => acc + oreCal(factory[prod], quant),
      0,
  );

// []string -> []{ [string]: Formula }
const mapLineToObj = (arr) => arr.map(lineToObj);

// []{ [string]: Formula } -> { [string]: Formula }
const reduceObjs = (arr) => arr.reduce(joinObjs);

// []string -> Factory
export const makeFactory = pipe(
    mapLineToObj,
    reduceObjs,
);

// Factory -> { [string]: number }
export const getFormula = pipe(
    findFormula('FUEL'),
    simplifyFormula,
);

// what is the minimum amount of ORE required to produce exactly 1 FUEL?
export const solve = pipe(
    makeFactory,
    (factory) => [factory, getFormula(factory)],
    ([factory, formula]) => sumOreRequired(factory, formula),
);
