//  RUTA DE USUARIOS
const express = require('express');   // LLAMAR PAQUETE EXPRESS

const router = express.Router();    //  CONSTRUIR APLICACION

// DEVOLVER 2 IDS OBTENIDAS DE LA URL (larger)
router.get('/', (req,res) => {
  res.send('ejemplo ruta 2');
}); // localhost:3001/r2

module.exports = router;
