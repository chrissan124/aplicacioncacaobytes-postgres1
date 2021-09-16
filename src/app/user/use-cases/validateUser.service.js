class verifyUserService {
  constructor(userRepository, roleRepository) {
    this.userRepository = userRepository
    this.roleRepository = roleRepository
  }
  async verifyUser(data = { user, role }) {
    return await this.userRepository.doOperation({
      operation: 'count',
      conditions: {
        userId: data.user,
        roleFk: data.role,
      },
    })
  }
}
module.exports = verifyUserService
