// Advent of Code 2019
// Day 1: The Tyranny of the Rocket Equation

// number -> number
export const sum = (a, b) => a + b;

// function -> []number -> number
export const fuelCalc = (fuelReq) => (modules) =>
  modules.map(fuelReq).reduce(sum, 0);

// number -> number
export const fuelReq = (mass) => Math.floor(mass / 3) - 2;

// []number -> number
export const totalFuel = fuelCalc(fuelReq);

// Buffer -> []string
export const xForm = (chunk) => chunk.toString().split('\n');

// string -> number
export const inpMap = (el) => parseInt(el, 10);
