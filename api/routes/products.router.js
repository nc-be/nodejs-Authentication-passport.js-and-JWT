//  RUTA DE PRODUCTOS

const express = require('express');   // LLAMAR PAQUETE EXPRESS
// const { faker } = require('@faker-js/faker');// LLAMAR PAQUETE FAKER - Fake info generator (realistic - no sec risk)  - MOVED - ./SERVICES/product.service

const ProductsService = require('../services/product.service') // LLAMAR EL ARCHIVO 'product.service' DE LA CARPETA SERVICES

/* CLASE 15: SE AÑADE COMPORTAMIENTO ASINCRONO A LOS SERIVCIOS
    EN EL SERVICIO find() SE AÑADE UN TIEMPO DE DEMORA DE 5 SEGUNDOS
*/

/* CLASE 20 SE AÑADEN MIDDLEWARES A LA RUTA DE PRODUCTOS */
const validatorHandler = require('../middlewares/validator.handler') // LLAMAR EL ARCHIVO 'validator.handler' DE LA CARPETA MIDDLEWARES
const { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema } = require('../schemas/product.schema') // LLAMAR LOS 3 ESQUEMAS DE LA CARPETA SCHEMAS

const router = express.Router();    //  CONSTRUIR APLICACION
const service = new ProductsService();  // CREAR UNA INSTANCIA DE LA CLASE ProductsService

/* EL SINTAXIS CAMBIA AL USAR UN ROUTER
app.get('/products', (req,res) => {}    router.get('/', (req,res) => {}

'products' no se especifica y app se reemplaza por router
*/

router.get('/',
  validatorHandler(queryProductSchema,'query'), // VALIDAR SI EXISTEN PARAMETROS EN EL ESQUEMA DE PAGINACION (limit, offset)
  async (req,res) => {
    try {
      const queryParams = req.query;
      const products = await service.find(queryParams);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
);// TEST:  localhost:'port'/products?size=X     X REPRESENTA LA CANTIDAD DE PRODUCTOS QUE SE GENERARAN
// EJ:  localhost:3001/products?size=15

// EJEMPLO DE RUTA FUNCIONAL  - YA QUE ES UN ENDPOINT ESPECIFICO (filter) SE DEBE PONER ANTES DE LOS ENDPOINTS DE FORMA DINAMICA (:id)
router.get('/filter1', (req,res) => {
  res.send('Ejemplo de filtro funcional');
});//  EJ: localhost:3001/products/filter1

// DEVULVE UN ID OBTENIDO DEL URL
/* VARIABLE next AÑADIDA PARA CAPTURA ERROR Y HACER QUE FUNCIONE EL MIDDLEWARE */
/* 20: validator.handler() AÑADIDO PARA LLEVAR A CABO UNA VALIDACION DE DATOS PREVIAMENTE
validatorHandler(getProductSchema,'params')

getProductSchema = ESQUEMA QUE SE VA A VALIDAR (get)
'params' = DONDE SE ENCUENTRA LA INFORMACION (con params se obtiene el 'id' del producto)

SI EL PRODUCTO BUSCADO NO CUMPLE CON EL VALOR uuid ESTANDAR SE ACTIVARA EL validator.handler
*/
router.get('/:id', validatorHandler(getProductSchema,'params'), async (req,res,next) => {
  // FORMA EXPLICITA DE CAPTURAR EL ERROR MEDIANTE EL USO DE try/catch
  try {
    // FUNCIONAMIENTO NORMAL DEL ROUTING

    const primerID = req.params.id;  // DEFINIR EL PARAMETRO 'id' DEL OBJETO COMO LA VARIABLE 'primerID'
    const {id} = req.params; // OTRA FORMA DE DEFINIR UNA VARIABLE SI DENTRO DE LOS PARAMETROS SOLO NOS INTERESA UNO (id) - ECMASCRIPT 6

    /* TOMA EL PARAMETRO 'id' ENVIADO POR EL USUARIO (EJ: localhost:3001/products/123   id=123) Y LO ENVIA A LA FUNCION findOne DEL ARCHIVO ./SERVICES/product.service

    ALLI COMPARA EL 'id' DEL USUARIO CON EL 'id' DE LOS DEMAS PRODUCTOS Y RETORNA EL PRODUCTO CON EL MISMO 'id'
    */
    const products = await service.findOne(id);
    res.json(products);
  } catch (error) {
    // SI SE DETECTA ERROR, SE EJECUTARAN LOS MIDDLEWARES
    next(error);
  }
  /*
  //  CONFIGURACION EJ BASICO: '404' COMO EL ESTADO (999 COMO id DE EJEMPLO)
  const if_value = '999';
  if(id === if_value){
    res.status(404).json({
      id: id,
      id2: primerID,
      message: '(id) ' + typeof id + ' (id2) ' + typeof primerID + ' (if_value) ' + typeof if_value, // SOLO SE PUEDE USAR UN message
      message:'producto no encontrado',
    });
  }
  //  CONFIGURACION EJ BASICO: '200' COMO EL ESTADO DE RESPUESTA (RESPONSE STATUS)
  res.status(200).json({
    id: id,
    message: '(id) ' + typeof id + ' (id2) ' + typeof primerID + ' (if_value) ' + typeof if_value, // SOLO SE PUEDE USAR UN message
    id2: primerID,
    name: 'Product4',
    price: '$18'
  });
  */
}); // TEST:  localhost:'port'/products/randomNumber       randomNumber REPRESENTA EL ID
//  EJ: localhost:3001/products/123

// EJEMPLO DE RUTA DISFUNCIONAL (LA PALABRA FILTRO SE TOMA COMO UN ID Y ES TOMADA POR app.get('products/:id)... ) ESTO SUCEDE SU UBICACION EN EL CODIGO VA DESPUES DE app.get('products/:id)
router.get('/filtro_disfuncional', (req,res) => {
  res.send('Ejemplo de filtro no funcional');
});// EJ: localhost:3001/products/filtro_disfuncional

// EJEMPLO .post  - CREAR PRODUCTOS
router.post('/', validatorHandler(createProductSchema,'body'), async (req,res) => {
  const body = req.body;  //  RECIBIR PARAMETROS PROVENIENTES DE INSOMNIA CON EL ATRIBUTO 'body'

  // EJEMPLO RESPUESTA JSON SIN CONFIGURACION DE ESTADO
  /* res.json({
    //  MENSAJE DE NOTIFICACION - PRODUCTO CREADO
    message:'created',
    data: body  // ENVIO DE DATA
  }) */

  //  CONFIGURACION '201' COMO EL ESTADO DE RESPUESTA (RESPONSE STATUS) - ESTA CONFIGURACION SE DISEÑO ANTES DE TENER EL SERVICIO 'create' POR LO CUAL YA NO SE USA

  /* res.status(201).json({
    //  MENSAJE DE NOTIFICACION - PRODUCTO CREADO
    message:'created',
    data: body  // ENVIO DE DATA
  }); */

  const newProduct = await service.create(body);  // IMPLEMENTACION DEL SERVICIO 'create' DENTRO DEL ROUTER 'post'
  res.status(201).json(newProduct); // ENVIO DE DATA - NUEVO PRODUCTO CREADO
});

/* CLASE 20: SE EJECUTAN 2 MIDDLEWARES DE VALIDACION DE MANERA SECUENCIAL...
1. VALIDA EL 'id' OBTENIDO DESDE 'params'
2. VALIDA EL RESTO DE COMPONENTES DEL PRODUCTO(name, price, image...) OBTENIDOS DESDE 'body'
*/
router.patch('/:id', validatorHandler(getProductSchema,'params'), validatorHandler(updateProductSchema,'body'), async (req,res,next) => {
  // try/catch AÑADIDO PARA COMROBAR SI EL ID ENVIADO POR EL USUARIO EXISTE O NO (NORMALMENTE SE HACIA DIRECTAMENTE EN EL ARCHIVO DE SERVICIO CON UN CONDICIONAL)
  try {
    const {id} = req.params; //  RECIBE PARAMETRO 'id'
  const body = req.body;  //  RECIBIR PARAMETROS PROVENIENTES DE INSOMNIA CON EL ATRIBUTO 'body'

  /*  CONFIGURACION DE PRODUCTO MODIFICADA - ESTA CONFIGURACION SE DISEÑO ANTES DE TENER EL SERVICIO 'update' POR LO CUAL YA NO SE USA
  res.json({
    //  MENSAJE DE NOTIFICACION - PRODUCTO CREADO
    message:'update (patch)',
    data: body,  // ENVIO DE DATA
    id, // ENVIA ID
  })
  */

  const product = await service.update(id, body);// IMPLEMENTACION DEL SERVICIO 'create' DENTRO DEL ROUTER 'patch'
  res.json(product); // ENVIO DE DATA - PRODUCTO MODIFICADO
  } catch (error) {
    /*
    //ANTES DE TENER MIDDLEWARES
    // EN CASO DE QUE NO EXISTA EL ID DEL PRODUCTO SE ENVIA UN MENSAJE DE ERROR 404
    res.status(404).json();
    message: error;
    */

    //DESPUES DE TENER MIDDLEWARES
    // EN CASO DE QUE NO EXISTA EL ID DEL PRODUCTO SE ENVIA A LOS MIDDLEWARES DE ERROR PARA QUE ENVIEN UNA RESPUESTA
    next(error);
  }
});

router.delete('/:id', async (req,res,next) => {
  try {
    const {id} = req.params; //   RECIBE PARAMETRO 'id'
  /*  CONFIGURACION DE PRODUCTO ELIMINADO - ESTA CONFIGURACION SE DISEÑO ANTES DE TENER EL SERVICIO 'deleted' POR LO CUAL YA NO SE USA
  res.json({
    //  MENSAJE DE NOTIFICACION - PRODUCTO CREADO
    message:'deleted',
    id, // ENVIA ID
  })
  */
  const productDeleted = await service.delete(id);// IMPLEMENTACION DEL SERVICIO 'create' DENTRO DEL ROUTER 'patch' - TAMBIEN SE LE LLAMA A LA VARIABLE = rta
  res.json(productDeleted); // ENVIO DE DATA - PRODUCTO MODIFICADO
  } catch (error) {
    next(error);
  }
});

module.exports = router;      // EXPORTAR LA RUTA DE PRODUCTOS
