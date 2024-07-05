// RUTA DE AUTENTICACION - passportjs
const express = require('express');
const passport = require('passport'); // Importar el module passport
const jwt = require('jsonwebtoken'); // Importar modulo jsonwebtoken

const { config } = require('./../config/config')

const router = express.Router();

router.post('/login',
  // Llevar a cabo validacion por medio de la estrategia passport-local (DESHABLITAR SESIONES JWT)
  passport.authenticate('local',{ session:false }),
  async (req, res, next) =>
  {
    // ANTES DE JWT (Firmar y verificar tokens)
    /* try {
      // Envia el usuario si la validacion de la estrategia funciona
      res.json(req.user);
    } catch (error) {
      // Error si la validacion no funciona
      next(error);
    } */

    // DESPUES DE JWT (Firmar y verificar tokens)
    try {
      const user = req.user;  // Datos del usuario
      const payload = { // Datos del payload importados del usuario (id, role)
        sub: user.id,
        role: user.role
      }

      const token = jwt.sign(payload, config.JWTSecret)  // Generar token apartir de el payload y la palabra secreta
      res.json({  // Respuesta JSON con los datos del usuario y el token generado por JWT
        user,
        token
      })

    } catch (error) {
      next(error);
    }
  }


);

module.exports = router;
