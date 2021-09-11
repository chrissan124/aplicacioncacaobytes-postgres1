module.exports = function setupModel(db) {
  const { ContractTemplate, Category } = db.models

  Category.hasMany(ContractTemplate, {
    foreignKey: 'categoryFk',
  })

  ContractTemplate.belongsTo(Category, {
    foreignKey: 'categoryFk',
  })
}
