if(navigator.userAgent.toLowerCase().indexOf('msie')>0 && !HasAssist() && !check_zspopupmsgclosed() ){
var css = document.createElement("link");
css.href = "fpmsg.css";
css.rel = "stylesheet";
css.type = "text/css";
var msg = document.createElement("div");
msg.id = "popupmsg";
msg.innerHTML = '<div class=\"popuptxt\" style="top:10px"><a href=\"http://wyk.net.ru" style=\"background:url();width:464;height:20px;margin-left:0em;margin-top:0em\" title=\"点击此处 了解更多\" target=\"_blank\"><img src=\"url/pp-zstxt.gif\" bordor=\"0\"></a><a href=\"http://blog.wyk.net.ru" target=\"_blank\">立即下载</a></div>'+
'<a href=\"\" onclick="return close_popupmsg();" class=\"popupmsgcl\" style="margin-top:12px">关闭</a>';
msg.style.display = "none";
document.body.insertBefore(css,document.getElementsByTagName('div')[0]);
var divlist = document.getElementsByTagName('div')
for(var i=0;i<divlist.length;i++){
	if(divlist[i].className == "yhd"){
		divlist[i].insertBefore(msg,ytop);
		break;
	}
}
msg.style.marginTop = "-66px";
msg.style.display = "block";
msg.style.height = "44px";

ycn.Event.addEvent(window,'load',function(){
var anim = function(){
n += 5;
if(n >= 66){
msg.style.marginTop = "0";
window.clearInterval(tt);
}else{
msg.style.marginTop = "-"+(66 - n)+"px";
}
},n=0;
var tt = window.setInterval(anim,1);
})
}
function close_popupmsg(){
var m = document.getElementById(popupmsg);
var d = new Date()
set_cookie("zs_popupmsg",getnow(),new Date(d.getYear(),d.getMonth(),d.getDate()+1));
var anim = function(){
n += 10;
if(n >= 66){
msg.style.marginTop = "-66px";
msg.style.display = "none";
window.clearInterval(tt);
}else{
msg.style.marginTop = "-"+ n +"px";
}
},n=0;
var tt = window.setInterval(anim,1);
return false;
};
function check_zspopupmsgclosed(){
	var c = GetCookie("zs_popupmsg");
	if(c == null) return false;
	if(c < getnow()) return false;
	return true;
}
function set_cookie( name, value )
{
	var argv = set_cookie.arguments;
	var argc = set_cookie.arguments.length;
	var expires = (2<argc) ? argv[2] : null;
	var path = (3<argc) ? argv[3] : null;
	var domain = (4<argc) ? argv[4] : null;
	var secure = (5<argc) ? argv[5] : false;

	var CookStr = name + "=" + escape(value);
	CookStr += ((expires==null)?"":("; expires="+expires.toGMTString()));
	CookStr += ((path==null)?"":("; path="+path));
	CookStr += ((domain==null)?"":("; domain="+domain));
	CookStr += ((secure==true)?"; secure":"");
	document.cookie = CookStr;
}
function getnow(){
	d = new Date();
	return ""+d.getYear()+d.getMonth()+d.getDate();
}
function GetCookie( name )
{
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	var j;
	while( i < clen ) {
		j = i + alen;
		if( document.cookie.substring(i,j)==arg )
			return getCookieVal(j);
		i = document.cookie.indexOf(" ",i)+1;
		if(i==0)
			break;
	}
	return null;
}
function getCookieVal(offset)
{
	var endstr=document.cookie.indexOf(";",offset);
	if( endstr==-1 )
		endstr=document.cookie.length;
	return document.cookie.substring(offset,endstr);
}