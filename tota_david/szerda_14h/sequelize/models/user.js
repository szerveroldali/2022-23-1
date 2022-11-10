'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      User.hasMany(models.Post);
    }

    comparePassword(password) {
      return bcrypt.compareSync(password, this.password);
    }

    toJSON() {
      const user = this.get();

      if (user.hasOwnProperty("password")) {
        delete user.password;
      }

      return user;
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user) => {
        const ROUNDS = 10;

        const salt = bcrypt.genSaltSync(ROUNDS);
        const hash = bcrypt.hashSync(user.password, salt);

        user.password = hash;
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};