'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    role: DataTypes.STRING,
  });
  Role.associate = (models) => {
    Role.hasMany(models.UserRole, { foreignKey: 'role_id' });
  };
  return Role;
};