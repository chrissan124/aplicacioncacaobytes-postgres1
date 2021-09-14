const userEntity = require('../domain/userEntity')

module.exports = class registerUserService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async updateUser(user) {
    userEntity(user, true)
    return await this.userRepository.update(user)
  }
}
