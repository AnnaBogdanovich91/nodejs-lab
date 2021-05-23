// server.js
console.time('First load');
var phrases = require ('phrases');
console.timeEnd ('First load');

var User = require ('./user');

var john = new User ("John",'eng');
var vasya = new User ("Вася",'ru' );

console.log (john.welcome());
console.log (vasya.welcome());


