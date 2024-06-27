// RUTA DE AUTENTICACION - passportjs
const express = require('express');
const passport = require('passport'); // Importar el module passport

const router = express.Router();

router.post('/login',
  // Llevar a cabo validacion por medio de la estrategia passport-local (DESHABLITAR SESIONES JWT)
  passport.authenticate('local',{ session:false }),
  async (req, res, next) =>
  {
    try {
      // Envia el usuario si la validacion de la estrategia funciona
      res.json(req.user);
    } catch (error) {
      // Error si la validacion no funciona
      next(error);
    }
  }
);

module.exports = router;
