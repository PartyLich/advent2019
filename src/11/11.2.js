// Advent of Code 2019
// Day 11: Space Police
// Part 2
import { Computer } from '../9';
import {
  BLACK,
  toKey,
  makeGen,
  Point,
  concat,
  turn,
} from './11';


// transform a list of panels into a 2d matrix of chars
// Array<[Point, Color]> -> [][]string
const renderPanels = (panels) => {
  const [negMinPt, maxPt] = Object.entries(panels).reduce(
      ([{ x: minX, y: minY }, { x: maxX, y: maxY }], [position]) => {
        const pos = JSON.parse(position);
        return [
          Point(
              Math.min(minX, pos.x),
              Math.min(minY, pos.y),
          ),
          Point(
              Math.max(maxX, pos.x),
              Math.max(maxY, pos.y),
          ),
        ];
      },
      [Point(), Point()],
  );
  const minPt = Point(Math.abs(negMinPt.x), Math.abs(negMinPt.y));

  // initialize display matrix
  const rows = maxPt.y - negMinPt.y + 1;
  const cols = maxPt.x - negMinPt.x + 1;
  const display = Array(rows).fill(null)
      .map(() => Array(cols).fill(' '));

  // set white panels to '#'
  for (const [position, color] of Object.entries(panels)) {
    if (color === BLACK) continue;

    const adjPos = concat(minPt)(JSON.parse(position));
    // invert vertical. not sure if that's a quirk of my data specifically
    display[display.length - adjPos.y - 1][adjPos.x] = '#';
  }

  return display;
};

const WHITE = 1;

// how many panels are painted at least once?
// []number -> void
export const solve = (input = []) => {
  const robot = makeGen(Computer(input.flat()));
  const panels = {};
  let vector = Point(0, 1);
  let position = Point(0, 0);
  let key = toKey(position);

  // set starting panel to white
  panels[key] = WHITE;

  let next = robot.next();
  while (!next.done) {
    let [, color] = next.value;
    if (color === undefined) {
      // expecting input
      const panel = panels[key] || BLACK;
      next = robot.next(panel);
      color = next.value[1];
    }
    panels[key] = color;

    // update robot position
    const [, dir] = robot.next().value;
    vector = turn(dir)(vector);
    position = concat(position)(vector);
    key = toKey(position);

    next = robot.next();
  }

  // print each row
  renderPanels(panels)
      .forEach((row) => console.log(row.join('')));
};
