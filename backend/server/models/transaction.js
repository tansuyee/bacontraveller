'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    buyer_id: DataTypes.INTEGER,
    seller_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
  }, {});
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.Post, {
      foreignKey: 'post_id',
      onDelete: 'CASCADE',
    });
    Transaction.belongsTo(models.User, {
      foreignKey: 'buyer_id',
      onDelete: 'CASCADE',
    });
    Transaction.belongsTo(models.User, {
      foreignKey: 'seller_id',
      onDelete: 'CASCADE',
    });
  };
  return Transaction;
};