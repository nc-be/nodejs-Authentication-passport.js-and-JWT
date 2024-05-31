// - FALTA ANALIZAR
const Joi = require('joi'); // LLAMAR PAQUETE JOI

/* DEFINIR CADA UNO DE LOS CAMPOS: id, name, description Y price */

// id
const id = Joi.string()
.uuid(); // EL id ES TIPO string Y uuid (valor de 128 bits)

// name
const name = Joi.string() // EL nombre (name) ES TIPO string
.alphanum() // SU VALOR ES alfanumerico
.min(3) // TIENE UN MINIMO DE 3 caracteres
.max(15) // TIENE UN MAXIMO DE 15 caracteres

// price
const price = Joi.number() // EL precio (precio) ES TIPO number
.integer() // SU VALOR ES entero normal
.min(10) // TIENE UN valor >= 10 (10 dolares)

//description
const description = Joi.string() // LA imagen (image) ES TIPO string
.min(10) // TIENE UN MINIMO DE 3 caracteres
.max(20) // TIENE UN MAXIMO DE 15 caracteres

// image
const image = Joi.string() // LA imagen (image) ES TIPO string
.uri() // DEBE SER UNA url

/* ESQUEMAS */

// ESQUEMA PARA LA CREACION (SERVICIO create/post) - REUNE TODOS LOS CAMPOS REQUERIDOS O NO PARA LLEVAR A CABO EL SERVICIO (name, price, image)
const creteProductSchema = Joi.object({
  name: name.required(),  // REQUERIDO: OBLIGATORIO TENER ESTE CAMPO
  price: price.required(),
  description: description.required(),
  image: image.required()
});

// ESQUEMA PARA LA ACTUALIZACION DE DATOS (SERVICIO update) - REUNE TODOS LOS CAMPOS REQUERIDOS O NO PARA LLEVAR A CABO EL SERVICIO (name, price, image)
const updateProductSchema = Joi.object({
  name: name,  // NO REQUERIDO: OPCIONAL TENER ESTE CAMPO
  price: price,
  description: description,
  image: image
});

// ESQUEMA PARA LA OBTENCION DE DATOS (SERVICIO get) - REUNE TODOS LOS CAMPOS REQUERIDOS O NO PARA LLEVAR A CABO EL SERVICIO (id)
const getProductSchema = Joi.object({
  id: id.required()
});

module.exports = { creteProductSchema,updateProductSchema,getProductSchema };  // EXPORTAR TODOS LOS ESQUEMAS
