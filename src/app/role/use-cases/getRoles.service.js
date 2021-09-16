class getRolesService {
  constructor(roleRepository) {
    this.roleRepository = roleRepository
  }
  async getRolesPermissions(options) {
    return await this.roleRepository.getAll({
      include: ['Permissions'],
      ...options,
    })
  }
  async getRoles(options) {
    return await this.roleRepository.getAll({
      ...options,
    })
  }
  async getRole(id) {
    return await this.roleRepository.getById(id, {
      include: ['Permissions'],
    })
  }
}
module.exports = getRolesService
