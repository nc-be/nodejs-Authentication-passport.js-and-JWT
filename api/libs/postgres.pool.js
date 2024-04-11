// Conexion entre la aplicacion en node a postgreSQL
const { Pool } = require('pg'); // LLAMAR PAQUETE 'pg'

// POOL REALIZA UN AWAIT INTERNO CUANDO SE CONECTA EL PRIMER SERVICIO (NO ES NECESARIO AGREGARLO EN EL CODIGO)
const pool = new Pool({
  // host, puerto, usuario, contraseña y database que se usara
    host:'localhost',
    port: 5432,
    user: 'postgres',
    password: 'ncpostgres1!',
    database: 'mydata'
});
// NO HAY NECESIDAD DE CONECTARSE, YA QUE EL PRIMER SERVICIO GENERA LA CONEXION PARA LOS DEMAS

module.exports = pool; // EXPORTAR EL ARCHIVO PARA LA CONEXION
