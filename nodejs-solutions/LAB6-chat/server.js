var http = require ('http');
var fs = require ('fs');

var chat = require ('./chat');
http.createServer (function(req,res) {
    switch (req.url){
        case '/':
            sendFile ("index.html", res);
            break;
    
        case '/subscribe':
            chat.subscribe (req,res);
            break;
        
        case '/publish':
            var data = '';
            var body = '';
            req.on ('readable', function (){
                data = req.read ();
                if (body.length > 100) {
                    res.statusCode = 413;
                    res.end ("Your message is too big!");
                    return;
                }
                if (data != null ) body += data;  //  Отсечение null в конце потока данных <data><data><data><null>
            }).on ('end', function () {
                try {
                    body = JSON.parse (body);
                } catch (e) {
                    res.statusCode = 400;
                    res.end ("Bad Request");
                    return;
                }
                chat.publish (body.name, body.message);
                res.end ("ok");
            }); 
            break;

        default:
            res.statusCode = 404;
            res.end ("Not found");
    }
}).listen (3000);

function sendFile (fileName, res) {
    var fileStream = fs.createReadStream(fileName);
    fileStream.on ('error', function () {
        res.statusCode = 500;
        res.end("Server error");
    })
   fileStream.pipe (res);
}