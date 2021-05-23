var express = require('express');
var router = express.Router();
var User = require('../models/user').User;


/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login' });
  });

router.post ('/new', function (req,res,next){
    var username = req.body.name;
    var password = req.body.password;

// check password == confirmpassword
// user does not exist, email does not exist??

    User.findOne ({username:username}, function (err,user){
        if (err) throw err;

        if (user) {
            res.render ('login', {title: 'Login', new_message:'User with this name already exists'});
        } else {
            if (password == req.body.confirmPassword)
            {
                var newuser = new User ({username:username, password:password, email:req.body.email});
                newuser.save (function (err){
                    if (err) return next(err);

                    req.session.loggedIn = true;
                    req.session.user_name = req.body.name;
                    
                    console.log ("redirecting to chat");
                    res.redirect ('/');
                });
            } else {
                res.render ('login', {title: 'Login', new_message:'Password and confirmation are not the same'});
            }
        }
    })
 
 });
router.post ('/existing', function (req,res,next){
    var username = req.body.name;
    var password = req.body.password;

    console.log ('Trying to find', username);
    User.findOne ({username:username}, function (err,user){
        if (err) throw err;

        console.log ('found', user);

        if (user) {
            if (user.checkPassword (password)) {
                req.session.loggedIn = true;
                req.session.user_name = req.body.name;
                    
                console.log ("redirecting to chat");
                res.redirect ('/');
            } else {
                res.render ('login', {title: 'Login', exist_message:'Wrong password'});
            }
        } else {
            res.render ('login', {title: 'Login', exist_message:'User does not exist'});
        }
    })
});
module.exports = router;
