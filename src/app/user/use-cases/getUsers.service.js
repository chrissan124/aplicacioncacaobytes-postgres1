module.exports = class registerUserService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async getUsers(options) {
    return await this.userRepository.getAll({
      include: ['Status', 'Role'],
      ...options,
    })
  }

  async getUser(id, options) {
    return await this.userRepository.getById(id, {
      include: ['Status', 'Role'],
      ...options,
    })
  }
}
