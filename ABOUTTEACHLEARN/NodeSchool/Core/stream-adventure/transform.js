var through=require("through2");
var stream=through(write,end);

function write(buffer,encoding,next) {
	// body...
	this.push(buffer.toString().toUpperCase());
	next();
}
function end(done) {
	// body...
	done();
}

process.stdin.pipe(stream).pipe(process.stdout);