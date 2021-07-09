const passport = require('passport');
const Sequelize = require('sequelize');
const User = require('../models/users');
const crypto = require('crypto');
const UserController = require("../controllers/users.controller");

let JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'cinamonbun';

passport.use(new JwtStrategy(opts, function (jwt_payload, next) {
    console.log('JWT Payload recieved', jwt_payload);
    console.log("ID: ", jwt_payload.sub);

    User.findOne({ where: { userID: jwt_payload.sub } }).then(user => {
        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    }).catch(err => res.status(500).send('Error: ' + err));
}));