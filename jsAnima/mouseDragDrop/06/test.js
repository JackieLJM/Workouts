//装载col下的元素   
var colArray = []   
//移动时间的ID   
var moveEndInterval = 0;   
//表示创建层是否已经存在   
var am=null;   
//标识头部是否已经初始化   
var isInitedHead=false;   
//保存便签失败后进行重新保存的时间   
var timeout = 3000;   
//记录设置层的具体HTML，以便设置完成后还原   
var msgBlockHTML = "";   
//工具方法，使用ID获取变量   
var $ = function(id) {return document.getElementById(id);};   
/**  
 * 标题栏动作设置  
 */  
var titleAction =   
{   
    "obj":null,   
    "init":function(title_i){   
        title_i.onmousedown=titleAction.start;   
        if ( isNaN(parseInt(createDiv().style.left)) ) {   
            createDiv().style.left="0px";   
        }   
        if ( isNaN(parseInt(createDiv().style.top)) ) {   
            createDiv().style.top="0px";   
        }   
        title_i.onDragStart = new Function();   
        title_i.onDragEnd = new Function();   
        title_i.onDrag = new Function();   
    },   
    "start":function(currEvent){   
        //当前动作对象   
        var currTitle = titleAction.obj = this;   
        currEvent = titleAction.fixE(currEvent);   
        var divLeft = parseInt(createDiv().style.left);   
        var divTop = parseInt(createDiv().style.top);   
        //执行自定义事件   
        currTitle.onDragStart(divLeft,divTop,currEvent.clientX,currEvent.clientY);   
        //保留当前鼠标的位置   
        currTitle.lastMouseX = currEvent.clientX;   
        currTitle.lastMouseY = currEvent.clientY;   
        //添加事件   
        document.onmousemove = titleAction.drag;   
        document.onmouseup = titleAction.end;   
    },   
    "drag":function(currEvent){   
        currEvent=titleAction.fixE(currEvent);   
        //当前动作对象   
        var currTitle=titleAction.obj;   
        //获取鼠标当前的位置   
        var mouseX = currEvent.clientX;   
        var mouseY = currEvent.clientY;   
        //获取创建层的位置,并移动到新的位置   
        var divLeft = parseInt(createDiv().style.left);   
        var divTop = parseInt(createDiv().style.top);   
        var createDivX = mouseX-currTitle.lastMouseX+divLeft;   
        var createDivY = mouseY-currTitle.lastMouseY+divTop;   
        createDiv().style.left = createDivX+"px";   
        createDiv().style.top = createDivY+"px";   
        //保留当前鼠标的位置   
        currTitle.lastMouseX = mouseX;   
        currTitle.lastMouseY = mouseY;   
        //执行自定义事件，移动原来DIV的顺序   
        currTitle.onDrag(createDivX,createDivY,currEvent.clientX,currEvent.clientY);   
        return false  
    },   
    "end":function(){   
        document.onmousemove=null;   
        document.onmouseup=null;   
        titleAction.obj.onDragEnd(parseInt(createDiv().style.left),parseInt(createDiv().style.top));   
        titleAction.obj=null;   
    },   
    "fixE":function(actionevent){   
        if (typeof actionevent=="undefined") {   
            actionevent=window.event;   
        }   
        if (typeof actionevent.layerX=="undefined") {   
            actionevent.layerX=actionevent.offsetX;   
        }   
        if (typeof actionevent.layerY=="undefined") {   
            actionevent.layerY=actionevent.offsetY;   
        }   
        return actionevent   
    }   
};   
  
/**  
 * 初始化Head  
 */  
function _upc(cols)   
{   
    initHead([$("col_l"),$("col_r")]);   
}   
/**  
 * 获取HttpRequest  
 */  
function getXMLHttpObj()   
{   
    var a=null;   
    if(window.ActiveXObject)   
    {   
        a=new ActiveXObject("Msxml2.XMLHTTP");   
        if(!a)   
        {   
            a=new ActiveXObject("Microsoft.XMLHTTP");   
        }   
    }   
    else if(window.XMLHttpRequest)   
    {   
        a=new XMLHttpRequest();   
    }   
    return a;   
}   
  
  
  
/**  
 * 创建一个层，如果已经存在就直接返回  
 */  
function createDiv()   
{   
    if(!am)   
    {   
        am=document.createElement("DIV");   
        am.style.display="block";   
        am.style.position="absolute";   
        am.style.cursor="move";   
        am.style.backgroundColor="#ffffff";   
        am.style.paddingBottom="0px";   
        document.body.appendChild(am)   
    }   
    return am   
}   
  
  
/**  
 * 初始化Head  
 */  
function initHead(td){   
    if(isInitedHead)   
        return;   
    isInitedHead=true;   
    colArray=td;   
       
    for(var i=0;i<colArray.length;i++)   
    {   
        var divModule = colArray[i].childNodes;   
        for(var j=0;j<divModule.length;j++)   
        {   
            var module_i = divModule[j]   
            var head_i = $(module_i.id+"_head");   
            if(!head_i){   
                continue;   
            }      
            head_i.module = module_i;   
            head_i.onmouseover = function(){var op_i=$(this.module.id+"_op");if(op_i)op_i.style.display="inline";}   
            head_i.onmouseout = function(){var op_i=$(this.module.id+"_op");if(op_i)op_i.style.display="none";}   
            //设置title宽度   
            fixTitleWidth(module_i.id);   
            var title_i = $(module_i.id+"_title");   
            title_i.module = module_i;   
            //初始化标题栏   
            titleAction.init(title_i);   
               
            //定义开始移动的事件（自定义，在titleAction/start中被执行）   
            title_i.onDragStart=function(divLeft,divTop) {   
                    clearInterval(moveEndInterval);   
                    //获取模块   
                    var module_i=this.module;   
                    //设置当与模块平级的相关模块（含本模块）的pagePosLeft与pagePosTop   
                    setCurrAfterOffset(module_i);   
                    module_i.origNextSibling=module_i.nextSibling;   
                    var module_i_copy=createDiv();   
                    module_i_copy.style.left=getOffset(module_i,"Left");   
                    module_i_copy.style.top=getOffset(module_i,"Top");   
                       
                    module_i_copy.style.height=module_i.offsetHeight;   
                    module_i_copy.style.width=module_i.offsetWidth;   
                    module_i_copy.style.display="block";   
                    module_i_copy.style.opacity=0.8;   
                    module_i_copy.style.filter="alpha(opacity=80)";   
                    module_i_copy.innerHTML=module_i.innerHTML;   
                    module_i_copy.className=module_i.className;   
                    this.dragged=false  
            };   
            title_i.onDrag = function(divLeft,divTop){   
                setModulePos(this.module,divLeft,divTop);   
                this.dragged=true;   
            };   
            title_i.onDragEnd = function(divLeft,divTop){   
                //移动过   
                if(this.dragged){   
                    //设置循环调用，将复制的模块移动到指定的位置   
                    moveEndInterval=moveEndSetInterval(this.module,150,15);   
                }else{   
                    createDivStyle();   
                }   
                //这里做AJAX操作提交改变到数据库   
            }   
        }   
    }   
    //根据cookie去初始化模块的伸缩   
    resizeByCookie();   
    //初始化模块的相关设置   
    initModuleByCookie();   
}   
/**  
 * 初始化模块的相关属性  
 */  
function initModuleByCookie(){   
    var my_width_1 = getCookie("my_width_1");   
    var isSetTitleWidth = false;   
    if(my_width_1&&my_width_1!=65){   
        $("col_l").width = my_width_1+"%";   
        $("col_r").width = (100-my_width_1)+"%";   
        //重新设置TITLE宽度   
        isSetTitleWidth = true;   
    }   
    for(var i=0;i<colArray.length;i++)   
    {   
        for(var j=0;j<colArray[i].childNodes.length;j++)   
        {   
            var module_i=colArray[i].childNodes[j];   
            var module_number = module_i.id.substr(7,module_i.id.length)   
            var module_ul = $("module_"+module_number+"_ul");   
            if(!module_ul){   
                continue;   
            }   
               
            var my_nums_1 = getCookie("my_nums_1_"+module_number);   
            var my_scroll_1 = getCookie("my_scroll_1_"+module_number);   
            if(my_nums_1&&my_nums_1!=5){   
                $("module_"+module_number+"_ul").style.height = 20*my_nums_1+"px";   
            }   
            if(my_scroll_1){   
                if(module_ul.getElementsByTagName("ul").length>0){   
                    if(module_ul.getElementsByTagName("marquee").length>0){   
                        $("module_"+module_number+"_ul").childNodes[0].innerHTML = "<marquee height='100%' direction='up' behavior=scroll scrollamount=2 scrolldelay=100 onmouseover='this.stop()' onmouseout='this.start()' border=0>"+module_ul.innerHTML+"</marquee>";   
                    }   
                }   
            }   
            //重新设置宽度   
            if(isSetTitleWidth){   
                fixTitleWidth(module_i.id);   
            }   
        }   
    }   
}   
/**  
 * 将createDiv移动到指定层的位置  
 * allTime:移动消耗总的时间  
 * allCount:移动消耗总的循环次数  
 */  
function moveEndSetInterval(module_i,allTime,allCount){   
    var divLeft =  parseInt(createDiv().style.left);   
    var divTop = parseInt(createDiv().style.top);   
    var oneMoveLeft = (divLeft-this.getOffset(module_i,"Left"))/allCount;   
    var oneMoveTop = (divTop-this.getOffset(module_i,"Top"))/allCount;   
    return setInterval(   
        function(){   
            if(allCount<1){   
                clearInterval(moveEndInterval);   
                createDivStyle();   
                //设置宽度   
                fixTitleWidth(module_i.id);   
                return;   
            }   
            allCount--;   
            divLeft-=oneMoveLeft;   
            divTop-=oneMoveTop;   
            createDiv().style.left = divLeft;   
            createDiv().style.top = divTop;   
        }   
    ,allTime/allCount);   
}   
function createDivStyle()   
{   
    createDiv().style.display="none";   
}   
/**  
 * 获取最近的模块并改变原先DIV的顺序  
 */  
function setModulePos(obj,posLeft,posTop)   
{   
    var module=null;   
    var referDistance=100000000;   
    //获取离复制层最近的模块   
    for(var i=0;i<colArray.length;i++)   
    {   
        for(var j=0;j<colArray[i].childNodes.length;j++)   
        {   
            var module_i=colArray[i].childNodes[j];   
            //过滤自己   
            if(module_i==obj){   
                continue;   
            }   
            var currentDistance=Math.sqrt(Math.pow(posLeft-module_i.pagePosLeft,2)+Math.pow(posTop-module_i.pagePosTop,2));   
            if(isNaN(currentDistance))   
                continue;   
            if(currentDistance<referDistance)   
            {   
                referDistance=currentDistance;   
                module=module_i;   
            }   
        }   
    }   
    //得到的最近的模块不为NULL&&不是obj相邻的模块   
    if(module!=null&&obj.nextSibling!=module)   
    {   
        module.parentNode.insertBefore(obj,module);   
    }   
}   
  
/**  
 * 获取在body范围内的Offset  
 */  
function getOffset(obj,leftOrTop)   
{   
    var offsetValue=0;   
    while(obj!=null)   
    {   
        offsetValue+=obj["offset"+(leftOrTop=="Left"?"Left":"Top")];   
        obj=obj.offsetParent   
    }   
    return offsetValue   
}   
/**  
 * 设置当与模块平级的相关模块（含本模块）的pagePosLeft与pagePosTop  
 */  
function setCurrAfterOffset(currModule_i){   
    for(var i=0;i<colArray.length;i++)   
    {   
        var divModule = colArray[i].childNodes;   
        var oneHeigth = 0;   
        for(var j=0;j<divModule.length;j++)   
        {   
            var module_i = divModule[j]   
            if(!module_i.id&&module_i.name!="fill"){   
                continue;   
            }   
            if(module_i==currModule_i){   
                oneHeigth = module_i.offsetHeight;   
            }   
            module_i.pagePosLeft = this.getOffset(module_i,"Left");   
            module_i.pagePosTop = this.getOffset(module_i,"Top")-oneHeigth;   
        }   
    }   
}   
  
  
/**  
 * 设置title的宽度  
 */  
function fixTitleWidth(module_id)   
{   
    if(!$(module_id)) return;   
    var titleWidth = 0;   
    while($(module_id+"_head").scrollWidth - $(module_id+"_text").scrollWidth - 120 - 40 - titleWidth<0||$(module_id+"_head").scrollWidth - $(module_id+"_text").scrollWidth - 120 - 40 - titleWidth>10){   
        titleWidth = $(module_id+"_head").scrollWidth - $(module_id+"_text").scrollWidth - 120 - 40;   
        $(module_id+"_title").style.width = titleWidth+"px";   
    }   
}   
  
/*******************************************关于模块上的工具按钮**********************************/  
/**  
 * 获取cookie  
 */  
function getCookie(name)   
{   
     var arr = document.cookie.split("; ");   
     for(i=0;i<arr.length;i++)   
     {   
         if (arr[i].split("=")[0] == name)   
         {   
            return unescape(arr[i].split("=")[1]);   
         }     
     }     
     return null;   
}   
/**  
 * 设置cookie  
 */  
function setCookie(name,value) {   
    var today = new Date();   
    var expires = new Date();   
    expires.setTime(today.getTime() + 1000*60*60*24*2000);   
    document.cookie = name + "=" + escape(value) + "; expires=" + expires.toGMTString();   
}   
  
/**  
 * 伸缩模块，并记录到cookie  
 */  
function _resize(module_id,isExpand)   
{   
    var module_i=$("module_"+module_id);   
    var head_i=$("module_"+module_id+"_head");   
    var body_i=$("module_"+module_id+"_body");   
    var img_i=$("img_resize_"+module_id);   
    var my_cookie=getCookie("my_expand_1");   
    my_cookie = (my_cookie==null || my_cookie=="undefined") ? "" : my_cookie;//alert(my_cookie)   
    if(isExpand==null){   
        if(body_i.style.display=="none")   
        {   
            module_i.className=module_i.className.substr(0,module_i.className.lastIndexOf(" "));   
            head_i.className=head_i.className.substr(0,head_i.className.lastIndexOf(" "));   
            body_i.style.display="block";   
            img_i.src=img_i.src.substr(0,img_i.src.lastIndexOf("/")+1)+"expand_arrow.png";   
            img_i.title="折叠";   
               
            if(my_cookie.indexOf(module_id+",") == 0)   
               my_cookie = my_cookie.replace(module_id+",", "");   
            else if(my_cookie.indexOf(","+module_id+",") > 0)   
               my_cookie = my_cookie.replace(","+module_id+",", ",");      
        }   
        else if(body_i.style.display!="none")   
        {   
            module_i.className=module_i.className+" listColorCollapsed";   
            head_i.className=head_i.className+" moduleHeaderCollapsed";   
            body_i.style.display="none";   
            img_i.src=img_i.src.substr(0,img_i.src.lastIndexOf("/")+1)+"collapse_arrow.png";   
            img_i.title="展开";   
               
            if(my_cookie.indexOf(module_id+",") != 0 && my_cookie.indexOf(","+module_id+",") <= 0)   
               my_cookie += module_id+",";   
        }   
    }else if(isExpand==true){   
            if(body_i.style.display=="none"){   
                module_i.className=module_i.className.substr(0,module_i.className.lastIndexOf(" "));   
                head_i.className=head_i.className.substr(0,head_i.className.lastIndexOf(" "));   
                body_i.style.display="block";   
                img_i.src=img_i.src.substr(0,img_i.src.lastIndexOf("/")+1)+"expand_arrow.png";   
                img_i.title="折叠";   
                   
                if(my_cookie.indexOf(module_id+",") == 0)   
                   my_cookie = my_cookie.replace(module_id+",", "");   
                else if(my_cookie.indexOf(","+module_id+",") > 0)   
                   my_cookie = my_cookie.replace(","+module_id+",", ",");   
            }   
    }else if(isExpand==false){   
        if(body_i.style.display!="none")   
        {   
            module_i.className=module_i.className+" listColorCollapsed";   
            head_i.className=head_i.className+" moduleHeaderCollapsed";   
            body_i.style.display="none";   
            img_i.src=img_i.src.substr(0,img_i.src.lastIndexOf("/")+1)+"collapse_arrow.png";   
            img_i.title="展开";   
               
            if(my_cookie.indexOf(module_id+",") != 0 && my_cookie.indexOf(","+module_id+",") <= 0)   
               my_cookie += module_id+",";   
        }      
    }   
     setCookie("my_expand_1", my_cookie);   
}   
  
/**  
 * 伸缩所有的模块,并记录到cookie  
 */  
function resize_all()   
{   
    var ima_all_resize = $("img_all_resize");   
    var imgs=document.getElementsByTagName("IMG");      
    var imgsrc = img_all_resize.src;   
    var lastIndex = img_all_resize.src.lastIndexOf("/");   
    var isExpand = false;   
    if(imgsrc.substr(lastIndex+1,imgsrc.length)=="collapse_arrow.png")   
    {   
        img_all_resize.src=imgsrc.substr(0,lastIndex+1)+"expand_arrow.png";   
        isExpand = true;   
        setCookie("my_expand_all_1", "1");   
    }   
    else  
    {   
        img_all_resize.src=imgsrc.substr(0,lastIndex+1)+"collapse_arrow.png";   
        isExpand = false;   
        setCookie("my_expand_all_1", "0");   
    }   
    //调整所有模块   
    for(var i=0;i<imgs.length;i++)   
    {   
        if(imgs[i].id.substr(0,11)!="img_resize_")   
            continue;   
        var module_id=imgs[i].id.substr(11,imgs[i].id.length);   
        _resize(module_id,isExpand);   
    }   
}   
  
/**  
 * 根据cookie记录来初始化伸缩  
 */  
function resizeByCookie(){   
    //设置resize_all   
    var mycookie_all = getCookie("my_expand_all_1");   
    if(mycookie_all!=null&&mycookie_all!=""){   
        var ima_all_resize = $("img_all_resize");   
        var imageName = mycookie_all=="1"?"expand_arrow.png":"collapse_arrow.png";   
        var imgsrc = img_all_resize.src;   
        var lastIndex = img_all_resize.src.lastIndexOf("/");   
        img_all_resize.src=imgsrc.substr(0,lastIndex+1)+imageName;   
    }   
       
    //设置resize   
    var mycookie = getCookie("my_expand_1");   
    if(mycookie!=null&&mycookie!=""){   
        var expands_id = mycookie.split(",");   
        for(var i=0;i<expands_id.length-1;i++){   
            var module_id = expands_id[i];   
            var module_i=$("module_"+module_id);   
            var head_i=$("module_"+module_id+"_head");   
            var body_i=$("module_"+module_id+"_body");   
            var img_i=$("img_resize_"+module_id);   
            module_i.className=module_i.className+" listColorCollapsed";   
            head_i.className=head_i.className+" moduleHeaderCollapsed";   
            body_i.style.display="none";   
            img_i.src=img_i.src.substr(0,img_i.src.lastIndexOf("/")+1)+"collapse_arrow.png";   
            img_i.title="展开";   
        }   
    }   
}   
  
/**  
 * 翻页  
 */  
function nextPage(module_id,page){   
    var module_Ul=$('module_'+module_id+'_ul');   
    if(!module_Ul)   return;   
       
    if(module_Ul.currPageIndex==null||module_Ul.currPageIndex=="undefined"){   
        module_Ul.currPageIndex = 1;   
    }   
    //进行ajax请求数据   
    _sendXMLGetRequest("http://192.168.1.108:8081/JLEAP/mainframe/test.jsp",module_id,"nextPage");   
}   
  
/**  
 * 请求数据,请求方式为Get  
 * type:请求的自定义类型  
 */  
function _sendXMLGetRequest(URL,paramtes,type){   
    var xmlHttpObj=getXMLHttpObj();   
    xmlHttpObj.open("GET",URL,true);   
    xmlHttpObj.onreadystatechange=function(){   
        if(xmlHttpObj.readyState==4)   
        {   
            //请求下页数据   
            if(type == "nextPage"){   
                showNextPage(paramtes,xmlHttpObj.responseText);   
            }else if(type = "_del"){   
                showDelMoudle();   
            }   
        }   
    }   
    xmlHttpObj.send(null);   
}   
  
/**  
 * 请求数据,请求方式为POST  
 * type:请求的自定义类型  
 */  
function _sendXMLPostRequest(URL,paramtes,type){   
    var xmlHttpObj = getXMLHttpObj();   
    xmlHttpObj.open("POST", URL,true);   
    xmlHttpObj.setRequestHeader("Method", "POST notes.php HTTP/1.1");   
    xmlHttpObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");   
    xmlHttpObj.onreadystatechange = function() {   
            if (xmlHttpObj.readyState == 4){   
                //保存便签   
                if(type=="saveNotes"){   
                    showSaveNotes(xmlHttpObj);   
                }   
            }   
    };   
    xmlHttpObj.send(paramtes);   
}   
/**  
 * 保存便签内容  
 */  
function saveNotes()   
{   
   alert("999999990");   
   var paramtes = "CONTENT="+encodeURIComponent($("note_1").value);   
   _sendXMLPostRequest("http://192.168.1.108:8081/JLEAP/mainframe/test.jsp",paramtes,"saveNotes");   
}   
  
/**  
 * 保存便签后的操作  
 */  
function showSaveNotes(xmlHttpObj){   
    var s;   
    try {s = xmlHttpObj.status;}catch (ex) {   
       alert(ex.description);   
    }   
    if (s == 200){   
       if(xmlHttpObj.responseText.substr(0,3)!="+OK"){   
          alert("保存便签内容错误，错误信息：\n"+xmlHttpObj.responseText);   
          window.setTimeout("saveNotes()", timeout);   
          timeout = timeout*2;   
       }   
       else{   
          timeout=3000;   
       }   
    }   
    else{   
       alert("保存便签内容错误，错误代码："+s);   
       window.setTimeout("save_notes()", timeout);   
       timeout = timeout*2;   
    }   
}   
/**  
 * 显示相关下页数据  
 */  
function showNextPage(module_id,responseText){   
       
}   
  
/**  
 * 删除模块后的动作  
 */  
function showDelMoudle(){   
  
}   
  
/**  
 * 删除模块  
 */  
function _del(a)   
{   
    msg="确认不显示该模块么?";   
    if(window.confirm(msg))   
    {   
        var module=$("module_"+a);   
        if(module)   
            module.style.display="none";   
        _sendXMLGetRequest("http://192.168.1.108:8081/JLEAP/mainframe/test.jsp",null,"_del")   
    }   
}   
/**  
 * 模块设置  
 */  
function _edit(module_id)   
{   
     show_msg("optionBlock");       
     $("optionBlockTitle").innerText=$("module_"+module_id+"_text").innerText+" 模块选项";   
     $('display_lines').focus();   
     $('display_lines').value=lines_per_page(module_id);   
     $('scroll').checked=getCookie("my_scroll_1_"+module_id)=="true";   
     var my_width_1 = parseInt(getCookie("my_width_1"))   
     $('col_width').value=my_width_1?my_width_1:65;   
     $('module_id').value=module_id;   
}   
  
/**  
 * 显示覆盖层和设置层  
 */  
function show_msg(msgBlock)   
{   
   msgBlockHTML = $(msgBlock).innerHTML;   
   $("overlay").style.display = 'block';   
   $(msgBlock).style.display = 'block';   
  
   var bb=(document.compatMode && document.compatMode!="BackCompat") ? document.documentElement : document.body;   
   if(document.compatMode && document.compatMode!="BackCompat")   
   {   
      $("overlay").style.width = bb.scrollWidth+"px";   
      $("overlay").style.height = bb.scrollHeight+"px";   
   }   
   else  
   {   
      $("overlay").style.width = bb.scrollWidth+"px";   
      $("overlay").style.height = bb.scrollHeight+"px";   
   }   
      
   $(msgBlock).style.left = ((bb.offsetWidth - $(msgBlock).offsetWidth)/2)+"px";   
   $(msgBlock).style.top  = (60 + bb.scrollTop)+"px";   
}   
/**  
 * 隐藏覆盖层和设置层，并做还原处理  
 */  
function hide_msg(msgBlock)   
{   
   $(msgBlock).innerHTML = msgBlockHTML;   
   $("overlay").style.display = 'none';   
   $(msgBlock).style.display = 'none';   
}   
/**  
 * 设置模块，提交数据并保存到COOKIE  
 */  
function SetNums()   
{   
    var today_lines=$('display_lines').value;   
    var col_width=$('col_width').value;   
   if(today_lines=="" || checkNum(today_lines) || col_width=="" || checkNum(col_width))   
   {   
      alert("显示条数和栏目宽度必须是数字");   
      return;   
   }   
  
   if(parseInt(today_lines)<=0 || parseInt(today_lines)>=1000)   
   {   
      alert("显示条数必须在1-1000之间");   
      return;   
   }   
   if(parseInt(col_width)<=0 || parseInt(col_width)>100)   
   {   
      alert("栏目宽度必须在1-100之间");   
      return;   
   }   
   setCookie("my_nums_1_"+$('module_id').value, today_lines);   
   setCookie("my_scroll_1_"+$('module_id').value, $('scroll').checked);   
   setCookie("my_width_1", col_width);   
  
   //my_width=col_width;   
  
   $("msgBody").style.display = "none";   
   $("msgCommand").style.display = "none";   
   $("msgSuccess").style.display = "block";   
      
   window.location.reload();   
}   
/**  
 * 获取当前容纳的行数  
 */  
function lines_per_page(module_id)   
{   
   return Math.floor(parseInt($("module_"+module_id+"_ul").style.height)/20);   
}   
/**  
 * 检查是否为数字类型  
 */  
function checkNum(str)   
{   
   var re=/\D/;   
   return str.match(re);   
}  
