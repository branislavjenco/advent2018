const { openFileToString } = require("../utils");

const sampleInput = "dabAcCaCBAcCcaDA";
const fileInput = openFileToString("input.txt");

let input = fileInput.split("");

// Determine if two units are opposite polarity
const isOppositePolarity = (u1, u2) =>
  u1.toLowerCase() === u2.toLowerCase() && u1 !== u2;

/**
 * Solution 1 without having to do multiple passes
 * @param {array} polymer
 */
function collapsePolymer(polymer) {
  polymer = [...polymer]; // let's not mutate the argument
  // destructions are done by setting indices to null
  let prevI;
  for (let i = 1; i < polymer.length; i++) {
    // find our previous unit to compare (because nulls)
    for (let j = i - 1; j >= 0; j--) {
      if (polymer[j]) {
        prevI = j;
        break;
      }
      if (!polymer[j] && j === 0) {
        // at the beginning and all was null, skip i forward
        prevI = i;
        i++;
      }
    }

    if (isOppositePolarity(polymer[prevI], polymer[i])) {
      polymer[prevI] = null;
      polymer[i] = null;
    }
  }
  // filter out nulls
  const result = polymer.filter(x => !!x).join("");
  return result;
}

function improvedCollapsePolymer(polymer) {
  polymer = [...polymer]; // don't mutate
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  let minLength = polymer.length;
  let shortestPolymer;
  for (const unit of alphabet) {
    const remainingPolymer = polymer.filter(c => c.toLowerCase() !== unit);
    const collapsedPolymer = collapsePolymer(remainingPolymer);
    if (collapsedPolymer.length < minLength) {
      minLength = collapsedPolymer.length;
      shortestPolymer = collapsedPolymer;
    }
  }

  return shortestPolymer;
}

console.log("Solution 1: ", collapsePolymer(input).length);
console.log("Solution 2: ", improvedCollapsePolymer(input).length);
