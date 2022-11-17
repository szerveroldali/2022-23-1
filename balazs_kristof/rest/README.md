# REST API
Az alábbi projekt `npm install --dev` paranccsal telepíthető, majd `npm run dev` paranccsal indítható.
## Csomagok
- Éles:
    - @faker-js/faker
    - dotenv
    - fastify
    - sequelize
    - sqlite3
- Fejlesztői (`--save-dev`):
    - nodemon
    - sequelize-cli
## Scriptek:
- `npm run db`: `node clean_db.js && npx sequelize db:migrate && npx sequelize db:seed:all`
- `npm run dev`: `nodemon index.js`