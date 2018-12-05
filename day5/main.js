const { openFileToString } = require("../utils");

const sampleInput = "dabAcCaCBAcCcaDA";
const sampleResult = "dabCBAcaDA";
const fileInput = openFileToString("input.txt");

// Determine if two units are opposite polarity
const isOppositePolarity = (u1, u2) =>
  Math.abs(u1.charCodeAt() - u2.charCodeAt()) === 32;

/**
 * Solution 1 without having to do multiple passes
 * @param {array} polymer
 */
function collapsePolymer(polymer) {
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

/**
 * Solution 2, Returns the shortest polymer
 * @param {array} polymer
 */
function improvedCollapsePolymer(polymer) {
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

const input1 = fileInput.split("");

console.log("Solution 1: ", collapsePolymer(input1).length);

const input2 = fileInput.split("");
console.log("Solution 2: ", improvedCollapsePolymer(input2).length);
