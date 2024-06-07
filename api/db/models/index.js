// ESTE ARCHIVO SE ENCARGA DE ENVIAR LA CONEXION HACIA LOS MODELOS PARA HACER MAPEO DE DATOS
const { UserSchema, User } = require('./user.model'); // LLAMAR EL MODELO ESTATICO CREADO PARA EL SERVICIO 'user.service.js'
const { CustomerSchema, Customer } = require('./customer.model'); // LLAMAR EL MODELO ESTATICO CREADO PARA EL SERVICIO 'customer.service.js'
const { CategorySchema, Category } = require('./category.model'); // LLAMAR EL MODELO ESTATICO CREADO PARA EL SERVICIO 'category.service.js'
const { ProductSchema, Product } = require('./product.model'); // LLAMAR EL MODELO ESTATICO CREADO PARA EL SERVICIO 'category.service.js'
const { OrderSchema, Order } = require('./order.model'); // LLAMAR EL MODELO ESTATICO CREADO PARA EL SERVICIO 'category.service.js'
const { OrderProductSchema, OrderProduct } = require('./order-product.model'); // LLAMAR EL MODELO ESTATICO CREADO PARA EL SERVICIO 'category.service.js'



// CONFIGURACION DE LOS MODELOS, LA FUNCION RECIBE LA CONEXION 'sequelize'
function setupModels(sequelize) {
  /*
  SINTAXIS: User.init(Nombre_Esquema, ConfiguracionEsquema)

  SE USA PARA HACER init DE LOS ESQUEMAS JUNTO A SU CONFIGURACION (YA QUE ESTE CASO ES UN METODO ESTATICO SOLO SE NECESITA PONER config() SIN NECESIDAD DE UNA INSTANCIA (SE PUEDE LLAMAR DE FORMA DIRECTA (?)) ) */

  User.init(UserSchema, User.config(sequelize));  // Esquema de usuarios
  Customer.init(CustomerSchema, Customer.config(sequelize));  // Esquema de clientes
  Category.init(CategorySchema, Category.config(sequelize));  // Esquema de categorias
  Product.init(ProductSchema, Product.config(sequelize));  // Esquema de productos
  Order.init(OrderSchema, Order.config(sequelize));  // Esquema de ordenes de compra
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));  // Esquema de ordenes de compra


  // EJECUCION DE LOS METODOS DE LAS ASOCIACIONES CREADAS EN LOS MODELOS, REQUIEREN QUE SE LES ENVIEN LOS MODELOS DE SEQUELIZE
  Customer.associate(sequelize.models); // Asociaciones del modelo 'customer.model'
  User.associate(sequelize.models); // Asociaciones del modelo 'user.model'
  Category.associate(sequelize.models); // Asociaciones del modelo 'category.model'
  Product.associate(sequelize.models); // Asociaciones del modelo 'product.model'
  Order.associate(sequelize.models); // Asociaciones del modelo 'order.model'
  OrderProduct.associate(sequelize.models); // Asociaciones del modelo 'Order-product.model'
}

module.exports = setupModels;
