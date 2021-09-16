const createToken = require('../../common/authentication/createToken')
const createUserPayload = require('../../common/authentication/createUserPayload')
const {
  checkPassword,
} = require('../../common/controllers/encryption/encryptor')
const UnauthorizedError = require('../../common/controllers/error-handling/unauthorizedError')

class loginUserService {
  constructor(userRepository) {
    this.userRepository = userRepository
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
        return { token }
      }
    }
    throw new UnauthorizedError()
  }
}
module.exports = loginUserService
