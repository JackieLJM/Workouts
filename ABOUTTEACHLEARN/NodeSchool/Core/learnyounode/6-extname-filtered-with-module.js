let filter = require('./module.js');
const second = process.argv[2],
    third = process.argv[3];
filter(second, third, function(err, lists) {
        if (err) {
                return console.error('There was an error:', err)
        }
        lists.forEach(function(list) {
                console.log(list)
        })
});