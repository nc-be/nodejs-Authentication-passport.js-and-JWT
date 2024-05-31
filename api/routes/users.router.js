/*
//  RUTA DE USUARIOS (ANTERIOR)
const express = require('express');   // LLAMAR PAQUETE EXPRESS

const router = express.Router();    //  CONSTRUIR APLICACION

// GET QUERY  - PARAMETROS DE CONSULTA
router.get('/', (req,res) => {
  const {limit, offset} = req.query; // TRAER LOS PARAMETROS limit Y offset DE query

  //  CONDICIONAL PARA COMPROBAR QUE EXISTAN LOS PARAMETROS
  if(limit && offset){
    // true
    res.json({
      limit,
      offset
    });
  }else{
    // false
    res.send('Insuficientes parametros');
  };
});
// TEST:  localhost:'port'/users
*/

// RUTA DE PRODUCTOS (NUEVA) - FALTA ANALIZAR
const express = require('express');

const UserService = require('./../services/user.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { updateUserSchema, createUserSchema, getUserSchema } = require('./../schemas/user.schema');

const router = express.Router();
const service = new UserService();

// GET  - FIND
router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// GET/:id  - FIND_ONE
router.get('/:id',
validatorHandler(getUserSchema, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await service.findOne(id);
    res.json(category);
  } catch (error) {
    next(error);
  }
  }
);

//POST  - CREATE
router.post('/',
validatorHandler(createUserSchema, 'body'),
async (req, res, next) => {
  try {
    const body = req.body;
    const newCategory = await service.create(body);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
  }
);

//PATCH - UPDATE
router.patch('/:id',
validatorHandler(getUserSchema, 'params'),
validatorHandler(updateUserSchema, 'body'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const category = await service.update(id, body);
    res.json(category);
  } catch (error) {
    next(error);
  }
  }
);

//DELETE  - DELETE
router.delete('/:id',
validatorHandler(getUserSchema, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.status(201).json({id});
  } catch (error) {
    next(error);
  }
  }
);

module.exports = router;

/* EJS:
localhost:3001/users                     - false (limit=?   offset=?)
localhost:3001/users?limit=10            - false (limit=10   offset=?)
localhost:3001/users?offset=0            - false (limit=?   offset=0)
localhost:3001/users?limit=10&offset=0   - true  (limit=10   offset=0)
 */
