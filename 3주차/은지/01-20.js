// https://leetcode.com/problems/permutation-sequence/
/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getPermutation = function(n, k) {
    const visited = Array(n+1).fill(false);
    let count=0;

    function doPermutation(path){
        if(path.length===n){
            if(++count===k){
                return path.join("");
            }
        }
        for(let i=1;i<=n;i++){
            if(visited[i]) continue;
            
            visited[i]=true;
            path.push(i);

            const answer=doPermutation(path)
            if(answer) return answer;
            
            path.pop();
            visited[i]=false;
        }
    }

    return doPermutation([]);
};
