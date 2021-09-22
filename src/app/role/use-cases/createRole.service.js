class createRoleService {
  constructor(roleRepository) {
    this.roleRepository = roleRepository
  }
  //add, well, adds associations. set only sets those and deletes the others
  async createRole(role = { name: '', perms: [] }) {
    const roleInstance = await this.roleRepository.create(role)
    await roleInstance.setPermissions(role.perms)
    return roleInstance
  }
}
module.exports = createRoleService
