const { DataTypes } = require('sequelize')

module.exports = function makeModel(apiDb) {
  const Invoice = apiDb.define('Invoice', {
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    deadline: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    invoiceId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
  })
  return Invoice
}
