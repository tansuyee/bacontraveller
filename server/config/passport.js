const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models').User;

passport.use(new LocalStrategy(function(username, password, done) {
  User
    .findOne({ where: {username: username}})
    .then(async function(user) {
      if (!user)  return done(null, false, { message: 'Incorrect username.' });
      if (!await user.validPassword(password)) return done(null, false, { message: 'Incorrect password.' });
      return done(null, user);
   })
   .catch(err => done(err));
}));