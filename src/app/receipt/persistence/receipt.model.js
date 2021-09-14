const { DataTypes } = require('sequelize')

module.exports = function makeModel(apiDb) {
  const Receipt = apiDb.define('Receipt', {
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    concept: {
      type: DataTypes.STRING(200),
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.STRING(50),
      defaultValue: 'unknown',
    },
    receiptId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
  })
  return Receipt
}
