// socketio-server.js
var server = require('./httpserver');

const io = require('socket.io')(server);

io.on('connection', function (socket) {
  console.log ('new connection');

  socket.on('new message', function (data, callback) {
    socket.broadcast.emit('new message', data);
    callback(data);
  });
});
