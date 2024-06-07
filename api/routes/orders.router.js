const express=require('express');
const CustomerService=require('../services/order.service');
const validatorHandler=require('../middlewares/validator.handler');

const{ createOrderSchema, getOrderSchema, updateOrderSchema,} =
  require('../schemas/order.schema');

const router=express.Router();

const service = new CustomerService();

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

router.post('/',
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

module.exports = router;      // EXPORTAR LA RUTA DE PRODUCTOS
