// MIDDLEWARE DE VERIFICACION CAPA DE AUTENTICACION
/*
LOGICA DEL MIDDLEWARE DE VERIFICACION:
if(req.headers['api' === '123']){
  next();
}else{
  next(boom.unauthorized());
}

  - Enviar API a los headers con un valor

  - Verificar que este valor sea igual a una variable, en el ejemplo es '123'

  - Si cumple con la condicion se autoriza 'next()' es decir, ingresa a la los otros middlewares de validacion anteriormente creados hasta ser validado completamente e ingresar a la capa de serivicios

  - Si no cumple, se autoriza 'next(boom.unauthorized());' lo cual envia un mensaje por medio de boom notificando que no se autoriza el permiso
*/

const boom = require('@hapi/boom');   // Llamar boom para habilitar el envio de mensaje de permiso no autorizado
const { config } = require('./../config/config');   // Llamar boom para habilitar el envio de mensaje de permiso no autorizado

function checkApiKey(req,res,next){
  const apiKey = req.headers['api'];
  if (apiKey === config.API_KEY){
    next();
  }
  else{
    next(boom.unauthorized());
  }
}

// Esta funcion se encarga de verificar que el value de la variable user.role sea 'admin'
function checkAdminRole(req,res,next){
  const user = req.user;
  // console.log(user); // IMPRIMIR PAYLOAD EN CONSOLA
  if (user.role === 'admin'){
    next();
  }else{
    next(boom.unauthorized());
  }
}

// (ESTA FUNCION ES UNA MEJORA DE checkAdminRole)
// Esta funcion se encarga de asignar los roles que pueden ingresar a cada endpoint, para ello se tienen los roles como parametros de entrada y se retorna un middleware
function checkRoles(...roles){ // Array de roles: entrada (los ... transforman los datos de entrada en un array de argumentos)
  return (req,res,next) => { // middleware: salida
    const user = req.user;
    console.log(roles);
    console.log(user);
    // Este condicional verifica si dentro de un array de roles ESPECIFICO esta incluido el array del usuario actual
    if (roles.includes(user.role)) {
      next(); // true: acceso permitido
    } else {
      next(boom.unauthorized()); // false: acceso denegado
    }
  }
}

module.exports = { checkApiKey, checkAdminRole, checkRoles };

