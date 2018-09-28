const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const secrets = require('./secrets');

const User = require('../models').User;

passport.use(new LocalStrategy({usernameField : 'email'}, function(email, password, done) {
  User
    .findOne({ where: {email: email}})
    .then(async function(user) {
      if (!user) return done(null, false, { message: 'Invalid email.' });
      if (!await user.validPassword(password)) return done(null, false, { message: 'Incorrect password.' });
      return done(null, user);
   })
   .catch(err => done(err));
}));

passport.use(new FacebookTokenStrategy({
      clientID: secrets.facebookAuth.clientID,
      clientSecret: secrets.facebookAuth.clientSecret
    },
  function (accessToken, refreshToken, profile, done) {
    User
      .findOne({ where: {facebook_provider_id: profile.id}})
      .then(async function(user) {
        if (!user) {
          return User
          .create({
            email: profile.emails[0].value,
            username: profile.displayName,
            facebook_provider_id: profile.id,
            facebook_provider_token: accessToken
          })
          .then(user => done(null, user));    
        } else {
          return done(null, user);
        }
      })
      .catch(err => done(err));
}));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: require('./secrets').jwtSecret
  },
  function (jwtPayload, done) {
    return done(null, jwtPayload)
  }
));
