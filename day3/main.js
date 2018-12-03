const { create2dArray, openFileToArray } = require("../utils.js");

// array of input lines
const claimStrings = openFileToArray("input.txt");

function part1(claimStrings) {
  let fabric = create2dArray(1000, 1000, 0);
  let claims = [];
  const claimRegex = /(\d+) @ (\d+),(\d+): (\d+)x(\d+)/;

  // add up square inches in fabric
  // also parse our claims
  for (const claim of claimStrings) {
    const [, id, x, y, w, h] = claimRegex.exec(claim).map(Number);
    claims.push({ id, x, y, w, h });

    for (let i = x; i < x + w; i++) {
      for (let j = y; j < y + h; j++) {
        fabric[i][j]++;
      }
    }
  }

  // count the overlaps
  let overlaps = 0;
  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 1000; j++) {
      if (fabric[i][j] > 1) overlaps++;
    }
  }

  return { claims, fabric, overlaps };
}

function part2(claims, fabric) {
  // if we go through any claim's area in the fabric
  // without hitting anything but 1, we have our result
  outer: for (const claim of claims) {
    for (let i = claim.x; i < claim.x + claim.w; i++) {
      for (let j = claim.y; j < claim.y + claim.h; j++) {
        if (fabric[i][j] !== 1) continue outer;
      }
    }
    return claim.id;
  }
}

const { claims, fabric, overlaps } = part1(claimStrings);
console.log("Part 1 solution: ", overlaps);
console.log("Part 2 solution: ", part2(claims, fabric));
