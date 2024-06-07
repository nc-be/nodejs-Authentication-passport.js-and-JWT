// MODELO EN LOS QUE SE DEFINEN LOS ESQUEMAS DE LA BASE DE DATOS (CATEGORIES)

const { Model, DataTypes, Sequelize } = require('sequelize'); // LLAMAR UTILIDADES Model, DataTypes y Sequelize del paquete sequelize

const CATEGORY_TABLE = 'categories'; // DEFINIR EL NOMBRE DE LA TABLA

const CategorySchema = {
  // DEFINIR ATRIBUTOS DEL ESQUEMA (id, name, image, createAt)
  id: {
    allowNull: false,           // No permite valor nulo
    autoIncrement: true,        // Permite que el campo sea autoincrementable
    primaryKey: true,           // Si es primaryKey (?????)
    type: DataTypes.INTEGER     // Tipo de dato (INT)
  },
  name: {
    allowNull: false,           // No permite valor nulo
    type: DataTypes.STRING,     // Tipo de dato (STRING)
    unique: true               // Dato unico
  },
  image: {
    allowNull: false,           // No permite valor nulo
    type: DataTypes.STRING      // Tipo de dato (STRING)
  },
  createdAt: {
    allowNull: false,           // No permite valor nulo
    type: DataTypes.DATE,       // Tipo de dato (DATE)
    field: 'created_at',        // Nombre del campo en la base de datos
    defaultValue: Sequelize.NOW // Momento en el que se inserta este registro en la base de datos (NOW/ahora)
  },
}

// --IMPORTATE-- Definir una clase para el modelo (con Model se extienden todas las formas posibles de hacer queries con SQL)
class Category extends Model {
  //  Creacion de metodos estaticos (Estatico: No es necesario declararlos para acceder a los metodos)
  static associate(models) {
    /* RELACION hasMany CON 'Product' DESDE EL LADO DE 'Category'

    SINTAXIS:
    this.hasMany(Model, {Alias, Llave});

    Modelo: Hacia que modelo tiene la relacion (en esta caso, user)
    Alias: Alias que tendra la relacion
    Llave: LLave de esta relacion
    */
    this.hasMany(models.Product,{as: 'product',foreignKey: 'categoryId'});
    // ESTE METODO DEFINE LA RELACION, EL METODO SE EJECUTA EN EL ARCHIVO index.js
  }
  // Configuracion estatica de la conexion (recibe como parametro la conexion 'sequelize')
  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false
    }
  }
}

module.exports = { Category, CategorySchema, CATEGORY_TABLE }; // EXPORTAR
