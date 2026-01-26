// https://school.programmers.co.kr/learn/courses/30/lessons/92341#/
function solution(fees, records) {
    const map={};
    
    function calculDiff(before,after){
        const [beforeH,beforeM]=before.split(":");
        const [afterH,afterM]=after.split(":");
        return (Number(afterM)+Number(afterH)*60)-(Number(beforeM)+Number(beforeH)*60);;
    }
    
    for(const record of records){
        const [time,num,direction]=record.split(" ");
        if(map.hasOwnProperty(num)){
            if(map[num].time===null) map[num].time=time;
            else{
                map[num].total+=calculDiff(map[num].time,time);
                map[num].time=null;
            }
        }
        else{
            map[num]={};
            map[num].time=time;
            map[num].total=0;
        }
    }
    
    return Object.keys(map).sort((a,b)=>Number(a)-Number(b)).map((num)=>{
        if(map[num].time!==null) map[num].total+=calculDiff(map[num].time,"23:59");
        if(map[num].total-fees[0]>0){
            return fees[1]+Math.ceil((map[num].total-fees[0])/fees[2])*fees[3];
        }else return fees[1];
    })
    
}
