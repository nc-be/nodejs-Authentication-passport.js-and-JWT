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
    /*
    // CREAR USUARIO - ANTES DE IMPLEMENTAR ORM
    return data;
    */
    // CREAR USUARIO - DESPUES DE IMPLEMENTAR ORM
    const newUser = await models.User.create(data); // El comando 'create' creara un usuario implementando la informacion recibida del esquema (data: id, email, password, role)
    return newUser; // retornar usuario
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
    rta = Es la respuesta final del servidor (serviceResponse)
    models = Es el nameSpace creado con la funcion 'setupModels' donde se guarda la forma en la cual se acceden a los modelos
    User_Name = Es el nombre del modelo definido en la configuracion estatica de los modelos ./../db/user.model - mismo nombre de la clase -
    Service_name = Nombre del servicio, findAll, update, delete, patch, etc
    */
    // servicio 'find' con sequelize
    const rta = await models.User.findAll();
    return rta;
  }

  async findOne(id) {
    // UTILIZANDO ORM
    const user = await models.User.findByPk(id); // 'findByPk' buscara el usuario que coincida con el 'id' obtenido
    if (!user) {
      // CONDICIONAL QUE REVISA SI EL USUARIO EXISTE O NO - El condicional utiliza el middleware creado con boom  ./../middlewares/error.handler
      throw boom.notFound('User not found'); // Lanza (throw) el error para que sea atrapado (catch) y validado por el esquema de validacion de data entrante (validatorHandler - ./../routes/users.router -- ./../middlewares/validator.handler) TLDR El esquema se encarga de validar el error y enviar la respuesta 'User not found' en el caso de que sea un error
    }
    return user;
  }

  async update(id, changes) {
    /*
    // UTILIZANDO JOI
    return {
      id,
      changes,
    };
    */

    // UTILIZANDO ORM
    // const user = await models.User.findByPk(); // 'findByPk' buscara el usuario que coincida con el 'id' obtenido
    const user = await this.findOne(id); // Mejora de la linea de codigo anterior - lleva a cabo el comando 'findByPk' y aplica el condicional que detecta si existe o no un usuario que coincida con el 'id' - envia error 'User not found' en caso contrario
    const rta = await user.update(changes); // Una vez se cuenta con el usuario (user) se aplican los cambios (changes) realizados sobre el utilizando el comando 'update'.
    return rta; // Enviar los cambios como respuesta
  }

  async delete(id) {
    /*
    // UTILIZANDO JOI
    return { id };
    */

    // UTILIZANDO ORM
    // const user = await models.User.findByPk(); // 'findByPk' buscara el usuario que coincida con el 'id' obtenido
    const user = await this.findOne(id); // Mejora de la linea de codigo anterior - lleva a cabo el comando 'findByPk' y aplica el condicional que detecta si existe o no un usuario que coincida con el 'id' - envia error 'User not found' en caso contrario
    await user.destroy(); // Una vez se cuenta con el usuario (user) se elimina de la lista de usuarios utilizando el comando 'update'.
    return { id }; // Enviar el 'id' del usuario eliminado como respuesta
  }
}

module.exports = UserService;
