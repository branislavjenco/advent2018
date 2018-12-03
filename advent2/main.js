const fs = require("fs");

const input = fs
  .readFileSync("input.txt")
  .toString()
  .split("\n");

function countLetters(id) {
  let freq = {};
  for (const letter of id) {
    freq[letter] = freq[letter] ? freq[letter] + 1 : 1;
  }
  return Object.values(freq).reduce(
    (acc, curr) => {
      if (curr === 2) {
        acc["double"] = true;
      }
      if (curr === 3) {
        acc["triple"] = true;
      }
      return acc;
    },
    { double: false, triple: false }
  );
}

function checksum(input) {
  let doubles = 0;
  let triples = 0;
  for (const id of input) {
    const { double, triple } = countLetters(id);
    console.log(double, triple);
    if (double) doubles = doubles + 1;
    if (triple) triples = triples + 1;
  }

  return doubles * triples;
}

console.log(checksum(input));

function checkArray(arr) {
  let idx;
  let counter = 0;
  for (const [i, el] of arr.entries()) {
    if (el !== 0) {
      counter = counter + 1;
    }
  }
  if (counter === 1) {
    for (const [i, el] of arr.entries()) {
      if (el !== 0) {
        idx = i;
      }
    }
  }
  return idx ? { idx } : false;
}

function solution2(input) {
  const idCodes = input.map(id => id.split("").map(l => l.charCodeAt(0)));
  for (let [i, id] of idCodes.entries()) {
    for (let j = i + 1; j < idCodes.length; j++) {
      const otherId = idCodes[j];
      const diff = id.map((l, idx) => l - otherId[idx]);
      const check = checkArray(diff);
      if (check) {
        let common = input[i].split("");
        common.splice(check.idx, 1);
        return {
          id: input[i],
          otherId: input[j],
          common: common.join("")
        };
      }
    }
  }
}

console.log(solution2(input));
