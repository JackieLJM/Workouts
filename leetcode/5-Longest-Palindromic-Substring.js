// ES5
var longestPalindrome = function(s) {
    if(s.length<=1000){
        var palindromeArr=[],max='';
        var palindrome = function(str){
            var strLast= str.length-1;
            if(str.length%2===0){
                for(var i=0;i<str.length/2;i++,strLast--){
                    if(str[i]!==str[strLast]){
                        break;
                    }
                }
                return str;
            }
            else if(str.length%2===1){
                for(var i=0;i<(str.length-1)/2;i++,strLast--){
                    if(str[i]!==str[strLast]){
                        break;
                    }
                }
                return str;
            }
        };
        for(var i=0;i<s.length;i++){
            for(var j=i+1;j<s.length;j++){         
                palindromeArr.push(palindrome(s.slice(i+1,j+1)));
                console.log(palindromeArr);
            }
        }
        max=palindrome[0];
        for(var k=1;k<palindromeArr.length;k++){         
            if(max>palindromeArr[k]){
                max=max;
            }
            else if(max<=palindromeArr[k]){
                max=palindromeArr[k];
            }
        }
        return max;
    }
};

console.log(longestPalindrome("agsfgaksfjgskdfgskdfgj"));