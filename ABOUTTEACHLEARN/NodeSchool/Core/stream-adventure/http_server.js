const http = require('http');
const through = require('through2');

let server = http.createServer(function(req, res) {
    if (req.method === "POST") {
        req.pipe(through(function(chunk, encoding, next) {
            // body...
            this.push(chunk.toString().toUpperCase());
            next();
        })).pipe(res);
    }
})

server.listen(parseInt(process.argv[2]));