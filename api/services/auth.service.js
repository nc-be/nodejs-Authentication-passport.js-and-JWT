const UserService = require('./user.service');

const service = new UserService(); // Generar instacia para los servicios de usuarios (servicio getUser)

const boom = require('@hapi/boom'); // Importar el module boom para mensajes de error (servicio getUser)

const bcrypt = require('bcrypt'); // Importar el module bcrypt para verificar que el hashing coincida (servicio getUser)

const jwt = require('jsonwebtoken'); // Importar modulo jsonwebtoken para firmar y validar tokens (servicio signToken)

const { config } = require('./../config/config') // (servicio signToken - sendEmail)

const nodemailer = require("nodemailer"); // Importar libreria para el envio de correos (servicio sendMail)

class AuthService {
  // Este servicio se encarga de llevar a cabo las estrategias de autenticacion de usuario y firma/validacion de tokens anteriormente utilizadas en la carpeta utils (COMMITS <= 618f42e03aa27c58a25945037ac20d33b90229f3)

  // Tambien se encarga de llevar a cabo una nueva estrategia para el envio de correos

  // passport.local - Estrategia utilizada para autenticar el login del usuario (user and password)
  async getUser(email, password){
    const foundUser = await service.findByEmail(email); // Busca el PRIMER usuario que corresponda a este email (este atributo es unico)
    if (foundUser) {
      // (2) Este condicional verifica que el email exista dentro de la base de datos
      const verify = await bcrypt.compare(password, foundUser.password);
      if (verify) {
        // (3) Verifica que la contraseña coincida con el bcrypt.hash
        delete foundUser.dataValues.password; // Eliminar el hashed password antes de enviar los datos
        return foundUser;
      } else {
        // (3) En caso de que no coincida
        //throw boom.unauthorized('Password: ' + password + ' no coincide con la base de datos'); //(TESTING)
        throw boom.unauthorized(); // Note - acceso denegado
      }
    } else {
      // (2) En caso de que no exista el email dentro de la base de datos
      //throw boom.notFound('El usuario: ' + email + ' no existe'); // (TESTING)
      throw boom.notFound(); // Note - acceso denegado
    }
  }

  // passport.jwt - Modulo que permite autorizar enpoints utilizando JSON tokens
  async signToken(user){
      const payload = { // Datos del payload importados del usuario (id, role)
        sub: user.id,
        role: user.role
      }

      const token = jwt.sign(payload, config.JWTSecret)  // Generar token apartir de el payload y la palabra secreta
      if (user.recoveryToken){
        delete user.dataValues.recoveryToken; // Eliminar recoveryToken de los datos retornados por insomnia (seguridad)
      }
      return{  // Retornar usuario y token firmado/validado
        user,
        token
      }
  }

  // Genera un link para recuperar el pass del correo
  async sendRecoveryLink(email){
    const foundUser = await service.findByEmail(email);
    console.log(foundUser);
    if (foundUser) {
      // GENERAR LINK
      const payload= {sub: foundUser.id}; // Payload generado apartir del id del usuario
      const recoveryToken = jwt.sign(payload,config.recoverySecret, {expiresIn: '15min'}); /* Token TEMPORAL (15 minutos luego de enviar el correo) generado apartir del del payload y palabra secreta (variable de entorno RECOVERY_SECRET - configurada como recoverySecret) */
      const link = `http://frontendurl.com/recovery?token=${recoveryToken}`; // Link generado a partir del token

      // Guardar token en la tabla de usuarios utilizando el servicio 'update'  - campo: 'recovery_token' - atributo recoveryToken
      await service.update(foundUser.id, {recoveryToken: recoveryToken});
      console.log(foundUser.recoveryToken);
      /* sintaxis
      await service.update(Identificador, {atributoTabla: valueAtributo});
      Identificador: Este atributo se utilizara para identificar donde iran los cambios (id del usuario)
      atributoTabla: Este atributo sera donde iran implementados los cambios (campo recoveryToken)
      valueAtributo: Valor que se le dara al atributoTabla (variabletoken)
      */

      // Informacion del mensaje de correo a enviar
      const infoRecoveryMail = {
        from: '"nc-be" <>', // alias e Email que envia mensaje (sera igual al del transporter)
        to:`${foundUser.email}`, // Email que recibe el mensaje (debe encontrarse dentro de la base de datos)
        subject: "Email de recuperacion de password", // Subject line
        // text: "Hello world?", // plain text body - Disabled Clase 17
        html: `<b>Ingresar al siguiente link para reestablecer la contrase\u00F1a: ${link} </b>`, // html body
      }

      const rta = await this.sendEmail(infoRecoveryMail); // Ejecuta el servicio 'sendEmail' para enviar un mensaje segun la configuracion del mensaje
      return rta;
    } else{
      throw boom.unauthorized();
    }
  }

  // Envio de correos utilizando Gmail como SMTP (Aqui esta definido el transporter)
  async sendEmail(infoMail){
  // Creacion del transporter (Los datos de usuario y password son extraidos de las variables de entorno)
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: config.userTransporter,  // user - gmail
      pass: config.passTransporter, // pass - app.password configurado en gmail (clase 15)
    },
  });

  const info = await transporter.sendMail(infoMail);

  //return { message: 'Mensaje enviado... ID: ' + info.messageId}; //(TESTING)
  return console.log('\nMensaje enviado');
  }

  async changePassword(token, newPassword){
    try {
      const payload = jwt.verify(token,config.recoverySecret); /* La funcion 'verify' del modulo passport-jwt se encarga de decifrar el payload segun el token y palabra-secreta utilizada (VER token-verify.js) */
      // console.log(payload); // (TESTING)
      const foundUser = await service.findOne(payload.sub); /* El servicio 'findOne' busca el PRIMER usuario que corresponda a este 'id' (recordar que dentro del 'sub' de un 'payload' se encuentra el 'id' del usuario, el userId es unico) */
      // console.log('\n foundUser \n'); // (TESTING)
      if(foundUser.recoveryToken !== token){
        /* Este condicional compara el token recibido como parametro de entrada por la funcion async 'changePassword' con el recoveryToken que tiene el usuario en la base de datos. Si el token es valido pero no coincide con el de la base de datos se enviara error*/

        /* TESTING: Nunca llega a este condicional debido a que si el token expiro o es distinto SE GENERARA UN ERROR INMEDIATO EN EL PAYLOAD (primera linea de codigo) */
        //throw boom.unauthorized('TOKEN INCORRECTO'); // (TESTING)
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10); // Aplicar 'hash' al nuevo password utilizando la funcion 'hash' de 'bcrypt' (VER pass-hash.example.js)
      //console.log('\n hash \n'); // (TESTING)
      await service.update(foundUser.id, {recoveryToken: null , password: hash}); // Guardar el nuevo password hashed en la tabla de usuarios utilizando el servicio 'update'  - campo: 'password' ... Cambiar el token de recuperacion a nulo para que no se pueda volver a usar - campo: 'recovery_token' - atributo recoveryToken

      //console.log('\n guardar \n'); // (TESTING)
      //return { message : 'Password cambiado - token:' + token + ' eliminado'} //(TESTING)

      return { message : 'Password cambiado'} // Mensaje notificando que el password y el token (literal) fueron cambiados
    } catch (error) {
      //throw boom.unauthorized('ERROR GENERAL'); // (TESTING)
      throw boom.unauthorized();
    }
  }
}

module.exports = AuthService;
