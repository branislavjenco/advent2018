const fs = require("fs");
const create2dArray = (rows, columns, fillValue) =>
  Array.from(Array(rows), _ => Array(columns).fill(fillValue));

const openFileToArray = filename =>
  fs
    .readFileSync(filename)
    .toString()
    .split("\n");

module.exports = {
  create2dArray,
  openFileToArray
};
