var fs=require("fs");
var file=fs.readFileSync(process.argv[2]);
var str=file.toString();
var strArr=str.split("\n");
console.log(strArr.length-1);
// console.log(process.argv);
// if use utf-8 as the option of fs.readFileSync's second argument, the result will be a string type directly, not buffer type. 
// cat File | wc -l, the instructment do the same thing with it.