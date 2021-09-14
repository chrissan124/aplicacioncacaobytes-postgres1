module.exports = function setupModel(db) {
  const { Receipt, Invoice } = db.models

  Invoice.hasMany(Receipt, {
    foreignKey: 'invoiceFk',
  })

  Receipt.belongsTo(Invoice, {
    foreignKey: 'invoiceFk',
  })
}
