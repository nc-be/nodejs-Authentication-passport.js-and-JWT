// Se encarga de obtener las ordenes de los clientes  - base: auth.router.js
// RUTA DE AUTENTICACION - passportjs
const express = require('express');
const passport = require('passport'); // Importar el module passport
const OrderService = require('../services/order.service'); // Importar los servicios de las ordenes - Para obtener ordenes de compra de los clientes

const router = express.Router();

const service = new OrderService(); // Crear instancia para los servicios de las ordenes

router.get('/my-orders',
  passport.authenticate('jwt',{ session:false }), // validar la estrategia jwt para autorizar acceso al usuario (verificar token)
  async (req, res, next) =>
  {
    try {
      // Obtener ordenes de compra
      const user = req.user;
      const orders = await service.findByUser(user.sub); // Ejecutar el servicio findByUser el cual retorna las ordenes de compra del cliente

      /* El id del usuario se obtiene a partir de su payload. EL PAYLOAD CONTIENE = sub:user.id y role:user.role

      Recordar que se enviar el userId y no el customerId, por medio de sequelize se identifican el cliente utilizando la asociacion 1on1 creada entre user-customer

      Recordar tambien que este metodo no PIDE AL USER ingresar su userId nuevamente, se utilizan los datos de su sesion */
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }


);

module.exports = router;
