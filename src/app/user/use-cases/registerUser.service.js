const generatePassword = require('../../common/authentication/use-cases/passwordGenerator')
const {
  encryptPassword,
} = require('../../common/controllers/encryption/encryptor')
const userEntity = require('../domain/userEntity')

module.exports = class registerUserService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async registerUser(user) {
    userEntity(user)
    if (!user.password) {
      user.password = generatePassword()
    }
    user.password = await encryptPassword(user.password)
    return await this.userRepository.create(user)
  }
}
