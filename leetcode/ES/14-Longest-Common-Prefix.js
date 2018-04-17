// Write a function to find the longest common prefix string amongst an array of strings.

/**
 * @param {string[]} strs
 * @return {string}
 */
// 以下算法理解错误，strs应该是字符串数组
// var longestCommonPrefix = function(strs) {
//     let word='';
//     if (strs.length<=0) {return word};
//     for(let i=1; i<=strs.length; i++){
//         let w = strs.substr(0, i);
//         let match = true;
//         for(let j=1; j<strs.length; j++){
//             if (i>strs[j].length || w!=strs[j].substr(0, i) ) {
//                 match=false;
//                 break;
//             }
//         }
//         if (!match) {
//             return word;
//         }
//         word = w;
//     }
//     return word;
// };

// 20180410
// Your runtime beats 99.32 % of javascript submissions.
// 56ms
var longestCommonPrefix = function(strs) {
  if (!strs.length) return '';

  var len = strs.reduce((pre, item) =>{
    return Math.min(pre, item.length)
  }, Number.MAX_VALUE);
  // 等于Math.min()这个数组所有元素，不同之处在于？
  var ans = '';
  for (var i = 0; i < len; i++) {
    var a = strs[0][i];
    var f = strs.every(function(item) {
      return item[i] === a;
    });

    if (!f) break;
    ans += a;
  }

  return ans;
};

// 52ms
var longestCommonPrefix1 = function(strs) {
  
  if(!strs.length) return '';
  if(strs.length === 1) return strs[0];
  
  let prefix = strs[0];
  
  for(let i in strs) {
    while(strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if(!prefix.length) return '';
    }
  }
   return prefix; 
};
// console.log(longestCommonPrefix('sadasdas'));