const { DataTypes } = require('sequelize')
//PENDING: add status FK

module.exports = function makeModel(apiDb) {
  const Client = apiDb.define('Client', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    legalIdentifier: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    clientId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
  })
  return Client
}
