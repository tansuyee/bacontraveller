'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addConstraint('Transactions', ['buyer_id', 'seller_id', 'post_id'], {
      type: 'unique',
      name: 'transactions_constraint'
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('Transactions', 'transactions_constraint')
  }
};
