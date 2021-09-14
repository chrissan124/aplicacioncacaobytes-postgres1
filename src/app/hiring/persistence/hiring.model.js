const { DataTypes } = require('sequelize')

module.exports = function makeModel(apiDb) {
  const Hiring = apiDb.define(
    'Hiring',
    {
      signedDate: {
        type: DataTypes.DATEONLY,
      },
      startDate: {
        type: DataTypes.DATEONLY,
      },
      expirationDate: {
        type: DataTypes.DATEONLY,
      },
      totalPayment: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      currentPayment: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      hiringId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
    },
    {
      paranoid: true,
    }
  )
  return Hiring
}
