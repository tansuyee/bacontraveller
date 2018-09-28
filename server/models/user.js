'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    image_url: DataTypes.STRING,
    facebook_provider_id: DataTypes.STRING,
    facebook_provider_token: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: async function(user) {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);  
        }
      } 
    }
  });

  User.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  }

  User.prototype.toJSON = function() {
    let values = Object.assign({}, this.get());
    delete values.password;
    return values;
  }

  User.associate = function(models) {
    User.hasMany(models.Post, {
      foreignKey: 'creator_id',
      as: 'posts_buy'
    });
    User.hasMany(models.Follow, {
      foreignKey: 'target_id',
      as: 'followers'
    });
    User.hasMany(models.Follow, {
      foreignKey: 'follower_id',
      as: 'following'
    });
    User.hasMany(models.Transaction, {
      foreignKey: 'seller_id',
      as: 'transactions_sell'
    });
  };

  return User;
};
