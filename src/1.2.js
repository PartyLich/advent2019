// Advent of Code 2019
// Day 1, part 2: The Tyranny of the Rocket Equation
import { fuelReq, fuelCalc } from './1';


// number -> number
export const subFuel = (mass) => {
  let fuel = mass;
  let total = 0;

  while ((fuel = fuelReq(fuel)) >= 0) {
    total += fuel;
  }

  return total;
};

// []number -> number
export const totalFuel = fuelCalc(subFuel);
