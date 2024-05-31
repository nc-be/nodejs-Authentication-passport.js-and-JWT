// ESTE ARCHIVO SE ENCARGA DE ENVIAR LA CONEXION HACIA LOS MODELOS PARA HACER MAPEO DE DATOS
const { UserSchema, User } = require('./user.model'); // LLAMAR EL MODELO ESTATICO CREADO PARA EL SERVICIO 'user.service.js'
const { CustomerSchema, Customer } = require('./customer.model'); // LLAMAR EL MODELO ESTATICO CREADO PARA EL SERVICIO 'customer.service.js'
const { CategorySchema, Category } = require('./category.model'); // LLAMAR EL MODELO ESTATICO CREADO PARA EL SERVICIO 'category.service.js'
const { ProductSchema, Product } = require('./product.model'); // LLAMAR EL MODELO ESTATICO CREADO PARA EL SERVICIO 'category.service.js'


// CONFIGURACION DE LOS MODELOS, LA FUNCION RECIBE LA CONEXION 'sequelize'
function setupModels(sequelize) {
  /*
  SINTAXIS: User.init(Nombre_Esquema, ConfiguracionEsquema)

  SE USA PARA HACER init DE LOS ESQUEMAS JUNTO A SU CONFIGURACION (YA QUE ESTE CASO ES UN METODO ESTATICO SOLO SE NECESITA PONER config() SIN NECESIDAD DE UNA INSTANCIA (SE PUEDE LLAMAR DE FORMA DIRECTA (?)) ) */

  User.init(UserSchema, User.config(sequelize));  // Esquema de usuarios
  Customer.init(CustomerSchema, Customer.config(sequelize));  // Esquema de clientes
  Category.init(UserSchema, Category.config(sequelize));  // Esquema de categorias
  Product.init(UserSchema, Product.config(sequelize));  // Esquema de productos

  // EJECUCION DE LOS METODOS DE LAS ASOCIACIONES CREADAS EN LOS MODELOS, REQUIEREN QUE SE LES ENVIEN LOS MODELOS DE SEQUELIZE
  Customer.associate(sequelize.models); // Asociaciones del modelo 'Customer.model'
  User.associate(sequelize.models); // Asociaciones del modelo 'User.model'
  Category.associate(sequelize.models); // Asociaciones del modelo 'Category.model'
  Product.associate(sequelize.models); // Asociaciones del modelo 'Product.model'
}

module.exports = setupModels;
