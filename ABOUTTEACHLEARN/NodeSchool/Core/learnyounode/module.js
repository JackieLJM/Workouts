module.exports = function(dir,ext,callback) {
    let fs = require('fs');
    let path = require('path');
    // let second = arguments[0],
    //     third = arguments[1],
    //     callback = arguments[2];
    fs.readdir(dir, function(err, lists) {
        if (err) { return callback(err) }
        var filter = lists.filter((list) =>{
            return '.' + ext === path.extname(list);
        })
        callback(null, filter);
        // 关键在于如何返回上层函数，即如何调用和返回CALLBACK
    })

}