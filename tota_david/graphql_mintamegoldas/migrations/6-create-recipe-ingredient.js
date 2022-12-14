"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("RecipeIngredient", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            RecipeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Recipes",
                    key: "id",
                },
                onDelete: "cascade",
            },
            IngredientId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Ingredients",
                    key: "id",
                },
                onDelete: "cascade",
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });

        await queryInterface.addConstraint("RecipeIngredient", {
            fields: ["RecipeId", "IngredientId"],
            type: "unique",
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("RecipeIngredient");
    },
};
