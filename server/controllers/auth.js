const jwt = require('jsonwebtoken');
const passport = require('passport');
const constants = require('../config/constants');
const secrets = require('../config/secrets');

module.exports = {
  login(req, res, next) {
    passport.authenticate('local', constants.jwtSession, (err, user, info) => {
      if (err || !user) {
        return res.status(400).send(info);
      }
      req.login(user, constants.jwtSession, (err) => {
        if (err) {
          res.send(err);
        }
        const contents = {
          id: user.id,
        }
        const token = jwt.sign(contents, secrets.jwtSecret);
        return res.json({user, token});
      });
    })(req, res);
  }
};
