const userEntity = require('../domain/userEntity')

module.exports = class registerUserService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async registerUser(user) {
    userEntity(user)
    return await this.userRepository.create(user)
  }
}
