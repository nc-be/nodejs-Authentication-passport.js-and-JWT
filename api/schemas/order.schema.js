const Joi=require('joi');

// PARAMETROS: id
const id = Joi.number().integer();

// PARAMETROS LIGADOS AL USUARIO  - OPTION 1
const customerId = Joi.number().integer();
/* OTROS PARAMETROS QUE SE PUEDEN AÑADIR:
- Tipo de envio: Nacional o Internacional
- Estado de entrega: Entregada o no
- Estado de pago: Pagada o no
etc,etc...
*/

const getOrderSchema = Joi.object({
  id:id.required()
  }
);

const createOrderSchema = Joi.object({
  // PARAMETROS LIGADOS AL USUARIO
  customerId:customerId.required(),
});

const updateOrderSchema = Joi.object({
  // PARAMETROS LIGADOS AL USUARIO
  customerId
});

module.exports={ getOrderSchema, createOrderSchema, updateOrderSchema };
