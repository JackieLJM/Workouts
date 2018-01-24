//===================================
//数据库操作，以及常用操作函数
//===================================
//===================================
//连接到本地数据库
//参数
//file-当前网页文件
//data-数据库文件，以及相对路径，如data/home.mdb
function connection(file, data){
	var filePath = location.href.substring(0, location.href.indexOf(file));
	var path = filePath + data;
	path = path.substring(8);
	var conn = new ActiveXObject("ADODB.Connection");
	conn.Provider = "Microsoft.Jet.OLEDB.4.0";
	conn.ConnectionString = "Data Source=" + path + ";User ID=admin;Password=;Jet OLEDB:Database Password="+uncompile(code);
	conn.open;
	return conn;
}
var conn = connection("家庭日志.html", "data/home.asp");

//===================================
//执行数据库操作，如修改、删除和更新等
//参数
//sql-数据库操作SQL字符串，字符串
function execute(sql){
	conn.execute(sql);
}

//===================================
//查询记录集
//参数
//sql-数据库查询字符串，字符串
function requeryrs(sql){
	var rs = new ActiveXObject("ADODB.Recordset"); 
	//alert(sql);
	rs.open(sql, conn);
	return rs;
}

//===================================
//关闭记录集对象
//参数
//rs-记录集，数据集合
function closers(rs){
	rs.close();
	rs = null;	
}

//===================================
//扩展Document对象的getElementsByClassName方法
//获取文档或指定对象内特定类型的对象
//参数
//className-类名，字符串
//dom-文档或文档内任何对象，DOM对象
//返回值
//返回匹配类名的DOM对象的数据集合
document.getElementsByClassName = function(className,dom) { 
	var dom  = dom || document;
    var el = [],
        _el = dom.getElementsByTagName('*');
    for (var i=0; i<_el.length; i++ ) {
       if (_el[i].className == className ) {
           el[el.length] = _el[i];
        }
   }
   return el;
}
//扩展文档元素的getElementsByClassName方法，失败...
var getElementsByClassName = function(className) { 
    var el = [],
        _el = document.getElementsByTagName('*');
    for (var i=0; i<_el.length; i++ ) {
       if (_el[i].className == className ) {
           el[el.length] = _el[i];
        }
   }
   return el;
}

//===================================
//HTML元素的方法扩展函数
//原型方法，可以把指定函数绑定到文档内所有元素身上，方便元素直接调用
//参数
//namee-名称，字符串
//fn-函数体，函数
//返回值
//返回元素自己
var DOMextend = function(name, fn){
	if( ! document.all)
		eval("HTMLElement.prototype." + name + " = fn");
	else{
		var _createElement = document.createElement;
		document.createElement = function(tag){
			var _elem = _createElement(tag);
			eval("_elem." + name + " = fn");
			return _elem;
		}
		var _getElementById = document.getElementById;
		document.getElementById = function(id){
			var _elem = _getElementById(id);
			eval("_elem." + name + " = fn");
			return _elem;
		}
		var _getElementsByTagName = document.getElementsByTagName;
		document.getElementsByTagName = function(tag){
			var _arr = _getElementsByTagName(tag);
			for(var _elem = 0; _elem < _arr.length; _elem ++ )
				eval("_arr[_elem]." + name + " = fn");
			return _arr;
		}
	}
};

//===================================
//获取元素的样式值
//参数
//e-元素对象，DOM对象
//n-样式名称，字符串
//返回值
//返回该样式的值
var getStyle  = function(e,n){
	var _this = e
	if(_this.style[n]){ 
		return _this.style[n];
	}
	else if(_this.currentStyle){ 
		return _this.currentStyle[n];
	}
	else if(document.defaultView && document.defaultView.
getComputedStyle){
		n = n.replace(/([A-Z])/g,"-$1");
		n = n.toLowerCase();
		var s = document.defaultView.getComputedStyle(_this,null); 
		if(s)
			return s.getPropertyValue(n);
	}
	else
		return null;
}
//===================================
//转换元素的样式值为数值
//参数
//e-元素对象，DOM对象
//w-获取的样式值，字符串或数字
//返回值
//返回可计算的数值
var fromStyle = function(e,w){
	var _this = e
    var p = 1;
    if(/px/.test(w) && parseInt(w) ) return parseInt(parseInt(w) * p); 
    else if(/\%/.test(w) && parseInt(w)){ 
        var b = parseInt(w) / 100;
        if((p != 1) && p) b *= p; 
        _this = _this.parentNode;
        //if(_this.tagName == "BODY") throw new Error("文档结构无尺寸，请使用其他方法获取尺寸."); 
        w = getStyle(_this,"width"); 
        return arguments.callee(_this, w, b); 
    }
    else if(/auto/.test(w)){
        var b = 1; 
        if((p != 1) && p) b *= p; 
        _this = _this.parentNode;
        //if(_this.tagName == "BODY") throw new Error("文档结构无尺寸，请使用其他方法获取尺寸.");
        w = getStyle(_this,"width");
        return arguments.callee(_this, w , b); 
    }
    else
        throw new Error("元素或其父元素的尺寸定义了特殊的单位.");
}
//===================================
//获取元素距离窗口左侧的偏移位置
//参数
//element-元素对象，DOM对象
//返回值
//返回距离的数值
function getElementLeft(element){
	var actualLeft = element.offsetLeft;
	var current = element.offsetParent;
	while (current !== null){
		actualLeft += current.offsetLeft;
		current = current.offsetParent;
	}
	return actualLeft;
}
//获取元素距离窗口顶部的偏移位置
//参数
//element-元素对象，DOM对象
//返回值
//返回距离的数值
function getElementTop(element){
	var actualTop = element.offsetTop;
	var current = element.offsetParent;
	while (current !== null){
		actualTop += current.offsetTop;
		current = current.offsetParent;
	}
	return actualTop;
}

//===================================
//使用标准方法绑定事件
//参数
//e-元素对象
//event-事件类型，不要添加'on'前缀
//fn-绑定的事件函数
var addEvent=function(e,event, fn) {
	if(document.addEventListener){
		return e.addEventListener(event, fn, false);
	}
	else if(document.attachEvent){
		return e.attachEvent("on"+event, fn);
	}
};
//访问权限限制
//参数
//sql-查询字符串，字符串
//tablearr-要限制的数据表，数组
//返回值
//返回true，表示通过，否则返回false表示没有通过
function key(sql,tablearr){
	//清除两侧空格
	var sql = sql.replace(/^(\s|　)+/g,"").replace(/(\s|　)+$/g,"");
	sql = sql.replace(/(\s|　)+/g," ");			
	sql = sql.toLowerCase();	
	if(!(typeof tablearr == "object") && !(tablearr.constructor == Array)){
		alert("数据表列表不是数组！");
		return false;
	}
	for(var i=0;i<tablearr.length; i++){
		var tempstr = "from " + tablearr[i];
		var tempstr1 = "from [" + tablearr[i] + "]";		
		if(sql.indexOf(tempstr)>-1 || sql.indexOf(tempstr1)>-1  ){
			 var pass=prompt("请输入访问密码："); 
			 if(pass != uncompile(code)){
				 pass=prompt("输入不正确，请重新输入访问密码："); 
				 if(pass != uncompile(code))
				  	return false;
			 }
		}
	}
	return true;
}

//加密函数
function compile(code){ 
	var c=String.fromCharCode(code.charCodeAt(0)+code.length);
	for(var i=1;i<code.length;i++){
		c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));
	}
	return (escape(c));
}

//解密函数
function uncompile(code){
	code=unescape(code);
	var c=String.fromCharCode(code.charCodeAt(0)-code.length);
	for(var i=1;i<code.length;i++){
		c+=String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));
	}
	return c;
}