'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Users', 'facebook_provider_id', {
      type: Sequelize.STRING
    })
    queryInterface.addColumn('Users', 'facebook_provider_token', {
      type: Sequelize.STRING
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Users', 'facebook_provider_id')
    queryInterface.removeColumn('Users', 'facebook_provider_token')
  }
};
