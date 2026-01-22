// https://leetcode.com/problems/path-with-maximum-probability/
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} succProb
 * @param {number} start_node
 * @param {number} end_node
 * @return {number}
 */
// 힙 템플릿
class CustomHeap {
  constructor(comparator) {
    this.heap = [];
    this.compare = comparator;
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  peek() {
    return this.heap[0] ?? null;
  }

  push(value) {
    this.heap.push(value);
    this._bubbleUp();
  }

  pop() {
    if (this.isEmpty()) return null;
    if (this.size() === 1) return this.heap.pop();

    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._bubbleDown();
    return top;
  }

  _bubbleUp() {
    let idx = this.size() - 1;

    while (idx > 0) {
      const parent = (idx - 1) >> 1;
      if (this.compare(this.heap[parent], this.heap[idx])) break;
      [this.heap[parent], this.heap[idx]] =
        [this.heap[idx], this.heap[parent]];
      idx = parent;
    }
  }

  _bubbleDown() {
    let idx = 0;
    const n = this.size();

    while (true) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;
      let target = idx;

      if (left < n && !this.compare(this.heap[target], this.heap[left])) {
        target = left;
      }
      if (right < n && !this.compare(this.heap[target], this.heap[right])) {
        target = right;
      }
      if (target === idx) break;

      [this.heap[idx], this.heap[target]] =
        [this.heap[target], this.heap[idx]];
      idx = target;
    }
  }
}

var maxProbability = function(n, edges, succProb, start_node, end_node) {
    const graph=Array.from({length:n},()=>[]);
    const dist=Array(n).fill(0);

    for(let i=0;i<edges.length;i++){
        const [from,to]=edges[i];
        const prob=succProb[i];
        graph[from].push([to,prob]);
        graph[to].push([from,prob]);
    }

    const pq=new CustomHeap((n1,n2)=>n1.w>=n2.w);
    dist[start_node]=1;
    pq.push({n:start_node,w:1});

    while(!pq.isEmpty()){
        const {n,w}=pq.pop();
        if(dist[n]>w) continue;

        for(const [nextN,nextP] of graph[n]){
            const nextW=w*nextP
            if(nextW<=dist[nextN]) continue;
            dist[nextN]=nextW;
            pq.push({n:nextN,w:nextW});
        }
    }
    
    return dist[end_node];
};
