//ES5 20180124 260ms 65%Beated 
// var roman =["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];    
// var value = [1000,900,500,400,100,90,50,40,10,9,5,4,1]; 
// var result="";
//   for(var i=0; num!=0; i++){
//         while(num >= value[i]){
//             num -= value[i];
//             result+=roman[i];
//         }
//     }
//     return result;
// }

// ES5 20170803 15%Beated
var intToRoman = function (num) {
    if (num < 4000 && num > 0) {
        // if(num/1000!==0){
        //     num.toString()

        //     return
        //     if(num/100!==0){
        //         return
        //         if(num/10!==0){
        //             return
        //         }
        //     }
        // }
        var thou = Math.trunc(num / 1000);
        var hun = Math.trunc(num / 100) - Math.trunc(num / 1000) * 10;
        var ten = Math.trunc(num / 10) - Math.trunc(num / 100) * 10;
        var one = num % 10;

        function convert(a,b) {
            var roman = ["I", "V", "X", "L", "C", "D", "M"],
                strCur = '',
                str = '',
                i;
            if (b===1) {
                str = "I";
                i = 0;
            } else if (b===2) {
                str = "X";
                i = 2;
            } else if (b===3) {
                str = "C";
                i = 4;
            } else if (b===4) {
                str = "M";
                i = 6;
            }
            // console.log(str);
            // console.log(hun);
            switch (a) {
                case 1:
                    strCur = str;
                    break;
                case 2:
                    strCur = str + str;
                    break;
                case 3:
                    strCur = str + str + str;
                    break;
                case 4:
                    strCur = str + roman[i+1];
                    break;
                case 5:
                    strCur = roman[i+1];
                    break;
                case 6:
                    strCur = roman[i+1]+str;
                    break;
                case 7:
                    strCur = roman[i+1]+str+str;
                    break;
                case 8:
                    strCur = roman[i+1]+str+str+str;
                    break;
                case 9:
                    strCur = str+roman[i+2];
                    break;
            }
            console.log(strCur);
            return strCur;

        }
        // console.log(Math.trunc(num / 100) * 10);
        
        // console.log(convert(ten));
        return convert(thou,4)+convert(hun,3)+convert(ten,2)+convert(one,1);
    }


    //   I=1   
    //   V=5 
    //   X=1 0  
    //   L=5 0	
    //   C=1 00	
    //   D=5 00	
    //   M=1 000    
};
// console.log(Math.trunc(1232 / 100));
console.log(intToRoman(3999));