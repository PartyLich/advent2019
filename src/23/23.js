// Advent of Code 2019
// Day 23: Category Six
import { pipe } from '../funtils';

import { Computer } from '../9';
import { makeGen } from '../11/11';


// create a computer from the supplied program
// []number -> Computer
export const makeComputer = pipe(
    (input) => input.flat(),
    Computer,
    makeGen,
);

// returns an array of specified size containing instances of intcode computers
// with the supplied program
// number -> []number -> []Computer
const makeNetwork = (size) => (program) => Array(size)
    .fill(null)
    .map(() => {
      const comp = makeComputer(program);
      return { comp, next: comp.next() };
    });

// run network until a packet is sent to address 255
// []Computer -> number
const runNetwork = (net) => {
  // fill input q with network addresses
  const inputQ = Array(net.length).fill(null)
      .map((_, ip) => [ip]);

  while (true) {
    for (const [addr, { comp, next }] of net.entries()) {
      if (!next.done) {
        const [, dest] = next.value;
        if (dest === undefined) {
          // expecting input
          // If the incoming packet queue is empty, provide -1
          const input = inputQ[addr].length ? inputQ[addr].shift() : -1;
          net[addr].next = comp.next(input);

          continue;
        }

        // To send a packet to another computer, the NIC will use three output
        // instructions that provide the destination address of the packet
        // followed by its X and Y values.
        const [, x] = comp.next().value;
        const [, y] = comp.next().value;

        if (dest === 255) {
          return y;
        }

        inputQ[dest].push(x);
        inputQ[dest].push(y);
        net[addr].next = comp.next();
      }
    }
  }
};

// What is the Y value of the first packet sent to address 255?
// []number -> number
export const solve = pipe(
    makeNetwork(50),
    runNetwork,
);
