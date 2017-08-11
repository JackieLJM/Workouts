// pagex浏览器兼容
var doc = document.documentElement,
    body = document.body;
event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
// 深复制方法
function deepCopy(parent, child) {
    var i,
        toStr = Object.prototype.toString,
        arrayStr = "[object Array]"
    child = child || {};
    for (i in parent) {
        if (parent.hasOwnProperty(i)) {
            if (typeof parent[i] == "object") { //判断是否是对象
                child[i] = (toStr.call(parent[i]) == arrayStr) ?
                    [] :
                    {}; //判断是数组还是对象
                deepCopy(parent[i], child[i]); //递归遍历复制
            } else {
                child[i] = parent[i];
            }
        }
    }
    return child;
}
// bind方法
if (!Function.prototype.bind) {
    Function.prototype.bind = function(obj) {
        var fn = this, //指向调用该方法的对象(函数)
            slice = [].prototype.slice,
            args = slice.call(arguments, 1); //作为默认参数的参数
        return function() {
            return fn.apply(obj, args.concat(slice.call(arguments)));
        };
    };
}
//object create方法
Object.create = function(o) {
    var F = function() {};
    F.prototype = o;
    return new F();
}
//给所有对象添加方法，通过扩展Object实现，下面通过调用a.method('name',function(){})实现参数里的方法定义到Object的方法,下面定义的方法能进行链式调用
Object.prototype.method = function(name, fun) {
    this.prototype[name] = fun;
    return this;
}
// reduce方法,acc cur,index,array为每次默认自动传入的值，此时arr的增删元素不会传给callback
arr.reduce(callback(accumulator, currentValue, currentIndex, array), [initialValue])
//多元化curry函数
function curry(fx) {
    var arity = fx.length;

    return function f1() {
        var args = Array.prototype.slice.call(arguments, 0);
        if (args.length >= arity) {
            return fx.apply(null, args);
        } else {
            return function f2() {
                var args2 = Array.prototype.slice.call(arguments, 0);
                return f1.apply(null, args.concat(args2));
            }
        }
    };
}
var sumFour = curry(function(w, x, y, z) {
    return w + x + y + z;
});
f1 = sumFour(10), // returns a function awaiting three arguments
f2 = sumFour(1)(2, 3), // returns a function awaiting one argument
f3 = sumFour(1, 2, 7), // returns a function awaiting one argument
x = sumFour(1, 2, 3, 4); // sumFour has been fully applied; x is equal to 1+2+3+4=10
x2 = sumFour(1)(2)(3)(4);