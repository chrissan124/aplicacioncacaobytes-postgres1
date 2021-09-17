class deleteUserService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }
  async deleteUser(userId) {
    return await this.userRepository.remove(userId)
  }
}
module.exports = deleteUserService
