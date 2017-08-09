// ES5 MemoryLimitExceeded
var threeSumClosest = function (nums, target) {
    var numsThree = [],
        diff = [];
    for (var i = 0; i < nums.length; i++) {
        for (var j = i + 1; j < nums.length; j++) {
            for (var k = j + 1; k < nums.length; k++) {
                numsThree.push([nums[i], nums[j], nums[k]]);
            }
        }
    }
    // console.log(numsThree);
    for (var l = 0; l < numsThree.length; l++) {
        diff[l] = Math.abs(numsThree[l][0] + numsThree[l][1] + numsThree[l][2] - target);
        if (diff[l] === 0) {
            return numsThree[l].join('+') + '=' + (numsThree[l][0] + numsThree[l][1] + numsThree[l][2]).toString();
        }
        // console.log(diff[l]);             
    }
    // console.log(Math.min.apply(null, diff));
    // var min=Math.min.apply(null, diff); 使用此方法会出现 RangeError: Maximum call stack size exceeded
    Array.prototype.min = function () {
        var min = this[0];
        this.forEach(function (ele, index, arr) {
            if (ele < min) {
                min = ele;
            }
        }) 
        return min;
    }
    var mini= diff.min();
    for (var m = 0; m < diff.length; m++) {
        if (diff[m] === mini) {
            return numsThree[m].join('+') + '=' + (numsThree[m][0] + numsThree[m][1] + numsThree[m][2]).toString();
        }
    }

    // return diff.forEach(function(element,index) {
    //  if( element===Math.min.apply(null, diff)){
    //     return numsThree[index].join('+')+'='+(numsThree[index][0]+numsThree[index][1]+numsThree[index][2]).toString();
    //  }   
    // });    
};

console.log(threeSumClosest([13, 2, 0, -14, -20, 19, 8, -5, -13, -3, 20, 15, 20, 5, 13, 14, -17, -7, 12, -6, 0, 20, -19, -1, -15, -2, 8, -2, -9, 13, 0, -3, -18, -9, -9, -19, 17, -14, -19, -4, -16, 2, 0, 9, 5, -7, -4, 20, 18, 9, 0, 12, -1, 10, -17, -11, 16, -13, -14, -3, 0, 2, -18, 2, 8, 20, -15, 3, -13, -12, -2, -19, 11, 11, -10, 1, 1, -10, -2, 12, 0, 17, -19, -7, 8, -19, -17, 5, -5, -10, 8, 0, -12, 4, 19, 2, 0, 12, 14, -9, 15, 7, 0, -16, -5, 16, -12, 0, 2, -16, 14, 18, 12, 13, 5, 0, 5, 6], -59))