'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Posts', 'status', {
      type: Sequelize.STRING,
      defaultValue: 'PENDING'
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Posts', 'status')
  }
};
