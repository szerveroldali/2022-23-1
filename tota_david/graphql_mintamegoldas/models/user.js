"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // TODO: Kapcsolatok megadása, ha szükséges
        }

        comparePassword(password) {
            return bcrypt.compareSync(password, this.password);
        }

        toJSON() {
            let data = this.get();
            if (data.hasOwnProperty("password")) {
                delete data.password;
            }
            return data;
        }
    }
    User.init(
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: true,
                    isEmail: true,
                },
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: true,
                    len: [4, 128],
                },
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: "User",
            hooks: {
                beforeCreate: function (user) {
                    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
                },
            },
        }
    );
    return User;
};
