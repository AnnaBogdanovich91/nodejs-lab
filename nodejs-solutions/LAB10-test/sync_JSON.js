var fs = require ('fs');


function loadJSONsync(filename) {
    var file = fs.readFileSync (filename);
    try {
        return JSON.parse (file);
    } catch (err) {
        throw new Error ('Bad JSON');
    }
}

module.exports = loadJSONsync;
