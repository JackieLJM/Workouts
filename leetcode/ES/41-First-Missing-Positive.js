/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
    var sort=Array.from(nums);
    nums.sort();
    for(var i=0;i<sort.length;i++){
        if(nums[0]===sort[i]){
            return i;
        }
    }
};
