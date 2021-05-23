var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login' });
  });

router.post ('/new', function (req,res,next){
	// Проверить, что нет пользователя с таким именем
	// Проверить введенные значения
	if (req.body.password == req.body.confirmPassword)
	{
		// Зарегистрировать пользователя
		// Перенаправить пользователя на страницу чата
		req.session.loggedIn=true;
		req.session.user_name = req.body.name;
		res.redirect ('/');
	} else res.render ('login', {title: 'Login', new_message:'Password and confirmation are not the same'})
});

router.post ('/existing', function (req,res,next){
	// Проверить существование пользователя
	// Проверить, что пароль верный
	if (req.body.password)
	{
		// Пометить пользователя, как авторизованного
		// Перенаправить пользователя на страницу чата
		req.session.loggedIn=true;
		req.session.user_name = req.body.name;
		res.redirect ('/');
	} else res.render ('login', {title: 'Login', exist_message:'Wrong password'})
});
module.exports = router;
