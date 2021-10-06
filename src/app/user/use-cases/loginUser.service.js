const createToken = require('../../common/authentication/use-cases/createToken')
const createUserPayload = require('../../common/authentication/use-cases/createUserPayload')
const {
  checkPassword,
} = require('../../common/controllers/encryption/encryptor')
const UnauthorizedError = require('../../common/controllers/error-handling/unauthorizedError')
const ForbiddenError = require('../../common/controllers/error-handling/forbiddenError')
const statuses = require('../../common/persistence/status/statuses')
class loginUserService {
  constructor(userRepository, getRolesService) {
    this.userRepository = userRepository
    this.roleService = getRolesService
  }
  async loginUser(user, time = null) {
    if (user) {
      let foundUser = await this.userRepository.getAll({
        email: user.email,
        include: ['Status'],
      })

      foundUser = foundUser.count ? foundUser.rows[0] : undefined
      if (foundUser) {
        if (foundUser.Status.name === statuses.SUSPENDED) {
          throw new ForbiddenError('This user is blocked')
        }
        const verified = await checkPassword(user.password, foundUser.password)

        if (verified) {
          const token = createToken(createUserPayload(foundUser), time)
          const role = await this.roleService.getRole(foundUser.roleFk)
          return {
            token,
            Role: role,
            userId: foundUser.userId,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
          }
        }
      }
    }
    throw new UnauthorizedError()
  }
}
module.exports = loginUserService
