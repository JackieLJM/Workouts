// Implement atoi to convert a string to an integer.

// Hint: Carefully consider all possible input cases. If you want a challenge, please do not see below and ask yourself what are the possible input cases.

// Notes: It is intended for this problem to be specified vaguely (ie, no given input specs). You are responsible to gather all the input requirements up front.

// Requirements for atoi:

// The function first discards as many whitespace characters as necessary until the first non-whitespace character is found. Then, starting from this character, takes an optional initial plus or minus sign followed by as many numerical digits as possible, and interprets them as a numerical value.

// The string can contain additional characters after those that form the integral number, which are ignored and have no effect on the behavior of this function.

// If the first sequence of non-whitespace characters in str is not a valid integral number, or if no such sequence exists because either str is empty or it contains only whitespace characters, no conversion is performed.

// If no valid conversion could be performed, a zero value is returned. If the correct value is out of the range of representable values, INT_MAX (2147483647) or INT_MIN (-2147483648) is returned.
/**
 * @param {string} str
 * @return {number}
 */


// 20180409 update
// Your runtime beats 86.86 % of javascript submissions.
// 80ms
// var str = "  - 321";
var myAtoi = function (str) {
    var strNoSpace = str.trim();
    // console.log(strNoSpace);
    // console.log(Number(strNoSpace[0])===NaN);
    // console.log((strNoSpace.length === 1 && isNaN(Number(strNoSpace[0]))));
    if ((strNoSpace.length === 0) ||(isNaN(Number(strNoSpace[0])) && isNaN(Number(strNoSpace[1]))) || (isNaN(Number(strNoSpace[0]))&&strNoSpace[0]!=="+"&&strNoSpace[0]!=="-")) {
        return 0;
    } else {
        var strNum,strCopy="",i=1;
        strNoSpace[0]==="+"?strCopy='+':(strNoSpace[0]==="-"?strCopy="-":i=0);  
        // console.log(i);
        for (i; i < strNoSpace.length; i++) {
            if (isNaN(Number(strNoSpace[i])) === false&&strNoSpace[i]!==" ") {
                strCopy = strCopy + strNoSpace[i];
            } else if (isNaN(Number(strNoSpace[i]))||strNoSpace[i]===" ") {
                break;
            }
        }
        if(strCopy.length===1&&(strCopy[0]==="+"||strCopy[0]==="-")){
            strCopy="";
        }
        strNum = Number(strCopy);
        // console.log(strNum);
        return strNum > 2147483647 ? 2147483647 : (strNum > -2147483648 ? strNum :-2147483648 );

    }
};


// 72ms
var myAtoi2 = function(str) {
    return Math.max(Math.min(parseInt(str) || 0, 2147483647), -2147483648)
};
// console.log(Number(""));
// console.log(myAtoi(str));
// if ("87" != 87) {
//     console.log("The string 87 is NOT equal to the number 87");
// } else {
//     console.log("The string 87 is EQUAL to the number 87");
// }