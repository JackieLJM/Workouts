// ES5
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

var number1=[1,3,4,5,1],number2=[2];
console.log(findMedianSortedArrays(number1,number2));

