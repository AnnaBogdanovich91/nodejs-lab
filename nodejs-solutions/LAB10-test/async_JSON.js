var fs = require('fs');
var util = require('util');
var readAsyncFile = util.promisify (fs.readFile);

async function parseJSONasync (filename) {
    var data = await readAsyncFile (filename);
    try {
        return JSON.parse (data);
    } catch (err) {
        throw new Error ('Bad JSON');
    }
}

module.exports = parseJSONasync;

