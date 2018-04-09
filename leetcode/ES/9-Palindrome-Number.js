// Determine whether an integer is a palindrome. Do this without extra space.
// Some hints:
// Could negative integers be palindromes? (ie, -1)
// If you are thinking of converting the integer to string, note the restriction of using extra space.
// You could also try reversing an integer. However, if you have solved the problem "Reverse Integer", you know that the reversed integer might overflow. How would you handle such case?
// There is a more generic way of solving this problem.
/**
 * @param {number} x
 * @return {boolean}
 */


// 20180409 update
// Your runtime beats 95.16 % of javascript submissions.
// 248ms
// ES5 20170801 60%Beated
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
        // console.log(xStr);
        // console.log(xStr.slice(1,xStr.length));
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


// 224ms
var isPalindrome = function(x) {
    var xS = x.toString();
    if(xS.length == 1) {
        return true;
    }
    var i = xS.length - 1;
    var k = 0;
    while(i > k) {
         if(xS[i] != xS[k]){
            return false
        }
        i--;
        k++;
    }
    
    return true;
};
console.log(isPalindrome(123211));