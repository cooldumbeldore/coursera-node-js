/**
 * Created by Administrator on 26/06/2016.
 */

var User = require('../models/user');
var jwt = require('jsonwebtoken');

var config = require('../config');

exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey, {
        expiresIn: 3600
    });
};

exports.verifyOrdinaryUser = function (req, res, next) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};

exports.verifyAdmin = function (req, res, next) {

    /*
     if (!req.decoded) {
     console.log("1");
     var err = new Error('You are not authorized to perform this operation')
     err.status = 403;
     return next(err);
     } else {
     var id = req.decoded._ld;

     if (!req.decoded.admin) {
     console.log("2");
     var err = new Error('You are not authorized to perform this operation')
     err.status = 403;
     return next(err);
     } else {
     next();
     }
     }
     */

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        console.log("1");
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                console.log("2");
                console.log(decoded);
                req.decoded = decoded;
                if (!req.decoded.admin) {
                    var err = new Error('You are not an admin!');
                    err.status = 401;
                    return next(err);
                }
                console.log("3");
                next();
            }
        });
    } else {
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }

};