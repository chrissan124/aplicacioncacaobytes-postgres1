const NotFoundError = require('../../common/controllers/error-handling/notFoundError')

module.exports = class getAuthUserService {
  constructor(userRepository, getRolesService) {
    this.userRepository = userRepository
    this.roleService = getRolesService
  }
  async getAuthUser(userId) {
    let foundUser = await this.userRepository.getById(userId)

    if (foundUser) {
      const role = await this.roleService.getRole(foundUser.roleFk)
      return {
        user: {
          userId: foundUser.userId,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          permissions: role.Permissions,
        },
      }
    }
    throw new NotFoundError('user')
  }
}
