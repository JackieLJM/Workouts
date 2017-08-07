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

console.log(threeSum([-13,5,13,12,-2,-11,-1,12,-3,0,-3,-7,-7,-5,-3,-15,-2,14,14,13,6,-11,-11,5,-15,-14,5,-5,-2,0,3,-8,-10,-7,11,-5,-10,-5,-7,-6,2,5,3,2,7,7,3,-10,-2,2,-12,-11,-1,14,10,-9,-15,-8,-7,-9,7,3,-2,5,11,-13,-15,8,-3,-7,-12,7,5,-2,-6,-3,-10,4,2,-5,14,-3,-1,-10,-3,-14,-4,-3,-7,-4,3,8,14,9,-2,10,11,-10,-4,-15,-9,-1,-1,3,4,1,8,1]))