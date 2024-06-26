// MISMA LOGICA DE PROGRAMACION USADA EN ./user.service.js
const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

const bcrypt = require('bcrypt'); // NECESARIO PARA HACER HASHING DE CONTRASEÑAS

class CustomerService {

  // INVESTIGAR - PORQUE ESTA VACIO?
  constructor(){}

  async create(data) {
    // Datos antes de implementar hashing
    /*
    const newCustomer = await models.Customer.create(data, {include:['user']}); */
    // Dentro del servicio se agrega la expresion {include:['user']}
    /*
    'user' HACE REFERENCIA A LA ASOCIACION BelongsTo ENTRE EL MODELO 'customer.model.js' Y EL MODELO 'user.model.js' Donde 'user' ES EL ALIAS QUE SE LE DA A LA RELACION

    SINTAXIS
    {{include:[asociacion1, asociacion2, asociacion3, ...]}

    INCLUDE SE ENCARGA DE RESOLVER LAS ASOCIACIONES (asociacion1, asociacion2,...) Y ANIDAR LOS RESULTADOS A LA RESPUESTA FINAL DEL SERVIDOR (rta)
    */

    // Datos despues de implementar hashing
    const hashPass = await bcrypt.hash(data.user.password, 10); // Implementar hashing en el password (la informacion no se extrae directamente de 'data' sino de un subpad llamado 'user')
    const newData = {
      ...data,
      user:{
        ...data.user,
        password: hashPass
      }
    } // clona la informacion de 'data' y 'data.user', pero reemplaza el valor del password del user con el valor generado por bcrypt.hash
    const newCustomer = await models.Customer.create(newData, {include:['user']}); // crea cliente y usuario con el password hashed
    delete newCustomer.dataValues.user.dataValues.password; // Borra el valor de password antes de retornar la informacion (Importante incluir dataValues - la informacion no se extrae directamente de 'data' sino de un subpad llamado 'user')
    return newCustomer;
  }

  async find() {
    const rta = await models.Customer.findAll({include:['user']});
    //
    // Dentro del servicio se agrega la expresion {include:['user']}
    /*
    'user' HACE REFERENCIA A LA ASOCIACION BelongsTo ENTRE EL MODELO 'customer.model.js' Y EL MODELO 'user.model.js' Donde 'user' ES EL ALIAS QUE SE LE DA A LA RELACION

    SINTAXIS
    {{include:[asociacion1, asociacion2, asociacion3, ...]}

    INCLUDE SE ENCARGA DE RESOLVER LAS ASOCIACIONES (asociacion1, asociacion2,...) Y ANIDAR LOS RESULTADOS A LA RESPUESTA FINAL DEL SERVIDOR (rta)
    */
    return rta;
  }

  async findOne(id){
    const customer = await models.Customer.findByPk(id,
      {include:['user']});
    if(!customer){
      throw boom.notFound('customer not found');
    }
    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const rta = await customer.update(changes);
    return rta;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return { rta:true };
  }
}

module.exports = CustomerService;
