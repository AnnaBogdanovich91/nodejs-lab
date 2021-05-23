var fs = require ('fs');

function loadJSON(filename, cb) {
    fs.readFile(filename, function (err, data) {
        if (err) {
            cb(err);
            return;
        }
        else try {
            var parse_data = JSON.parse(data);
        }
        catch {
            cb(new Error ("Bad JSON"));
            return;
        }
        cb (null,parse_data);
    });
};
module.exports = loadJSON;
