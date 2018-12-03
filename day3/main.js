const { create2dArray, openFileToArray } = require("../utils.js");

const claimStrings = openFileToArray("input.txt");

function part1(claimStrings) {
  let fabric = create2dArray(1000, 1000, 0);
  let claims = [];

  for (const claim of claimStrings) {
    const [id, _, xy, wh] = claim.split(" ");
    const [x, y] = xy
      .slice(0, xy.length - 1)
      .split(",")
      .map(n => parseInt(n, 10));
    const [w, h] = wh.split("x").map(n => parseInt(n, 10));
    claims.push({ id, x, y, w, h });

    for (let i = x; i < x + w; i++) {
      for (let j = y; j < y + h; j++) {
        fabric[i][j] = fabric[i][j] + 1;
      }
    }
  }

  let counter = 0;

  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 1000; j++) {
      if (fabric[i][j] > 1) counter = counter + 1;
    }
  }

  return { claims, fabric, counter };
}

const { claims, fabric, counter } = part1(claimStrings);

console.log("Part 1 solution: ", counter);

function part2(claims, fabric) {
  outer: for (const claim of claims) {
    for (let i = claim.x; i < claim.x + claim.w; i++) {
      for (let j = claim.y; j < claim.y + claim.h; j++) {
        if (fabric[i][j] !== 1) continue outer;
      }
    }
    return claim.id;
  }
}

console.log("Part 2 solution: ", part2(claims, fabric));
