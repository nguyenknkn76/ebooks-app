'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    user_id: DataTypes.UUID,
    name: DataTypes.STRING,
    dob: DataTypes.DATEONLY,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    cover_image_id: DataTypes.UUID,
  });
  Profile.associate = (models) => {
    Profile.belongsTo(models.User, { foreignKey: 'user_id' });
    Profile.belongsTo(models.MediaFile, { foreignKey: 'cover_image_id' });
  };
  return Profile;
};
