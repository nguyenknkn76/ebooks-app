'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    id: { 
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true 
    },
    user: { 
      type: DataTypes.UUID, 
      allowNull: false, 
      references: {
        model: 'User',
        key: 'id',
      },
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
    },
    phone: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
  });
  Profile.associate = (models) => {
    Profile.belongsTo(models.User, { 
      foreignKey: 'user', 
      unique: true 
    });
    Profile.hasOne(models.MediaFile, { 
      foreignKey: 'profile', 
      unique: true,
      onDelete: 'CASCADE' 
    });
  };
  return Profile;
};
