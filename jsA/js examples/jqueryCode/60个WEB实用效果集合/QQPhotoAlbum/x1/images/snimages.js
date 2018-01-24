//Download by http://sc.xueit.com
var suningImages = function(){
	var box = $('#bigpics');
	var image = $('#pics');
	var go_pre = $('#go_pre');
	var go_next = $('#go_next');
	var btn = image.find('li');
	var len = btn.length ;
	var ul = image.find('ul');
	
	return{
		init:function(){
			var that = this ;
			var posx ;
			var posy ;
			var i = 0 ;
			ul.css('width',len*99);
			image.prev('div').click(function(e){
				//alert($(this));
				if(i<=0){
					return false;
				}
				i--;
				that.scroll(i);
				e.preventDefault();
			})
			
			image.next('div').click(function(e){
				if(i>= parseInt(len/7) || len<=7 ){
					return false;
				}
				i++;	
				that.scroll(i);
				e.preventDefault();
			})
			
			
			btn.each(function(i){
				$(this).find('a').click(function(e){
					index = i ;							 
					that.addbk(i);
					that.loadimg(i);
					e.preventDefault();
				})
			})
			
			
			var index = 0 ;
			go_next.click(function(ee){
					var ee = ee || window.event ;
					index++;
					if(index>=len)
					{
						index=0;
						ul.stop().animate({marginLeft: 0 },300);
					}
					that.next(index);
					ee.preventDefault();
							   });
			go_pre.click(function(eee){
					var eee = eee || window.event ;
					index--;
					if(index<0){
						index=len-1;
						ul.stop().animate({marginLeft: -99*parseInt(index/7)*7 },100);
					};
					that.prev(index);
					eee.preventDefault();
							   });
			box.click(function(e){
				var e = e || window.event ;
				posx = e.clientX ;
				//判断鼠标位置，鼠标位置大于图片1/2处加
				if(posx>document.documentElement.clientWidth/2){
					index++;
					if(index>=len)
					{
						index=0;
						ul.stop().animate({marginLeft: 0 },300);
					}
					that.next(index);
									
				}else{
					index--;
					if(index<0){
						index=len-1;
						ul.stop().animate({marginLeft: -99*parseInt(index/7)*7 },100);
					};
					that.prev(index);
				}	
				e.preventDefault();
			}).mousemove(function(e){
				var e = e || window.event ;
				posx = e.clientX ;
				if(posx>document.documentElement.clientWidth/2){
					box.css('cursor','pointer');
					box.attr('title','下一幅');
					go_next.css('display','block');
					go_next.prev(index);
					go_pre.css('display','none');
				}else{
					box.css('cursor','pointer');
					box.attr('title','上一幅');
					go_pre.css('display','block');
					go_next.css('display','none');
					go_pre.prev(index);
				}
			});
			//以下是判断移出图片框
			  window.attachEvent("onload",function(){
			  var rect=bigpics.getBoundingClientRect();
			  var l=rect.left,r=rect.right,t=rect.top,b=rect.bottom;
			  var indiv=false;
			  document.attachEvent("onmousemove",function(){
			    var x=event.clientX+document.body.scrollLeft;
			    var y=event.clientY+document.body.scrollTop;
			    var temp=(x>=l&&x<=r&&y>=t&&y<=b);
			    if(indiv&&!temp)
			      doonmouseout();
 			   indiv=temp;
 			   });
 			 });
			function doonmouseout(){				
			  go_next.css('display','none');
			  go_pre.css('display','none');
 			 }
			
			$(document).keyup(function(e){
				var e = e || window.event ;
				if(e.which == 39){
					index++;
					if(index>=len){
						index=0;
						ul.stop().animate({marginLeft: 0 },300);
					}
					that.next(index);
					
				}else if(e.which== 37 ){
					index--;
					if(index<0){
						index=len-1;
						ul.stop().animate({marginLeft: -99*parseInt(index/7)*7 },300);
					};
					that.prev(index);
				}
			});
			
		},
		loadimg:function(i){
			box.html('<div class="loading"></div>');
			var src = btn.eq(i).find('img').attr('src');
			var maxlen = src.length ;
			var imgid = btn.eq(i).find('img').attr('id');
			newsrc = imgid;
			box.html('<img src = ' +newsrc+' onload=\"javascript:DrawImage(this,890,630)\" />' ).find('img').hide();
			box.find('img').fadeIn(500);
		},
		addbk:function(i){
			btn.eq(i).find('a').addClass('on').parent().siblings().find('a').removeClass('on');
		},
		scroll:function(i){
			ul.stop().animate({marginLeft: -99*7*i },300);
		},
		next:function(index){
			var that = this ;
			if(((index)%7)==0){
				ul.stop().animate({marginLeft: -99*(index) },300);
			}
			that.addbk(index);
			setTimeout(function(){that.loadimg(index);},400);
		},
		prev:function(index){
			var that = this ;
			if((index+1)%7==0){
				ul.stop().animate({marginLeft: -99*parseInt(index/7)*7 },300);
			}
			that.addbk(index);
			setTimeout(function(){that.loadimg(index);},400);
		}
	}
}
//大图自动缩放
function DrawImage(ImgD,iwidth,iheight){    
    //参数(图片,允许的宽度,允许的高度)    
    var image=new Image();    
    image.src=ImgD.src;    
    if(image.width>0 && image.height>0){    
      if(image.width/image.height>= iwidth/iheight){    
          if(image.width>iwidth){      
              ImgD.width=iwidth;    
              ImgD.height=(image.height*iwidth)/image.width;    
          }else{    
              ImgD.width=image.width;      
              ImgD.height=image.height;    
          }    
      }else{    
          if(image.height>iheight){      
              ImgD.height=iheight;    
              ImgD.width=(image.width*iheight)/image.height;            
          }else{    
              ImgD.width=image.width;      
              ImgD.height=image.height;    
          }    
      }    
    }    
}
$(document).ready(function(){
	suningImages().init();	
})
//平滑滚屏
jQuery(document).ready(function($) {
$body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body'); // opera fix
});
function jqbottom(){$body.animate( { scrollTop: $('#bottom').offset().top}, 1000)};
function jqmiddle(){$body.animate( { scrollTop: $('#middle').offset().top - 200}, 1000)};
function jqtop(){$body.animate( { scrollTop: $('#top').offset().top}, 1000)};

/*
Tiny Scrolling - a smooth navigation between internal links and their destinations
by Marco Rosella - http://lab.centralscrutinizer.it/the-tiny-scrollings/
based on the works by Travis Beckham and Brian McAllister.
v0.3 - March 27, 2006
*/
/*
window.onload = function() {
	tinyScrolling.init();
	};
*/
var tinyScrolling = {
	speed : 30,    //set here the scroll speed: when this value increase, the speed decrease. 
	maxStep: 300,  //set here the "uniform motion" step for long distances
	brakeK: 5,     //set here the coefficient of slowing down
	hash:null,		
	currentBlock:null,
	requestedY:0,
	init: function() {
			var lnks = document.getElementsByTagName('a');   
			for(var i = 0, lnk; lnk = lnks[i]; i++) {   
				if ((lnk.href && lnk.href.indexOf('#') != -1)&&( (lnk.pathname == location.pathname)||('/'+lnk.pathname == location.pathname))&&(lnk.search == location.search)){lnk.onclick = tinyScrolling.initScroll;
				}   
			}
	},
	getElementYpos: function(el){
			var y = 0;
			while(el.offsetParent){y += el.offsetTop;el = el.offsetParent;}	return y;
	},		
	getScrollTop: function(){
			if(document.all) {return (document.documentElement.scrollTop) ? document.documentElement.scrollTop : document.body.scrollTop}
			else {return window.pageYOffset}   
	},	
	getWindowHeight: function(){
			if (window.innerHeight)	{return window.innerHeight};
			if(document.documentElement && document.documentElement.clientHeight){return document.documentElement.clientHeight}
	},
	getDocumentHeight: function(){
			if (document.height) {return document.height};
			if(document.body.offsetHeight) {return document.body.offsetHeight}
	},
	initScroll: function(e){
			var targ;
			if (!e) var e = window.event;
			if (e.target) targ = e.target;
			else if (e.srcElement) targ = e.srcElement;   
			tinyScrolling.hash = targ.href.substr(targ.href.indexOf('#')+1,targ.href.length); 
			tinyScrolling.currentBlock = document.getElementById(tinyScrolling.hash);   
			if(!tinyScrolling.currentBlock) return;
			tinyScrolling.requestedY = tinyScrolling.getElementYpos(tinyScrolling.currentBlock);
			tinyScrolling.scroll();  
			return false;
	},
	scroll: function(){
			var top  = tinyScrolling.getScrollTop();
			if(tinyScrolling.requestedY > top) {  
				var endDistance = Math.round((tinyScrolling.getDocumentHeight() - (top + tinyScrolling.getWindowHeight())) / tinyScrolling.brakeK);
				endDistance = Math.min(Math.round((tinyScrolling.requestedY-top)/ tinyScrolling.brakeK), endDistance);
				var offset = Math.max(2, Math.min(endDistance, tinyScrolling.maxStep));
			} else { var offset = - Math.min(Math.abs(Math.round((tinyScrolling.requestedY-top)/ tinyScrolling.brakeK)), tinyScrolling.maxStep);
			} window.scrollTo(0, top + offset);  
			if(Math.abs(top-tinyScrolling.requestedY) <= 1 || tinyScrolling.getScrollTop() == top) {window.scrollTo(0, tinyScrolling.requestedY);
				if(!document.all || window.opera) location.hash = tinyScrolling.hash;
				tinyScrolling.hash = null;
			} else 	setTimeout(tinyScrolling.scroll,tinyScrolling.speed);
	}		
};

function goh1(){$body.animate({ scrollTop: $('#goh1').offset().top}, 1000)};
//弹出层控制
function showdiv(tag){
	var light=document.getElementById(tag);
	var fade=document.getElementById('fade');
	light.style.display='block';
	fade.style.display='block';
	}
function closediv(tag){
	var light=document.getElementById(tag);
	var fade=document.getElementById('fade');
	light.style.display='none';
	fade.style.display='none';
}