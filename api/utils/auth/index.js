const passport = require('passport'); // Importar el module passport

const localStrategy = require('./strategies/local.strategies'); // Importar estrategia - passport.local

// Definir estrategias a usar
passport.use(localStrategy)

module.exports = passport
