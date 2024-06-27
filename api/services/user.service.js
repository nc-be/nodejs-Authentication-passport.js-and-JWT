const boom = require('@hapi/boom');

const pool = require('../libs/postgres.pool');  // LLAMAR LA LIBRERIA 'postgres.pools' *******pool es reemplazado por sequelize (NO EN TODO)**********
const { models } = require('./../libs/sequelize'); // LLAMAR LOS MODELOS CREADOS AL HACER init DE LA FUNCION setupModels UTILIZANDO sequelize

const bcrypt = require('bcrypt'); // NECESARIO PARA HACER HASHING DE CONTRASEÑAS
const { DatabaseModule } = require('@faker-js/faker');

class UserService {
  constructor() {
    this.pool = pool; // CREAR POOL DESDE LA CONEXION
    this.pool.on('error', (err) => console.err(err)); // DEVUELVE MENSAJE DE ERROR DE CONEXION 'error' EN CASO QUE NO SE CREE EL POOL DE FORMA CORRECTA
  }

  async create(data) {
    // Datos antes de implementar hashing
    /* const newUser = await models.User.create(data); // El comando 'create' creara un usuario implementando la informacion recibida del esquema (data: id, email, password, role) */

    // Datos despues de implementar hashing
    const hashPass = await bcrypt.hash(data.password, 10); // Implementar hashing en el password
    const newUser = await models.User.create(
      {
        ...data,
        password: hashPass // reemplaza el valor del password del users con el valor generado por bcrypt.hash
      }
    ); // El comando 'create' creara un usuario implementando la informacion recibida del esquema (data: id, email, password, role)
    delete newUser.dataValues.password; // Borra el valor de password antes de retornar la informacion (Importante incluir dataValues)
    return newUser; // retornar usuario
  }

  async find() {
    // servicio 'find' con sequelize
    /*
    SINTAXIS
    const serviceResponse = await models.User_Name.Service_name();

    DONDE:
    serviceResponse = Es la respuesta final del servidor (rta)
    models = Es el nameSpace creado con la funcion 'setupModels' donde se guarda la forma en la cual se acceden a los modelos
    User_Name = Es el nombre del modelo definido en la configuracion estatica de los modelos ./../db/user.model - mismo nombre de la clase -
    Service_name = Nombre del servicio, findAll, update, delete, patch, etc
    */
    const rta = await models.User.findAll({
      include:['customer']
    });
    // Dentro del servicio se agrega la expresion {include:['customer']}
    /*
    'customer' HACE REFERENCIA A LA ASOCIACION BelongsTo ENTRE EL MODELO 'user.model.js' Y EL MODELO 'customer.model.js' Donde 'customer' ES EL ALIAS QUE SE LE DA A LA RELACION

    SINTAXIS
    {{include:[asociacion1, asociacion2, asociacion3, ...]}

    INCLUDE SE ENCARGA DE RESOLVER LAS ASOCIACIONES (asociacion1, asociacion2,...) Y ANIDAR LOS RESULTADOS A LA RESPUESTA FINAL DEL SERVIDOR (rta)
    */
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id); // 'findByPk' buscara el usuario que coincida con el 'id' obtenido
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  // Este servicio retorna el email del usuario
  async findByEmail(email){
    const userByEmail = await models.User.findOne({
      where: { email } // Busca el PRIMER email que coincida en la base de datos (este atributo es unico)
    });
    return userByEmail;
  }

  async update(id, changes) {
    // const user = await models.User.findByPk(); // 'findByPk' buscara el usuario que coincida con el 'id' obtenido
    const user = await this.findOne(id); // Mejora de la linea de codigo anterior - lleva a cabo el comando 'findByPk' y aplica el condicional que detecta si existe o no un usuario que coincida con el 'id' - envia error 'User not found' en caso contrario
    const rta = await user.update(changes); // Una vez se cuenta con el usuario (user) se aplican los cambios (changes) realizados sobre el utilizando el comando 'update'.
    return rta; // Enviar los cambios como respuesta
  }

  async delete(id) {
    const user = await this.findOne(id); // Mejora de la linea de codigo anterior - lleva a cabo el comando 'findByPk' y aplica el condicional que detecta si existe o no un usuario que coincida con el 'id' - envia error 'User not found' en caso contrario
    await user.destroy(); // Una vez se cuenta con el usuario (user) se elimina de la lista de usuarios utilizando el comando 'update'.
    return { id }; // Enviar el 'id' del usuario eliminado como respuesta
  }
}

module.exports = UserService;
