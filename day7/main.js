const {
  openFileToArray,
  create2dArray,
  create1dArray,
  range
} = require("../utils");

const sampleResult = "CABDFE";

const idx = c => c.charCodeAt() - 65;
const toChar = i => String.fromCharCode(i + 65);
const getWeight = i => i + 61;
const numberComparator = (a, b) => a - b;

const rgx = /Step (\S) must be finished before step (\S) can begin./;
const input = openFileToArray("./input.txt").map(l => {
  const [_, from, to] = rgx.exec(l);
  return { from: idx(from), to: idx(to) };
});

// make adjacency matrix
const adjM = input.reduce((acc, curr) => {
  acc[curr.to][curr.from] = 1;
  return acc;
}, create2dArray(input.length, input.length, 0));

// make adjacency list
// Note: in the end this is basically a needlessly complicated adjacency matrix
const adjL = input.reduce((acc, curr) => {
  if (acc[curr.from]) {
    acc[curr.from].to[curr.to] = true;
  } else {
    acc[curr.from] = { to: { [curr.to]: true }, from: {} };
  }
  if (acc[curr.to]) {
    acc[curr.to].from[curr.from] = true;
  } else {
    acc[curr.to] = { to: {}, from: { [curr.from]: true } };
  }
  return acc;
}, {});

function ordering(adjL) {
  const sources = Object.keys(adjL)
    .filter(k => Object.keys(adjL[k].from).length === 0)
    .map(Number);
  sources.sort(numberComparator);
  let queue = [...sources];
  let ordering = [];
  while (queue.length > 0) {
    let node = queue.shift();
    ordering.push(node);
    for (const n of Object.keys(adjL[node].to)) {
      delete adjL[n].from[node];
      if (Object.keys(adjL[n].from).length === 0) queue.push(Number(n));
    }
    queue.sort(numberComparator);
  }
  return ordering.map(toChar).join("");
}

//ordering(adjL);

function ordering2(adjL, workers) {
  // idle worker object
  const idleWorker = { busy: false, start: -1, end: -1, node: null };

  // make pool of worker objects
  let workerPool = create1dArray(workers, 0).map(w => ({ ...idleWorker }));

  const sources = Object.keys(adjL)
    .filter(k => Object.keys(adjL[k].from).length === 0)
    .map(Number);
  sources.sort(numberComparator);
  let queue = [...sources];
  let ordering = [];

  // start loop
  let seconds = 0;
  while (true) {
    // finish any work
    for (let [i, w] of workerPool.entries()) {
      if (w.end === seconds) {
        ordering.push(w.node);
        for (const n of Object.keys(adjL[w.node].to)) {
          delete adjL[n].from[w.node];
          if (Object.keys(adjL[n].from).length === 0) queue.push(Number(n));
        }
        workerPool[i] = { ...idleWorker };
      }
    }

    // assign new work
    let newQueue = [];
    for (const node of queue) {
      const availableWorkerI = workerPool.findIndex(w => !w.busy);
      if (availableWorkerI !== -1) {
        workerPool[availableWorkerI] = {
          busy: true,
          start: seconds,
          end: seconds + getWeight(node),
          node
        };
      } else {
        newQueue.push(node);
      }
    }
    queue = [...newQueue];
    queue.sort(numberComparator);

    // break if no work left to do
    if (queue.length < 1 && workerPool.filter(w => w.busy).length < 1) break;

    // iterate second
    seconds++;
  }

  return seconds;
}

console.log(ordering2(adjL, 5));
