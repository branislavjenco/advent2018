const { openFileToArray, create2dArray } = require("../utils");

const sampleResult = "CABDFE";

const rgx = /Step (\S) must be finished before step (\S) can begin./;
const input = openFileToArray("sampleInput.txt").map(l => {
  const [_, from, to] = rgx.exec(l);
  return { from, to };
});

const len = input.length;
const adj = create2dArray(len, len, 0);

// make adjacency matrix
for (const l of input) {
  adj[l.from.charCodeAt() - 65][l.to.charCodeAt() - 65] = 1;
}

console.log(adj);
