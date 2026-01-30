// https://school.programmers.co.kr/learn/courses/30/lessons/148653?language=javascript
function solution(storey) {
    let answer=0;
    
    while(storey>0){
        let cur=storey%10;

        if(cur>=6){
            answer+=(10-cur);
            storey=Math.floor(storey/10)+1;
        }else if(cur<5){
            answer+=cur;
            storey=Math.floor(storey/10);
        }else{
            answer+=5;
            const next=Math.floor(storey/10)%10;
            if(next>=5) storey=Math.floor(storey/10)+1;
            else storey=Math.floor(storey/10);
            }
        }
    
    return answer;
    }
