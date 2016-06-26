/**
 * Created by Administrator on 24/06/2016.
 */

var express = require('express');
var morgan = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);


var hostname = '127.0.0.1';
var port = 3009;

var app = express();

app.use(morgan('dev'));

var secretKey = '12345-12345-12345-12345';
app.use(session({
    name: 'session-id',
    secret: secretKey,
    saveUninitialized: true,
    resave: true,
    store: new FileStore()
}));

function auth(req, res, next) {
    console.log(req.headers);

    if (!req.session.user) {
        var authHeader = req.headers.authorization;
        if (!authHeader) {
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
            return;
        }

        var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
        var user = auth[0];
        var pass = auth[1];
        if (user == 'admin' && pass == 'password') {
            req.session.user = 'admin';
            next();
        } else {
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
        }
    } else {
        if (req.session.user === 'admin') {
            console.log('req.session: ', req.session);
            next();
        } else {
            console.log("inside 2");
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
        }
    }

}

app.use(auth);

app.use(express.static(__dirname + '/public'));

app.use(function (err, req, res, next) {
    res.set('WWW-Authenticate', 'Basic');
    res.set('Content-Type', 'text/plain');

    res.status(err.status || 500);
    res.send(err.message);

});

app.listen(port, hostname, function () {
    console.log('Server running at http://' + hostname + ':' + port + '/');
});
