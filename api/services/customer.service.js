// MISMA LOGICA DE PROGRAMACION USADA EN ./user.service.js
const boom = require('@hapi/boom');

const pool = require('../libs/postgres.pool');

const { models } = require('./../libs/sequelize');

class CustomerService {

  // INVESTIGAR - PORQUE ESTA VACIO?
  constructor(){}

  async create(data) {
    // INVESTIGAR '{include:['user']}'
    const newCustomer = await models.Customer.create(data, {include:['user']});
    return newCustomer;
  }

  async find() {
    // INVESTIGAR '{include:['user']}'
    const rta = await models.Customer.findAll({include:['user']});
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
    // EN EL EJEMPLO SE USA const model Y NO customer (?)
    const customer = await this.findOne(id);
    await customer.destroy();
    return { rta:true }; // NO SE ENVIA EL { id } SINO QUE ESTA RESPUESTA
  }
}

module.exports = CustomerService;
