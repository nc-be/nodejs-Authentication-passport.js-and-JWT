const Joi=require('joi');

// PARAMETROS: id, name, lastName, phone, userId
const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const lastName = Joi.string();
const phone = Joi.string();

// PARAMETROS LIGADOS AL USUARIO  - OPTION 1
const userId = Joi.number().integer();

// PARAMETROS LIGADOS AL USUARIO  - OPTION 2
const email = Joi.string().email();
const password = Joi.string();

const getCustomerSchema = Joi.object({
  id:id.required()
  }
);

const createCustomerSchema = Joi.object({
  name:name.required(),
  lastName:lastName.required(),
  phone:phone.required(),

  // PARAMETROS LIGADOS AL USUARIO
  // userId - OPTION 1 - En esta opcion se requiere el userId
  // userId:userId.required()

  // Datos de usuario directos  - OPTION 2  - En esta opcion se requiere enviar el email y password en forma de objeto "user":{}
  user:Joi.object({
    email:email.required(),
    password:password.required()
    }
  )
  }
);

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,

  // PARAMETROS LIGADOS AL USUARIO
  // userId - OPTION 1 - En esta opcion se requiere el userId/*
  userId


  // Datos de usuario directos  - OPTION 2  - En esta opcion se requiere el email y password en forma de objeto "user":{}
  /* user:Joi.object({
    email:email,
    password:password
    }
  ) */
  }
);

module.exports={ getCustomerSchema, createCustomerSchema, updateCustomerSchema };
