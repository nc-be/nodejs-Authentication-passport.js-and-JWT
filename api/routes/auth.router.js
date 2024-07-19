// RUTA DE AUTENTICACION - passportjs
const express = require('express');
const passport = require('passport'); // Importar el module passport

const router = express.Router();

const AuthService = require('../services/auth.service'); // Importar servicios de usuarios
const service = new AuthService(); // Generar instacia para los servicios de usuarios

router.post('/login',
  // Llevar a cabo validacion por medio de la estrategia passport-local (DESHABLITAR SESIONES JWT)
  passport.authenticate('local',{ session:false }),
  async (req, res, next) =>
  {
    // jsonwebtoken (ANTES DE IMPLEMENTAR SERVICIO'signToken' auth.service.js)
    /*
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
    */

    // jsonwebtoken (ANTES DE IMPLEMENTAR SERVICIO'signToken' auth.service.js)
    try {
      const user = req.user;
      const tokenData = await service.signToken(user);
      res.json(tokenData);
    } catch (error) {
      next(error);
    }
  }
);

// Esta ruta se utiliza en caso de que el usuario desea recuperar su password
router.post('/recovery',
  async (req, res, next) =>
  {
    try {
      const { email } = req.body;
      const rta = await service.sendRecoveryLink(email);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

// Esta ruta se utiliza unicamente luego de que el usuario genere y se acceda al link de recuperacion del password enviado a su email.

// NOTA: Falta capa de validacion de datos (token y newPassword) - EJ (pass): Generar un esquema en joi que valide que el newPassword cumpla un minimo/maximo numero de caracteres
router.post('/change',
  async (req, res, next) =>
  {
    try {
      const { token, newPassword } = req.body;
      //console.log('\nRecoveryToken: ' + token + '\n'); //(TESTING)
      const rta = await service.changePassword(token,newPassword);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
