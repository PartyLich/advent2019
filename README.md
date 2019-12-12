Advent of Code 2019 🎄
---

Knocking out some solutions when time permits. It was already underway for a number of days before I discovered this event existed. So even if I had the time or interest, competing seems a bit out of the question.

Good practice though, hopefully.

Join in: [Advent of Code 2019 website](adventofcode.com/2019)

Setup
---
I ran my exceedingly general scaffold. Don't be surprised if the package.json is littered with things that aren't actually used. If by some strange chance you actually clone this repo, definitely give it a going over before you install anything.
```shell
git clone
cd
npm i
npm test
```
Run modules with `node -r esm`

`runner.js` needs to be manually updated with the import and function call you need for the day. When run from the cli (as intended), it expects 1 argument - the input data filename.  '.txt' will be appended to the argument. It expects all input to be in the `input/` dir

If your data is `day1.txt`,

use `npm start -- day1`

Note: it's a very low effort util. Expect it to be brittle, maybe even dangerous 💀.
