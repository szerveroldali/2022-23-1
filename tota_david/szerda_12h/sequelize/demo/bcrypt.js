const bcrypt = require('bcrypt');

// Jelszó hashelése:
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("password", salt);

console.log(hash);

// Jelszó ellenrőzése:

// Ez mindig true:
console.log(bcrypt.compareSync("password", hash));
