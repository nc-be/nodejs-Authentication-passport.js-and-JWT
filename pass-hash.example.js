const bcrypt = require('bcrypt');

async function hash() {
  const myPass = '123.321'; // contraseña de usuario
const hashPass = await bcrypt.hash(myPass, 10); // contraseña hashed
/* SINTAXIS bcrypt.hash(Contraseña, #Encriptaciones) */
console.log(hashPass);
}

hash();
