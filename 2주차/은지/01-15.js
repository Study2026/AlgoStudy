// https://leetcode.com/problems/longest-increasing-subsequence/description/
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    const tails=[];

    for(const num of nums){
        let left=0;
        let right=tails.length;
        while(left<right){
            const mid=Math.floor((left+right)/2);
            if(tails[mid]<num){
                left=mid+1;
            }else{
                right=mid;
            }
        }

        if(left===tails.length) tails.push(num)
        else tails[left]=num;
    }

    return tails.length;
};
