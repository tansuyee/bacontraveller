const User = require('../models').User;
const Follow = require('../models').Follow;

module.exports = {
  create(req, res) {
    return User
      .create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
      })
      .then(user => res.status(201).send())
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return User
      .all()
      .then(users => res.status(200).send(users))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return User
      .findById(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return res.status(200).send(user);
      })
      .catch(error => res.status(400).send(error));
  },
  retrieveSelf(req, res) {
    return User
      .findById(req.user.id)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return res.status(200).send(user);
      })
      .catch(error => res.status(400).send(error));
  },
  updateSelf(req, res) {
    return User
    .findById(req.user.id)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: 'User Not Found',
        });
      }
      return user
        .update({
          email: req.body.email || user.email,
          username: req.body.username || user.username,
          password: req.body.password || user.password,
          image_url: req.body.image_url || user.image_url,
        })
        .then(() => res.status(200).send(user))
        .catch((error) => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return User
      .findById(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return user
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  follow(req, res) {
    if (req.params.userId == req.user.id) {
      return res.status(404).send({
        message: 'You cannot follow yourself',
      });
    }
    return Follow
      .create({
        target_id: req.params.userId,
        follower_id: req.user.id,
      })
      .then(follow => res.status(201).send())
      .catch(error => res.status(400).send(error));
  },
  unfollow(req, res) {
    return Follow
    .findOne({ where: {
      target_id: req.params.userId,
      follower_id: req.user.id,
    }})
    .then(follow => {
      if (!follow) {
        return res.status(404).send({
          message: 'Not currently following this user',
        });
      }
      return follow
        .destroy()
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },
};
