// ES5
var str = "  - 321";
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
// console.log(Number(""));
// console.log(myAtoi(str));
// if ("87" != 87) {
//     console.log("The string 87 is NOT equal to the number 87");
// } else {
//     console.log("The string 87 is EQUAL to the number 87");
// }