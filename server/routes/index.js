const usersController = require('../controllers').users;
const authController = require('../controllers').auth;
const postsController = require('../controllers').posts;
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
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the BaconTraveller API!'
  }));

  app.post('/api/login', authController.login);

  app.post('/api/users', usersController.create);
  app.get('/api/users', adminOnly(usersController.list));
  app.get('/api/users/self', requireAuth(), usersController.retrieveSelf);
  app.get('/api/users/:userId', usersController.retrieve);
  app.put('/api/users/self', requireAuth(), usersController.updateSelf);
  app.delete('/api/users/:userId', adminOnly(usersController.destroy));

  app.post('/api/users/:userId/follow', requireAuth(), usersController.follow);
  app.delete('/api/users/:userId/follow', requireAuth(), usersController.unfollow);

  app.post('/api/posts', requireAuth(), postsController.create);
  app.get('/api/posts', postsController.list);
  app.get('/api/posts/:postId', postsController.retrieve);
  app.put('/api/posts/:postId', requireAuth(), postsController.update);
  app.delete('/api/posts/:postId', requireAuth(), postsController.destroy);
  app.post('/api/posts/:postId/accept', requireAuth(), postsController.accept);

  //comments

  app.get("/protected", requireAuth(), (req, res) => {
    return res.status(200).send("YAY! this is a protected Route. Your userid is " + req.user.id)
  })
}
