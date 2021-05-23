// client.js
// создать подключение
var socket = new WebSocket("ws://localhost:3000");

function showData(data) {
    document.getElementById('rss').innerHTML = "RSS size is " + data.rss;
    document.getElementById('heapTotal').innerHTML = "Heap total size is " + data.heapTotal;
    document.getElementById('heapUsed').innerHTML = "Heap used size is " + data.heapTotal;
}

// обработчик входящих сообщений
socket.onmessage = function(event) {
  showData(JSON.parse(event.data))
};
socket.onopen = function() {
    console.log("Connection opened");
}
socket.onclose = function (event) {
    if(event.wasClean) {
        console.log ('Connection was closed clearly')
    } else {
        console.log("Something wrong. Connection closed");
        console.log (event.code, event.message)
    }
}

socket.onerror = function (err) {
    console.error (error.message);
}
