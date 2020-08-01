const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("./model/User").User;
const consola = require('consola');
const bcrypt = require('bcrypt');


function errHandler(err) {
    consola.error('There was an error performing the operation');
    consola.error(err);
    consola.error(err.code);
    return consola.error(err.message);
}


let localSignup = new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, username, password, done) {
    process.nextTick(function() {
        User.findOne({ email: username }, async function(err, user) {
            if (err) {
                return errHandler(err);
            }
            if (user) {
                consola.error('user already exists');
                return done(null, false, { errMsg: 'email already exists' });
            } else {
                var newUser = new User();
                newUser.email = username;
                newUser.password = bcrypt.hashSync(password, 10);
                //newUser.password = password;
                newUser.save(function(err) {
                    if (err) {
                        consola.error(err);
                        if (err.message == 'User validation failed') {
                            consola.error(err.message);
                            return done(null, false, { errMsg: 'Please fill all fields' });
                        }
                        return errHandler(err);
                    }
                    consola.info('New user successfully created...');
                    consola.info('email', username);
                    consola.info(newUser);
                    return done(null, newUser);
                });
            }
        });
    });
});

let localLogin = new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async(username, password, done) => {
    try {
        //Find the user associated with the email provided by the user
        const user = await User.findOne({ email: username });
        if (!user) {
            //If the user isn't found in the database, return a message
            return done(null, false, { message: 'User not found' });
        }
        //Validate password and make sure it matches with the corresponding hash stored in the database
        //If the passwords match, it returns a value of true.
        const validate = await user.isValidPassword(password);
        if (!validate) {
            return done(null, false, { message: 'Wrong Password' });
        }
        //Send the user information to the next middleware
        const info = { scope: '*' };
        return done(null, user, info);
    } catch (error) {
        return done(error);
    }
})

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
opts.issuer = 'accounts.examplesoft.com';
opts.audience = 'yoursite.net';
let jwtStrategy = new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
})

let jwtUser = new JwtStrategy({
    //secret we used to sign our JWT
    secretOrKey: 'secret',
    //we expect the user to send the token as a query parameter with the name 'secret_token'
    jwtFromRequest: ExtractJwt.fromUrlQueryParameter('secret_token')
}, async(token, done) => {
    try {
        //Pass the user details to the next middleware
        return done(null, token.user);
    } catch (error) {
        done(error);
    }
})

module.exports = { localSignup, localLogin, jwtStrategy, jwtUser }