const { openFileToArray, create2dArray } = require("../utils");
const dist = (p1, p2) => Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);

const fileInput = openFileToArray("input.txt");
const FILE_MAX_DIST = 10000;

const sampleInput = ["1, 1", "1, 6", "8, 3", "3, 4", "5, 5", "8, 9"];
const SAMPLE_MAX_DIST = 32;

const points = fileInput.map(l => {
  const [x, y] = l.split(", ");
  return { x: Number(x), y: Number(y) };
});

// Both quite innefective solutions
// going through all the coords and measuring distances to all the points
// would a growing method be faster?

function solution1(points) {
  const maxX = points.reduce((acc, curr) => (curr.x > acc ? curr.x : acc), 0);
  const maxY = points.reduce((acc, curr) => (curr.y > acc ? curr.y : acc), 0);

  const plane = create2dArray(maxY + 1, maxX + 1, 0);

  for (let y = 0; y < plane.length; y++) {
    for (let x = 0; x < plane[0].length; x++) {
      let minDist = Number.MAX_SAFE_INTEGER;
      let minDistPointIdx = [];
      for (const [idx, p] of points.entries()) {
        const d = dist(p, { x, y });
        if (d < minDist) {
          minDist = d;
          minDistPointIdx = [idx];
        } else if (d === minDist) {
          minDistPointIdx.push(idx);
        }
      }
      if (minDistPointIdx.length > 1) {
        plane[y][x] = -1;
      } else {
        plane[y][x] = minDistPointIdx[0];
      }
    }
  }

  const counts = points.reduce((acc, curr, idx) => {
    acc[idx] = { sum: 0, border: false };
    return acc;
  }, {});

  for (let y = 0; y < plane.length; y++) {
    for (let x = 0; x < plane[0].length; x++) {
      const p = plane[y][x];
      if (p !== -1) {
        counts[p].sum++;
        if (
          x === 0 ||
          y === 0 ||
          x === plane[0].length - 1 ||
          y === plane.length - 1
        ) {
          counts[p].border = true;
        }
      }
    }
  }
  return Object.values(counts).reduce(
    (acc, curr) => (curr.sum > acc && !curr.border ? curr.sum : acc),
    0
  );
}

function solution2(points, boundary) {
  const maxX = points.reduce((acc, curr) => (curr.x > acc ? curr.x : acc), 0);
  const maxY = points.reduce((acc, curr) => (curr.y > acc ? curr.y : acc), 0);

  const plane = create2dArray(maxY + 1, maxX + 1, 0);
  let areaSum = 0;
  for (let y = 0; y < plane.length; y++) {
    x: for (let x = 0; x < plane[0].length; x++) {
      let sumDist = 0;
      for (const p of points) {
        sumDist = sumDist + dist(p, { x, y });
        if (sumDist >= boundary) {
          continue x;
        }
      }
      areaSum++;
    }
  }
  return areaSum;
}

console.log(solution1(points));
console.log(solution2(points, FILE_MAX_DIST));
