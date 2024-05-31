'use strict';

const { CATEGORY_TABLE, CategorySchema } = require('./../models/category.model');
const { PRODUCT_TABLE, ProductSchema } = require('./../models/product.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // queryInterface permite ejecutar los comandos de interaccion con la base de datos
  // Tambien se cuenta con una interfaz de sequelize, 'Sequelize':  async up (queryInterface, Sequelize) pero no se usara en este momento (clase 14)
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema); // Crear la tabla de usuarios 'users'
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema); // Crear la tabla de usuarios 'users'

    /* SINTAXIS
    await queryInterface.createTable(Nombre_tabla, Nombre_esquema);
    */
  },

  // down permite revertir cambios (EJ: La creacion de la tabla 'users')
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
  }
};

