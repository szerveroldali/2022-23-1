"use strict";

// Faker dokumentáció, API referencia: https://fakerjs.dev/guide/#node-js
const { faker } = require("@faker-js/faker");
const chalk = require("chalk");
// TODO: Importáld be a modelleket
// const { ... } = require("../models");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // TODO: Ide dolgozd ki a seeder tartalmát:
        // ...

        console.log(chalk.green("A DatabaseSeeder lefutott"));
    },

    // Erre alapvetően nincs szükséged, mivel a parancsok úgy vannak felépítve,
    // hogy tiszta adatbázist generálnak, vagyis a korábbi adatok enélkül is elvesznek
    down: async (queryInterface, Sequelize) => {},
};
