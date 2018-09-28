'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addConstraint('Follows', ['target_id', 'follower_id'], {
      type: 'unique',
      name: 'follows_constraint'
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('Follows', 'follows_constraint')
  }
};

