/*
//  RUTA DE PRODUCTOS (ANTERIOR)
const express = require('express');   // LLAMAR PAQUETE EXPRESS

const router = express.Router();    //  CONSTRUIR APLICACION

// DEVOLVER 2 IDS OBTENIDAS DE LA URL (larger)
router.get('/:categoryID/products/:productID', (req,res) => {
  const {categoryID, productID} = req.params;
  res.json(
    {
      id1: categoryID,
      id2: productID,
    });
});
*/

// RUTA DE PRODUCTOS (NUEVA) - FALTA ANALIZAR
const express = require('express');

const CategoryService = require('./../services/category.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('./../schemas/category.schema');

const router = express.Router();
const service = new CategoryService();

router.get('/', async (req, res, next) => {
  try {
    const categories = await service.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
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

router.post('/',
  validatorHandler(createCategorySchema, 'body'),
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

router.patch('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
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

router.delete('/:id',
  validatorHandler(getCategorySchema, 'params'),
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

// TEST:  localhost:'port'/categories/randomNumber1/products/randomNumber2
// randomNumber REPRESENTA EL ID DE LA CATEGORIA Y randomNumber2 REPRESENTA EL ID DEL PRODUCTO
// EJ:  localhost:3001/categories/123/products/456

module.exports = router;
