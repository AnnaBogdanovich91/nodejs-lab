var fs = require('fs');
var promisify = require('util').promisify;

var readAsyncFile = promisify (fs.readFile);																	// асинхронной функции
function parseJSONpromise (filename){
    return readAsyncFile (filename)
        .then (function (data){				
            try {
                return JSON.parse (data);
            } catch (err) {
                throw new Error ('Bad JSON');
            }		
         })
        }
module.exports = parseJSONpromise;
