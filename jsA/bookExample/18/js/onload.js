//===================================
//基本数据
//===================================
//===================================
//主要数据表数组
//在writeform.js中生成表单结构时动态设计下拉菜单项
var tablearray = [
	{ table : 'out', 			title : '家庭支出' },
	{ table : 'income', 		title : '家庭收入' },
	{ table : 'blog', 			title : '家庭日志' },
	{ table : 'incomedetail', 	title : '收入明细' },
	{ table : 'outdetail', 		title : '支出明细' },
	{ table : 'blogdetail', 	title : '博客明细' }	
];
//导航列表数组
//在onload.js中处理导航菜单行为时使用
var menuarray = [
	{ table : 'out', 		id: 14,		title : '家庭支出' },
	{ table : 'income',  	id: 15,		title : '家庭收入' },
	{ table : 'blog', 	 	id: 16,		title : '家庭日志' },
	{ table : 'fastquery',  id: 0,		title : '快速查询' },
	{ table : 'custquery',  id: 0,		title : '自定义查询' },
	{ table : 'class',  	id: 0,		title : '分类管理' }	
];
//导航菜单与数据表格的映射关系
//在writeform.js中生成表单的legend标签中使用
//在init.js中初始化表单显示状态使用
//第1个元素表示分类的自动编号
//自动编号为0表示不存在自动编号
//第2个元素表示表格名称
var menuobj = {
	'out' : 		[14, 	'家庭支出'],
	'income' : 		[15, 	'家庭收入'],	
	'blog' : 		[16, 	'家庭日志'],
	'fastquery' : 	[0, 	'快速查询' ],
	'custquery' : 	[0, 	'自定义查询' ],	
	'class' : 		[0, 	'分类管理' ]
};
//===================================
//数据表集合对象
//第1个元素表示数据表在分类表中的自动编号，0表示不存在编号
//第2个元素表示名称
//第3个元表示素映射的分类表
//第4个元素表示关联的主表id
//第5个元素表示数据表分类
//第6个元素表示数据表分类类型
//第7个元素表示编号
//第8个元表示素映射的分类表
//第9个元素表示映射upperid的表格
//第10个元素表示被引用的明细表，no表示没有
var tableobj = {
//表名称	明细表upperid 0	标签1	向上关联class表2 	所属表ID 3 向下关联分类或明细表4  分类 5	  编号 6	 向上关联class表7 向上关联upperid表8	 被多表引用9
'out' : 		[14, 	'家庭支出', 	"class2", 	0,			"outdetail",	"data",		1, 		"class2", 	"no",			"no"],
'income' : 		[15, 	'家庭收入', 	"class2", 	0,			"incomedetail",	"data",		2, 		"class2", 	"no",			"no"],	
'blog' : 		[16, 	'家庭日志', 	"class2", 	0,			"blogdetail",	"data",		3, 		"class2", 	"no",			"no"],
'incomedetail' :[0, 	'收入明细', 	"class3", 	15,			"no",			"detail",	4, 		"class3", 	'income',		"no"],
'outdetail' : 	[0, 	'支出明细', 	"class3", 	14,			"no",			"detail",	5, 		"class3", 	'out',			"no"],	
'blogdetail' : 	[0, 	'博客明细', 	"class3", 	16,			"no",			"detail",	6, 		"class3", 	'blog',			"no"],
'class1' : 		[0, 	'一级分类', 	"no", 		1,			"class2",		"class",	7, 		"no", 		"no",			"no"],
'class2' : 		[0, 	'二级分类', 	"class1", 	2,			"class3",		"class",	8, 		"no", 		"class1",		['out', 'income','[blog]']],
'class3' : 		[0, 	'三级分类', 	"class2", 	3,			"no",			"class",	9, 		"no", 		"class2",		['outdetail', 'incomedetail','blogdetail']]
};
//数据表字段和数据表格类名集合对象
//第1个元素表示字段类型，num表示数值，text表示字符串，time表示时间，no表示无数据类型
//第2个元素表示字段对应标签
//第3个元素表示字段可捆绑的编辑表单域类型，no表示不需要编辑，text表示文本框，textarea表示文本区域，select表示下拉列表框
var fieldobj = {
//   名称			类型	 0		 标签 1			表格编辑行为 2
//数据表字段
	'id' : 			["num", 	'编号', 			'no'],
	'price' : 		["num", 	'金额', 			'text'],	
	'title' : 		["text", 	'名称', 			'text'],
	'remark' : 		["text", 	'备注', 			'textarea' ],
	'class' : 		["num", 	'分类', 			'select' ],		
	'adddate' : 	["time", 	'添加时间', 		'no' ],	
	'update' : 		["time", 	'更新时间', 		'no' ],
	'upperid' : 	["num", 	'所属记录', 		'select' ],
	'table' : 		["text", 	'所属表名', 		'text' ],
//表格中操作类	
	'del' : 		["no", 		'删除记录', 		'no' ],
	'edit' : 		["no", 		'编辑记录', 		'no' ],
	'detail' : 		["no", 		'查看明细', 		'no' ],
	'add' : 		["no", 		'添加记录', 		'no' ],		
	'no' : 			["no", 		'无名', 			'no' ]		
};
//月份简写数组
var monthstr = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
var code = "f%C5%D1%D6%D7";
var table1limit = ["blog","blogdetail"];
//===================================

//===================================
//程序启动接口
//===================================
//===================================
//页面初始化
window.onload = function(){
	//获取页面基本框架对象
	var h1 = document.getElementsByTagName("h1")[0];	
	var showmenubox = document.getElementById("showmenubox");
	var menu = document.getElementById("menu");	
	var list = 	menu.getElementsByTagName("li");
	var showformbox = document.getElementById("showformbox");	
	var showinfobox = document.getElementById("showinfobox");	
	var showtablebox = document.getElementById("showtablebox");	
	var showdetailbox = document.getElementById("showdetailbox");
	var showsubdetailbox = document.getElementById("showsubdetailbox");	
	var mask = document.getElementById("mask");	
		
	//页面初始化设置
	var showdefault = function(){
		//初始清空页面面板内容
		showformbox.innerHTML = "";	
		showinfobox.innerHTML = "";		
		showtablebox.innerHTML = "";	
		showdetailbox.innerHTML = "";
		//初始隐藏页面对象
		showmenubox.style.display = "none";	
		showformbox.style.display = "none";		
		showinfobox.style.display = "none";			
		showtablebox.style.display = "none";		
		showdetailbox.style.display = "none";
	}
	//页面初始化状态
	showdefault();
	
	//显示导航面板
	//获取span标签
	var h1_span = h1.lastChild;
	//全局状态跟踪变量	
	window.h1_span = false;
	var h1_spanclick = function(){	
		if(!window.h1_span){ //切换全局变量
			showmenubox.style.display = "";
			window.h1_span = true;
			h1_span.innerHTML = "幸福回家";	
			h1_span.className = "desc";//改变类
		}
		else{
			showmenubox.style.display = "none";
			window.h1_span = false;
			h1_span.innerHTML = "快乐请进";
			h1_span.className = "asc";//改变类	
			//恢复页面初始化状态
			showdefault();
			//恢复导航菜单的默认样式
			resetmenu();			
		}
		//阻止事件冒泡到父元素身上去
		if(document.all)
			window.event.cancelBubble=true;
		else
			event.stopPropagation(); 
	}	
	//以标准方法绑定事件，以便中止事件
	addEvent(h1_span,"click",h1_spanclick);
		
	//动态更换背景和图标
	n = parseInt(Math.random()*(2-1+1)+1);
	if(n==1){
		h1.style.backgroundImage="url(images/logo1.png)";	
		document.body.style.backgroundImage="url(pics/home2.png)";
	}
	else{
		h1.style.backgroundImage="url(images/logo2.png)";	
		document.body.style.backgroundImage="url(pics/home1.png)";		
	}
	window.h1_logo = false;
	var h1_logoclick = function(event){
		//随机生成1到10的任意整数
		var n = parseInt(Math.random()*10+1);
		document.body.style.backgroundPosition = "center";
		if(!window.h1_logo){ //切换全局变量
			n = parseInt(Math.random()*(2-1+1)+1);
			h1.style.backgroundImage="url(images/logo" + n + ".png)";	
			n = parseInt(Math.random()*(12-1+1)+1);
			mask.style.backgroundImage="url(images/mask" + n + ".png)";	
			n = parseInt(Math.random()*(95-1+1)+1);
			document.body.style.backgroundImage="url(pics/home" + n + ".jpg)";
			window.h1_logo = true;
		}
		else{
			n = parseInt(Math.random()*(2-1+1)+1);
			h1.style.backgroundImage="url(images/logo" + n + ".png)";	
			n = parseInt(Math.random()*(12-1+1)+1);
			mask.style.backgroundImage="url(images/mask" + n + ".png)";	
			n = parseInt(Math.random()*(95-1+1)+1);
			document.body.style.backgroundImage="url(pics/home" + n + ".jpg)";
			window.h1_logo = false;	
		}  
	}	
	//以标准方法绑定事件，以便在内部元素中止事件
	addEvent(h1,"click",h1_logoclick);
	
	//遍历导航菜单的列表选项
	for(var i=0; i < list.length; i++){
		//设置菜单名称
		list[i].innerHTML = menuarray[i]['title'];
		//绑定单击事件
		list[i].onclick = (function(i){
			//闭包函数
			return function(){
				//获取写入表单结构的对象
				var obj = writeform(menuarray[i]['table']);
				//在包含框中插入表单
				showformbox.innerHTML = obj['html'];
				//显示表单
				showformbox.style.display = "block";
				//设置隐藏表单菜单项状态
				window.hideform = false;//全局状态跟踪变量	
				hideform.innerHTML = "隐藏表单";
				//设置隐藏数据表菜单项状态				
				window.hidetable = false;//全局状态跟踪变量	
				hidetable.innerHTML = "隐藏数据表";
				//设置隐基本信息菜单项状态				
				window.hideinfoli = false;//全局状态跟踪变量	
				hideinfoli.innerHTML = "隐藏基本信息";				
								
				//获取表的名称
				var table = menuarray[i]['table'];
				//如果是收入、支出或日志信息，则写入表单记录
				if(table == "out" || table == "income" || table == "blog" ){
					//获取表单对象
					var save = document.getElementById("save");
					var _reset = document.getElementById("reset");
					var _class = document.getElementById("class");
					var detail = document.getElementById("detail");
					//如果是收入和支出信息，则获取金额文本框
					if( table != "blog")
						var price = document.getElementById("price");						
					//显示收入和支出分类下拉列表选项
					showclass(_class, table);
					//获取下拉列表框的值
					var classid = _class.value;
					//清除明细表单项
					_reset.onclick = function(){
						//调用清除表单值函数
						resetform();
					}
					//执行数据库写入操作						
					save.onclick = function(){
						//写入收入或支出信息
						if( table != "blog"){
							writerecord(table);
						}
						//写入日志信息，日志不涉及金额字段，处理方式不同
						else{
							writeblog(table);							
						}
						//复查写入的值
						var sql = "select top 1 * from "+ table +" order by id desc";
						var rs = requeryrs(sql);
						//保存写入记录的编号
						var upperid = parseFloat(rs("id"));	
						//关闭记录集
						closers(rs);	
						//写入明细数据
						writedetail(table, upperid, tableobj[table][4])
					}
					//在收入、支出、日志表单中，选择不同的分类时，执行下面操作								
					_class.onchange = function(){
						//如果是收入和支出信息，则清空金额值
						if( table != "blog")						
							price.value = "";
						//获取选择的值
						classid = _class.value;
						//添加明细表单
						//先清空明细包含框
						detail.innerHTML = "";
						//调用添加明细表单函数，获得divDOM片段
						var div = addsubform(classid, table);
						//如果存在
						if(div){
							//定义三级标题	
							var h3 = document.createElement("h3");
							//添加标题文本
							var h3title = document.createTextNode("添加明细");
							//绑定三级标题
							h3.appendChild(h3title);
							detail.appendChild(h3);
							var subbox = document.createElement("div");
							detail.appendChild(subbox);
							//绑定明细表单项
							subbox.appendChild(div);
							//添加明细表单控制按钮
							addsubbtn(classid, table);
						}
						//添加文本区域自动伸缩外部插件
						$('textarea').elastic();
					}
					//添加明细表单
					detail.innerHTML = "";
					var div = addsubform(classid, table);
					if(div){
						//定义三级标题	
						var h3 = document.createElement("h3");
						//添加标题文本
						var h3title = document.createTextNode("添加明细");
						h3.appendChild(h3title);
						detail.appendChild(h3);	
						var subbox = document.createElement("div");
						detail.appendChild(subbox);
						//绑定明细表单项
						subbox.appendChild(div);											
						//添加明细表单控制按钮
						addsubbtn(classid, table);
					}
				}
				//快速查询表单
				else if(table == "fastquery"){
					//按月查询
					monthquery();
					//昨天查询
					yesterday();
					//按时间段查询
					time();
					//模糊查询
					mohu();
					//指定天数查询
					numday();
					//今天查询
					today();					
					//前天查询
					beforeyesterday();
					//最近3天查询
					beforeyest();
					//最近一周查询
					week();
				}
				//自定义查询表单
				else if(table == "custquery"){
					//获取自定义查询表单对象
					var orderby = document.getElementById("orderby");
					var col = document.getElementById("col");
					var allcol = document.getElementById("allcol");	
					var table0 = document.getElementById("table0");	
					var where = document.getElementById("where");	
					var whereclass = document.getElementById("whereclass");						
					
					//当选择不同的数据表时，执行操作												
					table0.onchange = function(){
						//获取选择的表名
						table0value = table0.value;
						//绑定列下拉框选项值
						showfield(col, table0value);
						//在条件文本区域绑定提示信息：分类和字段
						showwhere(where, whereclass, table0value);						
						//绑定排序下拉框选项值
						showfield(orderby, table0value);						
					}
					//绑定列下拉框选项值
					showfield(col, "out");
					//绑定排序下拉框选项值
					showfield(orderby, "out");
					//在条件文本区域绑定提示信息：分类和字段
					showwhere(where, whereclass, "out");
					fieldcoltoall(col,allcol);
					//自定义查询
					custquery();
				}
				//分类管理表单
				else if(table == "class"){
					//表格分类管理
					tableclass();
					//三级分类管理
					class3();
					//二级分类管理
					class2();	
					//一级分类管理
					class1();
					//出账分类管理
					outclass();
					//入账分类管理
					incomeclass();
					//日志分类管理
					blogclass();
					//出账明细分类管理
					outdetail();				
					//入账明细分类管理
					incomedetail();					
					//日志明细分类管理
					blogdetail();
				}
				//添加文本区域自动伸缩外部插件
				$('textarea').elastic();
			}
		})(i)
	}
	//下面添加三个导航按钮
	//隐藏或显示表单
	var hideform = document.createElement("li");
	hideform.innerHTML = "隐藏表单";
	//全局状态跟踪变量	
	window.hideform = false;
	hideform.onclick = function(){
		//获取表单对象
		var form = showformbox.firstChild;				
		if(window.hideform){
			window.hideform = false;
			showformbox.style.display = "block";
			hideform.innerHTML = "隐藏表单";
			//如果存在被单击的菜单项，则恢复被单击状态
			if(window.clickmenu)
				window.clickmenu.className = "hover";	
		}
		else{
			//如果存在表单，则允许操作
			if(form){			
				window.hideform = true;
				showformbox.style.display = "none";
				hideform.innerHTML = "显示表单";
				//当隐藏表单时，则恢复导航菜单的默认样式
				window.clickmenu = resetmenu();
			}
		}
	}
	//显示隐藏表单按钮
	menu.appendChild(hideform);

	//隐藏或显示数据表
	var hidetable = document.createElement("li");
	hidetable.innerHTML = "隐藏数据表";
	//全局状态跟踪变量	
	window.hidetable = false;
	hidetable.onclick = function(){
		if(window.hidetable){
			window.hidetable = false;
			showtablebox.style.display = "block";
			hidetable.innerHTML = "隐藏数据表";
		}
		else{
			//如果显示表格包含框中不存在内容，则不允许操作
			if(showtablebox.innerHTML != ""){
				window.hidetable = true;
				showtablebox.style.display = "none";
				hidetable.innerHTML = "显示数据表";
			}
		}
	}
	//显示隐藏表格按钮
	menu.appendChild(hidetable);
	
	//隐藏或显示数据表基本信息
	var hideinfoli = document.createElement("li");
	hideinfoli.innerHTML = "隐藏基本信息";
	//全局状态跟踪变量	
	window.hideinfoli = false;
	hideinfoli.onclick = function(){	
		if(window.hideinfoli){
			window.hideinfoli = false;
			showinfobox.style.display = "block";
			hideinfoli.innerHTML = "隐藏基本信息";
		}
		else{
			//如果显示信息包含框中不存在内容，则不允许操作			
			if(showinfobox.innerHTML != ""){
				window.hideinfoli = true;
				showinfobox.style.display = "none";
				hideinfoli.innerHTML = "显示基本信息";
			}
		}
	}
	//显示隐藏信息按钮	
	menu.appendChild(hideinfoli);
	
	//导航菜单动态效果
	menustyle(showmenubox);
}

