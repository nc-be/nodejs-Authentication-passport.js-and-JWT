// CONFIGURACION DE LAS RUTAS/ROUTERS
const express = require('express');   // LLAMAR PAQUETE EXPRESS
const productsRouter = require('./products.router');  // IMPORTAR RUTA DE PRODUCTOS
const usersRouter = require('./users.router');  // IMPORTAR RUTA DE USUARIOS
const customersRouter = require('./customers.router');  // IMPORTAR RUTA DE USUARIOS
const categoriesRouter = require('./categories.router');  // IMPORTAR RUTA DE CATEGORIAS
const ordersRouter = require('./orders.router');  // IMPORTAR RUTA ORDERS


// ESTA FUNCION SE ENCARGA DE LA CONFIGURACION GENERAL DE TOAS LAS RUTAS
function routerApi(app){
    const router = express.Router();  // CREAR VARIABLE - RUTA MAESTRA
    app.use('/api/v1', router); //  DEFINIR UN PAD GLOBAL PARA TODOS LOS ENDPOINTS EN LOS QUE SE USE 'router'

  router.use('/products', productsRouter); // DEFINIR LA RUTA DE PRODUCTOS (LO QUE SIGNIFICA QUE LAS URLS localhost:3001/products/... SE DIRIGEN ACA)
  router.use('/customers', customersRouter); // USUARIOS
  router.use('/users', usersRouter); // CLIENTES
  router.use('/categories', categoriesRouter); // CATEGORIAS
  router.use('/orders', ordersRouter); // ORDERS
};
// localhost:3001/api/v1/r2


module.exports = routerApi; // EXPORTAR LA CONFIGURACION DE RUTAS
