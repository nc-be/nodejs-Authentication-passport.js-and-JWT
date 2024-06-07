// MODELO EN LOS QUE SE DEFINEN LOS ESQUEMAS DE LA BASE DE DATOS (ORDER)
// LOGICA COPIADA DE ./category.model.js
// DEFINIR ATRIBUTOS DEL ESQUEMA (id, customerId, createAt)

const { CUSTOMER_TABLE } = require('./customer.model'); // LLAMAR LA TABLA DEL MODELO DE CLIENTES (NECESARIA PARA EL ATRIBUTO customerId)

const { Model, DataTypes, Sequelize } = require('sequelize');

const ORDER_TABLE = 'orders';

const OrderSchema = {
// DEFINIR ATRIBUTOS DEL ESQUEMA (id, customerId, createAt)
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Order extends Model {

  static associate(models) {
    // LA ORDEN PERTENECE A VARIOS CLIENTES
    this.belongsTo(models.Customer, {as: 'customer'});
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false
    }
  }
}

module.exports = { Order, OrderSchema, ORDER_TABLE };
