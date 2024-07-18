//  CONFIGURACION BASE PARA LEER LAS VARIABLES DE ENTORNO
require('dotenv').config();   // LLAMAR PAQUETE dotenv  - POR DEFECTO LEE EL ARCHIVO .env (IGNORADO EN GITHUB) Y CARGA LOS VALORES DE LAS VARIABLES DE ENTORNO QUE ESTAN AHI

// EN ESTE OBJETO SE GUARDAN TODAS LAS VARIABLES QUE SE VAN A LEER
const config = {
  env: process.env.NODE_ENV || 'dev',
    /*
    SINTAXIS proceso.Variable_A_Leer  - proceso = process.env   Variable_A_Leer = NODE_ENV
    - process.env = LEER VARIABLES DE ENTORNO
    - NODE_ENV || 'dev' = VARIABLE GLOBAL DE NODE (EN CASO DE NO HABER VARIABLE SE UTILIZA 'dev')
    */
  port: process.env.PORT || 3001,

  // CONFIGURACION CORRESPONDIENTE A LA BASE DE DATOS   -   db = DATABASE
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,

  // Llave middleware de autenticacion
  API_KEY: process.env.API_KEY,

  // Palabra clave para generar tokens JWT
  JWTSecret: process.env.JWT_SECRET,

  // Datos de autenticacion - transporter nodeMailer
  userTransporter: process.env.USER_TRANSPORTER,
  passTransporter: process.env.PASS_TRANSPORTER,

  // Palabra clave para generar tokens - recovery link
  recoverySecret: process.env.RECOVERY_SECRET,
}

module.exports = { config };  // EXPORTAR ARCHIVO PARA LA CONFIGURACION
