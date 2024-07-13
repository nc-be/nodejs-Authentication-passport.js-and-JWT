// - FALTA ANALIZAR
const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class OrderService {

  constructor(){
  }

  // ANTES DE JWT
  /* async create(data) {
    const newOrder= await models.Order.create(data);
    return newOrder;
  } */

  // DESPUES DE JWT
  async create(data) {
    const customer = await models.Customer.findOne({
      where: {
        '$user.id$': data.userId
      },
      include: ['user']
    })
    if (!customer) {
      throw boom.badRequest('Customer not found');
    }
    const newOrder = await models.Order.create({ customerId: customer.id });
    return newOrder;
  }

  async addItem(data) {
    const newItem= await models.OrderProduct.create(data);
    return newItem;
  }

  // Este servicio se encarga de retornar las ordenes del cliente de forma anidada (es decir, tomando en cuenta sus asociaciones)
  async findByUser(userId){ // Como dato de entrada se tiene el 'id' del usuario, los usuarios tienen una relacion 1on1 con los clientes
    const orders = await models.Order.findAll({
      // sequelize usa el atributo 'userId' para obtener las ordenes de compra del cliente
      where:{
        // where se utiliza para hacer consultas con asociaciones (relacion user-customer 1on1)
        // ORDER tiene un CUSTOMER asociado, CUSTOMER tiene un USER asociado
        '$customer.user.id$' : userId
      },
      include:[
        {
          association: 'customer',
          include: 'user'
        },'items'
      ]
    });
    return orders;
  }

  async find() {
    const rta = await models.Order.findAll();
    return [ rta ];
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include:[
        {
          association: 'customer',
          include: 'user'
        },'items'
      ]
    });
    if(!order){
      throw boom.notFound('order not found');
    }
    return order;
  }

  async update(id, changes) {
    const order = await this.findOne(id);
    const rta = await order.update(changes);
    return rta;
  }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();
    return { rta:true };
  }

}

module.exports = OrderService;
