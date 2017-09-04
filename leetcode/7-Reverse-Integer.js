// Reverse digits of an integer.
// Example1: x = 123, return 321
// Example2: x = -123, return -321
// Here are some good questions to ask before coding. Bonus points for you if you have already thought through this!
// >>>>If the integer's last digit is 0, what should the output be? ie, cases such as 10, 100.
// >>>>Did you notice that the reversed integer might overflow? Assume the input is a 32-bit integer, then the reverse of 1000000003 overflows. How should you handle such cases?
// >>>>For the purpose of this problem, assume that your function returns 0 when the reversed integer overflows.
// Note:
// The input is assumed to be a 32-bit signed integer. Your function should return 0 when the reversed integer overflows.

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
    let max = 2147483647,
        min = -max - 1,sum = 0,n;
    // console.log(max, min);

    while (x !== 0) {
        if (sum > max / 10 || sum < min / 10) {
            return 0;
        }
        n = x % 10;
        sum = sum * 10 + n;
        if (x >= 0) {
            x = Math.floor(x / 10);
        } else if (x < 0) {
            x = Math.ceil(x / 10);
        }
        // console.log(-123 / 10);
    }
    return sum;
};

console.log(reverse(-123));
// Your runtime beats 23.92 % of javascript submissions at 2017/9/1.