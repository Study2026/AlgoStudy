// https://school.programmers.co.kr/learn/courses/30/lessons/87946?language=javascript
function solution(k, dungeons) {
    let result=0;
    
    function DFS(set,piro){
        result=Math.max(result,set.size);
        for(let i=0;i<dungeons.length;i++){
            if(set.has(i)) continue;
            const [need,use]=dungeons[i];
            if(piro<need || piro<use) continue;
            
            set.add(i);
            DFS(set,piro-use);
            set.delete(i);
        }
    }
    
    DFS(new Set(),k);
    return result;
}
