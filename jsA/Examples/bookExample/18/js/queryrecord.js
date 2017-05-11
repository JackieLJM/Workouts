//===================================
//查询函数
//===================================
//===================================
//按月查询
function monthquery(){
	var table1 = 	document.getElementById("table1");
	var year = 	document.getElementById("year");					
	var month = 	document.getElementById("month");					
	var save1 = 	document.getElementById("save1");	
	save1.onclick = function(){	
		var table1value = table1.value;
		var yearvalue = year.value;		
		var monthvalue = month.value;
		var sql = "select * from ["+ table1value +"] where";
		if(monthvalue > 0){
			sql += " month(adddate)= " + monthvalue  + " and";
		}
		if(yearvalue > 0){
			sql += " year(adddate)= " + yearvalue  + " and";
		}
		//去除SQL字符串最后的多余字符
		if(sql.lastIndexOf("and") == (sql.length - 3)) {
			sql = sql.substring(0,sql.lastIndexOf("and"));
		}
		if(sql.lastIndexOf("where") == (sql.length - 5)) {
			sql = sql.substring(0,sql.lastIndexOf("where"));
		}
		sql +=  " order by id desc";
		//设置口令
		if(!key(sql,table1limit))
			return false;
		var rs = requeryrs(sql);
		//调用exeData()方法，处理查询的数据
		exeshow({
			box:	showtablebox, 
			rs:		rs, 
			table:	table1value,
			sql:	sql
		});
		//添加文本区域自动伸缩外部插件
		$('textarea').elastic();
	}
}

//===================================
//按时间段查询
function time(){
	var table2 = 	document.getElementById("table2");
	var begin = 	document.getElementById("begin");					
	var end = 		document.getElementById("end");					
	var save2 = 	document.getElementById("save2");	
	save2.onclick = function(){	
		var table2value = table2.value;
		var beginvalue = begin.value;		
		var endvalue = end.value;
		beginvalue = verify("adddate", beginvalue);
		endvalue = verify("adddate", endvalue);	
 		//最开始的日期验证     
		if( !isNaN(parseFloat(beginvalue)) && !isNaN(parseFloat(endvalue))){
			var sql = "select * from ["+ table2value +"] where [adddate] between #" + beginvalue + "# and  #" + endvalue + "#";
		}
		else{
			alert("没有恰当设置时间段！");
			return false;
		}
		sql +=  " order by id desc";
		//设置口令
		if(!key(sql,table1limit))
			return false;		
		var rs = requeryrs(sql);		
		//调用exeData()方法，处理查询的数据
		exeshow({
			box:	showtablebox, 
			rs:		rs, 
			table:	table2value,
			sql:	sql
		});		
		//添加文本区域自动伸缩外部插件
		$('textarea').elastic();
	}
}

//===================================
//模糊查询
function mohu(){
	var table3 = 	document.getElementById("table3");
	var key = 		document.getElementById("key");			
	var save3 = 	document.getElementById("save3");	
	save3.onclick = function(){	
		var table3value = table3.value;
		var keyvalue = key.value;		
        //验证     
		if( keyvalue != "" && keyvalue != undefined  && keyvalue != null ){
			//劈开关键词
			keyvalue = keyvalue.replace(/^(\s|　)+/g,'').replace(/(\s|　)+$/g, '');//清空两侧空格
			keyvalue = keyvalue.replace(/(\s|　)+/g," ");//把多个空格替换为一个空格
			var a = keyvalue.split(" ");
			var sqlstr = ""
			for(var i=0; i<a.length; i++){
				//sqlstr += " detail like '*+ a[i] +*'" + a[i] + "*' and ";
				 sqlstr += "instr(remark,'"+ a[i] +"')>0 and ";
			}
			sqlstr = sqlstr.substring(0,sqlstr.lastIndexOf("and"));
			var sql = "select * from ["+ table3value + "] where " + sqlstr;
		}
		else{
			alert("没有输入关键字！");
			return false;
		}
		sql +=  " order by id desc";
		//设置口令
		if(!key(sql,table1limit))
			return false;		
		var rs = requeryrs(sql);		
		//调用exeData()方法，处理查询的数据
		exeshow({
			box:	showtablebox, 
			rs:		rs, 
			table:	table3value,
			sql:	sql
		});			
		//添加文本区域自动伸缩外部插件
		$('textarea').elastic();
	}
}

//===================================
//昨天查询
function yesterday(){
	var table4 = 	document.getElementById("table4");
	var yesterday = 	document.getElementById("yesterday");					
	yesterday.onclick = function(){	
		var table4value = table4.value;
		var sql = "select * from ["+ table4value + "] where datediff('d',[adddate], now )= 1 ";
		sql +=  " order by id desc";
		//设置口令
		if(!key(sql,table1limit))
			return false;
		var rs = requeryrs(sql);
		//调用exeData()方法，处理查询的数据
		exeshow({
			box:	showtablebox, 
			rs:		rs, 
			table:	table4value,
			sql:	sql,
			tabletitle: this.value + "（" +  table4value + "）"
		});			
		//添加文本区域自动伸缩外部插件
		$('textarea').elastic();
	}
}

//===================================
//今天查询
function today(){
	var table4 = 	document.getElementById("table4");
	var today = 	document.getElementById("today");					
	today.onclick = function(){	
		var table4value = table4.value;
		var sql = "select * from ["+ table4value + "] where datediff('d',[adddate], now )= 0 ";
		sql +=  " order by id desc";
		//设置口令
		if(!key(sql,table1limit))
			return false;
		var rs = requeryrs(sql);
		//调用exeData()方法，处理查询的数据
		exeshow({
			box:	showtablebox, 
			rs:		rs, 
			table:	table4value,
			sql:	sql,
			tabletitle: this.value + "（" +  table4value + "）"
		});			
		//添加文本区域自动伸缩外部插件
		$('textarea').elastic();
	}
}

//===================================
//前天查询
function beforeyesterday(){
	var table4 = 	document.getElementById("table4");
	var beforeyest = 	document.getElementById("beforeyest");					
	beforeyest.onclick = function(){	
		var table4value = table4.value;
		var sql = "select * from ["+ table4value + "] where datediff('d',[adddate], now )= 2 ";
		sql +=  " order by id desc";
		//设置口令
		if(!key(sql,table1limit))
			return false;
		var rs = requeryrs(sql);
		//调用exeData()方法，处理查询的数据
		exeshow({
			box:	showtablebox, 
			rs:		rs, 
			table:	table4value,
			sql:	sql,
			tabletitle: this.value + "（" +  table4value + "）"
		});	
		//添加文本区域自动伸缩外部插件
		$('textarea').elastic();
	}
}

//===================================
//最近3天查询
function beforeyest(){
	var table4 = 	document.getElementById("table4");
	var day3 = 	document.getElementById("day3");					
	day3.onclick = function(){	
		var table4value = table4.value;
		var sql = "select * from ["+ table4value + "] where datediff('d',[adddate], now )<= 3 ";
		sql +=  " order by id desc";
		//设置口令
		if(!key(sql,table1limit))
			return false;
		var rs = requeryrs(sql);
		//调用exeData()方法，处理查询的数据
		exeshow({
			box:	showtablebox, 
			rs:		rs, 
			table:	table4value,
			sql:	sql,
			tabletitle: this.value + "（" +  table4value + "）"
		});	
		//添加文本区域自动伸缩外部插件
		$('textarea').elastic();
	}
}

//===================================
//最近一周查询
function week(){
	var table4 = 	document.getElementById("table4");
	var week = 	document.getElementById("week");					
	week.onclick = function(){	
		var table4value = table4.value;
		var sql = "select * from ["+ table4value + "] where datediff('d',[adddate], now )<= 7 ";
		sql +=  " order by id desc";
		//设置口令
		if(!key(sql,table1limit))
			return false;
		var rs = requeryrs(sql);
		//调用exeData()方法，处理查询的数据
		exeshow({
			box:	showtablebox, 
			rs:		rs, 
			table:	table4value,
			sql:	sql,
			tabletitle: this.value + "（" +  table4value + "）"
		});	
		//添加文本区域自动伸缩外部插件
		$('textarea').elastic();
	}
}

//===================================
//指定天数查询
function numday(){
	var table5 = 	document.getElementById("table5");
	var days = 		document.getElementById("days");			
	var save5 = 	document.getElementById("save5");	
	save5.onclick = function(){	
		var table5value = table5.value;
		var daysvalue = days.value;	
		if(isNaN(parseInt(daysvalue))) daysvalue = 1;
		var sql = "select * from ["+ table5value + "] where datediff('d',[adddate], now )<= " +  parseInt(daysvalue);
		sql +=  " order by id desc";
		//设置口令
		if(!key(sql,table1limit))
			return false;
		var rs = requeryrs(sql);
		//调用exeData()方法，处理查询的数据
		exeshow({
			box:	showtablebox, 
			rs:		rs, 
			table:	table5value,
			sql:	sql,
			tabletitle: this.value + "（" +  table5value + "）"
		});	
		//添加文本区域自动伸缩外部插件
		$('textarea').elastic();
	}
}


//===================================
//按天查询
function whichday(){
	var table6 = 	document.getElementById("table6");
	var whichday = 	document.getElementById("whichday");	
	var firstday = 	document.getElementById("firstday");		
	var upday = 		document.getElementById("upday");	
	var downday = 		document.getElementById("downday");		
	var lastday = 		document.getElementById("lastday");	
	firstday.onclick = function(){	
		var table6value = table6.value;	
		var whichdayvalue = whichday.value;	

	}
	
}

//===================================
//自定义查询
function custquery(){
	var table0 = 	document.getElementById("table0");
	var col = 	document.getElementById("col");	
	var allcol = 	document.getElementById("allcol");		
	var row = 		document.getElementById("row");	
	var where = 		document.getElementById("where");		
	var orderby = 		document.getElementById("orderby");	
	var order = 		document.getElementById("order");
	var save0 = 	document.getElementById("save0");	
	save0.onclick = function(){	
		var table0value = table0.value;	
		var colvalue = col.value;
		var allcolvalue = allcol.value;	
		var rowvalue = row.value;		
		var wherevalue = where.value;	
		var orderbyvalue = orderby.value;
		var ordervalue = order.value;	
		//获取字段列表被选中的值
		var coloption = col.getElementsByTagName("option");
		var colValue = [];
		for(var i=0;i<coloption.length; i++){
			if(coloption[i].getAttribute("selected"))
				colValue.push(coloption[i].value);
		}
		//设计查询字符串
		var sql = "select";	
		//TOP
		if(parseFloat(rowvalue) != 0)
			sql += " top " + rowvalue;
		//查询字段
		if(allcolvalue){	//查询所有字段
			sql += " * ";
			colValue = [];	//清空字段列表数组
		}
		else if(colValue && colValue !="" && colValue != undefined){	//查询部分字段
			var str = colValue.join(",");
			if(str.indexOf("id")<0) str = "id," +str;	//如果不包括id字段，则加上
			sql += " " + str;
		}
		else{	//查询所有字段
			sql += " * ";
		}
		//TABLE
		sql += " from [" + table0value + "]";
		//WHERE
		wherevalue = wherevalue.replace(/^(\s|　)+/g,'').replace(/(\s|　)+$/g, '');//清除两侧空格
		//SQL字段筛选关键字
		var whereid = ["<",">","(",")","[","]","=","*","?","!","or","and","is","in ","if","not","between","exists","like","datediff"];
		//条件指示变量
		var wheretrue = false;
		//检测WHER语句是否包含关键字
		for(var i=0;i<whereid.length;i++){
			var str = whereid[i];	
			if(wherevalue.indexOf(str)>0)//这里还存在一个问题，如果字段中包含上面关键字，将会出现错误？？？？？？？？？？？？？？
				wheretrue = true;	
		}
		//检测WHER语句是否仅包含一个字段
		var wherefield = ["id","price","outclass","inclass","shopclass","outid","detail","date","class"];
		for(var i=0;i<wherefield.length;i++){
			var str = wherefield[i];
			if(wherevalue == str)
				wheretrue = true;	
		}
		//如果非法的条件，则清除WHERE语句
		if(wheretrue ==false) 
			wherevalue = "";
		//满足条件，则追加WHERE语句
		if(wherevalue && wherevalue !="" && wherevalue != undefined ){
			sql += " where " + wherevalue;
		}
		//ORDER
		sql += " order by " + orderbyvalue + " " + ordervalue;
		//设置口令
		if(!key(sql,table1limit))
			return false;
		//执行查询
		var rs = requeryrs(sql);
		//调用exeData()方法，处理查询的数据
		exeshow({
			box:	showtablebox, 
			rs:		rs, 
			table:	table0value,
			sql:	sql,
			tabletitle: this.value + "（" +  table0value + "）"
		});	
		//添加文本区域自动伸缩外部插件
		$('textarea').elastic();
	}
}

//===================================
//表格分类管理
function tableclass(){
	var tableclass = 	document.getElementById("tableclass");				
	tableclass.onclick = function(){	
		var sql = "select * from [class1]";
		//设置口令
		if(!key(sql,table1limit))
			return false;
		var rs = requeryrs(sql);
		//调用exeData()方法，处理查询的数据
		exeshow({
			box:	showtablebox, 
			rs:		rs, 
			table:	"class1", 
			sql:	sql,
			tabletitle: this.value
		});
		//添加文本区域自动伸缩外部插件
		$('textarea').elastic();
	}
}

//===================================
//一级分类管理
function class1(){
	var class1 = document.getElementById("class1");				
	class1.onclick = function(){
		var sql = "select * from [class1]";
		//设置口令
		if(!key(sql,table1limit))
			return false;
		var rs = requeryrs(sql);
		//调用exeData()方法，处理查询的数据
		exeshow({
			box:	showtablebox, 
			rs:		rs, 
			table:	"class1",
			sql:	sql,
			tabletitle: this.value
		});			
		//添加文本区域自动伸缩外部插件
		$('textarea').elastic();
	}
}

//===================================
//二级分类管理
function class2(){
	var class2 = 	document.getElementById("class2");				
	class2.onclick = function(){	
		var sql = "select * from [class2]";
		//设置口令
		if(!key(sql,table1limit))
			return false;
		var rs = requeryrs(sql);
		//调用exeData()方法，处理查询的数据
		exeshow({
			box:	showtablebox, 
			rs:		rs, 
			table:	"class2",
			sql:	sql,
			tabletitle: this.value
		});	
		//添加文本区域自动伸缩外部插件
		$('textarea').elastic();
	}
}

//===================================
//三级分类管理
function class3(){
	var class3 = 	document.getElementById("class3");				
	class3.onclick = function(){	
		var sql = "select * from [class3]";
		//设置口令
		if(!key(sql,table1limit))
			return false;
		var rs = requeryrs(sql);
		//调用exeData()方法，处理查询的数据
		exeshow({
			box:	showtablebox, 
			rs:		rs, 
			table:	"class3",
			sql:	sql,
			tabletitle: this.value
		});	
		//添加文本区域自动伸缩外部插件
		$('textarea').elastic();
	}
}

//===================================
//出账分类管理
function outclass(){
	var outclass = 	document.getElementById("outclass");				
	outclass.onclick = function(){	
		var sql = "select * from [class2] where upperid = " + tableobj["out"][0];
		//设置口令
		if(!key(sql,table1limit))
			return false;
		var rs = requeryrs(sql);
		//调用exeData()方法，处理查询的数据
		exeshow({
			box:	showtablebox, 
			rs:		rs, 
			table:	"class2",
			sql:	sql,
			tabletitle: this.value
		});	
		//添加文本区域自动伸缩外部插件
		$('textarea').elastic();
	}
}

//===================================
//入账分类管理
function incomeclass(){
	var incomeclass = 	document.getElementById("incomeclass");				
	incomeclass.onclick = function(){	
		var sql = "select * from [class2] where upperid = " + tableobj["income"][0];
		//设置口令
		if(!key(sql,table1limit))
			return false;
		var rs = requeryrs(sql);
		//调用exeData()方法，处理查询的数据
		exeshow({
			box:	showtablebox, 
			rs:		rs, 
			table:	"class2",
			sql:	sql,
			tabletitle: this.value
		});	
		//添加文本区域自动伸缩外部插件
		$('textarea').elastic();
	}
}

//===================================
//日志分类管理
function blogclass(){
	var blogclass = 	document.getElementById("blogclass");				
	blogclass.onclick = function(){	
		var sql = "select * from [class2] where upperid = " + tableobj["blog"][0];
		//设置口令
		if(!key(sql,table1limit))
			return false;
		var rs = requeryrs(sql);		
		//调用exeData()方法，处理查询的数据
		exeshow({
			box:	showtablebox, 
			rs:		rs, 
			table:	"class2",
			sql:	sql,
			tabletitle: this.value
		});	
		//添加文本区域自动伸缩外部插件
		$('textarea').elastic();
	}
}

//===================================
//出账明细分类管理
function outdetail(){
	var outdetail = 	document.getElementById("outdetail");				
	outdetail.onclick = function(){	
		var sql = "select * from [class2] where upperid = " + tableobj["out"][0];
		//设置口令
		if(!key(sql,table1limit))
			return false;
		var rs = requeryrs(sql);
		if(rs && !rs.eof){
			var outdetailvalue = [];
			while (!rs.eof){
				outdetailvalue.push(String(rs("id")));
				rs.moveNext;
			}
		}
		else{
			alert("没有查询到出账分类记录,所以无法查询出账明细分类，请先创建出账分类！");
			return false;
		}
		//关闭记录集
		closers(rs);
		if(outdetailvalue && outdetailvalue !="" && outdetailvalue != undefined && outdetailvalue.length>0){	//查询部分字段
			var str = outdetailvalue.join(",");
			sql = "select * from [class3] where upperid in(" + str + ")";
			//设置口令
			if(!key(sql,table1limit))
			return false;
			var rs1 = requeryrs(sql);			
		}
		else {
			alert("没有查询到出账分类记录！");
			return false;			
		}
		//调用exeData()方法，处理查询的数据
		exeshow({
			box:	showtablebox, 
			rs:		rs1, 
			table:	"class3",
			sql:	sql,
			tabletitle: this.value
		});	
		//添加文本区域自动伸缩外部插件
		$('textarea').elastic();
	}
}

//===================================
//入账明细分类管理
function incomedetail(){
	var incomedetail = 	document.getElementById("incomedetail");				
	incomedetail.onclick = function(){	
		var sql = "select * from [class2] where upperid = " + tableobj["income"][0];
		var rs = requeryrs(sql);
		if(rs && !rs.eof ){
			var incomedetailvalue = [];
			while (!rs.eof){
				incomedetailvalue.push(String(rs("id")));
				rs.moveNext;	
			}
		}
		else{
			alert("没有查询到入账分类记录,所以无法查询入账明细分类，请先创建入账分类！！");
			return false;
		}
		//关闭记录集
		closers(rs);
		if(incomedetailvalue && incomedetailvalue !="" && incomedetailvalue != undefined && incomedetailvalue.length>0){	//查询部分字段
			var str = incomedetailvalue.join(",");
			sql = "select * from [class3] where upperid in(" + str + ")";
			//设置口令
			if(!key(sql,table1limit))
			return false;
			var rs1 = requeryrs(sql);
		}
		else{
			alert("没有查询到入账分类记录！");
			return false;			
		}
		//调用exeData()方法，处理查询的数据
		exeshow({
			box:	showtablebox, 
			rs:		rs1, 
			table:	"class3",
			sql:	sql,
			tabletitle: this.value
		});	
		//添加文本区域自动伸缩外部插件
		$('textarea').elastic();
	}
}

//===================================
//日志明细分类管理
function blogdetail(){
	var blogdetail = 	document.getElementById("blogdetail");				
	blogdetail.onclick = function(){	
		var sql = "select * from [class2] where [upperid] = " + tableobj["blog"][0];
		var rs = requeryrs(sql);
		if(rs && !rs.eof){
			var blogdetailvalue = [];
			while (!rs.eof){
				blogdetailvalue.push(String(rs("id")));
				rs.moveNext;	
			}
		}
		else{
			alert("没有查询到日志分类记录,所以无法查询日志明细分类，请先创建日志分类！！");
			return false;
		}
		//关闭记录集
		closers(rs);
		if(blogdetailvalue && blogdetailvalue !="" && blogdetailvalue != undefined && blogdetailvalue.length>0){	//查询部分字段
			var str = blogdetailvalue.join(",");
			sql = "select * from [class3] where [upperid] in(" + str + ")";
			//设置口令
			if(!key(sql,table1limit))
			return false;
			var rs1 = requeryrs(sql);
		}
		else{
			alert("没有查询到日志分类记录！");
			return false;			
		}
		//调用exeData()方法，处理查询的数据
		exeshow({
			box:	showtablebox, 
			rs:		rs1, 
			table:	"class3",
			sql:	sql,
			tabletitle: this.value
		});	
		//添加文本区域自动伸缩外部插件
		$('textarea').elastic();
	}
}