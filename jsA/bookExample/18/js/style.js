//===================================
//页面样式和效果
//===================================
//===================================
//表格行动态背景色
//参数说明：
//fcolor表示默认行背景色
//bcolor表示获取焦点行背景色
//table表示设置样式的表格
var tablebg = function(fcolor,bcolor,table){
	//默认table参数值
	var table = table || document;
	//设置表格行动态背景样式
	var tbody = document.getElementsByTagName("tbody");
	for(var i=0;i<tbody.length;i++){
		var tr = tbody[i].getElementsByTagName("tr");
		if(tr){
			for(var i=0;i<tr.length;i++){
				tr[i].onclick = (function(o){
					var bg = true;
					return function(){
						if(!bg){
							o.style.background = bcolor;
							bg = true;
						}
						else{
							o.style.background = fcolor;
							bg = false;
						}	
					}
				})(tr[i]);
			}
		}
	}
}

//===================================
//导航菜单动态效果
//参数说明：
//tab：导航菜单包含框
var menustyle = function(showmenubox){
	var ul = showmenubox.getElementsByTagName("ul")[0];
    var uli = ul.getElementsByTagName("li");
    for(var i=0; i<uli.length; i++){
        uli[i].className = "normal";
    }
    for(var j = 0; j < uli.length; j ++ ){
		var lititle = uli[j].innerHTML;
		if( lititle == "隐藏基本信息" && !window.hidetableinfo)
			continue;
		if( lititle == "隐藏数据表" && !window.hidetable)
			continue;
		if( lititle == "隐藏表单" && !window.hideform)
			continue;			
        (function(j){
            addEvent(uli[j],"click", function(){
                for(var n = 0; n < uli.length; n ++ ){
                    uli[n].className = "normal";
                }
                uli[j].className = "hover";
            });
        })(j);
    }
    for(var j = 0; j < uli.length; j ++ ){
		var color = [];
		color[j] = uli[j].style.color;
        (function(j){
            addEvent(uli[j],"mouseover", function(){
                for(var n = 0; n < uli.length; n ++ ){
                    uli[n].style.color = color[n];
                }
				color[j] = uli[j].style.color;
                uli[j].style.color = "red";
            });
            addEvent(uli[j],"mouseout", function(){
                uli[j].style.color = color[j];
            });			
        })(j);
    }
}

//===================================
//恢复导航菜单默认样式
//返回
//返回导航菜单中被选中的菜单项对象
var resetmenu = function(){
	//当隐藏表单时，则恢复导航菜单的默认样式
	var ul = showmenubox.getElementsByTagName("ul")[0];
	var uli = ul.getElementsByTagName("li");
	var tempmenu = null;
	for(var n = 0; n < uli.length; n ++ ){
		//记录当前被单击的菜单项
		if(uli[n].className == "hover")
			tempmenu = uli[n];
		uli[n].className = "normal";
	}
	return tempmenu;
}