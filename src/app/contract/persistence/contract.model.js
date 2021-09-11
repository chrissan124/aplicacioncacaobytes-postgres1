const { DataTypes } = require('sequelize')

module.exports = function makeModel(apiDb) {
  const Contract = apiDb.define(
    'Contract',
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
      automaticInvoice: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      totalPayment: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      currentPayment: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      contractId: {
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
  return Contract
}
