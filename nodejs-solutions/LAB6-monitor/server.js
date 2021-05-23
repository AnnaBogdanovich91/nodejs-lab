// server.js

var http = require('http');
var fs = require('fs');
var mime = require('mime-types');
var path = require ('path');

function send404(response) {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.write('Error 404: Resource not found.');
    response.end();
}

function send500(response) {
    response.writeHead(500, { 'Content-Type': 'text/plain' });
    response.write('Error 500: Internal server error');
    response.end();
}
var server = http.createServer(function (req, res) {
    if (req.method == 'GET' ) {
        if (req.url=='/') { 
            filepath = './public/index.html';
        } else filepath = path.resolve('./public/' + req.url);
        var fileStream = fs.ReadStream(filepath);
        fileStream.on ('error', function (err) {
            if (err.code == 'ENOENT') send404(res)
            else send500 (res);
        })
        res.writeHead(200, mime.lookup(filepath));
        fileStream.pipe(res);
    } else send404(res);
}).listen(3000);
console.log('server running on port 3000');

module.exports = server;