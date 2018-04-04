// 20180403
// Your runtime beats 94.88 % of javascript submissions.
/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function (n) {
    var s = "1";
    while (--n > 0) {
        s = getNext(s);
    }
    return s;
};

function notEqual(s, fromIndex) {
    var target = s.charAt(fromIndex);
    // console.log(1);
    var i = fromIndex;
    for (; i < s.length; ++i) {
        if (s.charAt(i) != target) { break };
    }
    return i;
}

function getNext(s) {
    var sb = '';
    // console.log(2);
    for (let i = 0; i < s.length;) {
        let j = notEqual(s, i);
        sb = sb.concat(j - i);
        sb = sb.concat(s.charAt(i));
        i = j;
    }

    return sb;
}


// console.log(countAndSay(10));
