class createRoleService {
  constructor(roleRepository) {
    this.roleRepository = roleRepository
  }

  async updateRole(role = { name: '', perms: [] }) {
    const roleInstance = await this.roleRepository.update(role)
    await roleInstance.setPermissions(role.perms)
    return roleInstance
  }
}
module.exports = createRoleService
