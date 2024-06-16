const Joi = require('joi'); // LLAMAR PAQUETE JOI

/* DEFINIR CADA UNO DE LOS CAMPOS: id, name, description Y price */

// id
const id = Joi.number()
.integer();   // 'id' AUTOINCREMENTAL

// name
const name = Joi.string() // EL nombre (name) ES TIPO string
.min(3) // TIENE UN MINIMO DE 3 caracteres
.max(15) // TIENE UN MAXIMO DE 15 caracteres

// price
const price = Joi.number() // EL precio (precio) ES TIPO number
.integer() // SU VALOR ES entero normal
.min(10) // TIENE UN valor >= 10 (10 dolares)

  // price min
  const priceMin = Joi.number() // EL precio (precio) ES TIPO number
  .integer() // SU VALOR ES entero normal
  .min(10) // TIENE UN valor >= 10 (10 dolares)  // price min

  // price MAX
  const priceMax = Joi.number() // EL precio (precio) ES TIPO number
  .integer() // SU VALOR ES entero normal
  .min(10) // TIENE UN valor >= 10 (10 dolares)

//description
const description = Joi.string() // LA imagen (image) ES TIPO string
.min(10) // TIENE UN MINIMO DE 3 caracteres
.max(20) // TIENE UN MAXIMO DE 15 caracteres

// image
const image = Joi.string() // LA imagen (image) ES TIPO string
.uri() // DEBE SER UNA url

//categoryId
const categoryId = Joi.number()
.integer();   // 'id' AUTOINCREMENTAL

//limit
const limit = Joi.number()
.integer();

//offset
const offset = Joi.number()
.integer();

/* ESQUEMAS */

// ESQUEMA PARA LA CREACION (SERVICIO create/post) - REUNE TODOS LOS CAMPOS REQUERIDOS O NO PARA LLEVAR A CABO EL SERVICIO (name, price, image)
const createProductSchema = Joi.object({
  name: name.required(),  // REQUERIDO: OBLIGATORIO TENER ESTE CAMPO
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required()
});

// ESQUEMA PARA LA ACTUALIZACION DE DATOS (SERVICIO update) - REUNE TODOS LOS CAMPOS REQUERIDOS O NO PARA LLEVAR A CABO EL SERVICIO (name, price, image)
const updateProductSchema = Joi.object({
  name: name,  // NO REQUERIDO: OPCIONAL TENER ESTE CAMPO
  price: price,
  description: description,
  image: image,
  categoryId
});

// ESQUEMA PARA LA OBTENCION DE DATOS (SERVICIO get) - REUNE TODOS LOS CAMPOS REQUERIDOS O NO PARA LLEVAR A CABO EL SERVICIO (id)
const getProductSchema = Joi.object({
  id: id.required()
});

// ESQUEMA PARA LA PAGINACION - PIDE AL USUARIO INGRESAR LOS VALORES DE limit Y offset (AL MENOS UNO)
const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  priceMin,
  // PRECIO MAXIMO TIENE UN CONDICIONAL: SIEMPRE SE DEBE ENVIAR ESTE VALOR SI SE ENVIO UN PRECIO MINIMO
  /* SINTAXIS:
  Atributo: Nombre_Atributo.when('Nombre_Atributo2, {condition,response}')

  Nombre_Atributo: Atributo influenciado condicional
  when: Condicional sequelize
  Nombre_Atributo2: Atributo que debe existir segun el condicional
  condition: Tipo de dato/valor/etc que debe tener el atributo
  response: Esto debe hacer el Nombre_Atributo si se cumple condition
  */
  priceMax: priceMax.when('priceMin',{
    is: Joi.number().integer().min(10).required(),  // PROPIEDADES DEL PRECIO MINIMO (SI EL PRECIO MINIMO EXISTE Y ES UN NUMERO ENTERO DE CON UN VALOR MINIMO DE 10)
    then: Joi.required()
    }
    )
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema };  // EXPORTAR TODOS LOS ESQUEMAS
