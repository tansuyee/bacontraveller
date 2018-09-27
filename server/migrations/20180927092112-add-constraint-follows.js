'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Follows', ['target_id', 'follower_id'], {
      type: 'unique',
      name: 'follows_constraint'
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Follows', 'follows_constraint')
  }
};

