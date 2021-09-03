const { DataTypes } = require('sequelize')

module.exports = function makeModel(apiDb) {
  const Product = apiDb.define('Product', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
  })
  return Product
}
