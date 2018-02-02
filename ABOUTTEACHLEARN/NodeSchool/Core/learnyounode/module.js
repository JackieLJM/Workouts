module.exports = function() {
	let fs=require('fs');
let path=require('path');
    let second = arguments[0],
        third = arguments[1];
        callback=arguments[2];
    fs.readdir(second, function(err, lists) {
        if (err) return console.error(err);
        lists.forEach(function(list){ 
            if ('.' + third === path.extname(list)) {
                 console.log(list);
            }
        }
        )
    })

}