// https://leetcode.com/problems/house-robber/description/
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    const total=nums.length;
    const dp=Array(total+1).fill(0);
    dp[1]=nums[0];
    if(total>=2) dp[2]=nums[1];
    
    for(let i=3;i<=total;i++){
        dp[i]=Math.max(dp[i-2],dp[i-3])+nums[i-1];
    }

    return Math.max(dp[total],dp[total-1]);
};
