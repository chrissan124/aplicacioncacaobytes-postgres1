class deleteUserService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }
  async deleteProduct(productId) {
    return await this.userRepository.remove(productId)
  }
}
module.exports = deleteUserService
