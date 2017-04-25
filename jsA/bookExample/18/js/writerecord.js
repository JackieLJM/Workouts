//===================================
//把表单中的数据写入到数据库
//===================================
//===================================
//写入收入和支出记录
function writerecord(table){
	//初始化参数值
	var table = table || "out";
	//获取表单对象	
	var price = document.getElementById("price");
	var _class = document.getElementById("class");
	var remark = document.getElementById("remark");
	var save  = document.getElementById("save");
	//获取输入值
	var pricevalue = price.value;
	if(_class){
		var classvalue = _class.value;
	}
	else{
		var classvalue = 0;		
	}
	var remarkvalue = remark.value;
	//检测是否输入金额
	if(pricevalue == "" || pricevalue == undefined || pricevalue == null){
		alert("请输入金额");
		price.focus();
		return false;
	}
	if(isNaN(parseFloat(pricevalue))){
		alert("输入的金额不是数字，请重新输入");
		price.focus();
		return false;			
	}
	//设计写入记录的SQL
	var sql = "insert into "+table+"(price,class,remark) values(" + pricevalue + "," + classvalue + ",'" + remarkvalue + "')"; 
	//执行写入记录操作
	execute(sql);
	//查询写入的记录
	sql = "select top 1 * from "+table+" order by id desc";
	var rs = requeryrs(sql);
	//验证是否真正、准确的写入数据
	if(!!rs && parseFloat(pricevalue) == parseFloat(rs("price")) && parseFloat(classvalue) == parseFloat(rs("class"))){
		alert("存储成功\n    金额："+parseFloat(pricevalue).toFixed(2)+"元\n    分类："+rs("class")+"\n    描述："+rs("remark"));
		//返回写入记录的编号
		var id = rs("id");
		closers(rs);
		return  id;			
	}
	else{
		alert("写入存在问题：\n    请核查 一下"+table+" 数据表，看是否真正写入记录。");
		//返回写入记录的编			
		return  null;
	}
}

//===================================
//写入日志记录
function writeblog(table){
	//初始化参数值
	var table = table || "blog";
	//获取表单对象	
	var _class = document.getElementById("class");
	var remark = document.getElementById("remark");
	var save  = document.getElementById("save");
	//获取输入值
	if(_class){
		var classvalue = _class.value;
	}
	else{
		var classvalue = 0;		
	}
	var remarkvalue = remark.value;
	//检测是否输入金额
	if(remarkvalue == "" || remarkvalue == undefined || remarkvalue == null){
		alert("请写具体的内容。");
		remark.focus();
		return false;
	}
	//设计写入记录的SQL
	var sql = "insert into "+table+"(class,remark) values(" +  classvalue + ",'" + remarkvalue + "')"; 
	//执行写入记录操作
	execute(sql);
	//查询写入的记录
	sql = "select top 1 * from "+table+" order by id desc";
	var rs = requeryrs(sql);
	//验证是否真正、准确的写入数据
	if(!!rs && parseFloat(classvalue) == parseFloat(rs("class"))){
		alert("存储成功\n   分类："+rs("class")+"\n    描述："+rs("remark"));
		//返回写入记录的编号
		return  rs("id");			
	}
	else{
		alert("写入存在问题：\n    请核查 一下"+table+" 数据表，看是否真正写入记录。");
		//返回写入记录的编			
		return  null;
	}
}

//===================================
//写入明细表
function writedetail(table, upperid, subtable){
	//初始化参数值
	var table = table || "out";
	//获取表单对象	
	var detail = document.getElementById("detail");
	var subclass = document.getElementsByClassName("subclass");
	var subremark= document.getElementsByClassName("subremark");
	if( table != "blog"){
		var price= document.getElementById("price");	
		var subprice= document.getElementsByClassName("subprice");	
		//获取金额和说明文本框
		var sumprice = 0;
		for(var i=0;i<subprice.length;i++){
			//合计分类金额
			sumprice += parseFloat(subprice[i].value);			
		}
		if(parseFloat(price.value) != sumprice  && subprice.length>1 ){
			if(confirm("总金额与各项消费金额之和不相等，是否在数据库中改写总金额为 " + sumprice + "？")){
				var  sql = "update "+ table +" set  price = " + sumprice + " where id = " + upperid;
				execute(sql);
			}
		}
	}
	//遍历明细表单集合，录入数据
	for(var i=0; i<subclass.length; i++){
		subclassvalue = subclass[i].value;
		subremarkvalue = subremark[i].value;
		if( table != "blog"){
			subpricevalue = subprice[i].value;
			if(!isNaN(parseFloat(subpricevalue))){
				var sql = "insert into "+ subtable +"(price,class,upperid, remark) values(" + parseFloat(subpricevalue ) + "," + subclassvalue + "," + upperid + ",'" + subremarkvalue + "')"; 
				execute(sql);
				//核实是否真正和准确写入
				sql = "select top 1 * from "+ subtable +" order by id desc";
				var rs = requeryrs(sql);					
				if(parseFloat(subpricevalue) != parseFloat(rs("price"))){
					alert("输入存在问题：\n    请核查一下"+ subtable +"数据表，看是否真正写入数据表");
					closers(rs);
					break;
				}
				closers(rs);
			}
		}
		else{
			var sql = "insert into "+ subtable +"(class,upperid, remark) values(" + subclassvalue + "," + upperid + ",'" + subremarkvalue + "')"; 
			execute(sql);
			//核实是否真正和准确写入
			sql = "select top 1 * from "+ subtable +" order by id desc";
			var rs = requeryrs(sql);					
			if(parseFloat(subpricevalue) != parseFloat(rs("price"))){
				alert("输入存在问题：\n    请核查一下"+ subtable +"数据表，看是否真正写入数据表");
				closers(rs);
				break;
			}			
			closers(rs);
		}
	}
}


	