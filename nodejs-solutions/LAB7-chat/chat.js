// chat.js module
var util = require ('util');
var clients = [];

exports.subscribe = function (req,res) {
    console.log ("new client");
    clients.push (res);
}

exports.publish =function (message) {
    console.log ("publish %s to %d clients",message, clients.length);
    clients.forEach (function (res){
        res.send (message);
    })
    clients = [];
}