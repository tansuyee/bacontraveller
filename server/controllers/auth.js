const jwt = require('jsonwebtoken');
const passport = require('passport');

module.exports = {
  login(req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
      if (err || !user) {
        return res.status(400).send(info);
      }
      req.login(user, {session: false}, (err) => {
        if (err) {
          res.send(err);
        }
        // generate a signed son web token with the contents of user object and return it in the response
        const token = jwt.sign(user.toJSON(), 'your_jwt_secret');
        return res.json({user, token});
      });
    })(req, res);
  }
};