'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addConstraint('Users', ['username'], {
      type: 'unique',
      name: 'users_username_constraint'
    })
    queryInterface.addConstraint('Users', ['email'], {
      type: 'unique',
      name: 'users_email_constraint'
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('Users', 'users_username_constraint')
    queryInterface.removeConstraint('Users', 'users_email_constraint')
  }
};
