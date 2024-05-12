// AQUI ESTARAN GUARDADOS LOS ARCHIVOS DE CONEXION  - Necesario para migraciones
const { config } = require('./../config/config'); // LAMAR CONFIGURACION DE VARIABLES DE ENTORNO

// ESQUEMA DE CONEXION - PROTECCION DE DATOS (dbUser, dbPassword, dbPort, dbHost, dbName)
const USER = encodeURIComponent(config.dbUser); // CAPA DE SEGURIDAD USER
const PASSWORD = encodeURIComponent(config.dbPassword); // CAPA DE SEGURIDAD PASSWORD
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`; // URL DE CONEXION CREADA CON STRING INTERPOLATION

// exportar los siguientes ambientes
module.exports = {
  development:  {
    url: URI, // URL DE DESARROLLO
    dialect: 'postgres' // BASE DE DATOS EN LA QUE SE CONECTA
  },

  production:  {
    url: URI, // URL DE DESARROLLO
    dialect: 'postgres' // BASE DE DATOS EN LA QUE SE CONECTA
  }
}
