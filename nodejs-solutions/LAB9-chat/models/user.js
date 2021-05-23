var crypto = require('crypto');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chat');

var schema = mongoose.Schema ({
    username: {
        type:String,
        unigue:true,
        required: true
    } ,
    email: String,
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required:true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

schema.methods.hashPassword = function (password) {
    return crypto.createHmac ('sha1', this.salt).update (password).digest ('hex');
}

schema.virtual('password')
    .set (function (password) {
        this._plainPassword = password;
        this.salt = Math.random()+'';
        this.hashedPassword = this.hashPassword (password);
    })
    .get (function () {
        return this._plainPassword
    });

schema.methods.checkPassword = function (password) {
    return this.hashPassword(password) == this.hashedPassword;
};

exports.User = mongoose.model ('User', schema);


