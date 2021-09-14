module.exports = function setupModel(db) {
  const { Employee, ContractTemplate, Hiring, Status } = db.models

  Employee.belongsToMany(ContractTemplate, {
    through: { model: Hiring, unique: false },
    foreignKey: 'employeeFk',
    otherKey: 'contractTemplateFk',
  })
  ContractTemplate.belongsToMany(Employee, {
    through: { model: Hiring, unique: false },
    foreignKey: 'contractTemplateFk',
    otherKey: 'employeeFk',
  })

  Employee.hasMany(Hiring, {
    foreignKey: 'employeeFk',
  })

  Hiring.belongsTo(Employee, { foreignKey: 'employeeFk' })

  ContractTemplate.hasMany(Hiring, {
    foreignKey: 'contractTemplateFk',
  })

  Hiring.belongsTo(ContractTemplate, { foreignKey: 'contractTemplateFk' })

  Status.hasMany(Hiring, {
    foreignKey: 'statusFk',
  })

  Hiring.belongsTo(Status, {
    foreignKey: 'statusFk',
  })
}
