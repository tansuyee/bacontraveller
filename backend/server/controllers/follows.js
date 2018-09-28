const Follow = require('../models').Follow;
const User = require('../models').User;

const users = require('./users');

module.exports = {
  create(req, res) {
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
      .then(follow => {
        User
        .findById(req.params.userId, users.fullAttributes(req.params.userId))
        .then(user => {
          if (!user) {
            return res.status(404).send({
              message: 'User Not Found',
            });
          }
          res.status(201).send(user)
        })
      })
      .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
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
        .then(() => {
          User
          .findById(req.params.userId, users.fullAttributes(req.params.userId))
          .then(user => {
            if (!user) {
              return res.status(404).send({
                message: 'User Not Found',
              });
            }
            res.status(200).send(user)
          })
        })        
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },
}