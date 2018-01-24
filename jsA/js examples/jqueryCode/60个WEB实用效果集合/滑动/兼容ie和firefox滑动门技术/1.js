//Download by http://www.codefans.net 
function g(o){return document.getElementById(o);}
function showdiv(i){
for(j=1;j<=3;j++){
g("div"+j).className="undise"//将三个都设为undise，以便将来可以设置显示的那个；
g("li"+j).className=""//消除原来所有li的属性
}
g("div"+i).className="dise"
g("li"+i).className="fff"
}
function showdiv1(i){
for(j=4;j<=6;j++){
g("div"+j).className="undise"//将三个都设为undise，以便将来可以设置显示的那个；
g("li"+j).className=""//消除原来所有li的属性
}
g("div"+i).className="dise"
g("li"+i).className="fff"
}
 
 
