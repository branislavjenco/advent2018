const util = require("util");

const { openFileToString, range } = require("../utils");

const input = openFileToString("input.txt")
  .split(" ")
  .map(Number);

const constructNode = (input, i) => {
  const childrenNum = input[i];
  const metadataNum = input[i + 1];
  const children = [];
  const metadat = [];
  let childrenLen = 2;
  for (let j = 0; j < childrenNum; j++) {
    let child = constructNode(input, i + childrenLen);
    childrenLen = childrenLen + child.len;
    children.push(child);
  }

  const metadata = input.slice(i + childrenLen, i + childrenLen + metadataNum);
  return {
    children,
    metadata,
    len: childrenLen + metadataNum,
    value:
      childrenNum === 0
        ? metadata.reduce((acc, m) => acc + m, 0)
        : metadata.reduce((acc, m) => {
            if (children[m - 1]) {
              acc = acc + children[m - 1].value;
            }
            return acc;
          }, 0),
    sum:
      children.reduce((acc, ch) => acc + ch.sum, 0) +
      metadata.reduce((acc, m) => acc + m, 0)
  };
};

const tree = constructNode(input, 0);

console.log(util.inspect(tree, false, null, true));
