// Conexion entre la aplicacion en node a postgreSQL
const { Client } = require('pg'); // LLAMAR PAQUETE 'pg'

async function getConnection(){
  // CREAR NUEVA INSTANCIA PARA EL CLIENTE, 'Client'
  const client = new Client({
    // host, puerto, usuario, contraseña y database que se usara
      host:'localhost',
      port: 5432,
      user: 'postgres',
      password: 'ncpostgres1!',
      database: 'mydata'
    });
  await client.connect();  // conecta la instancia
  return client; // retorna la instancia al usuario que lo requiere
};

module.exports = getConnection; // EXPORTAR EL ARCHIVO PARA LA CONEXION
