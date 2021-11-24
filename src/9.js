// Advent of Code 2019
// Day 9: Sensor Boost

// type Operation {
//  fn: Function,
//  params: number,
// }

// type Computer {
//  // system memory
//  mem: []number,
//  // program counter
//  pc: number,
//  // relative base
//  rb: number,
// }

// Computer obj factory
export const Computer = (program = []) => ({
  mem: program,
  pc: 0,
  rb: 0,
});
