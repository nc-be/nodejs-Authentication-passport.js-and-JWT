// - FALTA ANALIZAR
const boom = require('@hapi/boom');

const getConnection = require('../libs/postgres'); // LLAMAR LA LIBRERIA 'postgres'

class UserService {
  constructor() {}

  async create(data) {
    return data;
  }

  async find() {
    const client = await getConnection();   // obtener el cliente para la conexion
    const rta = await client.query('SELECT * FROM tasks'); // Respuesta a la solicitud del servicio
    /* --QUERY
    SELECT * FROM tasks - Selecciona todo el contenido de la tabla 'tasks'
    */
    return await rta.rows; // Retorna las columnas de la tabla 'tasks'
    return [];
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
