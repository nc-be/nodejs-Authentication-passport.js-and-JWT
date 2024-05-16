// MODELO EN LOS QUE SE DEFINEN LOS ESQUEMAS DE LA BASE DE DATOS (USERS)

const { Model, DataTypes, Sequelize } = require('sequelize'); // LLAMAR UTILIDADES Model, DataTypes y Sequelize del paquete sequelize

const USER_TABLE = 'users'; // DEFINIR EL NOMBRE DE LA TABLA

// DEFINIR EL ESQUEMA, SE ENCARGAN DE DEFINIR LA ESTRUCTURA DE LA BASE DE DATOS
const UserSchema = {
  // DEFINIR ATRIBUTOS DEL ESQUEMA
  id: {
    allowNull: false,           // No permite valor nulo
    autoIncrement: true,        // Permite que el campo sea autoincrementable
    primaryKey: true,           // Si es primaryKey (?????)
    type: DataTypes.INTEGER     // Tipo de dato (INTEGRER)
  },
  email:{
    allowNull: false,           // No permite valor nulo
    type: DataTypes.STRING,     // Tipo de dato (STRING)
    unique: true                // Correo unico (No se puede repetir por usuario)
  },
  password:{
    allowNull: false,           // No permite valor nulo
    type: DataTypes.STRING      // Tipo de dato (STRING)
  },
  createAt:{
    allowNull: false,           // No permite valor nulo
    type: DataTypes.DATE,       // Tipo de dato (DATE)
    field: 'create_at',         // De esta forma se crean registros en la base de datos (osea en javascript se maneja como 'createAt' y en la base de datos se nombran como 'create_at')
    defaultValue: Sequelize.NOW // Momento en el que se inserta este registro en la base de datos (NOW/ahora)
  },
  role:{
    allowNull: false,           // No permite valor nulo
    type: DataTypes.STRING,     // Tipo de dato (STRING)
    defaultValue: 'customer'    // Su valor por defecto es de tipo 'customer' (??)
  }
}

// --IMPORTATE-- Definir una clase para el modelo (con Model se extienden todas las formas posibles de hacer queries con SQL)
class User extends Model {
  //  Creacion de metodos estaticos (Estatico: No es necesario declararlos para acceder a los metodos)
  static associate(){
    //associate - En esta parte se definen todas las relaciones (?)
  }

  // Configuracion estatica de la conexion (recibe como parametro la conexion 'sequelize')
  static config(sequelize){
    return {
      // Retorna los siguientes parametros
      sequelize,  // Conexion
      tableName: USER_TABLE,  // Nombre de la tabla
      modelName: 'User', //  Nombre del modelo (tiene el mismo nombre de la clase en la que este)
      timestamps: false //  Deshabilitar los campos por defecto 'timestamps'
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User }
