var concat=require('concat-stream');
// var through=require('through2');
// var stream = through();
process.stdin.pipe(concat(function(buffer){
	var obj=buffer.toString().split('').reverse().join('');
	console.log(obj);
}))
// .pipe(process.stdout);