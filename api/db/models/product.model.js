// MODELO EN LOS QUE SE DEFINEN LOS ESQUEMAS DE LA BASE DE DATOS (CATEGORIES)

const { Model, DataTypes, Sequelize } = require('sequelize'); // LLAMAR UTILIDADES Model, DataTypes y Sequelize del paquete sequelize

const { CATEGORY_TABLE } = require('./category.model'); // LLAMAR LA TABLA DEL MODELO DE CATEGORIAS (NECESARIA PARA EL ATRIBUTO categoryId)

const PRODUCT_TABLE = 'products'; // DEFINIR EL NOMBRE DE LA TABLA

const ProductSchema = {
  // DEFINIR ATRIBUTOS DEL ESQUEMA (id, name, image, description, price, createAt, categoryId)
  id: {
    allowNull: false,            // No permite valor nulo
    autoIncrement: true,         // Permite que el campo sea autoincrementable
    primaryKey: true,            // Si es primaryKey (?????)
    type: DataTypes.INTEGER      // Tipo de dato (INT)
  },
  name: {
    allowNull: false,             // No permite valor nulo
    type: DataTypes.STRING,       // Tipo de dato (STRING)
  },
  image: {
    allowNull: false,             // No permite valor nulo
    type: DataTypes.STRING        // Tipo de dato (STRING)
  },
  description: {
    allowNull: false,             // No permite valor nulo
    type: DataTypes.TEXT          // Tipo de dato (TEXT)
  },
  price: {
    allowNull: false,             // No permite valor nulo
    type: DataTypes.INTEGER       // Tipo de dato (INTEGER)
  },
  createdAt: {
    allowNull: false,             // No permite valor nulo
    type: DataTypes.DATE,         // Tipo de dato (DATE)
    field: 'created_at',          // Nombre del campo en la base de datos
    defaultValue: Sequelize.NOW   // Momento en el que se inserta este registro en la base de datos (NOW/ahora)
  },
  categoryId: {
    field: 'category_id',         // Nombre del campo en la base de datos
    allowNull: false,             // No permite valor nulo
    type: DataTypes.INTEGER,      // Tipo de dato (INTEGER)
    // EN ESTE CASO NO ES NECESARIO QUE EL DATO SEA UNICO PORQUE SE QUIERE RELACIONAR CATEGORIA A MULTIPLES PRODUCTOS (Caso contrario a la relacion 1on1 entre customers y users)
    references: {
      model: CATEGORY_TABLE,      // Este atributo esta relacionado a la tabla de categorias
      key: 'id'                   // Referencia de la otra tabla (atributo `id`)
    },
    onUpdate: 'CASCADE',          // Que hacer cuando se actualize el id (comportamiento en cascada ??)
    onDelete: 'SET NULL'          // Que hacer cuando se elimine el id (Establecer en nulo)
  }
}

// --IMPORTATE-- Definir una clase para el modelo (con Model se extienden todas las formas posibles de hacer queries con SQL)
class Product extends Model {
  //  Creacion de metodos estaticos (Estatico: No es necesario declararlos para acceder a los metodos)
  static associate(models) {
    this.belongsTo(models.Category, {as: 'category'});
  }
  // Configuracion estatica de la conexion (recibe como parametro la conexion 'sequelize')
  static config(sequelize) {
    return {
      // Retorna los siguientes parametros
      sequelize,  // Conexion
      tableName: PRODUCT_TABLE, //  Nombre de la tabla
      modelName: 'Product', //  Nombre del modelo (tiene el mismo nombre de la clase en la que este)
      timestamps: false //  Deshabilitar los campos por defecto 'timestamps'
    }
  }
}

module.exports = { Product, ProductSchema, PRODUCT_TABLE }; // EXPORTAR
