// ESTE ARCHIVO SE ENCARGA DE ENVIAR LA CONEXION HACIA LOS MODELOS PARA HACER MAPEO DE DATOS
const { UserSchema, User } = require('./user.model'); // LLAMAR EL MODELO ESTATICO CREADO PARA EL SERVICIO 'user.service.js'

// CONFIGURACION DE LOS MODELOS, LA FUNCION RECIBE LA CONEXION 'sequelize'
function setupModels(sequelize) {
  /*
  SINTAXIS: User.init(Nombre_Esquema, ConfiguracionEsquema)

  SE USA PARA HACER init DEL ESQUEMA DE USUARIOS JUNTO A SU CONFIGURACION (YA QUE ESTE CASO ES UN METODO ESTATICO SOLO SE NECESITA PONER config() SIN NECESIDAD DE UNA INSTANCIA (SE PUEDE LLAMAR DE FORMA DIRECTA (?) ) */
  User.init(UserSchema, User.config(sequelize));
}

module.exports = setupModels;
