const { DataTypes } = require('sequelize')

module.exports = function makeModel(apiDb) {
  const Employee = apiDb.define('Employee', {
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    secondName: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    middleName: {
      type: DataTypes.STRING(50),
      allowNull: true,
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
    employId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
  })
  return Employee
}
