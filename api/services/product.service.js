// FALTA ANALIZAR
const{ faker }=require('@faker-js/faker');
const boom = require('@hapi/boom');
const { Op } = require('sequelize');

const { models } = require('../libs/sequelize');

class ProductsService {

  constructor(){
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url,
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  // AQUI SE UTILIZAN LOS MODELOS
  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  // AQUI SE UTILIZAN LOS MODELOS
  async find(query) { // RECIBIR LOS PARAMETROS DE PAGINACION DE LA CONSTANTE 'query' OBTENIDA DEL ESQUEMA queryProductSchema
    // OPCIONES ENVIADAS A EL SERVICIO findAll
    const options={
      include:['category'],  // ASOCIACION category hasMany products (requerida)
      where: {}
    };
    const {limit, offset, price, priceMin, priceMax} = query;  // TRAER LOS PARAMETROS DE PAGINACION limit Y offset DE LA CONSTANTE 'query'
    if (limit && offset) {
      // SI limit && offset EXISTEN, INCLUIRLOS EN LA CONSTANTE options
      options.limit=limit,
      options.offset=offset
    };
    if (price){
      // SI price EXISTE, INCLUIRLO EN LA CONSTANTE options (opcion where fixed)
      options.where.price=price
    }
    if (priceMin && priceMax) {
      // SI priceMin y/o priceMax EXISTEN, INCLUIRLOS EN LA CONSTANTE options (opcion where min/max)
      options.where.price={
        [Op.gte] : priceMin, // gte representa el valor minimo
        [Op.lte] : priceMax //  lte representa el valor maximo
      }
    };

    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    /* const product = this.products.find(item => item.id === id); */
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id, changes) {
    /* const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index]; */
    const product = await this.findOne(id);
    const rta = await product.update(changes);
    return rta;
  }

  async delete(id) {
    /* const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id }; */
    const product = await this.findOne(id);
    await product.destroy();
    return { rta:true };
  }

}

module.exports = ProductsService;
