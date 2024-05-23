//  - FALTA ANALIZAR
const Joi = require('joi');
const { emit } = require('nodemon');

// PARAMETROS: id, email, password, role
const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().min(5)

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required()
});

// Para llevar a cabo el servicio 'update' es necesario 1 de 3 parametros cualquiera: email, password y role

// ^^^^^^VERIFICAR SI ES CIERTO^^^^^^
const updateUserSchema = Joi.object({
  email: email,
  password: password,
  role: role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }
