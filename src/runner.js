import fs from 'fs';
import { Writable } from 'stream';

import { xForm as lines } from './1';
import {
  inpFilter, inpMap,
  // solve,
  // visual as solve,
  solve2 as solve,
} from './23';


// read filename from stdin; exit if not provided
const [fname] = process.argv.slice(2);
if (!fname) {
  console.log('Usage: runner.js <input file name>');
  process.exit();
}

console.log(`Input from ${ fname }.txt`);
const fstream = fs.createReadStream(__dirname + `/../input/${ fname }.txt`);

// string -> bool
const notEmpty = (str) => !!str;

let arr = [];

const w = new Writable({
  write(chunk, _, next) {
    const c = lines(chunk).reduce(
        (acc, next) => (notEmpty(next) && inpFilter(next))
            ? [...acc, inpMap(next)]
            : acc,
        [],
    );
    arr = arr.concat(c);

    next();
  },
});

process.stdout.on('error', process.exit);

const exec = (input) => solve(input);

console.time('load');
fstream.pipe(w);

fstream.on('end', () => {
  console.timeEnd('load');
  console.log('Executing...');
  console.time('execute');
  const result = exec(arr);
  console.timeEnd('execute');
  console.log(`Result: ${ JSON.stringify(result) }`);
  console.log('Done');
});
