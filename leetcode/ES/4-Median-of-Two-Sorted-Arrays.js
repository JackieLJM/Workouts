// There are two sorted arrays nums1 and nums2 of size m and n respectively.
// Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).
// Example 1:
// nums1 = [1, 3]
// nums2 = [2]
// The median is 2.0
// Example 2:
// nums1 = [1, 2]
// nums2 = [3, 4]
// The median is (2 + 3)/2 = 2.5
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */

 
// 20180409 update
// Your runtime beats 69.61 % of javascript submissions.
// 132ms
var findMedianSortedArrays = function(nums1, nums2) {
    var num=[];
    num=nums1.concat(nums2).sort(function(a,b){return a-b});
    // return num;
    if(num.length%2===1){
        return num[num.length/2-0.5]
    }
    else if(num.length%2===0){
        return (num[num.length/2-1]+num[num.length/2])/2
    }
};


// 104ms
var findMedianSortedArrays = function(nums1, nums2) {
    let m = nums1.length, n = nums2.length;
    if (m < n) {
        return findMedianSortedArrays(nums2, nums1);
    }
    let c = (m + n) >> 1;
    let low = 0, high = n;
    while (low < high) {
        let mid = (low + high) >> 1;
        if (mid < n && nums1[c - mid -1] > nums2[mid]) {
            low = mid + 1;
        } else if (mid - 1 >= 0 && nums1[c - mid] < nums2[mid - 1]) {
            high = mid - 1;
        } else {
            high = low = mid;
        }
    }
    let a = Math.min(low >= n ? Number.MAX_VALUE : nums2[low], c - low >= m ? Number.MAX_VALUE : nums1[c - low]);
    if ((m + n) % 2 == 1) {
        return a;
    }
    let b = Math.max(low - 1 < 0 ? Number.MIN_VALUE : nums2[low - 1], c - low - 1 < 0 ? Number.MIN_VALUE : nums1[c - low - 1]);
    return (a + b) / 2;
};


var number1=[1,3,4,5,1],number2=[2];
console.log(findMedianSortedArrays(number1,number2));

