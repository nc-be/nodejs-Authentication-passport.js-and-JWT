// MIDDLEWARE DE TIPO NORMAL (req,res,next)
// ESTE MIDDLEWARE SE ENCARGA DE VALIDAR LOS DATOS EN LOS ESQUEMAS  - ./SCHEMAS

const boom = require('@hapi/boom');

/* PARA LA FUNCION SE RECIBEN LOS SIGUIENTES PARAMETROS: schema - property
YA QUE SE EVALUA LA SOLICITUD (req) DE UNA PROPIEDAD EN ESPECIFICO (property) Y SE APLICA UN ESQUEMA (schema)

RECIBE UN ESQUEMA (schema) > DONDE ENCONTRAR INFORMACION (property) > RETORNA EL MIDDLEWARE DINAMICO (return(req,res,next)...)
*/
function validationHandler(schema,property) {
  console.log('validationHandler on...'); // MENSAJE EN CONSOLA PARA VERIFICAR ORDEN DE EJECUCION DE LOS MIDDLEWARES (DEBE SER 2do YA QUE VIENE DESPUES DE midError)

  // RETORNAR UNA FUNCION QUE TENGA EL FORMATO DEL MIDDLEWARE - SE USA PARA CONSTRUIR MIDDLEWARES DE FORMA DINAMICA
  return(req,res,next) => {
    const data = req[property]; // OBTENER LA INFORMACION
    /* req[property] SE UTILIZA PARA QUE LA INFORMACION SEA FLEXIBLE YA QUE PUEDE PROVENIR DE CUALQUIER LADO:
    req.body
    req.params
    req.query

    property DEFINE EN QUE LADO ESTA
    */
    const { error } = schema.validate(data,{abortEarly:false}); // OBTENER ERROR, EN CASO DE QUE EXISTA
    // ESTE CONDICIONAL SE ENCARGA DE VALIDAR SI EXISTE UN ERROR
    if(error){
      next(boom.badRequest(error)); // Utilizando BOOM, el programa inmediatamente sabe que conflict se refiere al status 400 (Bad request - la solicitud es invalida)
      // next() EN ESTE CASO, HACE QUE LOS MIDDLEWARES PROCESEN EL ERROR
    }
    next(); // SI NO EXISTE UN ERROR, SE PASA LA SOLICITUD AL SIGUIENTE MIDDLEWARE
  }
};

module.exports = validationHandler;
