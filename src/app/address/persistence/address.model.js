const { DataTypes } = require('sequelize')

function makeModel(apiDb) {
  const Address = apiDb.define('Address', {
    primaryLine: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    secondaryLine: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    addressId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  })
  return Address
}

module.exports = makeModel
