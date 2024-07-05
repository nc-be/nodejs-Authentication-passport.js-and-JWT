// MISMA LOGICA USADA EN ./customer.service.js
const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

const passport = require('passport'); // Importar el module passport

class CategoryService {

  constructor(){}

  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const rta = await models.Category.findAll();
    return [ rta ];
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include:['product']
    });
    if(!category){
      throw boom.notFound('category not found');
    }
    return category;
  }

  async update(id, changes) {
    const category = await this.findOne(id);
    const rta = await category.update(changes);
    return rta;
  }

  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy();
    return { rta:true };
  }

}

module.exports = CategoryService;
