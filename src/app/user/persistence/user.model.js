const { DataTypes } = require('sequelize')

module.exports = function makeModel(apiDb) {
  const User = apiDb.define(
    'User',
    {
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
    },
    { paranoid: true }
  )
  return User
}
