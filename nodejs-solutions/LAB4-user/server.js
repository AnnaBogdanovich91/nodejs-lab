// server.js
console.time('First load');
var phrases = require ('phrases');
console.timeEnd ('First load');

var logger = require('./logger');
Logger = new logger ('server.js');
 var User = require ('./user');

var john = new User ("John",'01-02-1991','eng');
var vasya = new User ("Вася",'09-09-1954','ru' );

Logger.info (john.welcome());
Logger.info (vasya.welcome());

console.log (vasya.age);
console.log (john.birthDate.format('DD.MM'));
console.log (john.age);