// Write a function to find the longest common prefix string amongst an array of strings.

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    let word='';
    if (strs.length<=0) {return word};
    for(let i=1; i<=strs.length; i++){
        let w = strs.substr(0, i);
        let match = true;
        for(let j=1; j<strs.length; j++){
            if (i>strs[j].length || w!=strs[j].substr(0, i) ) {
                match=false;
                break;
            }
        }
        if (!match) {
            return word;
        }
        word = w;
    }
    return word;
};

console.log(longestCommonPrefix('sadasdas'));