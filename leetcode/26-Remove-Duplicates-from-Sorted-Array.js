//2018-03-26 Your runtime beats 98.80 % of javascript submissions.
// in-place algorithm 就是代码不要占用额外内存，比如多新建一个对象，数组
/**
 * @param {number[]} nums
 * @return {number}
 */
// 使用Set是not-in-place算法,使用会创建一个新数组的数组方法也不行
// var removeDuplicates = function(nums) {
//     let newNums = new Set(nums);
//     return Array.from(newNums).length;
// };
var removeDuplicates = function(nums) {
    if(nums.length==0)return 0;
    var i=0;
    for(var j=1;j<nums.length;j++){
    	if(nums[j]!==nums[i]){
    		i++;
    		nums[i]=nums[j];
    	}
    }
    // return i+1;
    return nums;
};
console.log(removeDuplicates([1,2,1,2,3]));