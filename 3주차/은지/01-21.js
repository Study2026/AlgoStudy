// https://school.programmers.co.kr/learn/courses/30/lessons/92334
function solution(id_list, report, k) {
    const result=[];
    const reportSet=new Set(report);
    const reportMap=new Map();
    const countMap=new Map();

    for(const rep of reportSet){
        const [from,to]=rep.split(" ");
        if(reportMap.has(to)) reportMap.get(to).push(from);
        else reportMap.set(to,[from]);
    }
    
    for(const [to,from] of reportMap){
        if(from.length>=k){
            for(const person of from){
            countMap.set(person,(countMap.get(person)||0)+1);
            }
        }
    }
    
    for(const id of id_list){
        result.push(countMap.get(id)||0);
    }
    
    return result;
}
