const Post = require('../models').Post;
const Transaction = require('../models').Transaction;

module.exports = {
  create(req, res) {
    return Post
      .create({
        creator_id: req.user.id,
        item_name: req.body.item_name,
        item_image_url: req.body.item_image_url,
        description: req.body.description,
        price: req.body.price,
        country_from: req.body.country_from,
        country_to: req.body.country_to,
      })
      .then(post => res.status(201).send())
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Post
      .findAll({
        include: [{
          model: Transaction,
          as: 'transactions',
        }],
      })
      .then(posts => res.status(200).send(posts))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Post
      .findById(req.params.postId, {
        include: [{
          model: Transaction,
          as: 'transactions',
        }],
      })
      .then(post => {
        if (!post) {
          return res.status(404).send({
            message: 'Post Not Found',
          });
        }
        return res.status(200).send(post);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return Post
    .findById(req.params.postId)
    .then(post => {
      if (!post) {
        return res.status(404).send({
          message: 'Post Not Found',
        });
      }
      // only allow a user to update his own posts
      if (req.user.id != post.creator_id) {
        return res.status(401).send({
          message: 'You are not authorized to update this post',
        });
      }
      return post
        .update({
          item_name: req.body.item_name || post.item_name,
          item_image_url: req.body.item_image_url || post.item_image_url,
          description: req.body.description || post.description,
          price: req.body.price || post.price,
          country_from: req.body.country_from || post.country_from,
          country_to: req.body.country_to || post.country_to,
        })
        .then(() => res.status(200).send(post))
        .catch((error) => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return Post
      .findById(req.params.postId)
      .then(post => {
        if (!post) {
          return res.status(404).send({
            message: 'Post Not Found',
          });
        }
        // only allow a user to delete his own posts
        if (req.user.id != post.creator_id) {
          return res.status(401).send({
            message: 'You are not authorized to delete this post',
          });
        }
        return post
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  // user accepts someone (for now, a buyer)'s post
  accept(req, res) {
    return Post
      .findById(req.params.postId)
      .then(post => {
        // do not allow a user to accept his own post
        if (req.user.id == post.creator_id) {
          return res.status(401).send({
            message: 'You are not allowed to accept your own post',
          });
        }
        return Transaction
          .create({
            buyer_id: post.creator_id,
            seller_id: req.user.id,
            post_id: req.params.postId,
          })
          .then(transaction => res.status(201).send())
          .catch(error => res.status(400).send(error));
        });
  }
};
