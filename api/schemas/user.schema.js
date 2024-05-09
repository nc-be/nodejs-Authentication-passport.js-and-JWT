//  - FALTA ANALIZAR
const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
//const role = Joi.string().min(5)

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  //role: role.required()
});

// Para llevar a cabo el servicio 'update' es necesario 1 de 2 parametros cualquiera: email y role (2 por el momento, ya que role esta deshabilitado)

// ^^^^^^VERIFICAR SI ES CIERTO^^^^^^
const updateUserSchema = Joi.object({
  email: email,
  password: password
  //role: role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }
