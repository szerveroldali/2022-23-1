'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Track extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Track.belongsToMany(models.Playlist, {
        through: "PlaylistTrack"
      });
    }
  }
  Track.init({
    title: DataTypes.STRING,
    length: DataTypes.INTEGER,
    author: DataTypes.STRING,
    genres: DataTypes.STRING,
    album: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Track',
  });
  return Track;
};
