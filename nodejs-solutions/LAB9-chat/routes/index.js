// routes/index.js

var express = require('express');
var router = express.Router();
var chat = require ('../chat');


/* GET chat page. */
router.get('/', function(req, res) {
  console.log (req.session.loggedIn);
  if (!req.session.loggedIn) res.redirect ('/login')
  else res.render ('chat', {title:'Chat', user:req.session.user_name});
});

router.get ('/subscribe', function (req,res,next) { chat.subscribe(req,res); });
router.post ('/publish', function (req,res,next) {
  
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
      chat.publish (req.session.user_name, body.message);
      res.end ("ok");
  });
});

module.exports = router;
