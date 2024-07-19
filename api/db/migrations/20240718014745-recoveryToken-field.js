'use strict';
const { USER_TABLE, UserSchema } = require('./../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_TABLE, 'recovery_token',{
      field: 'recovery_token',
      allowNull: true,  // Permite valor nulo (solo es necesario si se desea recuperar el password)
      type: Sequelize.DataTypes.STRING
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(USER_TABLE, 'recoveryToken');
  }
};
