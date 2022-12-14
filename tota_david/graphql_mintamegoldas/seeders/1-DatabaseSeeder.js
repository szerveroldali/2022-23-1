"use strict";

// Faker dokumentáció, API referencia: https://fakerjs.dev/guide/#node-js
const { faker } = require("@faker-js/faker");
const models = require("../models");
const { sequelize, Sequelize, Recipe, Ingredient, Appliance, Storage } = models;
const chalk = require("chalk");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            const ingredients = [];

            // Tárolók
            const storagesCount = faker.datatype.number({ min: 5, max: 10 });
            for (let i = 0; i < storagesCount; i++) {
                const storage = await Storage.create({
                    name: faker.helpers.unique(faker.random.alpha, [24]),
                    capacity: faker.datatype.number({ min: 1, max: 100 }),
                });
                // Az adott tárolóhoz tartozó hozzávalók
                const ingredientsCount = faker.datatype.number({ min: 5, max: 10 });
                for (let j = 0; j < ingredientsCount; j++) {
                    ingredients.push(
                        await storage.createIngredient({
                            name: faker.random.alpha(24),
                            amount: faker.datatype.number({ min: 1, max: 100 }),
                        })
                    );
                }
            }

            // Konyhai berendezések
            const appliancesCount = faker.datatype.number({ min: 5, max: 10 });
            for (let i = 0; i < appliancesCount; i++) {
                const appliance = await Appliance.create({
                    name: faker.helpers.unique(faker.random.alpha, [24]),
                });
                // Az adott konyhai berendezéshez köthető receptek
                if (Math.random() < 0.25) continue; // 25% eséllyel ne tartozzanak hozzá receptek
                const recipesCount = faker.datatype.number({ min: 3, max: 6 });
                for (let j = 0; j < recipesCount; j++) {
                    const recipe = await appliance.createRecipe({
                        name: faker.helpers.unique(faker.random.alpha, [24]),
                        isVegetarian: faker.datatype.boolean(),
                        doneCount: faker.datatype.number({ min: 0, max: 100 }),
                    });
                    // Hozzávalók a recepthez
                    await recipe.setIngredients(faker.helpers.arrayElements(ingredients));
                }
            }

            console.log(chalk.green("A DatabaseSeeder lefutott"));
        } catch (e) {
            // Ha a seederben valamilyen hiba van, akkor alapértelmezés szerint elég szegényesen írja
            // ki azokat a rendszer a seeder futtatásakor. Ezért ez Neked egy segítség, hogy láthasd a
            // hiba részletes kiírását.
            // Így ha valamit elrontasz a seederben, azt könnyebben tudod debug-olni.
            console.log(chalk.red("A DatabaseSeeder nem futott le teljesen, mivel az alábbi hiba történt:"));
            console.log(chalk.gray(e));
            console.log(chalk.gray(e.stack));
        }
    },

    down: async (queryInterface, Sequelize) => {},
};
