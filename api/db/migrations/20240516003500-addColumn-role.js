'use strict';
const { USER_TABLE, UserSchema } = require('./../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    /* SINTAXIS
    await queryInterface.addColumn(Nombre_tabla, Nombre_campo, Nombre_esquema.atributo);

    Nombre_tabla= USER_TABLE   // Importado del modelo
    Nombre_campo= 'role'       // titulo de la columa
    Nombre_esquema= UserSchema // Importado del modelo
    atributo= role             // se encuentra establecido en el esquema
    */
    await queryInterface.addColumn(USER_TABLE,'role', UserSchema.role);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(USER_TABLE,'role', UserSchema.role);
  }
};
