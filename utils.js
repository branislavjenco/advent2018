const fs = require("fs");

const create2dArray = (rows, columns, fillValue) =>
  Array.from(Array(rows), _ => Array(columns).fill(fillValue));

const create1dArray = (length, fillValue) => Array(length).fill(fillValue);

const openFileToString = filename => fs.readFileSync(filename).toString();
const openFileToArray = filename => openFileToString(filename).split("\n");

module.exports = {
  create1dArray,
  create2dArray,
  openFileToString,
  openFileToArray
};
