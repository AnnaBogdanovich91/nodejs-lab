var fs = require ('fs');
var path = require('path');

var filename = 'good.file';
var path_to_file = path.join (__dirname, 'public', filename);

fs.readFile(path_to_file, function (err, data) { 
    if (err) {
        switch (err.code) {
            case 'ENOENT': { console.log ('No such file'); return}
            case 'EPERM': {console.log ('File is not readable'); return}
            default: console.log (err);
        }
    }
    else console.log (data.toString());
})

