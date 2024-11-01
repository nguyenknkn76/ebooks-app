'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const MediaFile = sequelize.define('MediaFile', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    user_id: DataTypes.UUID,
    file_url: DataTypes.STRING,
    file_type: DataTypes.STRING,
    file_size: DataTypes.INTEGER,
  });
  MediaFile.associate = (models) => {
    MediaFile.belongsTo(models.User, { foreignKey: 'user_id' });
  };
  return MediaFile;
};
