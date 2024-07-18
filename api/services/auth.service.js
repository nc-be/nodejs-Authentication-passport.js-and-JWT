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
        throw boom.unauthorized('Password: ' + password + ' no coincide con la base de datos');
        // throw boom.unauthorized(); // Note - acceso denegado
      }
    } else {
      // (2) En caso de que no exista el email dentro de la base de datos
      throw boom.notFound('El usuario: ' + email + ' no existe');
      // throw boom.notFound(); // Note - acceso denegado
    }
  }

  // passport.jwt - Modulo que permite autorizar enpoints utilizando JSON tokens
  async signToken(user){
      const payload = { // Datos del payload importados del usuario (id, role)
        sub: user.id,
        role: user.role
      }

      const token = jwt.sign(payload, config.JWTSecret)  // Generar token apartir de el payload y la palabra secreta
      return{  // Retornar usuario y token firmado/validado
        user,
        token
      }
  }

  // Genera un link para recuperar el pass del correo
  async sendRecoveryLink(email){
    const foundUser = await service.findByEmail(email);
    if (foundUser) {
      // GENERAR LINK: Para crear el link se utilizara un token para identificar al usuario - La creacion de este token sigue la misma logica del token jwt (Clase 10)
      const payload= {sub: user.id}; // Payload generado apartir del id del usuario
      const token = jwt.sign(payload,config.recoverySecret, {expiresIn: '15min'}); // Token TEMPORAL (15 minutos luego de enviar el correo) generado apartir del del payload y palabra secreta (variable de entorno RECOVERY_SECRET - configurada como recoverySecret)
      const link = `http://frontendurl.com/recovery?token=${token}`; // Link generado a partir del token

      // Informacion del mensaje de correo a enviar
      const infoMail = {
        from: '"nc-be" <>', // alias e Email que envia mensaje (sera igual al del transporter)
        to: `${foundUser.email}`, // Email que recibe el mensaje (debe encontrarse dentro de la base de datos)
        subject: "Email de recuperacion de password", // Subject line
        // text: "Hello world?", // plain text body - Disabled Clase 17
        html: "<b>Ingresar al siguiente link: </b>", // html body
      }

      const rta = await this.sendEmail(infoMail); // Ejecuta el servicio 'sendEmail' para enviar un mensaje con la informacion contenida en 'infoMail'
      return rta;
    } else{
      throw boom.unauthorized();
    }
  }

  // Envio de correos utilizando Gmail como SMTP (Aqui esta definido el transporter)
  async sendEmail(infoMail){
    const foundUser = await service.findByEmail(email); // Busca el PRIMER usuario que corresponda a este email (este atributo es unico)
    if (foundUser) {
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

      return { message: 'Mensaje enviado... ID: ' + info.messageId};
    // return console.log('\nMensaje enviado');
    } else{
      throw boom.notFound('El usuario: ' + email + ' no existe'); // Peticion denegada (usuario no existe)
      //throw boom.unauthorized(); // Peticion denegada (usuario no existe)
    }
  }
}

module.exports = AuthService;
