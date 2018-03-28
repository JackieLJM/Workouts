// ES5 20170804 20%Beated
var romanToInt = function (s) {
    var sum = 0;
    // console.log(s.length);
    for (var i = s.length - 1; i >= 0; i--) {
        // console.log(i);
        if (s[i] === 'I') {
            sum = sum + 1;
        } else if (s[i] === "V") {
            sum = sum + 5;
            if (s[i - 1] === "I") {
                sum = sum - 2;
            }
        } else if (s[i] === "X") {
            sum = sum + 10;
            if (s[i - 1] === "I") {
                sum = sum - 2;
            }
        } else if (s[i] === "L") {
            sum = sum + 50;
            if (s[i - 1] === "X") {
                sum = sum - 20;
            }
        } else if (s[i] === "C") {
            sum = sum + 100;
            if (s[i - 1] === "X") {
                sum = sum - 20;
            }
        } else if (s[i] === "D") {
            sum = sum + 500;
            if (s[i - 1] === "C") {
                sum = sum - 200;
            }
        } else if (s[i] === "M") {
            sum = sum + 1000;
            if (s[i - 1] === "C") {
                sum = sum - 200;
            }
        }
    }
    return sum;

    //   I=1   
    //   V=5 
    //   X=1 0  
    //   L=5 0	
    //   C=1 00	
    //   D=5 00	
    //   M=1 000
};
console.log(romanToInt("IX"));