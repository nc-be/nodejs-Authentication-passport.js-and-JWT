// TAMBIEN SE CONOCE CON EL NOMBRE DTO
/* SE ENCARGA DE VALIDAR LA DATA ENVIADA POR EL CLIENTE */
const Joi = require('joi'); // LLAMAR PAQUETE JOI

/* DEFINIR CADA UNO DE LOS CAMPOS: id, name Y price */

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

// image
const image = Joi.string() // LA imagen (image) ES TIPO string
.uri() // DEBE SER UNA url

/* ESQUEMAS */

// ESQUEMA PARA LA CREACION (SERVICIO create/post) - REUNE TODOS LOS CAMPOS REQUERIDOS O NO PARA LLEVAR A CABO EL SERVICIO (name, price, image)
const creteProductSchema = Joi.object({
  name: name.required(),  // REQUERIDO: OBLIGATORIO TENER ESTE CAMPO
  price: price.required(),
  image: image.required()
});

// ESQUEMA PARA LA ACTUALIZACION DE DATOS (SERVICIO update) - REUNE TODOS LOS CAMPOS REQUERIDOS O NO PARA LLEVAR A CABO EL SERVICIO (name, price, image)
const updateProductSchema = Joi.object({
  name: name,  // NO REQUERIDO: OPCIONAL TENER ESTE CAMPO
  price: price,
  image: image
});

// ESQUEMA PARA LA OBTENCION DE DATOS (SERVICIO get) - REUNE TODOS LOS CAMPOS REQUERIDOS O NO PARA LLEVAR A CABO EL SERVICIO (id)
const getProductSchema = Joi.object({
  id: id.required()
});

module.exports = { creteProductSchema,updateProductSchema,getProductSchema };  // EXPORTAR TODOS LOS ESQUEMAS

/* VA DE LA MANO CON EL middleware 'validatorHandler.js' PARA VERIFICAR SU FUNCIONAMIENTO (./MIDDLEWARES/validator.handler.js) */

/* EJEMPLO middleware utilizando JOI

const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    repeat_password: Joi.ref('password'),

    access_token: [
        Joi.string(),
        Joi.number()
    ],

    birth_year: Joi.number()
        .integer()
        .min(1900)
        .max(2013),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})
    .with('username', 'birth_year')
    .xor('password', 'access_token')
    .with('password', 'repeat_password');


schema.validate({ username: 'abc', birth_year: 1994 });
// -> { value: { username: 'abc', birth_year: 1994 } }

schema.validate({});
// -> { value: {}, error: '"username" is required' }

// Also -

try {
    const value = await schema.validateAsync({ username: 'abc', birth_year: 1994 });
}
catch (err) { }
*/
