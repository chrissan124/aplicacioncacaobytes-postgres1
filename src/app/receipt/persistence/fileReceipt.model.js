const { DataTypes } = require('sequelize')

module.exports = function makeModel(apiDb) {
  const FileReceipt = apiDb.define(
    'FileReceipt',
    {
      fileReceiptId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
    },
    {
      createdAt: true,
      updatedAt: false,
    }
  )
  return FileReceipt
}
