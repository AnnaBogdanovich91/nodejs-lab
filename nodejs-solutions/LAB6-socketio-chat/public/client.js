// client.js
var socket = io();

publish.onsubmit = function () {
    socket.emit('new message', this.elements.message.value, function (newMessage){
      var li=document.createElement ('li');
      li.textContent = newMessage;
      li.classList = "list-group-item list-group-item-primary";
      messages.appendChild (li);
    });
    
    this.elements.message.value="";
    return false;
  };

socket.on('new message', function (newMessage) {
    var li=document.createElement ('li');
      li.textContent = newMessage;
      li.classList = "list-group-item";
      messages.appendChild (li);
});