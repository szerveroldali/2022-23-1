const auth = require("./auth");
const db = require("../models");
const { Sequelize, sequelize } = db;
const { ValidationError, DatabaseError, Op } = Sequelize;
// TODO: Importáld a modelleket
const { Recipe, Ingredient, Appliance, Storage } = db;

module.exports = {
    Query: {
        helloName: auth((parent, params, context) => `Hello ${context.user.name}`),
        recipes: async () => await Recipe.findAll(),
        ingredient: async (_, { id }) => await Ingredient.findByPk(id),
        smallestStorage: async () => await Storage.findOne({
            order: [
                ['capacity', 'ASC']
            ]
        }),
        statistics: async () => ({
            popularVegetarianRecipeCount: await Recipe.count({
                where: {
                    isVegetarian: true,
                    doneCount: {
                        [Op.gt]: 10,
                    }
                }
            }),
            mostPopularRecipeName: (await Recipe.findOne({
                order: [
                    ['doneCount', 'DESC']
                ]
            })).name,
            leastPopularRecipeName: (await Recipe.findOne({
                order: [
                    ['doneCount', 'ASC']
                ]
            })).name,
            bigStoragesCount: await Storage.count({
                where: {
                    capacity: {
                        [Op.gt]: 30,
                    }
                }
            }),
            averageDoneCount: async () => {
                const doneCounts = (await Recipe.findAll())
                    .map(recipe => recipe.toJSON())
                    .map(({ doneCount }) => doneCount)

                console.log(doneCounts);

                // const sum = doneCounts.reduce(
                //       (accumulator, currentValue) => accumulator + currentValue,
                //       0,
                // );

                let sum = 0;
                for (const doneCount of doneCounts) {
                    sum += doneCount;
                }

                return Math.floor(sum / doneCounts.length);
            }
        }),
    },
    Recipe: {
        ingredients: async (recipe) => await recipe.getIngredients(),
        appliance: async (recipe) => await recipe.getAppliance(),
    },
    Storage: {
        ingredients: async (storage) => await storage.getIngredients(),
    },
    Ingredient: {
        isInBigStorage: async (ingredient) => {
            const storage = await ingredient.getStorage();
            return storage.capacity > 30;
        }
    },
    Mutation: {
        updateIngredient: async (_, { ingredientId, input }) => {
            const ingredient = await Ingredient.findByPk(ingredientId);
            await ingredient.update(input);
            return ingredient;
        },
        storeIngredients: async (_, { storageId, ingredients: ingredientInputs }) => {
            const storage = await Storage.findByPk(storageId);

            if (!storage) {
                return [];
            }

            const ingredients = [];
            for (const ingredientInput of ingredientInputs) {
                ingredients.push(
                    await Ingredient.create(ingredientInput)
                );
            }

            await storage.addIngredients(ingredients);

            return (await storage.getIngredients());
        },
        changeApplianceName: async (_, { applianceId, newName }) => {
            const appliance = await Appliance.findByPk(applianceId);

            if (!appliance) {
                return null;
            }

            // receptek száma
            const recipesCount = await Recipe.count();

            // a berendezéshez tartozó receptek száma
            const applianceRecipesCount = await appliance.countRecipes();

            if (applianceRecipesCount < recipesCount * 0.3) {
                await appliance.update({ name: newName });
            }

            return appliance;
        }
    }
};
