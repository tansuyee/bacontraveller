'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    buyer_id: DataTypes.INTEGER,
    seller_id: DataTypes.INTEGER
  }, {});
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.Post, {
      foreignKey: 'post_id',
      onDelete: 'CASCADE',
    });
  };
  return Transaction;
};