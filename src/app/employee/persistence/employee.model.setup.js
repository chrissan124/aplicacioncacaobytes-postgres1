module.exports = function setupModel(db) {
  const { Address, Employee, Status } = db.models
  Address.hasMany(Employee, {
    foreignKey: 'addressFk',
  })

  Employee.belongsTo(Address, {
    foreignKey: 'addressFk',
  })

  Status.hasMany(Employee, {
    foreignKey: 'statusFk',
  })

  Employee.belongsTo(Status, {
    foreignKey: 'statusFk',
  })
}
