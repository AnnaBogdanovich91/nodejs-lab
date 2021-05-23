// user/index.js 
console.time('Second load');
var phrases = require ('phrases');
console.timeEnd('Second load');

function User (name, lang) {
    this.name = name;
    this.welcome = function () { return phrases[lang].Hello + this.name}
    }
module.exports = User;
