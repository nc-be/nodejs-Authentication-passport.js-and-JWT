const { ValidationError } = require("sequelize");

// DETECTA ERRORES GLOBALES
function midError(err,req,res,next) {
  console.log('midError on...');  // MENSAJE EN CONSOLA PARA VERIFICAR ORDEN DE EJECUCION (DEBE SER 1ro YA QUE AQUI SE EJECUTA UN next LUEGO DE MONITOREAR EL ERROR)
  console.error(err); // MONITOREO DEL ERROR
  next(err); // CONTINUAR CON LA EJECUCION NORMAL AUNQUE EL ERROR ESTA SIENDO MONITOREADO   - IMPORTANTE ENVIA EL err, SINO SERIA UN MIDDLEWARE BASICO next()
};

// DETECTA ERRORES Y CREA UN FORMATO QUE PUEDE VER EL CLIENTE
function clientError(err,req,res,next) {
  console.log('clientError on...'); // MENSAJE EN CONSOLA PARA VERIFICAR ORDEN DE EJECUCION (DEBE SER 3ro)
  res.status(500).json(
  {
    message:err.message,  // MENSAJE DE ERROR 500 AL USUARIO
    stack: err.stack      // MENSAJE LOCALIZACION DEL ERROR
  }
  );
};

// IDENTIFICA SI EL ERROR ES TIPO BOOM
function boomError(err,req,res,next) {
  // CONDICIONAL PARA COMPROBAR QUE EL ERROR ES TIPO BOOM
  if (err.isBoom) {
    // err.isBoom ES UNA PROPIEDAD QUE ES AGREGADA CUANDO UN ERROR ES AUTO-GENERADO UTILIZANDO BOOM
    const{ output } = err; // BOOM CONTIENE TODA LA INFORMACION DEL ERROR EN EL PARAMETRO 'output' (AQUI SE GUARDA)
    res.status(output.statusCode).json(output.payload); // EN CASO DE QUE NO EXISTA EL 'ID' SE ENVIA UN MENSAJE DE ERROR, EL TIPO DE STATUS ES DEFINIDO POR EL 'output.statusCode', LA INFORMACION ES EXTRAIDA POR 'output.payload'
  }
  else{
    next(err); // EJECUTA EL SIGUIENTE MIDDLEWARE DE ERROR (ES DECIR, clientError)
  };
};

// ESTE MIDDLEWARE SE ENCARGA DE LOS REQUISITOS DE LOS ESQUEMAS UTILIZADOS POR ORM
function ormErrorHandler(err, req, res, next){
  // EL CONDICIONAL 'if' VALIDA SI EL ERROR ES DE TIPO 'ValidationError' - 'ValidationError' ES LA INSTANCIA UTILIZADA POR sequelize PARA LA DETECCION DE ERRORES, POR LO TANTO SI ES DE TIPO 'ValidationError' ES UN ERROR DE ORM(sequelize)
  if(err instanceof ValidationError){
    // LOS ERRORES SE CLASIFICAN CON EL ESTATUS '409'
    res.status(409).json({
      statusCode: 409,
      message: err.name,  // IMPRIME EL NOMBRE DEL ERROR
      error: err.errors // IMPRIME LA DESCRIPCION DEL ERROR (NO SE IMPRIME CORRECTAMENTE????)
    });
  }
  next(err);
}

module.exports = { midError,clientError,boomError,ormErrorHandler };  // EXPORTAR TODOS LOS MIDDLEWARES

/* NOTA: LOS MIDDLEWARE DE TIPO ERROR SE DEBEN REALIZAR DESPUES DE DEFINIR EL ROUTING */
