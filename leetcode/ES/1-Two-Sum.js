// Given an array of integers, return indices of the two numbers such that they add up to a specific target.
// You may assume that each input would have exactly one solution, and you may not use the same element twice.
// Example:
// Given nums = [2, 7, 11, 15], target = 9,
// Because nums[0] + nums[1] = 2 + 7 = 9,
// return [0, 1].
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */


// 20180408 update
// Your runtime beats 68.21 % of javascript submissions.
// 96ms 双重循环
var twoSum1 = function(nums, target) {
    for(var indexX=0;indexX<nums.length;indexX++){
        // return function(indexX,nums,target){
                    for(var index=indexX+1;index<nums.length;index++){
                        if(nums[index]===(target-nums[indexX])){
                            return [indexX,index];

                        }
                    }
                // };

    }

};
// 该函数只返回第一次匹配成功结果，没有显示多种可能性
// var sums=[3,2,4],target=6;
// console.log(sums.length);
// console.log(twoSum(sums,target));

//48ms 单循环
var twoSum2 = function(nums, target) {
    // loop through values in array
    // at every value in the array, calcuclate the 'pair' im searching for- target-current value
    // check to see if the key(number) is in the object
    // if it is return the value(indexes)
    // else add it as a new key value pair
    let numsObj = {};
    for (let i = 0; i < nums.length; i++) {
        let current = nums[i];
        let match = target - current;
        if (match in numsObj) {
            return [i, numsObj[match]];
        } else {
            numsObj[current] = i;
        }
        
    }
};
