// ES5
// var longestPalindrome = function(s) {
// if(s.length<=1000){
//     var palindromeArr=[],max='';
//     var palindrome = function(str){
//         var strLast= str.length-1;
//         if(str.length%2===0){
//             for(var i=0;i<str.length/2;i++,strLast--){
//                 if(str[i]!==str[strLast]){
//                     break;
//                 }
//             }
//             return str;
//         }
//         else if(str.length%2===1){
//             for(var i=0;i<(str.length-1)/2;i++,strLast--){
//                 if(str[i]!==str[strLast]){
//                     break;
//                 }
//             }
//             return str;
//         }
//     };
//     for(var i=0;i<s.length;i++){
//         for(var j=i+1;j<s.length;j++){         
//             palindromeArr.push(palindrome(s.slice(i+1,j+1)));
//             console.log(palindromeArr);
//         }
//     }
//     max=palindrome[0];
//     for(var k=1;k<palindromeArr.length;k++){         
//         if(max>palindromeArr[k]){
//             max=max;
//         }
//         else if(max<=palindromeArr[k]){
//             max=palindromeArr[k];
//         }
//     }
//     return max;
// }
// };


// 20180408 update
// Your runtime beats 74.75 % of javascript submissions.
// 120ms
function Manacher(s) {
    var str = '*#',
        dp = [],
        maxn = 0,
        idx = 0;

    for (var i = 0, len = s.length; i < len; i++)
        str += s[i] + '#';

    for (var i = 1, len = str.length; i < len; i++) {
        if (maxn > i) dp[i] = Math.min(dp[2 * idx - i], maxn - i);
        else dp[i] = 1;

        while (str[i - dp[i]] === str[i + dp[i]]) dp[i]++;

        if (dp[i] + i > maxn)
            maxn = dp[i] + i, idx = i;
    }

    var ans = 0,
        pos;

    for (var i = 1; i < len; i++) {
        if (dp[i] > ans)
            ans = dp[i], pos = i;
    }

    var f = str[pos] === '#',
        tmp = f ? '' : str[pos],
        startPos = f ? pos + 1 : pos + 2,
        endPos = f ? dp[pos] - 3 + startPos : dp[pos] - 4 + startPos;

    for (var i = startPos; i <= endPos; i += 2)
        tmp = str[i] + tmp + str[i];

    return tmp;
}
var longestPalindrome1 = function(s) {
    var str = Manacher(s);
    return str;
};


// 76ms
var longestPalindrome2 = function(s) {
  var a = s.split(''),left, right,
        size = a.length,
        max = Number.MIN_VALUE,
        start = 0;

    for(var i = 0; i < size; i = i + 0.5){
        left = Math.ceil(i - 1);
        right = Math.floor(i + 1);
        while(left >=0 && right < size) {
            if (a[left] === a[right]){
                left--;
                right++;
            } else { break;}
        }
        if (right - left - 1 > max){
            max = right - left - 1;
            start = left + 1;
        }
    }

    return s.slice(start, start + max);
};

console.log(longestPalindrome("agsfgaksfjgskdfgskdfgj"));