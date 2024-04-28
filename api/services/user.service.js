// - FALTA ANALIZAR
const boom = require('@hapi/boom');

// const getConnection = require('../libs/postgres'); // LLAMAR LA LIBRERIA 'postgres'
// *******getConnection es reemplazado por pool**********

const pool = require('../libs/postgres.pool');  // LLAMAR LA LIBRERIA 'postgres.pools' *******pool es reemplazado por sequelize (NO EN TODO)**********

const { models } = require('./../libs/sequelize'); // LLAMAR LOS MODELOS CREADOS AL HACER init DE LA FUNCION setupModels UTILIZANDO sequelize

class UserService {
  constructor() {
    this.pool = pool; // CREAR POOL DESDE LA CONEXION
    this.pool.on('error', (err) => console.err(err)); // DEVUELVE MENSAJE DE ERROR DE CONEXION 'error' EN CASO QUE NO SE CREE EL POOL DE FORMA CORRECTA
  }

  async create(data) {
    return data;
  }

  async find() {
    // servicio 'find' con getConnection
    /*
    const client = await getConnection();   // obtener el cliente para la conexion
    const rta = await client.query('SELECT * FROM tasks'); // Respuesta a la solicitud del servicio

    //  SELECT * FROM tasks - Selecciona todo el contenido de la tabla 'tasks'

    return await rta.rows; // Retorna las columnas de la tabla 'tasks'
    */


    // servicio 'find' con pool
    /*
    const query = 'SELECT * FROM tasks'; // GENERAR QUERY PARA CUMPLIR SOLICITUD DEL SERVICIO
    const rta = await this.pool.query(query); // EJECUTA QUERY DE FORMA ASINCRONA
    return rta.rows; // RETORNA LA LISTA DE PRODUCTOS
    */

    /*
    SINTAXIS
    const serviceResponse = await models.User_Name.Service_name();

    DONDE:
    serviceResponse = Es la respuesta final del servidor (rta)
    models = Es el nameSpace creado con la funcion 'setupModels' donde se guarda la forma en la cual se acceden a los modelos
    User_Name = Es el nombre del modelo definido en la configuracion estatica de los modelos ./../db/user.model - mismo nombre de la clase -
    Service_name = Nombre del servicio, findAll, update, delete, patch, etc
    */
    // servicio 'find' con sequelize
    const rta = await models.User.findAll();
    return rta;
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
