const express = require('express');   // LLAMAR PAQUETE EXPRESS
const routerApi = require('./routes');   // LLAMAR LA CARPETA ROUTES DEL REPOSITORIO (AUTOMATICAMENTE SE DIRIGE AL ARCHIVO PRINCIPAL, INDEX)
const cors = require('cors'); // LLAMAR PAQUETE cors - SE UTILIZA PARA MANEJAR LOS DOMINIOS QUE PUEDEN REALIZAR SOLICITUDES

const app = express();    //  CONSTRUIR APLICACION
const port = process.env.PORT || 3001;    // DEFINIR PUERTO DEL SERVIDOR


const { midError,clientError,boomError, ormErrorHandler } = require('./middlewares/error.handler'); // LLAMAR LA CARPETA MIDDLEWARES, midError SE ENCARGA DE ERRORES GLOBALES, clientError SE ENCARGA DE COMUNICAR ERRRORES CON EL USUARIO, boomError SE ENCARGA DE ERRORES CON UN MANEJO CORRECTO DEL RESPONSIVE STATUS

const { checkApiKey } = require('./middlewares/auth.handler'); // LLAMAR MIDDLEWARE DE VERIFICACION CAPA DE AUTENTICACION

app.use(express.json());  // SE UTILIZA PARA REVISION INFORMACION DE TIPO JSON RECIBIDA POR POST  - INSOMNIAS

/* CORS - TODAS LAS CONFIGURACIONES */

//app.use(cors());  // SE DA ACCESO A CUALQUIER DOMINIO (POR DEFECTO SOLO ACEPTA SU MISMO ORIGEN http://localhost:3001) - NORMALMENTE SE DA ACCESO

// ACCESO LIMITADO - DOMINIOS ESPECIFICOS
const lista = ['http://localhost:8000', 'https://myapp.co']; // LISTA DE DOMINIOS
const options = {
  // CONDICIONAL: ORIGEN ACEPTADO O NO
  origin:(origin, callback) => {
    // SI EL ORIGEN 'origin' ESTA INCLUIDO EN LA LISTA DE DOMINIOS, EJECUTAR 'callback' (QUE POSTERIORMENTE LE DA ACCESO PARA QUE HAGA SOLICITUDES)
    if(lista.includes(origin) || !origin){
      callback(null, true); // null: NO ERROR   true: ACCESO PERMITIDO
    }
    else{
      callback(new Error('Acceso denegado')); // MENSAJE DE ERROR, ACCESO NO PERMITIDO/DENEGADO
    }
  }
};

require('./utils/auth/'); // HABILITAR ESTRATEGIAS DE AUTENTICACION - PASSPORTJS

app.use(cors(options));

routerApi(app);


/* DEFINIR RUTA DE LA APLICACION
    SINTAXIS app.get(ruta,funcion)

LA RUTA EN ESTE CASO ES / QUE SIMBOLIZA LA RUTA POR DEFECTO DEL SERVIDOR (localhost:port)

LA FUNCION ES UN CALLBACK QUE RETORNA UNA RESPUESTA AL USUARIO (MENSAJE 'Prueba servidor express')
*/
app.get('/api', (req,res) =>{
  res.send('Prueba servidor express');
});

// Prueba del middleware de verificacion de la capa de autenticacion
// antes de entrar en la funcion ejecuta el middleware usando 'checkApiKey'
app.get('/auth_middlware_test', checkApiKey, (req,res) =>{
  res.send('Acceso autorizado');
});

/* EJECUTAR MIDDLEWARES DE ERROR
NOTA: SE EJECUTAN EN EL ORDEN EN QUE SE PONGAN - COMPORTAMIENTO SECUENCIAL
*/
app.use(midError);  // DETECTA ERRORES GLOBALES
app.use(ormErrorHandler); // ESTE MIDDLEWARE SE ENCARGA DE LOS REQUISITOS DE LOS ESQUEMAS UTILIZADOS POR ORM
app.use(boomError); // IDENTIFICA SI EL ERROR ES TIPO BOOM
app.use(clientError); // DETECTA ERRORES Y CREA UN FORMATO QUE PUEDE VER EL CLIENTE

// ESCUCHAR PUERTO DEL SERVIDOR ('port')
app.listen(port, () => {
  // NOTA: NO SE RECOMIENDA EL USO DE console.log EN PRODUCCION
  console.log('Escuchando puerto... ' + port);
});
