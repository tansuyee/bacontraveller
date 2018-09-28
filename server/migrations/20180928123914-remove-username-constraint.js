'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('Users', 'users_username_constraint')
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.addConstraint('Users', ['username'], {
      type: 'unique',
      name: 'users_username_constraint'
    })
  }
};
