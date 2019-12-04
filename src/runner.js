import fs from 'fs';
import { Writable } from 'stream';

import { totalFuel } from './1';

// read filename from stdin; exit if not provided
const [fname] = process.argv.slice(2);
if (!fname) {
  console.log('Usage: runner.js <input file name>');
  process.exit();
}

console.log(`Input from ${ fname }.txt`);
const fstream = fs.createReadStream(__dirname + `/../input/${ fname }.txt`);


// Buffer -> []string
const xForm = (chunk) => chunk.toString().split('\n');

// str -> number
const toInt = (el) => parseInt(el, 10);

// string -> bool
const notEmpty = (str) => !!str;

let arr = [];

const w = new Writable({
  write(chunk, _, next) {
    arr = arr.concat(xForm(chunk))
        .filter(notEmpty)
        .map(toInt);
    next();
  },
});

process.stdout.on('error', process.exit);

const exec = (input) => {
  const result = totalFuel(input);

  return result;
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
