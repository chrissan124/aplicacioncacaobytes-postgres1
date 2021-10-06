const generatePassword = require('../../common/authentication/use-cases/passwordGenerator')
const {
  encryptPassword,
} = require('../../common/controllers/encryption/encryptor')
const userEntity = require('../domain/userEntity')

module.exports = class registerUserService {
  constructor(userRepository, bus) {
    this.userRepository = userRepository
    this.bus = bus
  }

  async registerUser(user) {
    userEntity(user)
    let password = ''
    if (!user.password) {
      password = generatePassword()
      user.password = password
    }
    user.password = await encryptPassword(user.password)
    const result = await this.userRepository.create(user)
    if (result) this.bus.emit('userRegistered', { ...user, password })
    return result
  }
}
