// TEST: Verifying tokens (CREADO EN BASE A ../token-sign.js)

const jwt = require('jsonwebtoken'); // Importar modulo jsonwebtoken

const secret = 'clav3'; // Llave secreta para la generacion de tokens (NOTA: SOLO PRUEBA - Debe generarse como una variable de entorno dentro del archivo ./../.env)

// Token generado utilizando el comando 'sign' del modulo jsonwebtoken en el archivo ../token-sign.js
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcxOTc4MzY1MH0.W1k7SnFIOut-oEKRZDqk-9m_eANRlhzH-RCK2TYMViI'

const token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcxOTc4MzY1MH0.W1k7SnFIOut-oEKRZDqk-9m_eTYUlhzH-RCK2TYMViI';

function signToken(token,secret) {
  return jwt.verify(token,secret);
}

const verifyToken = signToken(token,secret);
console.log(verifyToken);
const verifyToken2 = signToken(token2,secret);  // token incorrecto
console.log(verifyToken);

