module.exports = function setupModel(db) {
  const { ClientProduct, ContractTemplate, Contract, Status } = db.models

  ClientProduct.belongsToMany(ContractTemplate, {
    through: { model: Contract, unique: false },
    foreignKey: 'clientProductFk',
    otherKey: 'contractTemplateFk',
  })
  ContractTemplate.belongsToMany(ClientProduct, {
    through: { model: Contract, unique: false },
    foreignKey: 'contractTemplateFk',
    otherKey: 'clientProductFk',
  })

  ClientProduct.hasMany(Contract, {
    foreignKey: 'clientProductFk',
  })

  Contract.belongsTo(ClientProduct, { foreignKey: 'clientProductFk' })

  ContractTemplate.hasMany(Contract, {
    foreignKey: 'contractTemplateFk',
  })

  Contract.belongsTo(ContractTemplate, { foreignKey: 'contractTemplateFk' })

  Status.hasMany(Contract, {
    foreignKey: 'statusFk',
  })

  Contract.belongsTo(Status, {
    foreignKey: 'statusFk',
  })
}
