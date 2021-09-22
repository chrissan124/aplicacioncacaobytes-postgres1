const setPermissions = require('./permission.config')
const setRoles = require('./role_permission.config')

module.exports = function setupModel(db) {
  const { Role, Permission } = db.models

  Role.belongsToMany(Permission, {
    through: 'RolePermission',
    foreignKey: 'roleFk',
    otherKey: 'permissionFk',
    timestamps: false,
  })
  Permission.belongsToMany(Role, {
    through: 'RolePermission',
    foreignKey: 'permissionFk',
    otherKey: 'roleFk',
    timestamps: false,
  })
  setPermissions(db, Permission).then(() => {
    setRoles(db)
  })
}
