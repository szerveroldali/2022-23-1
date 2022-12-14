"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Ingredient extends Model {
        static associate(models) {
            Ingredient.belongsToMany(models.Recipe, { through: "RecipeIngredient" });
            Ingredient.belongsTo(models.Storage);
        }
    }
    Ingredient.init(
        {
            name: DataTypes.STRING,
            amount: DataTypes.INTEGER,
            StorageId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Ingredient",
        }
    );
    return Ingredient;
};
