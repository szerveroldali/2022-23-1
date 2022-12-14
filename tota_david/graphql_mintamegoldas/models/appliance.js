"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Appliance extends Model {
        static associate(models) {
            Appliance.hasMany(models.Recipe);
        }
    }
    Appliance.init(
        {
            name: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Appliance",
        }
    );
    return Appliance;
};
