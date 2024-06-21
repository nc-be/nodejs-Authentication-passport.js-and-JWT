// MODELO EN LOS QUE SE DEFINEN LOS ESQUEMAS DE LA BASE DE DATOS (ORDER)
// LOGICA COPIADA DE ./category.model.js
// DEFINIR ATRIBUTOS DEL ESQUEMA (id, customerId, createAt)

const { CUSTOMER_TABLE } = require('./customer.model'); // LLAMAR LA TABLA DEL MODELO DE CLIENTES (NECESARIA PARA EL ATRIBUTO customerId)

const { Model, DataTypes, Sequelize } = require('sequelize');

const ORDER_TABLE = 'orders';

const OrderSchema = {
// DEFINIR ATRIBUTOS DEL ESQUEMA (id, customerId, createAt, total)
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
  },

  // PRECIO TOTAL DE UNA ORDEN DE COMPRA
  /*
  NOTA IMPORTANTE
  NOTA IMPORTANTE
  NOTA IMPORTANTE
  NOTA IMPORTANTE:  COMENTAR ATRIBUTO HASTA CREAR MIGRACION-all
  */
  total: {
    type: DataTypes.VIRTUAL, //ESTE ATRIBUTO NO EXISTE REALMENTE DENTRO DE LA TABLA, SOLO EXISTE PARA CALCULAR EL VALOR TOTAL DE MANERA VIRTUAL
    get() {
      // ESTE CONDICIONAL VERIFICA QUE EXISTA ALGUN ITEM DENTRO DE LA ASOCIACION PARA PODER EMPEZAR A CALCULAR
      /*
      SINTAXIS: this.Objecto.length

      El objeto en este caso es la asociacion la cual funciona como un objeto al usar el comando 'length' si existe algun objeto el indice aumenta a 1
      */
      if (this.items.length > 0) {
        // 'reduce' CUMPLE LA FUNCION DE UN CICLO ?for'
        /*
        En teoria la funcion de 'reduce' monitorear los items de una orden de compras, despues de monitorear un item suma el valor de su precio*cantidad con la constante 'total' (que comienza en 0 incialmente). Este valor se convierte en el valor actual de 'total'
        */
        return this.items.reduce((total, item) => {
          return total + (item.price * item.OrderProduct.amount);
        }, 0);
      }
      // SI NO EXISTEN ITEMS DENTRO DE LA ORDEN EL VALOR DEL 'total' SERA 0
      return 0;
    }
  }
}

class Order extends Model {

  static associate(models) {
    // LA ORDEN PERTENECE A VARIOS CLIENTES
    this.belongsTo(models.Customer, {as: 'customer'});
    /* RELACION belongsToMany CON 'Product' DESDE EL LADO DE 'Order'

    SINTAXIS:
    this.belongsToMany(Model, {Alias, Interm, Llave, Llave2});

    Modelo: Hacia que modelo tiene la relacion (en esta caso, user)
    Alias: Alias que tendra la relacion
    Interm: Se encarga de resolver la relacion (Intermediario)
    Llave: Llave de la relacion
    Llave2: Llave de la relacion -  Modelo ligado
    */
    this.belongsToMany(models.Product, {
      as: 'items',
      through:models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId'
    }
    );
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
