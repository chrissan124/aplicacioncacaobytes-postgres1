module.exports = function setupModel(db) {
  const { Address, Client, Status } = db.models
  Address.hasMany(Client, {
    foreignKey: 'addressFk',
  })

  Client.belongsTo(Address, {
    foreignKey: 'addressFk',
  })

  Status.hasMany(Client, {
    foreignKey: 'statusFk',
  })

  Client.belongsTo(Status, {
    foreignKey: 'statusFk',
  })
}
