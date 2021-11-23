// Advent of Code 2019
// Day 7: Amplification Circuit
// part 2
import { add, OPCODES, parseInstruction } from './5';
import { transition } from './5.2';
import { makeOpcodes } from './7';


// returns an Iterable over computer state
export const computer = (opcodes) => ({ state: program = [], pc = 0 } = {}) => {
  // mem state
  let state = program.slice();
  let done = false;

  return {
    next: () => {
      const { opcode, modes } = parseInstruction(state[pc]);
      // operation
      const op = opcodes[opcode];
      done = op === OPCODES[99];

      if (!done && op.fn) {
        const [nextState, nextPc] = transition(state, pc, op, modes);
        state = nextState;
        pc = nextPc !== null ? nextPc : add(pc, op.params + 1);

        return {
          value: {
            pc,
            done,
            state: state.slice(),
          },
          done,
        };
      }

      return {
        value: { pc, done, state },
        done,
      };
    },
    [Symbol.iterator]() {
      return this;
    },
  };
};

// run an amplifier loop with the provided phase settings, returning the last
// output
// []number -> []number -> number -> number
export const trySettings = (program) => (phaseSettings) =>
  (initialInput = 0) => {
    const amps = Array(phaseSettings.length);
    const phaseIter = phaseSettings[Symbol.iterator]();

    // run amp loop to completion
    let done = false;
    let output = 0;
    let lastOutput;
    while (!done) {
      for (const [i, amp] of amps.entries()) {
        const inputList = [];
        const nextPhase = phaseIter.next();
        if (!nextPhase.done) inputList.push(nextPhase.value);
        inputList.push(output);

        const inputIter = inputList[Symbol.iterator]();
        const stateIter = computer(makeOpcodes(
            () => inputIter.next().value,
            (value) => {
              // side effect: set accumulator to output value
              output = value;
              lastOutput = value;
            },
        ))(amp ? amp : { state: program });

        // run amp until output or HALT
        output = null;
        let ampState;
        for (ampState of stateIter) {
          if (output !== null) break;
        }

        (ampState === undefined)
            ? done = true
            : amps[i] = ampState;
      }
    }

    return lastOutput;
  };
