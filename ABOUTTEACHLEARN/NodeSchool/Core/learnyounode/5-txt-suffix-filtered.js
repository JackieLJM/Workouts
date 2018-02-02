var fs=require("fs"),path=require("path");
var third=
// 'md';
process.argv[3]
;
var second=
// 'C:\\Users\\LIUJIAMING\\Desktop\\Workouts\\ABOUTTEACHLEARN\\NodeSchool\\Core\\learnyounode\\file-list';
process.argv[2]
;
fs.readdir(second, function(err, lists) {
	if (err) return console.error(err);
	lists.forEach(function(list) {
		
		// var ext=path.extname(list);
		// if(ext===""){
		// 	return false;
		// }
		// if((ext==="."){
		// 	return "";
		// }
		// else if(ext===""){

		// }

		if('.'+third===path.extname(list)){
			console.log(list);
		};
	});
	// filtered.push("");
	// console.log(filtered);
	// console.log(filtered.forEach((obj)=>console.log(obj)));  
	// The right answer i think should be without the empty one!
})

// console.log(""==='');
// console.log(path.extname('a.'));

// var fs = require('fs')
// var path = require('path')

// var folder = process.argv[2]
// var ext = '.' + process.argv[3]

// fs.readdir(folder, function (err, files) {
//   if (err) return console.error(err)
//   files.forEach(function (file) {
//     if (path.extname(file) === ext) {
//       console.log(file)
//     }
//   })
// })
