// https://www.acmicpc.net/problem/1062
const fs = require("fs");

const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((e) => e.split(" "));

const N = input[0][0];
const K = input[0][1];
const map = new Map();

for (let i = 1; i < input.length; i++) {
  for (const char of input[i][0]) {
    map.set(char, false);
  }
}

const arr = [...map.keys()];
map.set("a", true);
map.set("n", true);
map.set("t", true);
map.set("i", true);
map.set("c", true);

if (K < 5) {
  console.log(0);
  return;
}
if (arr.length <= K) {
  console.log(N);
  return;
}
let max = 0;

function doDFS(count, start) {
  if (count === K - 5) {
    let canRead = 0;
    for (let i = 1; i < input.length; i++) {
      for (let j = 0; j < input[i][0].length; j++) {
        const next = input[i][0][j];
        if (!map.get(next)) break;
        if (j === input[i][0].length - 1) canRead++;
      }
    }
    max = Math.max(canRead, max);
    return;
  }

  if (start === arr.length) return;

  for (let i = start; i < arr.length; i++) {
    if (map.get(arr[i])) continue;
    map.set(arr[i], true);
    doDFS(count + 1, i + 1);
    map.set(arr[i], false);
  }
}

doDFS(0, 0);
console.log(max);
