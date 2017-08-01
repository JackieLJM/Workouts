// ES5
var twoSum = function(nums, target) {
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
var sums=[3,2,4],target=6;
console.log(sums.length);
console.log(twoSum(sums,target));
