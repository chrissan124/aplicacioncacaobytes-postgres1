module.exports = function setupModel(db) {
  const { Product, Status } = db.models

  Status.hasMany(Product, {
    foreignKey: 'statusFk',
  })

  Product.belongsTo(Status, {
    foreignKey: 'statusFk',
  })
}
