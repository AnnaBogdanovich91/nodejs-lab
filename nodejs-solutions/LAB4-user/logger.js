var colors = require('colors');     // npm install colors
var util = require('util');

function logger (source) {
    this.info = function (message) {
        util.log ("%s: ", source, message.green)
    }
    this.warn = function (message) {
        util.log ("%s: ", source, message.yellow)
    }
    this.err = function (message){
        util.log ("%s: ",source, message.red)
    }
    return this;
}
module.exports = logger;



