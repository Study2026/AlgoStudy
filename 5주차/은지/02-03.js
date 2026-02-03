// https://www.acmicpc.net/problem/2504
const fs = require("fs");

const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();
// .split("\n")
// .map((e) => e.split());

const stack = [];
const len = input.length;

for (let i = 0; i < len; i++) {
  const target = input[i];
  const prev = stack[stack.length - 1];

  switch (target) {
    case "(":
      stack.push("(");
      break;
    case ")":
      if (prev === "(") {
        stack.pop();
        stack.push(2);
      } else {
        let sum = 0;
        while (stack.length > 0 && stack[stack.length - 1] !== "(") {
          const top = stack.pop();
          if (isNaN(top)) {
            console.log(0);
            return;
          }
          sum += top;
        }
        if (stack.length === 0) {
          console.log(0);
          return;
        }
        stack.pop();
        stack.push(sum * 2);
      }
      break;
    case "[":
      stack.push("[");
      break;
    case "]":
      if (prev === "[") {
        stack.pop();
        stack.push(3);
      } else {
        let sum = 0;
        while (stack.length > 0 && stack[stack.length - 1] !== "[") {
          const top = stack.pop();
          if (isNaN(top)) {
            console.log(0);
            return;
          }
          sum += top;
        }
        if (stack.length === 0) {
          console.log(0);
          return;
        }
        stack.pop();
        stack.push(sum * 3);
      }
      break;
  }
}

let sum = 0;
while (stack.length > 0) {
  const next = stack.pop();
  if (isNaN(next)) {
    console.log(0);
    return;
  }
  sum += next;
}
console.log(sum);
