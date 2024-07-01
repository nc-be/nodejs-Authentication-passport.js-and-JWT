// TEST: Signing tokens

const jwt = require('jsonwebtoken'); // Importar modulo jsonwebtoken

const secret = 'clav3'; // Llave secreta para la generacion de tokens (NOTA: SOLO PRUEBA - Debe generarse como una variable de entorno dentro del archivo ./../.env)

// Posee la informacion del usuario y va encriptado dentro del token
const payload = {
  sub: 1,// Forma por la cual se identifica el usuario
  // Otros valores relaciones con el usuario EJ: scope,role,etc
  role: 'customer'
}

function signToken(payload,secret) {
  return jwt.sign(payload,secret);
}

const token = signToken(payload,secret);
console.log(token);
