module.exports = function setupModel(db) {
  const { ClientProduct, Client, Product } = db.models

  Client.belongsToMany(Product, {
    through: ClientProduct,
    foreignKey: 'clientFk',
    otherKey: 'productFk',
  })
  Product.belongsToMany(Client, {
    through: ClientProduct,
    foreignKey: 'productFk',
    otherKey: 'clientFk',
  })
}
