module.exports = function setupModel(db) {
  const { Receipt, Invoice, Status } = db.models

  Invoice.hasMany(Receipt, {
    foreignKey: 'invoiceFk',
  })

  Receipt.belongsTo(Invoice, {
    foreignKey: 'invoiceFk',
  })

  Status.hasMany(Receipt, {
    foreignKey: 'statusFk',
  })

  Receipt.belongsTo(Status, {
    foreignKey: 'statusFk',
  })
}
