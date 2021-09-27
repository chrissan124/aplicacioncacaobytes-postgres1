class getRolesService {
  constructor(roleRepository) {
    this.roleRepository = roleRepository
  }
  async getRolesPermissions(options) {
    const roles = await this.roleRepository.getAll({
      include: ['Permissions'],
      ...options,
    })
    return roles.rows.map((role) => {
      return this.mapRole(role)
    })
  }
  async getRoles(options) {
    return await this.roleRepository.getAll({
      ...options,
    })
  }
  async getRole(id) {
    const role = await this.roleRepository.getById(id, {
      exclude: ['createdAt', 'updatedAt', 'deletable', 'description'],
      include: ['Permissions'],
    })
    return this.mapRole(role)
  }
  mapRole(role) {
    const newRole = { ...role.dataValues }
    newRole.Permissions = role.dataValues.Permissions.map((perm) => {
      const newPerm = {
        name: perm.name,
        type: perm.type,
        permissionId: perm.permissionId,
      }
      return newPerm
    })
    return newRole
  }
}
module.exports = getRolesService
