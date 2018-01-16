var fs=require("fs");
fs.readFile(process.argv[2],function(err,file){
	var strArr= file.toString().split("\n");
	console.log(strArr.length-1);
});