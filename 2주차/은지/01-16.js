// https://leetcode.com/problems/maximal-square/description/
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function(matrix) {
    const M=matrix.length;
    const N=matrix[0].length;
    let maxSquare=0;

    for(let i=0;i<M;i++){
        for(let j=0;j<N;j++){
            matrix[i][j]=Number(matrix[i][j]);
            maxSquare=Math.max(maxSquare,matrix[i][j]);
        }
    }

    for(let i=1;i<M;i++){
        for(let j=1;j<N;j++){
            if(matrix[i][j]===0) continue;
            matrix[i][j]=Math.min(matrix[i-1][j],matrix[i][j-1],matrix[i-1][j-1])+1;
            maxSquare=Math.max(maxSquare,matrix[i][j]);
        }
    }

    console.log(matrix);
    return maxSquare*maxSquare;
};
