// https://leetcode.com/problems/merge-sorted-array/description/?envType=study-plan-v2&envId=top-interview-150
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
// O( (m+n)log(m+n) )
// var merge = function(nums1, m, nums2, n) {
//     for(let i=0;i<n;i++){
//         nums1[m+i]=nums2[i];
//     }
//     nums1.sort((a,b)=>a-b);
// };

// O( (m+n) )
var merge = function(nums1, m, nums2, n) {
    let i=m-1;
    let j=n-1;
    let k=m+n-1;
    
    while (j>=0) {
        if (i>=0 && nums1[i] > nums2[j]) {
            nums1[k--] = nums1[i--];
        } else {
            nums1[k--] = nums2[j--];
        }
    }
};
