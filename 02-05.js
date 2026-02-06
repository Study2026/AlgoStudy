// https://www.acmicpc.net/problem/1700
const fs = require("fs");

const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((line) => line.split(" ").map(Number));

const N = input[0][0];
const K = input[0][1];
const map = new Map();
for (let i = K - 1; i >= 0; i--) {
  const target = input[1][i];
  if (!map.has(target)) map.set(target, []);
  map.get(target).push(i);
}

let answer = 0;

const multitap = new Set();
for (let i = 0; i < K; i++) {
  const target = input[1][i];
  map.get(target).pop();

  if (multitap.has(target)) continue;
  if (multitap.size === N) {
    let maxIndex = 0;
    let maxPlug = 0;
    for (const plug of multitap) {
      if (map.get(plug).length === 0) {
        maxPlug = plug;
        break;
      }
      const nextIndex = map.get(plug).at(-1);
      if (nextIndex > maxIndex) {
        maxIndex = nextIndex;
        maxPlug = plug;
      }
    }
    multitap.delete(maxPlug);
    answer++;
  }
  multitap.add(target);
}

console.log(answer);
