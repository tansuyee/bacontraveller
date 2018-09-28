const usersController = require('../controllers').users;
const authController = require('../controllers').auth;
const postsController = require('../controllers').posts;
const commentsController = require('../controllers').comments;
const followsController = require('../controllers').follows;
const constants = require('../config/constants');
const passport = require('passport');

requireAuth = () => {
  return passport.authenticate('jwt', constants.jwtSession);
}

adminOnly = (cb) => {
  // TODO: handle/remove endpoints that should not be available to normal users
  return cb
}

module.exports = (app, auth) => {
  app.get('/v1', (req, res) => res.status(200).send({
    message: 'Welcome to the BaconTraveller API v1!'
  }));

  app.post('/v1/login', authController.login);
  app.post('/v1/login/facebook', authController.facebookLogin);

  app.post('/v1/users', usersController.create);
  app.get('/v1/users', adminOnly(usersController.list));
  app.get('/v1/users/:userId', usersController.retrieve);
  app.put('/v1/users/:userId', requireAuth(), usersController.update);
  app.delete('/v1/users/:userId', adminOnly(usersController.destroy));

  app.post('/v1/users/:userId/follow', requireAuth(), followsController.create);
  app.delete('/v1/users/:userId/follow', requireAuth(), followsController.destroy);

  app.post('/v1/posts', requireAuth(), postsController.create);
  app.get('/v1/posts', postsController.list);
  app.get('/v1/posts/search', postsController.search)
  app.get('/v1/posts/:postId', postsController.retrieve);
  app.put('/v1/posts/:postId', requireAuth(), postsController.update);
  app.delete('/v1/posts/:postId', requireAuth(), postsController.destroy);
  app.post('/v1/posts/:postId/accept', requireAuth(), postsController.accept);

  app.post('/v1/posts/:postId/comments', requireAuth(), commentsController.create);
  app.put('/v1/posts/:postId/comments/:commentId', requireAuth(), commentsController.update);
  app.delete('/v1/posts/:postId/comments/:commentId', requireAuth(), commentsController.destroy);
}
