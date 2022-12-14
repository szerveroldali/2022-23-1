"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Storage extends Model {
        static associate(models) {
            Storage.hasMany(models.Ingredient);
        }
    }
    Storage.init(
        {
            name: {
                type: DataTypes.STRING,
                unique: true,
            },
            capacity: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Storage",
        }
    );
    return Storage;
};
