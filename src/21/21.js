// Advent of Code 2019
// Day 21: Springdroid Adventure
import { toAscii } from '../17';


// '\n' char
const NEWLINE = 10;
// ' ' char
const SPACE = 32;
const WALK = toAscii('WALK');
const NOT = toAscii('NOT');
const AND = toAscii('AND');
const OR = toAscii('OR');

// format a springdroid instruction as ascii
// -> []number -> number, number -> []number
const instruction = (op) => (x, y) => [op, SPACE, x, SPACE, y, NEWLINE].flat();
export const and = instruction(AND);
export const or = instruction(OR);
export const not = instruction(NOT);
const walk = () => [WALK, NEWLINE].flat();
