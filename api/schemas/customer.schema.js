const Joi=require('joi');

// PARAMETROS: id, name, lastName, phone, userId
const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const lastName = Joi.string();
const phone = Joi.string();

// PARAMETROS LIGADOS AL USUARIO
const userId = Joi.number().integer();
/* const email = Joi.string().email();
const password = Joi.string(); */

const getCustomerSchema = Joi.object({
  id:id.required()
  }
);

const createCustomerSchema = Joi.object({
  name:name.required(),
  lastName:lastName.required(),
  phone:phone.required(),

  // PARAMETROS LIGADOS AL USUARIO
  userId:userId.required(),
  /* user:Joi.object({
    email:email.required(),
    password:password.required()
    }
  )*/
  }
);

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,

  // PARAMETROS LIGADOS AL USUARIO
  userId
  }
);

module.exports={ getCustomerSchema, createCustomerSchema, updateCustomerSchema };
