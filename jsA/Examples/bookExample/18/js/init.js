//===================================
//页面表单初始化函数
//===================================
//===================================
//在指定的下拉列表框中显示数据表的分类
//支持收入表、支出表、日志表
//参数
//_class-下拉列表框对象
//table-查询的数据表
//upperid-指定表中upperid对应上级分类表中的id值，可以是一个数组，包含一组upperid值
function showclass(_class, table, upperid){
	//初始化参数值
	if(!table){
		alert("没有指定要显示的数据表名称！");
		return false;
	}
	//获取分类下拉列表框
	if(!_class){
		alert("没有指定列表框对象！");
		return false;
	}
	//设查询字符串
	if(tableobj[table][2] != "no"){
		//如果是主数据表
		if(tableobj[table][5] == "data")
			var sql = "select * from "+ tableobj[table][2] + " where upperid = "+ tableobj[table][0];
		//如果是分类表或者明细表
		else{
			//如果upperid是单个值
			if(upperid && typeof(upperid) == "number")
				var sql = "select * from "+ tableobj[table][2] + " where upperid = "+ upperid;
			//如果upperid是一组值
			else if((typeof(upperid) == "object") && (upperid.constructor == Array)){
				var str = upperid.join(",");
				var sql =  "select * from "+ tableobj[table][2] + " where upperid in(" + str + ")";
			}
			//如果没有制定upperid值
			else
				var sql = "select * from "+ tableobj[table][2];
		}
	}
	else{
		alert("指定的数据表没有关联的分类！");
		return false;		
	}
	//查询记录集
	var rs = requeryrs(sql);
	//检测是否存在记录
	if(!rs.eof){
		//清空下拉列表框选项
		_class.innerHTML = "";
		//把记录集中记录绑定到下拉列表框中
		while (!rs.eof){
			//选项名称
			var txt = document.createTextNode(rs("title"));
			//创建选项
			var option = document.createElement("option");
			//添加选项显示名称
			option.appendChild(txt);
			//添加选项的值			
			option.value = rs("id");
			//把选项附加到下拉列表框中
			_class.appendChild(option);
			//下移记录集指针
			rs.moveNext;
		}
	}
	else{
		alert("没有查找到记录！");
		return false;
	}
	//清空记录集
	closers(rs);
}

//===================================
//在指定的下拉列表框中显示数据表的字段名称
//参数
//_class:下拉列表框对象
//table:查询的数据表
function showfield(_class, table){
	//初始化参数值
	if(!table){
		alert("没有指定要显示的数据表名称！");
		return false;
	}
	//获取分类下拉列表框
	if(!_class){
		alert("没有指定列表框对象！");
		return false;
	}
	//设查询字符串
	var sql = "select * from  " + table;
	//查询记录集
	var rs = requeryrs(sql);
	//获取记录集集合对象
	var fds = rs.Fields;
	//清空下拉列表框选项		
	_class.innerHTML = "";
	//把记录集中字段名称绑定到下拉列表框
	for(var i=0;i<fds.count;i++){
		//选项名称
		var txt = document.createTextNode(fieldobj[fds.Item(i).name][1]);
		//创建选项
		var option = document.createElement("option");
		//添加选项显示名称
		option.appendChild(txt);
		//添加选项的值			
		option.value = fds.Item(i).name;
		//把选项附加到下拉列表框中
		_class.appendChild(option);
	}
	//清空记录集
	closers(rs);
}

//===================================
//控制查询表单中字段列表与所有复选框的选择关系
//自定义查询表单中专用
//参数
//col:字段列表框对象
//allcol:选择所有列表选项的复选框对象
function fieldcoltoall(col, allcol){
	//获取所有列表选项
	var coloption = col.getElementsByTagName("option");
	//初始选择所有选项
	for(var i=0;i<coloption.length; i++){
		coloption[i].selected = true;
	}
	//初始勾选所有复选框
	allcol.checked = true;
	//当下拉列表框失去焦点
	col.onblur =function(){
		//临时逻辑变量
		var j = true;
		//如果有一个没有选中，则临时变量j为false
		//则所有复选框取消勾选
		//如果所有选项被选中，则临时变量j为true
		//则勾选所有复选框	
		for(var i=0;i<coloption.length; i++){
			if(!coloption[i].getAttribute("selected"))
				j = false;	
		}
		if(j){
			allcol.checked = true;
		}
		else{
			allcol.checked = false;	
		}
	}
	//当所有复选框失去焦点	
	allcol.onblur =function(){
		//如果选择复选框，则选择所有下拉列表选项
		if(allcol.checked){
			for(var i=0;i<coloption.length; i++){
				coloption[i].selected = true;
			}
		}
		//如果取消勾选复选框，则取消选择所有下拉列表选项
		else {
			for(var i=0;i<coloption.length; i++){
				coloption[i].selected = false;
			}			
		}
	}
}

//===================================
//显示自定义查询条件文本框中分类选项
//在自定义查询表单中专用，以便进行提示
//参数
//where:条件文本区域对象
//whereclass:数据分类显示框对象
//table:查询的数据表象
function showwhere(where, whereclass, table){
	//初始化参数值
	var table = table || "out";
	//获取条件文本区域对象和显示分类包含框
	var where = where || document.getElementById("where");
	var whereclass = whereclass || document.getElementById("whereclass");	
	//设查询字符串
	var sql = "select * from  " + table;
	//查询记录集
	var rs = requeryrs(sql);
	//获取记录集集合对象
	var fds = rs.Fields;
	//清空下拉列表框选项		
	where.value = "";
	//文本区域显示的值
	var wherestr = "";		
	//把记录集中字段名称绑定到文本区域
	for(var i=0;i<fds.count;i++){
		wherestr += "\n" +fds.Item(i).name;	
	}
	wherestr = wherestr.substring(1);
	where.value = wherestr;
	//清空记录集
	closers(rs);	
	//获取对应表的编号
	var id = tableobj[table][0];
	//设查询字符串
	if(id>10){
		//处理支出表、收入表、日志表
		sql = "select * from class2 where upperid = "+ id;
	}
	else{
		//明细表，包括支出明细、收入明细和日志明细
		sql = "select * from class2 where upperid = "+ (id+10);		
	}	
	//查询记录集
	rs = requeryrs(sql);
	//检测是否存在记录
	if(!rs.eof){
		//清空分类包含框内容
		whereclass.innerHTML = "";
		var str = tableobj[table][1] + "表class字段值：";
		//把记录集中记录绑定到字符串中
		while (!rs.eof){
			//显示分类名称和分类值
			//处理支出表、收入表、日志表
			if(id>10){
				str += rs("id") +"=" + rs("title") + "&nbsp;&nbsp;" ;
			}
			//明细表，包括支出明细、收入明细和日志明细
			else{
				//查询三级分类表
				sql = "select * from class3 where upperid = "+ rs("id");
				//查询记录集
				var subrs = requeryrs(sql);
				//检测是否存在记录
				if(!subrs.eof){
					//把记录集中记录绑定到字符串中
					while (!subrs.eof){
						//显示分类名称和分类值
						str += subrs("id") +"=" + subrs("title") + "&nbsp;&nbsp;" ;
						//下移记录集指针
						subrs.moveNext;
					}
				}
				//清空记录集
				closers(subrs);	
			}
			//下移记录集指针
			rs.moveNext;
		}
		if(str != tableobj[table][1] + "表class字段值："){
			whereclass.innerHTML =str;
		}
		else{
			whereclass.innerHTML = tableobj[table][1] + "表不存在分类！";	
		}
	}
	//否则，删除下拉列表框
	else{
		whereclass.innerHTML = tableobj[table][1] + "表不存在分类！";	
	}
	//清空记录集
	closers(rs);
}

//===================================
//添加明细表单
//在录入收入、支出和日志表单中专用
//参数
//classid:二级分类项的编号
//table:数据表的名称
//返回值
//返回添加单条明细表单HTML片段
function addsubform(classid, table){
	//初始化参数
	var classid = classid || null;
	var table = table || "out";	
	//获取金额文本框
	if(table != "blog")
		var price = document.getElementById("price");
	//查询三级分类表
	var sql = "select * from class3 where upperid = " + classid;
	var rs = requeryrs(sql);
	//如果不存在详细分类，则不添加明细表单
	if(!rs.eof){
		//新建列表框
		var subclass = document.createElement("select");
		//绑定列表选项
		while (!rs.eof){
			var option = document.createElement("option");
			var id = parseInt(rs("id"));
			option.setAttribute("value", id);
			var text = document.createTextNode(String(rs("title")));
			option.appendChild(text);
			subclass.appendChild(option);
			rs.moveNext;
		}
		//清除记录集
		closers(rs);
		//定义列表框类名
		subclass.setAttribute("class","subclass");
		//兼容IE 7及其以下版本
		subclass.className = "subclass";
		//新建金额文本框
		var subprice = document.createElement("input");
		subprice.type = "text";
		//定义文本框类名
		subprice.setAttribute("class","subprice");
		//兼容IE 7及其以下版本		
		subprice.className = "subprice";
		//绑定验证事件
		subprice.onchange = function(){
			if(this.value == "" ||	this.value == null || isNaN(parseFloat(this.value))){
				alert("请输入金额");
				this.focus();
				return false;
			}
			else {
				if(isNaN(parseFloat(price.value))){
					var oldvalue = 0;
				}
				else{
					var oldvalue = parseFloat(price.value);
				}
				price.value = (oldvalue +  parseFloat(this.value)).toFixed(2);
			}
		}
		//新建文本区域
		var subremark = document.createElement("textarea");
		//定义文本区域类名
		subremark.setAttribute("class","subremark");
		//兼容IE 7及其以下版		
		subremark.className = "subremark";
		//定义div包含框	
		var div = document.createElement("div");
		//下面代码把文本框、下拉列表框和文本区域绑定到div包含框中
		//添加备注文本区域
		var text = document.createTextNode("备注");
		div.appendChild(text);
		div.appendChild(subremark);
		//添加换行符标签
		var br = document.createElement("br");
		div.appendChild(br);
		//添加下拉列表框
		var text = document.createTextNode("分类");
		div.appendChild(text);
		div.appendChild(subclass);
		//否日志表可以添加金额表单域
		if(table != "blog"){
			var text = document.createTextNode("金额");
			div.appendChild(text);
			div.appendChild(subprice);
		}
		$('textarea').elastic();
		//返回表单结构片段
		return div;
	}
	//不存在记录则返回空
	else{
		return null
	}
}

//===================================
//添加明细表单控制按钮
//在录入收入、支出和日志表单中专用
//参数
//classid:二级分类项的编号
//table:数据表的名称
function addsubbtn( classid, table){
	//初始化参数
	var classid = classid || null;
	var table = table || "out";	
	var box = document.getElementById("detail");
	var subbox = box.firstChild.nextSibling;
	//获取金额文本框
	if(table != "blog")
		var price = document.getElementById("price");	
	var btn = document.createElement("input");
	btn.type = "button";
	btn.id = "addsubform";
	btn.value = "添加项目";
	box.appendChild(btn);
	btn.onclick = function(){	
		var div = addsubform(classid, table);
		if(div){
			subbox.appendChild(div);
		}
		//添加文本区域自动伸缩外部插件
		$('textarea').elastic();	
	}
	var btn1 = btn;
	var btn = document.createElement("input");
	btn.type = "button";
	btn.id = "delsubform";
	btn.value = "删除项目";
	box.appendChild(btn);
	btn.onclick = function(){
		var div = box.firstChild.nextSibling.lastChild;
		if(div){
			if(!isNaN(parseFloat(thisvalue)) && table != "blog" ){
				var thisvalue = div.getElementsByTagName("input")[0].value;
				price.value = price.value - thisvalue;
			}
			div.parentNode.removeChild(div);
		}
		else {
			alert("无表单项可删除!");	
		}
	}
}

//===================================
//清除明细表单
//在录入收入、支出和日志表单中专用
function resetform(){
	var detail = document.getElementById("detail");
	detail.innerHTML = "";
}

	

