module.exports = function setupModel(db) {
  const { Receipt, Invoice, Status, FileReceipt } = db.models

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

  FileReceipt.belongsTo(Receipt, {
    foreignKey: 'receiptFk',
  })

  Receipt.hasMany(FileReceipt, {
    foreignKey: 'receiptFk',
  })
}
