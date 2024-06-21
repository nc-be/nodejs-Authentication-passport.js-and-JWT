// MISMA LOGICA DE PROGRAMACION USADA EN ./user.service.js
const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class CustomerService {

  // INVESTIGAR - PORQUE ESTA VACIO?
  constructor(){}

  async create(data) {
    const newCustomer = await models.Customer.create(data, {include:['user']});
    // Dentro del servicio se agrega la expresion {include:['user']}
    /*
    'user' HACE REFERENCIA A LA ASOCIACION BelongsTo ENTRE EL MODELO 'customer.model.js' Y EL MODELO 'user.model.js' Donde 'user' ES EL ALIAS QUE SE LE DA A LA RELACION

    SINTAXIS
    {{include:[asociacion1, asociacion2, asociacion3, ...]}

    INCLUDE SE ENCARGA DE RESOLVER LAS ASOCIACIONES (asociacion1, asociacion2,...) Y ANIDAR LOS RESULTADOS A LA RESPUESTA FINAL DEL SERVIDOR (rta)
    */
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
    const customer = await models.Customer.findByPk(id);
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
