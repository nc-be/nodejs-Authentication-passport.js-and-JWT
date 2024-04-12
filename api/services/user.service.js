// - FALTA ANALIZAR
const boom = require('@hapi/boom');

// const getConnection = require('../libs/postgres'); // LLAMAR LA LIBRERIA 'postgres'
// *******getConnection es reemplazado por pool**********
const pool = require('../libs/postgres.pool');  // LLAMAR LA LIBRERIA 'postgres.pools'

class UserService {
  constructor() {
    this.pool = pool; // CREAR POOL DESDE LA CONEXION
    this.pool.on('error', (err) => console.err(err)); // DEVUELVE MENSAJE DE ERROR DE CONEXION 'error' EN CASO QUE NO SE CREE EL POOL DE FORMA CORRECTA
  }

  async create(data) {
    return data;
  }

async find() {
  /*
  const client = await getConnection();   // obtener el cliente para la conexion
  const rta = await client.query('SELECT * FROM tasks'); // Respuesta a la solicitud del servicio

  //  SELECT * FROM tasks - Selecciona todo el contenido de la tabla 'tasks'

  return await rta.rows; // Retorna las columnas de la tabla 'tasks'
  */
  const query = 'SELECT * FROM tasks'; // GENERAR QUERY PARA CUMPLIR SOLICITUD DEL SERVICIO
  const rta = await this.pool.query(query); // EJECUTA QUERY DE FORMA ASINCRONA
  return rta.rows; // RETORNA LA LISTA DE PRODUCTOS
}

async findOne(id) {
  return { id };
}

async update(id, changes) {
  return {
    id,
    changes,
  };
}

async delete(id) {
  return { id };
}
}

module.exports = UserService;
