module.exports = function setupModel(db) {
  const { ContractTemplate, Category, FileTemplate, Status } = db.models

  FileTemplate.hasMany(ContractTemplate, {
    foreignKey: 'fileTemplateFk',
  })

  ContractTemplate.belongsTo(FileTemplate, {
    foreignKey: 'fileTemplateFk',
  })

  Category.hasMany(ContractTemplate, {
    foreignKey: 'categoryFk',
  })

  ContractTemplate.belongsTo(Category, {
    foreignKey: 'categoryFk',
  })

  Category.hasMany(FileTemplate, {
    foreignKey: 'categoryFk',
  })

  FileTemplate.belongsTo(Category, {
    foreignKey: 'categoryFk',
  })

  FileTemplate.belongsTo(Status, {
    foreignKey: 'statusFk',
  })

  Status.hasMany(FileTemplate, {
    foreignKey: 'statusFk',
  })

  ContractTemplate.belongsTo(Status, {
    foreignKey: 'statusFk',
  })

  Status.hasMany(ContractTemplate, {
    foreignKey: 'statusFk',
  })
}
