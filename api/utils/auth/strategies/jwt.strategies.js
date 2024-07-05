// https://www.passportjs.org/packages/passport-jwt/

/* passport.jwt - Modulo que permite autorizar enpoints utilizando JSON tokens
 */

const { Strategy, ExtractJwt } = require('passport-jwt'); // Importar el module passport-jwt

const { config } = require('../../../config/config');

// Extrae los datos necesarios para la autorizacion a los endpoints: token y palabra secreta
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),// jwtFromRequest de donde proviene el token (fromAuthHeaderAsBearerToken - ???)

 secretOrKey: config.JWTSecret, // Ubicacion de la palabra secreta (Dentro de la configuracion de las variables de ambiente se encuentra la palabra secreta)
};

 // Crear instancia de la estrategia (Una vez verificada la estrategia se enviaran los datos del PAYLOAD [Igual funcionaimento que la estrategia local.strategies.js donde se envian los DATOS DEL USUARIO despues de verificar])
const jwtStrategy = new Strategy(options, (payload, done)=>{
  // La estrategia recibe como parametro de entrada los datos extraidos con passport.jwt y a partir de ello genera y retorna el payload
  return done(null,payload)
}
);

module.exports = jwtStrategy; // Exportar estrategia
