// ESTE ARCHIVO SE ENCARGA DE ENVIAR LA CONEXION HACIA LOS MODELOS PARA HACER MAPEO DE DATOS
const { UserSchema, User } = require('./user.model'); // LLAMAR EL MODELO ESTATICO CREADO PARA EL SERVICIO 'user.service.js'
const { CustomerSchema, Customer } = require('./customer.model'); // LLAMAR EL MODELO ESTATICO CREADO PARA EL SERVICIO 'user.customer.js'
const { CategorySchema, Category } = require('./category.model'); // LLAMAR EL MODELO ESTATICO CREADO PARA EL SERVICIO 'user.category.js'
const { ProductSchema, Product } = require('./product.model'); // LLAMAR EL MODELO ESTATICO CREADO PARA EL SERVICIO 'user.product.js'


// CONFIGURACION DE LOS MODELOS, LA FUNCION RECIBE LA CONEXION 'sequelize'
function setupModels(sequelize) {
  /*
  SINTAXIS: User.init(Nombre_Esquema, ConfiguracionEsquema)

  SE USA PARA HACER init DE LOS ESQUEMAS JUNTO A SU CONFIGURACION (YA QUE ESTE CASO ES UN METODO ESTATICO SOLO SE NECESITA PONER config() SIN NECESIDAD DE UNA INSTANCIA (SE PUEDE LLAMAR DE FORMA DIRECTA (?)) ) */

  User.init(UserSchema, User.config(sequelize));  // Esquema de usuarios
  Customer.init(CustomerSchema, Customer.config(sequelize));  // Esquema de clientes
  /* Category.init(UserSchema, Category.config(sequelize));
  Product.init(UserSchema, Product.config(sequelize)); */

  // EJECUCION DE LOS METODOS DE LAS ASOCIACIONES CREADAS EN LOS MODELOS, REQUIEREN QUE SE LES ENVIEN LOS MODELOS DE SEQUELIZE
  Customer.associate(sequelize.models); // Asociaciones del modelo 'Customer.model'
  User.associate(sequelize.models); // Asociaciones del modelo 'User.model'
  /* User.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models); */
}

module.exports = setupModels;
