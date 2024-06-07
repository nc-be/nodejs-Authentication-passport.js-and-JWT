// TABLA TERNARIA ENTRE order Y product - RELACION MUCHOS A MUCHOS

const { Model, DataTypes, Sequelize } = require('sequelize');

// IMPORTAR TABLAS DE PRODUCTOS Y ORDENES
const { ORDER_TABLE } = require('./order.model'); //NECESARIA PARA EL ATRIBUTO orderId
const { PRODUCT_TABLE } = require('./product.model'); //NECESARIA PARA EL ATRIBUTO productId

const ORDER_PRODUCT_TABLE = 'orders_products'; // DEFINIR EL NOMBRE DE LA TABLA

const OrderProductSchema = {
  // DEFINIR ATRIBUTOS DEL ESQUEMA (id, createAt, amount, orderId, productId)
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  // amount: CANTIDAD DE PRODUCTOS
  amount:{
    allowNull: false,
    type: DataTypes.INTEGER
  },
  createAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },
  orderId: {
    field: 'order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: ORDER_TABLE, // ENLAZAR TABLA A UNA ORDEN
      key: 'id'
  },onUpdate: 'CASCADE',
  onDelete: 'SET NULL'
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: PRODUCT_TABLE, // ENLAZAR TABLA A UN PRODUCTO
      key: 'id'
  },
  onUpdate: 'CASCADE',
  onDelete: 'SET NULL'
  }
}

  class OrderProduct extends Model {

    static associate(models){
    }
    static config(sequelize){
      return {
        sequelize,
        tableName: ORDER_PRODUCT_TABLE,
        modelName: 'OrderProduct',
        timestamps: false
      }
    }
  }

module.exports = { ORDER_PRODUCT_TABLE , OrderProductSchema , OrderProduct }
