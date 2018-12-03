const { openFileToArray } = require("../utils.js");

const input = openFileToArray("input.txt").map(Number);

const values = input.reduce(
  (acc, curr) => {
    acc.push(acc[acc.length - 1] + curr);
    return acc;
  },
  [0]
);

const d = values[values.length - 1];
let value = 0;
let counter = 0;
let freq = {};
while (true) {
  const i = counter % input.length;
  const j = ~~(counter / input.length);
  if (freq[value]) {
    console.log(value);
    break;
  }
  freq[value] = 1;

  value = value + input[i];
  counter = counter + 1;
}
