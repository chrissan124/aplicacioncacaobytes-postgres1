const { DataTypes } = require('sequelize')

module.exports = function makeModel(apiDb) {
  const ClientProduct = apiDb.define(
    'ClientProduct',
    {
      clientProductId: {
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
  return ClientProduct
}
