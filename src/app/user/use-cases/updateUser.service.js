const {
  encryptPassword,
} = require('../../common/controllers/encryption/encryptor')
const userEntity = require('../domain/userEntity')

module.exports = class registerUserService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async updateUser(user) {
    userEntity(user, true)
    if (user.password) {
      user.password = await encryptPassword(user.password)
    }
    return await this.userRepository.update(user)
  }
}
