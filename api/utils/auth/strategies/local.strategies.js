// https://www.passportjs.org/packages/passport-local/

/* passport.local - Estrategia utilizada para autenticar el login del usuario (user and password)
 */
const { Strategy } = require('passport-local'); // Importar el module passport-local

const boom = require('@hapi/boom'); // Importar el module boom para mensajes de error

const bcrypt = require('bcrypt'); // Importar el module bcrypt para verificar que el hashing coincida

const UserService = require('../../../services/user.service'); // Importar servicios de usuarios

const service = new UserService(); // Generar instacia para los servicios de usuarios

 // Crear instancia de la estrategia
 /* parametros de entrada: email, password, done (verifica que el login funcione correctamente) */
const localStrategy = new Strategy(
  {
    usernameField:'email',
    passwordField:'password'
  },
  async(email, password, done)=>{
  // intenta llevar a cabo el servicio si no funciona, 'done' enviara un mensaje de error (1)
  try {
    const foundUser = await service.findByEmail(email); // Busca el PRIMER usuario que corresponda a este email (este atributo es unico)
    if (foundUser) {
      // (2) Este condicional verifica que el email exista dentro de la base de datos
      const verify = await bcrypt.compare(password, foundUser.password);
      if (verify) {
        // (3) Verifica que la contraseña coincida con el bcrypt.hash
        delete foundUser.dataValues.password; // Eliminar el hashed password antes de enviar los datos
        done(null, foundUser); // Notificacion - acceso aprobado - Envio de datos de usuario
      } else {
        // (3) En caso de que no coincida
        done(boom.unauthorized(), false); // Note - acceso denegado
      }
    } else {
      // (2) En caso de que no exista el email dentro de la base de datos
      done(boom.unauthorized(), false); // Note - acceso denegado
    }
  } catch (error) {
    done(error, false); // Enviar error (done error) (1)
  }

});

module.exports = localStrategy; // Exportar estrategia
