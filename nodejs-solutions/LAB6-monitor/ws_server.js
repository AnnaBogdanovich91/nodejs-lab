// ws-server.js
var httpserver = require('./server');

var ws = require('ws');     // npm install ws
var webSocketServer = new ws.Server ({server:httpserver});

webSocketServer.on('connection', function (ws) {
    var timer = setInterval (function () {
          ws.send(JSON.stringify(process.memoryUsage()))
    }, 100);

    console.log ('client connected');

    ws.on('close', function () {
        console.log ('client disconnected');
        clearInterval (timer);
    })
});