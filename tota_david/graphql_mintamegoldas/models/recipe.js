"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Recipe extends Model {
        static associate(models) {
            Recipe.belongsToMany(models.Ingredient, { through: "RecipeIngredient" });
            Recipe.belongsTo(models.Appliance);
        }
    }
    Recipe.init(
        {
            name: {
                type: DataTypes.STRING,
                unique: true,
            },
            isVegetarian: DataTypes.BOOLEAN,
            doneCount: DataTypes.INTEGER,
            ApplianceId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Recipe",
        }
    );
    return Recipe;
};
