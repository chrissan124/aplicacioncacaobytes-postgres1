const createToken = require('../../common/authentication/use-cases/createToken')
const createUserPayload = require('../../common/authentication/use-cases/createUserPayload')
const {
  checkPassword,
} = require('../../common/controllers/encryption/encryptor')
const UnauthorizedError = require('../../common/controllers/error-handling/unauthorizedError')

class loginUserService {
  constructor(userRepository, getRolesService) {
    this.userRepository = userRepository
    this.roleService = getRolesService
  }
  async loginUser(user) {
    let foundUser = await this.userRepository.getAll({
      email: user.email,
    })

    foundUser = foundUser[0] || undefined

    if (foundUser) {
      const verified = checkPassword(user.password, foundUser.password)
      if (verified) {
        const token = createToken(createUserPayload(foundUser))
        const role = await this.roleService.getRole(foundUser.roleFk)
        return { token, Role: role }
      }
    }
    throw new UnauthorizedError()
  }
}
module.exports = loginUserService
