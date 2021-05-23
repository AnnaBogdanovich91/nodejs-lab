// user/index.js 
var moment = require ('moment');

console.time('Second load');
var phrases = require ('phrases');
console.timeEnd('Second load');

var logger = require('../logger');
Logger = new logger ('user.js');


function User (name, date, lang) {
    this.name = name;
    if (moment(date,'DD-MM-YYYY').isValid())
    {
        this.birthDate = moment(date,'DD-MM-YYYY').locale(lang);
    } else Logger.warn ('Date is invalid');
    this.age = new moment().diff(this.birthDate,'years');
    this.welcome = function () { return phrases[lang].Hello + this.name}
    }
module.exports = User;