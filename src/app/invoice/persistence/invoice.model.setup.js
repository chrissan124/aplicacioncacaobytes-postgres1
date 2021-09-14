module.exports = function setupModel(db) {
  const { Invoice, Status, Contract } = db.models

  Status.hasMany(Invoice, {
    foreignKey: 'statusFk',
  })

  Invoice.belongsTo(Status, {
    foreignKey: 'statusFk',
  })

  Contract.hasMany(Invoice, {
    foreignKey: 'contractFk',
  })

  Invoice.belongsTo(Contract, {
    foreignKey: 'contractFk',
  })
}
