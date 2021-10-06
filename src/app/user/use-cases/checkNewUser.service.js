class checkNewUserService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }
  async checkNewUser(email) {
    const result = await this.userRepository.getAll({ email: email })
    return result.count > 0
  }
}
module.exports = checkNewUserService
