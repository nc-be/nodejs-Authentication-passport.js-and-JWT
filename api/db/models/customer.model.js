// MODELO EN LOS QUE SE DEFINEN LOS ESQUEMAS DE LA BASE DE DATOS (USERS)

const { Model, DataTypes, Sequelize } = require('sequelize'); // LLAMAR UTILIDADES Model, DataTypes y Sequelize del paquete sequelize

const { USER_TABLE } = require('./user.model'); // LLAMAR LA TABLA DEL MODELO DE USUARIOS (NECESARIA PARA EL ATRIBUTO userId)

const CUSTOMER_TABLE = 'customers'; // DEFINIR EL NOMBRE DE LA TABLA

// DEFINIR EL ESQUEMA, SE ENCARGAN DE DEFINIR LA ESTRUCTURA DE LA BASE DE DATOS
const CustomerSchema = {
  // DEFINIR ATRIBUTOS DEL ESQUEMA (id, name, lastName, phone, createAt, userId)
  id: {
    allowNull: false,           // No permite valor nulo
    autoIncrement: true,        // Permite que el campo sea autoincrementable
    primaryKey: true,           // Si es primaryKey (?????)
    type: DataTypes.INTEGER     // Tipo de dato (INTEGRER)
  },
  name: {
    allowNull: false,           // No permite valor nulo
    type: DataTypes.STRING,     // Tipo de dato (STRING)
  },
  lastName: {
    allowNull: false,           // No permite valor nulo
    type: DataTypes.STRING,     // Tipo de dato (STRING)
    field: 'last_name',         // Nombre del campo en la base de datos
  },
  phone: {
    allowNull: true,            // Permite valor nulo
    type: DataTypes.STRING,     // Tipo de dato (STRING)
  },
  createAt:{
    allowNull: false,           // No permite valor nulo
    type: DataTypes.DATE,       // Tipo de dato (DATE)
    field: 'create_at',         // De esta forma se crean registros en la base de datos (osea en javascript se maneja como 'createAt' y en la base de datos se nombran como 'create_at')
    defaultValue: Sequelize.NOW // Momento en el que se inserta este registro en la base de datos (NOW/ahora)
  },

  // ATRIBUTO LIGADO AL ESQUEMA PARA LAS ASOCIACIONES DEL CAMPO
  userId: {
    field: 'user_id',           // De esta forma se crean registros en la base de datos (osea en javascript se maneja como 'userId' y en la base de datos se nombran como 'user_id')
    allowNull: false,           // No permite valor nulo (customer necesita un user)
    type: DataTypes.INTEGER,    // Tipo de dato (INTEGER)
    unique: true,               // Dato unico
    references: {
      model: USER_TABLE,        // Este atributo esta relacionado a la tabla de usuarios
      key: 'id'                 // Referencia de la otra tabla (atributo `id`)
  },
  onUpdate: 'CASCADE',          // Que hacer cuando se actualize el id (comportamiento en cascada ??)
  onDelete: 'SET NULL'          // Que hacer cuando se elimine el id (Establecer en nulo)
  }
}


// --IMPORTATE-- Definir una clase para el modelo (con Model se extienden todas las formas posibles de hacer queries con SQL)
class Customer extends Model {
  //  Creacion de metodos estaticos (Estatico: No es necesario declararlos para acceder a los metodos)
  static associate(models){
    //associate - En esta parte se definen todas las relaciones (?)

    /* RELACION belongsTo con 'User' DESDE EL LADO DE 'Customer'

    SINTAXIS:
    this.belongsTo(Model, {Alias});

    Modelo: Hacia que modelo tiene la relacion (en esta caso, user)
    Alias: alias que tendra la relacion
    */
    this.belongsTo(models.User, {as: 'user'});
    // ESTE METODO DEFINE LA RELACION, EL METODO SE EJECUTA EN EL ARCHIVO index.js
    this.hasMany(models.Order, {as: 'order',foreignKey: 'customerId'});
  }

  // Configuracion estatica de la conexion (recibe como parametro la conexion 'sequelize')
  static config(sequelize){
    return {
      // Retorna los siguientes parametros
      sequelize,  // Conexion
      tableName: CUSTOMER_TABLE,  // Nombre de la tabla
      modelName: 'Customer', //  Nombre del modelo (tiene el mismo nombre de la clase en la que este)
      timestamps: false //  Deshabilitar los campos por defecto 'timestamps'
    }
  }
}

module.exports = { CUSTOMER_TABLE , CustomerSchema , Customer }
