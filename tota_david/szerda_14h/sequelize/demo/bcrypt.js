const bcrypt = require('bcrypt');

// Hash-elés:
const ROUNDS = 10;

const salt = bcrypt.genSaltSync(ROUNDS);
const hash = bcrypt.hashSync("password", salt);

console.log(hash);

// Ellenőrzés:
// Loginnál az 1. paraméterbe írjuk a user által megadott jelszót
console.log(bcrypt.compareSync("password", hash));
console.log(bcrypt.compareSync("passw0rd", hash));
