/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    // function valid (str){
    //     for(var i=0;i<s.length;i++){
    //         if(s[i]===str[0]){
    //             break;
    //         }                
    //     }
    //     var point1=i;
    //     for(i;i<s.length;i++){
    //         if(s[i]===str[1]){
    //             break;
    //         }
    //     }
    //     var point2=i;
    //     s =s.slice(point1,point2);
    //     return valid()
    //     return false;
    // }
    // if(valid("()")===true){
    //     return true;
    // }
    // else if(valid("[]")===true){
    //     return true;
    // }
    // else if(valid("{}")===true){
    //     return true;
    // }
    // return false;    
    // if(s.startsWith("(")||s.endsWith(")")){
    //     return true;
    // }
    // else if(s.startsWith("[")||s.endsWith("]")){
    //     return true;
    // }
    // else if(s.startsWith("{")||s.endsWith("}")){
    //     return true;
    // }
    // return false;
};
console.log(isValid("dgfef(sda)"));