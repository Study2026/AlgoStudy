// https://school.programmers.co.kr/learn/courses/30/lessons/68645
function solution(n) {
    const pyramid=Array.from({length:n},()=>Array(n));

    let num=0;
    let dist=n
    let row=-1;
    let col=0;

    while(dist>0){
        for(let i=dist;i>0;i--){
            pyramid[++row][col]=++num;
        }
        dist--;
        for(let i=dist;i>0;i--){
            pyramid[row][++col]=++num;
        } 
        dist--;
        for(let i=dist;i>0;i--){
            pyramid[--row][--col]=++num;
        }
        dist--;
    }

    const result=[];
    for(let i=0;i<n;i++){
        for(let j=0;j<=i;j++){
            result.push(pyramid[i][j]);
        }
    }

    return result;
}
