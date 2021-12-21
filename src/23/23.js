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

//  What is the first Y value delivered by the NAT to the computer at address 0
//  twice in a row?
// []Computer -> number
const part2 = (net) => {
  // fill input q with network addresses
  const inputQ = Array(net.length).fill(null)
      .map((_, ip) => [ip]);
  let nat = [];
  let lastY;
  let idleTime = 0;

  while (true) {
    let packetSent = false;
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
          // If a packet would be sent to address 255, the NAT receives it
          // instead.
          // Stores only the last packet it receives;
          nat = [x, y];
        } else {
          inputQ[dest].push(x);
          inputQ[dest].push(y);
        }

        packetSent = true;
        net[addr].next = comp.next();
      }
    }

    // If all computers have empty incoming packet queues and are continuously
    // trying to receive packets without sending packets, the network is
    // considered idle.
    const inputWaiting = inputQ.some((q) => q.length);
    idleTime = (packetSent || inputWaiting) ? 0 : idleTime + 1;

    // Once the network is idle, the NAT sends only the last packet it received
    // to address 0; this will cause the computers on the network to resume
    // activity.
    if (idleTime >= 3) {
      const [x, y] = nat;
      inputQ[0].push(x);
      inputQ[0].push(y);

      if (lastY === y) return y;

      lastY = y;
    }
  }
};

//  What is the first Y value delivered by the NAT to the computer at address 0
//  twice in a row?
// []number -> number
export const solve2 = pipe(
    makeNetwork(50),
    part2,
);
