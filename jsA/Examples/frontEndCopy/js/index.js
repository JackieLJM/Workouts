$(function(){
	//alert("dsf");
  $(".flashContral").click(function(){

  		currIndex=$(this).attr("picIndex");
  		showFlashImage();

  });
  $("#guanggaoPic").hover(function(){
  	clearInterval(timeHandle);
  },function(){
  	timeHandle= setInterval("showFlashImage()",2000);
  });
  timeHandle= setInterval("showFlashImage()",2000);

  });


var timeHandle;
var currIndex=2;
function showFlashImage(){
	$("#flash").css("background-image",'url("images/' + currIndex +'.jpeg")');
	$(".flashContral").removeClass("currentSpan");
	$("#contralSpan"+ currIndex ).addClass("currentSpan");
	currIndex++;
	if(currIndex==5){
		currIndex=1;
	}
	 
	
}