const usersController = require('../controllers').users;
const authController = require('../controllers').auth;
const postsController = require('../controllers').posts;
const constants = require('../config/constants');
const passport = require('passport');

requireAuth = () => {
  return passport.authenticate('jwt', constants.jwtSession);
}

module.exports = (app, auth) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the BaconTraveller API!'
  }));

  app.post('/api/login', authController.login);

  app.post('/api/users', usersController.create);
  app.get('/api/users', usersController.list);
  app.get('/api/users/:userId', usersController.retrieve);
  app.put('/api/users/:userId', usersController.update);
  app.delete('/api/users/:userId', usersController.destroy);

  app.post('/api/posts', requireAuth(), postsController.create);
  app.get('/api/posts', postsController.list);
  app.get('/api/posts/:postId', postsController.retrieve);
  app.put('/api/posts/:postId', requireAuth(), postsController.update);
  app.delete('/api/posts/:postId', requireAuth(), postsController.destroy);

  app.get("/protected", requireAuth(), (req, res) => {
    return res.status(200).send("YAY! this is a protected Route. Your userid is " + req.user.id)
  })
}