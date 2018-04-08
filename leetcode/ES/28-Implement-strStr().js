// 20180408
// Your runtime beats 52.35 % of javascript submissions. 
// 64ms KMP算法

var strStr1 = function(haystack, needle) {
    return kmp(haystack, needle);
}

function compute_prefix(pattern, next) {
    var i;
    var j = -1;

    next[0] = j;
    for (i = 1; i < pattern.length; i++) {
        while (j > -1 && pattern.charAt(j + 1) != pattern.charAt(i)) j = next[j];

        if (pattern.charAt(i) == pattern.charAt(j + 1)) j++;
        next[i] = j;
    }
}

function kmp(text, pattern) {
    var i;
    var j = -1;
    const n = text.length;
    const m = pattern.length;
    if (n == 0 && m == 0) return 0; /* "","" */
    if (m == 0) return 0; /* "a","" */
    var next = [];

    compute_prefix(pattern, next);

    for (i = 0; i < n; i++) {
        while (j > -1 && pattern.charAt(j + 1) != text.charAt(i)) j = next[j];

        if (text.charAt(i) == pattern.charAt(j + 1)) j++;
        if (j == m - 1) {
            return i - j;
        }
    }

    return -1;
}




// 104ms
// 用字符串原生方法
var strStr2 = function(haystack, needle) {
   return haystack.indexOf(needle); 
};


// 暴力算法
var strStr=function(haystack, needle) {
        if (needle.length==0) return 0;

        var N = haystack.length - needle.length + 1;
        for (var i = 0; i < N; i++) {
            var j = i;
            var k = 0;
            while (j < haystack.length && k < needle.length && 
                    haystack.charAt(j) == needle.charAt(k)) {
                j++;
                k++;
            }
            if (k == needle.length) return i;
        }
        return -1;
    }


console.log(strStr('hello','ll'));