// 该例题考察写出阻塞请求的问题
const { get } = require("http");
const url1 = process.argv[2],
    url2 = process.argv[3],
    url3 = process.argv[4];
const bl = require("bl");
let arr = [];
// 第一种方法：使用for循环阻塞请求响应队列,官方解决方案
// for (var i = 0; i < 3; i++) {
// function(url) {	
// get(url1, function(res) {
//     res.pipe(bl(function(err, data) {
//         data = data.toString();
//         arr[0] = data.toString();
//         console.log(arr[0]);
//     }))
// });
// }
// }
// bl内部函数能继承全局作用域，可能使用了闭包（没有返回值），
// 在bl函数里使用全局数组缓存响应，全局数组无法就读取函数内部值，经测试bl函数得出数据只能缓存在bl函数内部
// 第二种方法：使用generator函数
function* trebleREQ() {
    yield get(url1, function(res) {
        res.pipe(bl(function(err, data) {
            data = data.toString();
            arr[0] = data;
            // console.log(arr[0]);
        }))
    });
    yield get(url2, function(res) {
        res.pipe(bl(function(err, data) {
            data = data.toString();
            arr[1] = data;
            // console.log(arr[1]);
        }))
    });
    yield get(url3, function(res) {
        res.pipe(bl(function(err, data) {
            data = data.toString();
            arr[2] = data;
            arr.forEach(function(element) {
            	console.log(element);
            });
            // console.log(arr[0]);
            // console.log(arr[1]);
            // console.log(arr[2]);
        }))
    });
}
var r=trebleREQ();
r.next();
r.next();
r.next();
//第三种方式：使用async/await函数，该函数在chrome55，edge，node7.10.1以上能运行