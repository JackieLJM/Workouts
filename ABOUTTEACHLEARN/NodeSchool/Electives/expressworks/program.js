const express = require("express");
const app = express();
const path = require('path');
const fs = require('fs');
//1
// app.get('/home',function(req,res){
// 	res.end("Hello World!")
// });
// app.listen(process.argv[2]);

//2
// app.use(express.static(process.argv[3]||path.join(__dirname,'public')));
// app.listen(process.argv[2]);

//3
// 要先设置引擎再设置目录
// app.set('view engine', 'pug');
// app.set('views',process.argv[3]||path.join(__dirname,'templates'));
// app.get('/home',function(req,res){
// 	res.render('index',{date:new Date().toDateString()});
// });
// app.listen(process.argv[2]);

//4
// var bodyparser=require('body-parser');
// app.use(bodyparser.urlencoded({extended:false}));	
// app.post('/form',function(req,res){
// 	res.send(req.body.str.split('').reverse().join(''));
// })
// app.listen(process.argv[2]);

// 5
// 这里的process.argv[3]是一个路径，所以照这样理解，css处理的中间件先引入
// app.use(require("stylus").middleware(process.argv[3]));
// app.use(express.static(process.argv[3]));
// app.listen(process.argv[2]);

// 6
// 除此之外还有一种先用app.params处理路由参数的写法
// app.put("/message/:id",function(req,res){
// 	res.send(require("crypto").createHash('sha1')
// 		.update(new Date().toDateString()+req.params.id)
// 		.digest('hex'))
// });
// app.listen(process.argv[2]);

// 7
// 记得把js对象转为JSON
// app.get("/search",function(req,res){
// 	var query=JSON.stringify(req.query);
// 	res.send(query);
// });
// app.listen(process.argv[2]);

// 8
// readFile的f记得大写
app.get("/books", function(req, res) {
    fs.readFile(process.argv[3], function(err, file) {
        if (err) return res.sendStatus(500)
        try {
            books = JSON.parse(file)
        } catch (errr) {
            res.sendStatus(500)
        }
        res.json(books)
    })
});
app.listen(process.argv[2]);

// 总结：在expressjs里，不同的请求用不同属性的访问方法，比如用form,访问属性值要到req.body去访问，
// 用query，要到req.query去访问，路由参数值要到req.params访问