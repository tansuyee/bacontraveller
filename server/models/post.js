'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    item_name: DataTypes.STRING,
    item_image_url: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.STRING,
    country_from: DataTypes.STRING,
    country_to: DataTypes.STRING
  }, {});
  Post.associate = function(models) {
    Post.belongsTo(models.User, {
      foreignKey: 'creator_id',
      onDelete: 'CASCADE',
    });
    Post.hasMany(models.Transaction, {
      foreignKey: 'post_id',
      as: 'transactions'
    });
  };
  return Post;
};
