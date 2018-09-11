const usersController = require('../controllers').users;
const authController = require('../controllers').auth;
const constants = require('../config/constants');
const passport = require('passport');

module.exports = (app, auth) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the BaconTraveller API!'
  }));

  app.post('/api/users', usersController.create);
  app.get('/api/users', usersController.list);
  app.get('/api/users/:userId', usersController.retrieve);
  app.put('/api/users/:userId', usersController.update);
  app.delete('/api/users/:userId', usersController.destroy);

  app.post('/api/login', authController.login);

  app.get("/protected", passport.authenticate('jwt', constants.jwtSession), (req, res) => {
    return res.status(200).send("YAY! this is a protected Route. Your userid is " + req.user.id)
  })
}