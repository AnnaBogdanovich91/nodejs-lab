// chat.js module

var clients = [];

exports.subscribe = function (req,res) {
    console.log ("new client");
    clients.push (res);
}

exports.publish =function (name, message) {
    console.log ("%s: publish %s",name, message, clients.length);
    clients.forEach (function (res){
        console.log (res);
        res.end (name + ": " + message);
    })
    clients = [];
}