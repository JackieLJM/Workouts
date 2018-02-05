const {get}=require("http");
const bl=require("bl");
const url=process.argv[2];
get(url,function (res) {
	res.pipe(bl(function(err,data){
		data=data.toString();
		console.log(data.length);
		console.log(data);
	}))
})