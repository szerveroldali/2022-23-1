const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("password", salt);

console.log(hash);
console.log(bcrypt.compareSync("password", hash)); // true
