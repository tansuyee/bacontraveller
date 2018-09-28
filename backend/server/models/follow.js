'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
  }, {});
  Follow.associate = function(models) {
    Follow.belongsTo(models.User, {
      foreignKey: 'target_id',
      onDelete: 'CASCADE',
    });
    Follow.belongsTo(models.User, {
      foreignKey: 'follower_id',
      onDelete: 'CASCADE',
    });
  };
  return Follow;
};