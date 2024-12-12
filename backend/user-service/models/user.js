'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    username: { type: DataTypes.STRING, unique: true, allowNull: false},
    password_hash: {type: DataTypes.STRING, allowNull: false},
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    access_token: {type: DataTypes.STRING},
    refresh_token: {type: DataTypes.STRING},
  });
  User.associate = (models) => {
    User.hasOne(models.Profile, { foreignKey: 'user_id' });
    User.hasMany(models.UserRole, { foreignKey: 'user_id' });
    User.hasMany(models.MediaFile, { foreignKey: 'user_id' });
  };
  return User;
};