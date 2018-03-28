var isMatch = function (s, p) {
    // var sRegExp = s.match(/.?/),
    // pRegExp = p.match(/../),
    var reg = new RegExp(s),
        pattern = eval('/' + p + '/');
        for(var i=1;i<p.length;i++){
            p[i]===s[0];
        }
        console.log(pattern);
        console.log(reg);
        return pattern.test(s);
    // console.log(sRegExp);    
};
console.log(isMatch("adksagfakja", "a*sagfakja"));