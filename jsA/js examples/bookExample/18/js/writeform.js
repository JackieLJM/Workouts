//===================================
//生成表单
//===================================
//参数
//table-生成的表单对应的数据表，字符串
//返回值
//返回一个对象集合
//html: 生成的HTML片段，DOM对象
//table:表单对应的数据表名称，字符串
function writeform(table){
	//返回的HTML字符串
	var html = "";
	//条件判断，确定返回什么类型的表单结构
	//写入记录表单
	if(table == "income" || table == "out" || table == "blog" ){
		html += '<form id="addform" name="addform" method="post" action="#" onsubmit="return false;">';
		html += '    <fieldset id="addbox">';
		html += '        <legend>'+ menuobj[table][1] +' </legend>';
			if(table != "blog"){
				html += '        <label for="price">金额';
				html += '            <input type="text" name="price" id="price" />';
				html += '        </label>';
			}
		html += '        <label for="class">分类';
		html += '            <select name="class" id="class">';
		html += '            </select>';
		html += '        </label>';
		html += '        <label for="remark"><span>备注</span>';
		html += '            <textarea name="remark" id="remark" ></textarea>';
		html += '        </label>';
		html += '        <span id="detail"></span>';		
		html += '        <input type="reset" name="reset" id="reset"  value="重写" /> ';
		html += '        <input type="submit" name="save" id="save" value="保存记录" />';	
		html += '    </fieldset>';
		html += '</form>	';
	}
	//分类管理
	else if(table == "class"){
		html += '<form id="class" name="classform" method="post" action="#" onsubmit="return false;">';
		html += '    <fieldset id="classbox">';
		html += '        <legend>'+ menuobj[table][1] +'</legend>';
		html += '        <div>';
		html += '            <input type="submit" name="tableclass" id="tableclass" value="表格分类管理" />';
		html += '        </div>';
		html += '        <div>';
		html += '            <input type="submit" name="outclass" id="outclass" value="出账分类管理" />';
		html += '        </div>';
		html += '        <div>';
		html += '            <input type="submit" name="incomeclass" id="incomeclass" value="入账分类管理" />';
		html += '        </div>';
		html += '        <div>';
		html += '            <input type="submit" name="blogclass" id="blogclass" value="日志分类管理" />';
		html += '        </div>';
		html += '        <div>';
		html += '           <input type="submit" name="outdetail" id="outdetail" value="出账明细分类管理" />';
		html += '        </div>';
		html += '        <div>';
		html += '            <input type="submit" name="incomedetail" id="incomedetail" value="入账明细分类管理" />';
		html += '        </div>';
		html += '        <div>';
		html += '            <input type="submit" name="blogdetail" id="blogdetail" value="日志明细分类管理" />';
		html += '        </div>';		
		html += '        <div>';
		html += '            <input type="submit" name="class1" id="class1" value="一级分类管理" />';
		html += '        </div>';
		html += '        <div>';
		html += '            <input type="submit" name="class2" id="class2" value="二级分类管理" />';
		html += '        </div>';
		html += '        <div>';
		html += '            <input type="submit" name="class3" id="class3" value="三级分类管理" />';
		html += '        </div>';
		html += '    </fieldset>';
		html += '</form>	';
	}
	//查询记录表单
	//快速查询表单	
	else if(table == "fastquery"){	
		html += '<form id="fastquery" name="fastquery" method="post" action="#" onsubmit="return false;">';
		html += '    <fieldset id="fastbox">';
		html += '        <legend>'+ menuobj[table][1] +'</legend>';
		html += '        <dl>';
		html += '            <dt>按月查询：</dt>';
		html += '            <dd>';
		html += '                <label for="table1">数据表';
		html += '                <select name="table1" id="table1">';
		for(var i=0; i<tablearray.length;i++){
			html += '                <option value="'+tablearray[i]["table"]+'">'+tablearray[i]["title"]+'</option>';
		}
		html += '                </select></label>';
		html += '                <label for="year">年份';
		html += '                <select name="year" id="year">';
		html += '                    <option value="2006">2006</option>';
		html += '                    <option value="2007">2007</option>';
		html += '                    <option value="2008">2008</option>';
		html += '                    <option value="2009">2009</option>';
		html += '                    <option value="2010">2010</option>';
		html += '                    <option value="2011"  selected="selected">2011</option>';
		html += '                    <option value="2012">2012</option>';
		html += '                    <option value="2013">2013</option>';
		html += '                    <option value="2014">2014</option>';
		html += '                    <option value="0">所有</option>';
		html += '                </select></label>';
		html += '                <label for="month">月份';
		html += '                <select name="month" id="month">';
		html += '                    <option value="1">1月</option>';
		html += '                    <option value="2">2月</option>';
		html += '                    <option value="3">3月</option>';
		html += '                    <option value="4">4月</option>';
		html += '                    <option value="5">5月</option>';
		html += '                    <option value="6">6月</option>';
		html += '                    <option value="7">7月</option>';
		html += '                    <option value="8">8月</option>';
		html += '                    <option value="9">9月</option>';
		html += '                    <option value="10">10月</option>';
		html += '                    <option value="11">11月</option>';
		html += '                    <option value="12">12月</option>';
		html += '                    <option value="0" selected="selected" >所有</option>';
		html += '                </select></label>';
		html += '                <input type="submit" name="save1" id="save1" value="查询" />';
		html += '            </dd>';
		html += '        </dl>';
		html += '        <dl>';
		html += '            <dt>按时间段查询：</dt>';
		html += '            <dd>';
		html += '                <label for="table2">数据表';
		html += '                <select name="table2" id="table2">';
		for(var i=0; i<tablearray.length;i++){
			html += '                <option value="'+tablearray[i]["table"]+'">'+tablearray[i]["title"]+'</option>';
		}
		html += '                </select></label>';
		html += '                <label for="begin">起始时间';
		html += '                <input type="text" name="begin" id="begin" value="2011-1-1 0:0:0" /></label>';
		html += '                <label for="end">结束时间';
		html += '                <input type="text" name="end" id="end" value="2011-12-31 0:0:0" /></label>';
		html += '                <input type="submit" name="save2" id="save2" value="查询" />';
		html += '            </dd>';
		html += '        </dl>';
		html += '        <dl>';
		html += '            <dt>模糊查询：</dt>';
		html += '            <dd>';
		html += '                <label for="table3">数据表';    
		html += '                <select name="table3" id="table3">';
		for(var i=0; i<tablearray.length;i++){
			html += '                <option value="'+tablearray[i]["table"]+'">'+tablearray[i]["title"]+'</option>';
		}
		html += '                </select></label>';
		html += '                <label for="key">关键词';
		html += '                <input type="text" name="key" id="key" value="" /></label>';
		html += '                <input type="submit" name="save3" id="save3" value="查询" />';		
		html += '                <span class="gray">（提示：多个关键词之间可以以空格分隔）</span>';
		html += '            </dd>';
		html += '        </dl>';
		html += '        <dl>';
		html += '            <dt>最近查询：</dt>';
		html += '            <dd>';
		html += '                <label for="table4">数据表';     
		html += '                <select name="table4" id="table4">';
		for(var i=0; i<tablearray.length;i++){
			html += '                <option value="'+tablearray[i]["table"]+'">'+tablearray[i]["title"]+'</option>';
		}
		html += '                </select></label>';
		html += '                <input type="submit" name="today" id="today" value="查询今天记录" />';
		html += '                <input type="submit" name="yesterday" id="yesterday" value="查询昨天记录" />';
		html += '                <input type="submit" name="beforeyest" id="beforeyest" value="查询前天记录" />';
		html += '                <input type="submit" name="day3" id="day3" value="查询近三天记录" />';
		html += '                <input type="submit" name="week" id="week" value="查询近一周记录" />';
		html += '            </dd>';
		html += '        </dl>';
		html += '        <dl>';
		html += '            <dt>指定天数查询：</dt>';
		html += '            <dd>';
		html += '                <label for="table5">数据表';           
		html += '                <select name="table5" id="table5">';
		for(var i=0; i<tablearray.length;i++){
			html += '                <option value="'+tablearray[i]["table"]+'">'+tablearray[i]["title"]+'</option>';
		}
		html += '                </select></label>';
		html += '                 <label for="days">最近';
		html += '                <input type="text" name="days" id="days" value="" />';
		html += '                天</label>';
		html += '                <input type="submit" name="save5" id="save5" value="查询" />';
		html += '            </dd>';
		html += '        </dl>';
		html += '    </fieldset>';
		html += '</form>';
	}
	//自定义查询表单
	else if(table == "custquery"){	
		html += '<form id="custquery" name="custquery" method="post" action="#" onsubmit="return false;">';
		html += '    <fieldset id="custbox">';
		html += '        <legend>'+ menuobj[table][1] +'</legend>';
		html += '        <div>';
		html += '            <label for="table0">数据表';
		html += '            <select name="table0" id="table0">';
		for(var i=0; i<tablearray.length;i++){
			html += '                <option value="'+tablearray[i]["table"]+'">'+tablearray[i]["title"]+'</option>';
		}
		html += '            </select></label>';
		html += '        </div>';
		html += '        <div>';
		html += '            <label for="col">显示列名：';
		html += '            <select name="col" size="5" multiple="multiple" id="col">';
		html += '            </select></label>';
		html += '            <label for="allcol">选择所有列';
		html += '            <input name="allcol" id="allcol" type="checkbox" value="*" checked="checked" /></label>';
		html += '        </div>';
		html += '        <div>';
		html += '            <label for="row">显示行数：';
		html += '            <select name="row" id="row">';
		html += '                <option value="1">第1条</option>';
		html += '                <option value="5">前5条</option>';
		html += '                <option value="10">前10条</option>';
		html += '                <option value="20">前20条</option>';
		html += '                <option value="50">前50条</option>';
		html += '                <option value="0" selected="selected" >所有条</option>';
		html += '            </select></label>';
		html += '        </div>';
		html += '        <div>';
		html += '            <label for="where">定义条件（可选项）：';
		html += '            <span id="whereclass"></span>';
		html += '            <textarea name="where" cols="40" rows="8" id="where"></textarea></label>';
		html += '        </div>';
		html += '        <div>';
		html += '            <label for="orderby">设置排序：';
		html += '            <select name="orderby" id="orderby">';
		html += '            </select></label><label for="order">';
		html += '            <select name="order" id="order">';
		html += '                <option value="asc">升序</option>';
		html += '                <option value="desc" selected="selected">降序</option>';
		html += '            </select></label>';
		html += '        </div>';
		html += '        <div>';
		html += '        <input type="reset" value="清空" />';
		html += '        <input type="submit" name="save0" id="save0" value="自定义查询" />';  
		html += '        <div class="gray">（提示：可任意设置条件，默认为查询出账表中包含的所有记录）</div>';
		html += '    </fieldset>';
		html += '</form>';
	}
	//返回表单结构字符串，以及操作表的名称
	return { html: html, table: table };	
}

