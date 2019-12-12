import fs from 'fs';
import { Writable } from 'stream';

import { xForm } from './1';
import { inpFilter } from './3';
import { inpMap } from './8';
import { solve } from './8';

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
    arr = arr.concat(xForm(chunk))
        .filter(notEmpty)
        .filter(inpFilter)
        .map(inpMap);
    next();
  },
});

process.stdout.on('error', process.exit);

const exec = (input) => {
  return solve(input);
};

fstream.pipe(w);

fstream.on('end', () => {
  console.log('Executing...');
  console.time('execute');
  const result = exec(arr);
  console.timeEnd('execute');
  console.log(`Result: ${ JSON.stringify(result) }`);
  console.log('Done');
});
