// 문제링크 : https://leetcode.com/problems/min-cost-climbing-stairs/description/
/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function(cost) {
    const n=cost.length;
    const dp=Array(n+1);

    dp[0]=0;
    dp[1]=cost[0];

    for(let i=2;i<=n;i++){
        dp[i]=Math.min(dp[i-1],dp[i-2])+cost[i-1];
    }

    return Math.min(dp[n],dp[n-1]);
};
