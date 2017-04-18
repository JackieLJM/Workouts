//װ��col�µ�Ԫ��   
var colArray = []   
//�ƶ�ʱ���ID   
var moveEndInterval = 0;   
//��ʾ�������Ƿ��Ѿ�����   
var am=null;   
//��ʶͷ���Ƿ��Ѿ���ʼ��   
var isInitedHead=false;   
//�����ǩʧ�ܺ�������±����ʱ��   
var timeout = 3000;   
//��¼���ò�ľ���HTML���Ա�������ɺ�ԭ   
var msgBlockHTML = "";   
//���߷�����ʹ��ID��ȡ����   
var $ = function(id) {return document.getElementById(id);};   
/**  
 * ��������������  
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
        //��ǰ��������   
        var currTitle = titleAction.obj = this;   
        currEvent = titleAction.fixE(currEvent);   
        var divLeft = parseInt(createDiv().style.left);   
        var divTop = parseInt(createDiv().style.top);   
        //ִ���Զ����¼�   
        currTitle.onDragStart(divLeft,divTop,currEvent.clientX,currEvent.clientY);   
        //������ǰ����λ��   
        currTitle.lastMouseX = currEvent.clientX;   
        currTitle.lastMouseY = currEvent.clientY;   
        //����¼�   
        document.onmousemove = titleAction.drag;   
        document.onmouseup = titleAction.end;   
    },   
    "drag":function(currEvent){   
        currEvent=titleAction.fixE(currEvent);   
        //��ǰ��������   
        var currTitle=titleAction.obj;   
        //��ȡ��굱ǰ��λ��   
        var mouseX = currEvent.clientX;   
        var mouseY = currEvent.clientY;   
        //��ȡ�������λ��,���ƶ����µ�λ��   
        var divLeft = parseInt(createDiv().style.left);   
        var divTop = parseInt(createDiv().style.top);   
        var createDivX = mouseX-currTitle.lastMouseX+divLeft;   
        var createDivY = mouseY-currTitle.lastMouseY+divTop;   
        createDiv().style.left = createDivX+"px";   
        createDiv().style.top = createDivY+"px";   
        //������ǰ����λ��   
        currTitle.lastMouseX = mouseX;   
        currTitle.lastMouseY = mouseY;   
        //ִ���Զ����¼����ƶ�ԭ��DIV��˳��   
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
 * ��ʼ��Head  
 */  
function _upc(cols)   
{   
    initHead([$("col_l"),$("col_r")]);   
}   
/**  
 * ��ȡHttpRequest  
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
 * ����һ���㣬����Ѿ����ھ�ֱ�ӷ���  
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
 * ��ʼ��Head  
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
            //����title���   
            fixTitleWidth(module_i.id);   
            var title_i = $(module_i.id+"_title");   
            title_i.module = module_i;   
            //��ʼ��������   
            titleAction.init(title_i);   
               
            //���忪ʼ�ƶ����¼����Զ��壬��titleAction/start�б�ִ�У�   
            title_i.onDragStart=function(divLeft,divTop) {   
                    clearInterval(moveEndInterval);   
                    //��ȡģ��   
                    var module_i=this.module;   
                    //���õ���ģ��ƽ�������ģ�飨����ģ�飩��pagePosLeft��pagePosTop   
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
                //�ƶ���   
                if(this.dragged){   
                    //����ѭ�����ã������Ƶ�ģ���ƶ���ָ����λ��   
                    moveEndInterval=moveEndSetInterval(this.module,150,15);   
                }else{   
                    createDivStyle();   
                }   
                //������AJAX�����ύ�ı䵽���ݿ�   
            }   
        }   
    }   
    //����cookieȥ��ʼ��ģ�������   
    resizeByCookie();   
    //��ʼ��ģ����������   
    initModuleByCookie();   
}   
/**  
 * ��ʼ��ģ����������  
 */  
function initModuleByCookie(){   
    var my_width_1 = getCookie("my_width_1");   
    var isSetTitleWidth = false;   
    if(my_width_1&&my_width_1!=65){   
        $("col_l").width = my_width_1+"%";   
        $("col_r").width = (100-my_width_1)+"%";   
        //��������TITLE���   
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
            //�������ÿ��   
            if(isSetTitleWidth){   
                fixTitleWidth(module_i.id);   
            }   
        }   
    }   
}   
/**  
 * ��createDiv�ƶ���ָ�����λ��  
 * allTime:�ƶ������ܵ�ʱ��  
 * allCount:�ƶ������ܵ�ѭ������  
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
                //���ÿ��   
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
 * ��ȡ�����ģ�鲢�ı�ԭ��DIV��˳��  
 */  
function setModulePos(obj,posLeft,posTop)   
{   
    var module=null;   
    var referDistance=100000000;   
    //��ȡ�븴�Ʋ������ģ��   
    for(var i=0;i<colArray.length;i++)   
    {   
        for(var j=0;j<colArray[i].childNodes.length;j++)   
        {   
            var module_i=colArray[i].childNodes[j];   
            //�����Լ�   
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
    //�õ��������ģ�鲻ΪNULL&&����obj���ڵ�ģ��   
    if(module!=null&&obj.nextSibling!=module)   
    {   
        module.parentNode.insertBefore(obj,module);   
    }   
}   
  
/**  
 * ��ȡ��body��Χ�ڵ�Offset  
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
 * ���õ���ģ��ƽ�������ģ�飨����ģ�飩��pagePosLeft��pagePosTop  
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
 * ����title�Ŀ��  
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
  
/*******************************************����ģ���ϵĹ��߰�ť**********************************/  
/**  
 * ��ȡcookie  
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
 * ����cookie  
 */  
function setCookie(name,value) {   
    var today = new Date();   
    var expires = new Date();   
    expires.setTime(today.getTime() + 1000*60*60*24*2000);   
    document.cookie = name + "=" + escape(value) + "; expires=" + expires.toGMTString();   
}   
  
/**  
 * ����ģ�飬����¼��cookie  
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
            img_i.title="�۵�";   
               
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
            img_i.title="չ��";   
               
            if(my_cookie.indexOf(module_id+",") != 0 && my_cookie.indexOf(","+module_id+",") <= 0)   
               my_cookie += module_id+",";   
        }   
    }else if(isExpand==true){   
            if(body_i.style.display=="none"){   
                module_i.className=module_i.className.substr(0,module_i.className.lastIndexOf(" "));   
                head_i.className=head_i.className.substr(0,head_i.className.lastIndexOf(" "));   
                body_i.style.display="block";   
                img_i.src=img_i.src.substr(0,img_i.src.lastIndexOf("/")+1)+"expand_arrow.png";   
                img_i.title="�۵�";   
                   
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
            img_i.title="չ��";   
               
            if(my_cookie.indexOf(module_id+",") != 0 && my_cookie.indexOf(","+module_id+",") <= 0)   
               my_cookie += module_id+",";   
        }      
    }   
     setCookie("my_expand_1", my_cookie);   
}   
  
/**  
 * �������е�ģ��,����¼��cookie  
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
    //��������ģ��   
    for(var i=0;i<imgs.length;i++)   
    {   
        if(imgs[i].id.substr(0,11)!="img_resize_")   
            continue;   
        var module_id=imgs[i].id.substr(11,imgs[i].id.length);   
        _resize(module_id,isExpand);   
    }   
}   
  
/**  
 * ����cookie��¼����ʼ������  
 */  
function resizeByCookie(){   
    //����resize_all   
    var mycookie_all = getCookie("my_expand_all_1");   
    if(mycookie_all!=null&&mycookie_all!=""){   
        var ima_all_resize = $("img_all_resize");   
        var imageName = mycookie_all=="1"?"expand_arrow.png":"collapse_arrow.png";   
        var imgsrc = img_all_resize.src;   
        var lastIndex = img_all_resize.src.lastIndexOf("/");   
        img_all_resize.src=imgsrc.substr(0,lastIndex+1)+imageName;   
    }   
       
    //����resize   
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
            img_i.title="չ��";   
        }   
    }   
}   
  
/**  
 * ��ҳ  
 */  
function nextPage(module_id,page){   
    var module_Ul=$('module_'+module_id+'_ul');   
    if(!module_Ul)   return;   
       
    if(module_Ul.currPageIndex==null||module_Ul.currPageIndex=="undefined"){   
        module_Ul.currPageIndex = 1;   
    }   
    //����ajax��������   
    _sendXMLGetRequest("http://192.168.1.108:8081/JLEAP/mainframe/test.jsp",module_id,"nextPage");   
}   
  
/**  
 * ��������,����ʽΪGet  
 * type:������Զ�������  
 */  
function _sendXMLGetRequest(URL,paramtes,type){   
    var xmlHttpObj=getXMLHttpObj();   
    xmlHttpObj.open("GET",URL,true);   
    xmlHttpObj.onreadystatechange=function(){   
        if(xmlHttpObj.readyState==4)   
        {   
            //������ҳ����   
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
 * ��������,����ʽΪPOST  
 * type:������Զ�������  
 */  
function _sendXMLPostRequest(URL,paramtes,type){   
    var xmlHttpObj = getXMLHttpObj();   
    xmlHttpObj.open("POST", URL,true);   
    xmlHttpObj.setRequestHeader("Method", "POST notes.php HTTP/1.1");   
    xmlHttpObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");   
    xmlHttpObj.onreadystatechange = function() {   
            if (xmlHttpObj.readyState == 4){   
                //�����ǩ   
                if(type=="saveNotes"){   
                    showSaveNotes(xmlHttpObj);   
                }   
            }   
    };   
    xmlHttpObj.send(paramtes);   
}   
/**  
 * �����ǩ����  
 */  
function saveNotes()   
{   
   alert("999999990");   
   var paramtes = "CONTENT="+encodeURIComponent($("note_1").value);   
   _sendXMLPostRequest("http://192.168.1.108:8081/JLEAP/mainframe/test.jsp",paramtes,"saveNotes");   
}   
  
/**  
 * �����ǩ��Ĳ���  
 */  
function showSaveNotes(xmlHttpObj){   
    var s;   
    try {s = xmlHttpObj.status;}catch (ex) {   
       alert(ex.description);   
    }   
    if (s == 200){   
       if(xmlHttpObj.responseText.substr(0,3)!="+OK"){   
          alert("�����ǩ���ݴ��󣬴�����Ϣ��\n"+xmlHttpObj.responseText);   
          window.setTimeout("saveNotes()", timeout);   
          timeout = timeout*2;   
       }   
       else{   
          timeout=3000;   
       }   
    }   
    else{   
       alert("�����ǩ���ݴ��󣬴�����룺"+s);   
       window.setTimeout("save_notes()", timeout);   
       timeout = timeout*2;   
    }   
}   
/**  
 * ��ʾ�����ҳ����  
 */  
function showNextPage(module_id,responseText){   
       
}   
  
/**  
 * ɾ��ģ���Ķ���  
 */  
function showDelMoudle(){   
  
}   
  
/**  
 * ɾ��ģ��  
 */  
function _del(a)   
{   
    msg="ȷ�ϲ���ʾ��ģ��ô?";   
    if(window.confirm(msg))   
    {   
        var module=$("module_"+a);   
        if(module)   
            module.style.display="none";   
        _sendXMLGetRequest("http://192.168.1.108:8081/JLEAP/mainframe/test.jsp",null,"_del")   
    }   
}   
/**  
 * ģ������  
 */  
function _edit(module_id)   
{   
     show_msg("optionBlock");       
     $("optionBlockTitle").innerText=$("module_"+module_id+"_text").innerText+" ģ��ѡ��";   
     $('display_lines').focus();   
     $('display_lines').value=lines_per_page(module_id);   
     $('scroll').checked=getCookie("my_scroll_1_"+module_id)=="true";   
     var my_width_1 = parseInt(getCookie("my_width_1"))   
     $('col_width').value=my_width_1?my_width_1:65;   
     $('module_id').value=module_id;   
}   
  
/**  
 * ��ʾ���ǲ�����ò�  
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
 * ���ظ��ǲ�����ò㣬������ԭ����  
 */  
function hide_msg(msgBlock)   
{   
   $(msgBlock).innerHTML = msgBlockHTML;   
   $("overlay").style.display = 'none';   
   $(msgBlock).style.display = 'none';   
}   
/**  
 * ����ģ�飬�ύ���ݲ����浽COOKIE  
 */  
function SetNums()   
{   
    var today_lines=$('display_lines').value;   
    var col_width=$('col_width').value;   
   if(today_lines=="" || checkNum(today_lines) || col_width=="" || checkNum(col_width))   
   {   
      alert("��ʾ��������Ŀ��ȱ���������");   
      return;   
   }   
  
   if(parseInt(today_lines)<=0 || parseInt(today_lines)>=1000)   
   {   
      alert("��ʾ����������1-1000֮��");   
      return;   
   }   
   if(parseInt(col_width)<=0 || parseInt(col_width)>100)   
   {   
      alert("��Ŀ��ȱ�����1-100֮��");   
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
 * ��ȡ��ǰ���ɵ�����  
 */  
function lines_per_page(module_id)   
{   
   return Math.floor(parseInt($("module_"+module_id+"_ul").style.height)/20);   
}   
/**  
 * ����Ƿ�Ϊ��������  
 */  
function checkNum(str)   
{   
   var re=/\D/;   
   return str.match(re);   
}  
