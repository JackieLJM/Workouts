<%@LANGUAGE="VBSCRIPT" CODEPAGE="65001"%>
<%
callback = Request.QueryString("jsonp")
id = Request.QueryString("id")
Response.AddHeader "Content-Type","text/html;charset=utf-8"
Response.Write(callback & "(")
%>
{
    "title" : "JSONP Test",
    "link" : "http://www.css8.cn/",
    "modified" : "2009-4-1",
    "items" : 
<%
if id = "1" then
%> 
    {
        "title" : "百度",
        "link" : "http://www.baidu.com/",
        "description" : "百度一下，你就知道"
    }
<%
elseif id = "2" then
%>     
    {
        "title" : "谷歌",
        "link" : "http://www.google.cn/",
        "description" : "没有人为干预，更公允更全面"
    }
<%
else
Response.Write(" ")
end if
Response.Write("})")
%>          






