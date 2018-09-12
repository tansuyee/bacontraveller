const usersController = require('../controllers').users;
const authController = require('../controllers').auth;
const postsController = require('../controllers').posts;
const commentsController = require('../controllers').comments;
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
  app.get('/api/v1', (req, res) => res.status(200).send({
    message: 'Welcome to the BaconTraveller API v1!'
  }));

  app.post('/api/v1/login', authController.login);

  app.post('/api/v1/users', usersController.create);
  app.get('/api/v1/users', adminOnly(usersController.list));
  app.get('/api/v1/users/:userId', usersController.retrieve);
  app.put('/api/v1/users/:userId', requireAuth(), usersController.update);
  app.delete('/api/v1/users/:userId', adminOnly(usersController.destroy));

  app.post('/api/v1/users/:userId/follow', requireAuth(), usersController.follow);
  app.delete('/api/v1/users/:userId/follow', requireAuth(), usersController.unfollow);

  app.post('/api/v1/posts', requireAuth(), postsController.create);
  app.get('/api/v1/posts', postsController.list);
  app.get('/api/v1/posts/:postId', postsController.retrieve);
  app.put('/api/v1/posts/:postId', requireAuth(), postsController.update);
  app.delete('/api/v1/posts/:postId', requireAuth(), postsController.destroy);
  app.post('/api/v1/posts/:postId/accept', requireAuth(), postsController.accept);

  app.post('/api/v1/posts/:postId/comments', requireAuth(), commentsController.create);
  app.put('/api/v1/posts/:postId/comments/:commentId', requireAuth(), commentsController.update);
  app.delete('/api/v1/posts/:postId/comments/:commentId', requireAuth(), commentsController.destroy);
}
