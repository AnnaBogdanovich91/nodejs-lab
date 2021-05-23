var express = require ('express'); 
var logger_morgan = require ('morgan');
var serve_favicon = require ('serve-favicon');
var chat = require ('./chat');
var auth = require ('./auth');

var app = express ()
    .use (logger_morgan('tiny'))
    .use (serve_favicon('favicon.ico'))
    .use ('/admin', auth)
	.use ('/admin', function (req,res){
		res.end ('Hello admin!');
	})
	.use ('/error', function (req,res){
		throw new Error('Some horrible error');
		res.end('error');
	})

        .use ('/subscribe', function (req,res,next) { chat.subscribe(req,res); })
        .use ('/publish', function (req,res,next) {
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
                chat.publish (body.message);
                res.end ("ok");
            });
        })
        .use (express.static('public'))
	.use (function (err, req, res, next) {
		res.write ('<h1>Internal Service error</h1>');
		res.write('<h2>Come back later</h2>');
		res.end (err.message);
	})
        .listen (3000);


