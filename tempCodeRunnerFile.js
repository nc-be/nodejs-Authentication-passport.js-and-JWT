const express = require('express');   // LLAMAR PAQUETE EXPRESS
const routerApi = require('./ROUTES');   // LLAMAR LA CARPETA ROUTES DEL REPOSITORIO (AUTOMATICAMENTE SE DIRIGE AL ARCHIVO PRINCIPAL, INDEX)
const cors = require('cors'); // LLAMAR PAQUETE cors (MANEJA LAS SOLICITUDES REALIZADAS DESDE DISTINTOS ORIGENES)

const app = express();    //  CONSTRUIR APLICACION
const port = 3001;    // DEFINIR PUERTO DEL SERVIDOR


const { midError,clientError,boomError } = require('./MIDDLEWARES/error.handler'); // LLAMAR LA CARPETA MIDDLEWARES, midError SE ENCARGA DE ERRORES GLOBALES, clientError SE ENCARGA DE COMUNICAR ERRRORES CON EL USUARIO, boomError SE ENCARGA DE ERRORES CON UN MANEJO CORRECTO DEL RESPONSIVE STATUS

app.use(express.json());  // SE UTILIZA PARA REVISION INFORMACION DE TIPO JSON RECIBIDA POR POST  - INSOMNIAS
app.use(cors());

/* DEFINIR RUTA DE LA APLICACION
    SINTAXIS app.get(ruta,funcion)

LA RUTA EN ESTE CASO ES / QUE SIMBOLIZA LA RUTA POR DEFECTO DEL SERVIDOR (localhost:port)

LA FUNCION ES UN CALLBACK QUE RETORNA UNA RESPUESTA AL USUARIO (MENSAJE 'Prueba servidor express')
*/
app.get('/', (req,res) =>{
  res.send('Prueba servidor express');
});

routerApi(app);

/* EJECUTAR MIDDLEWARES DE ERROR
NOTA: SE EJECUTAN EN EL ORDEN EN QUE SE PONGAN - COMPORTAMIENTO SECUENCIAL
*/
app.use(midError);
app.use(boomError);
app.use(clientError);

// ESCUCHAR PUERTO DEL SERVIDOR ('port')
app.listen(port, () => {
  // NOTA: NO SE RECOMIENDA EL USO DE console.log EN PRODUCCION
  console.log('Escuchando puerto... ' + port);
});
