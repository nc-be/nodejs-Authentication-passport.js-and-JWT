const bcrypt = require('bcrypt');

async function verifyHash() {

  const myPass = '123.321'; // contraseña de usuario
  const hashPass = '$2b$10$NWQ5QAAM7NTs4b/8YwKprORj.tNDzVhSgcNjeqJNzDW2g9axWThTy'; // contraseña hashed
  const verify = await bcrypt.compare(myPass, hashPass);
  /* SINTAXIS bcrypt.compare(Contraseña, ContraseñaHashed) */
  console.log(verify); // true or false
}

verifyHash();
