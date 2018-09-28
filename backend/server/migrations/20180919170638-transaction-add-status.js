module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Transactions',
      'status',
     Sequelize.STRING
    );

  },

  down: function(queryInterface, Sequelize) {
    // logic for reverting the changes
    queryInterface.removeColumn(
      'Transactions',
      'status'
    );
  }
}
