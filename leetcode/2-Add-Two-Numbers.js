// ES5
var addTwoNumbers = function(l1, l2) {
    var ls=[0];
    for(var index=0;index<l1.lenght;index++){
        ls[index]=ls[index]+((l1[index]+l2[index])%10);
        if((l1[index]+l2[index])>10){
            ls[index+1]=1;
        }else{
            ls[index+1]=0;
        }
    }
    var lsNode=ls.slice(0,ls.length);
    return ls;
};

var list1=[2,4,3],list2=[5,6,4];
console.log(addTwoNumbers(list1,list2));