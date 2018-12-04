const { openFileToArray, create1dArray } = require("../utils");

// format year-month-day hour:minute
const recordRegex = /\[([\S\s]+)\] ([\s\S]+)/;
const guardRegex = /Guard #(\d+) begins shift/;

// parse input
const input = openFileToArray("input.txt").map(l => {
  const matches = recordRegex.exec(l);
  return { timestamp: matches[1], action: matches[2] };
});

// sort by timestamp
input.sort(function(a, b) {
  return new Date(a.timestamp) - new Date(b.timestamp);
});

let currentGuardId;
let currentFallsAsleepMinute;
let currentWakesUpMinute;
const guards = input.reduce((acc, { action, timestamp }) => {
  const matches = guardRegex.exec(action);
  if (matches) {
    const guardId = matches[1];
    if (!acc[guardId]) {
      acc[guardId] = {};
      acc[guardId].timelines = create1dArray(60, 0);
    }
    currentGuardId = guardId;
  } else {
    if (action === "falls asleep") {
      currentFallsAsleepMinute = Number(
        timestamp.slice(timestamp.length - 2, timestamp.length)
      );
    } else if (action === "wakes up") {
      currentWakesUpMinute = Number(
        timestamp.slice(timestamp.length - 2, timestamp.length)
      );
      for (let i = currentFallsAsleepMinute; i < currentWakesUpMinute; i++) {
        acc[currentGuardId].timelines[i]++;
      }
    }
  }
  return acc;
}, {});

for (const guardId of Object.keys(guards)) {
  guards[guardId].sum = guards[guardId].timelines.reduce(
    (acc, curr) => acc + curr
  );
  guards[guardId].maxMinute = guards[guardId].timelines.reduce(
    (acc, curr, i, arr) => (arr[i] > arr[acc] ? i : acc),
    0
  );
}

const maxSum = Object.keys(guards).reduce((prev, curr) => {
  return guards[prev].sum > guards[curr].sum ? prev : curr;
});

console.log("solution 1: ", guards[maxSum].maxMinute * maxSum);

const maxSameMinute = Object.keys(guards).reduce((prev, curr) => {
  return Math.max(...guards[prev].timelines) >
    Math.max(...guards[curr].timelines)
    ? prev
    : curr;
});

console.log("solution 2: ", guards[maxSameMinute].maxMinute * maxSameMinute);
