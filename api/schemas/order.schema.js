const Joi=require('joi');

// PARAMETROS: id
const id = Joi.number().integer();

// PARAMETROS LIGADOS AL USUARIO - DEFINIR
const customerId = Joi.number().integer();
/* OTROS PARAMETROS QUE SE PUEDEN AÑADIR:
- Tipo de envio: Nacional o Internacional
- Estado de entrega: Entregada o no
- Estado de pago: Pagada o no
etc,etc...
*/

// PARAMETROS LIGADOS A LOS PRODUCTOS - DEFINIR
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1); // CANTIDAD DEL PRODUCTO QUE SE QUIERE AGREGAR (MINIMO 1)


const getOrderSchema = Joi.object({
  id:id.required()
  }
);

const createOrderSchema = Joi.object({
  // PARAMETROS LIGADOS AL USUARIO
  customerId:customerId.required()
});

const updateOrderSchema = Joi.object({
  // PARAMETROS LIGADOS AL USUARIO
  customerId
});

const addItemSchema = Joi.object({
  // PARAMETROS LIGADOS A LOS PRODUCTOS
  orderId:orderId.required(),
  productId:productId.required(),
  amount:amount.required()
});

module.exports={ getOrderSchema, createOrderSchema, updateOrderSchema, addItemSchema };
