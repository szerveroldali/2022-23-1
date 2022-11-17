// Egyszerű segédscript az adatbázis törléséhez
const fs = require('fs');
const DB_PATH = 'database/database.sqlite';
if (fs.existsSync(DB_PATH))
    fs.rmSync(DB_PATH);