'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const MediaFile = sequelize.define('MediaFile', {
    id: { 
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true 
    },
    profile: { 
      type: DataTypes.UUID, 
      references: {
        model: 'Profile',
        key: 'id',
      },
      unique: true,
    },
    file_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file_type: {
      type: DataTypes.STRING,
    },
    file_size: {
      type: DataTypes.INTEGER,
    },
    file_collection: {
      type: DataTypes.STRING,
    },
  });
  MediaFile.associate = (models) => {
    MediaFile.belongsTo(models.Profile, { foreignKey: 'profile', unique: true });
  };
  return MediaFile;
};
