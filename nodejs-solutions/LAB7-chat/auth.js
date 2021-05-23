// auth.js
module.exports = function (req, res, next) {
    if (!req.headers.authorization) {
        res.set('WWW-Authenticate', 'Basic').sendStatus(401).end();
        return;
    }
    var auth = new Buffer.from(req.headers.authorization.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];

    if (user == 'admin' && pass == 'admin') {
        next(); // all good
    }
    else res.set('WWW-Authenticate', 'Basic').sendStatus(401).end();
}
