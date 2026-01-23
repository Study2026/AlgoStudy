// https://school.programmers.co.kr/learn/courses/30/lessons/42627
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

function solution(jobs) {
    const pq=new CustomHeap((work1,work2)=>{
        if(work1.duration===work2.duration) return work1.time<work2.time;
        return work1.duration<work2.duration;
    });
    
    jobs.sort((j1,j2)=>j1[0]-j2[0]);
    
    let curTime=0;
    let index=0;
    let sum=0;
    
    while(!pq.isEmpty() || index<jobs.length){
        while(index<jobs.length && jobs[index][0]<=curTime){
            pq.push({duration:jobs[index][1],time:jobs[index++][0]});
        }
        
        if(pq.isEmpty()){
            curTime=jobs[index][0]
            continue;
        }
        const {duration,time}=pq.pop();
        curTime+=duration;
        sum+=(curTime-time);
    }
    
    return Math.floor(sum/jobs.length);
    
    
}
