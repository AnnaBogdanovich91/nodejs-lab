// models/session-store.js
var expressSession = require ('express-session');
var MongoStore = require('connect-mongo')(expressSession);

var sessionStore = new MongoStore({
    url: 'mongodb://127.0.0.1:27017/session'
});

module.exports = sessionStore;