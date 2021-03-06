// ES5 TimeLimitExceeded TwoWays
// var maxArea = function (height) {
//     if (height.length > 1) {
//         var area = [];
//         var maxarea=0;
//         for (var i = 0; i < height.length; i++) {
//             for (var j = i + 1; j < height.length; j++) {
//                 // var y = (height[i] <= height[j] ? height[i] : height[j]),
//                 //     x = j - i;
//                 // area.push(x * y);
//                 maxarea = Math.max(maxarea, Math.min(height[i], height[j]) * (j - i));
//             }
//         }
//         return maxarea;
//         // return area;
//         // return area.sort(function(a,b){return a-b}).pop();
//     }
// };

// ES5 20170802 80%Beated
// 20180409
// Your runtime beats 97.86 % of javascript submissions..
// 60ms
var maxArea = function (height) {
    var maxarea = 0, l = 0, r = height.length - 1;
        while (l < r) {
            maxarea = Math.max(maxarea, Math.min(height[l], height[r]) * (r - l));
            if (height[l] < height[r]){
                l++;
            }
            else{
                r--;
            }
        }
        return maxarea;
};


// 56ms
var maxArea = function(height) {
  let l = 0;
  let r = height.length-1;
  let max = 0;
  
  while (l < r) {
    max = Math.max(max, (r - l) * Math.min(height[l], height[r]));
    if (height[l] < height[r]) {
      l++;
    } else {
      r--;
    }
  }
  return max;
};
console.log(maxArea([1,2,3,4]));