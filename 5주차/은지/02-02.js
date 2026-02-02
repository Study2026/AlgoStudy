// https://www.acmicpc.net/problem/14888
const fs = require("fs");

const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((e) => e.split(" ").map(Number));

const N = input[0][0];
const nums = input[1];
const count = input[2];

let min = Infinity;
let max = -Infinity;

const calculate = (idx, n1, n2) => {
  let result;
  switch (idx) {
    case 0:
      result = n1 + n2;
      break;
    case 1:
      result = n1 - n2;
      break;
    case 2:
      result = n1 * n2;
      break;
    case 3:
      let buho = 1;
      if (n1 < 0) buho *= -1;
      if (n2 < 0) buho *= -1;
      result = Math.floor(Math.abs(n1) / Math.abs(n2));
      result = result === 0 ? 0 : result * buho;
      break;
  }
  return result;
};

const doDFS = (result, cur) => {
  if (cur === N) {
    min = Math.min(min, result);
    max = Math.max(max, result);
    return;
  }
  const next = cur + 1;
  for (let i = 0; i < 4; i++) {
    if (count[i] > 0) {
      count[i]--;
      const nextResult = calculate(i, result, nums[cur]);
      doDFS(nextResult, next);
      count[i]++;
    }
  }
};

doDFS(nums[0], 1);
console.log(max);
console.log(min);
