class deleteUserService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }
  async deleteUser(userId) {
    return await this.userRepository.remove(userId)
  }
  async restoreUser(userId) {
    return await this.userRepository.restore(userId)
  }
}
module.exports = deleteUserService
