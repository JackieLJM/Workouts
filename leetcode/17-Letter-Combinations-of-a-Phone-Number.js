/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    const phoneLetter=['','','abc','def','ghi','jkl','mno','pqrs','tuv','wxyz'];
    let num=[],digitsArr=[];
    for(let i=0;i<digits.length;i++){
        num[i]=Number(digits[i]);
        digitsArr[i]=phoneLetter[num[i]];
    }
    for(let j=0;j<digitsArr.length;j++){
        for(let k=0;k<digitsArr[j].length;k++){
            digitsArr[j][k];
        }        
    }

};