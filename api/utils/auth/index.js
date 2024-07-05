const passport = require('passport'); // Importar el module passport

const localStrategy = require('./strategies/local.strategies'); // Importar estrategia - passport.local
const jwtStrategy = require('./strategies/jwt.strategies'); // Importar estrategia - passport.jwt

// Definir estrategias a usar
passport.use(localStrategy);
passport.use(jwtStrategy);

module.exports = passport
