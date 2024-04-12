// Conexion entre la aplicacion en node a postgreSQL
const { Pool } = require('pg'); // LLAMAR PAQUETE 'pg'
const { config } = require('../config/config')  // LAMAR CONFIGURACION DE VARIABLES DE ENTORNO

// ESQUEMA DE CONEXION - PROTECCION DE DATOS (dbUser, dbPassword, dbPort, dbHost, dbName)
const USER = encodeURIComponent(config.dbUser); // CAPA DE SEGURIDAD USER
const PASSWORD = encodeURIComponent(config.dbPassword); // CAPA DE SEGURIDAD PASSWORD
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`; // URL DE CONEXION CREADA CON STRING INTERPOLATION

    // `` = TECLA AL LADO IZQUIERDO DEL NUMERO 1 (ENGLISH LAYOUT - QWERTY)

// POOL REALIZA UN AWAIT INTERNO CUANDO SE CONECTA EL PRIMER SERVICIO (NO ES NECESARIO AGREGARLO EN EL CODIGO)
const pool = new Pool({
  /* ANTES DE UTILIZAR URI
  // host, puerto, usuario, contraseña y database que se usara
    host:'localhost',
    port: 5432,
    user: 'postgres',
    password: 'ncpostgres1!',
    database: 'mydata'
    */
  connectionString: URI
});
// NO HAY NECESIDAD DE CONECTARSE, YA QUE EL PRIMER SERVICIO GENERA LA CONEXION PARA LOS DEMAS

module.exports = pool; // EXPORTAR EL ARCHIVO PARA LA CONEXION
