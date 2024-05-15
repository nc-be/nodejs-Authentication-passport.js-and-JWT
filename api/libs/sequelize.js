const { Sequelize } = require('sequelize'); // LLAMAR PAQUETE OSR - SEQUELIZE

const { config } = require('./../config/config'); // LAMAR CONFIGURACION DE VARIABLES DE ENTORNO

const setupModels = require('./../db/models'); // LAMAR CONFIGURACION DE LOS MODELOS

// ESQUEMA DE CONEXION - PROTECCION DE DATOS (dbUser, dbPassword, dbPort, dbHost, dbName)
const USER = encodeURIComponent(config.dbUser); // CAPA DE SEGURIDAD USER
const PASSWORD = encodeURIComponent(config.dbPassword); // CAPA DE SEGURIDAD PASSWORD
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`; // URL DE CONEXION CREADA CON STRING INTERPOLATION

// CREAR NUEVA INSTANCIA DE sequelize PARA LA GESTION DEL 'PULLING'
const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  // Choose one of the logging options

  // TIPOS DE LOGGING (INVESTIGAR???)
/*
  logging: console.log, // Default, displays the first parameter of the log function call
  logging: (...msg) => console.log(msg), // Displays all log function call parameters
  logging: false, // Disables logging
  logging: msg => logger.debug(msg), // Use custom logger (e.g. Winston or Bunyan), displays the first parameter
  logging: logger.debug.bind(logger), // Alternative way to use custom logger, displays all messages
*/

  logging: console.log, // Default, displays the first parameter of the log function call
});

// CORRER LA FUNCION 'setupModels' DESPUES DE CREAR LA INSTACIA (linea de codigo anterior). LA FUNCION 'setupModels' REALIZA LA CONFIGURACION INICIAL DE LOS MODELOS - PARA ELLO SE NECESITA RECIBIR LA CONEXION
setupModels(sequelize);

/*
// SINCRONIZACION (TOMA LOS MODELOS Y CREA UNA ESTRUCTURA = LEE LOS MODELOS CONFIGURADOS EN setupModels Y CREA LA TABLA CORRESPONDIENTE)  - TLDR: Genera las tablas

// Se deshabilita en las clases 13-14 ya que es que mejor trabajar con migraciones (revisar notas para mas detalles)

sequelize.sync();
*/


module.exports = sequelize; // EXPORTAR CAPA DE CONEXION
