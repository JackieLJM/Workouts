// ES5 20170801 10%Beated
var isPalindrome = function (x) {
    // var xLength=x.toString().length;
    // console.log(xLength);
    // for(var i=0;i<xLength;i++){
    //     var xArr=[];
    //     for(var j=0;j<i+1;j++){
    //         var num=1;
    //         num=num*10;
    //     }
    //     xArr[]=x%num-xArr[];
    // }
    // console.log(xArr);
    if (x < 2147483647 && x > -2147483648) {
        var xStr = x.toString();
        if (xStr[0] === "-") {
            return false;
        }
        console.log(xStr);
        for (var j = 0; j < (xStr.length % 2 === 0 ? xStr.length / 2 : (xStr.length - 1) / 2); j++) {
            if (xStr[j] !== xStr[xStr.length - 1 - j]) {
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
};
console.log(isPalindrome(-123211));