class getPermissionsService {
  constructor(permissionRepository) {
    this.permissionRepository = permissionRepository
  }
  async getPermissions(options) {
    return await this.permissionRepository.getAll({
      ...options,
    })
  }
}
module.exports = getPermissionsService
