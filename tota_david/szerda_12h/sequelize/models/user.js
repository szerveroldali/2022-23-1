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
      // A kapott jelszó összevetése az aktuális user hashelt password-jével
      return bcrypt.compareSync(password, this.password);
    }

    toJSON() {
      const data = this.get();

      // Jelszó eltávolítása a JSON-ből
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
      beforeCreate: (data, options) => {
        // Jelszó hashelése a user eltárolása előtt
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(data.password, salt);

        data.password = hash;
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};