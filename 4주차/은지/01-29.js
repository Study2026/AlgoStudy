// https://www.acmicpc.net/problem/2606
const fs = require("fs");

const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  // .trim()
  .split("\n")
  .map((e) => e.split(" ").map(Number));

const N = input[0];
const M = input[1];

const graph = Array.from({ length: N + 1 }, () => []);
for (let i = 0; i < M; i++) {
  const n1 = input[i + 2][0];
  const n2 = input[i + 2][1];
  graph[n1].push(n2);
  graph[n2].push(n1);
}
const visited = Array(N + 1).fill(false);

visited[1] = true;
const q = [1];
let head = 0;
let count = 0;

while (q.length - head > 0) {
  const cur = q[head++];

  for (let i = 0; i < graph[cur].length; i++) {
    const next = graph[cur][i];
    if (visited[next]) continue;
    count++;
    visited[next] = true;
    q.push(next);
  }
}

console.log(count);
