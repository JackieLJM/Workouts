var split=require('split');
var through2=require('through2');
var count=1;
process.stdin.pipe(split()).pipe(through2(function (line,encoding,next) {
	// body...
	// for(let i=0;i<line.length;i++){
		if(count%2===0){
			this.push(line.toString().toUpperCase()+'\n');
		}else if(count%2===1){
			this.push(line.toString().toLowerCase()+'\n');
		}
	// 	count++;
	// }
	count++;
	next();
})).pipe(process.stdout);