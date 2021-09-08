module.exports = function setupModel(db) {
  const { Address, Client } = db.models
  Address.hasMany(Client, {
    foreignKey: 'addressFk',
  })
  //Bug raro? Se crean dos fks en cliente

  Client.belongsTo(Address, {
    foreignKey: 'addressFk',
  })
}
