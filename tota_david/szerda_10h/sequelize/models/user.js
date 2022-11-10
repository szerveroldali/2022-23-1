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

    checkPassword(password) {
      // A megadott jelszó illeszkedik-e a user password mezőjére, ami egy bcrypt hash
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
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};