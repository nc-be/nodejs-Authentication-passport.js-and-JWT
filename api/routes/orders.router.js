const express = require('express');

const passport = require('passport'); // Importar el module passport

const OrderService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');
const{ createOrderSchema, getOrderSchema, updateOrderSchema, addItemSchema} = require('../schemas/order.schema');

const { checkRoles } = require('./../middlewares/auth.handler'); // Importar el middleware de autenticacion (MEJORADO) para comprobar el role del usuario - SOON

const router=express.Router();
const service = new OrderService();

router.get('/',
async(req,res,next)=>{
  try{
    res.json(await service.find());
  }

  catch(error){
    next(error);
    }
  }
);

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

// ANTES DE JWT
/* router.post('/',
validatorHandler(createOrderSchema,'body'),
async(req,res,next)=>{
  try{
    const body = req.body;
    res.status(201).json(await service.create(body));
  }
  catch(error){
    next(error);
  }
  }
); */

// DESPUES DE JWT
router.post('/',
passport.authenticate('jwt',{ session:false }),
async (req, res, next) => {
  try {
    const body = {
      userId: req.user.sub
    }
    const newOrder = await service.create(body); // Ejecutar el servicio findByUser el cual retorna las ordenes de compra del cliente

    /* El id del usuario se obtiene a partir de su payload. EL PAYLOAD CONTIENE = sub:user.id y role:user.role

    Recordar que se enviar el userId y no el customerId, por medio de sequelize se identifican el cliente utilizando la asociacion 1on1 creada entre user-customer

    Recordar tambien que este metodo no PIDE AL USER ingresar su userId nuevamente, se utilizan los datos de su sesion */
    res.status(201).json(newOrder);
  } catch (err) {
    next(err);
  }
    }
);

router.patch('/:id',
validatorHandler(getOrderSchema,'params'),
validatorHandler(updateOrderSchema,'body'),
async(req,res,next)=>{
  try{
    const { id } =req.params;
    const body = req.body;res.status(201).json(
      await service.update(id,body)
    );
  }

  catch(error){
    next(error);
  }
  }
);

router.delete('/:id',
validatorHandler(getOrderSchema,'params'),
async(req,res,next)=>{
  try{
    const{id}=req.params;
    res.status(200).json(await service.delete(id));
  }

  catch(error){
    next(error);
  }
  }
);

// ITEMS

router.post('/add-item',
  validatorHandler(addItemSchema,'body'),
  async(req,res,next)=>{
    try{
      const body = req.body;
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    }
    catch(error){
      next(error);
    }
  }
);

module.exports = router;      // EXPORTAR LA RUTA DE PRODUCTOS
