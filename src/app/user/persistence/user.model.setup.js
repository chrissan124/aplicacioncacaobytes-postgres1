module.exports = function setupModel(db) {
  const { User, Role, Status } = db.models

  Role.hasMany(User, {
    foreignKey: 'roleFk',
  })

  User.belongsTo(Role, {
    foreignKey: 'roleFk',
  })

  Status.hasMany(User, {
    foreignKey: 'statusFk',
  })

  User.belongsTo(Status, {
    foreignKey: 'statusFk',
  })
}
