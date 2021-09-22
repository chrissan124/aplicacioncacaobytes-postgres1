const ForbiddenError = require('../../common/controllers/error-handling/forbiddenError')

class verifyUserService {
  constructor(userRepository, roleRepository) {
    this.userRepository = userRepository
    this.roleRepository = roleRepository
  }
  async verifyUser(data = { user, role }) {
    const exists = await this.userRepository.doOperation({
      operation: 'count',
      conditions: {
        userId: data.user,
        roleFk: data.role,
      },
    })
    if (exists) return true
    throw ForbiddenError('invalid token user')
  }
}
module.exports = verifyUserService
