const url=process.argv[2];
const {get}=require("http");
get(url,function(res){
	res.on("data",function(data){
		console.log(data.toString());
	})
})