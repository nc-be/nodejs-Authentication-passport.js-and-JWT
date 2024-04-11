// SERVICIOS DE LA PAGINA DE PRODUCTOS

const { faker } = require('@faker-js/faker');// LLAMAR PAQUETE FAKER - Fake info generation (realistic - no sec risk)
const boom = require('@hapi/boom'); // LLAMAR PAQUETE BOOM - MANEJO DE ERRORES RESPETANDO LOS RESPONSIVE STATUS (299, 404, ETC)
const pool = require('../libs/postgres.pool');

class ProductsService{
  // DEFINIR LOGICA E INTERACCIONES A NIVEL TRANSACCIONAL DE LOS DATOS
  constructor(){
    this.products=[]; // FUENTE DE DATOS MANEJADA EN MEMORIA (ARRAY QUE INICIA VACIO)
    this.generate(); // CADA VEZ QUE SE GENERE UNA INSTANCIA DE SERVICIO SE CREARA LA LISTA DE PRODUCTOS FALSA UTILIZANDO FAKER
    this.pool = pool; // CREAR POOL DESDE LA CONEXION
    this.pool.on('error', (err) => console.err(err)); // DEVUELVE MENSAJE DE ERROR DE CONEXION 'error' EN CASO QUE NO SE CREE EL POOL DE FORMA CORRECTA
  }

/* CLASE 15: SE AÑADE COMPORTAMIENTO ASINCRONO A LOS SERIVCIOS
    EN EL SERVICIO find() SE AÑADE UN TIEMPO DE DEMORA DE 5 SEGUNDOS
*/

// GENERA UNA LISTA DE PRODUCTOS FALSA (PARA TESTING) - NO CAMBIAN HASTA CERRAR EL SERVIDOR (ANTES CAMBIABAN CADA VEZ QUE SE INGRESABA A LA URL)
async generate(){
  const totalProducts= 10;
  for(let i=0;i<totalProducts;i++){
    this.products.push({
    id: faker.string.uuid(),  // GENERA UN ID RANDOM (NUEVO)
    name:faker.commerce.productName(),
    price:parseInt(faker.commerce.price(), 10),
    image:faker.image.url(),
    blockStatus:faker.datatype.boolean() // 'true': PUEDE SER MODIFICADO POR EL USUARIO,  'false': NO PUEDE SER MODIFICADO
  })
  }
}

// CREAR INFORMACION
async create(data){
  // DEFINIR NUEVO PRODUCTO COMO 'newProduct'
  const newProduct = {
    id: faker.string.uuid(),  // EL ID EN ESTE CASO ES AUTOGENERADO POR FAKER
    // INFORMACION COMO EL NOMBRE, PRECIO E IMAGEN LA ENTREGAMOS
    ...data
    // Spread syntax (...) PERMITE QUE EL ARRAY SE EXPANDA Y CREE LUGARES DONDE SE ESPERAN INCLUIR CEROS U OTROS ARGUMENTOS (LOS VALORES DEL NOMBRE, PRECIO E IMAGEN DEL PRODUCTO)
  }
  this.products.push(newProduct); // INSERTAR EL NUEVO PRODUCTO AL ARRAY DONDE ESTAN LOS OTROS
  return newProduct; // RETORNAR PRODUCTO
}

// RETORNA EL OBJETO QUE CONTIENE TODOS LOS PRODUCTOS GENERADOS POR LA FUNCION generate()
/* COMPORTAMIENTO ASINCRONO, DELAY = 2000ms */
async find(){
  /* return new Promise ((resolve, reject)=>{
    setTimeout(() => {
      resolve(this.products);
    }, 2000);
  }) */
  const query = 'SELECT * FROM tasks'; // GENERAR QUERY PARA CUMPLIR SOLICITUD DEL SERVICIO
  const rta = await this.pool.query(query); // EJECUTA QUERY DE FORMA ASINCRONA
  return rta.rows; // RETORNA LA LISTA DE PRODUCTOS
}

// find RETORNA EL OBJETO CON EL MISMO 'id' ENVIADO POR EL USUARIO
async findOne(id){
  /*
  // ERROR FORZADO PARA HACER TEST DE MIDDLEWARES DE ERROR
  TEST:
  (Get 1p) http://localhost:3001/api/v1/products/ID_PRODUCT
  ID_PRODUCT:   ALGUNO DE LOS IDS AUTOGENERADOS POR faker UTILIZANDO...
  (Get p) http://localhost:3001/api/v1/products/
  //const name = this.getTotal(); //getTotal NO EXISTE
  */

  /*
  COMPARA LOS IDS DE LA LISTA DE PRODUCTOS  Y EL 'id' DEL USUARIO
  item.id = IDS DE LA LISTA
  id = 'id' DEL USUARIO
  */

  const product = this.products.find(item => item.id === id);
  // ESTE CONDICIONAL VERIFICA QUE EL OBJETO NO ESTE VACIO
  if(!product){
    throw boom.notFound('Product not found'); // Utilizando BOOM, el programa inmediatamente sabe que notFound se refiere al status 404
  }
  if(product.blockStatus){
    // SI EL 'id' EXISTE, PERO ESTA BLOQUEADO ('blockStatus' == true), ESTE CONDICIONAL IMPIDE QUE SE VISUALICE EL PRODUCTO (nombre, precio, etc)
    throw boom.conflict('Product is blocked'); // Utilizando BOOM, el programa inmediatamente sabe que conflict se refiere al status 409 (conflicto con la logica de negocio)
  }
  return product;
}

// ACTUALIZAR LA LISTA DE PRODUCTOS
async update(id,changes){
  // LO PRIMERO ES IDENTIFICAR LA POSICION DEL ATRIBUTO ENTREGADO (id) DENTRO DE LA LISTA DE PRODUCTOS

  /* findIndex RETORNA -LA POSICION- DEL OBJETO CON EL MISMO 'id' ENVIADO POR EL USUARIO
  LA FUNCION RECIBE EL 'id' DEL PRODUCTO Y LOS CAMBIOS QUE SE REALIZARAN
  */
  const index = this.products.findIndex(item => item.id === id);
  // ESTE CONDICIONAL SE ENCARGA DEL VERIFICAR QUE EL 'id' EXISTA (SI EL 'id' ENTREGADO NO EXISTE DENTRO DE LA LISTA DE PRODUCTOS SU VALOR SERA -1 SIEMPRE)
  if (index === -1){
    console.log('here');
    //throw new Error('Product not found'); // ANTES DE INSTALAR BOOM
    throw boom.notFound('Product not found'); // Utilizando BOOM, el programa inmediatamente sabe que notFound se refiere al status 404
  }

  //this.products[index]=changes; // APLICAR LOS CAMBIOS (changes) EN LA POSICION (index) DEL ARRAY DE MEMORIA    NOTA: ESTO CAMBIA EL CONTENIDO ORIGINAL DEL OBJETO COMPLETAMENTE
  const product = this.products[index];
  this.products[index]={
    // UTILIZANDO Spread syntax (...) SE APLICAN LOS CAMBIOS REALIZADOS EN EL PRODUCTO SIN REEMPLAZAR TODO SU CONTENIDO
    ...product,
    ...changes
  };

  return this.products[index]; // RETORNAR PRODUCTO ACTUALIZADO
}

async delete(id){
  // IDENTIFICAR POSICION DEL PRODUCTO (SEGUN SU 'id')
  const index = this.products.findIndex(item => item.id === id);
  // VERIFICAR QUE EL PRODUCTO EXISTA
  if (index === -1){
    console.log('hello');
    //throw new Error('Product not found'); // ANTES DE INSTALAR BOOM
    throw boom.notFound('Product not found'); // Utilizando BOOM, el programa inmediatamente sabe que notFound se refiere al status 404
  }
  //this.products.splice(index, 1);  // ELIMINAR EL PRODUCTO QUE SE ENCUENTRA EN LA POSICION (index) DETERMINADA POR findIndex
  return{ id }; // RETORNAR EL 'id' DEL PRODUCTO QUE SE ELIMINO
}
}

module.exports = ProductsService; // EXPORTAR LA CLASE
