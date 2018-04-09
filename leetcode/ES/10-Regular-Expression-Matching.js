// Implement regular expression matching with support for '.' and '*'.
// '.' Matches any single character.
// '*' Matches zero or more of the preceding element.
// The matching should cover the entire input string (not partial).
// The function prototype should be:
// bool isMatch(const char *s, const char *p)
// Some examples:
// isMatch("aa","a") → false
// isMatch("aa","aa") → true
// isMatch("aaa","aa") → false
// isMatch("aa", "a*") → true
// isMatch("aa", ".*") → true
// isMatch("ab", ".*") → true
// isMatch("aab", "c*a*b") → true
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */


// 20180409 update
// Your runtime beats 98.80 % of javascript submissions.
// 72ms
var isMatch = function(s, p) {
  var p = '^' + p + '$';
  var pattern = new RegExp(p, 'g');
  return pattern.test(s);
};


// 68ms
var isMatch = function(s, p) {
    var dp = Array.prototype.fill(false, 0, p.length);
    dp[0] = true;
    for (var i = 0; i < p.length; ++i) {
        dp[i+1] = i>0 && p.charAt(i) == '*' && dp[i-1]; 
    }
    
    for (var i = 0; i < s.length; ++i) {
        var last, cur;
        // dp[0] = s[0..i] matches ''
        // dp[j+1] = s[0..i] matches p[0..j]
        last = dp[0];
        dp[0] = false;
        for (var j = 0; j < p.length; ++j) {
            cur = dp[j+1];
            if (p.charAt(j) != '*') {
                dp[j+1] = last && (p.charAt(j) == '.' || s.charAt(i) == p.charAt(j)); 
            } else {
                dp[j+1] = dp[j-1] || dp[j+1] && (p.charAt(j-1) == '.' || s.charAt(i) == p.charAt(j-1))
            }
            last = cur;
        }
    }
    return dp[p.length];
};
// var isMatch = function (s, p) {
//     // var sRegExp = s.match(/.?/),
//     // pRegExp = p.match(/../),
//     var reg = new RegExp(s),
//         pattern = eval('/' + p + '/');
//         for(var i=1;i<p.length;i++){
//             p[i]===s[0];
//         }
//         console.log(pattern);
//         console.log(reg);
//         return pattern.test(s);
//     // console.log(sRegExp);    
// };
console.log(isMatch("adksagfakja", "a*sagfakja"));