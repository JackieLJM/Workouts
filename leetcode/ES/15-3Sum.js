// Given an array S of n integers, are there elements a, b, c in S such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.
// Note: The solution set must not contain duplicate triplets.
// For example, given array S = [-1, 0, 1, 2, -1, -4],
// A solution set is:
// [
//   [-1, 0, 1],
//   [-1, -1, 2]
// ]

/**
 * @param {number[]} nums
 * @return {number[][]}
 */

// ES5 TimeLimitExceeded
var threeSum = function(nums) {
    if(nums.length>=3){
        var zeroArr=[];
        for(var i=0;i<nums.length;i++){
            for(var j=i+1;j<nums.length;j++){
                for(var k=j+1;k<nums.length;k++){
                    if(nums[i]+nums[j]+nums[k]===0){
                        zeroArr.push([nums[i],nums[j],nums[k]].sort(function(a,b){return a-b;}));
                    }
                }
            }
        }
        for(var l=0;l<zeroArr.length;l++){
            for(var m=l+1;m<zeroArr.length;m++){
                if(zeroArr[l].toString()===zeroArr[m].toString()){
                    zeroArr.splice(l,1);
                    zeroArr.splice(l,0,0);
                    // console.log(zeroArr.length);
                }
            }
        }
        
        // console.log(zeroArr[3]!==0);
        // for(var n=0;n<zeroArr.length;n++){

        // }
        // console.log(zeroArr[0].toString());
        return zeroArr.filter(function(a){return a!==0});
        
    }
    else{
        return [];
    }
};

// 20180410
// Your runtime beats 25.38 % of javascript submissions.
// 300ms
var threeSum = function(nums) {
  nums.sort((a, b) => a - b)

  let ans = []
  let len = nums.length

  // enumerate the array, and assume the item to be the smallest one
  for (let i = 0; i < len; i++ ) { 

    // have already enumerate the item as the smallest one among the three
    // then continue
    if (i && nums[i] === nums[i - 1]) continue 

    // the sum of another two should be
    let target = -nums[i]

    // the indexes of another two 
    let [start, end] = [i + 1, len - 1]

    while (start < end) {
      let sum = nums[start] + nums[end]

      if (sum > target) {
        end--
      } else if (sum < target) {
        start++
      } else {
        ans.push([nums[i], nums[start], nums[end]])
        
        // remove the duplication
        while (nums[start] === nums[start + 1]) 
          start++
        start++

        // remove the duplication
        while (nums[end] === nums[end - 1])
          end--
        end--
      }
    }
  }
  return ans
}

// 160ms
// var debug = false;
var threeSum = function(nums) {
    if (nums.count < 3) {
        return [];
    }

    nums.sort(sortNumbers);
    // if (debug) console.log('======================', nums);

    var i, j, k;
    var num1, num2, num3;
    var sum;

    var results = [];
    for (i = 0; i < nums.length; i++) {
        num1 = nums[i];
        if (num1 > 0) {
            break;
        }
        if (i > 0 && nums[i - 1] === num1) {
            continue;
        }
        j = i + 1;
        k = nums.length - 1;
        while (j < k) {
            num2 = nums[j];
            if (j > i + 1 && nums[j - 1] === num2) {
                j++;
                continue;
            }

            num3 = nums[k];

            sum = num1 + num2 + num3;
            if (sum === 0) {
                results.push([num1, num2, num3]);
                j++;
                k--;
            } else if (sum > 0) {
                k--;
            } else {
                j++;
            }
        }
    }
    return results;
};

var sortNumbers = function (a, b) {
    return a - b;
};

// var searchArrayInRange = function (array, target, start, end) {
//     start = Math.max(0, start);
//     end = Math.min(array.length - 1, end);
//     // console.log('==========', start, end);
//     if (start > end) {
//         return -1;
//     }
//     var index = start + end;
//     if (index % 2 === 0) {
//         index /= 2;
//     } else {
//         index = (index + 1) / 2;
//     }
//     var num = array[index];
//     // console.log('=======', start, end, index, num);
//     if (target === num) {
//         if (index === array.length - 1) {
//             return index;
//         }
//         for (i = index + 1; i < array.length; i++) {
//             // console.log('====', i, array[i]);
//             if (array[i] === num) {
//                 index = i;
//             }
//         }
//         return index;
//     }
//     if (target > num) {
//         return searchArrayInRange(array, target, index + 1, end);
//     }
//     return searchArrayInRange(array, target, start, index - 1);
// };

// var test = function (nums, ans) {
//     var r = threeSum(nums);
//     if (compareArrays(ans, r)) {
//         console.log('=============passed', nums, ans);
//     } else {
//         console.log('==========wrong ans', nums, ans, r);
//     }

// };

// var compareArrays = function (a1, a2) {
//     return a1.length==a2.length && a1.every(function(v,i) { return v === a2[i]})
// };

// var runTest = function () {
//     test([-1, 0, 1, 2, -1, -4], [[-1, 0, 1],[-1, -1, 2]]);
//     test([3,4,-2,-5,1,2,8,-3], [[-5,-3,8],[-5,1,4],[-5,2,3],[-3,1,2]]);
//     test([-2,-2,5], []);
//     test([0,0,0], [[0,0,0]]);
//     test([0,0,0,0], [[0,0,0]]);
//     test([0,0,0,0,0], [[0,0,0]]);
//     test([-1,-1,0,0,1,1], [[-1,0,1]]);
// };
console.log(threeSum([-13,5,13,12,-2,-11,-1,12,-3,0,-3,-7,-7,-5,-3,-15,-2,14,14,13,6,-11,-11,5,-15,-14,5,-5,-2,0,3,-8,-10,-7,11,-5,-10,-5,-7,-6,2,5,3,2,7,7,3,-10,-2,2,-12,-11,-1,14,10,-9,-15,-8,-7,-9,7,3,-2,5,11,-13,-15,8,-3,-7,-12,7,5,-2,-6,-3,-10,4,2,-5,14,-3,-1,-10,-3,-14,-4,-3,-7,-4,3,8,14,9,-2,10,11,-10,-4,-15,-9,-1,-1,3,4,1,8,1]))