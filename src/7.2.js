// Advent of Code 2019
// Day 7: Amplification Circuit
// part 2
import { add, OPCODES, parseInstruction } from './5';
import { transition } from './5.2';


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
