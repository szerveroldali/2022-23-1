"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Recipes", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
            },
            isVegetarian: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            doneCount: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false,
            },
            ApplianceId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: "Appliances",
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
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Recipes");
    },
};
