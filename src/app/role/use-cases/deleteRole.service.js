const NotFoundError = require('../../common/controllers/error-handling/NotFoundError')
const ValidationException = require('../../common/domain/validationException')

class deleteRoleService {
  constructor(roleRepository) {
    this.roleRepository = roleRepository
  }

  async deleteRole(roleId) {
    const roleInstance = await this.roleRepository.getById(roleId)
    if (roleInstance) {
      if (roleInstance.deletable) {
        const success = await this.roleRepository.remove(roleId)
        if (success) {
          return 'role successfully deleted'
        }
      }
      throw new ValidationException('this role cannot be deleted')
    }
    throw new NotFoundError(`role ${roleId}`)
  }
}
module.exports = deleteRoleService
