const Comment = require('../models').Comment;
const Post = require('../models').Post;
const Transaction = require('../models').Transaction;
const User = require('../models').User;

module.exports = {
  create(req, res) {
    return Comment
    .create({
      post_id: req.params.postId,
      author_id: req.user.id,
      text: req.body.text
    })
    .then(comment => {
      Post
      .findById(req.params.postId, {
        include: [{
          model: Transaction,
          as: 'transactions',
        },{
          model: Comment,
          as: 'comments',
        },{
          model: User,
          attributes: ["id", "username", "image_url"]
        }],
      })
      .then(post => {
        if (!post) {
          return res.status(404).send({
            message: 'Post Not Found',
          });
        }
        res.status(201).send(post)
      })
    })
    .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return Comment
    .findById(req.params.commentId)
    .then(comment => {
      if (!comment) {
        return res.status(404).send({
          message: 'Comment Not Found',
        });
      }
      // only allow user to update his own comment
      if (comment.author_id != req.user.id) {
        return res.status(401).send({
          message: 'You can only update your own comments',
        });
      }
      return comment
        .update({
          text: req.body.text || comment.text,
        })
        .then(() => { 
          Post
          .findById(req.params.postId, {
            include: [{
              model: Transaction,
              as: 'transactions',
            },{
              model: Comment,
              as: 'comments',
            },{
              model: User,
              attributes: ["id", "username", "image_url"]
            }],
          })
          .then(post => {
            if (!post) {
              return res.status(404).send({
                message: 'Post Not Found',
              });
            }
            res.status(200).send(post)
          })
        })
        .catch((error) => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return Comment
      .findById(req.params.commentId)
      .then(comment => {
        if (!comment) {
          return res.status(404).send({
            message: 'Comment Not Found',
          });
        }
        return comment
          .destroy()
          .then(() => { 
            Post
            .findById(req.params.postId, {
              include: [{
                model: Transaction,
                as: 'transactions',
              },{
                model: Comment,
                as: 'comments',
              },{
                model: User,
                attributes: ["id", "username", "image_url"]
              }],
            })
            .then(post => {
              if (!post) {
                return res.status(404).send({
                  message: 'Post Not Found',
                });
              }
              res.status(200).send(post)
            })
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
